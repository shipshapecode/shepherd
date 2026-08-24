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
 * @return A function that removes the listener, or `undefined` if nothing was bound
 */
export function bindAdvance(step: Step): (() => void) | undefined {
  // An empty selector matches the step element
  const { event, selector } = step.options.advanceOn || {};

  if (!event) {
    console.error('advanceOn was defined, but no event name was passed.');
    return;
  }

  const handler = _setupAdvanceOnHandler(step, selector);

  if (!isUndefined(selector)) {
    const el = document.querySelector(selector);

    if (!el) {
      console.error(
        `No element was found for the selector supplied to advanceOn: ${selector}`
      );
      return;
    }

    el.addEventListener(event, handler);
    return () => el.removeEventListener(event, handler);
  }

  document.body.addEventListener(event, handler, true);
  return () => document.body.removeEventListener(event, handler, true);
}
