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
 * @param obj
 * @returns {*|boolean}
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object' && Array.isArray(obj) === false;
}

/**
 * @param obj
 * @returns {boolean}
 */
export function isObjectLoose(obj) {
  return typeof obj === 'object';
}

/**
 * @param obj
 * @returns {boolean}
 */
export function isUndefined(obj) {
  return typeof obj === 'undefined';
}

/**
 * @param str
 * @returns {*}
 */
export function parsePosition(str) {
  if (isObjectLoose(str)) {
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
  if (obj === null || isUndefined(obj)) {
    return obj;
  } else if (isObjectLoose(obj)) {
    return obj;
  }

  const vals = obj.split(' ');
  const out = {};
  let j = props.length - 1;
  for (let i = vals.length - 1; i >= 0; i--) {
    if (j === 0) {
      out[props[j]] = vals.slice(0, i + 1).join(' ');
      break;
    } else {
      out[props[j]] = vals[i];
    }

    j--;
  }

  return out;
}