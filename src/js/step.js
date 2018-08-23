import _ from 'lodash';
import Popper from 'popper.js';
import { Evented } from './evented';
import 'element-matches';
import {
  createFromHTML,
  parsePosition,
  parseShorthand
} from './utils';

/**
 * Creates incremented ID for each newly created step
 *
 * @private
 * @returns {Number}
 */
const uniqueId = (function() {
  let id = 0;
  return function() {
    return ++id;
  };
})();

export class Step extends Evented {
  constructor(tour, options) {
    super(tour, options);
    this.tour = tour;
    this.bindMethods();
    this.setOptions(options);
    return this;
  }

  /**
   * Adds buttons to the step as passed into options
   *
   * @private
   * @param {HTMLElement}
   */
  _addButtons(content) {
    const footer = document.createElement('footer');
    const buttons = createFromHTML('<ul class=\'shepherd-buttons\'></ul>');

    this.options.buttons.map((cfg) => {
      const button = createFromHTML(`<li><a class='shepherd-button ${cfg.classes || ''}'>${cfg.text}</a>`);
      buttons.appendChild(button);
      this.bindButtonEvents(cfg, button.querySelector('a'));
    });

    footer.appendChild(buttons);
    content.appendChild(footer);
  }

  /**
   * Adds text passed in as options
   *
   * @private
   * @param {HTMLElement}
   */
  _addContent(content) {
    const text = createFromHTML('<div class=\'shepherd-text\'></div>');
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

      paragraphs.map((paragraph) => {
        text.innerHTML += `<p>${paragraph}</p>`;
      });
    }

