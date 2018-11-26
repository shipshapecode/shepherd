import { defer } from 'lodash';
import { classNames as modalClassNames } from './modal';
import { getElementForStep } from './dom';

/**
 * Removes svg mask from modal overlay and removes classes for modal being visible
 */
export function cleanupModal() {
  defer(() => {
    const element = this._modalOverlayElem;

    if (element && element instanceof SVGElement) {
      element.parentNode.removeChild(element);
    }

    this._modalOverlayElem = null;
    document.body.classList.remove(modalClassNames.isVisible);
  });
}

/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
export function cleanupSteps(tour) {
  if (tour) {
    const { steps } = tour;

    steps.forEach((step) => {
      if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
        const stepElement = getElementForStep(step);

        if (stepElement instanceof HTMLElement) {
          stepElement.style.pointerEvents = 'auto';
        }
      }
    });
  }
}

/**
 * Remove resize and scroll event listeners
 */
export function cleanupStepEventListeners() {
  if (typeof this._onScreenChange === 'function') {
    window.removeEventListener('resize', this._onScreenChange, false);
    window.removeEventListener('scroll', this._onScreenChange, false);

    this._onScreenChange = null;
  }
}
