import type { Step } from '../step.ts';
import { isUndefined } from './type-check.ts';

/**
 * Sets up the handler to determine if we should advance the tour
 * @param step The step instance
 * @param selector
 * @private
 */
function _setupAdvanceOnHandler(step: Step, selector?: string) {
  return (event: Event) => {
    if (step.isOpen()) {
      const targetIsEl = step.el && event.currentTarget === step.el;
      const targetIsSelector =
        !isUndefined(selector) &&
        (event.currentTarget as HTMLElement).matches(selector);

      if (targetIsSelector || targetIsEl) {
        step.tour.next();
      }
    }
  };
}

/**
 * Bind the event handler for advanceOn
 * @param step The step instance
 */
export function bindAdvance(step: Step) {
  // An empty selector matches the step element
  const { event, selector } = step.options.advanceOn || {};
  if (event) {
    const handler = _setupAdvanceOnHandler(step, selector);

    // TODO: this should also bind/unbind on show/hide
    let el: Element | null = null;

    if (!isUndefined(selector)) {
      el = document.querySelector(selector);

      if (!el) {
        return console.error(
          `No element was found for the selector supplied to advanceOn: ${selector}`
        );
      }
    }

    if (el) {
      el.addEventListener(event, handler);
      step.on('destroy', () => {
        return (el as HTMLElement).removeEventListener(event, handler);
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
