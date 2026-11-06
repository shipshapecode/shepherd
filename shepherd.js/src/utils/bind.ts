import type { Step } from '../step.ts';
import { isUndefined } from './type-check.ts';

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

  const handler = (e: Event) => {
    if (
      step.isOpen() &&
      !isUndefined(selector) &&
      (e.currentTarget as HTMLElement).matches(selector)
    ) {
      step.tour.next();
    }
  };

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
