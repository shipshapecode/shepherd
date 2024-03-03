import { isUndefined } from './type-check';

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
      const targetIsEl = step.el && event.currentTarget === step.el;
      const targetIsSelector =
        !isUndefined(selector) && event.currentTarget.matches(selector);

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
    } catch (e) {
      // TODO
    }
    if (!isUndefined(selector) && !el) {
      return console.error(
        `No element was found for the selector supplied to advanceOn: ${selector}`
      );
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
    return console.error(
      'advanceOn was defined, but no event name was passed.'
    );
  }
}
