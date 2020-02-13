function _getCenteredStylePopperModifier() {
  return [
    {
      name: 'applyStyles',
      fn({ state }) {
        Object.keys(state.elements).forEach((name) => {
          if (name !== 'popper') {
            return;
          }
          const style = {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          };

          const attributes = state.attributes[name] || {};
          const element = state.elements[name];

          Object.assign(element.style, style);
          Object.keys(attributes).forEach((name) => {
            const value = attributes[name];
            if (value === false) {
              element.removeAttribute(name);
            } else {
              element.setAttribute(name, value === true ? '' : value);
            }
          });
        });
      }
    },
    {
      name: 'computeStyles',
      options: {
        adaptive: false
      }
    }
  ];
}

/**
 * Generates the array of options for a tooltip that doesn't have a
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
  popperOptions.strategy = 'absolute';

  popperOptions = {
    ...popperOptions,
    modifiers: Array.from(new Set([...popperOptions.modifiers, ...centeredStylePopperModifier]))
  };

  return popperOptions;
}

function _makeCommonPopperOptions() {
  const popperOptions = {
    strategy: 'fixed',
    modifiers: []
  };

  return popperOptions;
}