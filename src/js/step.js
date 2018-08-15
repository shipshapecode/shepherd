import Popper from 'popper.js';
import { Evented } from './evented';
import {
  createFromHTML,
  isObject,
  isUndefined,
  matchesSelector,
  parsePosition,
  parseShorthand
} from './utils';

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
    this.destroy();

    this.id = this.options.id || this.id || `step-${uniqueId()}`;

    const { when } = this.options;
    if (when) {
      for (const event in when) {
        if ({}.hasOwnProperty.call(when, event)) {
          const handler = when[event];
          this.on(event, handler, this);
        }
      }
    }

    // Button configuration

    const buttonsJson = JSON.stringify(this.options.buttons);
    const buttonsAreDefault = isUndefined(buttonsJson) ||
      buttonsJson === 'true';

    const buttonsAreEmpty = buttonsJson === '{}' ||
      buttonsJson === '[]' ||
      buttonsJson === 'null' ||
      buttonsJson === 'false';

    const buttonsAreArray = !buttonsAreDefault && Array.isArray(this.options.buttons);

    const buttonsAreObject = !buttonsAreDefault && isObject(this.options.buttons);

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
    const { event, selector } = parseShorthand(this.options.advanceOn, ['selector', 'event']);

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
    if (isUndefined(Popper)) {
      throw new Error('Using the attachment feature of Shepherd requires the Popper.js library');
    }

    const opts = this.getAttachTo();
    opts.modifiers = opts.modifiers || {};
    let attachment = opts.on || 'right';
    opts.positionFixed = false;

    if (isUndefined(opts.element)) {
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
      // constraints: [{ // Pretty much handled by popper
      //     to: 'window',
      //     pin: true,
      //     attachment: 'together' // Might be interested in https://popper.js.org/popper-documentation.html#modifiers..keepTogether
      // }],
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

    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = null;

    this.trigger('destroy');
  }

  render() {
    if (!isUndefined(this.el)) {
      this.destroy();
    }

    this.el = createFromHTML(`<div class='${this.options.classes || ''}' data-id='${this.id}' ${this.options.idAttribute ? `id="${this.options.idAttribute}"` : ''}>`);

    if (this.options.attachTo) {
      this.el.appendChild(createFromHTML('<div class="popper__arrow" x-arrow></div>'));
    }

    const content = document.createElement('div');
    content.classList.add('shepherd-content');
    this.el.appendChild(content);

    const header = document.createElement('header');
    content.appendChild(header);

    if (this.options.title) {
      header.innerHTML += `<h3 class='shepherd-title'>${this.options.title}</h3>`;
      this.el.classList.add('shepherd-has-title');
    }

    if (this.options.showCancelLink) {
      const link = createFromHTML('<a href class="shepherd-cancel-link"></a>');
      header.appendChild(link);

      this.el.classList.add('shepherd-has-cancel-link');

      this.bindCancelLink(link);
    }

    if (!isUndefined(this.options.text)) {
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

    if (this.options.buttons) {
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

    const { renderLocation } = this.options;

    if (renderLocation) {
      if (renderLocation instanceof HTMLElement) {
        renderLocation.appendChild(this.el);
      } else if (typeof renderLocation === 'string') {
        document.querySelector(renderLocation).appendChild(this.el);
      }
    } else {
      document.body.appendChild(this.el);
    }

    this.setupPopper();

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

    for (const event in cfg.events) {
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
      for (const event in cfg.events) {
        if ({}.hasOwnProperty.call(cfg.events, event)) {
          const handler = cfg.events[event];
          el.removeEventListener(event, handler);
        }
      }
    });
  }
}