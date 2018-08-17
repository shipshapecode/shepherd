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
 * @param str
 * @returns {*}
 */
export function parsePosition(str) {
  if (_.isObjectLike(str)) {
    if (str.hasOwnProperty('element') && str.hasOwnProperty('on')) {
      return str;
    }
    return null;
  }

  const positionRe = /^(.+) (top|left|right|bottom|center)$/;
  const matches = positionRe.exec(str);
  if (!matches) {
    return null;
  }

  let on = matches[2]; // eslint-disable-line
  if (on[0] === '[') {
    on = on.substring(1, on.length - 1);
  }

  return {
    'element': matches[1],
    on
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