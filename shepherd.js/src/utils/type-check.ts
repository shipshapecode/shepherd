/**
 * Checks if `value` is classified as an `Element`.
 * @param value The param to check if it is an Element
 */
export function isElement<T>(value: T | Element): value is Element {
  return value instanceof Element;
}

/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param value The param to check if it is an HTMLElement
 */
export function isHTMLElement<T>(value: T | HTMLElement): value is HTMLElement {
  return value instanceof HTMLElement;
}

/**
 * Checks if `value` is classified as a `Function` object.
 * @param value The param to check if it is a function
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction<T>(value: T | Function): value is Function {
  return typeof value === 'function';
}

/**
 * Checks if `value` is classified as a `String` object.
 * @param value The param to check if it is a string
 */
export function isString<T>(value: T | string): value is string {
  return typeof value === 'string';
}

/**
 * Checks if `value` is undefined.
 * @param value The param to check if it is undefined
 */
export function isUndefined<T>(value: T | undefined): value is undefined {
  return value === undefined;
}
