import bodyScrollLock from 'body-scroll-lock';
import preact from 'preact';
import tippy from 'tippy.js';

import { Evented } from './evented.js';
import { Step } from './step.jsx';
import autoBind from './utils/auto-bind';
import { isElement, isFunction, isString } from './utils/type-check';
import { defaults as tooltipDefaults } from './utils/tooltip-defaults';
import { cleanupSteps } from './utils/cleanup';
import { normalizePrefix } from './utils/general';
import { generateStyles } from './styles/generateStyles';
import ShepherdModal from './components/shepherd-modal';

const { render } = preact;

/**
 * Creates incremented ID for each newly created tour
 *
 * @return {Function} A function that returns the unique id for the tour
 * @private
 */
const uniqueId = (function() {
  let id = 0;
  return function() {
    return ++id;
  };
})();

const Shepherd = new Evented();

/**
 * Class representing the site tour
 * @extends {Evented}
 */
export class Tour extends Evented {
  /**
   * @param {Object} options The options for the tour
   * @param {boolean} options.confirmCancel If true, will issue a `window.confirm` before cancelling
   * @param {string} options.confirmCancelMessage The message to display in the confirm dialog
   * @param {string} options.classPrefix The prefix to add to all the `shepherd-*` class names.
   * @param {Object} options.defaultStepOptions Default options for Steps ({@link Step#constructor}), created through `addStep`
   * @param {boolean} options.disableScroll When set to true, will keep the user from scrolling with the scrollbar,
   * mousewheel, arrow keys, etc. You may want to use this to ensure you are driving the scroll position with the tour.
   * @param {HTMLElement} options.modalContainer An optional container element for the modal.
   * If not set, the modal will be appended to `document.body`.
   * @param {object[] | Step[]} options.steps An array of step options objects or Step instances to initialize the tour with
   * @param {object} options.styleVariables An object hash of style variables to override
   * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
   * dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute
   * whenever the tour becomes active.
   * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
   * modal overlay. If true, the overlay will create an opening around the target element so that it
   * can remain interactive
   * @returns {Tour}
   */
  constructor(options = {}) {
    super(options);

    autoBind(this);

    this.options = options;
    this.classPrefix = this.options ? normalizePrefix(this.options.classPrefix) : '';
    this.styles = generateStyles(options);
    this.steps = [];
    this.addSteps(this.options.steps);

    // Pass these events onto the global Shepherd object
    const events = ['active', 'cancel', 'complete', 'inactive', 'show', 'start'];
    events.map((event) => {
      ((e) => {
        this.on(e, (opts) => {
          opts = opts || {};
          opts.tour = this;
          Shepherd.trigger(e, opts);
        });
      })(event);
    });

    const existingModal = document.querySelector(`.${this.classPrefix}shepherd-modal-overlay-container`);
    render(
      <ShepherdModal
        classPrefix={this.classPrefix}
        ref={(c) => this.modal = c}
        styles={this.styles}
      />,
      options.modalContainer || document.body,
      existingModal
    );

    this._setTooltipDefaults();
    this._setTourID();

    return this;
  }

  /**
   * Adds a new step to the tour
   * @param {Object|Step} options An object containing step options or a Step instance
   * @return {Step} The newly added step
   */
  addStep(options) {
    let step = options;

    if (!(step instanceof Step)) {
      step = this._setupStep(step);
    } else {
      step.tour = this;
    }

    this.steps.push(step);
    return step;
  }

  /**
   * Add multiple steps to the tour
   * @param {Array<object> | Array<Step>} steps The steps to add to the tour
   */
  addSteps(steps) {
    if (Array.isArray(steps)) {
      steps.forEach((step) => {
        this.addStep(step);
      });
    }

    return this;
  }

  /**
   * Go to the previous step in the tour
   */
  back() {
    const index = this.steps.indexOf(this.currentStep);
    this.show(index - 1, false);
  }

  /**
   * Calls _done() triggering the 'cancel' event
   * If `confirmCancel` is true, will show a window.confirm before cancelling
   */
  cancel() {
    if (this.options.confirmCancel) {
      const cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
      const stopTour = window.confirm(cancelMessage);
      if (stopTour) {
        this._done('cancel');
      }
    } else {
      this._done('cancel');
    }
  }

  /**
   * Calls _done() triggering the `complete` event
   */
  complete() {
    this._done('complete');
  }

  /**
   * Gets the step from a given id
   * @param {Number|String} id The id of the step to retrieve
   * @return {Step} The step corresponding to the `id`
   */
  getById(id) {
    return this.steps.find((step) => {
      return step.id === id;
    });
  }

  /**
   * Gets the current step
   * @returns {Step|null}
   */
  getCurrentStep() {
    return this.currentStep;
  }

  /**
   * Hide the current step
   */
  hide() {
    const currentStep = this.getCurrentStep();

    if (currentStep) {
      return currentStep.hide();
    }
  }

  /**
   * Check if the tour is active
   * @return {boolean}
   */
  isActive() {
    return Shepherd.activeTour === this;
  }

