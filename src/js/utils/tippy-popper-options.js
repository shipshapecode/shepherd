const addHasTitleClass = () => {
  return { addHasTitleClass: _createClassModifier('shepherd-has-title') };
};

/**
 * Create a popper modifier for adding the passed className to the popper
 * @param {string} className The class to add to the popper
 * @return {{fn(*): *, enabled: boolean}|*}
 * @private
 */
function _createClassModifier(className) {
  return {
    enabled: true,
    fn(data) {
      data.instance.popper.classList.add(className);
      return data;
    }
  };
}

function _getCenteredStylePopperModifier(step) {
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
    },
    addClassPrefix: _createClassModifier(step.classPrefix),
    addShepherdClass: _createClassModifier('shepherd')
  };
}

/**
 * Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)
 * @private
 */
function _getDefaultPopperOptions(step) {
  return {
    positionFixed: true,
    modifiers: {
      addClassPrefix: _createClassModifier(step.classPrefix),
      addShepherdClass: _createClassModifier('shepherd')
    }
  };
}

/**
 * Generates the hash of options that will be passed to `Tippy` instances
 * target an element in the DOM.
 *
 * @param {Object} attachToOptions The local `attachTo` options
 * @param {Step} step The step instance
 * @return {Object} The final tippy options object
 */
export function makeAttachedTippyOptions(attachToOptions, step) {
  let { popperOptions, tippyOptions } = _makeCommonTippyOptions(step);

  tippyOptions.flipOnUpdate = true;
  tippyOptions.placement = attachToOptions.on || 'right';

  if (step.options && step.options.tippyOptions && step.options.tippyOptions.popperOptions) {
    const stepPopperOptions = step.options.tippyOptions.popperOptions;
    popperOptions = {
      ...popperOptions,
      ...stepPopperOptions,
      modifiers: {
        ...popperOptions.modifiers,
        ...stepPopperOptions.modifiers
      }
    };
  }

  tippyOptions.popperOptions = popperOptions;

  return tippyOptions;
}

/**
 * Generates the hash of options for a tooltip that doesn't have a
 * target element in the DOM -- and thus is positioned in the center
 * of the view
 *
 * @param {Step} step The step instance
 * @return {Object} The final tippy options object
 */
export function makeCenteredTippy(step) {
  const centeredStylePopperModifier = _getCenteredStylePopperModifier(step);
  let { popperOptions, tippyOptions } = _makeCommonTippyOptions(step);

  tippyOptions.placement = 'top';
  tippyOptions.arrow = false;
  tippyOptions.popperOptions = tippyOptions.popperOptions || {};

  popperOptions = {
    ...popperOptions,
    ...tippyOptions.popperOptions,
    modifiers: {
      ...popperOptions.modifiers,
      ...centeredStylePopperModifier,
      ...tippyOptions.popperOptions.modifiers
    }
  };

  tippyOptions.popperOptions = popperOptions;

  return tippyOptions;
}

function _makeCommonTippyOptions(step) {
  const popperOptions = _getDefaultPopperOptions(step);

  const tippyOptions = {
    content: step.el,
    ...step.options.tippyOptions
  };

  if (step.tour &&
    step.tour.options &&
    step.tour.options.styleVariables &&
    step.tour.options.styleVariables.zIndex) {
    tippyOptions.zIndex = step.tour.options.styleVariables.zIndex;
  }

  if (step.options.title) {
    popperOptions.modifiers = {
      ...popperOptions.modifiers,
      ...addHasTitleClass(step)
    };
  }

  return { popperOptions, tippyOptions };
}
