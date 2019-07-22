import { isString, isUndefined } from './type-check';

/**
 * Sets up the handler to determine if we should advance the tour
 * @param {string} selector
 * @param {Step} step The step instance
 * @return {Function}
 * @private
 */
function _setupAdvanceOnHandler(selector, step) {
  return (event) => {
    if (step.isOpen()) {
      const targetIsEl = step.el && event.target === step.el;
      const targetIsSelector = !isUndefined(selector) && event.target.matches(selector);

      if (targetIsSelector || targetIsEl) {
        step.tour.next();
      }
    }
  };
}

/**
 * Bind the event handler for advanceOn
 * @param {Step} step The step instance
 */
export function bindAdvance(step) {
  // An empty selector matches the step element
  const { event, selector } = step.options.advanceOn || {};
  if (event) {
    const handler = _setupAdvanceOnHandler(selector, step);

    // TODO: this should also bind/unbind on show/hide
    let el;
    try {
      el = document.querySelector(selector);
    } catch(e) {
      // TODO
    }
    if (!isUndefined(selector) && !el) {
      return console.error(`No element was found for the selector supplied to advanceOn: ${selector}`);
    } else if (el) {
      el.addEventListener(event, handler);
      step.on('destroy', () => {
        return el.removeEventListener(event, handler);
      });
    } else {
      document.body.addEventListener(event, handler, true);
      step.on('destroy', () => {
        return document.body.removeEventListener(event, handler, true);
      });
    }
  } else {
    return console.error('advanceOn was defined, but no event name was passed.');
  }
}

/**
 * Bind events to the buttons for next, back, etc
 * @param {Object} cfg An object containing the config options for the button
 * @param {HTMLElement} el The element for the button
 * @param {Step} step The step instance
 */
export function bindButtonEvents(cfg, el, step) {
  cfg.events = cfg.events || {};
  if (!isUndefined(cfg.action)) {
    // Including both a click event and an action is not supported
    cfg.events.click = cfg.action;
  }

  if (cfg.events) {
    Object.entries(cfg.events).forEach(([event, handler]) => {
      if (isString(handler)) {
        const page = handler;
        handler = () => step.tour.show(page);
      }
      el.dataset.buttonEvent = true;
      el.addEventListener(event, handler);

      // Cleanup event listeners on destroy
      step.on('destroy', () => {
        el.removeAttribute('data-button-event');
        el.removeEventListener(event, handler);
      });
    });
  }
}

/**
 * Add a click listener to the cancel link that cancels the tour
 * @param {HTMLElement} link The cancel link element
 * @param {Step} step The step instance
 */
export function bindCancelLink(link, step) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    step.cancel();
  });
}
