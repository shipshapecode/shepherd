import _ from 'lodash';
import Popper from 'popper.js';

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
 */
export function parsePosition(position) {
  if (_.isObjectLike(position)) {
    if (position.hasOwnProperty('element') && position.hasOwnProperty('on')) {
      return position;
    }
    return null;
  }

  const positionRe = /^(.+) (top|left|right|bottom|center)$/;
  const matches = positionRe.exec(position);

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
  if (obj === null || _.isUndefined(obj)) {
    return obj;
  } else if (_.isObjectLike(obj)) {
    return obj;
  }

  const values = obj.split(' ');
  return _.zipObject(props, values);
}

/**
 * Determines options for Popper and initializes the Popper instance
 */
export function setupPopper() {
  if (_.isUndefined(Popper)) {
    throw new Error('Using the attachment feature of Shepherd requires the Popper.js library');
  }

  const opts = this.getAttachTo();
  opts.modifiers = opts.modifiers || {};
  let attachment = opts.on || 'right';
  opts.positionFixed = false;

  if (_.isUndefined(opts.element)) {
    attachment = 'top';
    _setupCenteredPopper(opts);
  }

  if (this.popper) {
    this.popper.destroy();
  }

  this.el.classList.add('shepherd-element');
  const popperOpts = _mergePopperOptions.call(this, attachment, opts);
  this.popper = new Popper(opts.element, this.el, popperOpts);

  this.target = opts.element;
  this.target.classList.add('shepherd-enabled', 'shepherd-target');
}

/**
 * Merge the global popperOptions, and the local opts
 * @param {String} attachment The direction for attachment
 * @param {Object} opts The local options
 * @return {Object} The merged popperOpts object
 * @private
 */
function _mergePopperOptions(attachment, opts) {
  return Object.assign({}, {
    placement: attachment,
    arrowElement: this.el.querySelector('.popper__arrow'),
    modifiers: opts.modifiers,
    positionFixed: opts.positionFixed
  }, this.options.popperOptions);
}

/**
 * Sets up a popper centered on the screen, when there is no attachTo element
 * @param {Object} opts The config object
 * @return {*}
 * @private
 */
function _setupCenteredPopper(opts) {
  opts.element = document.body;

  opts.modifiers = Object.assign({
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
  }, opts.modifiers);

  opts.positionFixed = true;
}
