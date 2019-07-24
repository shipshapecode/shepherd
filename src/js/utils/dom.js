/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param {HTMLElement} element The element to check for visibility
 * @returns {boolean} true if element is hidden
 * @private
 */
function elementIsHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
}

export {
  elementIsHidden
};