    content.appendChild(text);
  }

  /**
   * Attaches final element to default or passed location
   *
   * @private
   * @param {HTMLElement}
   */
  _attach(element) {
    const { renderLocation } = this.options;

    if (renderLocation) {
      if (renderLocation instanceof HTMLElement) {
        return renderLocation.appendChild(element);
      }
      if (typeof renderLocation === 'string') {
        return document.querySelector(renderLocation).appendChild(element);
      }
    }
    return document.body.appendChild(element);
  }

  /**
   * Creates Shepherd element for step based on options
   *
   * @private
   * @returns {HTMLElement} element
   */
  _createElement() {
    const content = document.createElement('div');
    const classes = this.options.classes || '';
    const element = createFromHTML(`<div class='${classes}' data-id='${this.id}' id="${this.options.idAttribute}"}>`);
    const header = document.createElement('header');

    content.classList.add('shepherd-content');
    element.appendChild(content);
    content.appendChild(header);

    if (this.options.attachTo) {
      element.appendChild(createFromHTML('<div class="popper__arrow" x-arrow></div>'));
    }

    if (!_.isUndefined(this.options.text)) {
      this._addContent(content);
    }

    if (this.options.buttons) {
      this._addButtons(content);
    }

    if (this.options.title) {
      header.innerHTML += `<h3 class='shepherd-title'>${this.options.title}</h3>`;
      element.classList.add('shepherd-has-title');
    }

    return element;
  }

  /**
   * Determines button options prior to rendering
   *
   * @private
   */
  _setUpButtons() {
    const { buttons } = this.options;
    if (!buttons) {
      return;
    }
    const buttonsAreDefault = _.isUndefined(buttons) || _.isEmpty(buttons);
    if (buttonsAreDefault) {
      return this.options.buttons = [{
        text: 'Next',
        action: this.tour.next,
        classes: 'btn'
      }];
    }

    const buttonsAreObject = _.isPlainObject(buttons);
    // Can pass in an object which will assume a single button
    if (buttonsAreObject) {
      return this.options.buttons = [this.options.buttons];
    }

    return buttons;
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

  setOptions(options = {}) {
    this.options = options;
    const { when } = this.options;

    this.destroy();
    this.id = this.options.id || this.id || `step-${uniqueId()}`;

    if (when) {
      for (const event in when) {
        if ({}.hasOwnProperty.call(when, event)) {
          const handler = when[event];
          this.on(event, handler, this);
        }
      }
    }

    this._setUpButtons();
  }

  getTour() {
    return this.tour;
  }

  bindAdvance() {
    // An empty selector matches the step element
    const { event, selector } = parseShorthand(this.options.advanceOn, ['selector', 'event']);
    const handler = (e) => {
      if (!this.isOpen()) {
        return;
      }

      if (!_.isUndefined(selector)) {
        if (e.target.matches(selector)) {
          this.tour.next();
        }
      } else {
        if (this.el && e.target === this.el) {
          this.tour.next();
        }
      }
    };

    // TODO: this should also bind/unbind on show/hide
    if (!_.isUndefined(selector)) {
      const el = document.querySelector(selector);
      el.addEventListener(event, handler);
    } else {
      document.body.addEventListener(event, handler);
    }
    this.on('destroy', () => {
      return document.body.removeEventListener(event, handler);
    });
  }

  getAttachTo() {
    const opts = parsePosition(this.options.attachTo) || {};
    const returnOpts = Object.assign({}, opts);

    if (typeof opts.element === 'string') {
      // Can't override the element in user opts reference because we can't
      // guarantee that the element will exist in the future.
      try {
        returnOpts.element = document.querySelector(opts.element);
      } catch(e) {
        // TODO
      }
      if (!returnOpts.element) {
        console.error(`The element for this Shepherd step was not found ${opts.element}`);
      }
    }

    return returnOpts;
  }

  setupPopper() {
    if (_.isUndefined(Popper)) {
      throw new Error('Using the attachment feature of Shepherd requires the Popper.js library');
    }

    const opts = this.getAttachTo();
    opts.modifiers = opts.modifiers || {};
    let attachment = opts.on || 'right';
    opts.positionFixed = false;

    if (_.isUndefined(opts.element)) {
      opts.element = document.body;
      attachment = 'top';

      opts.modifiers = Object.assign({
        computeStyle: {
          enabled: true,
          fn(data) {
            data.styles = Object.assign({}, data.styles, {
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            });

            return data;
          }
        }
      }, opts.modifiers);

      opts.positionFixed = true;
    }

    const popperOpts = Object.assign({}, {
      placement: attachment,
      arrowElement: this.el.querySelector('.popper__arrow'),
      modifiers: opts.modifiers,
      positionFixed: opts.positionFixed
    }, this.options.popperOptions);

    if (this.popper) {
      this.popper.destroy();
    }

    this.el.classList.add('shepherd-element');
    this.popper = new Popper(opts.element, this.el, popperOpts);

    this.target = opts.element;
    this.target.classList.add('shepherd-enabled', 'shepherd-target');
  }

  show() {
    if (!_.isUndefined(this.options.beforeShowPromise)) {
      const beforeShowPromise = this.options.beforeShowPromise();
      if (!_.isUndefined(beforeShowPromise)) {
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

    this.el.hidden = false;
    // We need to manually set styles for < IE11 support
    this.el.style.display = 'block';

    document.body.setAttribute('data-shepherd-step', this.id);

    this.setupPopper();

    if (this.options.scrollTo) {
      setTimeout(() => {
        this.scrollTo();
      });
    }

    this.trigger('show');
  }

  hide() {
    this.trigger('before-hide');

    if (this.el) {
      this.el.hidden = true;
      // We need to manually set styles for < IE11 support
      this.el.style.display = 'none';
    }

    document.body.removeAttribute('data-shepherd-step');

    if (this.target) {
      this.target.classList.remove('shepherd-enabled', 'shepherd-target');
    }

    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = null;

    this.trigger('hide');
  }

  isOpen() {
    return this.el && !this.el.hidden;
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
    const { element } = this.getAttachTo();

    if (!_.isUndefined(this.options.scrollToHandler)) {
      this.options.scrollToHandler(element);
    } else if (!_.isUndefined(element)) {
      element.scrollIntoView();
    }
  }

  destroy() {
    if (!_.isUndefined(this.el) && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      delete this.el;
    }

    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = null;

    this.trigger('destroy');
  }

  render() {
    if (!_.isUndefined(this.el)) {
      this.destroy();
    }
    this.el = this._createElement();

    if (this.options.showCancelLink) {
      const link = createFromHTML('<a href class="shepherd-cancel-link"></a>');
      document.querySelector('.shepherd-content header').appendChild(link);

      this.el.classList.add('shepherd-has-cancel-link');

      this.bindCancelLink(link);
    }

    if (this.options.advanceOn) {
      this.bindAdvance();
    }

    this._attach(this.el);

    this.setupPopper();
  }

  bindCancelLink(link) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      this.cancel();
    });
  }

  bindButtonEvents(cfg, el) {
    cfg.events = cfg.events || {};
    if (!_.isUndefined(cfg.action)) {
      // Including both a click event and an action is not supported
      cfg.events.click = cfg.action;
    }

    for (const event in cfg.events) {
      if ({}.hasOwnProperty.call(cfg.events, event)) {
        let handler = cfg.events[event];
        if (typeof handler === 'string') {
          const page = handler;
          handler = () => this.tour.show(page);
        }
        el.dataset.buttonEvent = true;
        el.addEventListener(event, handler);
      }
    }

    this.on('destroy', () => {
      for (const event in cfg.events) {
        if ({}.hasOwnProperty.call(cfg.events, event)) {
          const handler = cfg.events[event];
          el.removeAttribute('data-button-event');
          el.removeEventListener(event, handler);
        }
      }
    });
  }
}
