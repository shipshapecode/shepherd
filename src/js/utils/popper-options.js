function _getCenteredStylePopperModifier() {
  return {
    computeStyle: {
      enabled: true,
      fn(data) {
        data.styles = Object.assign({}, data.styles, {
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        });

        return data;
      }
    }
  };
}

/**
 * Generates the hash of options that will be passed to `Popper` instances
 * target an element in the DOM.
 *
 * @param {Object} attachToOptions The local `attachTo` options
 * @param {Step} step The step instance
 * @return {Object} The final popper options object
 */
export function makeAttachedPopperOptions(attachToOptions, step) {
  let popperOptions = _makeCommonPopperOptions(step);

  popperOptions.placement = attachToOptions.on || 'right';

  if (step.options && step.options.popperOptions) {
    const stepPopperOptions = step.options.popperOptions;
    popperOptions = {
      ...popperOptions,
      ...stepPopperOptions,
      modifiers: {
        ...popperOptions.modifiers,
        ...stepPopperOptions.modifiers
      }
    };
  }

  return popperOptions;
}

/**
 * Generates the hash of options for a tooltip that doesn't have a
 * target element in the DOM -- and thus is positioned in the center
 * of the view
 *
 * @param {Step} step The step instance
 * @return {Object} The final Popper options object
 */
export function makeCenteredPopper(step) {
  const centeredStylePopperModifier = _getCenteredStylePopperModifier(step);
  let popperOptions = _makeCommonPopperOptions(step);

  popperOptions.placement = 'top';

  popperOptions = {
    ...popperOptions,
    modifiers: {
      ...popperOptions.modifiers,
      ...centeredStylePopperModifier
    }
  };

  return popperOptions;
}

function _makeCommonPopperOptions() {
  const popperOptions = {
    positionFixed: true,
    modifiers: {}
  };

  return popperOptions;
}
