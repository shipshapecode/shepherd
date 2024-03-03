/**
 * Checks if `value` is classified as an `Element`.
 * @param value The param to check if it is an Element
 */
export function isElement<T>(value: T) {
  return value instanceof Element;
}

/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param value The param to check if it is an HTMLElement
 */
export function isHTMLElement<T>(value: T) {
  return value instanceof HTMLElement;
}

/**
 * Checks if `value` is classified as a `Function` object.
 * @param value The param to check if it is a function
 */
export function isFunction<T>(value: T) {
  return typeof value === 'function';
}

/**
 * Checks if `value` is classified as a `String` object.
 * @param value The param to check if it is a string
 */
export function isString<T>(value: T) {
  return typeof value === 'string';
}

/**
 * Checks if `value` is undefined.
 * @param value The param to check if it is undefined
 */
export function isUndefined<T>(value: T) {
  return value === undefined;
}
