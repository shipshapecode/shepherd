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

function isUndefined(obj) {
  return typeof obj === 'undefined'
};

function isArray(obj) {
  return obj && obj.constructor === Array;
};

function isObject(obj) {
  return obj && obj.constructor === Object;
};

function isObjectLoose(obj) {
  return typeof obj === 'object';
};

const ATTACHMENT = {
  'top right': 'bottom left',
  'top left': 'bottom right',
  'top center': 'bottom center',
  'middle right': 'middle left',
  'middle left': 'middle right',
  'middle center': 'middle center',
  'bottom left': 'top right',
  'bottom right': 'top left',
  'bottom center': 'top center',
  'top': 'bottom center',
  'left': 'middle right',
  'right': 'middle left',
  'bottom': 'top center',
  'center': 'middle center',
  'middle': 'middle center'
};

function createFromHTML (html) {
  let el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

function matchesSelector (el, sel) {
  let matches;
  if (!isUndefined(el.matches)) {
    matches = el.matches;
  } else if (!isUndefined(el.matchesSelector)) {
    matches = el.matchesSelector;
  } else if (!isUndefined(el.msMatchesSelector)) {
    matches = el.msMatchesSelector;
  } else if (!isUndefined(el.webkitMatchesSelector)) {
    matches = el.webkitMatchesSelector;
  } else if (!isUndefined(el.mozMatchesSelector)) {
    matches = el.mozMatchesSelector;
  } else if (!isUndefined(el.oMatchesSelector)) {
    matches = el.oMatchesSelector;
  }
  return matches.call(el, sel);
}

const positionRe = /^(.+) (top|left|right|bottom|center|\[[a-z ]+\])$/

function parsePosition (str) {
  if (isObjectLoose(str)) {
    if (str.hasOwnProperty("element") && str.hasOwnProperty("on")) {
      return str;
    }
    return null;
  }

  let matches = positionRe.exec(str);
  if (!matches) {
    return null;
  }

  let on = matches[2];
  if (on[0] === '['){
    on = on.substring(1, on.length - 1);
  }

  return {
    'element': matches[1],
    'on': on
  };
}

function parseShorthand (obj, props) {
  if (obj === null || isUndefined(obj)) {
    return obj;
  } else if (isObjectLoose(obj)) {
    return obj;
  }

  let vals = obj.split(' ');
  let out = {};
  let j = props.length - 1;
  for (let i = vals.length - 1; i >= 0; i--){
    if (j === 0){
      out[props[j]] = vals.slice(0, i + 1).join(' ');
      break;
    } else {
      out[props[j]] = vals[i];
    }

    j--;
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
      'destroy',
      'render'
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

    // Button configuration

    const buttonsJson = JSON.stringify(this.options.buttons);
    const buttonsAreDefault = isUndefined(buttonsJson) ||
                              buttonsJson === "true";

    const buttonsAreEmpty = buttonsJson === "{}" ||
                            buttonsJson === "[]" ||
                            buttonsJson === "null" ||
                            buttonsJson === "false";

    const buttonsAreArray = !buttonsAreDefault && isArray(this.options.buttons)

    const buttonsAreObject = !buttonsAreDefault && isObject(this.options.buttons)

    // Show default button if undefined or 'true'
    if (buttonsAreDefault) {
      this.options.buttons = [{
        text: 'Next',
        action: this.tour.next,
        classes: 'btn'
      }];

    // Can pass in an object which will assume asingle button
    } else if (!buttonsAreEmpty && buttonsAreObject) {
      this.options.buttons = [this.options.buttons];

    // Falsey/empty values or non-object values prevent buttons from rendering
    } else if (buttonsAreEmpty || !buttonsAreArray) {
      this.options.buttons = false;
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

      if (!isUndefined(selector)) {
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
    let opts = parsePosition(this.options.attachTo) || {};
    let returnOpts = extend({}, opts);

    if (typeof opts.element === 'string') {
      // Can't override the element in user opts reference because we can't
      // guarantee that the element will exist in the future.
      returnOpts.element = document.querySelector(opts.element);
      if (!returnOpts.element) {
        console.error(`The element for this Shepherd step was not found ${opts.element}`);
      }
    }

    return returnOpts;
  }

  setupTether() {
    if (isUndefined(Tether)) {
      throw new Error("Using the attachment feature of Shepherd requires the Tether library");
    }

    let opts = this.getAttachTo();
    let attachment = ATTACHMENT[opts.on] || ATTACHMENT.right;
    if (isUndefined(opts.element)) {
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
    if (!isUndefined(this.options.beforeShowPromise)) {
      const beforeShowPromise = this.options.beforeShowPromise();
      if (!isUndefined(beforeShowPromise)) {
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
    return this.el && hasClass(this.el, 'shepherd-open');
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

    if (!isUndefined(this.options.scrollToHandler)) {
      this.options.scrollToHandler(element);
    } else if (!isUndefined(element)) {
      element.scrollIntoView();
    }
  }

  destroy() {
    if (!isUndefined(this.el) && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      delete this.el;
    }

    if (this.tether) {
      this.tether.destroy();
    }
    this.tether = null;

    this.trigger('destroy');
  }

  render() {
    if (!isUndefined(this.el)) {
      this.destroy();
    }

    this.el = createFromHTML(`<div class='shepherd-step ${ this.options.classes || '' }' data-id='${ this.id }' ${ this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : '' }></div>`);

    let content = document.createElement('div');
    content.className = 'shepherd-content';
    this.el.appendChild(content);

    let header = document.createElement('header');
    content.appendChild(header);

    if (this.options.title) {
      header.innerHTML += `<h3 class='shepherd-title'>${ this.options.title }</h3>`;
      this.el.className += ' shepherd-has-title';
    }

    if (this.options.showCancelLink) {
      const link = createFromHTML("<a href class='shepherd-cancel-link'>✕</a>");
      header.appendChild(link);

      this.el.className += ' shepherd-has-cancel-link';

      this.bindCancelLink(link);
    }

    if (!isUndefined(this.options.text)) {
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

    if (this.options.buttons) {
      const footer = document.createElement('footer');
      let buttons = createFromHTML("<ul class='shepherd-buttons'></ul>");

      this.options.buttons.map(cfg => {
        const button = createFromHTML(`<li><a class='shepherd-button ${ cfg.classes || '' }'>${ cfg.text }</a>`);
        buttons.appendChild(button);
        this.bindButtonEvents(cfg, button.querySelector('a'));
      });

      footer.appendChild(buttons);
      content.appendChild(footer);
    }


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
    if (!isUndefined(cfg.action)) {
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
    if (isUndefined(step)) {
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

    if (current && current.id === name){
      this.currentStep = undefined;

      if (this.steps.length)
        this.show(0);
      else
        this.hide();
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
    if (this.currentStep) {
      this.currentStep.hide();
    }
    this.trigger('cancel');
    this.done();
  }

  complete() {
    if (this.currentStep) {
      this.currentStep.hide();
    }
    this.trigger('complete');
    this.done();
  }

  hide() {
    if (this.currentStep) {
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
      if (!isUndefined(next.options.showOn) && !next.options.showOn()) {
        const index = this.steps.indexOf(next);
        const nextIndex = forward ? index + 1 : index - 1;
        this.show(nextIndex, forward);
      } else {
        this.trigger('show', {
          step: next,
          previous: this.currentStep
        });

        if (this.currentStep) {
          this.currentStep.hide();
        }

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
