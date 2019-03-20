import isObjectLike from 'lodash-es/isObjectLike';
import isString from 'lodash-es/isString';
import isUndefined from 'lodash-es/isUndefined';
import zipObject from 'lodash-es/zipObject';
import tippy from 'tippy.js';
import { missingTippy } from './utils/error-messages';

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
  }
};

// Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)
const defaultPopperOptions = {
  positionFixed: true
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
 * Parse the position object or string to return the attachment and element to attach to
 * @param {Object|String} position Either a string or object denoting the selector and position for attachment
 * @return {Object} The object with `element` and `on` for the step
 * @private
 */
export function _parseAttachToOpts(opts) {
  if (isObjectLike(opts)) {
    if (opts.hasOwnProperty('element') && opts.hasOwnProperty('on')) {
      return opts;
    }
    return null;
  }

  const positionRe = /^(.+) ((auto|top|left|right|bottom)(-start|-end)?)$/;
  const matches = positionRe.exec(opts);

  if (!matches) {
    return null;
  }

  return {
    element: matches[1],
    on: matches[2]
  };
}

/**
 * @param obj
 * @param {Array} props
 * @return {*}
 */
export function parseShorthand(obj, props) {
  if (obj === null || isUndefined(obj)) {
    return obj;
  } else if (isObjectLike(obj)) {
    return obj;
  }

  const values = obj.split(' ');
  return zipObject(props, values);
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
 * Passes `options.attachTo` to `_parseAttachToOpts` to get the correct `attachTo` format
 * @returns {({} & {element, on}) | ({})}
 * `element` is a qualified HTML Element
 * `on` is a string position value
 */
export function parseAttachTo() {
  const options = _parseAttachToOpts(this.options.attachTo) || {};
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
    const existingTheme = resultingTippyOptions.theme;
    resultingTippyOptions.theme = existingTheme ? `${existingTheme} shepherd-has-title` : 'shepherd-has-title';
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
