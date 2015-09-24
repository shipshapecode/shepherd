/* global Tether */

const {
  Evented,
  addClass,
  extend,
  hasClass,
  removeClass,
  uniqueId
} = Tether.Utils;

let Shepherd = new Evented;

const ATTACHMENT = {
  'top': 'bottom center',
  'left': 'middle right',
  'right': 'middle left',
  'bottom': 'top center',
  'center': 'middle center'
};

function createFromHTML (html) {
  let el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

function matchesSelector (el, sel) {
  let matches;
  if (typeof el.matches !== 'undefined') {
    matches = el.matches;
  } else if (typeof el.matchesSelector !== 'undefined') {
    matches = el.matchesSelector;
  } else if (typeof el.msMatchesSelector !== 'undefined') {
    matches = el.msMatchesSelector;
  } else if (typeof el.webkitMatchesSelector !== 'undefined') {
    matches = el.webkitMatchesSelector;
  } else if (typeof el.mozMatchesSelector !== 'undefined') {
    matches = el.mozMatchesSelector;
  } else if (typeof el.oMatchesSelector !== 'undefined') {
    matches = el.oMatchesSelector;
  }
  return matches.call(el, sel);
}

function parseShorthand (obj, props) {
  if (obj === null || typeof obj === 'undefined') {
    return obj;
  } else if (typeof obj === 'object') {
    return obj;
  }

  let vals = obj.split(' ');
  const valsLen = vals.length;
  const propsLen = props.length;
  if (valsLen > propsLen) {
    vals[0] = vals.slice(0, (valsLen - propsLen) + 1).join(' ');
    vals.splice(1, (valsLen, propsLen));
  }

  let out = {};
  for (let i = 0; i < propsLen; ++i) {
    const prop = props[i];
    out[prop] = vals[i];
  }

  return out;
}

class Step extends Evented {

  constructor(tour, options) {
    super(tour, options);
    this.tour = tour;
    this.bindMethods();
    this.setOptions(options);
    return this;
  }

  bindMethods() {
    const methods = [
      '_show',
      'show',
      'hide',
      'isOpen',
      'cancel',
      'complete',
      'scrollTo',
      'destroy'
    ];
    methods.map((method) => {
      this[method] = this[method].bind(this);
    });
  }

  setOptions(options={}) {
    this.options = options;
    this.destroy();

    this.id = this.options.id || this.id || `step-${ uniqueId() }`;

    const when = this.options.when;
    if (when) {
      for (let event in when) {
        if ({}.hasOwnProperty.call(when, event)) {
          let handler = when[event];
          this.on(event, handler, this);
        }
      }
    }

    if (!this.options.buttons) {
      this.options.buttons = [{
        text: 'Next',
        action: this.tour.next
      }];
    }
  }

  getTour() {
    return this.tour;
  }

  bindAdvance() {
    // An empty selector matches the step element
    const {event, selector} = parseShorthand(this.options.advanceOn, ['selector', 'event']);

    const handler = (e) => {
      if (!this.isOpen()) {
        return;
      }

      if (typeof selector !== 'undefined') {
        if (matchesSelector(e.target, selector)) {
          this.tour.next();
        }
      } else {
        if (this.el && e.target === this.el) {
          this.tour.next();
        }
      }
    };

    // TODO: this should also bind/unbind on show/hide
    document.body.addEventListener(event, handler);
    this.on('destroy', () => {
      return document.body.removeEventListener(event, handler);
    });
  }

  getAttachTo() {
    let opts = parseShorthand(this.options.attachTo, ['element', 'on']) || {};
    const selector = opts.element;

    if (typeof selector === 'string') {
      opts.element = document.querySelector(selector);

      if (!opts.element) {
        throw new Error(`The element for this Shepherd step was not found ${selector}`);
      }
    }

    return opts;
  }

  setupTether() {
    if (typeof Tether === 'undefined') {
      throw new Error("Using the attachment feature of Shepherd requires the Tether library");
    }

    let opts = this.getAttachTo();
    let attachment = ATTACHMENT[opts.on || 'right'];
    if (typeof opts.element === 'undefined') {
      opts.element = 'viewport';
      attachment = 'middle center';
    }

    const tetherOpts = {
      classPrefix: 'shepherd',
      element: this.el,
      constraints: [{
        to: 'window',
        pin: true,
        attachment: 'together'
      }],
      target: opts.element,
      offset: opts.offset || '0 0',
      attachment: attachment
    };

    if (this.tether) {
      this.tether.destroy();
    }

    this.tether = new Tether(extend(tetherOpts, this.options.tetherOptions));
  }

  show() {
    if (typeof this.options.beforeShowPromise !== 'undefined') {
      const beforeShowPromise = this.options.beforeShowPromise();
      if (typeof beforeShowPromise !== 'undefined') {
        return beforeShowPromise.then(() => this._show());
      }
    }
    this._show();
  }

  _show() {
    this.trigger('before-show');

    if (!this.el) {
      this.render();
    }

    addClass(this.el, 'shepherd-open');

    document.body.setAttribute('data-shepherd-step', this.id);

    this.setupTether();

    if (this.options.scrollTo) {
      setTimeout(() => {
        this.scrollTo();
      });
    }

    this.trigger('show');
  }

  hide() {
    this.trigger('before-hide');

    removeClass(this.el, 'shepherd-open');

    document.body.removeAttribute('data-shepherd-step');

    if (this.tether) {
      this.tether.destroy();
    }
    this.tether = null;

    this.trigger('hide');
  }

  isOpen() {
    return hasClass(this.el, 'shepherd-open');
  }

  cancel() {
    this.tour.cancel();
    this.trigger('cancel');
  }

  complete() {
    this.tour.complete();
    this.trigger('complete');
  }

  scrollTo() {
    const {element} = this.getAttachTo();

    if (typeof this.options.scrollToHandler !== 'undefined') {
      this.options.scrollToHandler(element);
    } else if (typeof element !== 'undefined'){
      element.scrollIntoView();
    }
  }

  destroy() {
    if (typeof this.el !== 'undefined') {
      document.body.removeChild(this.el);
      delete this.el;
    }

    if (this.tether) {
      this.tether.destroy();
    }
    this.tether = null;

    this.trigger('destroy');
  }

  render() {
    if (typeof this.el !== 'undefined') {
      this.destroy();
    }

    this.el = createFromHTML(`<div class='shepherd-step ${ this.options.classes || '' }' data-id='${ this.id }' ${ this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : '' }></div>`);

    let content = document.createElement('div');
    content.className = 'shepherd-content';
    this.el.appendChild(content);

    let header = document.createElement('header');
    content.appendChild(header);

    if (typeof this.options.title !== 'undefined') {
      header.innerHTML += `<h3 class='shepherd-title'>${ this.options.title }</h3>`;
      this.el.className += ' shepherd-has-title';
    }

    if (this.options.showCancelLink) {
      const link = createFromHTML("<a href class='shepherd-cancel-link'>✕</a>");
      header.appendChild(link);

      this.el.className += ' shepherd-has-cancel-link';

      this.bindCancelLink(link);
    }

    if (typeof this.options.text !== 'undefined') {
      const text = createFromHTML("<div class='shepherd-text'></div>");
      let paragraphs = this.options.text;

      if (typeof paragraphs === 'function') {
        paragraphs = paragraphs.call(this, text);
      }

      if (paragraphs instanceof HTMLElement) {
        text.appendChild(paragraphs);
      } else {
        if (typeof paragraphs === 'string') {
          paragraphs = [paragraphs];
        }

        paragraphs.map(paragraph => {
          text.innerHTML += `<p>${ paragraph }</p>`;
        });
      }

      content.appendChild(text);
    }

    const footer = document.createElement('footer');

    if (this.options.buttons) {
      let buttons = createFromHTML("<ul class='shepherd-buttons'></ul>");

      this.options.buttons.map(cfg => {
        const button = createFromHTML(`<li><a class='shepherd-button ${ cfg.classes || '' }'>${ cfg.text }</a>`);
        buttons.appendChild(button);
        this.bindButtonEvents(cfg, button.querySelector('a'));
      });

      footer.appendChild(buttons);
    }

    content.appendChild(footer);

    document.body.appendChild(this.el);

    this.setupTether();

    if (this.options.advanceOn) {
      this.bindAdvance();
    }
  }

  bindCancelLink(link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      this.cancel();
    });
  }

  bindButtonEvents(cfg, el) {
    cfg.events = cfg.events || {};
    if (typeof cfg.action !== 'undefined') {
      // Including both a click event and an action is not supported
      cfg.events.click = cfg.action;
    }

    for (let event in cfg.events) {
      if ({}.hasOwnProperty.call(cfg.events, event)) {
        let handler = cfg.events[event];
        if (typeof handler === 'string') {
          const page = handler;
          handler = () => this.tour.show(page);
        }
        el.addEventListener(event, handler);
      }
    }

    this.on('destroy', () => {
      for (let event in cfg.events) {
        if ({}.hasOwnProperty.call(cfg.events, event)) {
          const handler = cfg.events[event];
          el.removeEventListener(event, handler);
        }
      }
    });
  }

}


