import _ from 'lodash';

/**
 * TODO rewrite the way items are being added to use more performant documentFragment code
 * @param html
 * @returns {HTMLElement}
 */
export function createFromHTML(html) {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

/**
 * Parse the position object or string to return the attachment and element to attach to
 * @param {Object|String} position Either a string or object denoting the selector and position for attachment
 * @returns {Object}
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
 * @returns {*}
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