  /**
   * Go to the next step in the tour
   * If we are at the end, call `complete`
   */
  next() {
    const index = this.steps.indexOf(this.currentStep);

    if (index === this.steps.length - 1) {
      this.complete();
    } else {
      this.show(index + 1, true);
    }
  }

  /**
   * Removes the step from the tour
   * @param {String} name The id for the step to remove
   */
  removeStep(name) {
    const current = this.getCurrentStep();

    // Find the step, destroy it and remove it from this.steps
    this.steps.some((step, i) => {
      if (step.id === name) {
        if (step.isOpen()) {
          step.hide();
        }

        step.destroy();
        this.steps.splice(i, 1);

        return true;
      }
    });

    if (current && current.id === name) {
      this.currentStep = undefined;

      // If we have steps left, show the first one, otherwise just cancel the tour
      this.steps.length ? this.show(0) : this.cancel();
    }
  }

  /**
   * Show a specific step in the tour
   * @param {Number|String} key The key to look up the step by
   * @param {Boolean} forward True if we are going forward, false if backward
   */
  show(key = 0, forward = true) {
    const step = isString(key) ? this.getById(key) : this.steps[key];

    if (step) {
      this._updateStateBeforeShow();

      const shouldSkipStep = isFunction(step.options.showOn) && !step.options.showOn();

      // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal
      if (shouldSkipStep) {
        this._skipStep(step, forward);
      } else {
        this.trigger('show', {
          step,
          previous: this.currentStep
        });

        this.currentStep = step;
        step.show();
      }
    }
  }

  /**
   * Start the tour
   */
  start() {
    this.trigger('start');

    if (this.options.disableScroll) {
      bodyScrollLock.disableBodyScroll();
    }

    // Save the focused element before the tour opens
    this.focusedElBeforeOpen = document.activeElement;

    this.currentStep = null;
    this._setupActiveTour();
    this.next();
  }

  /**
   * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
   * @param {String} event The event name to trigger
   * @private
   */
  _done(event) {
    const index = this.steps.indexOf(this.currentStep);
    if (Array.isArray(this.steps)) {
      this.steps.forEach((step) => step.destroy());
    }

    cleanupSteps(this);

    this.trigger(event, { index });

    Shepherd.activeTour = null;
    this._removeBodyAttrs();
    this.trigger('inactive', { tour: this });

    if (this.options.disableScroll) {
      bodyScrollLock.clearAllBodyScrollLocks();
    }

    this.modal.hide();

    // Focus the element that was focused before the tour started
    if (isElement(this.focusedElBeforeOpen)) {
      this.focusedElBeforeOpen.focus();
    }
  }

  /**
   * Make this tour "active"
   * @private
   */
  _setupActiveTour() {
    this._addBodyAttrs();
    this.trigger('active', { tour: this });

    Shepherd.activeTour = this;
  }

  /**
   * Setup a new step object
   * @param {Object} stepOptions The object describing the options for the step
   * @return {Step} The step instance
   * @private
   */
  _setupStep(stepOptions) {
    stepOptions = Object.assign({}, this.options.defaultStepOptions, stepOptions);

    return new Step(this, stepOptions);
  }

  /**
   * Called when `showOn` evaluates to false, to skip the step
   * @param {Step} step The step to skip
   * @param {Boolean} forward True if we are going forward, false if backward
   * @private
   */
  _skipStep(step, forward) {
    const index = this.steps.indexOf(step);
    const nextIndex = forward ? index + 1 : index - 1;
    this.show(nextIndex, forward);
  }

  /**
   * Set the tippy defaults
   * @private
   */
  _setTooltipDefaults() {
    tippy.setDefaultProps(tooltipDefaults);
  }

  /**
   * Before showing, hide the current step and if the tour is not
   * already active, call `this._setupActiveTour`.
   * @private
   */
  _updateStateBeforeShow() {
    if (this.currentStep) {
      this.currentStep.hide();
    }

    if (!this.isActive()) {
      this._setupActiveTour();
    }
  }

  /**
   * Sets this.id to `${tourName}--${uuid}`
   * @private
   */
  _setTourID() {
    const tourName = this.options.tourName || 'tour';
    const uuid = uniqueId();

    this.id = `${tourName}--${uuid}`;
  }

  /**
   * Adds the data-shepherd-active-tour attribute and the 'shepherd-active'
   * class to the body.
   * @private
   */
  _addBodyAttrs() {
    document.body.setAttribute(`data-${this.classPrefix}shepherd-active-tour`, this.id);
    document.body.classList.add(this.styles.active.trim());
  }

  /**
   * Removes the data-shepherd-active-tour attribute and the 'shepherd-active'
   * class from the body.
   * @private
   */
  _removeBodyAttrs() {
    document.body.removeAttribute(`data-${this.classPrefix}shepherd-active-tour`);
    document.body.classList.remove(this.styles.active.trim());
  }

}

export { Shepherd };
