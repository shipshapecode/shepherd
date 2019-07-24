import { preventModalBodyTouch, preventModalOverlayTouch } from './modal.jsx';

/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param {HTMLElement} element The element to check for visibility
 * @returns {boolean} true if element is hidden
 * @private
 */
function elementIsHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

function addStepEventListeners() {
  if (typeof this._onScreenChange === 'function') {
    window.removeEventListener('resize', this._onScreenChange, false);
    window.removeEventListener('scroll', this._onScreenChange, true);
  }

  window.addEventListener('resize', this._onScreenChange, false);
  window.addEventListener('scroll', this._onScreenChange, true);

  const overlay = document.querySelector('#shepherdModalOverlayContainer');
  // Prevents window from moving on touch.
  window.addEventListener('touchmove', preventModalBodyTouch, { passive: false });

  // Allows content to move on touch.
  if (overlay) {
    overlay.addEventListener('touchmove', preventModalOverlayTouch, false);
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
  window.removeEventListener('touchmove', preventModalBodyTouch, {
    passive: false
  });
}

export {
  addStepEventListeners,
  elementIsHidden
};
