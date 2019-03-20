/*! shepherd.js 2.5.0 */(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,e.Shepherd=t())})(this,function(){'use strict';/**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */var Oo=Math.min,So=Math.floor,Co=Math.round,Lo=Math.max;function e(e,t,o){var r=-1,i=e.length;0>t&&(t=-t>i?0:i+t),o=o>i?i:o,0>o&&(o+=i),i=t>o?0:o-t>>>0,t>>>=0;for(var n=Array(i);++r<i;)n[r]=e[r+t];return n}/**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */function t(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}/** Detect free variable `global` from Node.js. */ /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */function o(e){var t=Do.call(e,Io),o=e[Io];try{e[Io]=void 0;var r=!0}catch(t){}var i=Mo.call(e);return r&&(t?e[Io]=o:delete e[Io]),i}/** Used for built-in method references. */ /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */function r(e){return Yo.call(e)}/** `Object#toString` result references. */ /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */function n(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Ho&&Ho in Object(e)?o(e):r(e)}/**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */function a(e){return null!=e&&"object"==typeof e}/** `Object#toString` result references. */ /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */function p(e){return"symbol"==typeof e||a(e)&&"[object Symbol]"==n(e)}/** Used as references for various `Number` constants. */ /**
   * Converts `value` to a number.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to process.
   * @returns {number} Returns the number.
   * @example
   *
   * _.toNumber(3.2);
   * // => 3.2
   *
   * _.toNumber(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toNumber(Infinity);
   * // => Infinity
   *
   * _.toNumber('3.2');
   * // => 3.2
   */function s(e){if("number"==typeof e)return e;if(p(e))return Xo;if(t(e)){var o="function"==typeof e.valueOf?e.valueOf():e;e=t(o)?o+"":o}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(Bo,"");var r=Ro.test(e);return r||Fo.test(e)?Uo(e.slice(2),r?2:8):Wo.test(e)?Xo:+e}/** Used as references for various `Number` constants. */ /**
   * Converts `value` to a finite number.
   *
   * @static
   * @memberOf _
   * @since 4.12.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted number.
   * @example
   *
   * _.toFinite(3.2);
   * // => 3.2
   *
   * _.toFinite(Number.MIN_VALUE);
   * // => 5e-324
   *
   * _.toFinite(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toFinite('3.2');
   * // => 3.2
   */function l(e){if(!e)return 0===e?e:0;if(e=s(e),e===zo||e===-zo){var t=0>e?-1:1;return 1.7976931348623157e+308*t}return e===e?e:0}/**
   * Converts `value` to an integer.
   *
   * **Note:** This method is loosely based on
   * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {number} Returns the converted integer.
   * @example
   *
   * _.toInteger(3.2);
   * // => 3
   *
   * _.toInteger(Number.MIN_VALUE);
   * // => 0
   *
   * _.toInteger(Infinity);
   * // => 1.7976931348623157e+308
   *
   * _.toInteger('3.2');
   * // => 3
   */function d(e){var t=l(e),o=t%1;return t===t?o?t-o:t:0}/**
   * Creates a slice of `array` with `n` elements dropped from the beginning.
   *
   * @static
   * @memberOf _
   * @since 0.5.0
   * @category Array
   * @param {Array} array The array to query.
   * @param {number} [n=1] The number of elements to drop.
   * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
   * @returns {Array} Returns the slice of `array`.
   * @example
   *
   * _.drop([1, 2, 3]);
   * // => [2, 3]
   *
   * _.drop([1, 2, 3], 2);
   * // => [3]
   *
   * _.drop([1, 2, 3], 5);
   * // => []
   *
   * _.drop([1, 2, 3], 0);
   * // => [1, 2, 3]
   */function c(t,o,r){var i=null==t?0:t.length;return i?(o=r||void 0===o?1:d(o),e(t,0>o?0:o,i)):[]}/**
   * Checks if `value` is `undefined`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
   * @example
   *
   * _.isUndefined(void 0);
   * // => true
   *
   * _.isUndefined(null);
   * // => false
   */function m(e){return void 0===e}/**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */function f(e,t){for(var o=-1,r=Array(e);++o<e;)r[o]=t(o);return r}/** `Object#toString` result references. */ /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */function h(e){return a(e)&&"[object Arguments]"==n(e)}/** Used for built-in method references. */ /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */function b(e,t){var o=typeof e;return t=null==t?9007199254740991:t,!!t&&("number"==o||"symbol"!=o&&nr.test(e))&&-1<e&&0==e%1&&e<t}/** Used as references for various `Number` constants. */ /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */function u(e){return"number"==typeof e&&-1<e&&0==e%1&&9007199254740991>=e}/** `Object#toString` result references. */ /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */function y(e,t){var o=Zo(e),r=!o&&Jo(e),i=!o&&!r&&ir(e),n=!o&&!r&&!i&&fr(e),a=o||r||i||n,p=a?f(e.length,String):[],s=p.length;for(var l in e)(t||br.call(e,l))&&!(a&&(// Safari 9 has enumerable `arguments.length` in strict mode.
"length"==l||// Node.js 0.10 has enumerable non-index properties on buffers.
i&&("offset"==l||"parent"==l)||// PhantomJS 2 has enumerable non-index properties on typed arrays.
n&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||// Skip index properties.
b(l,s)))&&p.push(l);return p}/** Used for built-in method references. */ /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */function g(e){var t=e&&e.constructor,o="function"==typeof t&&t.prototype||ur;return e===o}/**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */function v(e,t){return function(o){return e(t(o))}}/* Built-in method references for those with the same name as other `lodash` methods. */ /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */function w(e){if(!g(e))return yr(e);var t=[];for(var o in Object(e))vr.call(e,o)&&"constructor"!=o&&t.push(o);return t}/** `Object#toString` result references. */ /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */function x(e){if(!t(e))return!1;// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 9 which returns 'object' for typed arrays and other constructors.
var o=n(e);return"[object Function]"==o||"[object GeneratorFunction]"==o||"[object AsyncFunction]"==o||"[object Proxy]"==o}/**
   * Checks if `value` is array-like. A value is considered array-like if it's
   * not a function and has a `value.length` that's an integer greater than or
   * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   * @example
   *
   * _.isArrayLike([1, 2, 3]);
   * // => true
   *
   * _.isArrayLike(document.body.children);
   * // => true
   *
   * _.isArrayLike('abc');
   * // => true
   *
   * _.isArrayLike(_.noop);
   * // => false
   */function k(e){return null!=e&&u(e.length)&&!x(e)}/**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */function E(e){return k(e)?y(e):w(e)}/**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */function O(e,t){return e&&qo(e,t,E)}/**
   * This method returns the first argument it receives.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Util
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'a': 1 };
   *
   * console.log(_.identity(object) === object);
   * // => true
   */function S(e){return e}/**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */function C(e){return"function"==typeof e?e:S}/**
   * Iterates over own enumerable string keyed properties of an object and
   * invokes `iteratee` for each property. The iteratee is invoked with three
   * arguments: (value, key, object). Iteratee functions may exit iteration
   * early by explicitly returning `false`.
   *
   * @static
   * @memberOf _
   * @since 0.3.0
   * @category Object
   * @param {Object} object The object to iterate over.
   * @param {Function} [iteratee=_.identity] The function invoked per iteration.
   * @returns {Object} Returns `object`.
   * @see _.forOwnRight
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.forOwn(new Foo, function(value, key) {
   *   console.log(key);
   * });
   * // => Logs 'a' then 'b' (iteration order is not guaranteed).
   */function L(e,t){return e&&O(e,C(t))}/** Built-in value references. */ /**
   * Checks if `value` is a plain object, that is, an object created by the
   * `Object` constructor or one with a `[[Prototype]]` of `null`.
   *
   * @static
   * @memberOf _
   * @since 0.8.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   * }
   *
   * _.isPlainObject(new Foo);
   * // => false
   *
   * _.isPlainObject([1, 2, 3]);
   * // => false
   *
   * _.isPlainObject({ 'x': 0, 'y': 0 });
   * // => true
   *
   * _.isPlainObject(Object.create(null));
   * // => true
   */function T(e){if(!a(e)||"[object Object]"!=n(e))return!1;var t=wr(e);if(null===t)return!0;var o=Or.call(t,"constructor")&&t.constructor;return"function"==typeof o&&o instanceof o&&Er.call(o)==Sr}/**
   * Checks if `value` is likely a DOM element.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
   * @example
   *
   * _.isElement(document.body);
   * // => true
   *
   * _.isElement('<body>');
   * // => false
   */function A(e){return a(e)&&1===e.nodeType&&!T(e)}/** Used to detect overreaching core-js shims. */ /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */function _(e){return!!Lr&&Lr in e}/** Used for built-in method references. */ /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */function P(e){if(null!=e){try{return Ar.call(e)}catch(t){}try{return e+""}catch(t){}}return""}/**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */ /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */function j(e){if(!t(e)||_(e))return!1;var o=x(e)?Nr:Pr;return o.test(P(e))}/**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */function D(e,t){return null==e?void 0:e[t]}/**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */function M(e,t){var o=D(e,t);return j(o)?o:void 0}/* Built-in method references that are verified to be native. */ /**
   * Checks if `value` is an empty object, collection, map, or set.
   *
   * Objects are considered empty if they have no own enumerable string keyed
   * properties.
   *
   * Array-like values such as `arguments` objects, arrays, buffers, strings, or
   * jQuery-like collections are considered empty if they have a `length` of `0`.
   * Similarly, maps and sets are considered empty if they have a `size` of `0`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is empty, else `false`.
   * @example
   *
   * _.isEmpty(null);
   * // => true
   *
   * _.isEmpty(true);
   * // => true
   *
   * _.isEmpty(1);
   * // => true
   *
   * _.isEmpty([1, 2, 3]);
   * // => false
   *
   * _.isEmpty({ 'a': 1 });
   * // => false
   */function I(e){if(null==e)return!0;if(k(e)&&(Zo(e)||"string"==typeof e||"function"==typeof e.splice||ir(e)||fr(e)||Jo(e)))return!e.length;var t=Qr(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(g(e))return!w(e).length;for(var o in e)if(ti.call(e,o))return!1;return!0}/** `Object#toString` result references. */ /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */function N(e){return"string"==typeof e||!Zo(e)&&a(e)&&"[object String]"==n(e)}function Y(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function H(e){for(var t=1;t<arguments.length;t++){var o=null==arguments[t]?{}:arguments[t],r=Object.keys(o);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(e){return Object.getOwnPropertyDescriptor(o,e).enumerable}))),r.forEach(function(t){Y(e,t,o[t])})}return e}function X(e,t){return B(e)||W(e,t)||R()}function B(e){if(Array.isArray(e))return e}function W(e,t){var o=[],r=!0,i=!1,n=void 0;try{for(var a,p=e[Symbol.iterator]();!(r=(a=p.next()).done)&&(o.push(a.value),!(t&&o.length===t));r=!0);}catch(e){i=!0,n=e}finally{try{r||null==p["return"]||p["return"]()}finally{if(i)throw n}}return o}function R(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}/**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */function F(e,t,o){"__proto__"==t&&oi?oi(e,t,{configurable:!0,enumerable:!0,value:o,writable:!0}):e[t]=o}/**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */function U(e,t){return e===t||e!==e&&t!==t}/** Used for built-in method references. */ /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */function z(e,t,o){var r=e[t];ii.call(e,t)&&U(r,o)&&(void 0!==o||t in e)||F(e,t,o)}/**
   * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
   *
   * @private
   * @param {Array} props The property identifiers.
   * @param {Array} values The property values.
   * @param {Function} assignFunc The function to assign values.
   * @returns {Object} Returns the new object.
   */function V(e,t,o){for(var r,i=-1,n=e.length,a=t.length,p={};++i<n;)r=i<a?t[i]:void 0,o(p,e[i],r);return p}/**
   * This method is like `_.fromPairs` except that it accepts two arrays,
   * one of property identifiers and one of corresponding values.
   *
   * @static
   * @memberOf _
   * @since 0.4.0
   * @category Array
   * @param {Array} [props=[]] The property identifiers.
   * @param {Array} [values=[]] The property values.
   * @returns {Object} Returns the new object.
   * @example
   *
   * _.zipObject(['a', 'b'], [1, 2]);
   * // => { 'a': 1, 'b': 2 }
   */function q(e,t){return V(e||[],t||[],z)}/**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.7
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */ /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */function K(e){return e&&"[object Function]"==={}.toString.call(e)}/**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */function G(e,t){if(1!==e.nodeType)return[];// NOTE: 1 DOM access here
var o=e.ownerDocument.defaultView,r=o.getComputedStyle(e,null);return t?r[t]:r}/**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */function $(e){return"HTML"===e.nodeName?e:e.parentNode||e.host}/**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */function J(e){// Return body, `getScroll` will take care to get the correct `scrollTop` from it
if(!e)return document.body;switch(e.nodeName){case"HTML":case"BODY":return e.ownerDocument.body;case"#document":return e.body;}// Firefox want us to check `-x` and `-y` variations as well
var t=G(e),o=t.overflow,r=t.overflowX,i=t.overflowY;return /(auto|scroll|overlay)/.test(o+i+r)?e:J($(e))}/**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */function Z(e){return 11===e?ci:10===e?mi:ci||mi}/**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */function Q(e){if(!e)return document.documentElement;// Skip hidden elements which don't have an offsetParent
for(var t=Z(10)?document.body:null,o=e.offsetParent||null// NOTE: 1 DOM access here
;o===t&&e.nextElementSibling;)o=(e=e.nextElementSibling).offsetParent;var r=o&&o.nodeName;return r&&"BODY"!==r&&"HTML"!==r?-1!==["TH","TD","TABLE"].indexOf(o.nodeName)&&"static"===G(o,"position")?Q(o):o:e?e.ownerDocument.documentElement:document.documentElement;// .offsetParent will return the closest TH, TD or TABLE in case
// no offsetParent is present, I hate this job...
}function ee(e){var t=e.nodeName;return"BODY"!==t&&("HTML"===t||Q(e.firstElementChild)===e)}/**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */function te(e){return null===e.parentNode?e:te(e.parentNode)}/**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */function oe(e,t){// This check is needed to avoid errors in case one of the elements isn't defined for any reason
if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;// Here we make sure to give as "start" the element that comes first in the DOM
var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=o?e:t,i=o?t:e,n=document.createRange();n.setStart(r,0),n.setEnd(i,0);var a=n.commonAncestorContainer;// Both nodes are inside #document
if(e!==a&&t!==a||r.contains(i))return ee(a)?a:Q(a);// one of the nodes is inside shadowDOM, find which one
var p=te(e);return p.host?oe(p.host,t):oe(e,te(t).host)}/**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */function re(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"top",o="top"===t?"scrollTop":"scrollLeft",r=e.nodeName;if("BODY"===r||"HTML"===r){var i=e.ownerDocument.documentElement,n=e.ownerDocument.scrollingElement||i;return n[o]}return e[o]}/*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */function ie(e,t){var o=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],r=re(t,"top"),i=re(t,"left"),n=o?-1:1;return e.top+=r*n,e.bottom+=r*n,e.left+=i*n,e.right+=i*n,e}/*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */function ne(e,t){var o="x"===t?"Left":"Top",r="Left"===o?"Right":"Bottom";return parseFloat(e["border"+o+"Width"],10)+parseFloat(e["border"+r+"Width"],10)}function ae(e,t,o,r){return Lo(t["offset"+e],t["scroll"+e],o["client"+e],o["offset"+e],o["scroll"+e],Z(10)?parseInt(o["offset"+e])+parseInt(r["margin"+("Height"===e?"Top":"Left")])+parseInt(r["margin"+("Height"===e?"Bottom":"Right")]):0)}function pe(e){var t=e.body,o=e.documentElement,r=Z(10)&&getComputedStyle(o);return{height:ae("Height",t,o,r),width:ae("Width",t,o,r)}}/**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */function se(e){return ui({},e,{right:e.left+e.width,bottom:e.top+e.height})}/**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */function le(e){var t={};// IE10 10 FIX: Please, don't ask, the element isn't
// considered in DOM in some circumstances...
// This isn't reproducible in IE10 compatibility mode of IE11
try{if(Z(10)){t=e.getBoundingClientRect();var o=re(e,"top"),r=re(e,"left");t.top+=o,t.left+=r,t.bottom+=o,t.right+=r}else t=e.getBoundingClientRect()}catch(t){}var i={left:t.left,top:t.top,width:t.right-t.left,height:t.bottom-t.top},n="HTML"===e.nodeName?pe(e.ownerDocument):{},a=n.width||e.clientWidth||i.right-i.left,p=n.height||e.clientHeight||i.bottom-i.top,s=e.offsetWidth-a,l=e.offsetHeight-p;// subtract scrollbar size from sizes
// if an hypothetical scrollbar is detected, we must be sure it's not a `border`
// we make this check conditional for performance reasons
if(s||l){var d=G(e);s-=ne(d,"x"),l-=ne(d,"y"),i.width-=s,i.height-=l}return se(i)}function de(e,t){var o=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],r=Z(10),i="HTML"===t.nodeName,n=le(e),a=le(t),p=J(e),s=G(t),l=parseFloat(s.borderTopWidth,10),d=parseFloat(s.borderLeftWidth,10);o&&i&&(a.top=Lo(a.top,0),a.left=Lo(a.left,0));var c=se({top:n.top-a.top-l,left:n.left-a.left-d,width:n.width,height:n.height});// Subtract margins of documentElement in case it's being used as parent
// we do this only on HTML because it's the only element that behaves
// differently when margins are applied to it. The margins are included in
// the box of the documentElement, in the other cases not.
if(c.marginTop=0,c.marginLeft=0,!r&&i){var m=parseFloat(s.marginTop,10),f=parseFloat(s.marginLeft,10);c.top-=l-m,c.bottom-=l-m,c.left-=d-f,c.right-=d-f,c.marginTop=m,c.marginLeft=f}return(r&&!o?t.contains(p):t===p&&"BODY"!==p.nodeName)&&(c=ie(c,t)),c}function ce(e){var t=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],o=e.ownerDocument.documentElement,r=de(e,o),i=Lo(o.clientWidth,window.innerWidth||0),n=Lo(o.clientHeight,window.innerHeight||0),a=t?0:re(o),p=t?0:re(o,"left"),s={top:a-r.top+r.marginTop,left:p-r.left+r.marginLeft,width:i,height:n};return se(s)}/**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */function me(e){var t=e.nodeName;if("BODY"===t||"HTML"===t)return!1;if("fixed"===G(e,"position"))return!0;var o=$(e);return!!o&&me(o)}/**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */function fe(e){// This check is needed to avoid errors in case one of the elements isn't defined for any reason
if(!e||!e.parentElement||Z())return document.documentElement;for(var t=e.parentElement;t&&"none"===G(t,"transform");)t=t.parentElement;return t||document.documentElement}/**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */function he(e,t,o,r){var i=!!(4<arguments.length&&void 0!==arguments[4])&&arguments[4],n={top:0,left:0},a=i?fe(e):oe(e,t);// NOTE: 1 DOM access here
// Handle viewport case
if("viewport"===r)n=ce(a,i);else{// Handle other cases based on DOM element used as boundaries
var p;"scrollParent"===r?(p=J($(t)),"BODY"===p.nodeName&&(p=e.ownerDocument.documentElement)):"window"===r?p=e.ownerDocument.documentElement:p=r;var s=de(p,a,i);// In case of HTML, we need a different computation
if("HTML"===p.nodeName&&!me(a)){var l=pe(e.ownerDocument),d=l.height,c=l.width;n.top+=s.top-s.marginTop,n.bottom=d+s.top,n.left+=s.left-s.marginLeft,n.right=c+s.left}else// for all the other DOM elements, this one is good
n=s}// Add paddings
o=o||0;var m="number"==typeof o;return n.left+=m?o:o.left||0,n.top+=m?o:o.top||0,n.right-=m?o:o.right||0,n.bottom-=m?o:o.bottom||0,n}function be(e){var t=e.width,o=e.height;return t*o}/**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function ue(e,t,o,r,i){var n=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf("auto"))return e;var a=he(o,r,n,i),p={top:{width:a.width,height:t.top-a.top},right:{width:a.right-t.right,height:a.height},bottom:{width:a.width,height:a.bottom-t.bottom},left:{width:t.left-a.left,height:a.height}},s=Object.keys(p).map(function(e){return ui({key:e},p[e],{area:be(p[e])})}).sort(function(e,t){return t.area-e.area}),l=s.filter(function(e){var t=e.width,r=e.height;return t>=o.clientWidth&&r>=o.clientHeight}),d=0<l.length?l[0].key:s[0].key,c=e.split("-")[1];return d+(c?"-"+c:"")}/**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */function ye(e,t,o){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,i=r?fe(t):oe(t,o);return de(o,i,r)}/**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */function ge(e){var t=e.ownerDocument.defaultView,o=t.getComputedStyle(e),r=parseFloat(o.marginTop||0)+parseFloat(o.marginBottom||0),i=parseFloat(o.marginLeft||0)+parseFloat(o.marginRight||0),n={width:e.offsetWidth+i,height:e.offsetHeight+r};return n}/**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */function ve(e){var t={left:"right",right:"left",bottom:"top",top:"bottom"};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}/**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */function we(e,t,o){o=o.split("-")[0];// Get popper node sizes
var r=ge(e),i={width:r.width,height:r.height},n=-1!==["right","left"].indexOf(o),a=n?"top":"left",p=n?"left":"top",s=n?"height":"width",l=n?"width":"height";// Add position, width and height to our offsets object
return i[a]=t[a]+t[s]/2-r[s]/2,i[p]=o===p?t[p]-r[l]:t[ve(p)],i}/**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */function xe(e,t){// use native find if supported
return Array.prototype.find?e.find(t):e.filter(t)[0];// use `filter` to obtain the same behavior of `find`
}/**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */function ke(e,t,o){// use native findIndex if supported
if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});// use `find` + `indexOf` if `findIndex` isn't supported
var r=xe(e,function(e){return e[t]===o});return e.indexOf(r)}/**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */function Ee(e,t,o){var r=void 0===o?e:e.slice(0,ke(e,"name",o));return r.forEach(function(e){e["function"]&&console.warn("`modifier.function` is deprecated, use `modifier.fn`!");var o=e["function"]||e.fn;// eslint-disable-line dot-notation
e.enabled&&K(o)&&(t.offsets.popper=se(t.offsets.popper),t.offsets.reference=se(t.offsets.reference),t=o(t,e))}),t}/**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */function Oe(){// if popper is destroyed, don't perform any further update
if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};// compute reference element offsets
e.offsets.reference=ye(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=ue(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=we(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?"fixed":"absolute",e=Ee(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}/**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */function Se(e,t){return e.some(function(e){var o=e.name,r=e.enabled;return r&&o===t})}/**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */function Ce(e){for(var t=[!1,"ms","Webkit","Moz","O"],o=e.charAt(0).toUpperCase()+e.slice(1),r=0;r<t.length;r++){var n=t[r],a=n?""+n+o:e;if("undefined"!=typeof document.body.style[a])return a}return null}/**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */function Le(){return this.state.isDestroyed=!0,Se(this.modifiers,"applyStyle")&&(this.popper.removeAttribute("x-placement"),this.popper.style.position="",this.popper.style.top="",this.popper.style.left="",this.popper.style.right="",this.popper.style.bottom="",this.popper.style.willChange="",this.popper.style[Ce("transform")]=""),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}/**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */function Te(e){var t=e.ownerDocument;return t?t.defaultView:window}function Ae(e,t,o,r){var i="BODY"===e.nodeName,n=i?e.ownerDocument.defaultView:e;n.addEventListener(t,o,{passive:!0}),i||Ae(J(n.parentNode),t,o,r),r.push(n)}/**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */function _e(e,t,o,r){o.updateBound=r,Te(e).addEventListener("resize",o.updateBound,{passive:!0});// Scroll event listener on scroll parents
var i=J(e);return Ae(i,"scroll",o.updateBound,o.scrollParents),o.scrollElement=i,o.eventsEnabled=!0,o}/**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */function Pe(){this.state.eventsEnabled||(this.state=_e(this.reference,this.options,this.state,this.scheduleUpdate))}/**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */function je(e,t){return Te(e).removeEventListener("resize",t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener("scroll",t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}/**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */function De(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=je(this.reference,this.state))}/**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */function Me(e){return""!==e&&!isNaN(parseFloat(e))&&isFinite(e)}/**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */function Ie(e,t){Object.keys(t).forEach(function(o){var r="";// add unit if the value is numeric and is one of the following
-1!==["width","height","top","right","bottom","left"].indexOf(o)&&Me(t[o])&&(r="px"),e.style[o]=t[o]+r})}/**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */function Ne(e,t){Object.keys(t).forEach(function(o){var r=t[o];!1===r?e.removeAttribute(o):e.setAttribute(o,t[o])})}/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */ /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */function Ye(e,t){var o=e.offsets,r=o.popper,i=o.reference,n=Co,a=function(e){return e},p=n(i.width),s=n(r.width),l=-1!==["left","right"].indexOf(e.placement),d=-1!==e.placement.indexOf("-"),c=t?l||d||p%2==s%2?n:So:a,m=t?n:a;return{left:c(1==p%2&&1==s%2&&!d&&t?r.left-1:r.left),top:m(r.top),bottom:m(r.bottom),right:c(r.right)}}/**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */function He(e,t,o){var r=xe(e,function(e){var o=e.name;return o===t}),i=!!r&&e.some(function(e){return e.name===o&&e.enabled&&e.order<r.order});if(!i){var n="`"+t+"`";console.warn("`"+o+"`"+" modifier is required by "+n+" modifier in order to work, be sure to include it before "+n+"!")}return i}/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */ /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */function Xe(e){return"end"===e?"start":"start"===e?"end":e}/**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */ /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */function Be(e){var t=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],o=vi.indexOf(e),r=vi.slice(o+1).concat(vi.slice(0,o));return t?r.reverse():r}/**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */function We(e,t,o,r){// separate value from unit
var i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),n=+i[1],a=i[2];// If it's not a number it's an operator, I guess
if(!n)return e;if(0===a.indexOf("%")){var p;switch(a){case"%p":p=o;break;case"%":case"%r":default:p=r;}var s=se(p);return s[t]/100*n}if("vh"===a||"vw"===a){// if is a vh or vw, we calculate the size based on the viewport
var l;return l="vh"===a?Lo(document.documentElement.clientHeight,window.innerHeight||0):Lo(document.documentElement.clientWidth,window.innerWidth||0),l/100*n}// if is an explicit pixel unit, we get rid of the unit and keep the value
// if is an implicit unit, it's px, and we return just the value
return n}/**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */function Re(e,t,o,r){var i=[0,0],n=-1!==["right","left"].indexOf(r),a=e.split(/(\+|\-)/).map(function(e){return e.trim()}),p=a.indexOf(xe(a,function(e){return-1!==e.search(/,|\s/)}));// Use height if placement is left or right and index is 0 otherwise use width
// in this way the first offset will use an axis and the second one
// will use the other one
a[p]&&-1===a[p].indexOf(",")&&console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");// If divider is found, we divide the list of values and operands to divide
// them by ofset X and Y.
var s=/\s*,\s*|\s+/,l=-1===p?[a]:[a.slice(0,p).concat([a[p].split(s)[0]]),[a[p].split(s)[1]].concat(a.slice(p+1))];return l=l.map(function(e,r){// Most of the units rely on the orientation of the popper
var i=(1===r?!n:n)?"height":"width",p=!1;return e// This aggregates any `+` or `-` sign that aren't considered operators
// e.g.: 10 + +5 => [10, +, +5]
.reduce(function(e,t){return""===e[e.length-1]&&-1!==["+","-"].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[])// Here we convert the string values into number values (in px)
.map(function(e){return We(e,i,t,o)})}),l.forEach(function(e,t){e.forEach(function(o,r){Me(o)&&(i[t]+=o*("-"===e[r-1]?-1:1))})}),i}/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */function Fe(e,t){var o=t.offset,r=e.placement,i=e.offsets,n=i.popper,a=i.reference,p=r.split("-")[0],s=void 0;return s=Me(+o)?[+o,0]:Re(o,n,a,p),"left"===p?(n.top+=s[0],n.left-=s[1]):"right"===p?(n.top+=s[0],n.left+=s[1]):"top"===p?(n.left+=s[0],n.top-=s[1]):"bottom"===p&&(n.left+=s[0],n.top+=s[1]),e.popper=n,e}/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function Ue(){return Ue=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var r in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},Ue.apply(this,arguments)}/**
   * Ponyfill for Array.from - converts iterable values to an array
   */function ze(e){return[].slice.call(e)}/**
   * Ponyfill for Element.prototype.closest
   */function Ve(e,t){return(_i.closest||function(e){// @ts-ignore
for(var t=this;t;){if(Pi.call(t,e))return t;t=t.parentElement}}).call(e,t)}/**
   * Works like Element.prototype.closest, but uses a callback instead
   */function qe(e,t){for(;e;){if(t(e))return e;e=e.parentElement}}/**
   * Returns an object of optional props from data-tippy-* attributes
   */function Ke(e){return Di.reduce(function(t,o){var r=(e.getAttribute("data-tippy-".concat(o))||"").trim();if(!r)return t;if("content"===o)t[o]=r;else try{t[o]=JSON.parse(r)}catch(i){t[o]=r}return t},{})}/**
   * Polyfills the virtual reference (plain object) with Element.prototype props
   * Mutating because DOM elements are mutated, adds `_tippy` property
   */function Ge(e){var t={isVirtual:!0,attributes:e.attributes||{},setAttribute:function(t,o){e.attributes[t]=o},getAttribute:function(t){return e.attributes[t]},removeAttribute:function(t){delete e.attributes[t]},hasAttribute:function(t){return t in e.attributes},addEventListener:function(){},removeEventListener:function(){},classList:{classNames:{},add:function(t){e.classList.classNames[t]=!0},remove:function(t){delete e.classList.classNames[t]},contains:function(t){return t in e.classList.classNames}}};for(var o in t)e[o]=t[o]}/**
   * Determines if a value is a "bare" virtual element (before mutations done
   * by `polyfillElementPrototypeProperties()`). JSDOM elements show up as
   * [object Object], we can check if the value is "element-like" if it has
   * `addEventListener`
   */function $e(e){return"[object Object]"==={}.toString.call(e)&&!e.addEventListener}/**
   * Safe .hasOwnProperty check, for prototype-less objects
   */function Je(e,t){return{}.hasOwnProperty.call(e,t)}/**
   * Returns an array of elements based on the value
   */function Ze(e){if(rt(e))// TODO: VirtualReference is not compatible to type Element
return[e];if(e instanceof NodeList)return ze(e);if(Array.isArray(e))return e;try{return ze(document.querySelectorAll(e))}catch(t){return[]}}/**
   * Returns a value at a given index depending on if it's an array or number
   */function Qe(e,t,o){if(Array.isArray(e)){var r=e[t];return null==r?o:r}return e}/**
   * Debounce utility
   */function et(e,t){var o;return function(){var r=this,i=arguments;clearTimeout(o),o=setTimeout(function(){return e.apply(r,i)},t)}}/**
   * Prevents errors from being thrown while accessing nested modifier objects
   * in `popperOptions`
   */function tt(e,t){return e&&e.modifiers&&e.modifiers[t]}/**
   * Determines if an array or string includes a value
   */function ot(e,t){return-1<e.indexOf(t)}/**
   * Determines if the value is singular-like
   */function rt(e){return!!(e&&Je(e,"isVirtual"))||e instanceof Element}/**
   * Firefox extensions don't allow setting .innerHTML directly, this will trick it
   */function it(){return"innerHTML"}/**
   * Evaluates a function if one, or returns the value
   */function nt(e,t){return"function"==typeof e?e.apply(null,t):e}/**
   * Sets a popperInstance `flip` modifier's enabled state
   */function at(e,t){e.filter(function(e){return"flip"===e.name})[0].enabled=t}/**
   * Determines if an element can receive focus
   * Always returns true for virtual objects
   */function pt(e){return!(e instanceof Element)||Pi.call(e,"a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]")&&!e.hasAttribute("disabled")}/**
   * Returns a new `div` element
   */function st(){return document.createElement("div")}/**
   * Evaluates the props object by merging data attributes and
   * disabling conflicting options where necessary
   */function lt(e,t){var o=Ue({},t,{content:nt(t.content,[e])},t.ignoreAttributes?{}:Ke(e));return(o.arrow||Si)&&(o.animateFill=!1),o}/**
   * Validates an object of options with the valid default props object
   */function dt(e,t){Object.keys(e).forEach(function(e){if(!Je(t,e))throw new Error("[tippy]: `".concat(e,"` is not a valid option"))})}/**
   * Sets the innerHTML of an element
   */function ct(e,t){e[it()]=t instanceof Element?t[it()]:t}/**
   * Sets the content of a tooltip
   */function mt(e,t){if(t.content instanceof Element)ct(e,""),e.appendChild(t.content);else if("function"!=typeof t.content){var o=t.allowHTML?"innerHTML":"textContent";e[o]=t.content}}/**
   * Returns the child elements of a popper element
   */function ft(e){return{tooltip:e.querySelector(Ai.TOOLTIP),backdrop:e.querySelector(Ai.BACKDROP),content:e.querySelector(Ai.CONTENT),arrow:e.querySelector(Ai.ARROW)||e.querySelector(Ai.ROUND_ARROW)}}/**
   * Adds `data-inertia` attribute
   */function ht(e){e.setAttribute("data-inertia","")}/**
   * Removes `data-inertia` attribute
   */function bt(e){e.removeAttribute("data-inertia")}/**
   * Creates an arrow element and returns it
   */function ut(e){var t=st();return"round"===e?(t.className="tippy-roundarrow",ct(t,"<svg viewBox=\"0 0 18 7\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z\"/></svg>")):t.className="tippy-arrow",t}/**
   * Creates a backdrop element and returns it
   */function yt(){var e=st();return e.className="tippy-backdrop",e.setAttribute("data-state","hidden"),e}/**
   * Adds interactive-related attributes
   */function gt(e,t){e.setAttribute("tabindex","-1"),t.setAttribute("data-interactive","")}/**
   * Removes interactive-related attributes
   */function vt(e,t){e.removeAttribute("tabindex"),t.removeAttribute("data-interactive")}/**
   * Applies a transition duration to a list of elements
   */function wt(e,t){e.forEach(function(e){e&&(e.style.transitionDuration="".concat(t,"ms"))})}/**
   * Add/remove transitionend listener from tooltip
   */function xt(e,t,o){// UC Browser hasn't adopted the `transitionend` event despite supporting
// unprefixed transitions...
var r=Si&&void 0!==document.body.style.webkitTransition?"webkitTransitionEnd":"transitionend";e[t+"EventListener"](r,o)}/**
   * Returns the popper's placement, ignoring shifting (top-start, etc)
   */function kt(e){var t=e.getAttribute("x-placement");return t?t.split("-")[0]:""}/**
   * Sets the visibility state to elements so they can begin to transition
   */function Et(e,t){e.forEach(function(e){e&&e.setAttribute("data-state",t)})}/**
   * Triggers reflow
   */function Ot(e){void e.offsetHeight}/**
   * Adds/removes theme from tooltip's classList
   */function St(e,t,o){o.split(" ").forEach(function(o){e.classList[t](o+"-theme")})}/**
   * Constructs the popper element and returns it
   */function Ct(e,t){var o=st();o.className="tippy-popper",o.id="tippy-".concat(e),o.style.zIndex=""+t.zIndex,t.role&&o.setAttribute("role",t.role);var r=st();r.className="tippy-tooltip",r.style.maxWidth=t.maxWidth+("number"==typeof t.maxWidth?"px":""),r.setAttribute("data-size",t.size),r.setAttribute("data-animation",t.animation),r.setAttribute("data-state","hidden"),St(r,"add",t.theme);var i=st();return i.className="tippy-content",i.setAttribute("data-state","hidden"),t.interactive&&gt(o,r),t.arrow&&r.appendChild(ut(t.arrowType)),t.animateFill&&(r.appendChild(yt()),r.setAttribute("data-animatefill","")),t.inertia&&ht(r),mt(i,t),r.appendChild(i),o.appendChild(r),o}/**
   * Updates the popper element based on the new props
   */function Lt(e,t,o){var r=ft(e),i=r.tooltip,n=r.content,a=r.backdrop,p=r.arrow;e.style.zIndex=""+o.zIndex,i.setAttribute("data-size",o.size),i.setAttribute("data-animation",o.animation),i.style.maxWidth=o.maxWidth+("number"==typeof o.maxWidth?"px":""),o.role?e.setAttribute("role",o.role):e.removeAttribute("role"),t.content!==o.content&&mt(n,o),!t.animateFill&&o.animateFill?(i.appendChild(yt()),i.setAttribute("data-animatefill","")):t.animateFill&&!o.animateFill&&(i.removeChild(a),i.removeAttribute("data-animatefill")),!t.arrow&&o.arrow?i.appendChild(ut(o.arrowType)):t.arrow&&!o.arrow&&i.removeChild(p),t.arrow&&o.arrow&&t.arrowType!==o.arrowType&&i.replaceChild(ut(o.arrowType),p),!t.interactive&&o.interactive?gt(e,i):t.interactive&&!o.interactive&&vt(e,i),!t.inertia&&o.inertia?ht(i):t.inertia&&!o.inertia&&bt(i),t.theme!==o.theme&&(St(i,"remove",t.theme),St(i,"add",o.theme))}/**
   * Runs the callback after the popper's position has been updated
   * update() is debounced with Promise.resolve() or setTimeout()
   * scheduleUpdate() is update() wrapped in requestAnimationFrame()
   */function Tt(e,t){var o=e.popper,r=e.options,i=r.onCreate,n=r.onUpdate;r.onCreate=r.onUpdate=function(e){Ot(o),t(),n&&n(e),r.onCreate=i,r.onUpdate=n}}/**
   * Hides all visible poppers on the document
   */function At(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},t=e.checkHideOnClick,o=e.exclude,r=e.duration;ze(document.querySelectorAll(Ai.POPPER)).forEach(function(e){var i=e._tippy;!i||t&&!0!==i.props.hideOnClick||o&&e===o.popper||i.hide(r)})}/**
   * Determines if the mouse cursor is outside of the popper's interactive border
   * region
   */function _t(e,t,o,r){if(!e)return!0;var i=o.clientX,n=o.clientY,a=r.interactiveBorder,p=r.distance,s=t.top-n>("top"===e?a+p:a),l=n-t.bottom>("bottom"===e?a+p:a),d=t.left-i>("left"===e?a+p:a),c=i-t.right>("right"===e?a+p:a);return s||l||d||c}/**
   * Returns the distance offset, taking into account the default offset due to
   * the transform: translate() rule (10px) in CSS
   */function Pt(e){return-(e-10)+"px"}function jt(){Mi||(Mi=!0,Ci&&document.body.classList.add("tippy-iOS"),window.performance&&document.addEventListener("mousemove",Dt))}function Dt(){var e=performance.now();// Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference
20>e-Ii&&(Mi=!1,document.removeEventListener("mousemove",Dt),!Ci&&document.body.classList.remove("tippy-iOS")),Ii=e}function Mt(e){// Simulated events dispatched on the document
if(!(e.target instanceof Element))return At();// Clicked on an interactive popper
var t=Ve(e.target,Ai.POPPER);if(!(t&&t._tippy&&t._tippy.props.interactive)){// Clicked on a reference
var o=qe(e.target,function(e){return e._tippy&&e._tippy.reference===e});if(o){var r=o._tippy;if(r){var i=ot(r.props.trigger||"","click");if(Mi||i)return At({exclude:r,checkHideOnClick:!0});if(!0!==r.props.hideOnClick||i)return;r.clearDelayTimeouts()}}At({checkHideOnClick:!0})}}function It(){var e=document,t=e.activeElement;t&&t.blur&&t._tippy&&t.blur()}/**
   * Adds the needed global event listeners
   */function Nt(){document.addEventListener("click",Mt,!0),document.addEventListener("touchstart",jt,ji),window.addEventListener("blur",It)}/**
   * Creates and returns a Tippy object. We're using a closure pattern instead of
   * a class so that the exposed object API is clean without private members
   * prefixed with `_`.
   */function Yt(e,t){/* ======================= 🔒 Private methods 🔒 ======================= */ /**
     * Positions the virtual reference near the cursor
     */function o(e){var t=D=e,o=t.clientX,r=t.clientY;if(z.popperInstance){// Ensure virtual reference is padded to prevent tooltip from
// overflowing. Maybe Popper.js issue?
var i=kt(z.popper),n=z.props.arrow?4+("round"===z.props.arrowType?18:16):4,p=ot(["top","bottom"],i),s=ot(["left","right"],i),l=p?Lo(n,o):o,d=s?Lo(n,r):r;p&&l>n&&(l=Oo(o,window.innerWidth-n)),s&&d>n&&(d=Oo(r,window.innerHeight-n));var c=z.reference.getBoundingClientRect(),m=z.props.followCursor,f="horizontal"===m,h="vertical"===m;z.popperInstance.reference=Ue({},z.popperInstance.reference,{getBoundingClientRect:function(){return{width:0,height:0,top:f?c.top:d,bottom:f?c.bottom:d,left:h?c.left:l,right:h?c.right:l}},clientWidth:0,clientHeight:0}),z.popperInstance.scheduleUpdate(),"initial"===m&&z.state.isVisible&&a()}}/**
     * Creates the tippy instance for a delegate when it's been triggered
     */function r(e){if(e){var o=Ve(e.target,z.props.target);o&&!o._tippy&&(Yt(o,Ue({},z.props,{content:nt(t.content,[o]),appendTo:t.appendTo,target:"",showOnInit:!0})),i(e))}}/**
     * Setup before show() is invoked (delays, etc.)
     */function i(e){if(C(),!z.state.isVisible){// Is a delegate, create an instance for the child target
if(z.props.target)return r(e);if(X=!0,z.props.wait)return z.props.wait(z,e);// If the tooltip has a delay, we need to be listening to the mousemove as
// soon as the trigger event is fired, so that it's in the correct position
// upon mount.
// Edge case: if the tooltip is still mounted, but then scheduleShow() is
// called, it causes a jump.
y()&&!z.state.isMounted&&document.addEventListener("mousemove",o);var t=Qe(z.props.delay,0,Li.delay);t?M=setTimeout(function(){T()},t):T()}}/**
     * Setup before hide() is invoked (delays, etc.)
     */function n(){if(C(),!z.state.isVisible)return a();X=!1;var e=Qe(z.props.delay,1,Li.delay);e?I=setTimeout(function(){z.state.isVisible&&A()},e):N=requestAnimationFrame(function(){A()})}/**
     * Removes the follow cursor listener
     */function a(){document.removeEventListener("mousemove",o)}/**
     * Cleans up old listeners
     */function p(){document.body.removeEventListener("mouseleave",n),document.removeEventListener("mousemove",W)}/**
     * Event listener invoked upon trigger
     */function s(e){!z.state.isEnabled||h(e)||(!z.state.isVisible&&(j=e.type,e instanceof MouseEvent&&(D=e)),"click"===e.type&&!1!==z.props.hideOnClick&&z.state.isVisible?n():i(e))}/**
     * Event listener used for interactive tooltips to detect when they should
     * hide
     */function l(e){var t=qe(e.target,function(e){return e._tippy}),o=Ve(e.target,Ai.POPPER)===z.popper,r=t===z.reference;o||r||_t(kt(z.popper),z.popper.getBoundingClientRect(),e,z.props)&&(p(),n())}/**
     * Event listener invoked upon mouseleave
     */function d(e){return h(e)?void 0:z.props.interactive?(document.body.addEventListener("mouseleave",n),void document.addEventListener("mousemove",W)):void n()}/**
     * Event listener invoked upon blur
     */function c(e){e.target!==z.reference||z.props.interactive&&e.relatedTarget&&z.popper.contains(e.relatedTarget)||n()}/**
     * Event listener invoked when a child target is triggered
     */function m(e){Ve(e.target,z.props.target)&&i(e)}/**
     * Event listener invoked when a child target should hide
     */function f(e){Ve(e.target,z.props.target)&&n()}/**
     * Determines if an event listener should stop further execution due to the
     * `touchHold` option
     */function h(e){var t="ontouchstart"in window,o=ot(e.type,"touch"),r=z.props.touchHold;return t&&Mi&&r&&!o||Mi&&!r&&o}/**
     * Creates the popper instance for the instance
     */function b(){function e(e){z.props.flip&&!z.props.flipOnUpdate&&(e.flipped&&(z.popperInstance.options.placement=e.placement),at(z.popperInstance.modifiers,!1)),r.setAttribute("x-placement",e.placement);var t=kt(z.popper),o=r.style;o.top=o.bottom=o.left=o.right="",o[t]=Pt(z.props.distance);var i=n&&void 0!==n.padding?n.padding:4,a="number"==typeof i,p=Ue({top:a?i:i.top,bottom:a?i:i.bottom,left:a?i:i.left,right:a?i:i.right},!a&&i);p[t]=a?i+z.props.distance:(i[t]||0)+z.props.distance,z.popperInstance.modifiers.filter(function(e){return"preventOverflow"===e.name})[0].padding=p}var t=z.props.popperOptions,o=z.popperChildren,r=o.tooltip,i=o.arrow,n=tt(t,"preventOverflow"),a=Ue({placement:z.props.placement},t,{modifiers:Ue({},t?t.modifiers:{},{preventOverflow:Ue({boundariesElement:z.props.boundary,padding:4},n),arrow:Ue({element:i,enabled:!!i},tt(t,"arrow")),flip:Ue({enabled:z.props.flip,// The tooltip is offset by 10px from the popper in CSS,
// we need to account for its distance
padding:z.props.distance+4,behavior:z.props.flipBehavior},tt(t,"flip")),offset:Ue({offset:z.props.offset},tt(t,"offset"))}),// This gets invoked when calling `.set()` and updating a popper
// instance dependency, since a new popper instance gets created
onCreate:function(o){e(o),t&&t.onCreate&&t.onCreate(o)},// This gets invoked on initial create and show()/scroll/resize update.
// This is due to `afterPopperPositionUpdates` overwriting onCreate()
// with onUpdate()
onUpdate:function(o){e(o),t&&t.onUpdate&&t.onUpdate(o)}});z.popperInstance=new xi(z.reference,z.popper,a)}/**
     * Mounts the tooltip to the DOM, callback to show tooltip is run **after**
     * popper's position has updated
     */function u(e){var t=!y()&&!("initial"===z.props.followCursor&&Mi);z.popperInstance?(!y()&&(z.popperInstance.scheduleUpdate(),t&&z.popperInstance.enableEventListeners()),at(z.popperInstance.modifiers,z.props.flip)):(b(),!t&&z.popperInstance.disableEventListeners()),z.popperInstance.reference=z.reference;var r=z.popperChildren.arrow;y()?(r&&(r.style.margin="0"),D&&o(D)):r&&(r.style.margin=""),Mi&&D&&"initial"===z.props.followCursor&&(o(D),r&&(r.style.margin="0")),Tt(z.popperInstance,e);var i=z.props.appendTo;H="parent"===i?z.reference.parentNode:nt(i,[z.reference]),H.contains(z.popper)||(H.appendChild(z.popper),z.props.onMount(z),z.state.isMounted=!0)}/**
     * Determines if the instance is in `followCursor` mode
     */function y(){return z.props.followCursor&&!Mi&&"focus"!==j}/**
     * Updates the tooltip's position on each animation frame
     */function g(){function e(){z.popperInstance&&z.popperInstance.scheduleUpdate(),z.state.isMounted?requestAnimationFrame(e):wt([z.popper],0)}wt([z.popper],Oi?0:z.props.updateDuration),e()}/**
     * Invokes a callback once the tooltip has fully transitioned out
     */function v(e,t){x(e,function(){!z.state.isVisible&&H&&H.contains(z.popper)&&t()})}/**
     * Invokes a callback once the tooltip has fully transitioned in
     */function w(e,t){x(e,t)}/**
     * Invokes a callback once the tooltip's CSS transition ends
     */function x(e,t){/**
       * Listener added as the `transitionend` handler
       */function o(e){e.target===r&&(xt(r,"remove",o),t())}// Make callback synchronous if duration is 0
// `transitionend` won't fire otherwise
var r=z.popperChildren.tooltip;return 0===e?t():void(xt(r,"remove",Y),xt(r,"add",o),Y=o)}/**
     * Adds an event listener to the reference and stores it in `listeners`
     */function k(e,t){var o=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2];z.reference.addEventListener(e,t,o),B.push({eventType:e,handler:t,options:o})}/**
     * Adds event listeners to the reference based on the `trigger` prop
     */function E(){z.props.touchHold&&!z.props.target&&(k("touchstart",s,ji),k("touchend",d,ji)),z.props.trigger.trim().split(" ").forEach(function(e){"manual"===e||(z.props.target?"mouseenter"===e?(k("mouseover",m),k("mouseout",f)):"focus"===e?(k("focusin",m),k("focusout",f)):"click"===e?k(e,m):void 0:(k(e,s),"mouseenter"===e?k("mouseleave",d):"focus"===e?k(Oi?"focusout":"blur",c):void 0))})}/**
     * Removes event listeners from the reference
     */function O(){B.forEach(function(e){var t=e.eventType,o=e.handler,r=e.options;z.reference.removeEventListener(t,o,r)}),B=[]}/**
     * Returns inner elements used in show/hide methods
     */function S(){return[z.popperChildren.tooltip,z.popperChildren.backdrop,z.popperChildren.content]}/* ======================= 🔑 Public methods 🔑 ======================= */ /**
     * Enables the instance to allow it to show or hide
     */ /**
     * Clears pending timeouts related to the `delay` prop if any
     */function C(){clearTimeout(M),clearTimeout(I),cancelAnimationFrame(N)}/**
     * Sets new props for the instance and redraws the tooltip
     */function L(e){e=e||{},dt(e,Li);var t=z.props,r=lt(z.reference,Ue({},z.props,e,{ignoreAttributes:!0}));r.ignoreAttributes=Je(e,"ignoreAttributes")?e.ignoreAttributes||!1:t.ignoreAttributes,z.props=r,(Je(e,"trigger")||Je(e,"touchHold"))&&(O(),E()),Je(e,"interactiveDebounce")&&(p(),W=et(l,e.interactiveDebounce||0)),Lt(z.popper,t,r),z.popperChildren=ft(z.popper),z.popperInstance&&(z.popperInstance.update(),Ti.some(function(t){return Je(e,t)})&&(z.popperInstance.destroy(),b(),!z.state.isVisible&&z.popperInstance.disableEventListeners(),z.props.followCursor&&D&&o(D)))}/**
     * Shortcut for .set({ content: newContent })
     */ /**
     * Shows the tooltip
     */function T(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:Qe(z.props.duration,0,Li.duration[1]);return z.state.isDestroyed||!z.state.isEnabled||Mi&&!z.props.touch?void 0:Je(z.reference,"isVirtual")||document.documentElement.contains(z.reference)?void(z.reference.hasAttribute("disabled")||!1===z.props.onShow(z)||(// Prevent a transition if the popper is at the opposite placement
z.popper.style.visibility="visible",z.state.isVisible=!0,z.props.interactive&&z.reference.classList.add("tippy-active"),wt([z.popper,z.popperChildren.tooltip,z.popperChildren.backdrop],0),u(function(){z.state.isVisible&&(!y()&&z.popperInstance.update(),wt([z.popper],P.updateDuration),wt(S(),e),z.popperChildren.backdrop&&(z.popperChildren.content.style.transitionDelay=Co(e/12)+"ms"),z.props.sticky&&g(),Et(S(),"visible"),w(e,function(){z.popperChildren.tooltip.classList.add("tippy-notransition"),z.props.aria&&z.reference.setAttribute("aria-".concat(z.props.aria),z.popper.id),z.props.onShown(z),z.state.isShown=!0}))}))):_();// Destroy tooltip if the reference element is no longer on the DOM
// Do not show tooltip if the reference element has a `disabled` attribute
}/**
     * Hides the tooltip
     */function A(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:Qe(z.props.duration,1,Li.duration[1]);z.state.isDestroyed||!z.state.isEnabled||!1===z.props.onHide(z)||(z.popperChildren.tooltip.classList.remove("tippy-notransition"),z.props.interactive&&z.reference.classList.remove("tippy-active"),z.popper.style.visibility="hidden",z.state.isVisible=!1,z.state.isShown=!1,wt(S(),e),Et(S(),"hidden"),v(e,function(){X||a(),z.props.aria&&z.reference.removeAttribute("aria-".concat(z.props.aria)),z.popperInstance.disableEventListeners(),z.popperInstance.options.placement=z.props.placement,H.removeChild(z.popper),z.props.onHidden(z),z.state.isMounted=!1}))}/**
     * Destroys the tooltip
     */function _(e){z.state.isDestroyed||(z.state.isMounted&&A(0),O(),delete z.reference._tippy,z.props.target&&e&&ze(z.reference.querySelectorAll(z.props.target)).forEach(function(e){e._tippy&&e._tippy.destroy()}),z.popperInstance&&z.popperInstance.destroy(),z.state.isDestroyed=!0)}var P=lt(e,t);// If the reference shouldn't have multiple tippys, return null early
if(!P.multiple&&e._tippy)return null;/* ======================= 🔒 Private members 🔒 ======================= */ // The last trigger event type that caused the tippy to show
var j,D,M,I,N,Y,H,X=!1,B=[],W=0<P.interactiveDebounce?et(l,P.interactiveDebounce):l,R=Ni++,F=Ct(R,P),U=ft(F),z={// properties
id:R,reference:e,popper:F,popperChildren:U,popperInstance:null,props:P,state:{// Is the instance currently enabled?
isEnabled:!0,// Is the tippy currently showing and not transitioning out?
isVisible:!1,// Has the instance been destroyed?
isDestroyed:!1,// Is the tippy currently mounted to the DOM?
isMounted:!1,// Has the tippy finished transitioning in?
isShown:!1// Popper.js instance for the tippy is lazily created
},// methods
clearDelayTimeouts:C,set:L,setContent:function(e){L({content:e})},show:T,hide:A,enable:function(){z.state.isEnabled=!0}/**
     * Disables the instance to disallow it to show or hide
     */,disable:function(){z.state.isEnabled=!1},destroy:_};// The last mousemove event object created by the document mousemove event
return E(),P.lazy||(b(),z.popperInstance.disableEventListeners()),P.showOnInit&&i(),!P.a11y||P.target||pt(e)||e.setAttribute("tabindex","0"),F.addEventListener("mouseenter",function(e){z.props.interactive&&z.state.isVisible&&"mouseenter"===j&&i(e)}),F.addEventListener("mouseleave",function(){z.props.interactive&&"mouseenter"===j&&document.addEventListener("mousemove",W)}),e._tippy=z,F._tippy=z,z}/**
   * Groups an array of instances by taking control of their props during
   * certain lifecycles.
   */ /**
   * Exported module
   */function Ht(e,t){dt(t||{},Li),Yi||(Nt(),Yi=!0);var o=Ue({},Li,t);// If they are specifying a virtual positioning reference, we need to polyfill
// some native DOM props
$e(e)&&Ge(e);var r=Ze(e).reduce(function(e,t){var r=t&&Yt(t,o);return r&&e.push(r),e},[]);return rt(e)?r[0]:r}/**
   * Static props
   */ /**
   * TODO rewrite the way items are being added to use more performant documentFragment code
   * @param html
   * @return {HTMLElement} The element created from the passed HTML string
   */function Xt(e){const t=document.createElement("div");return t.innerHTML=e,t.children[0]}/**
   * Parse the position object or string to return the attachment and element to attach to
   * @param {Object|String} position Either a string or object denoting the selector and position for attachment
   * @return {Object} The object with `element` and `on` for the step
   * @private
   */function Bt(e){if(a(e))return e.hasOwnProperty("element")&&e.hasOwnProperty("on")?e:null;const t=/^(.+) ((auto|top|left|right|bottom)(-start|-end)?)$/,o=t.exec(e);return o?{element:o[1],on:o[2]}:null}/**
   * @param obj
   * @param {Array} props
   * @return {*}
   */function Wt(e,t){if(null===e||m(e))return e;if(a(e))return e;const o=e.split(" ");return q(t,o)}/**
   * Determines options for the tooltip and initializes
   * `this.tooltip` as a Tippy.js instance.
   */function Rt(){if(m(Ht))throw new Error(Hi);this.tooltip&&this.tooltip.destroy();const e=this.parseAttachTo();this.tooltip=Ut.call(this,e),this.target=e.element||document.body,this.el.classList.add("shepherd-element")}/**
   * Passes `options.attachTo` to `_parseAttachToOpts` to get the correct `attachTo` format
   * @returns {({} & {element, on}) | ({})}
   * `element` is a qualified HTML Element
   * `on` is a string position value
   */function Ft(){const e=Bt(this.options.attachTo)||{},t=Object.assign({},e);if(N(e.element)){// Can't override the element in user opts reference because we can't
// guarantee that the element will exist in the future.
try{t.element=document.querySelector(e.element)}catch(t){// TODO
}t.element||console.error(`The element for this Shepherd step was not found ${e.element}`)}return t}/**
   * Generates a `Tippy` instance from a set of base `attachTo` options
   *
   * @return {tippy} The final tippy instance
   * @private
   */function Ut(e){if(!e.element)return Vt.call(this);const t=zt.call(this,e);return Ht(e.element,t)}/**
   * Generates the hash of options that will be passed to `Tippy` instances
   * target an element in the DOM.
   *
   * @param {Object} attachToOptions The local `attachTo` options
   * @return {Object} The final tippy options  object
   * @private
   */function zt(e){const t={content:this.el,flipOnUpdate:!0,placement:e.on||"right"};if(Object.assign(t,this.options.tippyOptions),this.options.title){const e=t.theme;t.theme=e?`${e} shepherd-has-title`:"shepherd-has-title"}return this.options.tippyOptions&&this.options.tippyOptions.popperOptions&&Object.assign(Bi,this.options.tippyOptions.popperOptions),t.popperOptions=Bi,t}/**
   * Generates a `Tippy` instance for a tooltip that doesn't have a
   * target element in the DOM -- and thus is positioned in the center
   * of the view
   *
   * @return {tippy} The final tippy instance
   * @private
   */function Vt(){const e=H({content:this.el,placement:"top"},this.options.tippyOptions);e.arrow=!1,e.popperOptions=e.popperOptions||{};const t=Object.assign({},Bi,e.popperOptions,{modifiers:Object.assign(Xi,e.popperOptions.modifiers)});return e.popperOptions=t,Ht(document.body,e)}/**
   * Sets up the handler to determine if we should advance the tour
   * @private
   */function qt(e){return t=>{if(this.isOpen()){const o=this.el&&t.target===this.el,r=!m(e)&&t.target.matches(e);(r||o)&&this.tour.next()}}}/**
   * Bind the event handler for advanceOn
   */function Kt(){// An empty selector matches the step element
const e=Wt(this.options.advanceOn,["selector","event"]),t=e.event,o=e.selector,r=qt.call(this,o),i=document.querySelector(o);!m(o)&&i?i.addEventListener(t,r):document.body.addEventListener(t,r,!0),this.on("destroy",()=>document.body.removeEventListener(t,r,!0))}/**
   * Bind events to the buttons for next, back, etc
   * @param {Object} cfg An object containing the config options for the button
   * @param {HTMLElement} el The element for the button
   */function Gt(e,t){e.events=e.events||{},m(e.action)||(e.events.click=e.action),L(e.events,(e,o)=>{if(N(e)){const t=e;e=()=>this.tour.show(t)}t.dataset.buttonEvent=!0,t.addEventListener(o,e),this.on("destroy",()=>{t.removeAttribute("data-button-event"),t.removeEventListener(o,e)})})}/**
   * Add a click listener to the cancel link that cancels the tour
   * @param {HTMLElement} link The cancel link element
   */function $t(e){e.addEventListener("click",t=>{t.preventDefault(),this.cancel()})}/**
   * Take an array of strings and look up methods by name, then bind them to `this`
   * @param {String[]} methods The names of methods to bind
   */function Jt(e){e.map(e=>{this[e]=this[e].bind(this)})}/**
   * Creates incremented ID for each newly created step
   *
   * @private
   * @return {Number} The unique id for the step
   */ /**
   * Checks if `value` is classified as a `Number` primitive or object.
   *
   * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
   * classified as numbers, use the `_.isFinite` method.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a number, else `false`.
   * @example
   *
   * _.isNumber(3);
   * // => true
   *
   * _.isNumber(Number.MIN_VALUE);
   * // => true
   *
   * _.isNumber(Infinity);
   * // => true
   *
   * _.isNumber('3');
   * // => false
   */function Zt(e){return"number"==typeof e||a(e)&&"[object Number]"==n(e)}/**
   * <svg id="shepherdModalOverlayContainer" xmlns="http://www.w3.org/2000/svg">
   */function Qt(){const e=document.createElementNS(Fi,"svg");return e.setAttributeNS(null,"id",Ui.modalOverlay),e}/**
   * <mask id="shepherdModalMask" x="0" y="0" width="100%" height="100%">
   */function eo(){const e=document.createElementNS(Fi,"mask");return mo(e,{height:"100%",id:Ui.modalOverlayMask,width:"100%",x:"0",y:"0"}),e}/**
   *  <rect id="modalOverlayMaskRect" x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
   */function to(){const e=document.createElementNS(Fi,"rect");return mo(e,{fill:"#FFFFFF",height:"100%",id:Ui.modalOverlayMaskRect,width:"100%",x:"0",y:"0"}),e}/**
   * <rect id="shepherdModalMaskOpening" fill="#000000"/>
   */function oo(){const e=document.createElementNS(Fi,"rect");return mo(e,{fill:"#000000",id:Ui.modalOverlayMaskOpening}),e}/**
   * <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
   */function ro(){const e=document.createElementNS(Fi,"rect");return mo(e,{height:"100%",width:"100%",x:"0",y:"0"}),e.setAttribute("mask",`url(#${Ui.modalOverlayMask})`),e}/**
   * Generates an SVG with the following structure:
   * ```html
   *  <svg id="shepherdModalOverlayContainer" xmlns="http://www.w3.org/2000/svg">
   <defs>
   <mask id="shepherdModalMask" x="0" y="0" width="100%" height="100%" >
   <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
   <!-- This element will "punch a hole" through the mask by preventing it from rendering within the perimeter -->
   <rect id="shepherdModalMaskOpening"/>
   </mask>
   </defs>
   <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
   </svg>
   * ```
   */function io(){const e=Qt(),t=document.createElementNS(Fi,"defs"),o=eo(),r=to(),i=oo(),n=ro();return o.appendChild(r),o.appendChild(i),t.appendChild(o),e.appendChild(t),e.appendChild(n),e}/**
   * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
   * @param {HTMLElement} targetElement The element the opening will expose
   * @param {SVGElement} openingElement The svg mask for the opening
   */function no(e,t){if(e.getBoundingClientRect&&t instanceof SVGElement){const o=e.getBoundingClientRect(),r=o.x,i=o.y,n=o.width,a=o.height,p=o.left,s=o.top;// getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
mo(t,{x:r||p,y:i||s,width:n,height:a})}}function ao(e){e&&e instanceof SVGElement&&mo(e,{height:"0",x:"0",y:"0",width:"0"})}function po(e){return e.querySelector(`#${Ui.modalOverlayMaskOpening}`)}function so(e){e.preventDefault()}function lo(e){e.stopPropagation()}/**
   * Remove any leftover modal target classes and add the modal target class to the currentElement
   * @param {HTMLElement} currentElement The element for the current step
   */function co(e){const t=document.querySelector(`${zi.modalTarget}`);t&&t.classList.remove(zi.modalTarget),e.classList.add(zi.modalTarget)}/**
   * Set multiple attributes on an element, via a hash
   * @param {HTMLElement|SVGElement} el The element to set the attributes on
   * @param {Object} attrs A hash of key value pairs for attributes to set
   * @private
   */function mo(e,t){Object.keys(t).forEach(o=>{e.setAttribute(o,t[o])})}/**
   * Get the element from an option object
   *
   * @method getElementFromObject
   * @param Object attachTo
   * @returns {Element}
   * @private
   */function fo(e){const t=e.element;return t instanceof HTMLElement?t:document.querySelector(t)}/**
   * Return the element for a step
   *
   * @method getElementForStep
   * @param step step the step to get an element for
   * @returns {Element} the element for this step
   * @private
   */function ho(e){const t=e.options.attachTo;if(!t)return null;const o=typeof t;let r;return r="string"==o?bo(t):"object"==o?fo(t):null,r}/**
   * Get the element from an option string
   *
   * @method getElementFromString
   * @param element the string in the step configuration
   * @returns {Element} the element from the string
   * @private
   */function bo(e){const t=e.split(" "),o=X(t,1),r=o[0];return document.querySelector(r)}function uo(){"function"==typeof this._onScreenChange&&(window.removeEventListener("resize",this._onScreenChange,!1),window.removeEventListener("scroll",this._onScreenChange,!0)),window.addEventListener("resize",this._onScreenChange,!1),window.addEventListener("scroll",this._onScreenChange,!0);const e=document.querySelector(`#${Ui.modalOverlay}`);// Prevents window from moving on touch.
window.addEventListener("touchmove",so,{passive:!1}),e&&e.addEventListener("touchmove",lo,!1)}/**
   * Gets the timestamp of the number of milliseconds that have elapsed since
   * the Unix epoch (1 January 1970 00:00:00 UTC).
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Date
   * @returns {number} Returns the timestamp.
   * @example
   *
   * _.defer(function(stamp) {
   *   console.log(_.now() - stamp);
   * }, _.now());
   * // => Logs the number of milliseconds it took for the deferred invocation.
   */ /**
   * Creates a debounced function that delays invoking `func` until after `wait`
   * milliseconds have elapsed since the last time the debounced function was
   * invoked. The debounced function comes with a `cancel` method to cancel
   * delayed `func` invocations and a `flush` method to immediately invoke them.
   * Provide `options` to indicate whether `func` should be invoked on the
   * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
   * with the last arguments provided to the debounced function. Subsequent
   * calls to the debounced function return the result of the last `func`
   * invocation.
   *
   * **Note:** If `leading` and `trailing` options are `true`, `func` is
   * invoked on the trailing edge of the timeout only if the debounced function
   * is invoked more than once during the `wait` timeout.
   *
   * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
   * until to the next tick, similar to `setTimeout` with a timeout of `0`.
   *
   * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
   * for details over the differences between `_.debounce` and `_.throttle`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to debounce.
   * @param {number} [wait=0] The number of milliseconds to delay.
   * @param {Object} [options={}] The options object.
   * @param {boolean} [options.leading=false]
   *  Specify invoking on the leading edge of the timeout.
   * @param {number} [options.maxWait]
   *  The maximum time `func` is allowed to be delayed before it's invoked.
   * @param {boolean} [options.trailing=true]
   *  Specify invoking on the trailing edge of the timeout.
   * @returns {Function} Returns the new debounced function.
   * @example
   *
   * // Avoid costly calculations while the window size is in flux.
   * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
   *
   * // Invoke `sendMail` when clicked, debouncing subsequent calls.
   * jQuery(element).on('click', _.debounce(sendMail, 300, {
   *   'leading': true,
   *   'trailing': false
   * }));
   *
   * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
   * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
   * var source = new EventSource('/stream');
   * jQuery(source).on('message', debounced);
   *
   * // Cancel the trailing debounced invocation.
   * jQuery(window).on('popstate', debounced.cancel);
   */function yo(e,o,r){function i(t){var o=h,r=b;return h=b=void 0,w=t,y=e.apply(r,o),y}function n(e){// Invoke the leading edge.
return w=e,g=setTimeout(l,o),x?i(e):y}function a(e){var t=e-v,r=e-w,i=o-t;return k?Ki(i,u-r):i}function p(e){var t=e-v,r=e-w;// Either this is the first call, activity has stopped and we're at the
// trailing edge, the system time has gone backwards and we're treating
// it as the trailing edge, or we've hit the `maxWait` limit.
return void 0===v||t>=o||0>t||k&&r>=u}function l(){var e=Vi();return p(e)?d(e):void(// Restart the timer.
g=setTimeout(l,a(e)))}function d(e){// Only invoke if we have `lastArgs` which means `func` has been
// debounced at least once.
return(g=void 0,E&&h)?i(e):(h=b=void 0,y)}function c(){void 0!==g&&clearTimeout(g),w=0,h=v=b=g=void 0}function m(){return void 0===g?y:d(Vi())}function f(){var e=Vi(),t=p(e);if(h=arguments,b=this,v=e,t){if(void 0===g)return n(v);if(k)return g=setTimeout(l,o),i(v)}return void 0===g&&(g=setTimeout(l,o)),y}var h,b,u,y,g,v,w=0,x=!1,k=!1,E=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return o=s(o)||0,t(r)&&(x=!!r.leading,k="maxWait"in r,u=k?qi(s(r.maxWait)||0,o):u,E="trailing"in r?!!r.trailing:E),f.cancel=c,f.flush=m,f}/** Error message constants. */ /**
   * The base implementation of `_.delay` and `_.defer` which accepts `args`
   * to provide to `func`.
   *
   * @private
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {Array} args The arguments to provide to `func`.
   * @returns {number|Object} Returns the timer id or timeout object.
   */function go(e,t,o){if("function"!=typeof e)throw new TypeError("Expected a function");return setTimeout(function(){e.apply(void 0,o)},t)}/**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */function vo(e,t,o){switch(o.length){case 0:return e.call(t);case 1:return e.call(t,o[0]);case 2:return e.call(t,o[0],o[1]);case 3:return e.call(t,o[0],o[1],o[2]);}return e.apply(t,o)}/* Built-in method references for those with the same name as other `lodash` methods. */ /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */function wo(e,t,o){return t=Gi(void 0===t?e.length-1:t,0),function(){for(var r=arguments,i=-1,n=Gi(r.length-t,0),a=Array(n);++i<n;)a[i]=r[t+i];i=-1;for(var p=Array(t+1);++i<t;)p[i]=r[i];return p[t]=o(a),vo(e,this,p)}}/**
   * Creates a function that returns `value`.
   *
   * @static
   * @memberOf _
   * @since 2.4.0
   * @category Util
   * @param {*} value The value to return from the new function.
   * @returns {Function} Returns the new constant function.
   * @example
   *
   * var objects = _.times(2, _.constant({ 'a': 1 }));
   *
   * console.log(objects);
   * // => [{ 'a': 1 }, { 'a': 1 }]
   *
   * console.log(objects[0] === objects[1]);
   * // => true
   */function xo(e){return function(){return e}}/**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */ /**
   * Cleanup the steps and set pointerEvents back to 'auto'
   * @param tour The tour object
   */function ko(e){if(e){const t=e.steps;t.forEach(e=>{if(e.options&&!1===e.options.canClickTarget&&e.options.attachTo){const t=ho(e);t instanceof HTMLElement&&(t.style.pointerEvents="auto")}})}}/**
   * Remove resize and scroll event listeners
   */function Eo(){"function"==typeof this._onScreenChange&&(window.removeEventListener("resize",this._onScreenChange,!1),window.removeEventListener("scroll",this._onScreenChange,!1),this._onScreenChange=null),window.removeEventListener("touchmove",so,{passive:!1})}/**
   * Creates incremented ID for each newly created tour
   *
   * @private
   * @return {Number} The unique id for the tour
   */var To="object"==typeof global&&global&&global.Object===Object&&global,Ao="object"==typeof self&&self&&self.Object===Object&&self,_o=To||Ao||Function("return this")(),Po=_o.Symbol,jo=Object.prototype,Do=jo.hasOwnProperty,Mo=jo.toString,Io=Po?Po.toStringTag:void 0,No=Object.prototype,Yo=No.toString,Ho=Po?Po.toStringTag:void 0,Xo=0/0,Bo=/^\s+|\s+$/g,Wo=/^[-+]0x[0-9a-f]+$/i,Ro=/^0b[01]+$/i,Fo=/^0o[0-7]+$/i,Uo=parseInt,zo=1/0;/** Detect free variable `self`. */class Vo{on(e,t,o){const r=!(3>=arguments.length||void 0===arguments[3])&&arguments[3];m(this.bindings)&&(this.bindings={}),m(this.bindings[e])&&(this.bindings[e]=[]),this.bindings[e].push({handler:t,ctx:o,once:r})}once(e,t,o){this.on(e,t,o,!0)}off(e,t){return!(m(this.bindings)||m(this.bindings[e]))&&void(m(t)?delete this.bindings[e]:this.bindings[e].forEach((o,r)=>{o.handler===t&&this.bindings[e].splice(r,1)}))}trigger(e){if(!m(this.bindings)&&this.bindings[e]){const t=c(arguments);this.bindings[e].forEach((o,r)=>{const i=o.ctx,n=o.handler,a=o.once,p=i||this;n.apply(p,t),a&&this.bindings[e].splice(r,1)})}}}/**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */ /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */var qo=function(e){return function(t,o,r){for(var i,n=-1,a=Object(t),p=r(t),s=p.length;s--&&(i=p[e?s:++n],!1!==o(a[i],i,a)););return t}}(),Ko=Object.prototype,Go=Ko.hasOwnProperty,$o=Ko.propertyIsEnumerable,Jo=h(function(){return arguments}())?h:function(e){return a(e)&&Go.call(e,"callee")&&!$o.call(e,"callee")},Zo=Array.isArray,Qo="object"==typeof exports&&exports&&!exports.nodeType&&exports,er=Qo&&"object"==typeof module&&module&&!module.nodeType&&module,tr=er&&er.exports===Qo,or=tr?_o.Buffer:void 0,rr=or?or.isBuffer:void 0,ir=rr||/**
   * This method returns `false`.
   *
   * @static
   * @memberOf _
   * @since 4.13.0
   * @category Util
   * @returns {boolean} Returns `false`.
   * @example
   *
   * _.times(2, _.stubFalse);
   * // => [false, false]
   */function(){return!1}/** Detect free variable `exports`. */,nr=/^(?:0|[1-9]\d*)$/,ar={};ar["[object Float32Array]"]=ar["[object Float64Array]"]=ar["[object Int8Array]"]=ar["[object Int16Array]"]=ar["[object Int32Array]"]=ar["[object Uint8Array]"]=ar["[object Uint8ClampedArray]"]=ar["[object Uint16Array]"]=ar["[object Uint32Array]"]=!0,ar["[object Arguments]"]=ar["[object Array]"]=ar["[object ArrayBuffer]"]=ar["[object Boolean]"]=ar["[object DataView]"]=ar["[object Date]"]=ar["[object Error]"]=ar["[object Function]"]=ar["[object Map]"]=ar["[object Number]"]=ar["[object Object]"]=ar["[object RegExp]"]=ar["[object Set]"]=ar["[object String]"]=ar["[object WeakMap]"]=!1;/** Detect free variable `exports`. */var pr="object"==typeof exports&&exports&&!exports.nodeType&&exports,sr=pr&&"object"==typeof module&&module&&!module.nodeType&&module,lr=sr&&sr.exports===pr,dr=lr&&To.process,cr=function(){try{// Use `util.types` for Node.js 10+.
var e=sr&&sr.require&&sr.require("util").types;return e?e:dr&&dr.binding&&dr.binding("util");// Legacy `process.binding('util')` for Node.js < 10.
}catch(t){}}(),mr=cr&&cr.isTypedArray,fr=mr?/**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */function(e){return function(t){return e(t)}}(mr):/**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */function(e){return a(e)&&u(e.length)&&!!ar[n(e)]},hr=Object.prototype,br=hr.hasOwnProperty,ur=Object.prototype,yr=v(Object.keys,Object),gr=Object.prototype,vr=gr.hasOwnProperty,wr=v(Object.getPrototypeOf,Object),xr=Function.prototype,kr=Object.prototype,Er=xr.toString,Or=kr.hasOwnProperty,Sr=Er.call(Object),Cr=_o["__core-js_shared__"],Lr=function(){var e=/[^.]+$/.exec(Cr&&Cr.keys&&Cr.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),Tr=Function.prototype,Ar=Tr.toString,_r=/[\\^$.*+?()[\]{}|]/g,Pr=/^\[object .+?Constructor\]$/,jr=Function.prototype,Dr=Object.prototype,Mr=jr.toString,Ir=Dr.hasOwnProperty,Nr=RegExp("^"+Mr.call(Ir).replace(_r,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),Yr=M(_o,"DataView"),Hr=M(_o,"Map"),Xr=M(_o,"Promise"),Br=M(_o,"Set"),Wr=M(_o,"WeakMap"),Rr="[object Map]",Fr="[object Promise]",Ur="[object Set]",zr="[object WeakMap]",Vr="[object DataView]",qr=P(Yr),Kr=P(Hr),Gr=P(Xr),$r=P(Br),Jr=P(Wr),Zr=n;/** Detect free variable `module`. */(Yr&&Zr(new Yr(new ArrayBuffer(1)))!=Vr||Hr&&Zr(new Hr)!=Rr||Xr&&Zr(Xr.resolve())!=Fr||Br&&Zr(new Br)!=Ur||Wr&&Zr(new Wr)!=zr)&&(Zr=function(e){var t=n(e),o=t=="[object Object]"?e.constructor:void 0,r=o?P(o):"";if(r)switch(r){case qr:return Vr;case Kr:return Rr;case Gr:return Fr;case $r:return Ur;case Jr:return zr;}return t});var Qr=Zr,ei=Object.prototype,ti=ei.hasOwnProperty;/** `Object#toString` result references. */Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);for(var oi=function(){try{var e=M(Object,"defineProperty");return e({},"",{}),e}catch(t){}}(),ri=Object.prototype,ii=ri.hasOwnProperty,ni="undefined"!=typeof window&&"undefined"!=typeof document,ai=["Edge","Trident","Firefox"],pi=0,si=0;si<ai.length;si+=1)if(ni&&0<=navigator.userAgent.indexOf(ai[si])){pi=1;break}var li=ni&&window.Promise,di=li?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},pi))}},ci=ni&&!!(window.MSInputMethodContext&&document.documentMode),mi=ni&&/MSIE 10/.test(navigator.userAgent),fi=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},hi=function(){function e(e,t){for(var o,r=0;r<t.length;r++)o=t[r],o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,r){return o&&e(t.prototype,o),r&&e(t,r),t}}(),bi=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},ui=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var r in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},yi=ni&&/Firefox/i.test(navigator.userAgent),gi=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],vi=gi.slice(3),wi={FLIP:"flip",CLOCKWISE:"clockwise",COUNTERCLOCKWISE:"counterclockwise"},xi=function(){/**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */function e(t,o){var r=this,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};fi(this,e),this.scheduleUpdate=function(){return requestAnimationFrame(r.update)},this.update=di(this.update.bind(this)),this.options=ui({},e.Defaults,i),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=t&&t.jquery?t[0]:t,this.popper=o&&o.jquery?o[0]:o,this.options.modifiers={},Object.keys(ui({},e.Defaults.modifiers,i.modifiers)).forEach(function(t){r.options.modifiers[t]=ui({},e.Defaults.modifiers[t]||{},i.modifiers?i.modifiers[t]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return ui({name:e},r.options.modifiers[e])})// sort the modifiers by order
.sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(e){e.enabled&&K(e.onLoad)&&e.onLoad(r.reference,r.popper,r.options,e,r.state)}),this.update();var n=this.options.eventsEnabled;n&&this.enableEventListeners(),this.state.eventsEnabled=n}// We can't use class properties because they don't get listed in the
// class prototype and break stuff like Sinon stubs
return hi(e,[{key:"update",value:function(){return Oe.call(this)}},{key:"destroy",value:function(){return Le.call(this)}},{key:"enableEventListeners",value:function(){return Pe.call(this)}},{key:"disableEventListeners",value:function(){return De.call(this)}/**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */ /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */}]),e}();/**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */xi.Utils=("undefined"==typeof window?global:window).PopperUtils,xi.placements=gi,xi.Defaults={/**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */placement:"bottom",/**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */positionFixed:!1,/**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */eventsEnabled:!0,/**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */removeOnDestroy:!1,/**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */onCreate:function(){},/**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */onUpdate:function(){},/**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */modifiers:{/**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */shift:{/** @prop {number} order=100 - Index used to define the order of execution */order:100,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function(e){var t=e.placement,o=t.split("-")[0],r=t.split("-")[1];// if shift shiftvariation is specified, run the modifier
if(r){var i=e.offsets,n=i.reference,a=i.popper,p=-1!==["bottom","top"].indexOf(o),s=p?"left":"top",l=p?"width":"height",d={start:bi({},s,n[s]),end:bi({},s,n[s]+n[l]-a[l])};e.offsets.popper=ui({},a,d[r])}return e}/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */},/**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */offset:{/** @prop {number} order=200 - Index used to define the order of execution */order:200,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:Fe,/** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */offset:0},/**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */preventOverflow:{/** @prop {number} order=300 - Index used to define the order of execution */order:300,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:function(e,t){var o=t.boundariesElement||Q(e.instance.popper);// If offsetParent is the reference element, we really want to
// go one step up and use the next offsetParent as reference to
// avoid to make this modifier completely useless and look like broken
e.instance.reference===o&&(o=Q(o));// NOTE: DOM access here
// resets the popper's position so that the document size can be calculated excluding
// the size of the popper element itself
var r=Ce("transform"),i=e.instance.popper.style,n=i.top,a=i.left,p=i[r];i.top="",i.left="",i[r]="";var s=he(e.instance.popper,e.instance.reference,t.padding,o,e.positionFixed);// NOTE: DOM access here
// restores the original style properties after the offsets have been computed
i.top=n,i.left=a,i[r]=p,t.boundaries=s;var l=t.priority,d=e.offsets.popper,c={primary:function(e){var o=d[e];return d[e]<s[e]&&!t.escapeWithReference&&(o=Lo(d[e],s[e])),bi({},e,o)},secondary:function(e){var o="right"===e?"left":"top",r=d[o];return d[e]>s[e]&&!t.escapeWithReference&&(r=Oo(d[o],s[e]-("right"===e?d.width:d.height))),bi({},o,r)}};return l.forEach(function(e){var t=-1===["left","top"].indexOf(e)?"secondary":"primary";d=ui({},d,c[t](e))}),e.offsets.popper=d,e},/**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */priority:["left","right","top","bottom"],/**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */padding:5,/**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */boundariesElement:"scrollParent"},/**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */keepTogether:{/** @prop {number} order=400 - Index used to define the order of execution */order:400,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function(e){var t=e.offsets,o=t.popper,r=t.reference,i=e.placement.split("-")[0],n=So,a=-1!==["top","bottom"].indexOf(i),p=a?"right":"bottom",s=a?"left":"top",l=a?"width":"height";return o[p]<n(r[s])&&(e.offsets.popper[s]=n(r[s])-o[l]),o[s]>n(r[p])&&(e.offsets.popper[s]=n(r[p])),e}},/**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */arrow:{/** @prop {number} order=500 - Index used to define the order of execution */order:500,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:function(e,t){var o;// arrow depends on keepTogether in order to work
if(!He(e.instance.modifiers,"arrow","keepTogether"))return e;var r=t.element;// if arrowElement is a string, suppose it's a CSS selector
if("string"==typeof r){// if arrowElement is not found, don't run the modifier
if(r=e.instance.popper.querySelector(r),!r)return e;}else// if the arrowElement isn't a query selector we must check that the
// provided DOM node is child of its popper node
if(!e.instance.popper.contains(r))return console.warn("WARNING: `arrow.element` must be child of its popper element!"),e;var i=e.placement.split("-")[0],n=e.offsets,a=n.popper,p=n.reference,s=-1!==["left","right"].indexOf(i),l=s?"height":"width",d=s?"Top":"Left",c=d.toLowerCase(),m=s?"left":"top",f=s?"bottom":"right",h=ge(r)[l];p[f]-h<a[c]&&(e.offsets.popper[c]-=a[c]-(p[f]-h)),p[c]+h>a[f]&&(e.offsets.popper[c]+=p[c]+h-a[f]),e.offsets.popper=se(e.offsets.popper);// compute center of the popper
var b=p[c]+p[l]/2-h/2,u=G(e.instance.popper),y=parseFloat(u["margin"+d],10),g=parseFloat(u["border"+d+"Width"],10),v=b-e.offsets.popper[c]-y-g;// Compute the sideValue using the updated popper offsets
// take popper margin in account because we don't have this info available
return v=Lo(Oo(a[l]-h,v),0),e.arrowElement=r,e.offsets.arrow=(o={},bi(o,c,Co(v)),bi(o,m,""),o),e},/** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */element:"[x-arrow]"},/**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */flip:{/** @prop {number} order=600 - Index used to define the order of execution */order:600,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function(e,t){// if `inner` modifier is enabled, we can't use the `flip` modifier
if(Se(e.instance.modifiers,"inner"))return e;if(e.flipped&&e.placement===e.originalPlacement)// seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
return e;var o=he(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),r=e.placement.split("-")[0],i=ve(r),n=e.placement.split("-")[1]||"",a=[];switch(t.behavior){case wi.FLIP:a=[r,i];break;case wi.CLOCKWISE:a=Be(r);break;case wi.COUNTERCLOCKWISE:a=Be(r,!0);break;default:a=t.behavior;}return a.forEach(function(p,s){if(r!==p||a.length===s+1)return e;r=e.placement.split("-")[0],i=ve(r);var l=e.offsets.popper,d=e.offsets.reference,c=So,m="left"===r&&c(l.right)>c(d.left)||"right"===r&&c(l.left)<c(d.right)||"top"===r&&c(l.bottom)>c(d.top)||"bottom"===r&&c(l.top)<c(d.bottom),f=c(l.left)<c(o.left),h=c(l.right)>c(o.right),b=c(l.top)<c(o.top),u=c(l.bottom)>c(o.bottom),y="left"===r&&f||"right"===r&&h||"top"===r&&b||"bottom"===r&&u,g=-1!==["top","bottom"].indexOf(r),v=!!t.flipVariations&&(g&&"start"===n&&f||g&&"end"===n&&h||!g&&"start"===n&&b||!g&&"end"===n&&u);(m||y||v)&&(e.flipped=!0,(m||y)&&(r=a[s+1]),v&&(n=Xe(n)),e.placement=r+(n?"-"+n:""),e.offsets.popper=ui({},e.offsets.popper,we(e.instance.popper,e.offsets.reference,e.placement)),e=Ee(e.instance.modifiers,e,"flip"))}),e},/**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */behavior:"flip",/**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */padding:5,/**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */boundariesElement:"viewport"},/**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */inner:{/** @prop {number} order=700 - Index used to define the order of execution */order:700,/** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */enabled:!1,/** @prop {ModifierFn} */fn:/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function(e){var t=e.placement,o=t.split("-")[0],r=e.offsets,i=r.popper,n=r.reference,a=-1!==["left","right"].indexOf(o),p=-1===["top","left"].indexOf(o);return i[a?"left":"top"]=n[o]-(p?i[a?"width":"height"]:0),e.placement=ve(t),e.offsets.popper=se(i),e}/**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */ /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */},/**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */hide:{/** @prop {number} order=800 - Index used to define the order of execution */order:800,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:function(e){if(!He(e.instance.modifiers,"hide","preventOverflow"))return e;var t=e.offsets.reference,o=xe(e.instance.modifiers,function(e){return"preventOverflow"===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){// Avoid unnecessary DOM access if visibility hasn't changed
if(!0===e.hide)return e;e.hide=!0,e.attributes["x-out-of-boundaries"]=""}else{// Avoid unnecessary DOM access if visibility hasn't changed
if(!1===e.hide)return e;e.hide=!1,e.attributes["x-out-of-boundaries"]=!1}return e}},/**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */computeStyle:{/** @prop {number} order=850 - Index used to define the order of execution */order:850,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:/**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */function(e,t){var o=t.x,r=t.y,i=e.offsets.popper,n=xe(e.instance.modifiers,function(e){return"applyStyle"===e.name}).gpuAcceleration;void 0!==n&&console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");var a=void 0===n?t.gpuAcceleration:n,p=Q(e.instance.popper),s=le(p),l={position:i.position},d=Ye(e,2>window.devicePixelRatio||!yi),c="bottom"===o?"top":"bottom",m="right"===r?"left":"right",f=Ce("transform"),h=void 0,b=void 0;if(b="bottom"===c?"HTML"===p.nodeName?-p.clientHeight+d.bottom:-s.height+d.bottom:d.top,h="right"===m?"HTML"===p.nodeName?-p.clientWidth+d.right:-s.width+d.right:d.left,a&&f)l[f]="translate3d("+h+"px, "+b+"px, 0)",l[c]=0,l[m]=0,l.willChange="transform";else{// othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
var u="bottom"===c?-1:1,y="right"===m?-1:1;l[c]=b*u,l[m]=h*y,l.willChange=c+", "+m}// Attributes
var g={"x-placement":e.placement};// Update `data` attributes, styles and arrowStyles
return e.attributes=ui({},g,e.attributes),e.styles=ui({},l,e.styles),e.arrowStyles=ui({},e.offsets.arrow,e.arrowStyles),e},/**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */gpuAcceleration:!0,/**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */x:"bottom",/**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */y:"right"},/**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */applyStyle:{/** @prop {number} order=900 - Index used to define the order of execution */order:900,/** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */enabled:!0,/** @prop {ModifierFn} */fn:function(e){return Ie(e.instance.popper,e.styles),Ne(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&Ie(e.arrowElement,e.arrowStyles),e}/**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */,/** @prop {Function} */onLoad:function(e,t,o,r,i){// compute reference element offsets
var n=ye(i,t,e,o.positionFixed),a=ue(o.placement,n,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);// compute auto placement, store placement inside the data object,
// modifiers will be able to edit `placement` if needed
// and refer to originalPlacement to know the original value
return t.setAttribute("x-placement",a),Ie(t,{position:o.positionFixed?"fixed":"absolute"}),o},/**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */gpuAcceleration:void 0}}};/**!
  * tippy.js v4.2.0
  * (c) 2017-2019 atomiks
  * MIT License
  */var ki="undefined"!=typeof window&&"undefined"!=typeof document,Ei=ki?navigator.userAgent:"",Oi=/MSIE |Trident\//.test(Ei),Si=/UCBrowser\//.test(Ei),Ci=ki&&/iPhone|iPad|iPod/.test(navigator.platform)&&!window.MSStream,Li={a11y:!0,allowHTML:!0,animateFill:!0,animation:"shift-away",appendTo:function(){return document.body},aria:"describedby",arrow:!1,arrowType:"sharp",boundary:"scrollParent",content:"",delay:0,distance:10,duration:[325,275],flip:!0,flipBehavior:"flip",flipOnUpdate:!1,followCursor:!1,hideOnClick:!0,ignoreAttributes:!1,inertia:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,lazy:!0,maxWidth:350,multiple:!1,offset:0,onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},placement:"top",popperOptions:{},role:"tooltip",showOnInit:!1,size:"regular",sticky:!1,target:"",theme:"dark",touch:!0,touchHold:!1,trigger:"mouseenter focus",updateDuration:0,wait:null,zIndex:9999/**
     * If the set() method encounters one of these, the popperInstance must be
     * recreated
     */},Ti=["arrow","arrowType","boundary","distance","flip","flipBehavior","flipOnUpdate","offset","placement","popperOptions"],Ai={POPPER:".tippy-popper",TOOLTIP:".tippy-tooltip",CONTENT:".tippy-content",BACKDROP:".tippy-backdrop",ARROW:".tippy-arrow",ROUND_ARROW:".tippy-roundarrow"},_i=ki?Element.prototype:{},Pi=_i.matches||_i.matchesSelector||_i.webkitMatchesSelector||_i.mozMatchesSelector||_i.msMatchesSelector,ji={passive:!0},Di=Object.keys(Li),Mi=!1,Ii=0,Ni=1,Yi=!1;Ht.version="4.2.0",Ht.defaults=Li,Ht.setDefaults=function(e){Object.keys(e).forEach(function(t){Li[t]=e[t]})},Ht.hideAll=At,Ht.group=function(e){function t(e){c=e,n()}function o(o){o._originalProps.onShow(o),e.forEach(function(e){e.set({duration:d}),e.hide()}),t(!0)}function r(e){e._originalProps.onHide(e),t(!1)}function i(e){e._originalProps.onShown(e),e.set({duration:e._originalProps.duration})}function n(){e.forEach(function(e){e.set({onShow:o,onShown:i,onHide:r,delay:c?[0,Array.isArray(s)?s[1]:s]:s,duration:c?d:e._originalProps.duration})})}var a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},p=a.delay,s=void 0===p?e[0].props.delay:p,l=a.duration,d=void 0===l?0:l;// Already grouped. Cannot group instances more than once (yet) or stale lifecycle
