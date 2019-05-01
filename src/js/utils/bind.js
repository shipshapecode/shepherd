import { parseShorthand } from './utils.js';
import forOwn from 'lodash-es/forOwn';
import isString from 'lodash-es/isString';
import isUndefined from 'lodash-es/isUndefined';

/**
 * Sets up the handler to determine if we should advance the tour
 * @private
 */
function _setupAdvanceOnHandler(selector) {
  return (event) => {
    if (this.isOpen()) {
      const targetIsEl = this.el && event.target === this.el;
      const targetIsSelector = !isUndefined(selector) && event.target.matches(selector);

      if (targetIsSelector || targetIsEl) {
        this.tour.next();
      }
    }
  };
}

/**
 * Bind the event handler for advanceOn
 */
export function bindAdvance() {
  // An empty selector matches the step element
  const { event, selector } = parseShorthand(this.options.advanceOn, ['selector', 'event']);
  const handler = _setupAdvanceOnHandler.call(this, selector);

  // TODO: this should also bind/unbind on show/hide
  const el = document.querySelector(selector);
  if (!isUndefined(selector) && el) {
    el.addEventListener(event, handler);
  } else {
    document.body.addEventListener(event, handler, true);
  }
  this.on('destroy', () => {
    return document.body.removeEventListener(event, handler, true);
  });
}

/**
 * Bind events to the buttons for next, back, etc
 * @param {Object} cfg An object containing the config options for the button
 * @param {HTMLElement} el The element for the button
 */
export function bindButtonEvents(cfg, el) {
  cfg.events = cfg.events || {};
  if (!isUndefined(cfg.action)) {
    // Including both a click event and an action is not supported
    cfg.events.click = cfg.action;
  }

  forOwn(cfg.events, (handler, event) => {
    if (isString(handler)) {
      const page = handler;
      handler = () => this.tour.show(page);
    }
    el.dataset.buttonEvent = true;
    el.addEventListener(event, handler);

    // Cleanup event listeners on destroy
    this.on('destroy', () => {
      el.removeAttribute('data-button-event');
      el.removeEventListener(event, handler);
    });
  });
}

/**
 * Add a click listener to the cancel link that cancels the tour
 * @param {HTMLElement} link The cancel link element
 */
export function bindCancelLink(link) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    this.cancel();
  });
}

/**
 * Take an array of strings and look up methods by name, then bind them to `this`
 * @param {String[]} methods The names of methods to bind
 */
export function bindMethods(methods) {
  methods.map((method) => {
    this[method] = this[method].bind(this);
  });
}
