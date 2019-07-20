import { isString, isUndefined } from './type-check';
import tippy from 'tippy.js';
import { missingTippy } from './error-messages';

const addHasTitleClass = _createClassModifier('shepherd-has-title');

function _getCenteredStylePopperModifier(styles) {
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
    addShepherdClass: _createClassModifier(styles.shepherd.trim())
  };
}

/**
 * Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)
 * @private
 */
function _getDefaultPopperOptions(styles) {
  return {
    positionFixed: true,
    modifiers: {
      addShepherdClass: _createClassModifier(styles.shepherd.trim())
    }
  };
}

/**
 * TODO rewrite the way items are being added to use more performant documentFragment code
 * @param html
 * @return {HTMLElement} The element created from the passed HTML string
 */
export function createFromHTML(html) {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param {Function} func The function to invoke
 * @param {Number} wait The time to wait in ms
 * @param {Boolean} immediate If true, the function will be invoked immediately
 * @return {Function}
 */
export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Determines options for the tooltip and initializes
 * `step.tooltip` as a Tippy.js instance.
 * @param {Step} step The step instance
 */
export function setupTooltip(step) {
  if (isUndefined(tippy)) {
    throw new Error(missingTippy);
  }

  if (step.tooltip) {
    step.tooltip.destroy();
  }

  const attachToOpts = parseAttachTo(step);

  step.tooltip = _makeTippyInstance(attachToOpts, step);

  step.target = attachToOpts.element || document.body;
}

/**
 * Checks if options.attachTo.element is a string, and if so, tries to find the element
 * @param {Step} step The step instance
 * @returns {{element, on}}
 * `element` is a qualified HTML Element
 * `on` is a string position value
 */
export function parseAttachTo(step) {
  const options = step.options.attachTo || {};
  const returnOpts = Object.assign({}, options);

  if (isString(options.element)) {
    // Can't override the element in user opts reference because we can't
    // guarantee that the element will exist in the future.
    try {
      returnOpts.element = document.querySelector(options.element);
    } catch(e) {
      // TODO
    }
    if (!returnOpts.element) {
      console.error(`The element for this Shepherd step was not found ${options.element}`);
    }
  }

  return returnOpts;
}

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

/**
 * Generates a `Tippy` instance from a set of base `attachTo` options
 * @param attachToOptions
 * @param {Step} step The step instance
 * @return {tippy|Instance | Instance[]} The final tippy instance
 * @private
 */
function _makeTippyInstance(attachToOptions, step) {
  if (!attachToOptions.element) {
    return _makeCenteredTippy(step);
  }

  const tippyOptions = _makeAttachedTippyOptions(attachToOptions, step);

  return tippy(attachToOptions.element, tippyOptions);
}

/**
 * Generates the hash of options that will be passed to `Tippy` instances
 * target an element in the DOM.
 *
 * @param {Object} attachToOptions The local `attachTo` options
 * @param {Step} step The step instance
 * @return {Object} The final tippy options  object
 * @private
 */
function _makeAttachedTippyOptions(attachToOptions, step) {
  const defaultPopperOptions = _getDefaultPopperOptions(step.styles);
  const resultingTippyOptions = {
    content: step.el,
    flipOnUpdate: true,
    placement: attachToOptions.on || 'right'
  };

  Object.assign(resultingTippyOptions, step.options.tippyOptions);

  if (step.options.title) {
    Object.assign(defaultPopperOptions.modifiers, { addHasTitleClass });
  }

  if (step.options.tippyOptions && step.options.tippyOptions.popperOptions) {
    Object.assign(defaultPopperOptions, step.options.tippyOptions.popperOptions);
  }

  resultingTippyOptions.popperOptions = defaultPopperOptions;

  return resultingTippyOptions;
}

/**
 * Generates a `Tippy` instance for a tooltip that doesn't have a
 * target element in the DOM -- and thus is positioned in the center
 * of the view
 *
 * @param {Step} step The step instance
 * @return {tippy} The final tippy instance
 * @private
 */
function _makeCenteredTippy(step) {
  const centeredStylePopperModifier = _getCenteredStylePopperModifier(step.styles);
  const defaultPopperOptions = _getDefaultPopperOptions(step.styles);
  const tippyOptions = {
    content: step.el,
    placement: 'top',
    ...step.options.tippyOptions
  };

  tippyOptions.arrow = false;
  tippyOptions.popperOptions = tippyOptions.popperOptions || {};

  if (step.options.title) {
    Object.assign(defaultPopperOptions.modifiers, { addHasTitleClass });
  }

  const finalPopperOptions = Object.assign(
    {},
    defaultPopperOptions,
    tippyOptions.popperOptions,
    {
      modifiers: Object.assign(
        centeredStylePopperModifier,
        tippyOptions.popperOptions.modifiers
      )
    }
  );

  tippyOptions.popperOptions = finalPopperOptions;

  return tippy(document.body, tippyOptions);
}