class Tour extends Evented {

  constructor(options={}) {
    super(options);
    this.bindMethods();
    this.options = options;
    this.steps = this.options.steps || [];

    // Pass these events onto the global Shepherd object
    const events = ['complete', 'cancel', 'hide', 'start', 'show', 'active', 'inactive'];
    events.map(event => {
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
      'complete',
      'hide'
    ];
    methods.map((method) => {
      this[method] = this[method].bind(this);
    });
  }

  addStep(name, step) {
    if (typeof step === 'undefined') {
      step = name;
    }

    if (!(step instanceof Step)) {
      if (typeof name === 'string' || typeof name === 'number') {
        step.id = name.toString();
      }
      step = extend({}, this.options.defaults, step);
      step = new Step(this, step);
    } else {
      step.tour = this;
    }

    this.steps.push(step);
    return this;
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
      this.hide(index);
      this.trigger('complete');
      this.done();
    } else {
      this.show(index + 1, true);
    }
  }

  back() {
    const index = this.steps.indexOf(this.currentStep);
    this.show(index - 1, false);
  }

  cancel() {
    if (typeof this.currentStep !== 'undefined') {
      this.currentStep.hide();
    }
    this.trigger('cancel');
    this.done();
  }

  complete() {
    if (typeof this.currentStep !== 'undefined') {
      this.currentStep.hide();
    }
    this.trigger('complete');
    this.done();
  }

  hide() {
    if (typeof this.currentStep !== 'undefined') {
      this.currentStep.hide();
    }
    this.trigger('hide');
    this.done();
  }

  done() {
    Shepherd.activeTour = null;
    removeClass(document.body, 'shepherd-active');
    this.trigger('inactive', {tour: this});
  }

  show(key=0, forward=true) {
    if (this.currentStep) {
      this.currentStep.hide();
    } else {
      addClass(document.body, 'shepherd-active');
      this.trigger('active', {tour: this});
    }

    Shepherd.activeTour = this;

    let next;

    if (typeof key === 'string') {
      next = this.getById(key);
    } else {
      next = this.steps[key];
    }

    if (next) {
      if (typeof next.options.showOn !== 'undefined' && !next.options.showOn()) {
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

extend(Shepherd, {Tour, Step, Evented});
