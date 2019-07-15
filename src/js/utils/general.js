import { isString, isUndefined } from './type-check';
import tippy from 'tippy.js';
import { missingTippy } from './error-messages';

// popperOption modifier, to add `shepherd` class to both default and centeredStyle poppers
const addShepherdClass = _createClassModifier('shepherd');
const addHasTitleClass = _createClassModifier('shepherd-has-title');

const centeredStylePopperModifier = {
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
  addShepherdClass
};

// Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)
const defaultPopperOptions = {
  positionFixed: true,
  modifiers: {
    addShepherdClass
  }
};

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
 * `this.tooltip` as a Tippy.js instance.
 */
export function setupTooltip() {
  if (isUndefined(tippy)) {
    throw new Error(missingTippy);
  }

  if (this.tooltip) {
    this.tooltip.destroy();
  }

  const attachToOpts = this.parseAttachTo();

  this.tooltip = _makeTippyInstance.call(this, attachToOpts);

  this.target = attachToOpts.element || document.body;

  this.el.classList.add('shepherd-element');
}

/**
 * Checks if options.attachTo.element is a string, and if so, tries to find the element
 * @returns {{element, on}}
 * `element` is a qualified HTML Element
 * `on` is a string position value
 */
export function parseAttachTo() {
  const options = this.options.attachTo || {};
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
 *
 * @return {tippy} The final tippy instance
 * @private
 */
function _makeTippyInstance(attachToOptions) {
  if (!attachToOptions.element) {
    return _makeCenteredTippy.call(this);
  }

  const tippyOptions = _makeAttachedTippyOptions.call(this, attachToOptions);

  return tippy(attachToOptions.element, tippyOptions);
}

/**
 * Generates the hash of options that will be passed to `Tippy` instances
 * target an element in the DOM.
 *
 * @param {Object} attachToOptions The local `attachTo` options
 * @return {Object} The final tippy options  object
 * @private
 */
function _makeAttachedTippyOptions(attachToOptions) {
  const resultingTippyOptions = {
    content: this.el,
    flipOnUpdate: true,
    placement: attachToOptions.on || 'right'
  };

  Object.assign(resultingTippyOptions, this.options.tippyOptions);

  if (this.options.title) {
    Object.assign(defaultPopperOptions.modifiers, { addHasTitleClass });
  }

  if (this.options.tippyOptions && this.options.tippyOptions.popperOptions) {
    Object.assign(defaultPopperOptions, this.options.tippyOptions.popperOptions);
  }

  resultingTippyOptions.popperOptions = defaultPopperOptions;

  return resultingTippyOptions;
}

/**
 * Generates a `Tippy` instance for a tooltip that doesn't have a
 * target element in the DOM -- and thus is positioned in the center
 * of the view
 *
 * @return {tippy} The final tippy instance
 * @private
 */
function _makeCenteredTippy() {
  const tippyOptions = {
    content: this.el,
    placement: 'top',
    ...this.options.tippyOptions
  };

  tippyOptions.arrow = false;
  tippyOptions.popperOptions = tippyOptions.popperOptions || {};

  if (this.options.title) {
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
