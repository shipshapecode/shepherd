import type { Tour } from '../tour.ts';
import { isHTMLElement } from './type-check.ts';

/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
export function cleanupSteps(tour: Tour) {
  if (tour) {
    const { steps } = tour;

    steps.forEach((step) => {
      if (
        step.options &&
        step.options.canClickTarget === false &&
        step.options.attachTo
      ) {
        if (isHTMLElement(step.target)) {
          step.target.classList.remove('shepherd-target-click-disabled');
        }
      }
    });
  }
}
