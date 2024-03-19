/*! shepherd.js 12.0.0-alpha.3 */

/**
 * Checks if `value` is classified as an `Element`.
 * @param value The param to check if it is an Element
 */
function isElement(value) {
    return value instanceof Element;
}
/**
 * Checks if `value` is classified as an `HTMLElement`.
 * @param value The param to check if it is an HTMLElement
 */
function isHTMLElement(value) {
    return value instanceof HTMLElement;
}
/**
 * Checks if `value` is classified as a `Function` object.
 * @param value The param to check if it is a function
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * Checks if `value` is classified as a `String` object.
 * @param value The param to check if it is a string
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * Checks if `value` is undefined.
 * @param value The param to check if it is undefined
 */
function isUndefined(value) {
    return value === undefined;
}

export { isElement, isFunction, isHTMLElement, isString, isUndefined };
//# sourceMappingURL=type-check.js.map
