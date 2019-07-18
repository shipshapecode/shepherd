/*! shepherd.js 4.0.0-beta.6 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Shepherd = factory());
}(this, function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var O = 'object';
	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == O && globalThis) ||
	  check(typeof window == O && window) ||
	  check(typeof self == O && self) ||
	  check(typeof commonjsGlobal == O && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var path = {};

	var aFunction = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var hide = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	var wrapConstructor = function (NativeConstructor) {
	  var Wrapper = function (a, b, c) {
	    if (this instanceof NativeConstructor) {
	      switch (arguments.length) {
	        case 0: return new NativeConstructor();
	        case 1: return new NativeConstructor(a);
	        case 2: return new NativeConstructor(a, b);
	      } return new NativeConstructor(a, b, c);
	    } return NativeConstructor.apply(this, arguments);
	  };
	  Wrapper.prototype = NativeConstructor.prototype;
	  return Wrapper;
	};

	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var PROTO = options.proto;

	  var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;

	  var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
	  var targetPrototype = target.prototype;

	  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
	  var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

	  for (key in source) {
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contains in native
	    USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

	    targetProperty = target[key];

	    if (USE_NATIVE) if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
	      nativeProperty = descriptor && descriptor.value;
	    } else nativeProperty = nativeSource[key];

	    // export native or implementation
	    sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

	    if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) continue;

	    // bind timers to global for call from export context
	    if (options.bind && USE_NATIVE) resultProperty = bindContext(sourceProperty, global_1);
	    // wrap global constructors for prevent changs in this version
	    else if (options.wrap && USE_NATIVE) resultProperty = wrapConstructor(sourceProperty);
	    // make static versions for prototype methods
	    else if (PROTO && typeof sourceProperty == 'function') resultProperty = bindContext(Function.call, sourceProperty);
	    // default case
	    else resultProperty = sourceProperty;

	    // add a flag to not completely full polyfills
	    if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
	      hide(resultProperty, 'sham', true);
	    }

	    target[key] = resultProperty;

	    if (PROTO) {
	      VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
	      if (!has(path, VIRTUAL_PROTOTYPE)) hide(path, VIRTUAL_PROTOTYPE, {});
	      // export virtual prototype methods
	      path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
	      // export real prototype methods
	      if (options.real && targetPrototype && !targetPrototype[key]) hide(targetPrototype, key, sourceProperty);
	    }
	  }
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var hiddenKeys = {};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	var f$3 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$3
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	var nativeAssign = Object.assign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	// should work with symbols and should have deterministic property order (V8 bug)
	var objectAssign = !nativeAssign || fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var assign = path.Object.assign;

	var assign$1 = assign;

	var assign$2 = assign$1;

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var setGlobal = function (key, value) {
	  try {
	    hide(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.1.3',
	  mode:  'pure' ,
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var Symbol$1 = global_1.Symbol;
	var store = shared('wks');

	var wellKnownSymbol = function (name) {
	  return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
	    || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
	};

	var SPECIES = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  return !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var SPECIES$1 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$1 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$1];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var entryVirtual = function (CONSTRUCTOR) {
	  return path[CONSTRUCTOR + 'Prototype'];
	};

	var slice = entryVirtual('Array').slice;

	var ArrayPrototype = Array.prototype;

	var slice_1 = function (it) {
	  var own = it.slice;
	  return it === ArrayPrototype || (it instanceof Array && own === ArrayPrototype.slice) ? slice : own;
	};

	var slice$1 = slice_1;

	var slice$2 = slice$1;

	var SPECIES$2 = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES$2];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var max$2 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$2(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var splice = entryVirtual('Array').splice;

	var ArrayPrototype$1 = Array.prototype;

	var splice_1 = function (it) {
	  var own = it.splice;
	  return it === ArrayPrototype$1 || (it instanceof Array && own === ArrayPrototype$1.splice) ? splice : own;
	};

	var splice$1 = splice_1;

	var splice$2 = splice$1;

	var iterators = {};

	var functionToString = shared('native-function-to-string', Function.toString);

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    hide(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var aFunction$1 = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var html = getBuiltIn('document', 'documentElement');

	var IE_PROTO$1 = sharedKey('IE_PROTO');

	var PROTOTYPE = 'prototype';
	var Empty = function () { /* empty */ };

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var length = enumBugKeys.length;
	  var lt = '<';
	  var script = 'script';
	  var gt = '>';
	  var js = 'java' + script + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  iframe.src = String(js);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
	  return createDict();
	};

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	hiddenKeys[IE_PROTO$1] = true;

	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = String(test) !== '[object z]' ? function toString() {
	  return '[object ' + classof(this) + ']';
	} : test.toString;

	var defineProperty = objectDefineProperty.f;





	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	var METHOD_REQUIRED = objectToString !== ({}).toString;

	var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
	  if (it) {
	    var target = STATIC ? it : it.prototype;
	    if (!has(target, TO_STRING_TAG$2)) {
	      defineProperty(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
	    }
	    if (SET_METHOD && METHOD_REQUIRED) hide(target, 'toString', objectToString);
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
	  iterators[TO_STRING_TAG] = returnThis;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var redefine = function (target, key, value, options) {
	  if (options && options.enumerable) target[key] = value;
	  else hide(target, key, value);
	};

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$1 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
	      iterators[TO_STRING_TAG] = returnThis$1;
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if (( FORCED) && IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    hide(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype && !CollectionPrototype[TO_STRING_TAG$3]) {
	    hide(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	  }
	  iterators[COLLECTION_NAME] = iterators.Array;
	}

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$1 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$1(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$1(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$1(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$1(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$1(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$1(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$1(6)
	};

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var $forEach = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	// `Array.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	_export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
	  forEach: arrayForEach
	});

	var forEach = entryVirtual('Array').forEach;

	var forEach$1 = forEach;

	var ArrayPrototype$2 = Array.prototype;

	var DOMIterables = {
	  DOMTokenList: true,
	  NodeList: true
	};

	var forEach_1 = function (it) {
	  var own = it.forEach;
	  return it === ArrayPrototype$2 || (it instanceof Array && own === ArrayPrototype$2.forEach)
	    // eslint-disable-next-line no-prototype-builtins
	    || DOMIterables.hasOwnProperty(classof(it)) ? forEach$1 : own;
	};

	var forEach$2 = forEach_1;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperty: objectDefineProperty.f
	});

	var defineProperty_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var defineProperty = module.exports = function defineProperty(it, key, desc) {
	  return Object.defineProperty(it, key, desc);
	};

	if (Object.defineProperty.sham) defineProperty.sham = true;
	});

	var defineProperty$1 = defineProperty_1;

	var defineProperty$2 = defineProperty$1;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;

	    defineProperty$2(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	/**
	 * Checks if `value` is classified as an `HTMLElement`.
	 * @param {*} value The param to check if it is an HTMLElement
	 */
	function isElement(value) {
	  return value instanceof HTMLElement;
	}
	/**
	 * Checks if `value` is classified as a `Function` object.
	 * @param {*} value The param to check if it is a function
	 */

	function isFunction(value) {
	  return typeof value === 'function';
	}
	/**
	 * Checks if `value` is classified as a `Number` object.
	 * @param {*} value The param to check if it is a number
	 */

	function isNumber(value) {
	  return typeof value === 'number';
	}
	/**
	 * Checks if `value` is classified as a `String` object.
	 * @param {*} value The param to check if it is a string
	 */

	function isString(value) {
	  return typeof value === 'string';
	}
	/**
	 * Checks if `value` is undefined.
	 * @param {*} value The param to check if it is undefined
	 */

	function isUndefined(value) {
	  return value === undefined;
	}

	var Evented =
	/*#__PURE__*/
	function () {
	  function Evented() {
	    classCallCheck(this, Evented);
	  }

	  createClass(Evented, [{
	    key: "on",
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (isUndefined(this.bindings)) {
	        this.bindings = {};
	      }

	      if (isUndefined(this.bindings[event])) {
	        this.bindings[event] = [];
	      }

	      this.bindings[event].push({
	        handler: handler,
	        ctx: ctx,
	        once: once
	      });
	    }
	  }, {
	    key: "once",
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: "off",
	    value: function off(event, handler) {
	      var _this = this;

	      if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
	        return false;
	      }

	      if (isUndefined(handler)) {
	        delete this.bindings[event];
	      } else {
	        var _context;

	        forEach$2(_context = this.bindings[event]).call(_context, function (binding, index) {
	          if (binding.handler === handler) {
	            var _context2;

	            splice$2(_context2 = _this.bindings[event]).call(_context2, index, 1);
	          }
	        });
	      }
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(event) {
	      var _this2 = this;

	      if (!isUndefined(this.bindings) && this.bindings[event]) {
	        var _context3;

	        var args = slice$2(Array.prototype).call(arguments, 1);

	        forEach$2(_context3 = this.bindings[event]).call(_context3, function (binding, index) {
	          var ctx = binding.ctx,
	              handler = binding.handler,
	              once = binding.once;
	          var context = ctx || _this2;
	          handler.apply(context, args);

	          if (once) {
	            var _context4;

	            splice$2(_context4 = _this2.bindings[event]).call(_context4, index, 1);
	          }
	        });
	      }
	    }
	  }]);

	  return Evented;
	}();

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var slice$3 = [].slice;
	var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

	var wrap = function (scheduler) {
	  return function (handler, timeout /* , ...arguments */) {
	    var boundArgs = arguments.length > 2;
	    var args = boundArgs ? slice$3.call(arguments, 2) : undefined;
	    return scheduler(boundArgs ? function () {
	      // eslint-disable-next-line no-new-func
	      (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
	    } : handler, timeout);
	  };
	};

	// ie9- setTimeout & setInterval additional parameters fix
	// https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
	_export({ global: true, bind: true, forced: MSIE }, {
	  // `setTimeout` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
	  setTimeout: wrap(global_1.setTimeout),
	  // `setInterval` method
	  // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
	  setInterval: wrap(global_1.setInterval)
	});

	var setTimeout$1 = path.setTimeout;

	var setTimeout$2 = setTimeout$1;

	var propertyIsEnumerable = objectPropertyIsEnumerable.f;

	// `Object.{ entries, values }` methods implementation
	var createMethod$2 = function (TO_ENTRIES) {
	  return function (it) {
	    var O = toIndexedObject(it);
	    var keys = objectKeys(O);
	    var length = keys.length;
	    var i = 0;
	    var result = [];
	    var key;
	    while (length > i) {
	      key = keys[i++];
	      if (!descriptors || propertyIsEnumerable.call(O, key)) {
	        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
	      }
	    }
	    return result;
	  };
	};

	var objectToArray = {
	  // `Object.entries` method
	  // https://tc39.github.io/ecma262/#sec-object.entries
	  entries: createMethod$2(true),
	  // `Object.values` method
	  // https://tc39.github.io/ecma262/#sec-object.values
	  values: createMethod$2(false)
	};

	var $entries = objectToArray.entries;

	// `Object.entries` method
	// https://tc39.github.io/ecma262/#sec-object.entries
	_export({ target: 'Object', stat: true }, {
	  entries: function entries(O) {
	    return $entries(O);
	  }
	});

	var entries = path.Object.entries;

	var entries$1 = entries;

	var entries$2 = entries$1;

	// `Array.isArray` method
	// https://tc39.github.io/ecma262/#sec-array.isarray
	_export({ target: 'Array', stat: true }, {
	  isArray: isArray
	});

	var isArray$1 = path.Array.isArray;

	var isArray$2 = isArray$1;

	var isArray$3 = isArray$2;

	function _arrayWithHoles(arr) {
	  if (isArray$3(arr)) return arr;
	}

	var arrayWithHoles = _arrayWithHoles;

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$3 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$3(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$3(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$1 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$1(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var ITERATOR$2 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	var getIterator = function (it) {
	  var iteratorMethod = getIteratorMethod(it);
	  if (typeof iteratorMethod != 'function') {
	    throw TypeError(String(it) + ' is not iterable');
	  } return anObject(iteratorMethod.call(it));
	};

	var getIterator$1 = getIterator;

	var getIterator$2 = getIterator$1;

	function _iterableToArrayLimit(arr, i) {
	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = getIterator$2(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

	var iterableToArrayLimit = _iterableToArrayLimit;

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	var nonIterableRest = _nonIterableRest;

	function _slicedToArray(arr, i) {
	  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
	}

	var slicedToArray = _slicedToArray;

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var concat = entryVirtual('Array').concat;

	var ArrayPrototype$3 = Array.prototype;

	var concat_1 = function (it) {
	  var own = it.concat;
	  return it === ArrayPrototype$3 || (it instanceof Array && own === ArrayPrototype$3.concat) ? concat : own;
	};

	var concat$1 = concat_1;

	var concat$2 = concat$1;

	var $map = arrayIteration.map;


	// `Array.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.map
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
	  map: function map(callbackfn /* , thisArg */) {
	    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var map = entryVirtual('Array').map;

	var ArrayPrototype$4 = Array.prototype;

	var map_1 = function (it) {
	  var own = it.map;
	  return it === ArrayPrototype$4 || (it instanceof Array && own === ArrayPrototype$4.map) ? map : own;
	};

	var map$1 = map_1;

	var map$2 = map$1;

	var isArray$4 = isArray$1;

	var isArray$5 = isArray$4;

	var f$4 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$4
	};

	var defineProperty$3 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$3(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var iterator = wrappedWellKnownSymbol.f('iterator');

	var iterator$1 = iterator;

	var iterator$2 = iterator$1;

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$5 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$5
	};

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$6
	};

	var $forEach$1 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$1 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$2 = internalState.set;
	var getInternalState$2 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$1 = Object[PROTOTYPE$1];
	var $Symbol = global_1.Symbol;
	var JSON$1 = global_1.JSON;
	var nativeJSONStringify = JSON$1 && JSON$1.stringify;
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$1, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$1[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$1) {
	    nativeDefineProperty$1(ObjectPrototype$1, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap$1 = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
	  setInternalState$2(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$1) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$1(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$1 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$1 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$1;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$1(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$1, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$1) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$1, tag, { configurable: true, set: setter });
	    return wrap$1(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
	    return getInternalState$2(this).tag;
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$2(this).description;
	      }
	    });
	  }

	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap$1(wellKnownSymbol(name), name);
	  };
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$1(objectKeys(WellKnownSymbolsStore), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	JSON$1 && _export({ target: 'JSON', stat: true, forced: !nativeSymbol || fails(function () {
	  var symbol = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  return nativeJSONStringify([symbol]) != '[null]'
	    // WebKit converts symbol values to JSON as null
	    || nativeJSONStringify({ a: symbol }) != '{}'
	    // V8 throws on boxed symbols
	    || nativeJSONStringify(Object(symbol)) != '{}';
	}) }, {
	  stringify: function stringify(it) {
	    var args = [it];
	    var index = 1;
	    var replacer, $replacer;
	    while (arguments.length > index) args.push(arguments[index++]);
	    $replacer = replacer = args[1];
	    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    if (!isArray(replacer)) replacer = function (key, value) {
	      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return nativeJSONStringify.apply(JSON$1, args);
	  }
	});

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) hide($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	// `Symbol.asyncIterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.asynciterator
	defineWellKnownSymbol('asyncIterator');

	// `Symbol.hasInstance` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.hasinstance
	defineWellKnownSymbol('hasInstance');

	// `Symbol.isConcatSpreadable` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
	defineWellKnownSymbol('isConcatSpreadable');

	// `Symbol.match` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.match
	defineWellKnownSymbol('match');

	// `Symbol.matchAll` well-known symbol
	defineWellKnownSymbol('matchAll');

	// `Symbol.replace` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.replace
	defineWellKnownSymbol('replace');

	// `Symbol.search` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.search
	defineWellKnownSymbol('search');

	// `Symbol.species` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.species
	defineWellKnownSymbol('species');

	// `Symbol.split` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.split
	defineWellKnownSymbol('split');

	// `Symbol.toPrimitive` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.toprimitive
	defineWellKnownSymbol('toPrimitive');

	// `Symbol.toStringTag` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.tostringtag
	defineWellKnownSymbol('toStringTag');

	// `Symbol.unscopables` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.unscopables
	defineWellKnownSymbol('unscopables');

	// Math[@@toStringTag] property
	// https://tc39.github.io/ecma262/#sec-math-@@tostringtag
	setToStringTag(Math, 'Math', true);

	// JSON[@@toStringTag] property
	// https://tc39.github.io/ecma262/#sec-json-@@tostringtag
	setToStringTag(global_1.JSON, 'JSON', true);

	var symbol = path.Symbol;

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-using-statement
	defineWellKnownSymbol('dispose');

	// `Symbol.observable` well-known symbol
	// https://github.com/tc39/proposal-observable
	defineWellKnownSymbol('observable');

	// `Symbol.patternMatch` well-known symbol
	// https://github.com/tc39/proposal-pattern-matching
	defineWellKnownSymbol('patternMatch');

	// `Symbol.replaceAll` well-known symbol
	// https://tc39.github.io/proposal-string-replaceall/
	defineWellKnownSymbol('replaceAll');

	var symbol$1 = symbol;

	var symbol$2 = symbol$1;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof2(obj) { if (typeof symbol$2 === "function" && typeof iterator$2 === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

	function _typeof(obj) {
	  if (typeof symbol$2 === "function" && _typeof2(iterator$2) === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return _typeof2(obj);
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof symbol$2 === "function" && obj.constructor === symbol$2 && obj !== symbol$2.prototype ? "symbol" : _typeof2(obj);
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var FAILS_ON_PRIMITIVES = fails(function () { objectGetPrototypeOf(1); });

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(it) {
	    return objectGetPrototypeOf(toObject(it));
	  }
	});

	var getPrototypeOf = path.Object.getPrototypeOf;

	var getPrototypeOf$1 = getPrototypeOf;

	var getPrototypeOf$2 = getPrototypeOf$1;

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	_export({ target: 'Object', stat: true }, {
	  setPrototypeOf: objectSetPrototypeOf
	});

	var setPrototypeOf = path.Object.setPrototypeOf;

	var setPrototypeOf$1 = setPrototypeOf;

	var setPrototypeOf$2 = setPrototypeOf$1;

	var getPrototypeOf$3 = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = setPrototypeOf$2 ? getPrototypeOf$2 : function _getPrototypeOf(o) {
	    return o.__proto__ || getPrototypeOf$2(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  create: objectCreate
	});

	var Object$1 = path.Object;

	var create = function create(P, D) {
	  return Object$1.create(P, D);
	};

	var create$1 = create;

	var create$2 = create$1;

	var setPrototypeOf$3 = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = setPrototypeOf$2 || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = create$2(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf$3(subClass, superClass);
	}

	var inherits = _inherits;

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	// `Reflect.ownKeys` method
	// https://tc39.github.io/ecma262/#sec-reflect.ownkeys
	_export({ target: 'Reflect', stat: true }, {
	  ownKeys: ownKeys
	});

	var ownKeys$1 = path.Reflect.ownKeys;

	var ownKeys$2 = ownKeys$1;

	var ownKeys$3 = ownKeys$2;

	// `Reflect.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-reflect.getprototypeof
	_export({ target: 'Reflect', stat: true, sham: !correctPrototypeGetter }, {
	  getPrototypeOf: function getPrototypeOf(target) {
	    return objectGetPrototypeOf(anObject(target));
	  }
	});

	var getPrototypeOf$4 = path.Reflect.getPrototypeOf;

	var getPrototypeOf$5 = getPrototypeOf$4;

	var getPrototypeOf$6 = getPrototypeOf$5;

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var ITERATOR$3 = wellKnownSymbol('iterator');
	var ArrayPrototype$5 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$5[ITERATOR$3] === it);
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  while (!(step = iterator.next()).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var defineProperty$4 = objectDefineProperty.f;
	var forEach$3 = arrayIteration.forEach;



	var setInternalState$3 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var exported = {};
	  var Constructor;

	  if (!descriptors || typeof NativeConstructor != 'function'
	    || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
	  ) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else {
	    Constructor = wrapper(function (target, iterable) {
	      setInternalState$3(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
	        type: CONSTRUCTOR_NAME,
	        collection: new NativeConstructor()
	      });
	      if (iterable != undefined) iterate_1(iterable, target[ADDER], target, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    forEach$3(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) hide(Constructor.prototype, KEY, function (a, b) {
	        var collection = getInternalState(this).collection;
	        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
	        var result = collection[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });

	    IS_WEAK || defineProperty$4(Constructor.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).collection.size;
	      }
	    });
	  }

	  setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: true }, exported);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) {
	    if (options && options.unsafe && target[key]) target[key] = src[key];
	    else redefine(target, key, src[key], options);
	  } return target;
	};

	var SPECIES$3 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
	    defineProperty(Constructor, SPECIES$3, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$5 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$4 = internalState.set;
	var internalStateGetterFor$1 = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$4(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$5(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$4(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Set` constructor
	// https://tc39.github.io/ecma262/#sec-set-objects
	var es_set = collection('Set', function (get) {
	  return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var set$1 = path.Set;

	var set$2 = set$1;

	var set$3 = set$2;

	var slice$4 = [].slice;
	var factories = {};

	var construct = function (C, argsLength, args) {
	  if (!(argsLength in factories)) {
	    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
	    // eslint-disable-next-line no-new-func
	    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
	  } return factories[argsLength](C, args);
	};

	// `Function.prototype.bind` method implementation
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind
	var functionBind = Function.bind || function bind(that /* , ...args */) {
	  var fn = aFunction(this);
	  var partArgs = slice$4.call(arguments, 1);
	  var boundFunction = function bound(/* args... */) {
	    var args = partArgs.concat(slice$4.call(arguments));
	    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
	  };
	  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
	  return boundFunction;
	};

	// `Function.prototype.bind` method
	// https://tc39.github.io/ecma262/#sec-function.prototype.bind
	_export({ target: 'Function', proto: true }, {
	  bind: functionBind
	});

	var bind = entryVirtual('Function').bind;

	var FunctionPrototype = Function.prototype;

	var bind_1 = function (it) {
	  var own = it.bind;
	  return it === FunctionPrototype || (it instanceof Function && own === FunctionPrototype.bind) ? bind : own;
	};

	var bind$1 = bind_1;

	var bind$2 = bind$1;

	// `Reflect.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor
	_export({ target: 'Reflect', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
	    return objectGetOwnPropertyDescriptor.f(anObject(target), propertyKey);
	  }
	});

	var getOwnPropertyDescriptor$2 = path.Reflect.getOwnPropertyDescriptor;

	var getOwnPropertyDescriptor$3 = getOwnPropertyDescriptor$2;

	var getOwnPropertyDescriptor$4 = getOwnPropertyDescriptor$3;

	/**
	 * Binds all the methods on a JS Class to the `this` context of the class.
	 * Adapted from https://github.com/sindresorhus/auto-bind
	 * @param {object} self The `this` context of the class
	 * @return {object} The `this` context of the class
	 */
	function autoBind(self) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = getIterator$2(getAllProperties(self.constructor.prototype)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _step$value = slicedToArray(_step.value, 2),
	          object = _step$value[0],
	          key = _step$value[1];

	      if (key === 'constructor') {
	        continue;
	      }

	      var descriptor = getOwnPropertyDescriptor$4(object, key);

	      if (descriptor && typeof descriptor.value === 'function') {
	        var _context;

	        self[key] = bind$2(_context = self[key]).call(_context, self);
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return != null) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return self;
	}
	/**
	 * Gets all non-builtin properties up the prototype chain
	 * @param {object} object The object to get all the properties from
	 * @return {Set<any>}
	 */

	function getAllProperties(object) {
	  var props = new set$3();

	  do {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = getIterator$2(ownKeys$3(object)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var key = _step2.value;
	        props.add([object, key]);
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  } while ((object = getPrototypeOf$6(object)) && object !== Object.prototype);

	  return props;
	}

	/**
	 * Sets up the handler to determine if we should advance the tour
	 * @param {string} selector
	 * @param {Step} step The step instance
	 * @return {Function}
	 * @private
	 */

	function _setupAdvanceOnHandler(selector, step) {
	  return function (event) {
	    if (step.isOpen()) {
	      var targetIsEl = step.el && event.target === step.el;
	      var targetIsSelector = !isUndefined(selector) && event.target.matches(selector);

	      if (targetIsSelector || targetIsEl) {
	        step.tour.next();
	      }
	    }
	  };
	}
	/**
	 * Bind the event handler for advanceOn
	 * @param {Step} step The step instance
	 */


	function bindAdvance(step) {
	  // An empty selector matches the step element
	  var _ref = step.options.advanceOn || {},
	      event = _ref.event,
	      selector = _ref.selector;

	  if (event) {
	    var handler = _setupAdvanceOnHandler(selector, step); // TODO: this should also bind/unbind on show/hide


	    var el;

	    try {
	      el = document.querySelector(selector);
	    } catch (e) {// TODO
	    }

	    if (!isUndefined(selector) && !el) {
	      return console.error("No element was found for the selector supplied to advanceOn: ".concat(selector));
	    } else if (el) {
	      el.addEventListener(event, handler);
	      step.on('destroy', function () {
	        return el.removeEventListener(event, handler);
	      });
	    } else {
	      document.body.addEventListener(event, handler, true);
	      step.on('destroy', function () {
	        return document.body.removeEventListener(event, handler, true);
	      });
	    }
	  } else {
	    return console.error('advanceOn was defined, but no event name was passed.');
	  }
	}
	/**
	 * Bind events to the buttons for next, back, etc
	 * @param {Object} cfg An object containing the config options for the button
	 * @param {HTMLElement} el The element for the button
	 * @param {Step} step The step instance
	 */

	function bindButtonEvents(cfg, el, step) {
	  cfg.events = cfg.events || {};

	  if (!isUndefined(cfg.action)) {
	    // Including both a click event and an action is not supported
	    cfg.events.click = cfg.action;
	  }

	  if (cfg.events) {
	    var _context;

	    forEach$2(_context = entries$2(cfg.events)).call(_context, function (_ref2) {
	      var _ref3 = slicedToArray(_ref2, 2),
	          event = _ref3[0],
	          handler = _ref3[1];

	      if (isString(handler)) {
	        var page = handler;

	        handler = function handler() {
	          return step.tour.show(page);
	        };
	      }

	      el.dataset.buttonEvent = true;
	      el.addEventListener(event, handler); // Cleanup event listeners on destroy

	      step.on('destroy', function () {
	        el.removeAttribute('data-button-event');
	        el.removeEventListener(event, handler);
	      });
	    });
	  }
	}
	/**
	 * Add a click listener to the cancel link that cancels the tour
	 * @param {HTMLElement} link The cancel link element
	 * @param {Step} step The step instance
	 */

	function bindCancelLink(link, step) {
	  link.addEventListener('click', function (e) {
	    e.preventDefault();
	    step.cancel();
	  });
	}

	var FAILS_ON_PRIMITIVES$1 = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var keys$1 = path.Object.keys;

	var keys$2 = keys$1;

	var keys$3 = keys$2;

	var svgNS = 'http://www.w3.org/2000/svg';
	var elementIds = {
	  modalOverlay: 'shepherdModalOverlayContainer',
	  modalOverlayMask: 'shepherdModalMask',
	  modalOverlayMaskRect: 'shepherdModalMaskRect',
	  modalOverlayMaskOpening: 'shepherdModalMaskOpening'
	};
	var classNames = {
	  isVisible: 'shepherd-modal-is-visible',
	  modalTarget: 'shepherd-modal-target'
	};
	/**
	 * <svg id="shepherdModalOverlayContainer" xmlns="http://www.w3.org/2000/svg">
	 */

	function _createModalContainer() {
	  var element = document.createElementNS(svgNS, 'svg');
	  element.setAttributeNS(null, 'id', elementIds.modalOverlay);
	  return element;
	}
	/**
	 * <mask id="shepherdModalMask" x="0" y="0" width="100%" height="100%">
	 */


	function _createMaskContainer() {
	  var element = document.createElementNS(svgNS, 'mask');

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
	  var element = document.createElementNS(svgNS, 'rect');

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
	  var element = document.createElementNS(svgNS, 'rect');

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
	  var element = document.createElementNS(svgNS, 'rect');

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
	  var containerElement = _createModalContainer();

	  var defsElement = document.createElementNS(svgNS, 'defs');

	  var maskContainer = _createMaskContainer();

	  var maskRect = _createMaskRect();

	  var maskOpening = _createMaskOpening();

	  var maskConsumer = _createMaskConsumer();

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
	 * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
	 */


	function positionModalOpening(targetElement, openingElement) {
	  var modalOverlayOpeningPadding = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	  if (targetElement.getBoundingClientRect && openingElement instanceof SVGElement) {
	    var _targetElement$getBou = targetElement.getBoundingClientRect(),
	        x = _targetElement$getBou.x,
	        y = _targetElement$getBou.y,
	        width = _targetElement$getBou.width,
	        height = _targetElement$getBou.height,
	        left = _targetElement$getBou.left,
	        top = _targetElement$getBou.top; // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top


	    _setAttributes(openingElement, {
	      x: (x || left) - modalOverlayOpeningPadding,
	      y: (y || top) - modalOverlayOpeningPadding,
	      width: width + modalOverlayOpeningPadding * 2,
	      height: height + modalOverlayOpeningPadding * 2
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
	  var shepherdModal = document.querySelector("".concat(classNames.modalTarget));

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
	  var _context;

	  forEach$2(_context = keys$3(attrs)).call(_context, function (key) {
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
	  var op = attachTo.element;

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
	  var attachTo = step.options.attachTo;

	  if (!attachTo) {
	    return null;
	  }

	  var type = _typeof_1(attachTo);

	  var element;

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
	  var _element$split = element.split(' '),
	      _element$split2 = slicedToArray(_element$split, 1),
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
	  var overlay = document.querySelector("#".concat(elementIds.modalOverlay)); // Prevents window from moving on touch.

	  window.addEventListener('touchmove', preventModalBodyTouch, {
	    passive: false
	  }); // Allows content to move on touch.

	  if (overlay) {
	    overlay.addEventListener('touchmove', preventModalOverlayTouch, false);
	  }
	}

	var defineProperty$6 = defineProperty_1;

	var defineProperty$7 = defineProperty$6;

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	_export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
	  defineProperties: objectDefineProperties
	});

	var defineProperties_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var defineProperties = module.exports = function defineProperties(T, D) {
	  return Object.defineProperties(T, D);
	};

	if (Object.defineProperties.sham) defineProperties.sham = true;
	});

	var defineProperties = defineProperties_1;

	var defineProperties$1 = defineProperties;

	// `Object.getOwnPropertyDescriptors` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	_export({ target: 'Object', stat: true, sham: !descriptors }, {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
	    var O = toIndexedObject(object);
	    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	    var keys = ownKeys(O);
	    var result = {};
	    var index = 0;
	    var key, descriptor;
	    while (keys.length > index) {
	      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
	      if (descriptor !== undefined) createProperty(result, key, descriptor);
	    }
	    return result;
	  }
	});

	var getOwnPropertyDescriptors = path.Object.getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$1 = getOwnPropertyDescriptors;

	var getOwnPropertyDescriptors$2 = getOwnPropertyDescriptors$1;

	var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


	var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
	var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES$2;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	_export({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors }, {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
	    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
	  }
	});

	var getOwnPropertyDescriptor_1 = createCommonjsModule(function (module) {
	var Object = path.Object;

	var getOwnPropertyDescriptor = module.exports = function getOwnPropertyDescriptor(it, key) {
	  return Object.getOwnPropertyDescriptor(it, key);
	};

	if (Object.getOwnPropertyDescriptor.sham) getOwnPropertyDescriptor.sham = true;
	});

	var getOwnPropertyDescriptor$5 = getOwnPropertyDescriptor_1;

	var getOwnPropertyDescriptor$6 = getOwnPropertyDescriptor$5;

	var $filter = arrayIteration.filter;


	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var filter = entryVirtual('Array').filter;

	var ArrayPrototype$6 = Array.prototype;

	var filter_1 = function (it) {
	  var own = it.filter;
	  return it === ArrayPrototype$6 || (it instanceof Array && own === ArrayPrototype$6.filter) ? filter : own;
	};

	var filter$1 = filter_1;

	var filter$2 = filter$1;

	var getOwnPropertySymbols = path.Object.getOwnPropertySymbols;

	var getOwnPropertySymbols$1 = getOwnPropertySymbols;

	var getOwnPropertySymbols$2 = getOwnPropertySymbols$1;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    defineProperty$2(obj, key, {
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

	var defineProperty$8 = _defineProperty;

	/**!
	* tippy.js v5.0.0-alpha.2
	* (c) 2017-2019 atomiks
	* MIT License
	*/
	function _extends() {
	  _extends = Object.assign || function (target) {
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

	  return _extends.apply(this, arguments);
	}

	var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
	var ua = isBrowser ? navigator.userAgent : '';
	var isIE = /MSIE |Trident\//.test(ua);
	var isUCBrowser = /UCBrowser\//.test(ua);
	var isIOS = isBrowser && /iPhone|iPad|iPod/.test(navigator.platform);

	var defaultProps = {
	  allowHTML: true,
	  animateFill: false,
	  animation: 'fade',
	  appendTo: function appendTo() {
	    return document.body;
	  },
	  aria: 'describedby',
	  arrow: true,
	  boundary: 'scrollParent',
	  content: '',
	  delay: 0,
	  distance: 10,
	  duration: [325, 275],
	  flip: true,
	  flipBehavior: 'flip',
	  flipOnUpdate: false,
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
	  onCreate: function onCreate() {},
	  onHidden: function onHidden() {},
	  onHide: function onHide() {},
	  onMount: function onMount() {},
	  onShow: function onShow() {},
	  onShown: function onShown() {},
	  onTrigger: function onTrigger() {},
	  onUntrigger: function onUntrigger() {},
	  placement: 'top',
	  popperOptions: {},
	  role: 'tooltip',
	  showOnCreate: false,
	  sticky: false,
	  theme: '',
	  touch: true,
	  trigger: 'mouseenter focus',
	  triggerTarget: null,
	  updateDuration: 0,
	  wait: null,
	  zIndex: 9999
	};
	var POPPER_INSTANCE_DEPENDENCIES = ['arrow', 'boundary', 'distance', 'flip', 'flipBehavior', 'flipOnUpdate', 'offset', 'placement', 'popperOptions'];

	var PASSIVE = {
	  passive: true
	};
	var PREVENT_OVERFLOW_PADDING = 5;
	var ROUND_ARROW_INNER_HTML = '<svg viewBox="0 0 18 7" xmlns="http://www.w3.org/2000/svg"><path d="M0 7s2.021-.015 5.253-4.218C6.584 1.051 7.797.007 9 0c1.203-.007 2.416 1.035 3.761 2.782C16.012 7.005 18 7 18 7H0z"/></svg>';
	var IOS_CLASS = "tippy-iOS";
	var POPPER_CLASS = "tippy-popper";
	var TOOLTIP_CLASS = "tippy-tooltip";
	var CONTENT_CLASS = "tippy-content";
	var BACKDROP_CLASS = "tippy-backdrop";
	var ARROW_CLASS = "tippy-arrow";
	var SVG_ARROW_CLASS = "tippy-svg-arrow";
	var POPPER_SELECTOR = "." + POPPER_CLASS;
	var TOOLTIP_SELECTOR = "." + TOOLTIP_CLASS;
	var CONTENT_SELECTOR = "." + CONTENT_CLASS;
	var BACKDROP_SELECTOR = "." + BACKDROP_CLASS;
	var ARROW_SELECTOR = "." + ARROW_CLASS;
	var SVG_ARROW_SELECTOR = "." + SVG_ARROW_CLASS;

	var currentInput = {
	  isTouch: false
	};
	var lastMouseMoveTime = 0;
	/**
	 * When a `touchstart` event is fired, it's assumed the user is using touch
	 * input. We'll bind a `mousemove` event listener to listen for mouse input in
	 * the future. This way, the `isTouch` property is fully dynamic and will handle
	 * hybrid devices that use a mix of touch + mouse input.
	 */

	function onDocumentTouchStart() {
	  if (currentInput.isTouch) {
	    return;
	  }

	  currentInput.isTouch = true;

	  if (isIOS) {
	    document.body.classList.add(IOS_CLASS);
	  }

	  if (window.performance) {
	    document.addEventListener('mousemove', onDocumentMouseMove);
	  }
	}
	/**
	 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
	 * the user is using mouse input again. `mousemove` can fire on touch devices as
	 * well, but very rarely that quickly.
	 */

	function onDocumentMouseMove() {
	  var now = performance.now();

	  if (now - lastMouseMoveTime < 20) {
	    currentInput.isTouch = false;
	    document.removeEventListener('mousemove', onDocumentMouseMove);

	    if (!isIOS) {
	      document.body.classList.remove(IOS_CLASS);
	    }
	  }

	  lastMouseMoveTime = now;
	}
	/**
	 * When an element is in focus and has a tippy, leaving the tab/window and
	 * returning causes it to show again. For mouse users this is unexpected, but
	 * for keyboard use it makes sense.
	 * TODO: find a better technique to solve this problem
	 */

	function onWindowBlur() {
	  var _document = document,
	      activeElement = _document.activeElement;
	  var instance = activeElement._tippy;

	  if (activeElement && activeElement.blur && instance && !instance.state.isVisible) {
	    activeElement.blur();
	  }
	}
	/**
	 * Adds the needed global event listeners
	 */

	function bindGlobalEventListeners() {
	  document.addEventListener('touchstart', onDocumentTouchStart, _extends({}, PASSIVE, {
	    capture: true
	  }));
	  window.addEventListener('blur', onWindowBlur);
	}

	var keys$4 = Object.keys(defaultProps);
	/**
	 * Returns an object of optional props from data-tippy-* attributes
	 */

	function getDataAttributeProps(reference) {
	  var props = keys$4.reduce(function (acc, key) {
	    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

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
	  return props;
	}

	/**
	 * Determines if the value is a reference element
	 */

	function isReferenceElement(value) {
	  return !!(value && value._tippy && !value.classList.contains(POPPER_CLASS));
	}
	/**
	 * Safe .hasOwnProperty check, for prototype-less objects
	 */

	function hasOwnProperty$1(obj, key) {
	  return {}.hasOwnProperty.call(obj, key);
	}
	/**
	 * Returns an array of elements based on the value
	 */

	function getArrayOfElements(value) {
	  if (isRealElement(value)) {
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

	function getValue(value, index, defaultValue) {
	  if (Array.isArray(value)) {
	    var v = value[index];
	    return v == null ? defaultValue : v;
	  }

	  return value;
	}
	/**
	 * Prevents errors from being thrown while accessing nested modifier objects
	 * in `popperOptions`
	 */

	function getModifier(obj, key) {
	  return obj && obj.modifiers && obj.modifiers[key];
	}
	/**
	 * Determines if the value is a real element
	 */

	function isRealElement(value) {
	  return value instanceof Element;
	}
	/**
	 * Firefox extensions don't allow setting .innerHTML directly, this will trick
	 * it
	 */

	function innerHTML() {
	  return 'innerHTML';
	}
	/**
	 * Evaluates a function if one, or returns the value
	 */

	function invokeWithArgsOrReturn(value, args) {
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
	      el.style.transitionDuration = value + "ms";
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
	 * Evaluates the props object by merging data attributes and disabling
	 * conflicting props where necessary
	 */

	function evaluateProps(reference, props) {
	  var out = _extends({}, props, {
	    content: invokeWithArgsOrReturn(props.content, [reference])
	  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference));

	  if (out.animateFill) {
	    out.arrow = false;
	  }

	  if (out.arrow || isUCBrowser) {
	    out.animateFill = false;
	  }

	  return out;
	}
	/**
	 * Debounce utility. To avoid bloating bundle size, we're only passing 1
	 * argument here, a more generic function would pass all arguments. Only
	 * `onMouseMove` uses this which takes the event object for now.
	 */

	function debounce(fn, ms) {
	  // Avoid wrapping in `setTimeout` if ms is 0 anyway
	  if (ms === 0) {
	    return fn;
	  }

	  var timeout;
	  return function (arg) {
	    clearTimeout(timeout);
	    timeout = setTimeout(function () {
	      fn(arg);
	    }, ms);
	  };
	}
	/**
	 * Preserves the original function invocation when another function replaces it
	 */

	function preserveInvocation(originalFn, currentFn, args) {
	  if (originalFn && originalFn !== currentFn) {
	    originalFn.apply(null, args);
	  }
	}
	/**
	 * Ponyfill for Array.from - converts iterable values to an array
	 */

	function arrayFrom(value) {
	  return [].slice.call(value);
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

	  return null;
	}
	/**
	 * Determines if an array or string includes a value
	 */

	function includes(a, b) {
	  return a.indexOf(b) > -1;
	}

	/**
	 * Sets the innerHTML of an element
	 */

	function setInnerHTML(element, html) {
	  element[innerHTML()] = isRealElement(html) ? html[innerHTML()] : html;
	}
	/**
	 * Sets the content of a tooltip
	 */

	function setContent(contentEl, props) {
	  if (isRealElement(props.content)) {
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
	    arrow: popper.querySelector(ARROW_SELECTOR) || popper.querySelector(SVG_ARROW_SELECTOR)
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

	function createArrowElement(arrow) {
	  var arrowElement = div();

	  if (arrow === true) {
	    arrowElement.className = ARROW_CLASS;
	  } else {
	    arrowElement.className = SVG_ARROW_CLASS;

	    if (isRealElement(arrow)) {
	      arrowElement.appendChild(arrow);
	    } else {
	      setInnerHTML(arrowElement, arrow === 'round' ? ROUND_ARROW_INNER_HTML : arrow);
	    }
	  }

	  return arrowElement;
	}
	/**
	 * Creates a backdrop element and returns it
	 */

	function createBackdropElement(isVisible) {
	  var backdrop = div();
	  backdrop.className = BACKDROP_CLASS;
	  backdrop.setAttribute('data-state', isVisible ? 'visible' : 'hidden');
	  return backdrop;
	}
	/**
	 * Adds interactive-related attributes
	 */

	function addInteractive(tooltip) {
	  tooltip.setAttribute('data-interactive', '');
	}
	/**
	 * Removes interactive-related attributes
	 */

	function removeInteractive(tooltip) {
	  tooltip.removeAttribute('data-interactive');
	}
	/**
	 * Add/remove transitionend listener from tooltip
	 */

	function updateTransitionEndListener(tooltip, action, listener) {
	  var eventName = isUCBrowser && document.body.style.webkitTransition !== undefined ? 'webkitTransitionEnd' : 'transitionend';
	  tooltip[action + 'EventListener'](eventName, listener);
	}
	/**
	 * Returns the popper's placement, ignoring shifting (top-start, etc)
	 */

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
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
	  theme.split(' ').forEach(function (name) {
	    if (name) {
	      tooltip.classList[action](name + "-theme");
	    }
	  });
	}
	/**
	 * Constructs the popper element and returns it
	 */

	function createPopperElement(id, props) {
	  var popper = div();
	  popper.className = POPPER_CLASS;
	  popper.style.position = 'absolute';
	  popper.style.top = '0';
	  popper.style.left = '0';
	  var tooltip = div();
	  tooltip.className = TOOLTIP_CLASS;
	  tooltip.id = "tippy-" + id;
	  tooltip.setAttribute('data-state', 'hidden');
	  tooltip.setAttribute('tabindex', '-1');
	  updateTheme(tooltip, 'add', props.theme);
	  var content = div();
	  content.className = CONTENT_CLASS;
	  content.setAttribute('data-state', 'hidden');

	  if (props.interactive) {
	    addInteractive(tooltip);
	  }

	  if (props.arrow) {
	    tooltip.setAttribute('data-arrow', '');
	    tooltip.appendChild(createArrowElement(props.arrow));
	  }

	  if (props.animateFill) {
	    tooltip.appendChild(createBackdropElement(false));
	    tooltip.setAttribute('data-animatefill', '');
	  }

	  if (props.inertia) {
	    addInertia(tooltip);
	  }

	  setContent(content, props);
	  tooltip.appendChild(content);
	  popper.appendChild(tooltip);
	  updatePopperElement(popper, props, props, false);
	  return popper;
	}
	/**
	 * Updates the popper element based on the new props
	 */

	function updatePopperElement(popper, prevProps, nextProps, isVisible) {
	  var _getChildren = getChildren(popper),
	      tooltip = _getChildren.tooltip,
	      content = _getChildren.content,
	      backdrop = _getChildren.backdrop,
	      arrow = _getChildren.arrow;

	  popper.style.zIndex = '' + nextProps.zIndex;
	  tooltip.setAttribute('data-animation', nextProps.animation);
	  tooltip.style.maxWidth = nextProps.maxWidth + (typeof nextProps.maxWidth === 'number' ? 'px' : '');

	  if (nextProps.role) {
	    tooltip.setAttribute('role', nextProps.role);
	  } else {
	    tooltip.removeAttribute('role');
	  }

	  if (prevProps.content !== nextProps.content) {
	    setContent(content, nextProps);
	  } // animateFill


	  if (!prevProps.animateFill && nextProps.animateFill) {
	    tooltip.appendChild(createBackdropElement(isVisible));
	    tooltip.setAttribute('data-animatefill', '');
	  } else if (prevProps.animateFill && !nextProps.animateFill) {
	    tooltip.removeChild(backdrop);
	    tooltip.removeAttribute('data-animatefill');
	  } // arrow


	  if (!prevProps.arrow && nextProps.arrow) {
	    // false to true
	    tooltip.appendChild(createArrowElement(nextProps.arrow));
	    tooltip.setAttribute('data-arrow', '');
	  } else if (prevProps.arrow && !nextProps.arrow) {
	    // true to false
	    tooltip.removeChild(arrow);
	    tooltip.removeAttribute('data-arrow');
	  } else if (prevProps.arrow !== nextProps.arrow) {
	    // true to 'round' or vice-versa
	    tooltip.removeChild(arrow);
	    tooltip.appendChild(createArrowElement(nextProps.arrow));
	  } // interactive


	  if (!prevProps.interactive && nextProps.interactive) {
	    addInteractive(tooltip);
	  } else if (prevProps.interactive && !nextProps.interactive) {
	    removeInteractive(tooltip);
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

	/**!
	 * @fileOverview Kickass library to create and place poppers near their reference elements.
	 * @version 1.15.0
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
	var isBrowser$1 = typeof window !== 'undefined' && typeof document !== 'undefined';

	var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
	var timeoutDuration = 0;
	for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
	  if (isBrowser$1 && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
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

	var supportsMicroTasks = isBrowser$1 && window.Promise;

	/**
	* Create a debounced version of a method, that's asynchronously deferred
	* but called in the minimum time possible.
	*
	* @method
	* @memberof Popper.Utils
	* @argument {Function} fn
	* @returns {Function}
	*/
	var debounce$1 = supportsMicroTasks ? microtaskDebounce : taskDebounce;

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

	var isIE11 = isBrowser$1 && !!(window.MSInputMethodContext && document.documentMode);
	var isIE10 = isBrowser$1 && /MSIE 10/.test(navigator.userAgent);

	/**
	 * Determines if the browser is Internet Explorer
	 * @method
	 * @memberof Popper.Utils
	 * @param {Number} version to check
	 * @returns {Boolean} isIE
	 */
	function isIE$1(version) {
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

	  var noOffsetParent = isIE$1(10) ? document.body : null;

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
	  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE$1(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
	}

	function getWindowSizes(document) {
	  var body = document.body;
	  var html = document.documentElement;
	  var computedStyle = isIE$1(10) && getComputedStyle(html);

	  return {
	    height: getSize('Height', body, html, computedStyle),
	    width: getSize('Width', body, html, computedStyle)
	  };
	}

	var classCallCheck$1 = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass$1 = function () {
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





	var defineProperty$9 = function (obj, key, value) {
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

	var _extends$1 = Object.assign || function (target) {
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
	  return _extends$1({}, offsets, {
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
	    if (isIE$1(10)) {
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

	  var isIE10 = isIE$1(10);
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
	  if (!element || !element.parentElement || isIE$1()) {
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
	    return _extends$1({
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

	var isFirefox = isBrowser$1 && /Firefox/i.test(navigator.userAgent);

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
	  data.attributes = _extends$1({}, attributes, data.attributes);
	  data.styles = _extends$1({}, styles, data.styles);
	  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

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
	  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty$9(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty$9(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

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

	    // flips variation if reference element overflows boundaries
	    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

	    // flips variation if popper content overflows boundaries
	    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

	    var flippedVariation = flippedVariationByRef || flippedVariationByContent;

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
	      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

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
	      return defineProperty$9({}, placement, value);
	    },
	    secondary: function secondary(placement) {
	      var mainSide = placement === 'right' ? 'left' : 'top';
	      var value = popper[mainSide];
	      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
	        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
	      }
	      return defineProperty$9({}, mainSide, value);
	    }
	  };

	  order.forEach(function (placement) {
	    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
	    popper = _extends$1({}, popper, check[side](placement));
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
	      start: defineProperty$9({}, side, reference[side]),
	      end: defineProperty$9({}, side, reference[side] + reference[measurement] - popper[measurement])
	    };

	    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
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
	function hide$1(data) {
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
	    boundariesElement: 'viewport',
	    /**
	     * @prop {Boolean} flipVariations=false
	     * The popper will switch placement variation between `-start` and `-end` when
	     * the reference element overlaps its boundaries.
	     *
	     * The original placement should have a set variation.
	     */
	    flipVariations: false,
	    /**
	     * @prop {Boolean} flipVariationsByContent=false
	     * The popper will switch placement variation between `-start` and `-end` when
	     * the popper element overlaps its reference boundaries.
	     *
	     * The original placement should have a set variation.
	     */
	    flipVariationsByContent: false
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
	    fn: hide$1
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
	   * @param {Element|referenceObject} reference - The reference element used to position the popper
	   * @param {Element} popper - The HTML / XML element used as the popper
	   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
	   * @return {Object} instance - The generated Popper.js instance
	   */
	  function Popper(reference, popper) {
	    var _this = this;

	    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    classCallCheck$1(this, Popper);

	    this.scheduleUpdate = function () {
	      return requestAnimationFrame(_this.update);
	    };

	    // make update() debounced, so that it only runs at most once-per-tick
	    this.update = debounce$1(this.update.bind(this));

	    // with {} we create a new object with the options inside it
	    this.options = _extends$1({}, Popper.Defaults, options);

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
	    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
	      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
	    });

	    // Refactoring modifiers' list (Object => Array)
	    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
	      return _extends$1({
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


	  createClass$1(Popper, [{
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
	* tippy.js v5.0.0-alpha.2
	* (c) 2017-2019 atomiks
	* MIT License
	*/

	var version = "5.0.0-alpha.2";

	var idCounter = 1; // Workaround for IE11's lack of new MouseEvent constructor

	var mouseMoveListeners = [];
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
	  var showTimeout;
	  var hideTimeout;
	  var scheduleHideAnimationFrame;
	  var isBeingDestroyed = false;
	  var hasMountCallbackRun = false;
	  var didHideDueToDocumentMouseDown = false;
	  var normalizedPlacement;
	  var currentMountCallback;
	  var currentTransitionEndListener;
	  var listeners = [];
	  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
	  /* ======================= 🔑 Public members 🔑 ======================= */

	  var id = idCounter++;
	  var popper = createPopperElement(id, props);
	  var popperChildren = getChildren(popper);
	  var popperInstance = null; // These two elements are static

	  var tooltip = popperChildren.tooltip,
	      content = popperChildren.content;
	  var state = {
	    // The current real placement (`data-placement` attribute)
	    currentPlacement: props.placement,
	    // Does the instance have a pending timeout for show()?
	    isScheduledToShow: false,
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
	    setProps: setProps,
	    setContent: setContent,
	    show: show,
	    hide: hide,
	    enable: enable,
	    disable: disable,
	    destroy: destroy
	  };
	  /* ==================== Initial instance mutations =================== */


	  reference._tippy = instance;
	  popper._tippy = instance;
	  addTriggersToEventListenersTarget();

	  if (!props.lazy) {
	    createPopperInstance();
	  }

	  if (props.showOnCreate) {
	    scheduleShow();
	  } // Prevent a tippy with a delay from hiding if the cursor left then returned
	  // before it started hiding


	  popper.addEventListener('mouseenter', function () {
	    if (instance.props.interactive && instance.state.isVisible && lastTriggerEventType === 'mouseenter') {
	      instance.clearDelayTimeouts();
	    }
	  });
	  popper.addEventListener('mouseleave', function () {
	    if (instance.props.interactive && lastTriggerEventType === 'mouseenter') {
	      document.addEventListener('mousemove', debouncedOnMouseMove);
	    }
	  });
	  props.onCreate(instance);
	  return instance;
	  /* ======================= 🔒 Private methods 🔒 ======================= */

	  function getIsVerticalPlacement() {
	    return includes(['top', 'bottom'], getBasePlacement(instance.state.currentPlacement));
	  }

	  function getIsOppositePlacement() {
	    return includes(['bottom', 'right'], getBasePlacement(instance.state.currentPlacement));
	  }

	  function getNormalizedTouchSettings() {
	    var touch = instance.props.touch;
	    return Array.isArray(touch) ? touch : [touch, 0];
	  }

	  function getIsCustomTouchBehavior() {
	    return getNormalizedTouchSettings()[0] === 'hold';
	  }

	  function getTransitionableElements() {
	    return [tooltip, content, instance.popperChildren.backdrop];
	  }

	  function getEventListenersTarget() {
	    return instance.props.triggerTarget || reference;
	  }

	  function cleanupInteractiveMouseListeners() {
	    document.body.removeEventListener('mouseleave', scheduleHide);
	    document.removeEventListener('mousemove', debouncedOnMouseMove);
	    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
	      return listener !== debouncedOnMouseMove;
	    });
	  }

	  function onDocumentMouseDown(event) {
	    // Clicked on interactive popper
	    if (instance.props.interactive && popper.contains(event.target)) {
	      return;
	    } // Clicked on the event listeners target


	    if (getEventListenersTarget().contains(event.target)) {
	      if (currentInput.isTouch) {
	        return;
	      }

	      if (instance.state.isVisible && includes(instance.props.trigger, 'click')) {
	        return;
	      }
	    }

	    if (instance.props.hideOnClick === true) {
	      instance.clearDelayTimeouts();
	      instance.hide(); // `mousedown` event is fired right before `focus`. This lets a tippy with
	      // `focus` trigger know that it should not show

	      didHideDueToDocumentMouseDown = true;
	      setTimeout(function () {
	        didHideDueToDocumentMouseDown = false;
	      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
	      // before it shows, and hide()'s early bail-out behavior can prevent it
	      // from being cleaned up

	      if (!instance.state.isMounted) {
	        removeDocumentMouseDownListener();
	      }
	    }
	  }

	  function addDocumentMouseDownListener() {
	    document.addEventListener('mousedown', onDocumentMouseDown, true);
	  }

	  function removeDocumentMouseDownListener() {
	    document.removeEventListener('mousedown', onDocumentMouseDown, true);
	  }

	  function makeSticky() {
	    setTransitionDuration([popper], isIE ? 0 : instance.props.updateDuration);

	    function updatePosition() {
	      instance.popperInstance.scheduleUpdate();

	      if (instance.state.isMounted) {
	        requestAnimationFrame(updatePosition);
	      } else {
	        setTransitionDuration([popper], 0);
	      }
	    }

	    updatePosition();
	  }

	  function onTransitionedOut(duration, callback) {
	    onTransitionEnd(duration, function () {
	      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
	        callback();
	      }
	    });
	  }

	  function onTransitionedIn(duration, callback) {
	    onTransitionEnd(duration, callback);
	  }

	  function onTransitionEnd(duration, callback) {
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

	  function on(eventType, handler, options) {
	    if (options === void 0) {
	      options = false;
	    }

	    getEventListenersTarget().addEventListener(eventType, handler, options);
	    listeners.push({
	      eventType: eventType,
	      handler: handler,
	      options: options
	    });
	  }

	  function addTriggersToEventListenersTarget() {
	    if (getIsCustomTouchBehavior()) {
	      on('touchstart', onTrigger, PASSIVE);
	      on('touchend', onMouseLeave, PASSIVE);
	    } // `click` for keyboard. Mouse uses `mousedown` (onDocumentMouseDown)


	    if (!includes(instance.props.trigger, 'click')) {
	      on('click', function () {
	        if (!currentInput.isTouch && instance.props.hideOnClick === true) {
	          instance.hide();
	        }
	      });
	    }

	    instance.props.trigger.trim().split(' ').forEach(function (eventType) {
	      if (eventType === 'manual') {
	        return;
	      }

	      on(eventType, onTrigger);

	      switch (eventType) {
	        case 'mouseenter':
	          on('mouseleave', onMouseLeave);
	          break;

	        case 'focus':
	          on(isIE ? 'focusout' : 'blur', onBlur);
	          break;
	      }
	    });
	  }

	  function removeTriggersFromEventListenersTarget() {
	    listeners.forEach(function (_ref) {
	      var eventType = _ref.eventType,
	          handler = _ref.handler,
	          options = _ref.options;
	      getEventListenersTarget().removeEventListener(eventType, handler, options);
	    });
	    listeners = [];
	  }

	  function onTrigger(event) {
	    if (didHideDueToDocumentMouseDown || !instance.state.isEnabled || isEventListenerStopped(event)) {
	      return;
	    }

	    if (!instance.state.isVisible) {
	      lastTriggerEventType = event.type;

	      if (event instanceof MouseEvent) {
	        // If scrolling, `mouseenter` events can be fired if the cursor lands
	        // over a new target, but `mousemove` events don't get fired. This
	        // causes interactive tooltips to get stuck open until the cursor is
	        // moved
	        mouseMoveListeners.forEach(function (listener) {
	          return listener(event);
	        });
	      }
	    } // Toggle show/hide when clicking click-triggered tooltips


	    if (event.type === 'click' && instance.props.hideOnClick !== false && instance.state.isVisible) {
	      scheduleHide(event);
	    } else {
	      var _getNormalizedTouchSe = getNormalizedTouchSettings(),
	          value = _getNormalizedTouchSe[0],
	          duration = _getNormalizedTouchSe[1];

	      if (currentInput.isTouch && value === 'hold' && duration) {
	        // We can hijack the show timeout here, it will be cleared by
	        // `scheduleHide()` when necessary
	        showTimeout = setTimeout(function () {
	          scheduleShow(event);
	        }, duration);
	      } else {
	        scheduleShow(event);
	      }
	    }
	  }

	  function onMouseMove(event) {
	    var isCursorOverReferenceOrPopper = closestCallback(event.target, function (el) {
	      return el === reference || el === popper;
	    });

	    if (isCursorOverReferenceOrPopper) {
	      return;
	    }

	    if (isCursorOutsideInteractiveBorder(getBasePlacement(instance.state.currentPlacement), popper.getBoundingClientRect(), event, instance.props)) {
	      cleanupInteractiveMouseListeners();
	      scheduleHide(event);
	    }
	  }

	  function onMouseLeave(event) {
	    if (isEventListenerStopped(event)) {
	      return;
	    }

	    if (instance.props.interactive) {
	      document.body.addEventListener('mouseleave', scheduleHide);
	      document.addEventListener('mousemove', debouncedOnMouseMove);
	      mouseMoveListeners.push(debouncedOnMouseMove);
	      return;
	    }

	    scheduleHide(event);
	  }

	  function onBlur(event) {
	    if (event.target !== getEventListenersTarget()) {
	      return;
	    } // If focus was moved to within the popper


	    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
	      return;
	    }

	    scheduleHide(event);
	  }

	  function isEventListenerStopped(event) {
	    var supportsTouch = 'ontouchstart' in window;
	    var isTouchEvent = includes(event.type, 'touch');
	    var isCustomTouch = getIsCustomTouchBehavior();
	    return supportsTouch && currentInput.isTouch && isCustomTouch && !isTouchEvent || currentInput.isTouch && !isCustomTouch && isTouchEvent;
	  }

	  function createPopperInstance() {
	    var _instance$props = instance.props,
	        popperOptions = _instance$props.popperOptions,
	        placement = _instance$props.placement;
	    var arrow = instance.popperChildren.arrow;
	    var preventOverflowModifier = getModifier(popperOptions, 'preventOverflow'); // Due to the virtual offsets normalization when using `followCursor`, we
	    // need to use the opposite placement

	    var shift = instance.state.currentPlacement.split('-')[1];
	    normalizedPlacement = instance.props.followCursor && shift ? placement.replace(shift, shift === 'start' ? 'end' : 'start') : placement;

	    function applyMutations(data) {
	      instance.state.currentPlacement = data.placement;

	      if (instance.props.flip && !instance.props.flipOnUpdate) {
	        if (data.flipped) {
	          instance.popperInstance.options.placement = data.placement;
	        }

	        setFlipModifierEnabled(instance.popperInstance.modifiers, false);
	      }

	      tooltip.setAttribute('data-placement', instance.state.currentPlacement);

	      if (data.attributes['x-out-of-boundaries'] !== false) {
	        tooltip.setAttribute('data-out-of-boundaries', '');
	      } else {
	        tooltip.removeAttribute('data-out-of-boundaries');
	      } // Apply the `distance` prop


	      var basePlacement = getBasePlacement(instance.state.currentPlacement);
	      var tooltipStyles = tooltip.style;
	      tooltipStyles.top = '0';
	      tooltipStyles.left = '0';
	      tooltipStyles[getIsVerticalPlacement() ? 'top' : 'left'] = (getIsOppositePlacement() ? 1 : -1) * instance.props.distance + "px";
	      var padding = preventOverflowModifier && preventOverflowModifier.padding !== undefined ? preventOverflowModifier.padding : PREVENT_OVERFLOW_PADDING;
	      var isPaddingNumber = typeof padding === 'number';

	      var computedPadding = _extends({
	        top: isPaddingNumber ? padding : padding.top,
	        bottom: isPaddingNumber ? padding : padding.bottom,
	        left: isPaddingNumber ? padding : padding.left,
	        right: isPaddingNumber ? padding : padding.right
	      }, !isPaddingNumber && padding);

	      computedPadding[basePlacement] = isPaddingNumber ? padding + instance.props.distance : (padding[basePlacement] || 0) + instance.props.distance;
	      instance.popperInstance.modifiers.filter(function (m) {
	        return m.name === 'preventOverflow';
	      })[0].padding = computedPadding;
	    }

	    var config = _extends({
	      eventsEnabled: false,
	      placement: normalizedPlacement
	    }, popperOptions, {
	      modifiers: _extends({}, popperOptions ? popperOptions.modifiers : {}, {
	        preventOverflow: _extends({
	          boundariesElement: instance.props.boundary,
	          padding: PREVENT_OVERFLOW_PADDING
	        }, preventOverflowModifier),
	        arrow: _extends({
	          element: arrow,
	          enabled: !!arrow
	        }, getModifier(popperOptions, 'arrow')),
	        flip: _extends({
	          enabled: instance.props.flip,
	          // The tooltip is offset by 10px from the popper in CSS,
	          // we need to account for its distance
	          padding: instance.props.distance + PREVENT_OVERFLOW_PADDING,
	          behavior: instance.props.flipBehavior
	        }, getModifier(popperOptions, 'flip')),
	        offset: _extends({
	          offset: instance.props.offset
	        }, getModifier(popperOptions, 'offset'))
	      }),
	      onCreate: function onCreate(data) {
	        applyMutations(data);
	        preserveInvocation(popperOptions && popperOptions.onCreate, config.onCreate, [data]);
	        runMountCallback();
	      },
	      onUpdate: function onUpdate(data) {
	        applyMutations(data);
	        preserveInvocation(popperOptions && popperOptions.onUpdate, config.onUpdate, [data]);
	        runMountCallback();
	      }
	    });

	    instance.popperInstance = new Popper(reference, popper, config);
	  }

	  function runMountCallback() {
	    if (!hasMountCallbackRun && currentMountCallback) {
	      hasMountCallbackRun = true;
	      reflow(popper);
	      currentMountCallback();
	    }
	  }

	  function mount() {
	    // The mounting callback (`currentMountCallback`) is only run due to a
	    // popperInstance update/create
	    hasMountCallbackRun = false;
	    var appendTo = instance.props.appendTo;
	    var parentNode = appendTo === 'parent' ? reference.parentNode : invokeWithArgsOrReturn(appendTo, [reference]); // The popper element needs to exist on the DOM before its position can be
	    // updated as Popper.js needs to read its dimensions

	    if (!parentNode.contains(popper)) {
	      parentNode.appendChild(popper);
	    }

	    if (instance.popperInstance) {
	      setFlipModifierEnabled(instance.popperInstance.modifiers, instance.props.flip);
	      instance.popperInstance.enableEventListeners(); // Mounting callback invoked in `onUpdate`

	      instance.popperInstance.scheduleUpdate();
	    } else {
	      // Mounting callback invoked in `onCreate`
	      createPopperInstance();
	      instance.popperInstance.enableEventListeners();
	    }
	  }

	  function scheduleShow(event) {
	    instance.clearDelayTimeouts();
	    instance.state.isScheduledToShow = true;

	    if (!instance.popperInstance) {
	      createPopperInstance();
	    }

	    if (event) {
	      instance.props.onTrigger(instance, event);
	    }

	    if (instance.props.wait) {
	      return instance.props.wait(instance, event);
	    }

	    addDocumentMouseDownListener();
	    var delay = getValue(instance.props.delay, 0, defaultProps.delay);

	    if (delay) {
	      showTimeout = setTimeout(function () {
	        instance.show();
	      }, delay);
	    } else {
	      instance.show();
	    }
	  }

	  function scheduleHide(event) {
	    instance.clearDelayTimeouts();
	    instance.props.onUntrigger(instance, event);

	    if (!instance.state.isVisible) {
	      removeDocumentMouseDownListener();
	      return;
	    }

	    instance.state.isScheduledToShow = false;
	    var delay = getValue(instance.props.delay, 1, defaultProps.delay);

	    if (delay) {
	      hideTimeout = setTimeout(function () {
	        if (instance.state.isVisible) {
	          instance.hide();
	        }
	      }, delay);
	    } else {
	      // Fixes a `transitionend` problem when it fires 1 frame too
	      // late sometimes, we don't want hide() to be called.
	      scheduleHideAnimationFrame = requestAnimationFrame(function () {
	        instance.hide();
	      });
	    }
	  }
	  /* ======================= 🔑 Public methods 🔑 ======================= */


	  function enable() {
	    instance.state.isEnabled = true;
	  }

	  function disable() {
	    instance.state.isEnabled = false;
	  }

	  function clearDelayTimeouts() {
	    clearTimeout(showTimeout);
	    clearTimeout(hideTimeout);
	    cancelAnimationFrame(scheduleHideAnimationFrame);
	  }

	  function setProps(partialProps) {

	    if (instance.state.isDestroyed) {
	      return;
	    }

	    removeTriggersFromEventListenersTarget();
	    var prevProps = instance.props;
	    var nextProps = evaluateProps(reference, _extends({}, instance.props, partialProps, {
	      ignoreAttributes: true
	    }));
	    nextProps.ignoreAttributes = hasOwnProperty$1(partialProps, 'ignoreAttributes') ? partialProps.ignoreAttributes || false : prevProps.ignoreAttributes;
	    instance.props = nextProps;
	    addTriggersToEventListenersTarget();
	    cleanupInteractiveMouseListeners();
	    debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
	    updatePopperElement(popper, prevProps, nextProps, instance.state.isVisible);
	    instance.popperChildren = getChildren(popper);

	    if (instance.popperInstance) {
	      if (POPPER_INSTANCE_DEPENDENCIES.some(function (prop) {
	        return hasOwnProperty$1(partialProps, prop) && partialProps[prop] !== prevProps[prop];
	      })) {
	        instance.popperInstance.destroy();
	        createPopperInstance();

	        if (instance.state.isVisible) {
	          instance.popperInstance.enableEventListeners();
	        }
	      } else {
	        instance.popperInstance.update();
	      }
	    }
	  }

	  function setContent(content) {
	    instance.setProps({
	      content: content
	    });
	  }

	  function show(duration, shouldPreventPopperTransition) {
	    if (duration === void 0) {
	      duration = getValue(instance.props.duration, 0, defaultProps.duration[1]);
	    }

	    if (shouldPreventPopperTransition === void 0) {
	      shouldPreventPopperTransition = true;
	    }


	    var isAlreadyVisible = instance.state.isVisible;
	    var isDestroyed = instance.state.isDestroyed;
	    var isDisabled = !instance.state.isEnabled;
	    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;

	    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
	      return;
	    } // Normalize `disabled` behavior across browsers.
	    // Firefox allows events on disabled elements, but Chrome doesn't.
	    // Using a wrapper element (i.e. <span>) is recommended.


	    if (getEventListenersTarget().hasAttribute('disabled')) {
	      return;
	    }

	    if (instance.props.onShow(instance) === false) {
	      return;
	    }

	    addDocumentMouseDownListener();
	    popper.style.visibility = 'visible';
	    instance.state.isVisible = true; // Prevent a transition of the popper from its previous position and of the
	    // elements at a different placement.

	    var transitionableElements = getTransitionableElements();
	    setTransitionDuration(shouldPreventPopperTransition ? transitionableElements.concat(popper) : transitionableElements, 0);

	    currentMountCallback = function currentMountCallback() {
	      if (!instance.state.isVisible) {
	        return;
	      } // Double update will apply correct mutations


	      instance.popperInstance.update();
	      instance.props.onMount(instance);
	      instance.state.isMounted = true; // The content should fade in after the backdrop has mostly filled the
	      // tooltip element. `clip-path` is the other alternative but is not well-
	      // supported and is buggy on some devices.

	      content.style.transitionDelay = instance.popperChildren.backdrop ? Math.round(duration / 12) + "ms" : '';

	      if (instance.props.sticky) {
	        makeSticky();
	      }

	      setTransitionDuration([popper], instance.props.updateDuration);
	      setTransitionDuration(transitionableElements, duration);
	      setVisibilityState(transitionableElements, 'visible');
	      onTransitionedIn(duration, function () {
	        if (instance.props.aria) {
	          getEventListenersTarget().setAttribute("aria-" + instance.props.aria, tooltip.id);
	        }

	        instance.props.onShown(instance);
	        instance.state.isShown = true;
	      });
	    };

	    mount();
	  }

	  function hide(duration) {
	    if (duration === void 0) {
	      duration = getValue(instance.props.duration, 1, defaultProps.duration[1]);
	    }


	    var isAlreadyHidden = !instance.state.isVisible && !isBeingDestroyed;
	    var isDestroyed = instance.state.isDestroyed;
	    var isDisabled = !instance.state.isEnabled && !isBeingDestroyed;

	    if (isAlreadyHidden || isDestroyed || isDisabled) {
	      return;
	    }

	    if (instance.props.onHide(instance) === false && !isBeingDestroyed) {
	      return;
	    }

	    removeDocumentMouseDownListener();
	    popper.style.visibility = 'hidden';
	    instance.state.isVisible = false;
	    instance.state.isShown = false;
	    var transitionableElements = getTransitionableElements();
	    setTransitionDuration(transitionableElements, duration);
	    setVisibilityState(transitionableElements, 'hidden');
	    onTransitionedOut(duration, function () {
	      if (instance.props.aria) {
	        getEventListenersTarget().removeAttribute("aria-" + instance.props.aria);
	      }

	      instance.popperInstance.disableEventListeners();
	      instance.popperInstance.options.placement = normalizedPlacement;
	      popper.parentNode.removeChild(popper);
	      instance.props.onHidden(instance);
	      instance.state.isMounted = false;
	    });
	  }

	  function destroy() {

	    if (instance.state.isDestroyed) {
	      return;
	    }

	    isBeingDestroyed = true;
	    instance.hide(0);
	    removeTriggersFromEventListenersTarget();
	    delete reference._tippy;

	    if (instance.popperInstance) {
	      instance.popperInstance.destroy();
	    }

	    isBeingDestroyed = false;
	    instance.state.isDestroyed = true;
	  }
	}

	/**
	 * Exported module
	 */
	function tippy(targets, optionalProps) {

	  bindGlobalEventListeners();

	  var props = _extends({}, defaultProps, optionalProps);

	  var elements = getArrayOfElements(targets);

	  var instances = elements.reduce(function (acc, reference) {
	    var instance = reference && createTippy(reference, props);

	    if (instance) {

	      acc.push(instance);
	    }

	    return acc;
	  }, []);
	  return isRealElement(targets) ? instances[0] : instances;
	}

	tippy.version = version;
	tippy.defaultProps = defaultProps;
	tippy.currentInput = currentInput;
	/**
	 * Mutates the defaultProps object by setting the props specified
	 */

	tippy.setDefaultProps = function (partialProps) {

	  Object.keys(partialProps).forEach(function (key) {
	    // @ts-ignore
	    defaultProps[key] = partialProps[key];
	  });
	};
	/**
	 * Hides all visible poppers on the document
	 */


	tippy.hideAll = function (_temp) {
	  var _ref = _temp === void 0 ? {} : _temp,
	      excludedReferenceOrInstance = _ref.exclude,
	      duration = _ref.duration;

	  arrayFrom(document.querySelectorAll(POPPER_SELECTOR)).forEach(function (popper) {
	    var instance = popper._tippy;

	    if (instance) {
	      var isExcluded = false;

	      if (excludedReferenceOrInstance) {
	        isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : popper === excludedReferenceOrInstance.popper;
	      }

	      if (!isExcluded) {
	        instance.hide(duration);
	      }
	    }
	  });
	};
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

	if (isBrowser) {
	  setTimeout(autoInit);
	}

	/**!
	* tippy.js v5.0.0-alpha.2
	* (c) 2017-2019 atomiks
	* MIT License
	*/

	var css = ".tippy-tooltip[data-animation=fade][data-state=hidden]{opacity:0}.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{pointer-events:none;max-width:calc(100% - 8px);transition-timing-function:cubic-bezier(.165,.84,.44,1)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;line-height:1.4;background-color:#333;overflow:hidden;transition-property:visibility,opacity,transform;outline:0}.tippy-tooltip[data-placement^=top] .tippy-arrow{border-width:8px 8px 0;border-top-color:#333;margin:0 3px;transform-origin:50% 0;bottom:-7px}.tippy-tooltip[data-placement^=bottom] .tippy-arrow{border-width:0 8px 8px;border-bottom-color:#333;margin:0 3px;transform-origin:50% 7px;top:-7px}.tippy-tooltip[data-placement^=left] .tippy-arrow{border-width:8px 0 8px 8px;border-left-color:#333;margin:3px 0;transform-origin:0 50%;right:-7px}.tippy-tooltip[data-placement^=right] .tippy-arrow{border-width:8px 8px 8px 0;border-right-color:#333;margin:3px 0;transform-origin:7px 50%;left:-7px}.tippy-tooltip[data-arrow]{overflow:visible}.tippy-tooltip[data-animatefill]{background-color:transparent!important}.tippy-tooltip[data-interactive]{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow{border-color:transparent;border-style:solid;position:absolute}.tippy-arrow[data-state=hidden]{opacity:0}.tippy-content{padding:.3125rem .5625rem}";

	/**
	 * Injects a string of CSS styles to a style node in <head>
	 */

	function injectCSS(css) {
	  if (isBrowser) {
	    var style = document.createElement('style');
	    style.textContent = css;
	    style.setAttribute('data-tippy-stylesheet', '');
	    var head = document.head;
	    var firstStyleOrLinkTag = head.querySelector('style,link');

	    if (firstStyleOrLinkTag) {
	      head.insertBefore(style, firstStyleOrLinkTag);
	    } else {
	      head.appendChild(style);
	    }
	  }
	}

	injectCSS(css);

	var missingTippy = 'Using the attachment feature of Shepherd requires the Tippy.js library';

	function ownKeys$4(object, enumerableOnly) { var keys = keys$3(object); if (getOwnPropertySymbols$2) { var symbols = getOwnPropertySymbols$2(object); if (enumerableOnly) symbols = filter$2(symbols).call(symbols, function (sym) { return getOwnPropertyDescriptor$6(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; forEach$2(_context = ownKeys$4(source, true)).call(_context, function (key) { defineProperty$8(target, key, source[key]); }); } else if (getOwnPropertyDescriptors$2) { defineProperties$1(target, getOwnPropertyDescriptors$2(source)); } else { var _context2; forEach$2(_context2 = ownKeys$4(source)).call(_context2, function (key) { defineProperty$7(target, key, getOwnPropertyDescriptor$6(source, key)); }); } } return target; }

	var addShepherdClass = _createClassModifier('shepherd');

	var addHasTitleClass = _createClassModifier('shepherd-has-title');

	var centeredStylePopperModifier = {
	  computeStyle: {
	    enabled: true,
	    fn: function fn(data) {
	      data.styles = assign$2({}, data.styles, {
	        left: '50%',
	        top: '50%',
	        transform: 'translate(-50%, -50%)'
	      });
	      return data;
	    }
	  },
	  addShepherdClass: addShepherdClass
	}; // Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)

	var defaultPopperOptions = {
	  positionFixed: true,
	  modifiers: {
	    addShepherdClass: addShepherdClass
	  }
	};
	/**
	 * TODO rewrite the way items are being added to use more performant documentFragment code
	 * @param html
	 * @return {HTMLElement} The element created from the passed HTML string
	 */

	function createFromHTML(html) {
	  var el = document.createElement('div');
	  el.innerHTML = html;
	  return el.children[0];
	}
	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 * @param {Function} func The function to invoke
	 * @param {Number} wait The time to wait in ms
	 * @param {Boolean} immediate If true, the function will be invoked immediately
	 * @return {Function}
	 */

	function debounce$2(func, wait, immediate) {
	  var timeout;
	  return function () {
	    var context = this;
	    var args = arguments;

	    var later = function later() {
	      timeout = null;

	      if (!immediate) {
	        func.apply(context, args);
	      }
	    };

	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout$2(later, wait);

	    if (callNow) {
	      func.apply(context, args);
	    }
	  };
	}
	/**
	 * Determines options for the tooltip and initializes
	 * `step.tooltip` as a Tippy.js instance.
	 * @param {Step} step The step instance
	 */

	function setupTooltip(step) {
	  if (isUndefined(tippy)) {
	    throw new Error(missingTippy);
	  }

	  if (step.tooltip) {
	    step.tooltip.destroy();
	  }

	  var attachToOpts = parseAttachTo(step);
	  step.tooltip = _makeTippyInstance(attachToOpts, step);
	  step.target = attachToOpts.element || document.body;
	  step.el.classList.add('shepherd-element');
	}
	/**
	 * Checks if options.attachTo.element is a string, and if so, tries to find the element
	 * @param {Step} step The step instance
	 * @returns {{element, on}}
	 * `element` is a qualified HTML Element
	 * `on` is a string position value
	 */

	function parseAttachTo(step) {
	  var options = step.options.attachTo || {};

	  var returnOpts = assign$2({}, options);

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
	 * Create a popper modifier for adding the passed className to the popper
	 * @param {string} className The class to add to the popper
	 * @return {{fn(*): *, enabled: boolean}|*}
	 * @private
	 */

	function _createClassModifier(className) {
	  return {
	    enabled: true,
	    fn: function fn(data) {
	      data.instance.popper.classList.add(className);
	      return data;
	    }
	  };
	}
	/**
	 * Generates a `Tippy` instance from a set of base `attachTo` options
	 * @param attachToOptions
	 * @param {Step} step The step instance
	 * @return {tippy|Instance | Instance[]} The final tippy instance
	 * @private
	 */


	function _makeTippyInstance(attachToOptions, step) {
	  if (!attachToOptions.element) {
	    return _makeCenteredTippy(step);
	  }

	  var tippyOptions = _makeAttachedTippyOptions(attachToOptions, step);

	  return tippy(attachToOptions.element, tippyOptions);
	}
	/**
	 * Generates the hash of options that will be passed to `Tippy` instances
	 * target an element in the DOM.
	 *
	 * @param {Object} attachToOptions The local `attachTo` options
	 * @param {Step} step The step instance
	 * @return {Object} The final tippy options  object
	 * @private
	 */


	function _makeAttachedTippyOptions(attachToOptions, step) {
	  var resultingTippyOptions = {
	    content: step.el,
	    flipOnUpdate: true,
	    placement: attachToOptions.on || 'right'
	  };

	  assign$2(resultingTippyOptions, step.options.tippyOptions);

	  if (step.options.title) {
	    assign$2(defaultPopperOptions.modifiers, {
	      addHasTitleClass: addHasTitleClass
	    });
	  }

	  if (step.options.tippyOptions && step.options.tippyOptions.popperOptions) {
	    assign$2(defaultPopperOptions, step.options.tippyOptions.popperOptions);
	  }

	  resultingTippyOptions.popperOptions = defaultPopperOptions;
	  return resultingTippyOptions;
	}
	/**
	 * Generates a `Tippy` instance for a tooltip that doesn't have a
	 * target element in the DOM -- and thus is positioned in the center
	 * of the view
	 *
	 * @param {Step} step The step instance
	 * @return {tippy} The final tippy instance
	 * @private
	 */


	function _makeCenteredTippy(step) {
	  var tippyOptions = _objectSpread({
	    content: step.el,
	    placement: 'top'
	  }, step.options.tippyOptions);

	  tippyOptions.arrow = false;
	  tippyOptions.popperOptions = tippyOptions.popperOptions || {};

	  if (step.options.title) {
	    assign$2(defaultPopperOptions.modifiers, {
	      addHasTitleClass: addHasTitleClass
	    });
	  }

	  var finalPopperOptions = assign$2({}, defaultPopperOptions, tippyOptions.popperOptions, {
	    modifiers: assign$2(centeredStylePopperModifier, tippyOptions.popperOptions.modifiers)
	  });

	  tippyOptions.popperOptions = finalPopperOptions;
	  return tippy(document.body, tippyOptions);
	}

	if (!Element.prototype.matches) {
	    Element.prototype.matches =
	        Element.prototype.matchesSelector ||
	        Element.prototype.msMatchesSelector ||
	        Element.prototype.webkitMatchesSelector;
	}

	var smoothscroll = createCommonjsModule(function (module, exports) {
	/* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
	(function () {

	  // polyfill
	  function polyfill() {
	    // aliases
	    var w = window;
	    var d = document;

	    // return if scroll behavior is supported and polyfill is not forced
	    if (
	      'scrollBehavior' in d.documentElement.style &&
	      w.__forceSmoothScrollPolyfill__ !== true
	    ) {
	      return;
	    }

	    // globals
	    var Element = w.HTMLElement || w.Element;
	    var SCROLL_TIME = 468;

	    // object gathering original scroll methods
	    var original = {
	      scroll: w.scroll || w.scrollTo,
	      scrollBy: w.scrollBy,
	      elementScroll: Element.prototype.scroll || scrollElement,
	      scrollIntoView: Element.prototype.scrollIntoView
	    };

	    // define timing method
	    var now =
	      w.performance && w.performance.now
	        ? w.performance.now.bind(w.performance)
	        : Date.now;

	    /**
	     * indicates if a the current browser is made by Microsoft
	     * @method isMicrosoftBrowser
	     * @param {String} userAgent
	     * @returns {Boolean}
	     */
	    function isMicrosoftBrowser(userAgent) {
	      var userAgentPatterns = ['MSIE ', 'Trident/', 'Edge/'];

	      return new RegExp(userAgentPatterns.join('|')).test(userAgent);
	    }

	    /*
	     * IE has rounding bug rounding down clientHeight and clientWidth and
	     * rounding up scrollHeight and scrollWidth causing false positives
	     * on hasScrollableSpace
	     */
	    var ROUNDING_TOLERANCE = isMicrosoftBrowser(w.navigator.userAgent) ? 1 : 0;

	    /**
	     * changes scroll position inside an element
	     * @method scrollElement
	     * @param {Number} x
	     * @param {Number} y
	     * @returns {undefined}
	     */
	    function scrollElement(x, y) {
	      this.scrollLeft = x;
	      this.scrollTop = y;
	    }

	    /**
	     * returns result of applying ease math function to a number
	     * @method ease
	     * @param {Number} k
	     * @returns {Number}
	     */
	    function ease(k) {
	      return 0.5 * (1 - Math.cos(Math.PI * k));
	    }

	    /**
	     * indicates if a smooth behavior should be applied
	     * @method shouldBailOut
	     * @param {Number|Object} firstArg
	     * @returns {Boolean}
	     */
	    function shouldBailOut(firstArg) {
	      if (
	        firstArg === null ||
	        typeof firstArg !== 'object' ||
	        firstArg.behavior === undefined ||
	        firstArg.behavior === 'auto' ||
	        firstArg.behavior === 'instant'
	      ) {
	        // first argument is not an object/null
	        // or behavior is auto, instant or undefined
	        return true;
	      }

	      if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
	        // first argument is an object and behavior is smooth
	        return false;
	      }

	      // throw error when behavior is not supported
	      throw new TypeError(
	        'behavior member of ScrollOptions ' +
	          firstArg.behavior +
	          ' is not a valid value for enumeration ScrollBehavior.'
	      );
	    }

	    /**
	     * indicates if an element has scrollable space in the provided axis
	     * @method hasScrollableSpace
	     * @param {Node} el
	     * @param {String} axis
	     * @returns {Boolean}
	     */
	    function hasScrollableSpace(el, axis) {
	      if (axis === 'Y') {
	        return el.clientHeight + ROUNDING_TOLERANCE < el.scrollHeight;
	      }

	      if (axis === 'X') {
	        return el.clientWidth + ROUNDING_TOLERANCE < el.scrollWidth;
	      }
	    }

	    /**
	     * indicates if an element has a scrollable overflow property in the axis
	     * @method canOverflow
	     * @param {Node} el
	     * @param {String} axis
	     * @returns {Boolean}
	     */
	    function canOverflow(el, axis) {
	      var overflowValue = w.getComputedStyle(el, null)['overflow' + axis];

	      return overflowValue === 'auto' || overflowValue === 'scroll';
	    }

	    /**
	     * indicates if an element can be scrolled in either axis
	     * @method isScrollable
	     * @param {Node} el
	     * @param {String} axis
	     * @returns {Boolean}
	     */
	    function isScrollable(el) {
	      var isScrollableY = hasScrollableSpace(el, 'Y') && canOverflow(el, 'Y');
	      var isScrollableX = hasScrollableSpace(el, 'X') && canOverflow(el, 'X');

	      return isScrollableY || isScrollableX;
	    }

	    /**
	     * finds scrollable parent of an element
	     * @method findScrollableParent
	     * @param {Node} el
	     * @returns {Node} el
	     */
	    function findScrollableParent(el) {
	      while (el !== d.body && isScrollable(el) === false) {
	        el = el.parentNode || el.host;
	      }

	      return el;
	    }

	    /**
	     * self invoked function that, given a context, steps through scrolling
	     * @method step
	     * @param {Object} context
	     * @returns {undefined}
	     */
	    function step(context) {
	      var time = now();
	      var value;
	      var currentX;
	      var currentY;
	      var elapsed = (time - context.startTime) / SCROLL_TIME;

	      // avoid elapsed times higher than one
	      elapsed = elapsed > 1 ? 1 : elapsed;

	      // apply easing to elapsed time
	      value = ease(elapsed);

	      currentX = context.startX + (context.x - context.startX) * value;
	      currentY = context.startY + (context.y - context.startY) * value;

	      context.method.call(context.scrollable, currentX, currentY);

	      // scroll more if we have not reached our destination
	      if (currentX !== context.x || currentY !== context.y) {
	        w.requestAnimationFrame(step.bind(w, context));
	      }
	    }

	    /**
	     * scrolls window or element with a smooth behavior
	     * @method smoothScroll
	     * @param {Object|Node} el
	     * @param {Number} x
	     * @param {Number} y
	     * @returns {undefined}
	     */
	    function smoothScroll(el, x, y) {
	      var scrollable;
	      var startX;
	      var startY;
	      var method;
	      var startTime = now();

	      // define scroll context
	      if (el === d.body) {
	        scrollable = w;
	        startX = w.scrollX || w.pageXOffset;
	        startY = w.scrollY || w.pageYOffset;
	        method = original.scroll;
	      } else {
	        scrollable = el;
	        startX = el.scrollLeft;
	        startY = el.scrollTop;
	        method = scrollElement;
	      }

	      // scroll looping over a frame
	      step({
	        scrollable: scrollable,
	        method: method,
	        startTime: startTime,
	        startX: startX,
	        startY: startY,
	        x: x,
	        y: y
	      });
	    }

	    // ORIGINAL METHODS OVERRIDES
	    // w.scroll and w.scrollTo
	    w.scroll = w.scrollTo = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        original.scroll.call(
	          w,
	          arguments[0].left !== undefined
	            ? arguments[0].left
	            : typeof arguments[0] !== 'object'
	              ? arguments[0]
	              : w.scrollX || w.pageXOffset,
	          // use top prop, second argument if present or fallback to scrollY
	          arguments[0].top !== undefined
	            ? arguments[0].top
	            : arguments[1] !== undefined
	              ? arguments[1]
	              : w.scrollY || w.pageYOffset
	        );

	        return;
	      }

	      // LET THE SMOOTHNESS BEGIN!
	      smoothScroll.call(
	        w,
	        d.body,
	        arguments[0].left !== undefined
	          ? ~~arguments[0].left
	          : w.scrollX || w.pageXOffset,
	        arguments[0].top !== undefined
	          ? ~~arguments[0].top
	          : w.scrollY || w.pageYOffset
	      );
	    };

	    // w.scrollBy
	    w.scrollBy = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0])) {
	        original.scrollBy.call(
	          w,
	          arguments[0].left !== undefined
	            ? arguments[0].left
	            : typeof arguments[0] !== 'object' ? arguments[0] : 0,
	          arguments[0].top !== undefined
	            ? arguments[0].top
	            : arguments[1] !== undefined ? arguments[1] : 0
	        );

	        return;
	      }

	      // LET THE SMOOTHNESS BEGIN!
	      smoothScroll.call(
	        w,
	        d.body,
	        ~~arguments[0].left + (w.scrollX || w.pageXOffset),
	        ~~arguments[0].top + (w.scrollY || w.pageYOffset)
	      );
	    };

	    // Element.prototype.scroll and Element.prototype.scrollTo
	    Element.prototype.scroll = Element.prototype.scrollTo = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        // if one number is passed, throw error to match Firefox implementation
	        if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
	          throw new SyntaxError('Value could not be converted');
	        }

	        original.elementScroll.call(
	          this,
	          // use left prop, first number argument or fallback to scrollLeft
	          arguments[0].left !== undefined
	            ? ~~arguments[0].left
	            : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft,
	          // use top prop, second argument or fallback to scrollTop
	          arguments[0].top !== undefined
	            ? ~~arguments[0].top
	            : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop
	        );

	        return;
	      }

	      var left = arguments[0].left;
	      var top = arguments[0].top;

	      // LET THE SMOOTHNESS BEGIN!
	      smoothScroll.call(
	        this,
	        this,
	        typeof left === 'undefined' ? this.scrollLeft : ~~left,
	        typeof top === 'undefined' ? this.scrollTop : ~~top
	      );
	    };

	    // Element.prototype.scrollBy
	    Element.prototype.scrollBy = function() {
	      // avoid action when no arguments are passed
	      if (arguments[0] === undefined) {
	        return;
	      }

	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        original.elementScroll.call(
	          this,
	          arguments[0].left !== undefined
	            ? ~~arguments[0].left + this.scrollLeft
	            : ~~arguments[0] + this.scrollLeft,
	          arguments[0].top !== undefined
	            ? ~~arguments[0].top + this.scrollTop
	            : ~~arguments[1] + this.scrollTop
	        );

	        return;
	      }

	      this.scroll({
	        left: ~~arguments[0].left + this.scrollLeft,
	        top: ~~arguments[0].top + this.scrollTop,
	        behavior: arguments[0].behavior
	      });
	    };

	    // Element.prototype.scrollIntoView
	    Element.prototype.scrollIntoView = function() {
	      // avoid smooth behavior if not required
	      if (shouldBailOut(arguments[0]) === true) {
	        original.scrollIntoView.call(
	          this,
	          arguments[0] === undefined ? true : arguments[0]
	        );

	        return;
	      }

	      // LET THE SMOOTHNESS BEGIN!
	      var scrollableParent = findScrollableParent(this);
	      var parentRects = scrollableParent.getBoundingClientRect();
	      var clientRects = this.getBoundingClientRect();

	      if (scrollableParent !== d.body) {
	        // reveal element inside parent
	        smoothScroll.call(
	          this,
	          scrollableParent,
	          scrollableParent.scrollLeft + clientRects.left - parentRects.left,
	          scrollableParent.scrollTop + clientRects.top - parentRects.top
	        );

	        // reveal parent in viewport unless is fixed
	        if (w.getComputedStyle(scrollableParent).position !== 'fixed') {
	          w.scrollBy({
	            left: parentRects.left,
	            top: parentRects.top,
	            behavior: 'smooth'
	          });
	        }
	      } else {
	        // reveal element in viewport
	        w.scrollBy({
	          left: clientRects.left,
	          top: clientRects.top,
	          behavior: 'smooth'
	        });
	      }
	    };
	  }

	  {
	    // commonjs
	    module.exports = { polyfill: polyfill };
	  }

	}());
	});
	var smoothscroll_1 = smoothscroll.polyfill;

	smoothscroll.polyfill();
	/**
	 * Creates incremented ID for each newly created step
	 *
	 * @return {Function} A function that returns the unique id for the step
	 * @private
	 */

	var uniqueId = function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	}();
	/**
	 * A class representing steps to be added to a tour.
	 * @extends {Evented}
	 */


	var Step =
	/*#__PURE__*/
	function (_Evented) {
	  inherits(Step, _Evented);

	  /**
	   * Create a step
	   * @param {Tour} tour The tour for the step
	   * @param {Object} options The options for the step
	   * @param {Object} options.attachTo What element the step should be attached to on the page.
	   * It should be an object with the properties `element` and `on`, where `element` is an element selector string
	   * or a DOM element and `on` is the optional direction to place the Tippy tooltip.
	   *
	   * ```js
	   * const new Step(tour, {
	   *   attachTo: { element: '.some .selector-path', on: 'left' },
	   *   ...moreOptions
	   * })'
	   * ```
	   *
	   * If you don’t specify an attachTo the element will appear in the middle of the screen.
	   * If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
	   * in the middle of the screen, without an arrow pointing to the target.
	   * @param {HTMLElement|string} options.attachTo.element
	   * @param {string} options.attachTo.on
	   * @param {Object} options.advanceOn An action on the page which should advance shepherd to the next step.
	   * It should be an object with a string `selector` and an `event` name
	   * ```js
	   * const new Step(tour, {
	   *   advanceOn: { selector: '.some .selector-path', event: 'click' },
	   *   ...moreOptions
	   * })'
	   * ```
	   * `event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
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
	   * @param {boolean|Object} options.scrollTo Should the element be scrolled to when this step is shown? If true, uses the default `scrollIntoView`,
	   * if an object, passes that object as the params to `scrollIntoView` i.e. `{behavior: 'smooth', block: 'center'}`
	   * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
	   * define a custom action to do the scrolling, and possibly other logic.
	   * @param {boolean} options.showCancelLink Should a cancel “✕” be shown in the header of the step?
	   * @param {function} options.showOn A function that, when it returns `true`, will show the step.
	   * If it returns false, the step will be skipped.
	   * @param {string} options.text The text in the body of the step. It can be one of three types:
	   * ```
	   * - HTML string
	   * - `HTMLElement` object
	   * - `Function` to be executed when the step is built. It must return one the two options above.
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
	   * @param {Number} options.modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
	   * @return {Step} The newly created Step instance
	   */
	  function Step(tour, options) {
	    var _this;

	    classCallCheck(this, Step);

	    _this = possibleConstructorReturn(this, getPrototypeOf$3(Step).call(this, tour, options));
	    _this.tour = tour;
	    autoBind(assertThisInitialized(_this));

	    _this._setOptions(options);

	    return possibleConstructorReturn(_this, assertThisInitialized(_this));
	  }
	  /**
	   * Cancel the tour
	   * Triggers the `cancel` event
	   */


	  createClass(Step, [{
	    key: "cancel",
	    value: function cancel() {
	      this.tour.cancel();
	      this.trigger('cancel');
	    }
	    /**
	     * Complete the tour
	     * Triggers the `complete` event
	     */

	  }, {
	    key: "complete",
	    value: function complete() {
	      this.tour.complete();
	      this.trigger('complete');
	    }
	    /**
	     * Remove the step, delete the step's element, and destroy the tippy instance for the step
	     * Triggers `destroy` event
	     */

	  }, {
	    key: "destroy",
	    value: function destroy() {
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
	     * Returns the tour for the step
	     * @return {Tour} The tour instance
	     */

	  }, {
	    key: "getTour",
	    value: function getTour() {
	      return this.tour;
	    }
	    /**
	     * Hide the step and destroy the tippy instance
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
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

	  }, {
	    key: "isOpen",
	    value: function isOpen() {
	      return Boolean(this.tooltip && this.tooltip.state && this.tooltip.state.isVisible);
	    }
	    /**
	     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
	     * @return {*|Promise}
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      var _this2 = this;

	      if (isFunction(this.options.beforeShowPromise)) {
	        var beforeShowPromise = this.options.beforeShowPromise();

	        if (!isUndefined(beforeShowPromise)) {
	          return beforeShowPromise.then(function () {
	            return _this2._show();
	          });
	        }
	      }

	      this._show();
	    }
	    /**
	     * Adds buttons to the step as passed into options
	     *
	     * @param {HTMLElement} content The element for the step, to append the footer with buttons to
	     * @private
	     */

	  }, {
	    key: "_addButtons",
	    value: function _addButtons(content) {
	      var _this3 = this;

	      if (isArray$5(this.options.buttons) && this.options.buttons.length) {
	        var _context;

	        var footer = document.createElement('footer');
	        footer.classList.add('shepherd-footer');

	        map$2(_context = this.options.buttons).call(_context, function (cfg) {
	          var _context2;

	          var button = createFromHTML(concat$2(_context2 = "<button class=\"shepherd-button ".concat(cfg.classes || '', "\" tabindex=\"0\">")).call(_context2, cfg.text, "</button>"));
	          footer.appendChild(button);
	          bindButtonEvents(cfg, button, _this3);
	        });

	        content.appendChild(footer);
	      }
	    }
	    /**
	     * Adds the "x" button to cancel the tour
	     * @param {HTMLElement} element The step element
	     * @param {HTMLElement} header The header element for the step
	     * @private
	     */

	  }, {
	    key: "_addCancelLink",
	    value: function _addCancelLink(element, header) {
	      if (this.options.showCancelLink) {
	        var link = createFromHTML('<a href class="shepherd-cancel-link"></a>');
	        header.appendChild(link);
	        element.classList.add('shepherd-has-cancel-link');
	        bindCancelLink(link, this);
	      }
	    }
	    /**
	     * Adds text passed in as options
	     *
	     * @param {HTMLElement} content The content to append the text to
	     * @param {string} descriptionId The id to set on the shepherd-text element
	     * for the parent element to use for aria-describedby
	     * @private
	     */

	  }, {
	    key: "_addContent",
	    value: function _addContent(content, descriptionId) {
	      var textContainer = createFromHTML("<div class=\"shepherd-text\"\n       id=\"".concat(descriptionId, "\"\n       ></div>"));
	      var text = this.options.text;

	      if (isFunction(text)) {
	        text = text.call(this, textContainer);
	      } // If the test is already and HTMLElement, we append it, if it is a string, we add it to `innerHTML`


	      isElement(text) ? textContainer.appendChild(text) : textContainer.innerHTML += text;
	      content.appendChild(textContainer);
	    }
	    /**
	     * Setup keydown events to allow closing the modal with ESC
	     *
	     * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
	     *
	     * @param {HTMLElement} element The element for the tooltip
	     * @private
	     */

	  }, {
	    key: "_addKeyDownHandler",
	    value: function _addKeyDownHandler(element) {
	      var _this4 = this;

	      var KEY_TAB = 9;
	      var KEY_ESC = 27;
	      var LEFT_ARROW = 37;
	      var RIGHT_ARROW = 39; // Get all elements that are focusable

	      var focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');

	      var _focusableElements = slicedToArray(focusableElements, 1),
	          firstFocusableElement = _focusableElements[0];

	      var lastFocusableElement = focusableElements[focusableElements.length - 1];
	      element.addEventListener('keydown', function (e) {
	        switch (e.keyCode) {
	          case KEY_TAB:
	            if (focusableElements.length === 1) {
	              e.preventDefault();
	              break;
	            } // Backward tab


	            if (e.shiftKey) {
	              if (document.activeElement === firstFocusableElement) {
	                e.preventDefault();
	                lastFocusableElement.focus();
	              }
	            } else {
	              if (document.activeElement === lastFocusableElement) {
	                e.preventDefault();
	                firstFocusableElement.focus();
	              }
	            }

	            break;

	          case KEY_ESC:
	            _this4.cancel();

	            break;

	          case LEFT_ARROW:
	            _this4.tour.back();

	            break;

	          case RIGHT_ARROW:
	            _this4.tour.next();

	            break;

	          default:
	            break;
	        }
	      });
	    }
	    /**
	     * Creates Shepherd element for step based on options
	     *
	     * @return {HTMLElement} The DOM element for the step tooltip
	     * @private
	     */

	  }, {
	    key: "_createTooltipContent",
	    value: function _createTooltipContent() {
	      var _context3;

	      var content = document.createElement('div');
	      var classes = this.options.classes || '';
	      var descriptionId = "".concat(this.id, "-description");
	      var labelId = "".concat(this.id, "-label");
	      var element = createFromHTML(concat$2(_context3 = "<div class=\"".concat(classes, "\"\n       data-shepherd-step-id=\"")).call(_context3, this.id, "\"\n       role=\"dialog\"\n       tabindex=\"0\">"));
	      var header = document.createElement('header');

	      if (this.options.title) {
	        var title = document.createElement('h3');
	        title.classList.add('shepherd-title');
	        title.innerHTML = "".concat(this.options.title);
	        title.id = labelId;
	        element.setAttribute('aria-labeledby', labelId);
	        header.appendChild(title);
	      }

	      content.classList.add('shepherd-content');
	      header.classList.add('shepherd-header');
	      element.appendChild(content);
	      content.appendChild(header);

	      if (!isUndefined(this.options.text)) {
	        this._addContent(content, descriptionId);

	        element.setAttribute('aria-describedby', descriptionId);
	      }

	      this._addButtons(content);

	      this._addCancelLink(element, header);

	      return element;
	    }
	    /**
	     * If a custom scrollToHandler is defined, call that, otherwise do the generic
	     * scrollIntoView call.
	     *
	     * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
	     * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
	     * @private
	     */

	  }, {
	    key: "_scrollTo",
	    value: function _scrollTo(scrollToOptions) {
	      var _parseAttachTo = parseAttachTo(this),
	          element = _parseAttachTo.element;

	      if (isFunction(this.options.scrollToHandler)) {
	        this.options.scrollToHandler(element);
	      } else if (isElement(element)) {
	        element.scrollIntoView(scrollToOptions);
	      }
	    }
	    /**
	     * Sets the options for the step, maps `when` to events, sets up buttons
	     * @param {Object} options The options for the step
	     * @private
	     */

	  }, {
	    key: "_setOptions",
	    value: function _setOptions() {
	      var _this5 = this;

	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      this.options = options;
	      var when = this.options.when;
	      this.destroy();
	      this.id = this.options.id || "step-".concat(uniqueId());

	      if (when) {
	        var _context4;

	        forEach$2(_context4 = entries$2(when)).call(_context4, function (_ref) {
	          var _ref2 = slicedToArray(_ref, 2),
	              event = _ref2[0],
	              handler = _ref2[1];

	          _this5.on(event, handler, _this5);
	        });
	      }
	    }
	    /**
	     * Create the element and set up the tippy instance
	     * @private
	     */

	  }, {
	    key: "_setupElements",
	    value: function _setupElements() {
	      if (!isUndefined(this.el)) {
	        this.destroy();
	      }

	      this.el = this._createTooltipContent();

	      this._addKeyDownHandler(this.el);

	      if (this.options.advanceOn) {
	        bindAdvance(this);
	      }

	      setupTooltip(this);
	    }
	    /**
	     * Triggers `before-show`, generates the tooltip DOM content,
	     * sets up a tippy instance for the tooltip, then triggers `show`.
	     * @private
	     */

	  }, {
	    key: "_show",
	    value: function _show() {
	      var _this6 = this;

	      this.tour.modal.setupForStep(this);

	      this._styleTargetElementForStep(this);

	      this.trigger('before-show');

	      if (!this.el) {
	        this._setupElements();
	      }

	      this.target.classList.add('shepherd-enabled', 'shepherd-target');
	      document.body.setAttribute('data-shepherd-step', this.id);

	      if (this.options.scrollTo) {
	        setTimeout$2(function () {
	          _this6._scrollTo(_this6.options.scrollTo);
	        });
	      }

	      this.tooltip.show();
	      this.trigger('show');
	      this.el.focus();
	    }
	    /**
	     * Modulates the styles of the passed step's target element, based on the step's options and
	     * the tour's `modal` option, to visually emphasize the element
	     *
	     * @param step The step object that attaches to the element
	     * @private
	     */

	  }, {
	    key: "_styleTargetElementForStep",
	    value: function _styleTargetElementForStep(step) {
	      var targetElement = getElementForStep(step);

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
	     * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
	     * and 'shepherd-target' classes
	     * @private
	     */

	  }, {
	    key: "_updateStepTargetOnHide",
	    value: function _updateStepTargetOnHide() {
	      if (this.options.highlightClass) {
	        this.target.classList.remove(this.options.highlightClass);
	      }

	      this.target.classList.remove('shepherd-enabled', 'shepherd-target');
	    }
	  }]);

	  return Step;
	}(Evented);

	var $some = arrayIteration.some;


	// `Array.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.some
	_export({ target: 'Array', proto: true, forced: sloppyArrayMethod('some') }, {
	  some: function some(callbackfn /* , thisArg */) {
	    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var some = entryVirtual('Array').some;

	var ArrayPrototype$7 = Array.prototype;

	var some_1 = function (it) {
	  var own = it.some;
	  return it === ArrayPrototype$7 || (it instanceof Array && own === ArrayPrototype$7.some) ? some : own;
	};

	var some$1 = some_1;

	var some$2 = some$1;

	var $find = arrayIteration.find;


	var FIND = 'find';
	var SKIPS_HOLES = true;

	// Shouldn't skip holes
	if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

	// `Array.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.find
	_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
	  find: function find(callbackfn /* , that = undefined */) {
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var find$1 = entryVirtual('Array').find;

	var ArrayPrototype$8 = Array.prototype;

	var find_1 = function (it) {
	  var own = it.find;
	  return it === ArrayPrototype$8 || (it instanceof Array && own === ArrayPrototype$8.find) ? find$1 : own;
	};

	var find$2 = find_1;

	var find$3 = find$2;

	var $indexOf = arrayIncludes.indexOf;


	var nativeIndexOf = [].indexOf;

	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
	var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

	// `Array.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	_export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? nativeIndexOf.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var indexOf$1 = entryVirtual('Array').indexOf;

	var ArrayPrototype$9 = Array.prototype;

	var indexOf_1 = function (it) {
	  var own = it.indexOf;
	  return it === ArrayPrototype$9 || (it instanceof Array && own === ArrayPrototype$9.indexOf) ? indexOf$1 : own;
	};

	var indexOf$2 = indexOf_1;

	var indexOf$3 = indexOf$2;

	var bodyScrollLock_min = createCommonjsModule(function (module, exports) {
	!function(e,t){t(exports);}(commonjsGlobal,function(exports){function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0;}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e);}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return !(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return !!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0);});};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY);},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()));},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0);}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px");}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden");});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o]);}var n;},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null;}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[]);},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1);}else(c=c.filter(function(e){return e.targetElement!==t})).length||o();};});
	});

	var bodyScrollLock = unwrapExports(bodyScrollLock_min);

	var Modal =
	/*#__PURE__*/
	function () {
	  function Modal(options) {
	    classCallCheck(this, Modal);

	    this.createModalOverlay();
	    this.options = options;
	    autoBind(this);
	    return this;
	  }
	  /**
	   * Removes svg mask from modal overlay and removes classes for modal being visible
	   */


	  createClass(Modal, [{
	    key: "cleanup",
	    value: function cleanup() {
	      var element = this._modalOverlayElem;

	      if (element && element instanceof SVGElement) {
	        element.parentNode.removeChild(element);
	      }

	      this._modalOverlayElem = null;
	      document.body.classList.remove(classNames.isVisible);
	    }
	    /**
	     * Create the modal overlay, if it does not already exist
	     */

	  }, {
	    key: "createModalOverlay",
	    value: function createModalOverlay$1() {
	      if (!this._modalOverlayElem) {
	        var existingModal = document.getElementById('shepherdModalOverlayContainer');
	        this._modalOverlayElem = existingModal || createModalOverlay();
	        this._modalOverlayOpening = getModalMaskOpening(this._modalOverlayElem); // don't show yet -- each step will control that

	        this.hide(); // Only add to the DOM if this is a new modal, not reusing another one

	        if (!existingModal) {
	          document.body.appendChild(this._modalOverlayElem);
	        }
	      }
	    }
	    /**
	     * Hide the modal overlay
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      document.body.classList.remove(classNames.isVisible);

	      if (this._modalOverlayElem) {
	        this._modalOverlayElem.style.display = 'none';
	      }
	    }
	    /**
	     * If modal is enabled, setup the svg mask opening and modal overlay for the step
	     * @param {Step} step The step instance
	     */

	  }, {
	    key: "setupForStep",
	    value: function setupForStep(step) {
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

	  }, {
	    key: "show",
	    value: function show() {
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

	  }, {
	    key: "_styleForStep",
	    value: function _styleForStep(step) {
	      var modalOverlayOpening = this._modalOverlayOpening;
	      var targetElement = getElementForStep(step);
	      var modalOverlayOpeningPadding = step.options.modalOverlayOpeningPadding;

	      if (targetElement) {
	        positionModalOpening(targetElement, modalOverlayOpening, modalOverlayOpeningPadding);
	        this._onScreenChange = debounce$2(bind$2(positionModalOpening).call(positionModalOpening, this, targetElement, modalOverlayOpening, modalOverlayOpeningPadding), 0);
	        addStepEventListeners.call(this);
	      } else {
	        closeModalOpening(this._modalOverlayOpening);
	      }
	    }
	  }]);

	  return Modal;
	}();

	var defaults = {
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
	    var steps = tour.steps;

	    forEach$2(steps).call(steps, function (step) {
	      if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
	        var stepElement = getElementForStep(step);

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
	 * @return {Function} A function that returns the unique id for the tour
	 * @private
	 */

	var uniqueId$1 = function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	}();

	var Shepherd = new Evented();
	/**
	 * Class representing the site tour
	 * @extends {Evented}
	 */

	var Tour =
	/*#__PURE__*/
	function (_Evented) {
	  inherits(Tour, _Evented);

	  /**
	   * @param {Object} options The options for the tour
	   * @param {Object} options.defaultStepOptions Default options for Steps ({@link Step#constructor}), created through `addStep`
	   * @param {boolean} options.disableScroll When set to true, will keep the user from scrolling with the scrollbar,
	   * mousewheel, arrow keys, etc. You may want to use this to ensure you are driving the scroll position with the tour.
	   * @param {Step[]} options.steps An array of Step instances to initialize the tour with
	   * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
	   * dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute
	   * whenever the tour becomes active.
	   * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
	   * modal overlay. If true, the overlay will create an opening around the target element so that it
	   * can remain interactive
	   * @returns {Tour}
	   */
	  function Tour() {
	    var _this;

	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    classCallCheck(this, Tour);

	    _this = possibleConstructorReturn(this, getPrototypeOf$3(Tour).call(this, options));
	    autoBind(assertThisInitialized(_this));
	    _this.options = options;
	    _this.steps = _this.options.steps || []; // Pass these events onto the global Shepherd object

	    var events = ['active', 'cancel', 'complete', 'inactive', 'show', 'start'];

	    map$2(events).call(events, function (event) {
	      (function (e) {
	        _this.on(e, function (opts) {
	          opts = opts || {};
	          opts.tour = assertThisInitialized(_this);
	          Shepherd.trigger(e, opts);
	        });
	      })(event);
	    });

	    _this.modal = new Modal(options);

	    _this._setTooltipDefaults();

	    _this._setTourID();

	    return possibleConstructorReturn(_this, assertThisInitialized(_this));
	  }
	  /**
	   * Adds a new step to the tour
	   * @param {Object|Number|Step|String} arg1
	   * When arg2 is defined, arg1 can either be a string or number, to use for the `id` for the step
	   * When arg2 is undefined, arg1 is either an object containing step options or a Step instance
	   * @param {Object|Step} arg2 An object containing step options or a Step instance
	   * @return {Step} The newly added step
	   */


	  createClass(Tour, [{
	    key: "addStep",
	    value: function addStep(arg1, arg2) {
	      var name, step; // If we just have one argument, we can assume it is an object of step options, with an id

	      if (isUndefined(arg2)) {
	        step = arg1;
	      } else {
	        name = arg1;
	        step = arg2;
	      }

	      if (!(step instanceof Step)) {
	        step = this._setupStep(step, name);
	      } else {
	        step.tour = this;
	      }

	      this.steps.push(step);
	      return step;
	    }
	    /**
	     * Go to the previous step in the tour
	     */

	  }, {
	    key: "back",
	    value: function back() {
	      var _context;

	      var index = indexOf$3(_context = this.steps).call(_context, this.currentStep);

	      this.show(index - 1, false);
	    }
	    /**
	     * Calls _done() triggering the 'cancel' event
	     * If `confirmCancel` is true, will show a window.confirm before cancelling
	     */

	  }, {
	    key: "cancel",
	    value: function cancel() {
	      if (this.options.confirmCancel) {
	        var cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
	        var stopTour = window.confirm(cancelMessage);

	        if (stopTour) {
	          this._done('cancel');
	        }
	      } else {
	        this._done('cancel');
	      }
	    }
	    /**
	     * Calls _done() triggering the `complete` event
	     */

	  }, {
	    key: "complete",
	    value: function complete() {
	      this._done('complete');
	    }
	    /**
	     * Gets the step from a given id
	     * @param {Number|String} id The id of the step to retrieve
	     * @return {Step} The step corresponding to the `id`
	     */

	  }, {
	    key: "getById",
	    value: function getById(id) {
	      var _context2;

	      return find$3(_context2 = this.steps).call(_context2, function (step) {
	        return step.id === id;
	      });
	    }
	    /**
	     * Gets the current step
	     * @returns {Step|null}
	     */

	  }, {
	    key: "getCurrentStep",
	    value: function getCurrentStep() {
	      return this.currentStep;
	    }
	    /**
	     * Hide the current step
	     */

	  }, {
	    key: "hide",
	    value: function hide() {
	      var currentStep = this.getCurrentStep();

	      if (currentStep) {
	        return currentStep.hide();
	      }
	    }
	    /**
	     * Check if the tour is active
	     * @return {boolean}
	     */

	  }, {
	    key: "isActive",
	    value: function isActive() {
	      return Shepherd.activeTour === this;
	    }
	    /**
	     * Go to the next step in the tour
	     * If we are at the end, call `complete`
	     */

	  }, {
	    key: "next",
	    value: function next() {
	      var _context3;

	      var index = indexOf$3(_context3 = this.steps).call(_context3, this.currentStep);

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

	  }, {
	    key: "removeStep",
	    value: function removeStep(name) {
	      var _context4,
	          _this2 = this;

	      var current = this.getCurrentStep(); // Find the step, destroy it and remove it from this.steps

	      some$2(_context4 = this.steps).call(_context4, function (step, i) {
	        if (step.id === name) {
	          var _context5;

	          if (step.isOpen()) {
	            step.hide();
	          }

	          step.destroy();

	          splice$2(_context5 = _this2.steps).call(_context5, i, 1);

	          return true;
	        }
	      });

	      if (current && current.id === name) {
	        this.currentStep = undefined; // If we have steps left, show the first one, otherwise just cancel the tour

	        this.steps.length ? this.show(0) : this.cancel();
	      }
	    }
	    /**
	     * Show a specific step in the tour
	     * @param {Number|String} key The key to look up the step by
	     * @param {Boolean} forward True if we are going forward, false if backward
	     */

	  }, {
	    key: "show",
	    value: function show() {
	      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var step = isString(key) ? this.getById(key) : this.steps[key];

	      if (step) {
	        this._updateStateBeforeShow();

	        var shouldSkipStep = isFunction(step.options.showOn) && !step.options.showOn(); // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal

	        if (shouldSkipStep) {
	          this._skipStep(step, forward);
	        } else {
	          this.trigger('show', {
	            step: step,
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

	  }, {
	    key: "start",
	    value: function start() {
	      this.trigger('start');

	      if (this.options.disableScroll) {
	        bodyScrollLock.disableBodyScroll();
	      }

	      this.currentStep = null;

	      this._setupActiveTour();

	      this.next();
	    }
	    /**
	     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
	     * @param {String} event The event name to trigger
	     * @private
	     */

	  }, {
	    key: "_done",
	    value: function _done(event) {
	      if (isArray$5(this.steps)) {
	        var _context6;

	        forEach$2(_context6 = this.steps).call(_context6, function (step) {
	          return step.destroy();
	        });
	      }

	      cleanupStepEventListeners.call(this);
	      cleanupSteps(this.tourObject);
	      this.trigger(event);
	      Shepherd.activeTour = null;

	      this._removeBodyAttrs();

	      this.trigger('inactive', {
	        tour: this
	      });

	      if (this.options.disableScroll) {
	        bodyScrollLock.clearAllBodyScrollLocks();
	      }

	      this.modal.cleanup();
	    }
	    /**
	     * Make this tour "active"
	     * @private
	     */

	  }, {
	    key: "_setupActiveTour",
	    value: function _setupActiveTour() {
	      this.modal.createModalOverlay();

	      this._addBodyAttrs();

	      this.trigger('active', {
	        tour: this
	      });
	      Shepherd.activeTour = this;
	    }
	    /**
	     * Setup a new step object
	     * @param {Object} stepOptions The object describing the options for the step
	     * @param {String|Number} name The string or number to use as the `id` for the step
	     * @return {Step} The step instance
	     * @private
	     */

	  }, {
	    key: "_setupStep",
	    value: function _setupStep(stepOptions, name) {
	      if (isString(name) || isNumber(name)) {
	        stepOptions.id = name.toString();
	      }

	      stepOptions = assign$2({}, this.options.defaultStepOptions, stepOptions);
	      return new Step(this, stepOptions);
	    }
	    /**
	     * Called when `showOn` evaluates to false, to skip the step
	     * @param {Step} step The step to skip
	     * @param {Boolean} forward True if we are going forward, false if backward
	     * @private
	     */

	  }, {
	    key: "_skipStep",
	    value: function _skipStep(step, forward) {
	      var _context7;

	      var index = indexOf$3(_context7 = this.steps).call(_context7, step);

	      var nextIndex = forward ? index + 1 : index - 1;
	      this.show(nextIndex, forward);
	    }
	    /**
	     * Set the tippy defaults
	     * @private
	     */

	  }, {
	    key: "_setTooltipDefaults",
	    value: function _setTooltipDefaults() {
	      tippy.setDefaultProps(defaults);
	    }
	    /**
	     * Before showing, hide the current step and if the tour is not
	     * already active, call `this._setupActiveTour`.
	     * @private
	     */

	  }, {
	    key: "_updateStateBeforeShow",
	    value: function _updateStateBeforeShow() {
	      if (this.currentStep) {
	        this.currentStep.hide();
	      }

	      if (!this.isActive()) {
	        this._setupActiveTour();
	      }
	    }
	    /**
	     * Sets this.id to `${tourName}--${uuid}`
	     * @private
	     */

	  }, {
	    key: "_setTourID",
	    value: function _setTourID() {
	      var _context8;

	      var tourName = this.options.tourName || 'tour';
	      var uuid = uniqueId$1();
	      this.id = concat$2(_context8 = "".concat(tourName, "--")).call(_context8, uuid);
	    }
	    /**
	     * Adds the data-shepherd-active-tour attribute and the 'shepherd-active'
	     * class to the body.
	     * @private
	     */

	  }, {
	    key: "_addBodyAttrs",
	    value: function _addBodyAttrs() {
	      document.body.setAttribute('data-shepherd-active-tour', this.id);
	      document.body.classList.add('shepherd-active');
	    }
	    /**
	     * Removes the data-shepherd-active-tour attribute and the 'shepherd-active'
	     * class from the body.
	     * @private
	     */

	  }, {
	    key: "_removeBodyAttrs",
	    value: function _removeBodyAttrs() {
	      document.body.removeAttribute('data-shepherd-active-tour');
	      document.body.classList.remove('shepherd-active');
	    }
	  }]);

	  return Tour;
	}(Evented);

	assign$2(Shepherd, {
	  Tour: Tour,
	  Step: Step,
	  Evented: Evented
	});

	return Shepherd;

}));
//# sourceMappingURL=shepherd.js.map
