import { elementIds } from './modal';
import { preventModalBodyTouch, preventModalOverlayTouch } from './modal';

/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param {HTMLElement} element The element to check for visibility
 * @returns {boolean} true if element is hidden
 * @private
 */
function elementIsHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

/**
 * Get the element from an option object
 *
 * @method getElementFromObject
 * @param Object attachTo
 * @returns {Element}
 * @private
 */
function getElementFromObject(attachTo) {
  const op = attachTo.element;

  if (op instanceof HTMLElement) {
    return op;
  }

  return document.querySelector(op);
}

/**
 * Return the element for a step
 *
 * @method getElementForStep
 * @param step step the step to get an element for
 * @returns {Element} the element for this step
 * @private
 */
function getElementForStep(step) {
  const { options: { attachTo } } = step;

  if (!attachTo) {
    return null;
  }

  const type = typeof attachTo;

  let element;

  if (type === 'string') {
    element = getElementFromString(attachTo);
  } else if (type === 'object') {
    element = getElementFromObject(attachTo);
  } else {
    /* istanbul ignore next: cannot test undefined attachTo, but it does work! */
    element = null;
  }
  return element;
}

/**
 * Get the element from an option string
 *
 * @method getElementFromString
 * @param element the string in the step configuration
 * @returns {Element} the element from the string
 * @private
 */
function getElementFromString(element) {
  const [selector] = element.split(' ');

  return document.querySelector(selector);
}

function addStepEventListeners() {
  if (typeof this._onScreenChange === 'function') {
    window.removeEventListener('resize', this._onScreenChange, false);
    window.removeEventListener('scroll', this._onScreenChange, true);
  }

  window.addEventListener('resize', this._onScreenChange, false);
  window.addEventListener('scroll', this._onScreenChange, true);

  const overlay = document.querySelector(`#${elementIds.modalOverlay}`);
  // Prevents window from moving on touch.
  window.addEventListener('touchmove', preventModalBodyTouch, { passive: false });

  // Allows content to move on touch.
  if (overlay) {
    overlay.addEventListener('touchmove', preventModalOverlayTouch, false);
  }
}

export {
  addStepEventListeners,
  elementIsHidden,
  getElementForStep
};
