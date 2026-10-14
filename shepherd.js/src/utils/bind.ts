import type { Step, StepAdvanceOnValue, StepAdvanceOnValues } from '../step.ts';
import { isUndefined } from './type-check.ts';

/**
 * Checks if a value matches any of the expected values
 * @param value The value to check
 * @param expected The expected value(s) to match against
 * @param element The element being checked
 * @returns true if the value matches any expected value
 */
function checkValueMatch(
  value: string,
  expected: StepAdvanceOnValues,
  element: HTMLElement
): boolean {
  if (Array.isArray(expected)) {
    return expected.some((e) => checkValueMatch(value, e, element));
  }

  if (expected instanceof RegExp) {
    return expected.test(value);
  }

  if (typeof expected === 'function') {
    return expected(value, element);
  }

  // String comparison
  return value === expected;
}

/**
 * Checks if an element's value matches the expected condition
 * @param element The element to check
 * @param advanceOn The advanceOn options
 * @returns true if the condition is met
 */
function checkElementCondition(
  element: HTMLElement,
  advanceOn: {
    value?: StepAdvanceOnValues;
    checked?: boolean;
  }
): boolean {
  const { value, checked } = advanceOn;

  // Check if we need to validate the checked state
  if (!isUndefined(checked)) {
    const isChecked = (element as HTMLInputElement).checked;
    if (isChecked !== checked) {
      return false;
    }
  }

  // Check if we need to validate the value
  if (!isUndefined(value)) {
    const elementValue = (element as HTMLInputElement | HTMLSelectElement).value;
    if (!checkValueMatch(elementValue, value, element)) {
      return false;
    }
  }

  return true;
}

/**
 * Sets up the handler to determine if we should advance the tour
 * @param step The step instance
 * @param selector
 * @param advanceOn The advanceOn options
 * @private
 */
function _setupAdvanceOnHandler(
  step: Step,
  selector?: string,
  advanceOn?: {
    value?: StepAdvanceOnValues;
    checked?: boolean;
  }
) {
  return (event: Event) => {
    if (step.isOpen()) {
      const targetIsEl = step.el && event.currentTarget === step.el;
      const targetIsSelector =
        !isUndefined(selector) &&
        (event.currentTarget as HTMLElement).matches(selector);

      const target = event.currentTarget as HTMLElement;

      // If we have conditions, check them
      if (advanceOn && target) {
        if (!checkElementCondition(target, advanceOn)) {
          return;
        }
      }

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
  const { event, selector, value, checked } = step.options.advanceOn || {};

  if (!event) {
    console.error('advanceOn was defined, but no event name was passed.');
    return;
  }

  const advanceOnOptions = { value, checked };
  const handler = _setupAdvanceOnHandler(step, selector, advanceOnOptions);

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

/**
 * Bind the event handler for advanceAfter
 * @param step The step instance
 * @return A function that removes the listener, or `undefined` if nothing was bound
 */
export function bindAdvanceAfter(step: Step): (() => void) | undefined {
  const advanceAfter = step.options.advanceAfter;

  if (!advanceAfter || typeof advanceAfter !== 'function') {
    return;
  }

  // Call the advanceAfter function and advance when the promise resolves
  const promise = Promise.resolve(advanceAfter.call(step));

  promise
    .then(() => {
      if (step.isOpen()) {
        step.tour.next();
      }
    })
    .catch((error) => {
      console.error('Error in advanceAfter:', error);
    });

  // Return a cleanup function that does nothing since we can't cancel a promise
  // The promise will resolve or reject on its own
  return () => {};
}