// closures will be invoked, causing a stack overflow
if(!e.some(function(e){return Je(e,"_originalProps")})){var c=!1;e.forEach(function(e){e._originalProps=Ue({},e.props)}),n()}},ki&&setTimeout(/**
   * Auto-init tooltips for elements with a `data-tippy="..."` attribute
   */function(){ze(document.querySelectorAll("[data-tippy]")).forEach(function(e){var t=e.getAttribute("data-tippy");t&&Ht(e,{content:t})})}),/**
   * Injects a string of CSS styles to a style node in <head>
   */function(e){if(ki){var t=document.createElement("style");t.type="text/css",t.textContent=e;var o=document.head,r=o.firstChild;r?o.insertBefore(t,r):o.appendChild(t)}}(".tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none}.tippy-popper{transition-timing-function:cubic-bezier(.165,.84,.44,1);max-width:calc(100% - 8px);pointer-events:none;outline:0}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-7px;bottom:-6.5px;-webkit-transform-origin:50% 0;transform-origin:50% 0;margin:0 3px}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 3px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(-10px) rotateX(0);transform:perspective(700px) translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateY(0) rotateX(60deg);transform:perspective(700px) translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px) scale(.5);transform:translateY(-10px) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-7px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;margin:0 3px}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 3px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(10px) rotateX(0);transform:perspective(700px) translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateY(0) rotateX(-60deg);transform:perspective(700px) translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px) scale(.5);transform:translateY(10px) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-12px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%;margin:3px 0}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(-10px) rotateY(0);transform:perspective(700px) translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateX(0) rotateY(-60deg);transform:perspective(700px) translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px) scale(.5);transform:translateX(-10px) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-12px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%;margin:3px 0}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(10px) rotateY(0);transform:perspective(700px) translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateX(0) rotateY(60deg);transform:perspective(700px) translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px) scale(.5);transform:translateX(10px) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;padding:.3125rem .5625rem;line-height:1.4;text-align:center;background-color:#333}.tippy-tooltip[data-size=small]{padding:.1875rem .375rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.375rem .75rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:18px;height:7px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:\"\";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}");const Hi="Using the attachment feature of Shepherd requires the Tippy.js library",Xi={computeStyle:{enabled:!0,fn(e){return e.styles=Object.assign({},e.styles,{left:"50%",top:"50%",transform:"translate(-50%, -50%)"}),e}}},Bi={positionFixed:!0},Wi=function(){let e=0;return function(){return++e}}();/**
   * Class representing steps to be added to a tour
   * @extends {Evented}
   */class Ri extends Vo{/**
     * Create a step
     * @param {Tour} tour The tour for the step
     * @param {Object} options The options for the step
     * @param {Object|string} options.attachTo What element the step should be attached to on the page.
     * It can either be a string of the form "element on", or an object with those properties.
     * For example: ".some #element left", or {element: '.some #element', on: 'left'}.
     * If you use the object syntax, element can also be a DOM element. If you don’t specify an attachTo the
     * element will appear in the middle of the screen.
     * @param {HTMLElement|string} options.attachTo.element
     * @param {string} options.attachTo.on
     * @param {Object|string} options.advanceOn An action on the page which should advance shepherd to the next step.
     * It can be of the form `"selector event"`, or an object with those properties.
     * For example: `".some-element click"`, or `{selector: '.some-element', event: 'click'}`.
     * It doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
     * You can also always manually advance the Tour by calling `myTour.next()`.
     * @param {function} options.beforeShowPromise A function that returns a promise.
     * When the promise resolves, the rest of the `show` code for the step will execute.
     * @param {Object[]} options.buttons An array of buttons to add to the step. These will be rendered in a
     * footer below the main body text.
     * @param {function} options.buttons.button.action A function executed when the button is clicked on
     * @param {string} options.buttons.button.classes Extra classes to apply to the `<a>`
     * @param {Object} options.buttons.button.events A hash of events to bind onto the button, for example
     * `{'mouseover': function(){}}`. Adding a `click` event to events when you already have an `action` specified is not supported.
     * You can use events to skip steps or navigate to specific steps, with something like:
     * ```js
     * events: {
     *   click: function() {
     *     return Shepherd.activeTour.show('some_step_name');
     *   }
     * }
     * ```
     * @param {string} options.buttons.button.text The HTML text of the button
     * @param {string} options.classes A string of extra classes to add to the step's content element.
     * @param {string} options.highlightClass An extra class to apply to the `attachTo` element when it is
     * highlighted (that is, when its step is active). You can then target that selector in your CSS.
     * @param {Object} options.tippyOptions Extra [options to pass to tippy.js]{@link https://atomiks.github.io/tippyjs/#all-options}
     * @param {boolean} options.scrollTo Should the element be scrolled to when this step is shown?
     * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
     * define a custom action to do the scrolling, and possibly other logic.
     * @param {boolean} options.showCancelLink Should a cancel “✕” be shown in the header of the step?
     * @param {function} options.showOn A function that, when it returns `true`, will show the step.
     * If it returns false, the step will be skipped.
     * @param {string} options.text The text in the body of the step. It can be one of four types:
     * ```
     * - HTML string
     * - Array of HTML strings
     * - `HTMLElement` object
     * - `Function` to be executed when the step is built. It must return one of the three options above.
     * ```
     * @param {string} options.title The step's title. It becomes an `h3` at the top of the step.
     * @param {Object} options.when You can define `show`, `hide`, etc events inside `when`. For example:
     * ```js
     * when: {
     *   show: function() {
     *     window.scrollTo(0, 0);
     *   }
     * }
     * ```
     * @return {Step} The newly created Step instance
     */constructor(e,t){return super(e,t),this.tour=e,Jt.call(this,["_show","cancel","complete","destroy","hide","isOpen","scrollTo","setupElements","show"]),this.setOptions(t),this.bindAdvance=Kt.bind(this),this.bindButtonEvents=Gt.bind(this),this.bindCancelLink=$t.bind(this),this.setupTooltip=Rt.bind(this),this.parseAttachTo=Ft.bind(this),this}/**
     * Adds buttons to the step as passed into options
     *
     * @private
     * @param {HTMLElement} content The element for the step, to append the footer with buttons to
     */_addButtons(e){if(!I(this.options.buttons)){const t=document.createElement("footer"),o=Xt("<ul class=\"shepherd-buttons\"></ul>");t.classList.add("shepherd-footer"),this.options.buttons.map(e=>{const t=Xt(`<li><a class="shepherd-button ${e.classes||""}" tabindex="0">${e.text}</a>`);o.appendChild(t),this.bindButtonEvents(e,t.querySelector("a"))}),t.appendChild(o),e.appendChild(t)}}/**
     * Adds the "x" button to cancel the tour
     * @param {HTMLElement} element The step element
     * @param {HTMLElement} header The header element for the step
     * @private
     */_addCancelLink(e,t){if(this.options.showCancelLink){const o=Xt("<a href class=\"shepherd-cancel-link\"></a>");t.appendChild(o),e.classList.add("shepherd-has-cancel-link"),this.bindCancelLink(o)}}/**
     * Adds text passed in as options
     *
     * @private
     * @param {HTMLElement} content The content to append the text to
     */_addContent(e){const t=Xt("<div class=\"shepherd-text\"></div>");let o=this.options.text;x(o)&&(o=o.call(this,t)),o instanceof HTMLElement?t.appendChild(o):(N(o)&&(o=[o]),o.map(e=>{t.innerHTML+=`<p>${e}</p>`})),e.appendChild(t)}/**
     * Creates Shepherd element for step based on options
     *
     * @private
     * @return {HTMLElement} The DOM element for the step tooltip
     */_createTooltipContent(){const e=document.createElement("div"),t=this.options.classes||"",o=Xt(`<div class="${t}" data-shepherd-step-id="${this.id}">`),r=document.createElement("header");if(this.options.title){const e=document.createElement("h3");e.classList.add("shepherd-title"),e.innerHTML=`${this.options.title}`,r.appendChild(e),o.classList.add("shepherd-has-title")}return e.classList.add("shepherd-content"),r.classList.add("shepherd-header"),o.appendChild(e),e.appendChild(r),m(this.options.text)||this._addContent(e),this._addButtons(e),this._addCancelLink(o,r),o}/**
     * Returns the tour for the step
     * @return {Tour} The tour instance
     */getTour(){return this.tour}/**
     * Cancel the tour
     * Triggers the `cancel` event
     */cancel(){this.tour.cancel(),this.trigger("cancel")}/**
     * Complete the tour
     * Triggers the `complete` event
     */complete(){this.tour.complete(),this.trigger("complete")}/**
     * Remove the step, delete the step's element, and destroy the tippy instance for the step
     * Triggers `destroy` event
     */destroy(){this.tooltip&&(this.tooltip.destroy(),this.tooltip=null),A(this.el)&&this.el.parentNode&&(this.el.parentNode.removeChild(this.el),this.el=null),this.target&&this._updateStepTargetOnHide(),this.trigger("destroy")}/**
     * Hide the step and destroy the tippy instance
     */hide(){this.tour.modal.hide(),this.trigger("before-hide"),document.body.removeAttribute("data-shepherd-step"),this.target&&this._updateStepTargetOnHide(),this.tooltip&&this.tooltip.hide(),this.trigger("hide")}/**
     * Check if the step is open and visible
     * @return {boolean} True if the step is open and visible
     */isOpen(){return!!(this.tooltip&&this.tooltip.state&&this.tooltip.state.isVisible)}/**
     * Create the element and set up the tippy instance
     */setupElements(){m(this.el)||this.destroy(),this.el=this._createTooltipContent(),this.options.advanceOn&&this.bindAdvance(),this.setupTooltip()}/**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     */scrollTo(){const e=this.parseAttachTo(),t=e.element;x(this.options.scrollToHandler)?this.options.scrollToHandler(t):A(t)&&t.scrollIntoView()}/**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param {Object} options The options for the step
     */setOptions(){let e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.options=e;const t=this.options.when;this.destroy(),this.id=this.options.id||`step-${Wi()}`,L(t,(e,t)=>{this.on(t,e,this)})}/**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     * @return {*|Promise}
     */show(){if(x(this.options.beforeShowPromise)){const e=this.options.beforeShowPromise();if(!m(e))return e.then(()=>this._show())}this._show()}/**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a tippy instance for the tooltip, then triggers `show`.
     * @private
     */_show(){this.tour.beforeShowStep(this),this.trigger("before-show"),this.el||this.setupElements(),this.target.classList.add("shepherd-enabled","shepherd-target"),document.body.setAttribute("data-shepherd-step",this.id),this.options.scrollTo&&setTimeout(()=>{this.scrollTo()}),this.tooltip.show(),this.trigger("show")}_updateStepTargetOnHide(){this.options.highlightClass&&this.target.classList.remove(this.options.highlightClass),this.target.classList.remove("shepherd-enabled","shepherd-target")}}/** `Object#toString` result references. */const Fi="http://www.w3.org/2000/svg",Ui={modalOverlay:"shepherdModalOverlayContainer",modalOverlayMask:"shepherdModalMask",modalOverlayMaskRect:"shepherdModalMaskRect",modalOverlayMaskOpening:"shepherdModalMaskOpening"},zi={isVisible:"shepherd-modal-is-visible",modalTarget:"shepherd-modal-target"};var Vi=function(){return _o.Date.now()},qi=Lo,Ki=Oo,Gi=Lo,$i=oi?function(e,t){return oi(e,"toString",{configurable:!0,enumerable:!1,value:xo(t),writable:!0})}:S,Ji=Date.now,Zi=/**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */function(e){var t=0,o=0;return function(){var r=Ji(),i=16-(r-o);if(o=r,!(0<i))t=0;else if(800<=++t)return arguments[0];return e.apply(void 0,arguments)}}/**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */($i),Qi=/**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */function(e,t){return Zi(wo(e,t,S),e+"")}/**
   * Defers invoking the `func` until the current call stack has cleared. Any
   * additional arguments are provided to `func` when it's invoked.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to defer.
   * @param {...*} [args] The arguments to invoke `func` with.
   * @returns {number} Returns the timer id.
   * @example
   *
   * _.defer(function(text) {
   *   console.log(text);
   * }, 'deferred');
   * // => Logs 'deferred' after one millisecond.
   */(function(e,t){return go(e,1,t)});/** Error message constants. */class en{constructor(e){return this._modalOverlayElem||(this._modalOverlayElem=io(),this._modalOverlayOpening=po(this._modalOverlayElem),this.hide(),document.body.appendChild(this._modalOverlayElem)),this.options=e,this}/**
     * Removes svg mask from modal overlay and removes classes for modal being visible
     */cleanup(){Qi(()=>{const e=this._modalOverlayElem;e&&e instanceof SVGElement&&e.parentNode.removeChild(e),this._modalOverlayElem=null,document.body.classList.remove(zi.isVisible)})}/**
     * Hide the modal overlay
     */hide(){document.body.classList.remove(zi.isVisible),this._modalOverlayElem&&(this._modalOverlayElem.style.display="none")}/**
     * If modal is enabled, setup the svg mask opening and modal overlay for the step
     * @param step
     */setupForStep(e){this.options.useModalOverlay?(this._styleForStep(e),this.show()):this.hide()}/**
     * Show the modal overlay
     */show(){document.body.classList.add(zi.isVisible),this._modalOverlayElem&&(this._modalOverlayElem.style.display="block")}/**
     * Style the modal for the step
     * @param {Step} step The step to style the opening for
     * @private
     */_styleForStep(e){const t=this._modalOverlayOpening,o=ho(e);o?(no(o,t),this._onScreenChange=yo(no.bind(this,o,t),0,{leading:!1,trailing:!0// see https://lodash.com/docs/#debounce
}),uo.call(this)):ao(this._modalOverlayOpening)}}const tn={trigger:"manual",arrow:!0,animation:"fade",duration:420,flip:!0,animateFill:!1,// https://atomiks.github.io/tippyjs/#animate-fill-option
interactive:!0,// https://atomiks.github.io/tippyjs/#interactive-option
hideOnClick:"toggle",// https://atomiks.github.io/tippyjs/#hide-on-click-option
multiple:!0// https://atomiks.github.io/tippyjs/#multiple-option
},on=function(){let e=0;return function(){return++e}}(),rn=new Vo;return Object.assign(rn,{Tour:/**
   * Class representing the site tour
   * @extends {Evented}
   */class extends Vo{/**
     * @param {Object} options The options for the tour
     * @param {Object} options.defaultStepOptions Default options for Steps created through `addStep`
     * @param {Step[]} options.steps An array of Step instances to initialize the tour with
     * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
     * dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute
     * whenever the tour becomes active.
     * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
     * modal overlay. If true, the overlay will create an opening around the target element so that it
     * can remain interactive
     * @returns {Tour}
     */constructor(){let e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};super(e),Jt.call(this,["back","cancel","complete","hide","next"]),this.options=e,this.steps=this.options.steps||[];return["active","cancel","complete","inactive","show","start"].map(e=>{(t=>{this.on(t,e=>{e=e||{},e.tour=this,rn.trigger(t,e)})})(e)}),this.modal=new en(e),this._setTooltipDefaults(),this._setTourID(),this}/**
     * Adds a new step to the tour
     * @param {Object|Number|Step|String} arg1
     * When arg2 is defined, arg1 can either be a string or number, to use for the `id` for the step
     * When arg2 is undefined, arg1 is either an object containing step options or a Step instance
     * @param {Object|Step} arg2 An object containing step options or a Step instance
     * @return {Step} The newly added step
     */addStep(e,t){let o,r;// If we just have one argument, we can assume it is an object of step options, with an id
return m(t)?r=e:(o=e,r=t),r instanceof Ri?r.tour=this:r=this.setupStep(r,o),this.steps.push(r),r}/**
     * Go to the previous step in the tour
     */back(){const e=this.steps.indexOf(this.currentStep);this.show(e-1,!1)}/**
     * Calls done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     */cancel(){if(this.options.confirmCancel){const e=this.options.confirmCancelMessage||"Are you sure you want to stop the tour?",t=window.confirm(e);t&&this.done("cancel")}else this.done("cancel")}/**
     * Calls done() triggering the `complete` event
     */complete(){this.done("complete")}/**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {String} event The event name to trigger
     */done(e){I(this.steps)||this.steps.forEach(e=>e.destroy()),Eo.call(this),ko(this.tourObject),this.modal.cleanup(),this.trigger(e),rn.activeTour=null,this._removeBodyAttrs(),this.trigger("inactive",{tour:this})}/**
     * Gets the step from a given id
     * @param {Number|String} id The id of the step to retrieve
     * @return {Step} The step corresponding to the `id`
     */getById(e){return this.steps.find(t=>t.id===e)}/**
     * Gets the current step
     * @returns {Step|null}
     */getCurrentStep(){return this.currentStep}/**
     * Hide the current step
     */hide(){const e=this.getCurrentStep();if(e)return e.hide()}isActive(){return rn.activeTour===this}/**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */next(){const e=this.steps.indexOf(this.currentStep);e===this.steps.length-1?this.complete():this.show(e+1,!0)}/**
     * Removes the step from the tour
     * @param {String} name The id for the step to remove
     */removeStep(e){const t=this.getCurrentStep();// Find the step, destroy it and remove it from this.steps
this.steps.some((t,o)=>{if(t.id===e)return t.isOpen()&&t.hide(),t.destroy(),this.steps.splice(o,1),!0}),t&&t.id===e&&(this.currentStep=void 0,this.steps.length?this.show(0):this.cancel())}/**
     * Setup a new step object
     * @param {Object} stepOptions The object describing the options for the step
     * @param {String|Number} name The string or number to use as the `id` for the step
     * @return {Step} The step instance
     */setupStep(e,t){return(N(t)||Zt(t))&&(e.id=t.toString()),e=Object.assign({},this.options.defaultStepOptions,e),new Ri(this,e)}beforeShowStep(e){this.modal.setupForStep(e),this._styleTargetElementForStep(e)}/**
     * Show a specific step in the tour
     * @param {Number|String} key The key to look up the step by
     * @param {Boolean} forward True if we are going forward, false if backward
     */show(){let e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];const o=N(e)?this.getById(e):this.steps[e];if(o){this._updateStateBeforeShow();const e=x(o.options.showOn)&&!o.options.showOn();// If `showOn` returns false, we want to skip the step, otherwise, show the step like normal
e?this._skipStep(o,t):(this.trigger("show",{step:o,previous:this.currentStep}),this.currentStep=o,o.show())}}/**
     * Start the tour
     */start(){this.trigger("start"),this.currentStep=null,this._setupActiveTour(),uo.call(this),this.next()}/**
     * Make this tour "active"
     * @private
     */_setupActiveTour(){this._addBodyAttrs(),this.trigger("active",{tour:this}),rn.activeTour=this}/**
     * Modulates the styles of the passed step's target element, based on the step's options and
     * the tour's `modal` option, to visually emphasize the element
     *
     * @param step The step object that attaches to the element
     * @private
     */_styleTargetElementForStep(e){const t=ho(e);t&&(co(t),e.options.highlightClass&&t.classList.add(e.options.highlightClass),!1===e.options.canClickTarget&&(t.style.pointerEvents="none"))}/**
     * Called when `showOn` evaluates to false, to skip the step
     * @param {Step} step The step to skip
     * @param {Boolean} forward True if we are going forward, false if backward
     * @private
     */_skipStep(e,t){const o=this.steps.indexOf(e),r=t?o+1:o-1;this.show(r,t)}_setTooltipDefaults(){Ht.setDefaults(tn)}_updateStateBeforeShow(){this.currentStep&&this.currentStep.hide(),this.isActive()||this._setupActiveTour()}_setTourID(){const e=this.options.tourName||"tour",t=on();this.id=`${e}--${t}`}_addBodyAttrs(){document.body.setAttribute("data-shepherd-active-tour",this.id),document.body.classList.add("shepherd-active")}_removeBodyAttrs(){document.body.removeAttribute("data-shepherd-active-tour"),document.body.classList.remove("shepherd-active")}},Step:Ri,Evented:Vo}),rn});
//# sourceMappingURL=shepherd.min.js.map
