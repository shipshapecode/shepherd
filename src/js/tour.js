import isEmpty from 'lodash-es/isEmpty';
import isFunction from 'lodash-es/isFunction';
import isNumber from 'lodash-es/isNumber';
import isString from 'lodash-es/isString';
import isUndefined from 'lodash-es/isUndefined';
import { Evented } from './evented.js';
import { Modal } from './modal.js';
import { Step } from './step.js';
import { bindMethods } from './bind.js';
import tippy from 'tippy.js';
import { defaults as tooltipDefaults } from './utils/tooltip-defaults';

import {
  cleanupSteps,
  cleanupStepEventListeners
} from './utils/cleanup';

import {
  addStepEventListeners,
  getElementForStep
} from './utils/dom';

import {
  toggleShepherdModalClass
} from './utils/modal';

/**
 * Creates incremented ID for each newly created tour
 *
 * @private
 * @return {Number} The unique id for the tour
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
   * @param {Object} options.defaultStepOptions Default options for Steps created through `addStep`
   * @param {Step[]} options.steps An array of Step instances to initialize the tour with
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
    bindMethods.call(this, [
      'back',
      'cancel',
      'complete',
      'hide',
      'next'
    ]);
    this.options = options;
    this.steps = this.options.steps || [];

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

    this.modal = new Modal(options);

    this._setTooltipDefaults();
    this._setTourID();

    return this;
  }

  /**
   * Adds a new step to the tour
   * @param {Object|Number|Step|String} arg1
   * When arg2 is defined, arg1 can either be a string or number, to use for the `id` for the step
   * When arg2 is undefined, arg1 is either an object containing step options or a Step instance
   * @param {Object|Step} arg2 An object containing step options or a Step instance
   * @return {Step} The newly added step
   */
  addStep(arg1, arg2) {
    let name, step;

    // If we just have one argument, we can assume it is an object of step options, with an id
    if (isUndefined(arg2)) {
      step = arg1;
    } else {
      name = arg1;
      step = arg2;
    }

    if (!(step instanceof Step)) {
      step = this.setupStep(step, name);
    } else {
      step.tour = this;
    }

    this.steps.push(step);
    return step;
  }

  /**
   * Go to the previous step in the tour
   */
  back() {
    const index = this.steps.indexOf(this.currentStep);
    this.show(index - 1, false);
  }

  /**
   * Calls done() triggering the 'cancel' event
   * If `confirmCancel` is true, will show a window.confirm before cancelling
   */
  cancel() {
    if (this.options.confirmCancel) {
      const cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
      const stopTour = window.confirm(cancelMessage);
      if (stopTour) {
        this.done('cancel');
      }
    } else {
      this.done('cancel');
    }
  }

  /**
   * Calls done() triggering the `complete` event
   */
  complete() {
    this.done('complete');
  }

  /**
   * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
   * @param {String} event The event name to trigger
   */
  done(event) {
    if (!isEmpty(this.steps)) {
      this.steps.forEach((step) => step.destroy());
    }

    cleanupStepEventListeners.call(this);
    cleanupSteps(this.tourObject);
    this.modal.cleanup();

    this.trigger(event);

    Shepherd.activeTour = null;
    this._removeBodyAttrs();
    this.trigger('inactive', { tour: this });
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
   * Setup a new step object
   * @param {Object} stepOptions The object describing the options for the step
   * @param {String|Number} name The string or number to use as the `id` for the step
   * @return {Step} The step instance
   */
  setupStep(stepOptions, name) {
    if (isString(name) || isNumber(name)) {
      stepOptions.id = name.toString();
    }

    stepOptions = Object.assign({}, this.options.defaultStepOptions, stepOptions);

    return new Step(this, stepOptions);
  }

  beforeShowStep(step) {
    this.modal.setupForStep(step);
    this._styleTargetElementForStep(step);
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

    this.currentStep = null;
    this._setupActiveTour();
    addStepEventListeners.call(this);
    this.next();
  }

  /**
   * Make this tour "active"
   * @private
   */
  _setupActiveTour() {
    this.modal.createModalOverlay();
    this._addBodyAttrs();
    this.trigger('active', { tour: this });

    Shepherd.activeTour = this;
  }

  /**
   * Modulates the styles of the passed step's target element, based on the step's options and
   * the tour's `modal` option, to visually emphasize the element
   *
   * @param step The step object that attaches to the element
   * @private
   */
  _styleTargetElementForStep(step) {
    const targetElement = getElementForStep(step);

    if (!targetElement) {
      return;
    }

    toggleShepherdModalClass(targetElement);

    if (step.options.highlightClass) {
      targetElement.classList.add(step.options.highlightClass);
    }

    if (step.options.canClickTarget === false) {
      targetElement.style.pointerEvents = 'none';
    }
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

  _setTooltipDefaults() {
    tippy.setDefaults(tooltipDefaults);
  }

  _updateStateBeforeShow() {
    if (this.currentStep) {
      this.currentStep.hide();
    }

    if (!this.isActive()) {
      this._setupActiveTour();
    }
  }

  _setTourID() {
    const tourName = this.options.tourName || 'tour';
    const uuid = uniqueId();

    this.id = `${tourName}--${uuid}`;
  }

  _addBodyAttrs() {
    document.body.setAttribute('data-shepherd-active-tour', this.id);
    document.body.classList.add('shepherd-active');
  }

  _removeBodyAttrs() {
    document.body.removeAttribute('data-shepherd-active-tour');
    document.body.classList.remove('shepherd-active');
  }

}

export { Shepherd };
