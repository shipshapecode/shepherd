function _getCenteredStylePopperModifier() {
  return [];
}

/**
 * Generates a modifier for popper that will help focus the element after it has
 * been rendered
 *
 * @param {Step} step The step instance
 * @return {Object} The focus after render modifier configuration object
 */
export function generateFocusMiddleware(step) {
  return {
    name: 'focusAfterRender',
    fn(position) {
      setTimeout(() => {
        if (step.el) {
          step.el.focus({ preventScroll: true });
        }
      }, 300);
      return position;
    }
  };
}

/**
 * Generates the array of options for a tooltip that doesn't have a
 * target element in the DOM -- and thus is positioned in the center
 * of the view
 *
 * @param {Step} step The step instance
 * @return {Object} The final floatingUI options object
 */
export function makeCenteredFloatingUI(step) {
  const centeredStylePopperModifier = _getCenteredStylePopperModifier();

  let options = {
    placement: 'top',
    strategy: 'fixed',
    middleware: [generateFocusMiddleware(step)]
  };

  options = {
    ...options,
    middleware: Array.from(
      new Set([...options.middleware, ...centeredStylePopperModifier])
    )
  };

  return options;
}
