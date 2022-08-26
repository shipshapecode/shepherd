/**
 * @todo
 *
 * @return {*[]}
 * @private
 */
function _getCenteredStylePopperModifier() {
  return [];
}

/**
 * Generates the array of options for a tooltip that doesn't have a
 * target element in the DOM -- and thus is positioned in the center
 * of the view
 *
 * @todo
 *
 * @param {Step} step The step instance
 * @return {Object} The final floatingUI options object
 */
export function makeCenteredFloatingUI(step) {
  const centeredStylePopperModifier = _getCenteredStylePopperModifier();

  let options = {
    placement: 'top',
    strategy: 'fixed',
    middleware: []
  };

  options = {
    ...options,
    middleware: Array.from(
      new Set([...options.middleware, ...centeredStylePopperModifier])
    )
  };

  return options;
}
