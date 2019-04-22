/*! shepherd.js 2.7.0 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Shepherd = factory());
}(this, function () { 'use strict';

  /**
   * The base implementation of `_.slice` without an iteratee call guard.
   *
   * @private
   * @param {Array} array The array to slice.
   * @param {number} [start=0] The start position.
   * @param {number} [end=array.length] The end position.
   * @returns {Array} Returns the slice of `array`.
   */
  function baseSlice(array, start, end) {
    var index = -1,
        length = array.length;

    if (start < 0) {
      start = -start > length ? 0 : (length + start);
    }
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : ((end - start) >>> 0);
    start >>>= 0;

    var result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }

  /**
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
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = freeGlobal || freeSelf || Function('return this')();

  /** Built-in value references. */
  var Symbol$1 = root.Symbol;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? getRawTag(value)
      : objectToString(value);
  }

  /**
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
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
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
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike(value) && baseGetTag(value) == symbolTag);
  }

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

  /** Used to detect bad signed hexadecimal string values. */
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

  /** Used to detect binary string values. */
  var reIsBinary = /^0b[01]+$/i;

  /** Used to detect octal string values. */
  var reIsOctal = /^0o[0-7]+$/i;

  /** Built-in method references without a dependency on `root`. */
  var freeParseInt = parseInt;

  /**
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
   */
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0,
      MAX_INTEGER = 1.7976931348623157e+308;

  /**
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
   */
  function toFinite(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
      var sign = (value < 0 ? -1 : 1);
      return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
  }

  /**
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
   */
  function toInteger(value) {
    var result = toFinite(value),
        remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
  }

  /**
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
   */
  function drop(array, n, guard) {
    var length = array == null ? 0 : array.length;
    if (!length) {
      return [];
    }
    n = (guard || n === undefined) ? 1 : toInteger(n);
    return baseSlice(array, n < 0 ? 0 : n, length);
  }

  /**
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
   */
  function isUndefined(value) {
    return value === undefined;
  }

  class Evented {
    on(event, handler, ctx) {
      const once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (isUndefined(this.bindings)) {
        this.bindings = {};
      }

      if (isUndefined(this.bindings[event])) {
        this.bindings[event] = [];
      }

      this.bindings[event].push({
        handler,
        ctx,
        once
      });
    }

    once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }

    off(event, handler) {
      if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
        return false;
      }

      if (isUndefined(handler)) {
        delete this.bindings[event];
      } else {
        this.bindings[event].forEach((binding, index) => {
          if (binding.handler === handler) {
            this.bindings[event].splice(index, 1);
          }
        });
      }
    }

    trigger(event) {
      if (!isUndefined(this.bindings) && this.bindings[event]) {
        const args = drop(arguments);
        this.bindings[event].forEach((binding, index) => {
          const ctx = binding.ctx,
                handler = binding.handler,
                once = binding.once;
          const context = ctx || this;
          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(index, 1);
          }
        });
      }
    }

  }

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1,
          iterable = Object(object),
          props = keysFunc(object),
          length = props.length;

      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }

  /**
   * The base implementation of `baseForOwn` which iterates over `object`
   * properties returned by `keysFunc` and invokes `iteratee` for each property.
   * Iteratee functions may exit iteration early by explicitly returning `false`.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @param {Function} keysFunc The function to get the keys of `object`.
   * @returns {Object} Returns `object`.
   */
  var baseFor = createBaseFor();

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike(value) && baseGetTag(value) == argsTag;
  }

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
    return isObjectLike(value) && hasOwnProperty$1.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  /**
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
   */
  function stubFalse() {
    return false;
  }

  /** Detect free variable `exports`. */
  var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? root.Buffer : undefined;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

  /**
   * Checks if `value` is a buffer.
   *
   * @static
   * @memberOf _
   * @since 4.3.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
   * @example
   *
   * _.isBuffer(new Buffer(2));
   * // => true
   *
   * _.isBuffer(new Uint8Array(2));
   * // => false
   */
  var isBuffer = nativeIsBuffer || stubFalse;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
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
   */
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      dataViewTag = '[object DataView]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike(value) &&
      isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  /** Detect free variable `exports`. */
  var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports$1 && freeGlobal.process;

  /** Used to access faster Node.js helpers. */
  var nodeUtil = (function() {
    try {
      // Use `util.types` for Node.js 10+.
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

      if (types) {
        return types;
      }

      // Legacy `process.binding('util')` for Node.js < 10.
      return freeProcess && freeProcess.binding && freeProcess.binding('util');
    } catch (e) {}
  }());

  /* Node.js helper references. */
  var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

  /**
   * Checks if `value` is classified as a typed array.
   *
   * @static
   * @memberOf _
   * @since 3.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   * @example
   *
   * _.isTypedArray(new Uint8Array);
   * // => true
   *
   * _.isTypedArray([]);
   * // => false
   */
  var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$2.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

    return value === proto;
  }

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = overArg(Object.keys, Object);

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!isPrototype(object)) {
      return nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$3.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag$1 = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
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
   */
  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = baseGetTag(value);
    return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  /**
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
   */
  function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
  }

  /**
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
   */
  function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
  }

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
  }

  /**
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
   */
  function identity(value) {
    return value;
  }

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity;
  }

  /**
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
   */
  function forOwn(object, iteratee) {
    return object && baseForOwn(object, castFunction(iteratee));
  }

  /** Built-in value references. */
  var getPrototype = overArg(Object.getPrototypeOf, Object);

  /** `Object#toString` result references. */
  var objectTag$1 = '[object Object]';

  /** Used for built-in method references. */
  var funcProto = Function.prototype,
      objectProto$6 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

  /** Used to infer the `Object` constructor. */
  var objectCtorString = funcToString.call(Object);

  /**
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
   */
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$4.call(proto, 'constructor') && proto.constructor;
    return typeof Ctor == 'function' && Ctor instanceof Ctor &&
      funcToString.call(Ctor) == objectCtorString;
  }

  /**
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
   */
  function isElement(value) {
    return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
  }

  /** Used to detect overreaching core-js shims. */
  var coreJsData = root['__core-js_shared__'];

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$2 = Function.prototype,
      objectProto$7 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$2 = funcProto$2.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$2.call(hasOwnProperty$5).replace(reRegExpChar, '\\$&')
    .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }

  /* Built-in method references that are verified to be native. */
  var DataView = getNative(root, 'DataView');

  /* Built-in method references that are verified to be native. */
  var Map = getNative(root, 'Map');

  /* Built-in method references that are verified to be native. */
  var Promise = getNative(root, 'Promise');

  /* Built-in method references that are verified to be native. */
  var Set = getNative(root, 'Set');

  /* Built-in method references that are verified to be native. */
  var WeakMap = getNative(root, 'WeakMap');

  /** `Object#toString` result references. */
  var mapTag$1 = '[object Map]',
      objectTag$2 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$1 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$1 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = toSource(DataView),
      mapCtorString = toSource(Map),
      promiseCtorString = toSource(Promise),
      setCtorString = toSource(Set),
      weakMapCtorString = toSource(WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
      (Map && getTag(new Map) != mapTag$1) ||
      (Promise && getTag(Promise.resolve()) != promiseTag) ||
      (Set && getTag(new Set) != setTag$1) ||
      (WeakMap && getTag(new WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = baseGetTag(value),
          Ctor = result == objectTag$2 ? value.constructor : undefined,
          ctorString = Ctor ? toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$1;
          case mapCtorString: return mapTag$1;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$1;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var getTag$1 = getTag;

  /** `Object#toString` result references. */
  var mapTag$2 = '[object Map]',
      setTag$2 = '[object Set]';

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

  /**
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
   */
  function isEmpty(value) {
    if (value == null) {
      return true;
    }
    if (isArrayLike(value) &&
        (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
          isBuffer(value) || isTypedArray(value) || isArguments(value))) {
      return !value.length;
    }
    var tag = getTag$1(value);
    if (tag == mapTag$2 || tag == setTag$2) {
      return !value.size;
    }
    if (isPrototype(value)) {
      return !baseKeys(value).length;
    }
    for (var key in value) {
      if (hasOwnProperty$6.call(value, key)) {
        return false;
      }
    }
    return true;
  }

  /** `Object#toString` result references. */
  var stringTag$1 = '[object String]';

  /**
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
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag$1);
  }

  if (!Element.prototype.matches) {
      Element.prototype.matches =
          Element.prototype.matchesSelector ||
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var defineProperty = (function() {
    try {
      var func = getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && defineProperty) {
      defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  /**
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
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * Assigns `value` to `key` of `object` if the existing value is not equivalent
   * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * for equality comparisons.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) ||
        (value === undefined && !(key in object))) {
      baseAssignValue(object, key, value);
    }
  }

  /**
   * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
   *
   * @private
   * @param {Array} props The property identifiers.
   * @param {Array} values The property values.
   * @param {Function} assignFunc The function to assign values.
   * @returns {Object} Returns the new object.
   */
  function baseZipObject(props, values, assignFunc) {
    var index = -1,
        length = props.length,
        valsLength = values.length,
        result = {};

    while (++index < length) {
      var value = index < valsLength ? values[index] : undefined;
      assignFunc(result, props[index], value);
    }
    return result;
  }

  /**
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
   */
  function zipObject(props, values) {
    return baseZipObject(props || [], values || [], assignValue);
  }

  /**!
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
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction$1(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty$1 = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction$1(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
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
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$1(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$1(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
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
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
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
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty$1({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty$1({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty$1({}, side, reference[side]),
        end: defineProperty$1({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
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
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
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
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
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
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
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
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction$1(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
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
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**!
  * tippy.js v4.2.1
  * (c) 2017-2019 atomiks
  * MIT License
  */

  var css = ".tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{transition-timing-function:cubic-bezier(.165,.84,.44,1);max-width:calc(100% - 8px);pointer-events:none;outline:0}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-7px;bottom:-6.5px;-webkit-transform-origin:50% 0;transform-origin:50% 0;margin:0 3px}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 3px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(-10px) rotateX(0);transform:perspective(700px) translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateY(0) rotateX(60deg);transform:perspective(700px) translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px) scale(.5);transform:translateY(-10px) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-7px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%;margin:0 3px}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 3px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateY(10px) rotateX(0);transform:perspective(700px) translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateY(0) rotateX(-60deg);transform:perspective(700px) translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px) scale(.5);transform:translateY(10px) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-12px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%;margin:3px 0}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(-10px) rotateY(0);transform:perspective(700px) translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateX(0) rotateY(-60deg);transform:perspective(700px) translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px) scale(.5);transform:translateX(-10px) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-12px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%;margin:3px 0}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:perspective(700px) translateX(10px) rotateY(0);transform:perspective(700px) translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:perspective(700px) translateX(0) rotateY(60deg);transform:perspective(700px) translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px) scale(.5);transform:translateX(10px) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;padding:.3125rem .5625rem;line-height:1.4;text-align:center;background-color:#333}.tippy-tooltip[data-size=small]{padding:.1875rem .375rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.375rem .75rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:18px;height:7px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:\"\";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}";

  function _extends$1() {
    _extends$1 = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends$1.apply(this, arguments);
  }

  var version = "4.2.1";

  var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined';
  var ua = isBrowser$1 ? navigator.userAgent : '';
  var isIE$1 = /MSIE |Trident\//.test(ua);
  var isUCBrowser = /UCBrowser\//.test(ua);
  var isIOS = isBrowser$1 && /iPhone|iPad|iPod/.test(navigator.platform) && !window.MSStream;

  var defaultProps = {
    a11y: true,
    allowHTML: true,
    animateFill: true,
    animation: 'shift-away',
    appendTo: function appendTo() {
      return document.body;
    },
    aria: 'describedby',
    arrow: false,
    arrowType: 'sharp',
    boundary: 'scrollParent',
    content: '',
    delay: 0,
    distance: 10,
    duration: [325, 275],
    flip: true,
    flipBehavior: 'flip',
    flipOnUpdate: false,
    followCursor: false,
    hideOnClick: true,
    ignoreAttributes: false,
    inertia: false,
    interactive: false,
    interactiveBorder: 2,
    interactiveDebounce: 0,
    lazy: true,
    maxWidth: 350,
    multiple: false,
    offset: 0,
    onHidden: function onHidden() {},
    onHide: function onHide() {},
    onMount: function onMount() {},
    onShow: function onShow() {},
    onShown: function onShown() {},
    placement: 'top',
    popperOptions: {},
    role: 'tooltip',
    showOnInit: false,
    size: 'regular',
    sticky: false,
    target: '',
    theme: 'dark',
    touch: true,
    touchHold: false,
    trigger: 'mouseenter focus',
    updateDuration: 0,
    wait: null,
    zIndex: 9999
    /**
     * If the set() method encounters one of these, the popperInstance must be
     * recreated
     */

  };
  var POPPER_INSTANCE_DEPENDENCIES = ['arrow', 'arrowType', 'boundary', 'distance', 'flip', 'flipBehavior', 'flipOnUpdate', 'offset', 'placement', 'popperOptions'];

  var elementProto = isBrowser$1 ? Element.prototype : {};
  var matches = elementProto.matches || elementProto.matchesSelector || elementProto.webkitMatchesSelector || elementProto.mozMatchesSelector || elementProto.msMatchesSelector;
  /**
   * Ponyfill for Array.from - converts iterable values to an array
   */

  function arrayFrom(value) {
    return [].slice.call(value);
  }
  /**
   * Ponyfill for Element.prototype.closest
   */

  function closest(element, parentSelector) {
    return (elementProto.closest || function (selector) {
      // @ts-ignore
      var el = this;

      while (el) {
        if (matches.call(el, selector)) {
          return el;
        }

        el = el.parentElement;
      }
    }).call(element, parentSelector);
  }
  /**
   * Works like Element.prototype.closest, but uses a callback instead
   */

  function closestCallback(element, callback) {
    while (element) {
      if (callback(element)) {
        return element;
      }

      element = element.parentElement;
    }
  }

  // Passive event listener config
  var PASSIVE = {
    passive: true // Popper `preventOverflow` padding

  };
  var PADDING = 4; // Popper attributes
  // In Popper v2 these will be `data-*` instead of `x-*` to adhere to HTML5 spec

  var PLACEMENT_ATTRIBUTE = 'x-placement';
  var OUT_OF_BOUNDARIES_ATTRIBUTE = 'x-out-of-boundaries'; // Classes

  var IOS_CLASS = 'tippy-iOS';
  var ACTIVE_CLASS = 'tippy-active'; // Selectors

  var POPPER_SELECTOR = '.tippy-popper';
  var TOOLTIP_SELECTOR = '.tippy-tooltip';
  var CONTENT_SELECTOR = '.tippy-content';
  var BACKDROP_SELECTOR = '.tippy-backdrop';
  var ARROW_SELECTOR = '.tippy-arrow';
  var ROUND_ARROW_SELECTOR = '.tippy-roundarrow';

  var keys$1 = Object.keys(defaultProps);
  /**
   * Returns an object of optional props from data-tippy-* attributes
   */

  function getDataAttributeOptions(reference) {
    return keys$1.reduce(function (acc, key) {
      var valueAsString = (reference.getAttribute("data-tippy-".concat(key)) || '').trim();

      if (!valueAsString) {
        return acc;
      }

      if (key === 'content') {
        acc[key] = valueAsString;
      } else {
        try {
          acc[key] = JSON.parse(valueAsString);
        } catch (e) {
          acc[key] = valueAsString;
        }
      }

      return acc;
    }, {});
  }
  /**
   * Polyfills the virtual reference (plain object) with Element.prototype props
   * Mutating because DOM elements are mutated, adds `_tippy` property
   */

  function polyfillElementPrototypeProperties(virtualReference) {
    var polyfills = {
      isVirtual: true,
      attributes: virtualReference.attributes || {},
      setAttribute: function setAttribute(key, value) {
        virtualReference.attributes[key] = value;
      },
      getAttribute: function getAttribute(key) {
        return virtualReference.attributes[key];
      },
      removeAttribute: function removeAttribute(key) {
        delete virtualReference.attributes[key];
      },
      hasAttribute: function hasAttribute(key) {
        return key in virtualReference.attributes;
      },
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      classList: {
        classNames: {},
        add: function add(key) {
          virtualReference.classList.classNames[key] = true;
        },
        remove: function remove(key) {
          delete virtualReference.classList.classNames[key];
        },
        contains: function contains(key) {
          return key in virtualReference.classList.classNames;
        }
      }
    };

    for (var key in polyfills) {
      virtualReference[key] = polyfills[key];
    }
  }

  /**
   * Determines if a value is a "bare" virtual element (before mutations done
   * by `polyfillElementPrototypeProperties()`). JSDOM elements show up as
   * [object Object], we can check if the value is "element-like" if it has
   * `addEventListener`
   */

  function isBareVirtualElement(value) {
    return {}.toString.call(value) === '[object Object]' && !value.addEventListener;
  }
  /**
   * Safe .hasOwnProperty check, for prototype-less objects
   */

  function hasOwnProperty$8(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  }
  /**
   * Returns an array of elements based on the value
   */

  function getArrayOfElements(value) {
    if (isSingular(value)) {
      // TODO: VirtualReference is not compatible to type Element
      return [value];
    }

    if (value instanceof NodeList) {
      return arrayFrom(value);
    }

    if (Array.isArray(value)) {
      return value;
    }

    try {
      return arrayFrom(document.querySelectorAll(value));
    } catch (e) {
      return [];
    }
  }
  /**
   * Returns a value at a given index depending on if it's an array or number
   */

  function getValue$1(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null ? defaultValue : v;
    }

    return value;
  }
  /**
   * Debounce utility
   */

  function debounce$1(fn, ms) {
    var timeoutId;
    return function () {
      var _this = this,
          _arguments = arguments;

      clearTimeout(timeoutId); // @ts-ignore

      timeoutId = setTimeout(function () {
        return fn.apply(_this, _arguments);
      }, ms);
    };
  }
  /**
   * Prevents errors from being thrown while accessing nested modifier objects
   * in `popperOptions`
   */

  function getModifier(obj, key) {
    return obj && obj.modifiers && obj.modifiers[key];
  }
  /**
   * Determines if an array or string includes a value
   */

  function includes(a, b) {
    return a.indexOf(b) > -1;
  }
  /**
   * Determines if the value is singular-like
   */

  function isSingular(value) {
    return !!(value && hasOwnProperty$8(value, 'isVirtual')) || value instanceof Element;
  }
  /**
   * Firefox extensions don't allow setting .innerHTML directly, this will trick it
   */

  function innerHTML() {
    return 'innerHTML';
  }
  /**
   * Evaluates a function if one, or returns the value
   */

  function evaluateValue(value, args) {
    return typeof value === 'function' ? value.apply(null, args) : value;
  }
  /**
   * Sets a popperInstance `flip` modifier's enabled state
   */

  function setFlipModifierEnabled(modifiers, value) {
    modifiers.filter(function (m) {
      return m.name === 'flip';
    })[0].enabled = value;
  }
  /**
   * Determines if an element can receive focus
   * Always returns true for virtual objects
   */

  function canReceiveFocus(element) {
    return element instanceof Element ? matches.call(element, 'a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]') && !element.hasAttribute('disabled') : true;
  }
  /**
   * Returns a new `div` element
   */

  function div() {
    return document.createElement('div');
  }
  /**
   * Applies a transition duration to a list of elements
   */

  function setTransitionDuration(els, value) {
    els.forEach(function (el) {
      if (el) {
        el.style.transitionDuration = "".concat(value, "ms");
      }
    });
  }
  /**
   * Sets the visibility state to elements so they can begin to transition
   */

  function setVisibilityState(els, state) {
    els.forEach(function (el) {
      if (el) {
        el.setAttribute('data-state', state);
      }
    });
  }
  /**
   * Evaluates the props object by merging data attributes and
   * disabling conflicting options where necessary
   */

  function evaluateProps(reference, props) {
    var out = _extends$1({}, props, {
      content: evaluateValue(props.content, [reference])
    }, props.ignoreAttributes ? {} : getDataAttributeOptions(reference));

    if (out.arrow || isUCBrowser) {
      out.animateFill = false;
    }

    return out;
  }
  /**
   * Validates an object of options with the valid default props object
   */

  function validateOptions(options, defaultProps) {
    Object.keys(options).forEach(function (option) {
      if (!hasOwnProperty$8(defaultProps, option)) {
        throw new Error("[tippy]: `".concat(option, "` is not a valid option"));
      }
    });
  }

  /**
   * Sets the innerHTML of an element
   */

  function setInnerHTML(element, html) {
    element[innerHTML()] = html instanceof Element ? html[innerHTML()] : html;
  }
  /**
   * Sets the content of a tooltip
   */

  function setContent(contentEl, props) {
    if (props.content instanceof Element) {
      setInnerHTML(contentEl, '');
      contentEl.appendChild(props.content);
    } else if (typeof props.content !== 'function') {
      var key = props.allowHTML ? 'innerHTML' : 'textContent';
      contentEl[key] = props.content;
    }
  }
  /**
   * Returns the child elements of a popper element
   */

  function getChildren(popper) {
    return {
      tooltip: popper.querySelector(TOOLTIP_SELECTOR),
      backdrop: popper.querySelector(BACKDROP_SELECTOR),
      content: popper.querySelector(CONTENT_SELECTOR),
      arrow: popper.querySelector(ARROW_SELECTOR) || popper.querySelector(ROUND_ARROW_SELECTOR)
    };
  }
  /**
   * Adds `data-inertia` attribute
   */

  function addInertia(tooltip) {
    tooltip.setAttribute('data-inertia', '');
  }
  /**
   * Removes `data-inertia` attribute
   */

  function removeInertia(tooltip) {
    tooltip.removeAttribute('data-inertia');
  }
  /**
   * Creates an arrow element and returns it
   */

  function createArrowElement(arrowType) {
    var arrow = div();

    if (arrowType === 'round') {
      arrow.className = 'tippy-roundarrow';
      setInnerHTML(arrow, '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>');
    } else {
      arrow.className = 'tippy-arrow';
    }

    return arrow;
  }
  /**
   * Creates a backdrop element and returns it
   */

  function createBackdropElement() {
    var backdrop = div();
    backdrop.className = 'tippy-backdrop';
    backdrop.setAttribute('data-state', 'hidden');
    return backdrop;
  }
  /**
   * Adds interactive-related attributes
   */

  function addInteractive(popper, tooltip) {
    popper.setAttribute('tabindex', '-1');
    tooltip.setAttribute('data-interactive', '');
  }
  /**
   * Removes interactive-related attributes
   */

  function removeInteractive(popper, tooltip) {
    popper.removeAttribute('tabindex');
    tooltip.removeAttribute('data-interactive');
  }
  /**
   * Add/remove transitionend listener from tooltip
   */

  function updateTransitionEndListener(tooltip, action, listener) {
    // UC Browser hasn't adopted the `transitionend` event despite supporting
    // unprefixed transitions...
    var eventName = isUCBrowser && document.body.style.webkitTransition !== undefined ? 'webkitTransitionEnd' : 'transitionend';
    tooltip[action + 'EventListener'](eventName, listener);
  }
  /**
   * Returns the popper's placement, ignoring shifting (top-start, etc)
   */

  function getBasicPlacement(popper) {
    var fullPlacement = popper.getAttribute(PLACEMENT_ATTRIBUTE);
    return fullPlacement ? fullPlacement.split('-')[0] : '';
  }
  /**
   * Triggers reflow
   */

  function reflow(popper) {
    void popper.offsetHeight;
  }
  /**
   * Adds/removes theme from tooltip's classList
   */

  function updateTheme(tooltip, action, theme) {
    theme.split(' ').forEach(function (themeName) {
      tooltip.classList[action](themeName + '-theme');
    });
  }
  /**
   * Constructs the popper element and returns it
   */

  function createPopperElement(id, props) {
    var popper = div();
    popper.className = 'tippy-popper';
    popper.id = "tippy-".concat(id);
    popper.style.zIndex = '' + props.zIndex;

    if (props.role) {
      popper.setAttribute('role', props.role);
    }

    var tooltip = div();
    tooltip.className = 'tippy-tooltip';
    tooltip.style.maxWidth = props.maxWidth + (typeof props.maxWidth === 'number' ? 'px' : '');
    tooltip.setAttribute('data-size', props.size);
    tooltip.setAttribute('data-animation', props.animation);
    tooltip.setAttribute('data-state', 'hidden');
    updateTheme(tooltip, 'add', props.theme);
    var content = div();
    content.className = 'tippy-content';
    content.setAttribute('data-state', 'hidden');

    if (props.interactive) {
      addInteractive(popper, tooltip);
    }

    if (props.arrow) {
      tooltip.appendChild(createArrowElement(props.arrowType));
    }

    if (props.animateFill) {
      tooltip.appendChild(createBackdropElement());
      tooltip.setAttribute('data-animatefill', '');
    }

    if (props.inertia) {
      addInertia(tooltip);
    }

    setContent(content, props);
    tooltip.appendChild(content);
    popper.appendChild(tooltip);
    return popper;
  }
  /**
   * Updates the popper element based on the new props
   */

  function updatePopperElement(popper, prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        tooltip = _getChildren.tooltip,
        content = _getChildren.content,
        backdrop = _getChildren.backdrop,
        arrow = _getChildren.arrow;

    popper.style.zIndex = '' + nextProps.zIndex;
    tooltip.setAttribute('data-size', nextProps.size);
    tooltip.setAttribute('data-animation', nextProps.animation);
    tooltip.style.maxWidth = nextProps.maxWidth + (typeof nextProps.maxWidth === 'number' ? 'px' : '');

    if (nextProps.role) {
      popper.setAttribute('role', nextProps.role);
    } else {
      popper.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content) {
      setContent(content, nextProps);
    } // animateFill


    if (!prevProps.animateFill && nextProps.animateFill) {
      tooltip.appendChild(createBackdropElement());
      tooltip.setAttribute('data-animatefill', '');
    } else if (prevProps.animateFill && !nextProps.animateFill) {
      tooltip.removeChild(backdrop);
      tooltip.removeAttribute('data-animatefill');
    } // arrow


    if (!prevProps.arrow && nextProps.arrow) {
      tooltip.appendChild(createArrowElement(nextProps.arrowType));
    } else if (prevProps.arrow && !nextProps.arrow) {
      tooltip.removeChild(arrow);
    } // arrowType


    if (prevProps.arrow && nextProps.arrow && prevProps.arrowType !== nextProps.arrowType) {
      tooltip.replaceChild(createArrowElement(nextProps.arrowType), arrow);
    } // interactive


    if (!prevProps.interactive && nextProps.interactive) {
      addInteractive(popper, tooltip);
    } else if (prevProps.interactive && !nextProps.interactive) {
      removeInteractive(popper, tooltip);
    } // inertia


    if (!prevProps.inertia && nextProps.inertia) {
      addInertia(tooltip);
    } else if (prevProps.inertia && !nextProps.inertia) {
      removeInertia(tooltip);
    } // theme


    if (prevProps.theme !== nextProps.theme) {
      updateTheme(tooltip, 'remove', prevProps.theme);
      updateTheme(tooltip, 'add', nextProps.theme);
    }
  }
  /**
   * Runs the callback after the popper's position has been updated
   * update() is debounced with Promise.resolve() or setTimeout()
   * scheduleUpdate() is update() wrapped in requestAnimationFrame()
   */

  function afterPopperPositionUpdates(popperInstance, callback) {
    var popper = popperInstance.popper,
        options = popperInstance.options;
    var onCreate = options.onCreate,
        onUpdate = options.onUpdate;

    options.onCreate = options.onUpdate = function (data) {
      reflow(popper);
      callback();

      if (onUpdate) {
        onUpdate(data);
      }

      options.onCreate = onCreate;
      options.onUpdate = onUpdate;
    };
  }
  /**
   * Hides all visible poppers on the document
   */

  function hideAll() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checkHideOnClick = _ref.checkHideOnClick,
        exclude = _ref.exclude,
        duration = _ref.duration;

    arrayFrom(document.querySelectorAll(POPPER_SELECTOR)).forEach(function (popper) {
      var instance = popper._tippy;

      if (instance && (checkHideOnClick ? instance.props.hideOnClick === true : true) && (!exclude || popper !== exclude.popper)) {
        instance.hide(duration);
      }
    });
  }
  /**
   * Determines if the mouse cursor is outside of the popper's interactive border
   * region
   */

  function isCursorOutsideInteractiveBorder(popperPlacement, popperRect, event, props) {
    if (!popperPlacement) {
      return true;
    }

    var x = event.clientX,
        y = event.clientY;
    var interactiveBorder = props.interactiveBorder,
        distance = props.distance;
    var exceedsTop = popperRect.top - y > (popperPlacement === 'top' ? interactiveBorder + distance : interactiveBorder);
    var exceedsBottom = y - popperRect.bottom > (popperPlacement === 'bottom' ? interactiveBorder + distance : interactiveBorder);
    var exceedsLeft = popperRect.left - x > (popperPlacement === 'left' ? interactiveBorder + distance : interactiveBorder);
    var exceedsRight = x - popperRect.right > (popperPlacement === 'right' ? interactiveBorder + distance : interactiveBorder);
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  }
  /**
   * Returns the distance offset, taking into account the default offset due to
   * the transform: translate() rule (10px) in CSS
   */

  function getOffsetDistanceInPx(distance) {
    return -(distance - 10) + 'px';
  }

  var isUsingTouch = false;
  function onDocumentTouch() {
    if (isUsingTouch) {
      return;
    }

    isUsingTouch = true;

    if (isIOS) {
      document.body.classList.add(IOS_CLASS);
    }

    if (window.performance) {
      document.addEventListener('mousemove', onDocumentMouseMove);
    }
  }
  var lastMouseMoveTime = 0;
  function onDocumentMouseMove() {
    var now = performance.now(); // Chrome 60+ is 1 mousemove per animation frame, use 20ms time difference

    if (now - lastMouseMoveTime < 20) {
      isUsingTouch = false;
      document.removeEventListener('mousemove', onDocumentMouseMove);

      if (!isIOS) {
        document.body.classList.remove(IOS_CLASS);
      }
    }

    lastMouseMoveTime = now;
  }
  function onDocumentClick(event) {
    // Simulated events dispatched on the document
    if (!(event.target instanceof Element)) {
      return hideAll();
    } // Clicked on an interactive popper


    var popper = closest(event.target, POPPER_SELECTOR);

    if (popper && popper._tippy && popper._tippy.props.interactive) {
      return;
    } // Clicked on a reference


    var reference = closestCallback(event.target, function (el) {
      return el._tippy && el._tippy.reference === el;
    });

    if (reference) {
      var instance = reference._tippy;

      if (instance) {
        var isClickTrigger = includes(instance.props.trigger || '', 'click');

        if (isUsingTouch || isClickTrigger) {
          return hideAll({
            exclude: instance,
            checkHideOnClick: true
          });
        }

        if (instance.props.hideOnClick !== true || isClickTrigger) {
          return;
        }

        instance.clearDelayTimeouts();
      }
    }

    hideAll({
      checkHideOnClick: true
    });
  }
  function onWindowBlur() {
    var _document = document,
        activeElement = _document.activeElement;

    if (activeElement && activeElement.blur && activeElement._tippy) {
      activeElement.blur();
    }
  }
  /**
   * Adds the needed global event listeners
   */

  function bindGlobalEventListeners() {
    document.addEventListener('click', onDocumentClick, true);
    document.addEventListener('touchstart', onDocumentTouch, PASSIVE);
    window.addEventListener('blur', onWindowBlur);
  }

  var idCounter = 1;
  /**
   * Creates and returns a Tippy object. We're using a closure pattern instead of
   * a class so that the exposed object API is clean without private members
   * prefixed with `_`.
   */

  function createTippy(reference, collectionProps) {
    var props = evaluateProps(reference, collectionProps); // If the reference shouldn't have multiple tippys, return null early

    if (!props.multiple && reference._tippy) {
      return null;
    }
    /* ======================= 🔒 Private members 🔒 ======================= */


    var lastTriggerEventType;
    var lastMouseMoveEvent;
    var showTimeoutId;
    var hideTimeoutId;
    var animationFrameId;
    var isScheduledToShow = false;
    var currentParentNode;
    var previousPlacement;
    var wasVisibleDuringPreviousUpdate = false;
    var currentTransitionEndListener;
    var listeners = [];
    var debouncedOnMouseMove = props.interactiveDebounce > 0 ? debounce$1(onMouseMove, props.interactiveDebounce) : onMouseMove;
    /* ======================= 🔑 Public members 🔑 ======================= */

    var id = idCounter++;
    var popper = createPopperElement(id, props);
    var popperChildren = getChildren(popper);
    var popperInstance = null;
    var state = {
      // Is the instance currently enabled?
      isEnabled: true,
      // Is the tippy currently showing and not transitioning out?
      isVisible: false,
      // Has the instance been destroyed?
      isDestroyed: false,
      // Is the tippy currently mounted to the DOM?
      isMounted: false,
      // Has the tippy finished transitioning in?
      isShown: false
    };
    var instance = {
      // properties
      id: id,
      reference: reference,
      popper: popper,
      popperChildren: popperChildren,
      popperInstance: popperInstance,
      props: props,
      state: state,
      // methods
      clearDelayTimeouts: clearDelayTimeouts,
      set: set,
      setContent: setContent$$1,
      show: show,
      hide: hide,
      enable: enable,
      disable: disable,
      destroy: destroy
      /* ==================== Initial instance mutations =================== */

    };
    reference._tippy = instance;
    popper._tippy = instance;
    addTriggersToReference();

    if (!props.lazy) {
      createPopperInstance();
      instance.popperInstance.disableEventListeners();
    }

    if (props.showOnInit) {
      scheduleShow();
    } // Ensure the reference element can receive focus (and is not a delegate)


    if (props.a11y && !props.target && !canReceiveFocus(reference)) {
      reference.setAttribute('tabindex', '0');
    } // Prevent a tippy with a delay from hiding if the cursor left then returned
    // before it started hiding


    popper.addEventListener('mouseenter', function (event) {
      if (instance.props.interactive && instance.state.isVisible && lastTriggerEventType === 'mouseenter') {
        scheduleShow(event);
      }
    });
    popper.addEventListener('mouseleave', function () {
      if (instance.props.interactive && lastTriggerEventType === 'mouseenter') {
        document.addEventListener('mousemove', debouncedOnMouseMove);
      }
    });
    return instance;
    /* ======================= 🔒 Private methods 🔒 ======================= */

    /**
     * Removes the follow cursor listener
     */

    function removeFollowCursorListener() {
      document.removeEventListener('mousemove', positionVirtualReferenceNearCursor);
    }
    /**
     * Cleans up old listeners
     */


    function cleanupOldMouseListeners() {
      document.body.removeEventListener('mouseleave', scheduleHide);
      document.removeEventListener('mousemove', debouncedOnMouseMove);
    }
    /**
     * Returns transitionable inner elements used in show/hide methods
     */


    function getTransitionableElements() {
      return [instance.popperChildren.tooltip, instance.popperChildren.backdrop, instance.popperChildren.content];
    }
    /**
     * Determines if the instance is in `followCursor` mode
     */


    function hasFollowCursorBehavior() {
      return instance.props.followCursor && !isUsingTouch && lastTriggerEventType !== 'focus';
    }
    /**
     * Updates the tooltip's position on each animation frame
     */


    function makeSticky() {
      setTransitionDuration([instance.popper], isIE$1 ? 0 : instance.props.updateDuration);

      function updatePosition() {
        if (instance.popperInstance) {
          instance.popperInstance.scheduleUpdate();
        }

        if (instance.state.isMounted) {
          requestAnimationFrame(updatePosition);
        } else {
          setTransitionDuration([instance.popper], 0);
        }
      }

      updatePosition();
    }
    /**
     * Invokes a callback once the tooltip has fully transitioned out
     */


    function onTransitionedOut(duration, callback) {
      onTransitionEnd(duration, function () {
        if (!instance.state.isVisible && currentParentNode && currentParentNode.contains(instance.popper)) {
          callback();
        }
      });
    }
    /**
     * Invokes a callback once the tooltip has fully transitioned in
     */


    function onTransitionedIn(duration, callback) {
      onTransitionEnd(duration, callback);
    }
    /**
     * Invokes a callback once the tooltip's CSS transition ends
     */


    function onTransitionEnd(duration, callback) {
      var tooltip = instance.popperChildren.tooltip;
      /**
       * Listener added as the `transitionend` handler
       */

      function listener(event) {
        if (event.target === tooltip) {
          updateTransitionEndListener(tooltip, 'remove', listener);
          callback();
        }
      } // Make callback synchronous if duration is 0
      // `transitionend` won't fire otherwise


      if (duration === 0) {
        return callback();
      }

      updateTransitionEndListener(tooltip, 'remove', currentTransitionEndListener);
      updateTransitionEndListener(tooltip, 'add', listener);
      currentTransitionEndListener = listener;
    }
    /**
     * Adds an event listener to the reference and stores it in `listeners`
     */


    function on(eventType, handler) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      instance.reference.addEventListener(eventType, handler, options);
      listeners.push({
        eventType: eventType,
        handler: handler,
        options: options
      });
    }
    /**
     * Adds event listeners to the reference based on the `trigger` prop
     */


    function addTriggersToReference() {
      if (instance.props.touchHold && !instance.props.target) {
        on('touchstart', onTrigger, PASSIVE);
        on('touchend', onMouseLeave, PASSIVE);
      }

      instance.props.trigger.trim().split(' ').forEach(function (eventType) {
        if (eventType === 'manual') {
          return;
        } // Non-delegates


        if (!instance.props.target) {
          on(eventType, onTrigger);

          switch (eventType) {
            case 'mouseenter':
              on('mouseleave', onMouseLeave);
              break;

            case 'focus':
              on(isIE$1 ? 'focusout' : 'blur', onBlur);
              break;
          }
        } else {
          // Delegates
          switch (eventType) {
            case 'mouseenter':
              on('mouseover', onDelegateShow);
              on('mouseout', onDelegateHide);
              break;

            case 'focus':
              on('focusin', onDelegateShow);
              on('focusout', onDelegateHide);
              break;

            case 'click':
              on(eventType, onDelegateShow);
              break;
          }
        }
      });
    }
    /**
     * Removes event listeners from the reference
     */


    function removeTriggersFromReference() {
      listeners.forEach(function (_ref) {
        var eventType = _ref.eventType,
            handler = _ref.handler,
            options = _ref.options;
        instance.reference.removeEventListener(eventType, handler, options);
      });
      listeners = [];
    }
    /**
     * Positions the virtual reference near the cursor
     */


    function positionVirtualReferenceNearCursor(event) {
      var _lastMouseMoveEvent = lastMouseMoveEvent = event,
          clientX = _lastMouseMoveEvent.clientX,
          clientY = _lastMouseMoveEvent.clientY;

      if (!instance.popperInstance) {
        return;
      } // Ensure virtual reference is padded to prevent tooltip from
      // overflowing. Maybe Popper.js issue?


      var placement = getBasicPlacement(instance.popper);
      var padding = instance.props.arrow ? PADDING + (instance.props.arrowType === 'round' ? 18 : 16) : PADDING;
      var isVerticalPlacement = includes(['top', 'bottom'], placement);
      var isHorizontalPlacement = includes(['left', 'right'], placement); // Top / left boundary

      var x = isVerticalPlacement ? Math.max(padding, clientX) : clientX;
      var y = isHorizontalPlacement ? Math.max(padding, clientY) : clientY; // Bottom / right boundary

      if (isVerticalPlacement && x > padding) {
        x = Math.min(clientX, window.innerWidth - padding);
      }

      if (isHorizontalPlacement && y > padding) {
        y = Math.min(clientY, window.innerHeight - padding);
      }

      var rect = instance.reference.getBoundingClientRect();
      var followCursor = instance.props.followCursor;
      var isHorizontal = followCursor === 'horizontal';
      var isVertical = followCursor === 'vertical';
      instance.popperInstance.reference = _extends$1({}, instance.popperInstance.reference, {
        getBoundingClientRect: function getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            top: isHorizontal ? rect.top : y,
            bottom: isHorizontal ? rect.bottom : y,
            left: isVertical ? rect.left : x,
            right: isVertical ? rect.right : x
          };
        },
        clientWidth: 0,
        clientHeight: 0
      });
      instance.popperInstance.scheduleUpdate();

      if (followCursor === 'initial' && instance.state.isVisible) {
        removeFollowCursorListener();
      }
    }
    /**
     * Creates the tippy instance for a delegate when it's been triggered
     */


    function createDelegateChildTippy(event) {
      if (event) {
        var targetEl = closest(event.target, instance.props.target);

        if (targetEl && !targetEl._tippy) {
          createTippy(targetEl, _extends$1({}, instance.props, {
            content: evaluateValue(collectionProps.content, [targetEl]),
            appendTo: collectionProps.appendTo,
            target: '',
            showOnInit: true
          }));
          scheduleShow(event);
        }
      }
    }
    /**
     * Event listener invoked upon trigger
     */


    function onTrigger(event) {
      if (!instance.state.isEnabled || isEventListenerStopped(event)) {
        return;
      }

      if (!instance.state.isVisible) {
        lastTriggerEventType = event.type;

        if (event instanceof MouseEvent) {
          lastMouseMoveEvent = event;
        }
      } // Toggle show/hide when clicking click-triggered tooltips


      if (event.type === 'click' && instance.props.hideOnClick !== false && instance.state.isVisible) {
        scheduleHide();
      } else {
        scheduleShow(event);
      }
    }
    /**
     * Event listener used for interactive tooltips to detect when they should
     * hide
     */


    function onMouseMove(event) {
      var referenceTheCursorIsOver = closestCallback(event.target, function (el) {
        return el._tippy;
      });
      var isCursorOverPopper = closest(event.target, POPPER_SELECTOR) === instance.popper;
      var isCursorOverReference = referenceTheCursorIsOver === instance.reference;

      if (isCursorOverPopper || isCursorOverReference) {
        return;
      }

      if (isCursorOutsideInteractiveBorder(getBasicPlacement(instance.popper), instance.popper.getBoundingClientRect(), event, instance.props)) {
        cleanupOldMouseListeners();
        scheduleHide();
      }
    }
    /**
     * Event listener invoked upon mouseleave
     */


    function onMouseLeave(event) {
      if (isEventListenerStopped(event)) {
        return;
      }

      if (instance.props.interactive) {
        document.body.addEventListener('mouseleave', scheduleHide);
        document.addEventListener('mousemove', debouncedOnMouseMove);
        return;
      }

      scheduleHide();
    }
    /**
     * Event listener invoked upon blur
     */


    function onBlur(event) {
      if (event.target !== instance.reference) {
        return;
      }

      if (instance.props.interactive && event.relatedTarget && instance.popper.contains(event.relatedTarget)) {
        return;
      }

      scheduleHide();
    }
    /**
     * Event listener invoked when a child target is triggered
     */


    function onDelegateShow(event) {
      if (closest(event.target, instance.props.target)) {
        scheduleShow(event);
      }
    }
    /**
     * Event listener invoked when a child target should hide
     */


    function onDelegateHide(event) {
      if (closest(event.target, instance.props.target)) {
        scheduleHide();
      }
    }
    /**
     * Determines if an event listener should stop further execution due to the
     * `touchHold` option
     */


    function isEventListenerStopped(event) {
      var supportsTouch = 'ontouchstart' in window;
      var isTouchEvent = includes(event.type, 'touch');
      var touchHold = instance.props.touchHold;
      return supportsTouch && isUsingTouch && touchHold && !isTouchEvent || isUsingTouch && !touchHold && isTouchEvent;
    }
    /**
     * Creates the popper instance for the instance
     */


    function createPopperInstance() {
      var popperOptions = instance.props.popperOptions;
      var _instance$popperChild = instance.popperChildren,
          tooltip = _instance$popperChild.tooltip,
          arrow = _instance$popperChild.arrow;
      var preventOverflowModifier = getModifier(popperOptions, 'preventOverflow');

      function applyMutations(data) {
        if (instance.props.flip && !instance.props.flipOnUpdate) {
          if (data.flipped) {
            instance.popperInstance.options.placement = data.placement;
          }

          setFlipModifierEnabled(instance.popperInstance.modifiers, false);
        } // Apply all of the popper's attributes to the tootip node as well.
        // Allows users to avoid using the .tippy-popper selector for themes.


        tooltip.setAttribute(PLACEMENT_ATTRIBUTE, data.placement);

        if (data.attributes[OUT_OF_BOUNDARIES_ATTRIBUTE] !== false) {
          tooltip.setAttribute(OUT_OF_BOUNDARIES_ATTRIBUTE, '');
        } else {
          tooltip.removeAttribute(OUT_OF_BOUNDARIES_ATTRIBUTE);
        } // Prevents a transition when changing placements (while tippy is visible)
        // for scroll/resize updates


        if (previousPlacement && previousPlacement !== data.placement && wasVisibleDuringPreviousUpdate) {
          tooltip.style.transition = 'none';
          requestAnimationFrame(function () {
            tooltip.style.transition = '';
          });
        }

        previousPlacement = data.placement;
        wasVisibleDuringPreviousUpdate = instance.state.isVisible;
        var basicPlacement = getBasicPlacement(instance.popper);
        var styles = tooltip.style; // Account for the `distance` offset

        styles.top = styles.bottom = styles.left = styles.right = '';
        styles[basicPlacement] = getOffsetDistanceInPx(instance.props.distance);
        var padding = preventOverflowModifier && preventOverflowModifier.padding !== undefined ? preventOverflowModifier.padding : PADDING;
        var isPaddingNumber = typeof padding === 'number';

        var computedPadding = _extends$1({
          top: isPaddingNumber ? padding : padding.top,
          bottom: isPaddingNumber ? padding : padding.bottom,
          left: isPaddingNumber ? padding : padding.left,
          right: isPaddingNumber ? padding : padding.right
        }, !isPaddingNumber && padding);

        computedPadding[basicPlacement] = isPaddingNumber ? padding + instance.props.distance : (padding[basicPlacement] || 0) + instance.props.distance;
        instance.popperInstance.modifiers.filter(function (m) {
          return m.name === 'preventOverflow';
        })[0].padding = computedPadding;
      }

      var config = _extends$1({
        placement: instance.props.placement
      }, popperOptions, {
        modifiers: _extends$1({}, popperOptions ? popperOptions.modifiers : {}, {
          preventOverflow: _extends$1({
            boundariesElement: instance.props.boundary,
            padding: PADDING
          }, preventOverflowModifier),
          arrow: _extends$1({
            element: arrow,
            enabled: !!arrow
          }, getModifier(popperOptions, 'arrow')),
          flip: _extends$1({
            enabled: instance.props.flip,
            // The tooltip is offset by 10px from the popper in CSS,
            // we need to account for its distance
            padding: instance.props.distance + PADDING,
            behavior: instance.props.flipBehavior
          }, getModifier(popperOptions, 'flip')),
          offset: _extends$1({
            offset: instance.props.offset
          }, getModifier(popperOptions, 'offset'))
        }),
        // This gets invoked when calling `.set()` and updating a popper
        // instance dependency, since a new popper instance gets created
        onCreate: function onCreate(data) {
          applyMutations(data);

          if (popperOptions && popperOptions.onCreate) {
            popperOptions.onCreate(data);
          }
        },
        // This gets invoked on initial create and show()/scroll/resize update.
        // This is due to `afterPopperPositionUpdates` overwriting onCreate()
        // with onUpdate()
        onUpdate: function onUpdate(data) {
          applyMutations(data);

          if (popperOptions && popperOptions.onUpdate) {
            popperOptions.onUpdate(data);
          }
        }
      });

      instance.popperInstance = new Popper(instance.reference, instance.popper, config);
    }
    /**
     * Mounts the tooltip to the DOM, callback to show tooltip is run **after**
     * popper's position has updated
     */


    function mount(callback) {
      var shouldEnableListeners = !hasFollowCursorBehavior() && !(instance.props.followCursor === 'initial' && isUsingTouch);

      if (!instance.popperInstance) {
        createPopperInstance();

        if (!shouldEnableListeners) {
          instance.popperInstance.disableEventListeners();
        }
      } else {
        if (!hasFollowCursorBehavior()) {
          instance.popperInstance.scheduleUpdate();

          if (shouldEnableListeners) {
            instance.popperInstance.enableEventListeners();
          }
        }

        setFlipModifierEnabled(instance.popperInstance.modifiers, instance.props.flip);
      } // If the instance previously had followCursor behavior, it will be
      // positioned incorrectly if triggered by `focus` afterwards.
      // Update the reference back to the real DOM element


      instance.popperInstance.reference = instance.reference;
      var arrow = instance.popperChildren.arrow;

      if (hasFollowCursorBehavior()) {
        if (arrow) {
          arrow.style.margin = '0';
        }

        if (lastMouseMoveEvent) {
          positionVirtualReferenceNearCursor(lastMouseMoveEvent);
        }
      } else if (arrow) {
        arrow.style.margin = '';
      } // Allow followCursor: 'initial' on touch devices


      if (isUsingTouch && lastMouseMoveEvent && instance.props.followCursor === 'initial') {
        positionVirtualReferenceNearCursor(lastMouseMoveEvent);

        if (arrow) {
          arrow.style.margin = '0';
        }
      }

      afterPopperPositionUpdates(instance.popperInstance, callback);
      var appendTo = instance.props.appendTo;
      currentParentNode = appendTo === 'parent' ? instance.reference.parentNode : evaluateValue(appendTo, [instance.reference]);

      if (!currentParentNode.contains(instance.popper)) {
        currentParentNode.appendChild(instance.popper);
        instance.props.onMount(instance);
        instance.state.isMounted = true;
      }
    }
    /**
     * Setup before show() is invoked (delays, etc.)
     */


    function scheduleShow(event) {
      clearDelayTimeouts();

      if (instance.state.isVisible) {
        return;
      } // Is a delegate, create an instance for the child target


      if (instance.props.target) {
        return createDelegateChildTippy(event);
      }

      isScheduledToShow = true;

      if (instance.props.wait) {
        return instance.props.wait(instance, event);
      } // If the tooltip has a delay, we need to be listening to the mousemove as
      // soon as the trigger event is fired, so that it's in the correct position
      // upon mount.
      // Edge case: if the tooltip is still mounted, but then scheduleShow() is
      // called, it causes a jump.


      if (hasFollowCursorBehavior() && !instance.state.isMounted) {
        document.addEventListener('mousemove', positionVirtualReferenceNearCursor);
      }

      var delay = getValue$1(instance.props.delay, 0, defaultProps.delay);

      if (delay) {
        showTimeoutId = setTimeout(function () {
          show();
        }, delay);
      } else {
        show();
      }
    }
    /**
     * Setup before hide() is invoked (delays, etc.)
     */


    function scheduleHide() {
      clearDelayTimeouts();

      if (!instance.state.isVisible) {
        return removeFollowCursorListener();
      }

      isScheduledToShow = false;
      var delay = getValue$1(instance.props.delay, 1, defaultProps.delay);

      if (delay) {
        hideTimeoutId = setTimeout(function () {
          if (instance.state.isVisible) {
            hide();
          }
        }, delay);
      } else {
        // Fixes a `transitionend` problem when it fires 1 frame too
        // late sometimes, we don't want hide() to be called.
        animationFrameId = requestAnimationFrame(function () {
          hide();
        });
      }
    }
    /* ======================= 🔑 Public methods 🔑 ======================= */

    /**
     * Enables the instance to allow it to show or hide
     */


    function enable() {
      instance.state.isEnabled = true;
    }
    /**
     * Disables the instance to disallow it to show or hide
     */


    function disable() {
      instance.state.isEnabled = false;
    }
    /**
     * Clears pending timeouts related to the `delay` prop if any
     */


    function clearDelayTimeouts() {
      clearTimeout(showTimeoutId);
      clearTimeout(hideTimeoutId);
      cancelAnimationFrame(animationFrameId);
    }
    /**
     * Sets new props for the instance and redraws the tooltip
     */


    function set(options) {
      // Backwards-compatible after TypeScript change
      options = options || {};
      validateOptions(options, defaultProps);
      var prevProps = instance.props;
      var nextProps = evaluateProps(instance.reference, _extends$1({}, instance.props, options, {
        ignoreAttributes: true
      }));
      nextProps.ignoreAttributes = hasOwnProperty$8(options, 'ignoreAttributes') ? options.ignoreAttributes || false : prevProps.ignoreAttributes;
      instance.props = nextProps;

      if (hasOwnProperty$8(options, 'trigger') || hasOwnProperty$8(options, 'touchHold')) {
        removeTriggersFromReference();
        addTriggersToReference();
      }

      if (hasOwnProperty$8(options, 'interactiveDebounce')) {
        cleanupOldMouseListeners();
        debouncedOnMouseMove = debounce$1(onMouseMove, options.interactiveDebounce || 0);
      }

      updatePopperElement(instance.popper, prevProps, nextProps);
      instance.popperChildren = getChildren(instance.popper);

      if (instance.popperInstance) {
        instance.popperInstance.update();

        if (POPPER_INSTANCE_DEPENDENCIES.some(function (prop) {
          return hasOwnProperty$8(options, prop) && options[prop] !== prevProps[prop];
        })) {
          instance.popperInstance.destroy();
          createPopperInstance();

          if (!instance.state.isVisible) {
            instance.popperInstance.disableEventListeners();
          }

          if (instance.props.followCursor && lastMouseMoveEvent) {
            positionVirtualReferenceNearCursor(lastMouseMoveEvent);
          }
        }
      }
    }
    /**
     * Shortcut for .set({ content: newContent })
     */


    function setContent$$1(content) {
      set({
        content: content
      });
    }
    /**
     * Shows the tooltip
     */


    function show() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getValue$1(instance.props.duration, 0, defaultProps.duration[1]);

      if (instance.state.isDestroyed || !instance.state.isEnabled || isUsingTouch && !instance.props.touch) {
        return;
      } // Standardize `disabled` behavior across browsers.
      // Firefox allows events on disabled elements, but Chrome doesn't.
      // Using a wrapper element (i.e. <span>) is recommended.


      if (instance.reference.hasAttribute('disabled')) {
        return;
      }

      if (instance.props.onShow(instance) === false) {
        return;
      }

      instance.popper.style.visibility = 'visible';
      instance.state.isVisible = true;

      if (instance.props.interactive) {
        instance.reference.classList.add(ACTIVE_CLASS);
      }

      var transitionableElements = getTransitionableElements(); // Prevent a transition if the popper is at the opposite placement

      setTransitionDuration(transitionableElements.concat(instance.popper), 0);
      mount(function () {
        if (!instance.state.isVisible) {
          return;
        } // Double update will apply correct mutations


        if (!hasFollowCursorBehavior()) {
          instance.popperInstance.update();
        }

        if (instance.popperChildren.backdrop) {
          instance.popperChildren.content.style.transitionDelay = Math.round(duration / 12) + 'ms';
        }

        if (instance.props.sticky) {
          makeSticky();
        }

        setTransitionDuration([instance.popper], props.updateDuration);
        setTransitionDuration(transitionableElements, duration);
        setVisibilityState(transitionableElements, 'visible');
        onTransitionedIn(duration, function () {
          if (instance.props.aria) {
            instance.reference.setAttribute("aria-".concat(instance.props.aria), instance.popper.id);
          }

          instance.props.onShown(instance);
          instance.state.isShown = true;
        });
      });
    }
    /**
     * Hides the tooltip
     */


    function hide() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getValue$1(instance.props.duration, 1, defaultProps.duration[1]);

      if (instance.state.isDestroyed || !instance.state.isEnabled) {
        return;
      }

      if (instance.props.onHide(instance) === false) {
        return;
      }

      instance.popper.style.visibility = 'hidden';
      instance.state.isVisible = false;
      instance.state.isShown = false;
      wasVisibleDuringPreviousUpdate = false;

      if (instance.props.interactive) {
        instance.reference.classList.remove(ACTIVE_CLASS);
      }

      var transitionableElements = getTransitionableElements();
      setTransitionDuration(transitionableElements, duration);
      setVisibilityState(transitionableElements, 'hidden');
      onTransitionedOut(duration, function () {
        if (!isScheduledToShow) {
          removeFollowCursorListener();
        }

        if (instance.props.aria) {
          instance.reference.removeAttribute("aria-".concat(instance.props.aria));
        }

        instance.popperInstance.disableEventListeners();
        instance.popperInstance.options.placement = instance.props.placement;
        currentParentNode.removeChild(instance.popper);
        instance.props.onHidden(instance);
        instance.state.isMounted = false;
      });
    }
    /**
     * Destroys the tooltip
     */


    function destroy(destroyTargetInstances) {
      if (instance.state.isDestroyed) {
        return;
      } // If the popper is currently mounted to the DOM, we want to ensure it gets
      // hidden and unmounted instantly upon destruction


      if (instance.state.isMounted) {
        hide(0);
      }

      removeTriggersFromReference();
      delete instance.reference._tippy;

      if (instance.props.target && destroyTargetInstances) {
        arrayFrom(instance.reference.querySelectorAll(instance.props.target)).forEach(function (child) {
          if (child._tippy) {
            child._tippy.destroy();
          }
        });
      }

      if (instance.popperInstance) {
        instance.popperInstance.destroy();
      }

      instance.state.isDestroyed = true;
    }
  }

  /**
   * Groups an array of instances by taking control of their props during
   * certain lifecycles.
   */

  function group(instances) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$delay = _ref.delay,
        delay = _ref$delay === void 0 ? instances[0].props.delay : _ref$delay,
        _ref$duration = _ref.duration,
        duration = _ref$duration === void 0 ? 0 : _ref$duration;

    // Already grouped. Cannot group instances more than once (yet) or stale lifecycle
    // closures will be invoked, causing a stack overflow
    if (instances.some(function (instance) {
      return hasOwnProperty$8(instance, '_originalProps');
    })) {
      return;
    }

    var isAnyTippyOpen = false;
    instances.forEach(function (instance) {
      instance._originalProps = _extends$1({}, instance.props);
    });

    function setIsAnyTippyOpen(value) {
      isAnyTippyOpen = value;
      updateInstances();
    }

    function onShow(instance) {
      instance._originalProps.onShow(instance);

      instances.forEach(function (instance) {
        instance.set({
          duration: duration
        });
        instance.hide();
      });
      setIsAnyTippyOpen(true);
    }

    function onHide(instance) {
      instance._originalProps.onHide(instance);

      setIsAnyTippyOpen(false);
    }

    function onShown(instance) {
      instance._originalProps.onShown(instance);

      instance.set({
        duration: instance._originalProps.duration
      });
    }

    function updateInstances() {
      instances.forEach(function (instance) {
        instance.set({
          onShow: onShow,
          onShown: onShown,
          onHide: onHide,
          delay: isAnyTippyOpen ? [0, Array.isArray(delay) ? delay[1] : delay] : delay,
          duration: isAnyTippyOpen ? duration : instance._originalProps.duration
        });
      });
    }

    updateInstances();
  }

  var globalEventListenersBound = false;
  /**
   * Exported module
   */

  function tippy(targets, options) {
    validateOptions(options || {}, defaultProps);

    if (!globalEventListenersBound) {
      bindGlobalEventListeners();
      globalEventListenersBound = true;
    }

    var props = _extends$1({}, defaultProps, options); // If they are specifying a virtual positioning reference, we need to polyfill
    // some native DOM props


    if (isBareVirtualElement(targets)) {
      polyfillElementPrototypeProperties(targets);
    }

    var instances = getArrayOfElements(targets).reduce(function (acc, reference) {
      var instance = reference && createTippy(reference, props);

      if (instance) {
        acc.push(instance);
      }

      return acc;
    }, []);
    return isSingular(targets) ? instances[0] : instances;
  }
  /**
   * Static props
   */


  tippy.version = version;
  tippy.defaults = defaultProps;
  /**
   * Static methods
   */

  tippy.setDefaults = function (partialDefaults) {
    Object.keys(partialDefaults).forEach(function (key) {
      // @ts-ignore
      defaultProps[key] = partialDefaults[key];
    });
  };

  tippy.hideAll = hideAll;
  tippy.group = group;
  /**
   * Auto-init tooltips for elements with a `data-tippy="..."` attribute
   */

  function autoInit() {
    arrayFrom(document.querySelectorAll('[data-tippy]')).forEach(function (el) {
      var content = el.getAttribute('data-tippy');

      if (content) {
        tippy(el, {
          content: content
        });
      }
    });
  }

  if (isBrowser$1) {
    setTimeout(autoInit);
  }

  /**
   * Injects a string of CSS styles to a style node in <head>
   */

  function injectCSS(css) {
    if (isBrowser$1) {
      var style = document.createElement('style');
      style.type = 'text/css';
      style.textContent = css;
      var head = document.head;
      var firstChild = head.firstChild;

      if (firstChild) {
        head.insertBefore(style, firstChild);
      } else {
        head.appendChild(style);
      }
    }
  }

  injectCSS(css);

  const missingTippy = 'Using the attachment feature of Shepherd requires the Tippy.js library';

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
  }; // Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)

  const defaultPopperOptions = {
    positionFixed: true
  };
  /**
   * TODO rewrite the way items are being added to use more performant documentFragment code
   * @param html
   * @return {HTMLElement} The element created from the passed HTML string
   */

  function createFromHTML(html) {
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

  function _parseAttachToOpts(opts) {
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

  function parseShorthand(obj, props) {
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

  function setupTooltip() {
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

  function parseAttachTo() {
    const options = _parseAttachToOpts(this.options.attachTo) || {};
    const returnOpts = Object.assign({}, options);

    if (isString(options.element)) {
      // Can't override the element in user opts reference because we can't
      // guarantee that the element will exist in the future.
      try {
        returnOpts.element = document.querySelector(options.element);
      } catch (e) {// TODO
      }

      if (!returnOpts.element) {
        console.error("The element for this Shepherd step was not found ".concat(options.element));
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
      resultingTippyOptions.theme = existingTheme ? "".concat(existingTheme, " shepherd-has-title") : 'shepherd-has-title';
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
    const tippyOptions = _objectSpread({
      content: this.el,
      placement: 'top'
    }, this.options.tippyOptions);

    tippyOptions.arrow = false;
    tippyOptions.popperOptions = tippyOptions.popperOptions || {};
    const finalPopperOptions = Object.assign({}, defaultPopperOptions, tippyOptions.popperOptions, {
      modifiers: Object.assign(centeredStylePopperModifier, tippyOptions.popperOptions.modifiers)
    });
    tippyOptions.popperOptions = finalPopperOptions;
    return tippy(document.body, tippyOptions);
  }

  /**
   * Sets up the handler to determine if we should advance the tour
   * @private
   */

  function _setupAdvanceOnHandler(selector) {
    return event => {
      if (this.isOpen()) {
        const targetIsEl = this.el && event.target === this.el;
        const targetIsSelector = !isUndefined(selector) && event.target.matches(selector);

        if (targetIsSelector || targetIsEl) {
          this.tour.next();
        }
      }
    };
  }
  /**
   * Bind the event handler for advanceOn
   */


  function bindAdvance() {
    // An empty selector matches the step element
    const _parseShorthand = parseShorthand(this.options.advanceOn, ['selector', 'event']),
          event = _parseShorthand.event,
          selector = _parseShorthand.selector;

    const handler = _setupAdvanceOnHandler.call(this, selector); // TODO: this should also bind/unbind on show/hide


    const el = document.querySelector(selector);

    if (!isUndefined(selector) && el) {
      el.addEventListener(event, handler);
    } else {
      document.body.addEventListener(event, handler, true);
    }

    this.on('destroy', () => {
      return document.body.removeEventListener(event, handler, true);
    });
  }
  /**
   * Bind events to the buttons for next, back, etc
   * @param {Object} cfg An object containing the config options for the button
   * @param {HTMLElement} el The element for the button
   */

  function bindButtonEvents(cfg, el) {
    cfg.events = cfg.events || {};

    if (!isUndefined(cfg.action)) {
      // Including both a click event and an action is not supported
      cfg.events.click = cfg.action;
    }

    forOwn(cfg.events, (handler, event) => {
      if (isString(handler)) {
        const page = handler;

        handler = () => this.tour.show(page);
      }

      el.dataset.buttonEvent = true;
      el.addEventListener(event, handler); // Cleanup event listeners on destroy

      this.on('destroy', () => {
        el.removeAttribute('data-button-event');
        el.removeEventListener(event, handler);
      });
    });
  }
  /**
   * Add a click listener to the cancel link that cancels the tour
   * @param {HTMLElement} link The cancel link element
   */

  function bindCancelLink(link) {
    link.addEventListener('click', e => {
      e.preventDefault();
      this.cancel();
    });
  }
  /**
   * Take an array of strings and look up methods by name, then bind them to `this`
   * @param {String[]} methods The names of methods to bind
   */

  function bindMethods(methods) {
    methods.map(method => {
      this[method] = this[method].bind(this);
    });
  }

  /**
   * Creates incremented ID for each newly created step
   *
   * @private
   * @return {Number} The unique id for the step
   */

  const uniqueId = function () {
    let id = 0;
    return function () {
      return ++id;
    };
  }();
  /**
   * Class representing steps to be added to a tour
   * @extends {Evented}
   */


  class Step extends Evented {
    /**
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
     */
    constructor(tour, options) {
      super(tour, options);
      this.tour = tour;
      bindMethods.call(this, ['_show', 'cancel', 'complete', 'destroy', 'hide', 'isOpen', 'scrollTo', 'setupElements', 'show']);
      this.setOptions(options);
      this.bindAdvance = bindAdvance.bind(this);
      this.bindButtonEvents = bindButtonEvents.bind(this);
      this.bindCancelLink = bindCancelLink.bind(this);
      this.setupTooltip = setupTooltip.bind(this);
      this.parseAttachTo = parseAttachTo.bind(this);
      return this;
    }
    /**
     * Adds buttons to the step as passed into options
     *
     * @private
     * @param {HTMLElement} content The element for the step, to append the footer with buttons to
     */


    _addButtons(content) {
      if (!isEmpty(this.options.buttons)) {
        const footer = document.createElement('footer');
        const buttons = createFromHTML('<ul class="shepherd-buttons"></ul>');
        footer.classList.add('shepherd-footer');
        this.options.buttons.map(cfg => {
          const button = createFromHTML("<li><a class=\"shepherd-button ".concat(cfg.classes || '', "\" tabindex=\"0\">").concat(cfg.text, "</a>"));
          buttons.appendChild(button);
          this.bindButtonEvents(cfg, button.querySelector('a'));
        });
        footer.appendChild(buttons);
        content.appendChild(footer);
      }
    }
    /**
     * Adds the "x" button to cancel the tour
     * @param {HTMLElement} element The step element
     * @param {HTMLElement} header The header element for the step
     * @private
     */


    _addCancelLink(element, header) {
      if (this.options.showCancelLink) {
        const link = createFromHTML('<a href class="shepherd-cancel-link"></a>');
        header.appendChild(link);
        element.classList.add('shepherd-has-cancel-link');
        this.bindCancelLink(link);
      }
    }
    /**
     * Adds text passed in as options
     *
     * @private
     * @param {HTMLElement} content The content to append the text to
     */


    _addContent(content) {
      const text = createFromHTML('<div class="shepherd-text"></div>');
      let paragraphs = this.options.text;

      if (isFunction(paragraphs)) {
        paragraphs = paragraphs.call(this, text);
      }

      if (paragraphs instanceof HTMLElement) {
        text.appendChild(paragraphs);
      } else {
        if (isString(paragraphs)) {
          paragraphs = [paragraphs];
        }

        paragraphs.map(paragraph => {
          text.innerHTML += "<p>".concat(paragraph, "</p>");
        });
      }

      content.appendChild(text);
    }
    /**
     * Creates Shepherd element for step based on options
     *
     * @private
     * @return {HTMLElement} The DOM element for the step tooltip
     */


    _createTooltipContent() {
      const content = document.createElement('div');
      const classes = this.options.classes || '';
      const element = createFromHTML("<div class=\"".concat(classes, "\" data-shepherd-step-id=\"").concat(this.id, "\">"));
      const header = document.createElement('header');

      if (this.options.title) {
        const title = document.createElement('h3');
        title.classList.add('shepherd-title');
        title.innerHTML = "".concat(this.options.title);
        header.appendChild(title);
        element.classList.add('shepherd-has-title');
      }

      content.classList.add('shepherd-content');
      header.classList.add('shepherd-header');
      element.appendChild(content);
      content.appendChild(header);

      if (!isUndefined(this.options.text)) {
        this._addContent(content);
      }

      this._addButtons(content);

      this._addCancelLink(element, header);

      return element;
    }
    /**
     * Returns the tour for the step
     * @return {Tour} The tour instance
     */


    getTour() {
      return this.tour;
    }
    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */


    cancel() {
      this.tour.cancel();
      this.trigger('cancel');
    }
    /**
     * Complete the tour
     * Triggers the `complete` event
     */


    complete() {
      this.tour.complete();
      this.trigger('complete');
    }
    /**
     * Remove the step, delete the step's element, and destroy the tippy instance for the step
     * Triggers `destroy` event
     */


    destroy() {
      if (this.tooltip) {
        this.tooltip.destroy();
        this.tooltip = null;
      }

      if (isElement(this.el) && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        this.el = null;
      }

      if (this.target) {
        this._updateStepTargetOnHide();
      }

      this.trigger('destroy');
    }
    /**
     * Hide the step and destroy the tippy instance
     */


    hide() {
      this.tour.modal.hide();
      this.trigger('before-hide');
      document.body.removeAttribute('data-shepherd-step');

      if (this.target) {
        this._updateStepTargetOnHide();
      }

      if (this.tooltip) {
        this.tooltip.hide();
      }

      this.trigger('hide');
    }
    /**
     * Check if the step is open and visible
     * @return {boolean} True if the step is open and visible
     */


    isOpen() {
      return Boolean(this.tooltip && this.tooltip.state && this.tooltip.state.isVisible);
    }
    /**
     * Create the element and set up the tippy instance
     */


    setupElements() {
      if (!isUndefined(this.el)) {
        this.destroy();
      }

      this.el = this._createTooltipContent();

      if (this.options.advanceOn) {
        this.bindAdvance();
      }

      this.setupTooltip();
    }
    /**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     */


    scrollTo() {
      const _this$parseAttachTo = this.parseAttachTo(),
            element = _this$parseAttachTo.element;

      if (isFunction(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if (isElement(element)) {
        element.scrollIntoView();
      }
    }
    /**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param {Object} options The options for the step
     */


    setOptions() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options = options;
      const when = this.options.when;
      this.destroy();
      this.id = this.options.id || "step-".concat(uniqueId());
      forOwn(when, (handler, event) => {
        this.on(event, handler, this);
      });
    }
    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     * @return {*|Promise}
     */


    show() {
      if (isFunction(this.options.beforeShowPromise)) {
        const beforeShowPromise = this.options.beforeShowPromise();

        if (!isUndefined(beforeShowPromise)) {
          return beforeShowPromise.then(() => this._show());
        }
      }

      this._show();
    }
    /**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a tippy instance for the tooltip, then triggers `show`.
     * @private
     */


    _show() {
      this.tour.beforeShowStep(this);
      this.trigger('before-show');

      if (!this.el) {
        this.setupElements();
      }

      this.target.classList.add('shepherd-enabled', 'shepherd-target');
      document.body.setAttribute('data-shepherd-step', this.id);

      if (this.options.scrollTo) {
        setTimeout(() => {
          this.scrollTo();
        });
      }

      this.tooltip.show();
      this.trigger('show');
    }

    _updateStepTargetOnHide() {
      if (this.options.highlightClass) {
        this.target.classList.remove(this.options.highlightClass);
      }

      this.target.classList.remove('shepherd-enabled', 'shepherd-target');
    }

  }

  /** `Object#toString` result references. */
  var numberTag$1 = '[object Number]';

  /**
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
   */
  function isNumber(value) {
    return typeof value == 'number' ||
      (isObjectLike(value) && baseGetTag(value) == numberTag$1);
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const elementIds = {
    modalOverlay: 'shepherdModalOverlayContainer',
    modalOverlayMask: 'shepherdModalMask',
    modalOverlayMaskRect: 'shepherdModalMaskRect',
    modalOverlayMaskOpening: 'shepherdModalMaskOpening'
  };
  const classNames = {
    isVisible: 'shepherd-modal-is-visible',
    modalTarget: 'shepherd-modal-target'
  };
  /**
   * <svg id="shepherdModalOverlayContainer" xmlns="http://www.w3.org/2000/svg">
   */

  function _createModalContainer() {
    const element = document.createElementNS(svgNS, 'svg');
    element.setAttributeNS(null, 'id', elementIds.modalOverlay);
    return element;
  }
  /**
   * <mask id="shepherdModalMask" x="0" y="0" width="100%" height="100%">
   */


  function _createMaskContainer() {
    const element = document.createElementNS(svgNS, 'mask');

    _setAttributes(element, {
      height: '100%',
      id: elementIds.modalOverlayMask,
      width: '100%',
      x: '0',
      y: '0'
    });

    return element;
  }
  /**
   *  <rect id="modalOverlayMaskRect" x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
   */


  function _createMaskRect() {
    const element = document.createElementNS(svgNS, 'rect');

    _setAttributes(element, {
      fill: '#FFFFFF',
      height: '100%',
      id: elementIds.modalOverlayMaskRect,
      width: '100%',
      x: '0',
      y: '0'
    });

    return element;
  }
  /**
   * <rect id="shepherdModalMaskOpening" fill="#000000"/>
   */


  function _createMaskOpening() {
    const element = document.createElementNS(svgNS, 'rect');

    _setAttributes(element, {
      fill: '#000000',
      id: elementIds.modalOverlayMaskOpening
    });

    return element;
  }
  /**
   * <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
   */


  function _createMaskConsumer() {
    const element = document.createElementNS(svgNS, 'rect');

    _setAttributes(element, {
      height: '100%',
      width: '100%',
      x: '0',
      y: '0'
    });

    element.setAttribute('mask', "url(#".concat(elementIds.modalOverlayMask, ")"));
    return element;
  }
  /**
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
   */


  function createModalOverlay() {
    const containerElement = _createModalContainer();

    const defsElement = document.createElementNS(svgNS, 'defs');

    const maskContainer = _createMaskContainer();

    const maskRect = _createMaskRect();

    const maskOpening = _createMaskOpening();

    const maskConsumer = _createMaskConsumer();

    maskContainer.appendChild(maskRect);
    maskContainer.appendChild(maskOpening);
    defsElement.appendChild(maskContainer);
    containerElement.appendChild(defsElement);
    containerElement.appendChild(maskConsumer);
    return containerElement;
  }
  /**
   * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
   * @param {HTMLElement} targetElement The element the opening will expose
   * @param {SVGElement} openingElement The svg mask for the opening
   */


  function positionModalOpening(targetElement, openingElement) {
    if (targetElement.getBoundingClientRect && openingElement instanceof SVGElement) {
      const _targetElement$getBou = targetElement.getBoundingClientRect(),
            x = _targetElement$getBou.x,
            y = _targetElement$getBou.y,
            width = _targetElement$getBou.width,
            height = _targetElement$getBou.height,
            left = _targetElement$getBou.left,
            top = _targetElement$getBou.top; // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top


      _setAttributes(openingElement, {
        x: x || left,
        y: y || top,
        width,
        height
      });
    }
  }

  function closeModalOpening(openingElement) {
    if (openingElement && openingElement instanceof SVGElement) {
      _setAttributes(openingElement, {
        height: '0',
        x: '0',
        y: '0',
        width: '0'
      });
    }
  }

  function getModalMaskOpening(modalElement) {
    return modalElement.querySelector("#".concat(elementIds.modalOverlayMaskOpening));
  }

  function preventModalBodyTouch(event) {
    event.preventDefault();
  }

  function preventModalOverlayTouch(event) {
    event.stopPropagation();
  }
  /**
   * Remove any leftover modal target classes and add the modal target class to the currentElement
   * @param {HTMLElement} currentElement The element for the current step
   */


  function toggleShepherdModalClass(currentElement) {
    const shepherdModal = document.querySelector("".concat(classNames.modalTarget));

    if (shepherdModal) {
      shepherdModal.classList.remove(classNames.modalTarget);
    }

    currentElement.classList.add(classNames.modalTarget);
  }
  /**
   * Set multiple attributes on an element, via a hash
   * @param {HTMLElement|SVGElement} el The element to set the attributes on
   * @param {Object} attrs A hash of key value pairs for attributes to set
   * @private
   */


  function _setAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => {
      el.setAttribute(key, attrs[key]);
    });
  }

  /**
   * Get the element from an option object
   *
   * @method getElementFromObject
   * @param Object attachTo
   * @returns {Element}
   * @private
   */


  function getElementFromObject(attachTo) {
    const op = attachTo.element;

    if (op instanceof HTMLElement) {
      return op;
    }

    return document.querySelector(op);
  }
  /**
   * Return the element for a step
   *
   * @method getElementForStep
   * @param step step the step to get an element for
   * @returns {Element} the element for this step
   * @private
   */


  function getElementForStep(step) {
    const attachTo = step.options.attachTo;

    if (!attachTo) {
      return null;
    }

    const type = typeof attachTo;
    let element;

    if (type === 'string') {
      element = getElementFromString(attachTo);
    } else if (type === 'object') {
      element = getElementFromObject(attachTo);
    } else {
      /* istanbul ignore next: cannot test undefined attachTo, but it does work! */
      element = null;
    }

    return element;
  }
  /**
   * Get the element from an option string
   *
   * @method getElementFromString
   * @param element the string in the step configuration
   * @returns {Element} the element from the string
   * @private
   */


  function getElementFromString(element) {
    const _element$split = element.split(' '),
          _element$split2 = _slicedToArray(_element$split, 1),
          selector = _element$split2[0];

    return document.querySelector(selector);
  }

  function addStepEventListeners() {
    if (typeof this._onScreenChange === 'function') {
      window.removeEventListener('resize', this._onScreenChange, false);
      window.removeEventListener('scroll', this._onScreenChange, true);
    }

    window.addEventListener('resize', this._onScreenChange, false);
    window.addEventListener('scroll', this._onScreenChange, true);
    const overlay = document.querySelector("#".concat(elementIds.modalOverlay)); // Prevents window from moving on touch.

    window.addEventListener('touchmove', preventModalBodyTouch, {
      passive: false
    }); // Allows content to move on touch.

    if (overlay) {
      overlay.addEventListener('touchmove', preventModalOverlayTouch, false);
    }
  }

  /**
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
   */
  var now = function() {
    return root.Date.now();
  };

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max,
      nativeMin = Math.min;

  /**
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
   */
  function debounce$2(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;

    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;

      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }

    function leadingEdge(time) {
      // Reset any `maxWait` timer.
      lastInvokeTime = time;
      // Start the timer for the trailing edge.
      timerId = setTimeout(timerExpired, wait);
      // Invoke the leading edge.
      return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;

      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }

    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;

      // Either this is the first call, activity has stopped and we're at the
      // trailing edge, the system time has gone backwards and we're treating
      // it as the trailing edge, or we've hit the `maxWait` limit.
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }

    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      // Restart the timer.
      timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
      timerId = undefined;

      // Only invoke if we have `lastArgs` which means `func` has been
      // debounced at least once.
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }

    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }

    function debounced() {
      var time = now(),
          isInvoking = shouldInvoke(time);

      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;

      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          // Handle invocations in a tight loop.
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }

  /** Error message constants. */
  var FUNC_ERROR_TEXT$1 = 'Expected a function';

  /**
   * The base implementation of `_.delay` and `_.defer` which accepts `args`
   * to provide to `func`.
   *
   * @private
   * @param {Function} func The function to delay.
   * @param {number} wait The number of milliseconds to delay invocation.
   * @param {Array} args The arguments to provide to `func`.
   * @returns {number|Object} Returns the timer id or timeout object.
   */
  function baseDelay(func, wait, args) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    return setTimeout(function() { func.apply(undefined, args); }, wait);
  }

  /**
   * A faster alternative to `Function#apply`, this function invokes `func`
   * with the `this` binding of `thisArg` and the arguments of `args`.
   *
   * @private
   * @param {Function} func The function to invoke.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {Array} args The arguments to invoke `func` with.
   * @returns {*} Returns the result of `func`.
   */
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0: return func.call(thisArg);
      case 1: return func.call(thisArg, args[0]);
      case 2: return func.call(thisArg, args[0], args[1]);
      case 3: return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeMax$1 = Math.max;

  /**
   * A specialized version of `baseRest` which transforms the rest array.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @param {Function} transform The rest array transform.
   * @returns {Function} Returns the new function.
   */
  function overRest(func, start, transform) {
    start = nativeMax$1(start === undefined ? (func.length - 1) : start, 0);
    return function() {
      var args = arguments,
          index = -1,
          length = nativeMax$1(args.length - start, 0),
          array = Array(length);

      while (++index < length) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }

  /**
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
   */
  function constant(value) {
    return function() {
      return value;
    };
  }

  /**
   * The base implementation of `setToString` without support for hot loop shorting.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, 'toString', {
      'configurable': true,
      'enumerable': false,
      'value': constant(string),
      'writable': true
    });
  };

  /** Used to detect hot functions by number of calls within a span of milliseconds. */
  var HOT_COUNT = 800,
      HOT_SPAN = 16;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeNow = Date.now;

  /**
   * Creates a function that'll short out and invoke `identity` instead
   * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
   * milliseconds.
   *
   * @private
   * @param {Function} func The function to restrict.
   * @returns {Function} Returns the new shortable function.
   */
  function shortOut(func) {
    var count = 0,
        lastCalled = 0;

    return function() {
      var stamp = nativeNow(),
          remaining = HOT_SPAN - (stamp - lastCalled);

      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(undefined, arguments);
    };
  }

  /**
   * Sets the `toString` method of `func` to return `string`.
   *
   * @private
   * @param {Function} func The function to modify.
   * @param {Function} string The `toString` result.
   * @returns {Function} Returns `func`.
   */
  var setToString = shortOut(baseSetToString);

  /**
   * The base implementation of `_.rest` which doesn't validate or coerce arguments.
   *
   * @private
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   */
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + '');
  }

  /**
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
   */
  var defer = baseRest(function(func, args) {
    return baseDelay(func, 1, args);
  });

  class Modal {
    constructor(options) {
      this.createModalOverlay();
      this.options = options;
      return this;
    }
    /**
     * Removes svg mask from modal overlay and removes classes for modal being visible
     */


    cleanup() {
      defer(() => {
        const element = this._modalOverlayElem;

        if (element && element instanceof SVGElement) {
          element.parentNode.removeChild(element);
        }

        this._modalOverlayElem = null;
        document.body.classList.remove(classNames.isVisible);
      });
    }
    /**
     * Create the modal overlay, if it does not already exist
     */


    createModalOverlay() {
      if (!this._modalOverlayElem) {
        this._modalOverlayElem = createModalOverlay();
        this._modalOverlayOpening = getModalMaskOpening(this._modalOverlayElem); // don't show yet -- each step will control that

        this.hide();
        document.body.appendChild(this._modalOverlayElem);
      }
    }
    /**
     * Hide the modal overlay
     */


    hide() {
      document.body.classList.remove(classNames.isVisible);

      if (this._modalOverlayElem) {
        this._modalOverlayElem.style.display = 'none';
      }
    }
    /**
     * If modal is enabled, setup the svg mask opening and modal overlay for the step
     * @param step
     */


    setupForStep(step) {
      if (this.options.useModalOverlay) {
        this._styleForStep(step);

        this.show();
      } else {
        this.hide();
      }
    }
    /**
     * Show the modal overlay
     */


    show() {
      document.body.classList.add(classNames.isVisible);

      if (this._modalOverlayElem) {
        this._modalOverlayElem.style.display = 'block';
      }
    }
    /**
     * Style the modal for the step
     * @param {Step} step The step to style the opening for
     * @private
     */


    _styleForStep(step) {
      const modalOverlayOpening = this._modalOverlayOpening;
      const targetElement = getElementForStep(step);

      if (targetElement) {
        positionModalOpening(targetElement, modalOverlayOpening);
        this._onScreenChange = debounce$2(positionModalOpening.bind(this, targetElement, modalOverlayOpening), 0, {
          leading: false,
          trailing: true // see https://lodash.com/docs/#debounce

        });
        addStepEventListeners.call(this);
      } else {
        closeModalOpening(this._modalOverlayOpening);
      }
    }

  }

  const defaults = {
    trigger: 'manual',
    arrow: true,
    animation: 'fade',
    duration: 420,
    flip: true,
    animateFill: false,
    // https://atomiks.github.io/tippyjs/#animate-fill-option
    interactive: true,
    // https://atomiks.github.io/tippyjs/#interactive-option
    hideOnClick: 'toggle',
    // https://atomiks.github.io/tippyjs/#hide-on-click-option
    multiple: true // https://atomiks.github.io/tippyjs/#multiple-option

  };

  /**
   * Cleanup the steps and set pointerEvents back to 'auto'
   * @param tour The tour object
   */

  function cleanupSteps(tour) {
    if (tour) {
      const steps = tour.steps;
      steps.forEach(step => {
        if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
          const stepElement = getElementForStep(step);

          if (stepElement instanceof HTMLElement) {
            stepElement.style.pointerEvents = 'auto';
          }
        }
      });
    }
  }
  /**
   * Remove resize and scroll event listeners
   */

  function cleanupStepEventListeners() {
    if (typeof this._onScreenChange === 'function') {
      window.removeEventListener('resize', this._onScreenChange, false);
      window.removeEventListener('scroll', this._onScreenChange, false);
      this._onScreenChange = null;
    }

    window.removeEventListener('touchmove', preventModalBodyTouch, {
      passive: false
    });
  }

  /**
   * Creates incremented ID for each newly created tour
   *
   * @private
   * @return {Number} The unique id for the tour
   */

  const uniqueId$1 = function () {
    let id = 0;
    return function () {
      return ++id;
    };
  }();

  const Shepherd = new Evented();
  /**
   * Class representing the site tour
   * @extends {Evented}
   */

  class Tour extends Evented {
    /**
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
     */
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      super(options);
      bindMethods.call(this, ['back', 'cancel', 'complete', 'hide', 'next']);
      this.options = options;
      this.steps = this.options.steps || []; // Pass these events onto the global Shepherd object

      const events = ['active', 'cancel', 'complete', 'inactive', 'show', 'start'];
      events.map(event => {
        (e => {
          this.on(e, opts => {
            opts = opts || {};
            opts.tour = this;
            Shepherd.trigger(e, opts);
          });
        })(event);
      });
      this.modal = new Modal(options);

      this._setTooltipDefaults();

      this._setTourID();

      return this;
    }
    /**
     * Adds a new step to the tour
     * @param {Object|Number|Step|String} arg1
     * When arg2 is defined, arg1 can either be a string or number, to use for the `id` for the step
     * When arg2 is undefined, arg1 is either an object containing step options or a Step instance
     * @param {Object|Step} arg2 An object containing step options or a Step instance
     * @return {Step} The newly added step
     */


    addStep(arg1, arg2) {
      let name, step; // If we just have one argument, we can assume it is an object of step options, with an id

      if (isUndefined(arg2)) {
        step = arg1;
      } else {
        name = arg1;
        step = arg2;
      }

      if (!(step instanceof Step)) {
        step = this.setupStep(step, name);
      } else {
        step.tour = this;
      }

      this.steps.push(step);
      return step;
    }
    /**
     * Go to the previous step in the tour
     */


    back() {
      const index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }
    /**
     * Calls done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     */


    cancel() {
      if (this.options.confirmCancel) {
        const cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
        const stopTour = window.confirm(cancelMessage);

        if (stopTour) {
          this.done('cancel');
        }
      } else {
        this.done('cancel');
      }
    }
    /**
     * Calls done() triggering the `complete` event
     */


    complete() {
      this.done('complete');
    }
    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {String} event The event name to trigger
     */


    done(event) {
      if (!isEmpty(this.steps)) {
        this.steps.forEach(step => step.destroy());
      }

      cleanupStepEventListeners.call(this);
      cleanupSteps(this.tourObject);
      this.modal.cleanup();
      this.trigger(event);
      Shepherd.activeTour = null;

      this._removeBodyAttrs();

      this.trigger('inactive', {
        tour: this
      });
    }
    /**
     * Gets the step from a given id
     * @param {Number|String} id The id of the step to retrieve
     * @return {Step} The step corresponding to the `id`
     */


    getById(id) {
      return this.steps.find(step => {
        return step.id === id;
      });
    }
    /**
     * Gets the current step
     * @returns {Step|null}
     */


    getCurrentStep() {
      return this.currentStep;
    }
    /**
     * Hide the current step
     */


    hide() {
      const currentStep = this.getCurrentStep();

      if (currentStep) {
        return currentStep.hide();
      }
    }

    isActive() {
      return Shepherd.activeTour === this;
    }
    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */


    next() {
      const index = this.steps.indexOf(this.currentStep);

      if (index === this.steps.length - 1) {
        this.complete();
      } else {
        this.show(index + 1, true);
      }
    }
    /**
     * Removes the step from the tour
     * @param {String} name The id for the step to remove
     */


    removeStep(name) {
      const current = this.getCurrentStep(); // Find the step, destroy it and remove it from this.steps

      this.steps.some((step, i) => {
        if (step.id === name) {
          if (step.isOpen()) {
            step.hide();
          }

          step.destroy();
          this.steps.splice(i, 1);
          return true;
        }
      });

      if (current && current.id === name) {
        this.currentStep = undefined; // If we have steps left, show the first one, otherwise just cancel the tour

        this.steps.length ? this.show(0) : this.cancel();
      }
    }
    /**
     * Setup a new step object
     * @param {Object} stepOptions The object describing the options for the step
     * @param {String|Number} name The string or number to use as the `id` for the step
     * @return {Step} The step instance
     */


    setupStep(stepOptions, name) {
      if (isString(name) || isNumber(name)) {
        stepOptions.id = name.toString();
      }

      stepOptions = Object.assign({}, this.options.defaultStepOptions, stepOptions);
      return new Step(this, stepOptions);
    }

    beforeShowStep(step) {
      this.modal.setupForStep(step);

      this._styleTargetElementForStep(step);
    }
    /**
     * Show a specific step in the tour
     * @param {Number|String} key The key to look up the step by
     * @param {Boolean} forward True if we are going forward, false if backward
     */


    show() {
      let key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      let forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      const step = isString(key) ? this.getById(key) : this.steps[key];

      if (step) {
        this._updateStateBeforeShow();

        const shouldSkipStep = isFunction(step.options.showOn) && !step.options.showOn(); // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal

        if (shouldSkipStep) {
          this._skipStep(step, forward);
        } else {
          this.trigger('show', {
            step,
            previous: this.currentStep
          });
          this.currentStep = step;
          step.show();
        }
      }
    }
    /**
     * Start the tour
     */


    start() {
      this.trigger('start');
      this.currentStep = null;

      this._setupActiveTour();

      addStepEventListeners.call(this);
      this.next();
    }
    /**
     * Make this tour "active"
     * @private
     */


    _setupActiveTour() {
      this.modal.createModalOverlay();

      this._addBodyAttrs();

      this.trigger('active', {
        tour: this
      });
      Shepherd.activeTour = this;
    }
    /**
     * Modulates the styles of the passed step's target element, based on the step's options and
     * the tour's `modal` option, to visually emphasize the element
     *
     * @param step The step object that attaches to the element
     * @private
     */


    _styleTargetElementForStep(step) {
      const targetElement = getElementForStep(step);

      if (!targetElement) {
        return;
      }

      toggleShepherdModalClass(targetElement);

      if (step.options.highlightClass) {
        targetElement.classList.add(step.options.highlightClass);
      }

      if (step.options.canClickTarget === false) {
        targetElement.style.pointerEvents = 'none';
      }
    }
    /**
     * Called when `showOn` evaluates to false, to skip the step
     * @param {Step} step The step to skip
     * @param {Boolean} forward True if we are going forward, false if backward
     * @private
     */


    _skipStep(step, forward) {
      const index = this.steps.indexOf(step);
      const nextIndex = forward ? index + 1 : index - 1;
      this.show(nextIndex, forward);
    }

    _setTooltipDefaults() {
      tippy.setDefaults(defaults);
    }

    _updateStateBeforeShow() {
      if (this.currentStep) {
        this.currentStep.hide();
      }

      if (!this.isActive()) {
        this._setupActiveTour();
      }
    }

    _setTourID() {
      const tourName = this.options.tourName || 'tour';
      const uuid = uniqueId$1();
      this.id = "".concat(tourName, "--").concat(uuid);
    }

    _addBodyAttrs() {
      document.body.setAttribute('data-shepherd-active-tour', this.id);
      document.body.classList.add('shepherd-active');
    }

    _removeBodyAttrs() {
      document.body.removeAttribute('data-shepherd-active-tour');
      document.body.classList.remove('shepherd-active');
    }

  }

  Object.assign(Shepherd, {
    Tour,
    Step,
    Evented
  });

  return Shepherd;

}));
//# sourceMappingURL=shepherd.js.map
