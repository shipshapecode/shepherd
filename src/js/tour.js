import { Evented } from './evented';
import { Step } from './step';
import { isUndefined } from './utils';

const Shepherd = new Evented();

export class Tour extends Evented {
  constructor(options = {}) {
    super(options);
    this.bindMethods();
    this.options = options;
    this.steps = this.options.steps || [];

    // Pass these events onto the global Shepherd object
    const events = ['complete', 'cancel', 'start', 'show', 'active', 'inactive'];
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

  bindMethods() {
    const methods = [
      'next',
      'back',
      'cancel',
      'complete'
    ];
    methods.map((method) => {
      this[method] = this[method].bind(this);
    });
  }

  addStep(name, step) {
    if (isUndefined(step)) {
      step = name;
    }

    if (!(step instanceof Step)) {
      if (typeof name === 'string' || typeof name === 'number') {
        step.id = name.toString();
      }
      step = Object.assign({}, this.options.defaults, step);
      step = new Step(this, step);
    } else {
      step.tour = this;
    }

    this.steps.push(step);
    return step;
  }

  removeStep(name) {
    const current = this.getCurrentStep();

    for (let i = 0; i < this.steps.length; ++i) {
      const step = this.steps[i];
      if (step.id === name) {
        if (step.isOpen()) {
          step.hide();
        }
        step.destroy();
        this.steps.splice(i, 1);
        break;
      }
    }

    if (current && current.id === name) {
      this.currentStep = undefined;

      if (this.steps.length) {
        this.show(0);
      } else {
        this.cancel();
      }
    }
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

  next() {
    const index = this.steps.indexOf(this.currentStep);

    if (index === this.steps.length - 1) {
      this.complete();
    } else {
      this.show(index + 1, true);
    }
  }

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

    Shepherd.activeTour.steps.forEach((step) => {
      step.destroy();
    });
    Shepherd.activeTour = null;
    document.body.classList.remove('shepherd-active');
    this.trigger('inactive', { tour: this });
  }

  show(key = 0, forward = true) {
    if (this.currentStep) {
      this.currentStep.hide();
    } else {
      document.body.classList.add('shepherd-active');
      this.trigger('active', { tour: this });
    }

    Shepherd.activeTour = this;

    let next;

    if (typeof key === 'string') {
      next = this.getById(key);
    } else {
      next = this.steps[key];
    }

    if (next) {
      if (!isUndefined(next.options.showOn) && !next.options.showOn()) {
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
  }

  start() {
    this.trigger('start');

    this.currentStep = null;
    this.next();
  }
}

export { Shepherd };