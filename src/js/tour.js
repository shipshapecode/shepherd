import _ from 'lodash';
import { Evented } from './evented';
import { Step } from './step';
import { bindMethods } from './bind';

const Shepherd = new Evented();

export class Tour extends Evented {
  constructor(options = {}) {
    super(options);
    bindMethods.call(this, [
      'back',
      'cancel',
      'complete',
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

    return this;
  }

  /**
   * Adds a new step to the tour
   * @param {Object|Number|Step|String} arg1
   * When arg2 is defined, arg1 can either be a string or number, to use for the `id` for the step
   * When arg2 is undefined, arg1 is either an object containing step options or a Step instance
   * @param {Object|Step} arg2 An object containing step options or a Step instance
   * @returns {Step} The newly added step
   */
  addStep(arg1, arg2) {
    let name, step;

    // If we just have one argument, we can assume it is an object of step options, with an id
    if (_.isUndefined(arg2)) {
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
   * @returns {Step}
   */
  setupStep(stepOptions, name) {
    if (_.isString(name) || _.isNumber(name)) {
      stepOptions.id = name.toString();
    }

    stepOptions = Object.assign({}, this.options.defaults, stepOptions);

    return new Step(this, stepOptions);
  }

  getById(id) {
    for (let i = 0; i < this.steps.length; ++i) {
      const step = this.steps[i];
      if (step.id === id) {
        return step;
      }
    }
  }

  getCurrentStep() {
    return this.currentStep;
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
   */
  cancel() {
    this.done('cancel');
  }

  /**
   * Calls done() triggering the 'complete' event
   */
  complete() {
    this.done('complete');
  }

  /**
   * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
   * @param event
   */
  done(event) {
    if (this.currentStep) {
      this.currentStep.hide();
    }

    this.trigger(event);

    if (Shepherd.activeTour) {
      Shepherd.activeTour.steps.forEach((step) => {
        step.destroy();
      });
    }

    Shepherd.activeTour = null;
    document.body.classList.remove('shepherd-active');
    this.trigger('inactive', { tour: this });
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

  show(key = 0, forward = true) {
    if (this.currentStep) {
      this.currentStep.hide();
    } else {
      document.body.classList.add('shepherd-active');
      this.trigger('active', { tour: this });
    }

    Shepherd.activeTour = this;

    const next = _.isString(key) ? this.getById(key) : this.steps[key];

    if (!next) {
      return;
    }

    if (!_.isUndefined(next.options.showOn) && !next.options.showOn()) {
      const index = this.steps.indexOf(next);
      const nextIndex = forward ? index + 1 : index - 1;
      this.show(nextIndex, forward);
    } else {
      this.trigger('show', {
        step: next,
        previous: this.currentStep
      });

      this.currentStep = next;
      next.show();
    }
  }

  /**
   * Start the tour
   */
  start() {
    this.trigger('start');

    this.currentStep = null;
    this.next();
  }
}

export { Shepherd };