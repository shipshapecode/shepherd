/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param {*} value The param to check if it is an HTMLElement
 */
export function isElement(value) {
  return value instanceof HTMLElement;
}

/**
 * Checks if `value` is classified as a `Function` object.
 * @param {*} value The param to check if it is a function
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * Checks if `value` is classified as a `String` object.
 * @param {*} value The param to check if it is a string
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * Checks if `value` is undefined.
 * @param {*} value The param to check if it is undefined
 */
export function isUndefined(value) {
  return value === undefined;
}
