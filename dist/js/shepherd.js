/*! shepherd.js 5.0.1 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Shepherd = factory());
}(this, function () { 'use strict';

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

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var validTypes = { object: true, symbol: true };

  var isImplemented = function () {
  	var symbol;
  	if (typeof Symbol !== 'function') return false;
  	symbol = Symbol('test symbol');
  	try { String(symbol); } catch (e) { return false; }

  	// Return 'true' also for polyfills
  	if (!validTypes[typeof Symbol.iterator]) return false;
  	if (!validTypes[typeof Symbol.toPrimitive]) return false;
  	if (!validTypes[typeof Symbol.toStringTag]) return false;

  	return true;
  };

  var global$1 = (function () {
  	if (this) return this;

  	// Unexpected strict mode (may happen if e.g. bundled into ESM module) be nice

  	// Thanks @mathiasbynens -> https://mathiasbynens.be/notes/globalthis
  	// In all ES5 engines global object inherits from Object.prototype
  	// (if you approached one that doesn't please report)
  	Object.defineProperty(Object.prototype, "__global__", {
  		get: function () { return this; },
  		configurable: true
  	});
  	try { return __global__; }
  	finally { delete Object.prototype.__global__; }
  })();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  // ES3 safe
  var _undefined = void 0;

  var is = function (value) { return value !== _undefined && value !== null; };

  // prettier-ignore
  var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

  var is$1 = function (value) {
  	if (!is(value)) return false;
  	return hasOwnProperty.call(possibleTypes, typeof value);
  };

  var is$2 = function (value) {
  	if (!is$1(value)) return false;
  	try {
  		if (!value.constructor) return false;
  		return value.constructor.prototype === value;
  	} catch (error) {
  		return false;
  	}
  };

  var is$3 = function (value) {
  	if (typeof value !== "function") return false;

  	if (!hasOwnProperty.call(value, "length")) return false;

  	try {
  		if (typeof value.length !== "number") return false;
  		if (typeof value.call !== "function") return false;
  		if (typeof value.apply !== "function") return false;
  	} catch (error) {
  		return false;
  	}

  	return !is$2(value);
  };

  var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

  var is$4 = function (value) {
  	if (!is$3(value)) return false;
  	if (classRe.test(functionToString.call(value))) return false;
  	return true;
  };

  var isImplemented$1 = function () {
  	var assign = Object.assign, obj;
  	if (typeof assign !== "function") return false;
  	obj = { foo: "raz" };
  	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
  	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
  };

  var isImplemented$2 = function () {
  	try {
  		Object.keys("primitive");
  		return true;
  	} catch (e) {
  		return false;
  	}
  };

  // eslint-disable-next-line no-empty-function
  var noop = function () {};

  var _undefined$1 = noop(); // Support ES3 engines

  var isValue = function (val) {
   return (val !== _undefined$1) && (val !== null);
  };

  var keys = Object.keys;

  var shim = function (object) { return keys(isValue(object) ? Object(object) : object); };

  var keys$1 = isImplemented$2() ? Object.keys : shim;

  var validValue = function (value) {
  	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
  	return value;
  };

  var max   = Math.max;

  var shim$1 = function (dest, src /*, …srcn*/) {
  	var error, i, length = max(arguments.length, 2), assign;
  	dest = Object(validValue(dest));
  	assign = function (key) {
  		try {
  			dest[key] = src[key];
  		} catch (e) {
  			if (!error) error = e;
  		}
  	};
  	for (i = 1; i < length; ++i) {
  		src = arguments[i];
  		keys$1(src).forEach(assign);
  	}
  	if (error !== undefined) throw error;
  	return dest;
  };

  var assign = isImplemented$1()
  	? Object.assign
  	: shim$1;

  var forEach = Array.prototype.forEach, create = Object.create;

  var process = function (src, obj) {
  	var key;
  	for (key in src) obj[key] = src[key];
  };

  // eslint-disable-next-line no-unused-vars
  var normalizeOptions = function (opts1 /*, …options*/) {
  	var result = create(null);
  	forEach.call(arguments, function (options) {
  		if (!isValue(options)) return;
  		process(Object(options), result);
  	});
  	return result;
  };

  var str = "razdwatrzy";

  var isImplemented$3 = function () {
  	if (typeof str.contains !== "function") return false;
  	return (str.contains("dwa") === true) && (str.contains("foo") === false);
  };

  var indexOf = String.prototype.indexOf;

  var shim$2 = function (searchString/*, position*/) {
  	return indexOf.call(this, searchString, arguments[1]) > -1;
  };

  var contains = isImplemented$3()
  	? String.prototype.contains
  	: shim$2;

  var d_1 = createCommonjsModule(function (module) {



  var d = (module.exports = function (dscr, value/*, options*/) {
  	var c, e, w, options, desc;
  	if (arguments.length < 2 || typeof dscr !== "string") {
  		options = value;
  		value = dscr;
  		dscr = null;
  	} else {
  		options = arguments[2];
  	}
  	if (is(dscr)) {
  		c = contains.call(dscr, "c");
  		e = contains.call(dscr, "e");
  		w = contains.call(dscr, "w");
  	} else {
  		c = w = true;
  		e = false;
  	}

  	desc = { value: value, configurable: c, enumerable: e, writable: w };
  	return !options ? desc : assign(normalizeOptions(options), desc);
  });

  d.gs = function (dscr, get, set/*, options*/) {
  	var c, e, options, desc;
  	if (typeof dscr !== "string") {
  		options = set;
  		set = get;
  		get = dscr;
  		dscr = null;
  	} else {
  		options = arguments[3];
  	}
  	if (!is(get)) {
  		get = undefined;
  	} else if (!is$4(get)) {
  		options = get;
  		get = set = undefined;
  	} else if (!is(set)) {
  		set = undefined;
  	} else if (!is$4(set)) {
  		options = set;
  		set = undefined;
  	}
  	if (is(dscr)) {
  		c = contains.call(dscr, "c");
  		e = contains.call(dscr, "e");
  	} else {
  		c = true;
  		e = false;
  	}

  	desc = { get: get, set: set, configurable: c, enumerable: e };
  	return !options ? desc : assign(normalizeOptions(options), desc);
  };
  });

  var isSymbol = function (x) {
  	if (!x) return false;
  	if (typeof x === 'symbol') return true;
  	if (!x.constructor) return false;
  	if (x.constructor.name !== 'Symbol') return false;
  	return (x[x.constructor.toStringTag] === 'Symbol');
  };

  var validateSymbol = function (value) {
  	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
  	return value;
  };

  var create$1 = Object.create, defineProperties = Object.defineProperties
    , defineProperty = Object.defineProperty, objPrototype = Object.prototype
    , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create$1(null)
    , isNativeSafe;

  if (typeof Symbol === 'function') {
  	NativeSymbol = Symbol;
  	try {
  		String(NativeSymbol());
  		isNativeSafe = true;
  	} catch (ignore) {}
  }

  var generateName = (function () {
  	var created = create$1(null);
  	return function (desc) {
  		var postfix = 0, name, ie11BugWorkaround;
  		while (created[desc + (postfix || '')]) ++postfix;
  		desc += (postfix || '');
  		created[desc] = true;
  		name = '@@' + desc;
  		defineProperty(objPrototype, name, d_1.gs(null, function (value) {
  			// For IE11 issue see:
  			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
  			//    ie11-broken-getters-on-dom-objects
  			// https://github.com/medikoo/es6-symbol/issues/12
  			if (ie11BugWorkaround) return;
  			ie11BugWorkaround = true;
  			defineProperty(this, name, d_1(value));
  			ie11BugWorkaround = false;
  		}));
  		return name;
  	};
  }());

  // Internal constructor (not one exposed) for creating Symbol instances.
  // This one is used to ensure that `someSymbol instanceof Symbol` always return false
  HiddenSymbol = function Symbol(description) {
  	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
  	return SymbolPolyfill(description);
  };

  // Exposed `Symbol` constructor
  // (returns instances of HiddenSymbol)
  var polyfill = SymbolPolyfill = function Symbol(description) {
  	var symbol;
  	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
  	if (isNativeSafe) return NativeSymbol(description);
  	symbol = create$1(HiddenSymbol.prototype);
  	description = (description === undefined ? '' : String(description));
  	return defineProperties(symbol, {
  		__description__: d_1('', description),
  		__name__: d_1('', generateName(description))
  	});
  };
  defineProperties(SymbolPolyfill, {
  	for: d_1(function (key) {
  		if (globalSymbols[key]) return globalSymbols[key];
  		return (globalSymbols[key] = SymbolPolyfill(String(key)));
  	}),
  	keyFor: d_1(function (s) {
  		var key;
  		validateSymbol(s);
  		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
  	}),

  	// To ensure proper interoperability with other native functions (e.g. Array.from)
  	// fallback to eventual native implementation of given symbol
  	hasInstance: d_1('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
  	isConcatSpreadable: d_1('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
  		SymbolPolyfill('isConcatSpreadable')),
  	iterator: d_1('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
  	match: d_1('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
  	replace: d_1('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
  	search: d_1('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
  	species: d_1('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
  	split: d_1('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
  	toPrimitive: d_1('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
  	toStringTag: d_1('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
  	unscopables: d_1('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
  });

  // Internal tweaks for real symbol producer
  defineProperties(HiddenSymbol.prototype, {
  	constructor: d_1(SymbolPolyfill),
  	toString: d_1('', function () { return this.__name__; })
  });

  // Proper implementation of methods exposed on Symbol.prototype
  // They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
  defineProperties(SymbolPolyfill.prototype, {
  	toString: d_1(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
  	valueOf: d_1(function () { return validateSymbol(this); })
  });
  defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d_1('', function () {
  	var symbol = validateSymbol(this);
  	if (typeof symbol === 'symbol') return symbol;
  	return symbol.toString();
  }));
  defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d_1('c', 'Symbol'));

  // Proper implementaton of toPrimitive and toStringTag for returned symbol instances
  defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
  	d_1('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

  // Note: It's important to define `toPrimitive` as last one, as some implementations
  // implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
  // And that may invoke error in definition flow:
  // See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
  defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
  	d_1('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

  if (!isImplemented()) {
  	Object.defineProperty(global$1, 'Symbol',
  		{ value: polyfill, configurable: true, enumerable: false,
  			writable: true });
  }

  /*!
   * isobject <https://github.com/jonschlinkert/isobject>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */

  var isobject = function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
  };

  /*!
   * get-value <https://github.com/jonschlinkert/get-value>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   */



  var getValue = function(target, path, options) {
    if (!isobject(options)) {
      options = { default: options };
    }

    if (!isValidObject(target)) {
      return typeof options.default !== 'undefined' ? options.default : target;
    }

    if (typeof path === 'number') {
      path = String(path);
    }

    const isArray = Array.isArray(path);
    const isString = typeof path === 'string';
    const splitChar = options.separator || '.';
    const joinChar = options.joinChar || (typeof splitChar === 'string' ? splitChar : '.');

    if (!isString && !isArray) {
      return target;
    }

    if (isString && path in target) {
      return isValid(path, target, options) ? target[path] : options.default;
    }

    let segs = isArray ? path : split(path, splitChar, options);
    let len = segs.length;
    let idx = 0;

    do {
      let prop = segs[idx];
      if (typeof prop === 'number') {
        prop = String(prop);
      }

      while (prop && prop.slice(-1) === '\\') {
        prop = join([prop.slice(0, -1), segs[++idx] || ''], joinChar, options);
      }

      if (prop in target) {
        if (!isValid(prop, target, options)) {
          return options.default;
        }

        target = target[prop];
      } else {
        let hasProp = false;
        let n = idx + 1;

        while (n < len) {
          prop = join([prop, segs[n++]], joinChar, options);

          if ((hasProp = prop in target)) {
            if (!isValid(prop, target, options)) {
              return options.default;
            }

            target = target[prop];
            idx = n - 1;
            break;
          }
        }

        if (!hasProp) {
          return options.default;
        }
      }
    } while (++idx < len && isValidObject(target));

    if (idx === len) {
      return target;
    }

    return options.default;
  };

  function join(segs, joinChar, options) {
    if (typeof options.join === 'function') {
      return options.join(segs);
    }
    return segs[0] + joinChar + segs[1];
  }

  function split(path, splitChar, options) {
    if (typeof options.split === 'function') {
      return options.split(path);
    }
    return path.split(splitChar);
  }

  function isValid(key, target, options) {
    if (typeof options.isValid === 'function') {
      return options.isValid(key, target);
    }
    return true;
  }

  function isValidObject(val) {
    return isobject(val) || Array.isArray(val) || typeof val === 'function';
  }

  var VNode = function VNode() {};

  var options = {};

  var stack = [];

  var EMPTY_CHILDREN = [];

  function h(nodeName, attributes) {
  	var children = EMPTY_CHILDREN,
  	    lastSimple,
  	    child,
  	    simple,
  	    i;
  	for (i = arguments.length; i-- > 2;) {
  		stack.push(arguments[i]);
  	}
  	if (attributes && attributes.children != null) {
  		if (!stack.length) stack.push(attributes.children);
  		delete attributes.children;
  	}
  	while (stack.length) {
  		if ((child = stack.pop()) && child.pop !== undefined) {
  			for (i = child.length; i--;) {
  				stack.push(child[i]);
  			}
  		} else {
  			if (typeof child === 'boolean') child = null;

  			if (simple = typeof nodeName !== 'function') {
  				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
  			}

  			if (simple && lastSimple) {
  				children[children.length - 1] += child;
  			} else if (children === EMPTY_CHILDREN) {
  				children = [child];
  			} else {
  				children.push(child);
  			}

  			lastSimple = simple;
  		}
  	}

  	var p = new VNode();
  	p.nodeName = nodeName;
  	p.children = children;
  	p.attributes = attributes == null ? undefined : attributes;
  	p.key = attributes == null ? undefined : attributes.key;

  	return p;
  }

  function extend(obj, props) {
    for (var i in props) {
      obj[i] = props[i];
    }return obj;
  }

  function applyRef(ref, value) {
    if (ref) {
      if (typeof ref == 'function') ref(value);else ref.current = value;
    }
  }

  var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

  function cloneElement(vnode, props) {
    return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
  }

  var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

  var items = [];

  function enqueueRender(component) {
  	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
  		( defer)(rerender);
  	}
  }

  function rerender() {
  	var p;
  	while (p = items.pop()) {
  		if (p._dirty) renderComponent(p);
  	}
  }

  function isSameNodeType(node, vnode, hydrating) {
  	if (typeof vnode === 'string' || typeof vnode === 'number') {
  		return node.splitText !== undefined;
  	}
  	if (typeof vnode.nodeName === 'string') {
  		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
  	}
  	return hydrating || node._componentConstructor === vnode.nodeName;
  }

  function isNamedNode(node, nodeName) {
  	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
  }

  function getNodeProps(vnode) {
  	var props = extend({}, vnode.attributes);
  	props.children = vnode.children;

  	var defaultProps = vnode.nodeName.defaultProps;
  	if (defaultProps !== undefined) {
  		for (var i in defaultProps) {
  			if (props[i] === undefined) {
  				props[i] = defaultProps[i];
  			}
  		}
  	}

  	return props;
  }

  function createNode(nodeName, isSvg) {
  	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
  	node.normalizedNodeName = nodeName;
  	return node;
  }

  function removeNode(node) {
  	var parentNode = node.parentNode;
  	if (parentNode) parentNode.removeChild(node);
  }

  function setAccessor(node, name, old, value, isSvg) {
  	if (name === 'className') name = 'class';

  	if (name === 'key') ; else if (name === 'ref') {
  		applyRef(old, null);
  		applyRef(value, node);
  	} else if (name === 'class' && !isSvg) {
  		node.className = value || '';
  	} else if (name === 'style') {
  		if (!value || typeof value === 'string' || typeof old === 'string') {
  			node.style.cssText = value || '';
  		}
  		if (value && typeof value === 'object') {
  			if (typeof old !== 'string') {
  				for (var i in old) {
  					if (!(i in value)) node.style[i] = '';
  				}
  			}
  			for (var i in value) {
  				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
  			}
  		}
  	} else if (name === 'dangerouslySetInnerHTML') {
  		if (value) node.innerHTML = value.__html || '';
  	} else if (name[0] == 'o' && name[1] == 'n') {
  		var useCapture = name !== (name = name.replace(/Capture$/, ''));
  		name = name.toLowerCase().substring(2);
  		if (value) {
  			if (!old) node.addEventListener(name, eventProxy, useCapture);
  		} else {
  			node.removeEventListener(name, eventProxy, useCapture);
  		}
  		(node._listeners || (node._listeners = {}))[name] = value;
  	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
  		try {
  			node[name] = value == null ? '' : value;
  		} catch (e) {}
  		if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
  	} else {
  		var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

  		if (value == null || value === false) {
  			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
  		} else if (typeof value !== 'function') {
  			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
  		}
  	}
  }

  function eventProxy(e) {
  	return this._listeners[e.type]( e);
  }

  var mounts = [];

  var diffLevel = 0;

  var isSvgMode = false;

  var hydrating = false;

  function flushMounts() {
  	var c;
  	while (c = mounts.shift()) {
  		if (c.componentDidMount) c.componentDidMount();
  	}
  }

  function diff(dom, vnode, context, mountAll, parent, componentRoot) {
  	if (!diffLevel++) {
  		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

  		hydrating = dom != null && !('__preactattr_' in dom);
  	}

  	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

  	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

  	if (! --diffLevel) {
  		hydrating = false;

  		if (!componentRoot) flushMounts();
  	}

  	return ret;
  }

  function idiff(dom, vnode, context, mountAll, componentRoot) {
  	var out = dom,
  	    prevSvgMode = isSvgMode;

  	if (vnode == null || typeof vnode === 'boolean') vnode = '';

  	if (typeof vnode === 'string' || typeof vnode === 'number') {
  		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
  			if (dom.nodeValue != vnode) {
  				dom.nodeValue = vnode;
  			}
  		} else {
  			out = document.createTextNode(vnode);
  			if (dom) {
  				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
  				recollectNodeTree(dom, true);
  			}
  		}

  		out['__preactattr_'] = true;

  		return out;
  	}

  	var vnodeName = vnode.nodeName;
  	if (typeof vnodeName === 'function') {
  		return buildComponentFromVNode(dom, vnode, context, mountAll);
  	}

  	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

  	vnodeName = String(vnodeName);
  	if (!dom || !isNamedNode(dom, vnodeName)) {
  		out = createNode(vnodeName, isSvgMode);

  		if (dom) {
  			while (dom.firstChild) {
  				out.appendChild(dom.firstChild);
  			}
  			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

  			recollectNodeTree(dom, true);
  		}
  	}

  	var fc = out.firstChild,
  	    props = out['__preactattr_'],
  	    vchildren = vnode.children;

  	if (props == null) {
  		props = out['__preactattr_'] = {};
  		for (var a = out.attributes, i = a.length; i--;) {
  			props[a[i].name] = a[i].value;
  		}
  	}

  	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
  		if (fc.nodeValue != vchildren[0]) {
  			fc.nodeValue = vchildren[0];
  		}
  	} else if (vchildren && vchildren.length || fc != null) {
  			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
  		}

  	diffAttributes(out, vnode.attributes, props);

  	isSvgMode = prevSvgMode;

  	return out;
  }

  function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
  	var originalChildren = dom.childNodes,
  	    children = [],
  	    keyed = {},
  	    keyedLen = 0,
  	    min = 0,
  	    len = originalChildren.length,
  	    childrenLen = 0,
  	    vlen = vchildren ? vchildren.length : 0,
  	    j,
  	    c,
  	    f,
  	    vchild,
  	    child;

  	if (len !== 0) {
  		for (var i = 0; i < len; i++) {
  			var _child = originalChildren[i],
  			    props = _child['__preactattr_'],
  			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
  			if (key != null) {
  				keyedLen++;
  				keyed[key] = _child;
  			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
  				children[childrenLen++] = _child;
  			}
  		}
  	}

  	if (vlen !== 0) {
  		for (var i = 0; i < vlen; i++) {
  			vchild = vchildren[i];
  			child = null;

  			var key = vchild.key;
  			if (key != null) {
  				if (keyedLen && keyed[key] !== undefined) {
  					child = keyed[key];
  					keyed[key] = undefined;
  					keyedLen--;
  				}
  			} else if (min < childrenLen) {
  					for (j = min; j < childrenLen; j++) {
  						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
  							child = c;
  							children[j] = undefined;
  							if (j === childrenLen - 1) childrenLen--;
  							if (j === min) min++;
  							break;
  						}
  					}
  				}

  			child = idiff(child, vchild, context, mountAll);

  			f = originalChildren[i];
  			if (child && child !== dom && child !== f) {
  				if (f == null) {
  					dom.appendChild(child);
  				} else if (child === f.nextSibling) {
  					removeNode(f);
  				} else {
  					dom.insertBefore(child, f);
  				}
  			}
  		}
  	}

  	if (keyedLen) {
  		for (var i in keyed) {
  			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
  		}
  	}

  	while (min <= childrenLen) {
  		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
  	}
  }

  function recollectNodeTree(node, unmountOnly) {
  	var component = node._component;
  	if (component) {
  		unmountComponent(component);
  	} else {
  		if (node['__preactattr_'] != null) applyRef(node['__preactattr_'].ref, null);

  		if (unmountOnly === false || node['__preactattr_'] == null) {
  			removeNode(node);
  		}

  		removeChildren(node);
  	}
  }

  function removeChildren(node) {
  	node = node.lastChild;
  	while (node) {
  		var next = node.previousSibling;
  		recollectNodeTree(node, true);
  		node = next;
  	}
  }

  function diffAttributes(dom, attrs, old) {
  	var name;

  	for (name in old) {
  		if (!(attrs && attrs[name] != null) && old[name] != null) {
  			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
  		}
  	}

  	for (name in attrs) {
  		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
  			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
  		}
  	}
  }

  var recyclerComponents = [];

  function createComponent(Ctor, props, context) {
  	var inst,
  	    i = recyclerComponents.length;

  	if (Ctor.prototype && Ctor.prototype.render) {
  		inst = new Ctor(props, context);
  		Component.call(inst, props, context);
  	} else {
  		inst = new Component(props, context);
  		inst.constructor = Ctor;
  		inst.render = doRender;
  	}

  	while (i--) {
  		if (recyclerComponents[i].constructor === Ctor) {
  			inst.nextBase = recyclerComponents[i].nextBase;
  			recyclerComponents.splice(i, 1);
  			return inst;
  		}
  	}

  	return inst;
  }

  function doRender(props, state, context) {
  	return this.constructor(props, context);
  }

  function setComponentProps(component, props, renderMode, context, mountAll) {
  	if (component._disable) return;
  	component._disable = true;

  	component.__ref = props.ref;
  	component.__key = props.key;
  	delete props.ref;
  	delete props.key;

  	if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
  		if (!component.base || mountAll) {
  			if (component.componentWillMount) component.componentWillMount();
  		} else if (component.componentWillReceiveProps) {
  			component.componentWillReceiveProps(props, context);
  		}
  	}

  	if (context && context !== component.context) {
  		if (!component.prevContext) component.prevContext = component.context;
  		component.context = context;
  	}

  	if (!component.prevProps) component.prevProps = component.props;
  	component.props = props;

  	component._disable = false;

  	if (renderMode !== 0) {
  		if (renderMode === 1 || options.syncComponentUpdates !== false || !component.base) {
  			renderComponent(component, 1, mountAll);
  		} else {
  			enqueueRender(component);
  		}
  	}

  	applyRef(component.__ref, component);
  }

  function renderComponent(component, renderMode, mountAll, isChild) {
  	if (component._disable) return;

  	var props = component.props,
  	    state = component.state,
  	    context = component.context,
  	    previousProps = component.prevProps || props,
  	    previousState = component.prevState || state,
  	    previousContext = component.prevContext || context,
  	    isUpdate = component.base,
  	    nextBase = component.nextBase,
  	    initialBase = isUpdate || nextBase,
  	    initialChildComponent = component._component,
  	    skip = false,
  	    snapshot = previousContext,
  	    rendered,
  	    inst,
  	    cbase;

  	if (component.constructor.getDerivedStateFromProps) {
  		state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
  		component.state = state;
  	}

  	if (isUpdate) {
  		component.props = previousProps;
  		component.state = previousState;
  		component.context = previousContext;
  		if (renderMode !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
  			skip = true;
  		} else if (component.componentWillUpdate) {
  			component.componentWillUpdate(props, state, context);
  		}
  		component.props = props;
  		component.state = state;
  		component.context = context;
  	}

  	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
  	component._dirty = false;

  	if (!skip) {
  		rendered = component.render(props, state, context);

  		if (component.getChildContext) {
  			context = extend(extend({}, context), component.getChildContext());
  		}

  		if (isUpdate && component.getSnapshotBeforeUpdate) {
  			snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
  		}

  		var childComponent = rendered && rendered.nodeName,
  		    toUnmount,
  		    base;

  		if (typeof childComponent === 'function') {

  			var childProps = getNodeProps(rendered);
  			inst = initialChildComponent;

  			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
  				setComponentProps(inst, childProps, 1, context, false);
  			} else {
  				toUnmount = inst;

  				component._component = inst = createComponent(childComponent, childProps, context);
  				inst.nextBase = inst.nextBase || nextBase;
  				inst._parentComponent = component;
  				setComponentProps(inst, childProps, 0, context, false);
  				renderComponent(inst, 1, mountAll, true);
  			}

  			base = inst.base;
  		} else {
  			cbase = initialBase;

  			toUnmount = initialChildComponent;
  			if (toUnmount) {
  				cbase = component._component = null;
  			}

  			if (initialBase || renderMode === 1) {
  				if (cbase) cbase._component = null;
  				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
  			}
  		}

  		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
  			var baseParent = initialBase.parentNode;
  			if (baseParent && base !== baseParent) {
  				baseParent.replaceChild(base, initialBase);

  				if (!toUnmount) {
  					initialBase._component = null;
  					recollectNodeTree(initialBase, false);
  				}
  			}
  		}

  		if (toUnmount) {
  			unmountComponent(toUnmount);
  		}

  		component.base = base;
  		if (base && !isChild) {
  			var componentRef = component,
  			    t = component;
  			while (t = t._parentComponent) {
  				(componentRef = t).base = base;
  			}
  			base._component = componentRef;
  			base._componentConstructor = componentRef.constructor;
  		}
  	}

  	if (!isUpdate || mountAll) {
  		mounts.push(component);
  	} else if (!skip) {

  		if (component.componentDidUpdate) {
  			component.componentDidUpdate(previousProps, previousState, snapshot);
  		}
  	}

  	while (component._renderCallbacks.length) {
  		component._renderCallbacks.pop().call(component);
  	}if (!diffLevel && !isChild) flushMounts();
  }

  function buildComponentFromVNode(dom, vnode, context, mountAll) {
  	var c = dom && dom._component,
  	    originalComponent = c,
  	    oldDom = dom,
  	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
  	    isOwner = isDirectOwner,
  	    props = getNodeProps(vnode);
  	while (c && !isOwner && (c = c._parentComponent)) {
  		isOwner = c.constructor === vnode.nodeName;
  	}

  	if (c && isOwner && (!mountAll || c._component)) {
  		setComponentProps(c, props, 3, context, mountAll);
  		dom = c.base;
  	} else {
  		if (originalComponent && !isDirectOwner) {
  			unmountComponent(originalComponent);
  			dom = oldDom = null;
  		}

  		c = createComponent(vnode.nodeName, props, context);
  		if (dom && !c.nextBase) {
  			c.nextBase = dom;

  			oldDom = null;
  		}
  		setComponentProps(c, props, 1, context, mountAll);
  		dom = c.base;

  		if (oldDom && dom !== oldDom) {
  			oldDom._component = null;
  			recollectNodeTree(oldDom, false);
  		}
  	}

  	return dom;
  }

  function unmountComponent(component) {

  	var base = component.base;

  	component._disable = true;

  	if (component.componentWillUnmount) component.componentWillUnmount();

  	component.base = null;

  	var inner = component._component;
  	if (inner) {
  		unmountComponent(inner);
  	} else if (base) {
  		if (base['__preactattr_'] != null) applyRef(base['__preactattr_'].ref, null);

  		component.nextBase = base;

  		removeNode(base);
  		recyclerComponents.push(component);

  		removeChildren(base);
  	}

  	applyRef(component.__ref, null);
  }

  function Component(props, context) {
  	this._dirty = true;

  	this.context = context;

  	this.props = props;

  	this.state = this.state || {};

  	this._renderCallbacks = [];
  }

  extend(Component.prototype, {
  	setState: function setState(state, callback) {
  		if (!this.prevState) this.prevState = this.state;
  		this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
  		if (callback) this._renderCallbacks.push(callback);
  		enqueueRender(this);
  	},
  	forceUpdate: function forceUpdate(callback) {
  		if (callback) this._renderCallbacks.push(callback);
  		renderComponent(this, 2);
  	},
  	render: function render() {}
  });

  function render(vnode, parent, merge) {
    return diff(merge, vnode, {}, false, parent, false);
  }

  function createRef() {
  	return {};
  }

  var preact = {
  	h: h,
  	createElement: h,
  	cloneElement: cloneElement,
  	createRef: createRef,
  	Component: Component,
  	render: render,
  	rerender: rerender,
  	options: options
  };

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
    function Evented() {}

    var _proto = Evented.prototype;

    _proto.on = function on(event, handler, ctx) {
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
    };

    _proto.once = function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    };

    _proto.off = function off(event, handler) {
      var _this = this;

      if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
        return false;
      }

      if (isUndefined(handler)) {
        delete this.bindings[event];
      } else {
        this.bindings[event].forEach(function (binding, index) {
          if (binding.handler === handler) {
            _this.bindings[event].splice(index, 1);
          }
        });
      }
    };

    _proto.trigger = function trigger(event) {
      var _this2 = this;

      if (!isUndefined(this.bindings) && this.bindings[event]) {
        var args = Array.prototype.slice.call(arguments, 1);
        this.bindings[event].forEach(function (binding, index) {
          var ctx = binding.ctx,
              handler = binding.handler,
              once = binding.once;
          var context = ctx || _this2;
          handler.apply(context, args);

          if (once) {
            _this2.bindings[event].splice(index, 1);
          }
        });
      }
    };

    return Evented;
  }();

  /**
   * Binds all the methods on a JS Class to the `this` context of the class.
   * Adapted from https://github.com/sindresorhus/auto-bind
   * @param {object} self The `this` context of the class
   * @return {object} The `this` context of the class
   */
  function autoBind(self) {
    var keys = Object.getOwnPropertyNames(self.constructor.prototype);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var val = self[key];

      if (key !== 'constructor' && typeof val === 'function') {
        self[key] = val.bind(self);
      }
    }

    return self;
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
        var targetIsEl = step.el && event.currentTarget === step.el;
        var targetIsSelector = !isUndefined(selector) && event.currentTarget.matches(selector);

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
        return console.error("No element was found for the selector supplied to advanceOn: " + selector);
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

  var addHasTitleClass = function addHasTitleClass(step) {
    return {
      addHasTitleClass: _createClassModifier(step.classPrefix + "shepherd-has-title")
    };
  };
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

  function _getCenteredStylePopperModifier(styles) {
    return {
      computeStyle: {
        enabled: true,
        fn: function fn(data) {
          data.styles = _extends({}, data.styles, {
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          });
          return data;
        }
      },
      addShepherdClass: _createClassModifier(styles.shepherd.trim())
    };
  }
  /**
   * Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)
   * @private
   */


  function _getDefaultPopperOptions(styles) {
    return {
      positionFixed: true,
      modifiers: {
        addShepherdClass: _createClassModifier(styles.shepherd.trim())
      }
    };
  }
  /**
   * Generates the hash of options that will be passed to `Tippy` instances
   * target an element in the DOM.
   *
   * @param {Object} attachToOptions The local `attachTo` options
   * @param {Step} step The step instance
   * @return {Object} The final tippy options object
   */


  function makeAttachedTippyOptions(attachToOptions, step) {
    var _makeCommonTippyOptio = _makeCommonTippyOptions(step),
        popperOptions = _makeCommonTippyOptio.popperOptions,
        tippyOptions = _makeCommonTippyOptio.tippyOptions;

    tippyOptions.flipOnUpdate = true;
    tippyOptions.placement = attachToOptions.on || 'right';
    var stepPopperOptions = getValue(step, 'options.tippyOptions.popperOptions');

    if (stepPopperOptions) {
      popperOptions = _extends({}, popperOptions, {}, stepPopperOptions, {
        modifiers: _extends({}, popperOptions.modifiers, {}, stepPopperOptions.modifiers)
      });
    }

    tippyOptions.popperOptions = popperOptions;
    return tippyOptions;
  }
  /**
   * Generates the hash of options for a tooltip that doesn't have a
   * target element in the DOM -- and thus is positioned in the center
   * of the view
   *
   * @param {Step} step The step instance
   * @return {Object} The final tippy options object
   */

  function makeCenteredTippy(step) {
    var centeredStylePopperModifier = _getCenteredStylePopperModifier(step.styles);

    var _makeCommonTippyOptio2 = _makeCommonTippyOptions(step),
        popperOptions = _makeCommonTippyOptio2.popperOptions,
        tippyOptions = _makeCommonTippyOptio2.tippyOptions;

    tippyOptions.placement = 'top';
    tippyOptions.arrow = false;
    tippyOptions.popperOptions = tippyOptions.popperOptions || {};
    popperOptions = _extends({}, popperOptions, {}, tippyOptions.popperOptions, {
      modifiers: _extends({}, popperOptions.modifiers, {}, centeredStylePopperModifier, {}, tippyOptions.popperOptions.modifiers)
    });
    tippyOptions.popperOptions = popperOptions;
    return tippyOptions;
  }

  function _makeCommonTippyOptions(step) {
    var popperOptions = _getDefaultPopperOptions(step.styles);

    var tippyOptions = _extends({
      content: step.el
    }, step.options.tippyOptions);

    var shepherdElementZIndex = getValue(step, 'tour.options.styleVariables.shepherdElementZIndex');

    if (shepherdElementZIndex) {
      tippyOptions.zIndex = shepherdElementZIndex;
    }

    if (step.options.title) {
      popperOptions.modifiers = _extends({}, popperOptions.modifiers, {}, addHasTitleClass(step));
    }

    return {
      popperOptions: popperOptions,
      tippyOptions: tippyOptions
    };
  }

  /**!
  * tippy.js v5.0.0-beta.1
  * (c) 2017-2019 atomiks
  * MIT License
  */
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
    zIndex: 9999
    /**
     * If the setProps() method encounters one of these, the popperInstance must be
     * recreated
     */

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
  var SVG_ARROW_SELECTOR = "." + SVG_ARROW_CLASS; // TODO: Work out best way to make these updateable

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
    document.addEventListener('touchstart', onDocumentTouchStart, _extends$1({}, PASSIVE, {
      capture: true
    }));
    window.addEventListener('blur', onWindowBlur);
  }

  var keys$2 = Object.keys(defaultProps);
  /**
   * Returns an object of optional props from data-tippy-* attributes
   */

  function getDataAttributeProps(reference) {
    var props = keys$2.reduce(function (acc, key) {
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

    return arrayFrom(document.querySelectorAll(value));
  }
  /**
   * Returns a value at a given index depending on if it's an array or number
   */

  function getValueAtIndexOrReturn(value, index, defaultValue) {
    if (Array.isArray(value)) {
      var v = value[index];
      return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
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
    var out = _extends$1({}, props, {
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
   * Determines if an array or string includes a string
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

  var _extends$2 = Object.assign || function (target) {
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
    return _extends$2({}, offsets, {
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
      return _extends$2({
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
    data.attributes = _extends$2({}, attributes, data.attributes);
    data.styles = _extends$2({}, styles, data.styles);
    data.arrowStyles = _extends$2({}, data.offsets.arrow, data.arrowStyles);

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
        data.offsets.popper = _extends$2({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

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
      popper = _extends$2({}, popper, check[side](placement));
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

      data.offsets.popper = _extends$2({}, popper, shiftOffsets[shiftvariation]);
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
     * @param {Element|referenceObject} reference - The reference element used to position the popper
     * @param {Element} popper - The HTML / XML element used as the popper
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
      this.update = debounce$1(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends$2({}, Popper.Defaults, options);

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
      Object.keys(_extends$2({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends$2({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends$2({
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
  * tippy.js v5.0.0-beta.1
  * (c) 2017-2019 atomiks
  * MIT License
  */

  var version = "5.0.0-beta.1";

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
      var prevRefRect = reference.getBoundingClientRect();

      function updatePosition() {
        var currentRefRect = reference.getBoundingClientRect(); // Only schedule an update if the reference rect has changed

        if (prevRefRect.top !== currentRefRect.top || prevRefRect.right !== currentRefRect.right || prevRefRect.bottom !== currentRefRect.bottom || prevRefRect.left !== currentRefRect.left) {
          instance.popperInstance.scheduleUpdate();
        }

        prevRefRect = currentRefRect;

        if (instance.state.isMounted) {
          requestAnimationFrame(updatePosition);
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
      var popperOptions = instance.props.popperOptions;
      var arrow = instance.popperChildren.arrow;
      var preventOverflowModifier = getModifier(popperOptions, 'preventOverflow');

      function applyMutations(data) {
        instance.state.currentPlacement = data.placement;

        if (instance.props.flip && !instance.props.flipOnUpdate) {
          if (data.flipped) {
            instance.popperInstance.options.placement = data.placement;
          }

          setFlipModifierEnabled(instance.popperInstance.modifiers, false);
        }

        tooltip.setAttribute('data-placement', data.placement);

        if (data.attributes['x-out-of-boundaries'] !== false) {
          tooltip.setAttribute('data-out-of-boundaries', '');
        } else {
          tooltip.removeAttribute('data-out-of-boundaries');
        }

        var basePlacement = getBasePlacement(data.placement);
        var isVerticalPlacement = includes(['top', 'bottom'], basePlacement);
        var isSecondaryPlacement = includes(['bottom', 'right'], basePlacement); // Apply `distance` prop

        var tooltipStyles = tooltip.style;
        tooltipStyles.top = '0';
        tooltipStyles.left = '0';
        tooltipStyles[isVerticalPlacement ? 'top' : 'left'] = (isSecondaryPlacement ? 1 : -1) * instance.props.distance + "px";
      }

      var config = _extends$1({
        eventsEnabled: false,
        placement: instance.props.placement
      }, popperOptions, {
        modifiers: _extends$1({}, popperOptions && popperOptions.modifiers, {
          preventOverflow: _extends$1({
            boundariesElement: instance.props.boundary,
            padding: PREVENT_OVERFLOW_PADDING
          }, preventOverflowModifier),
          // Adds the `distance` calculation to preventOverflow padding
          tippySetPreventOverflowPadding: {
            enabled: true,
            order: 299,
            fn: function fn(data) {
              var basePlacement = getBasePlacement(data.placement);
              var padding = preventOverflowModifier && preventOverflowModifier.padding !== undefined ? preventOverflowModifier.padding : PREVENT_OVERFLOW_PADDING;
              var isPaddingNumber = typeof padding === 'number';
              var paddingObject = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
              };
              var computedPadding = Object.keys(paddingObject).reduce(function (obj, key) {
                obj[key] = isPaddingNumber ? padding : padding[key];

                if (basePlacement === key) {
                  obj[key] = isPaddingNumber ? padding + instance.props.distance : (padding[basePlacement] || 0) + instance.props.distance;
                }

                return obj;
              }, paddingObject);
              instance.popperInstance.modifiers.filter(function (m) {
                return m.name === 'preventOverflow';
              })[0].padding = computedPadding;
              return data;
            }
          },
          arrow: _extends$1({
            element: arrow,
            enabled: !!arrow
          }, getModifier(popperOptions, 'arrow')),
          flip: _extends$1({
            enabled: instance.props.flip,
            padding: instance.props.distance + PREVENT_OVERFLOW_PADDING,
            behavior: instance.props.flipBehavior
          }, getModifier(popperOptions, 'flip')),
          offset: _extends$1({
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

      addDocumentMouseDownListener();
      var delay = getValueAtIndexOrReturn(instance.props.delay, 0, defaultProps.delay);

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
      var delay = getValueAtIndexOrReturn(instance.props.delay, 1, defaultProps.delay);

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
      // Disabling the instance should also hide it
      // https://github.com/atomiks/tippy.js-react/issues/106
      instance.hide();
      instance.state.isEnabled = false;
    }

    function clearDelayTimeouts() {
      clearTimeout(showTimeout);
      clearTimeout(hideTimeout);
      cancelAnimationFrame(scheduleHideAnimationFrame);
    } // Cloning as we're deleting non-updateable props in DEV mode


    function setProps(_ref2) {
      var partialProps = _extends$1({}, _ref2);

      if (instance.state.isDestroyed) {
        return;
      }

      removeTriggersFromEventListenersTarget();
      var prevProps = instance.props;
      var nextProps = evaluateProps(reference, _extends$1({}, instance.props, {}, partialProps, {
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
        duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);
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
            var node = getEventListenersTarget();
            var attrName = "aria-" + instance.props.aria;
            var currentAttrValue = node.getAttribute(attrName);
            var nextAttrValue = currentAttrValue ? currentAttrValue + " " + tooltip.id : tooltip.id;
            node.setAttribute(attrName, nextAttrValue);
          }

          instance.props.onShown(instance);
          instance.state.isShown = true;
        });
      };

      mount();
    }

    function hide(duration) {
      if (duration === void 0) {
        duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);
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
          var node = getEventListenersTarget();
          var attrName = "aria-" + instance.props.aria;
          var currentAttrValue = node.getAttribute(attrName);
          var nextAttrValue = currentAttrValue ? currentAttrValue.replace(tooltip.id, '').trim() : null;

          if (nextAttrValue) {
            node.setAttribute(attrName, nextAttrValue);
          } else {
            node.removeAttribute(attrName);
          }
        }

        instance.popperInstance.disableEventListeners();
        instance.popperInstance.options.placement = instance.props.placement;
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

    var props = _extends$1({}, defaultProps, {}, optionalProps);

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
  * tippy.js v5.0.0-beta.1
  * (c) 2017-2019 atomiks
  * MIT License
  */

  var css = ".tippy-tooltip[data-animation=fade][data-state=hidden]{opacity:0}.tippy-iOS{cursor:pointer!important;-webkit-tap-highlight-color:transparent}.tippy-popper{pointer-events:none;max-width:calc(100% - 10px);transition-timing-function:cubic-bezier(.165,.84,.44,1)}.tippy-tooltip{position:relative;color:#fff;border-radius:.25rem;font-size:.875rem;line-height:1.4;background-color:#333;overflow:hidden;transition-property:visibility,opacity,transform;outline:0}.tippy-tooltip[data-placement^=top] .tippy-arrow{border-width:8px 8px 0;border-top-color:#333;margin:0 3px;transform-origin:50% 0;bottom:-7px}.tippy-tooltip[data-placement^=bottom] .tippy-arrow{border-width:0 8px 8px;border-bottom-color:#333;margin:0 3px;transform-origin:50% 7px;top:-7px}.tippy-tooltip[data-placement^=left] .tippy-arrow{border-width:8px 0 8px 8px;border-left-color:#333;margin:3px 0;transform-origin:0 50%;right:-7px}.tippy-tooltip[data-placement^=right] .tippy-arrow{border-width:8px 8px 8px 0;border-right-color:#333;margin:3px 0;transform-origin:7px 50%;left:-7px}.tippy-tooltip[data-arrow]{overflow:visible}.tippy-tooltip[data-animatefill]{background-color:transparent!important}.tippy-tooltip[data-interactive]{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow{border-color:transparent;border-style:solid;position:absolute}.tippy-arrow[data-state=hidden]{opacity:0}.tippy-content{padding:.3125rem .5625rem}";

  /**
   * Injects a string of CSS styles to a style node in <head>
   */
  function injectCSS(css) {
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

  if (isBrowser) {
    injectCSS(css);
  }

  /**
   * Ensure class prefix ends in `-`
   * @param {string} prefix The prefix to prepend to the class names generated by nano-css
   * @return {string} The prefix ending in `-`
   */

  function normalizePrefix(prefix) {
    if (!isString(prefix) || prefix === '') {
      return '';
    }

    return prefix.charAt(prefix.length - 1) !== '-' ? prefix + "-" : prefix;
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

    var returnOpts = _extends({}, options);

    if (isString(options.element)) {
      // Can't override the element in user opts reference because we can't
      // guarantee that the element will exist in the future.
      try {
        returnOpts.element = document.querySelector(options.element);
      } catch (e) {// TODO
      }

      if (!returnOpts.element) {
        console.error("The element for this Shepherd step was not found " + options.element);
      }
    }

    return returnOpts;
  }
  /**
   * Determines options for the tooltip and initializes
   * `step.tooltip` as a Tippy.js instance.
   * @param {Step} step The step instance
   */

  function setupTooltip(step) {
    if (isUndefined(tippy)) {
      throw new Error('Using the attachment feature of Shepherd requires the Tippy.js library');
    }

    if (step.tooltip) {
      step.tooltip.destroy();
    }

    var attachToOpts = parseAttachTo(step);
    step.tooltip = _makeTippyInstance(attachToOpts, step);
    step.target = attachToOpts.element;
  }
  /**
   * Generates a `Tippy` instance from a set of base `attachTo` options
   * @param attachToOptions
   * @param {Step} step The step instance
   * @return {tippy|Instance | Instance[]} The final tippy instance
   * @private
   */

  function _makeTippyInstance(attachToOptions, step) {
    var tippyOptions = {};
    var element = document.body;

    if (!attachToOptions.element || !attachToOptions.on) {
      tippyOptions = makeCenteredTippy(step);
    } else {
      tippyOptions = makeAttachedTippyOptions(attachToOptions, step);
      element = attachToOptions.element;
    }

    return tippy(element, tippyOptions);
  }

  /**
   * Remove any leftover modal target classes and add the modal target class to the currentElement
   * @param {HTMLElement} currentElement The element for the current step
   * @param {string} classPrefix The prefix to add to the class name
   */
  function toggleShepherdModalClass(currentElement, classPrefix) {
    var shepherdModalTarget = document.querySelector("." + classPrefix + "shepherd-modal-target");

    if (shepherdModalTarget) {
      shepherdModalTarget.classList.remove(classPrefix + "shepherd-modal-target");
    }

    currentElement.classList.add(classPrefix + "shepherd-modal-target");
  }

  var Component$1 = preact.Component;

  var ShepherdButton =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdButton, _Component);

    function ShepherdButton() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = ShepherdButton.prototype;

    _proto.render = function render(props) {
      var classPrefix = props.classPrefix,
          config = props.config,
          step = props.step,
          styles = props.styles;
      var action = config.action,
          classes = config.classes,
          secondary = config.secondary,
          text = config.text;
      return preact.h("button", {
        className: (classes || '') + styles.button + (secondary ? " " + classPrefix + "shepherd-button-secondary" : ''),
        onClick: action ? action.bind(step.tour) : null,
        tabindex: "0"
      }, text);
    };

    return ShepherdButton;
  }(Component$1);

  var Component$2 = preact.Component;

  var ShepherdFooter =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdFooter, _Component);

    function ShepherdFooter() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = ShepherdFooter.prototype;

    _proto.render = function render(props) {
      var classPrefix = props.classPrefix,
          step = props.step,
          styles = props.styles;
      var buttons = step.options.buttons;
      return preact.h("footer", {
        className: styles.footer.trim()
      }, this._addButtons(buttons, classPrefix, step, styles));
    };

    _proto._addButtons = function _addButtons(buttons, classPrefix, step, styles) {
      if (buttons) {
        return buttons.map(function (config) {
          return preact.h(ShepherdButton, {
            classPrefix: classPrefix,
            config: config,
            key: config.toString(),
            step: step,
            styles: styles
          });
        });
      }

      return null;
    };

    return ShepherdFooter;
  }(Component$2);

  var Component$3 = preact.Component;

  var ShepherdHeader =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdHeader, _Component);

    function ShepherdHeader(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.step = props.step;
      _this.handleCancelClick = _this.handleCancelClick.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = ShepherdHeader.prototype;

    _proto.render = function render(props) {
      var labelId = props.labelId,
          step = props.step,
          styles = props.styles;
      var _step$options = step.options,
          cancelIcon = _step$options.cancelIcon,
          title = _step$options.title;
      return preact.h("header", {
        className: styles.header.trim()
      }, this.constructor._addTitle(labelId, styles, title), this._addCancelLink(cancelIcon, styles));
    }
    /**
     * Add a click listener to the cancel link that cancels the tour
     */
    ;

    _proto.handleCancelClick = function handleCancelClick(e) {
      e.preventDefault();
      this.step.cancel();
    };

    ShepherdHeader._addTitle = function _addTitle(labelId, styles, title) {
      if (title) {
        return preact.h("h3", {
          id: labelId,
          className: styles.title.trim()
        }, title);
      }

      return null;
    }
    /**
     * If enabled, add the cancel "x" icon
     * @param {object} cancelIcon The options for the cancel icon
     * @param styles
     * @return {null|*}
     * @private
     */
    ;

    _proto._addCancelLink = function _addCancelLink(cancelIcon, styles) {
      if (cancelIcon && cancelIcon.enabled) {
        return preact.h("button", {
          "aria-label": cancelIcon.label ? cancelIcon.label : 'Close Tour',
          className: styles['cancel-icon'].trim(),
          onClick: this.handleCancelClick,
          type: "button"
        }, preact.h("span", {
          "aria-hidden": "true"
        }, "\xD7"));
      }

      return null;
    };

    return ShepherdHeader;
  }(Component$3);

  var Component$4 = preact.Component;

  var ShepherdText =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdText, _Component);

    function ShepherdText() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = ShepherdText.prototype;

    _proto.shouldComponentUpdate = function shouldComponentUpdate() {
      return false;
    };

    _proto.componentDidMount = function componentDidMount() {
      var step = this.props.step;
      var text = step.options.text;

      if (isFunction(text)) {
        text = text.call(step);
      }

      if (isElement(text)) {
        this.base.appendChild(text);
      }
    };

    _proto.render = function render(props) {
      var descriptionId = props.descriptionId,
          step = props.step,
          styles = props.styles;
      var text = step.options.text;

      if (isFunction(text)) {
        text = text.call(step);
      }

      return preact.h("div", {
        className: styles.text.trim(),
        dangerouslySetInnerHTML: {
          __html: !isElement(text) ? text : null
        },
        id: descriptionId
      });
    };

    return ShepherdText;
  }(Component$4);

  var Component$5 = preact.Component;

  var ShepherdContent =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdContent, _Component);

    function ShepherdContent() {
      return _Component.apply(this, arguments) || this;
    }

    var _proto = ShepherdContent.prototype;

    _proto.render = function render(props) {
      var classPrefix = props.classPrefix,
          descriptionId = props.descriptionId,
          labelId = props.labelId,
          step = props.step,
          styles = props.styles;
      return preact.h("div", {
        className: styles.content.trim()
      }, preact.h(ShepherdHeader, {
        labelId: labelId,
        step: step,
        styles: styles
      }), ShepherdContent._addShepherdText(descriptionId, step, styles), ShepherdContent._addShepherdFooter(classPrefix, step, styles));
    };

    ShepherdContent._addShepherdText = function _addShepherdText(descriptionId, step, styles) {
      if (!isUndefined(step.options.text)) {
        return preact.h(ShepherdText, {
          descriptionId: descriptionId,
          step: step,
          styles: styles
        });
      }

      return null;
    };

    ShepherdContent._addShepherdFooter = function _addShepherdFooter(classPrefix, step, styles) {
      if (Array.isArray(step.options.buttons) && step.options.buttons.length) {
        return preact.h(ShepherdFooter, {
          classPrefix: classPrefix,
          step: step,
          styles: styles
        });
      }

      return null;
    };

    return ShepherdContent;
  }(Component$5);

  var Component$6 = preact.Component;
  var KEY_TAB = 9;
  var KEY_ESC = 27;
  var LEFT_ARROW = 37;
  var RIGHT_ARROW = 39;

  var ShepherdElement =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdElement, _Component);

    function ShepherdElement(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this.step = props.step;
      _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
      return _this;
    }

    var _proto = ShepherdElement.prototype;

    _proto.componentDidMount = function componentDidMount() {
      // Get all elements that are focusable
      var focusableElements = this.element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
      var firstFocusableElement = focusableElements[0];
      var lastFocusableElement = focusableElements[focusableElements.length - 1];
      this.focusableElements = focusableElements;
      this.firstFocusableElement = firstFocusableElement;
      this.lastFocusableElement = lastFocusableElement;
    };

    _proto.render = function render(props) {
      var _dataStepId,
          _this2 = this;

      var classes = props.classes,
          classPrefix = props.classPrefix,
          descriptionId = props.descriptionId,
          labelId = props.labelId,
          step = props.step,
          styles = props.styles;
      var dataStepId = (_dataStepId = {}, _dataStepId["data-" + classPrefix + "shepherd-step-id"] = step.id, _dataStepId);
      return preact.h("div", _extends({
        "aria-describedby": !isUndefined(step.options.text) ? descriptionId : null,
        "aria-labeledby": step.options.title ? labelId : null,
        className: classes + styles.element
      }, dataStepId, {
        onKeyDown: this.handleKeyDown,
        ref: function ref(c) {
          return _this2.element = c;
        },
        role: "dialog",
        tabindex: "0"
      }), preact.h(ShepherdContent, {
        classPrefix: classPrefix,
        descriptionId: descriptionId,
        labelId: labelId,
        step: step,
        styles: styles
      }));
    }
    /**
     * Setup keydown events to allow closing the modal with ESC
     *
     * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
     *
     * @private
     */
    ;

    _proto.handleKeyDown = function handleKeyDown(e) {
      var tour = this.step.tour;

      switch (e.keyCode) {
        case KEY_TAB:
          if (this.focusableElements.length === 1) {
            e.preventDefault();
            break;
          } // Backward tab


          if (e.shiftKey) {
            if (document.activeElement === this.firstFocusableElement) {
              e.preventDefault();
              this.lastFocusableElement.focus();
            }
          } else {
            if (document.activeElement === this.lastFocusableElement) {
              e.preventDefault();
              this.firstFocusableElement.focus();
            }
          }

          break;

        case KEY_ESC:
          if (tour.options.exitOnEsc) {
            this.step.cancel();
          }

          break;

        case LEFT_ARROW:
          if (tour.options.keyboardNavigation) {
            tour.back();
          }

          break;

        case RIGHT_ARROW:
          if (tour.options.keyboardNavigation) {
            tour.next();
          }

          break;

        default:
          break;
      }
    };

    return ShepherdElement;
  }(Component$6);

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
  var render$1 = preact.render;
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
    _inheritsLoose(Step, _Evented);

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
     * @param {function} options.buttons.button.action A function executed when the button is clicked on.
     * It is automatically bound to the `tour` the step is associated with, so things like `this.next` will
     * work inside the action.
     * You can use action to skip steps or navigate to specific steps, with something like:
     * ```js
     * action() {
     *   return this.show('some_step_name');
     * }
     * ```
     * @param {string} options.buttons.button.classes Extra classes to apply to the `<a>`
     * @param {boolean} options.buttons.button.secondary If true, a shepherd-button-secondary class is applied to the button
     * @param {string} options.buttons.button.text The HTML text of the button
     * @param {boolean} options.canClickTarget A boolean, that when set to false, will set `pointer-events: none` on the target
     * @param {object} options.cancelIcon Options for the cancel icon
     * @param {boolean} options.cancelIcon.enabled Should a cancel “✕” be shown in the header of the step?
     * @param {string} options.cancelIcon.label The label to add for `aria-label`
     * @param {string} options.classes A string of extra classes to add to the step's content element.
     * @param {string} options.highlightClass An extra class to apply to the `attachTo` element when it is
     * highlighted (that is, when its step is active). You can then target that selector in your CSS.
     * @param {string} options.id The string to use as the `id` for the step.
     * @param {Object} options.tippyOptions Extra [options to pass to tippy.js]{@link https://atomiks.github.io/tippyjs/#all-options}
     * @param {boolean|Object} options.scrollTo Should the element be scrolled to when this step is shown? If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{behavior: 'smooth', block: 'center'}`
     * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
     * define a custom action to do the scrolling, and possibly other logic.
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

      if (options === void 0) {
        options = {};
      }

      _this = _Evented.call(this, tour, options) || this;
      _this.tour = tour;
      _this.classPrefix = _this.tour.options ? normalizePrefix(_this.tour.options.classPrefix) : '';
      _this.styles = tour.styles;
      autoBind(_assertThisInitialized(_this));

      _this._setOptions(options);

      return _assertThisInitialized(_this) || _assertThisInitialized(_this);
    }
    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */


    var _proto = Step.prototype;

    _proto.cancel = function cancel() {
      this.tour.cancel();
      this.trigger('cancel');
    }
    /**
     * Complete the tour
     * Triggers the `complete` event
     */
    ;

    _proto.complete = function complete() {
      this.tour.complete();
      this.trigger('complete');
    }
    /**
     * Remove the step, delete the step's element, and destroy the tippy instance for the step
     * Triggers `destroy` event
     */
    ;

    _proto.destroy = function destroy() {
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
    ;

    _proto.getTour = function getTour() {
      return this.tour;
    }
    /**
     * Hide the step and destroy the tippy instance
     */
    ;

    _proto.hide = function hide() {
      this.tour.modal.hide();
      this.trigger('before-hide');
      document.body.removeAttribute("data-" + this.classPrefix + "shepherd-step");

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
    ;

    _proto.isOpen = function isOpen() {
      return Boolean(this.tooltip && this.tooltip.state && this.tooltip.state.isVisible);
    }
    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     * @return {*|Promise}
     */
    ;

    _proto.show = function show() {
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
     * Creates Shepherd element for step based on options
     *
     * @return {Element} The DOM element for the step tooltip
     * @private
     */
    ;

    _proto._createTooltipContent = function _createTooltipContent() {
      var cancelIconEnabled = getValue(this, 'options.cancelIcon.enabled');
      var classes = this.options.classes || '';
      var descriptionId = this.id + "-description";
      var labelId = this.id + "-label";

      if (cancelIconEnabled) {
        classes += " " + this.classPrefix + "shepherd-has-cancel-icon";
      }

      return render$1(preact.h(ShepherdElement, {
        classPrefix: this.classPrefix,
        classes: classes,
        descriptionId: descriptionId,
        labelId: labelId,
        step: this,
        styles: this.styles
      }), null);
    }
    /**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     *
     * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
     * @private
     */
    ;

    _proto._scrollTo = function _scrollTo(scrollToOptions) {
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
    ;

    _proto._setOptions = function _setOptions(options) {
      var _this3 = this;

      if (options === void 0) {
        options = {};
      }

      this.options = options;
      var when = this.options.when;
      this.destroy();
      this.id = this.options.id || "step-" + uniqueId();

      if (when) {
        Object.keys(when).forEach(function (event) {
          _this3.on(event, when[event], _this3);
        });
      }
    }
    /**
     * Create the element and set up the tippy instance
     * @private
     */
    ;

    _proto._setupElements = function _setupElements() {
      if (!isUndefined(this.el)) {
        this.destroy();
      }

      this.el = this._createTooltipContent();

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
    ;

    _proto._show = function _show() {
      var _this4 = this;

      this.trigger('before-show');

      if (!this.el) {
        this._setupElements();
      }

      this.tour.modal.setupForStep(this);

      this._styleTargetElementForStep(this);

      var target = this.target || document.body;
      target.classList.add(this.classPrefix + "shepherd-enabled", this.classPrefix + "shepherd-target");
      document.body.setAttribute("data-" + this.classPrefix + "shepherd-step", this.id);

      if (this.options.scrollTo) {
        setTimeout(function () {
          _this4._scrollTo(_this4.options.scrollTo);
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
    ;

    _proto._styleTargetElementForStep = function _styleTargetElementForStep(step) {
      var targetElement = step.target;

      if (!targetElement) {
        return;
      }

      toggleShepherdModalClass(targetElement, step.classPrefix);

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
    ;

    _proto._updateStepTargetOnHide = function _updateStepTargetOnHide() {
      if (this.options.highlightClass) {
        this.target.classList.remove(this.options.highlightClass);
      }

      this.target.classList.remove(this.classPrefix + "shepherd-enabled", this.classPrefix + "shepherd-target");
    };

    return Step;
  }(Evented);

  var bodyScrollLock_min = createCommonjsModule(function (module, exports) {
  !function(e,t){t(exports);}(commonjsGlobal,function(exports){function r(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0;}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e);}var d="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),c=[],u=!1,a=-1,s=void 0,v=void 0,f=function(t){return c.some(function(e){return !(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})},m=function(e){var t=e||window.event;return !!f(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))},o=function(){setTimeout(function(){void 0!==v&&(document.body.style.paddingRight=v,v=void 0),void 0!==s&&(document.body.style.overflow=s,s=void 0);});};exports.disableBodyScroll=function(i,e){if(d){if(!i)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(i&&!c.some(function(e){return e.targetElement===i})){var t={targetElement:i,options:e||{}};c=[].concat(r(c),[t]),i.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY);},i.ontouchmove=function(e){var t,o,n,r;1===e.targetTouches.length&&(o=i,r=(t=e).targetTouches[0].clientY-a,!f(t.target)&&(o&&0===o.scrollTop&&0<r?m(t):(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&r<0?m(t):t.stopPropagation()));},u||(document.addEventListener("touchmove",m,l?{passive:!1}:void 0),u=!0);}}else{n=e,setTimeout(function(){if(void 0===v){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(v=document.body.style.paddingRight,document.body.style.paddingRight=t+"px");}void 0===s&&(s=document.body.style.overflow,document.body.style.overflow="hidden");});var o={targetElement:i,options:e||{}};c=[].concat(r(c),[o]);}var n;},exports.clearAllBodyScrollLocks=function(){d?(c.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null;}),u&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1),c=[],a=-1):(o(),c=[]);},exports.enableBodyScroll=function(t){if(d){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,c=c.filter(function(e){return e.targetElement!==t}),u&&0===c.length&&(document.removeEventListener("touchmove",m,l?{passive:!1}:void 0),u=!1);}else(c=c.filter(function(e){return e.targetElement!==t})).length||o();};});
  });

  var bodyScrollLock = unwrapExports(bodyScrollLock_min);

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
      steps.forEach(function (step) {
        if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
          var stepElement = step.target;

          if (stepElement instanceof HTMLElement) {
            stepElement.style.pointerEvents = 'auto';
          }
        }
      });
    }
  }

  function _extends$3() {
    _extends$3 = Object.assign || function (target) {
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

    return _extends$3.apply(this, arguments);
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _inheritsLoose$1(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  /**
   * Create an error file out of errors.md for development and a simple web link to the full errors
   * in production mode.
   * @private
   */


  var PolishedError =
  /*#__PURE__*/
  function (_Error) {
    _inheritsLoose$1(PolishedError, _Error);

    function PolishedError(code) {
      var _this;

      {
        _this = _Error.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/master/src/internalHelpers/errors.md#" + code + " for more information.") || this;
      }

      return _assertThisInitialized$1(_this);
    }

    return PolishedError;
  }(
  /*#__PURE__*/
  _wrapNativeSuper(Error));

  function colorToInt(color) {
    return Math.round(color * 255);
  }

  function convertToInt(red, green, blue) {
    return colorToInt(red) + "," + colorToInt(green) + "," + colorToInt(blue);
  }

  function hslToRgb(hue, saturation, lightness, convert) {
    if (convert === void 0) {
      convert = convertToInt;
    }

    if (saturation === 0) {
      // achromatic
      return convert(lightness, lightness, lightness);
    } // formulae from https://en.wikipedia.org/wiki/HSL_and_HSV


    var huePrime = (hue % 360 + 360) % 360 / 60;
    var chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    var secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    var red = 0;
    var green = 0;
    var blue = 0;

    if (huePrime >= 0 && huePrime < 1) {
      red = chroma;
      green = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      red = secondComponent;
      green = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      green = chroma;
      blue = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      green = secondComponent;
      blue = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      red = secondComponent;
      blue = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      red = chroma;
      blue = secondComponent;
    }

    var lightnessModification = lightness - chroma / 2;
    var finalRed = red + lightnessModification;
    var finalGreen = green + lightnessModification;
    var finalBlue = blue + lightnessModification;
    return convert(finalRed, finalGreen, finalBlue);
  }

  var namedColorMap = {
    aliceblue: 'f0f8ff',
    antiquewhite: 'faebd7',
    aqua: '00ffff',
    aquamarine: '7fffd4',
    azure: 'f0ffff',
    beige: 'f5f5dc',
    bisque: 'ffe4c4',
    black: '000',
    blanchedalmond: 'ffebcd',
    blue: '0000ff',
    blueviolet: '8a2be2',
    brown: 'a52a2a',
    burlywood: 'deb887',
    cadetblue: '5f9ea0',
    chartreuse: '7fff00',
    chocolate: 'd2691e',
    coral: 'ff7f50',
    cornflowerblue: '6495ed',
    cornsilk: 'fff8dc',
    crimson: 'dc143c',
    cyan: '00ffff',
    darkblue: '00008b',
    darkcyan: '008b8b',
    darkgoldenrod: 'b8860b',
    darkgray: 'a9a9a9',
    darkgreen: '006400',
    darkgrey: 'a9a9a9',
    darkkhaki: 'bdb76b',
    darkmagenta: '8b008b',
    darkolivegreen: '556b2f',
    darkorange: 'ff8c00',
    darkorchid: '9932cc',
    darkred: '8b0000',
    darksalmon: 'e9967a',
    darkseagreen: '8fbc8f',
    darkslateblue: '483d8b',
    darkslategray: '2f4f4f',
    darkslategrey: '2f4f4f',
    darkturquoise: '00ced1',
    darkviolet: '9400d3',
    deeppink: 'ff1493',
    deepskyblue: '00bfff',
    dimgray: '696969',
    dimgrey: '696969',
    dodgerblue: '1e90ff',
    firebrick: 'b22222',
    floralwhite: 'fffaf0',
    forestgreen: '228b22',
    fuchsia: 'ff00ff',
    gainsboro: 'dcdcdc',
    ghostwhite: 'f8f8ff',
    gold: 'ffd700',
    goldenrod: 'daa520',
    gray: '808080',
    green: '008000',
    greenyellow: 'adff2f',
    grey: '808080',
    honeydew: 'f0fff0',
    hotpink: 'ff69b4',
    indianred: 'cd5c5c',
    indigo: '4b0082',
    ivory: 'fffff0',
    khaki: 'f0e68c',
    lavender: 'e6e6fa',
    lavenderblush: 'fff0f5',
    lawngreen: '7cfc00',
    lemonchiffon: 'fffacd',
    lightblue: 'add8e6',
    lightcoral: 'f08080',
    lightcyan: 'e0ffff',
    lightgoldenrodyellow: 'fafad2',
    lightgray: 'd3d3d3',
    lightgreen: '90ee90',
    lightgrey: 'd3d3d3',
    lightpink: 'ffb6c1',
    lightsalmon: 'ffa07a',
    lightseagreen: '20b2aa',
    lightskyblue: '87cefa',
    lightslategray: '789',
    lightslategrey: '789',
    lightsteelblue: 'b0c4de',
    lightyellow: 'ffffe0',
    lime: '0f0',
    limegreen: '32cd32',
    linen: 'faf0e6',
    magenta: 'f0f',
    maroon: '800000',
    mediumaquamarine: '66cdaa',
    mediumblue: '0000cd',
    mediumorchid: 'ba55d3',
    mediumpurple: '9370db',
    mediumseagreen: '3cb371',
    mediumslateblue: '7b68ee',
    mediumspringgreen: '00fa9a',
    mediumturquoise: '48d1cc',
    mediumvioletred: 'c71585',
    midnightblue: '191970',
    mintcream: 'f5fffa',
    mistyrose: 'ffe4e1',
    moccasin: 'ffe4b5',
    navajowhite: 'ffdead',
    navy: '000080',
    oldlace: 'fdf5e6',
    olive: '808000',
    olivedrab: '6b8e23',
    orange: 'ffa500',
    orangered: 'ff4500',
    orchid: 'da70d6',
    palegoldenrod: 'eee8aa',
    palegreen: '98fb98',
    paleturquoise: 'afeeee',
    palevioletred: 'db7093',
    papayawhip: 'ffefd5',
    peachpuff: 'ffdab9',
    peru: 'cd853f',
    pink: 'ffc0cb',
    plum: 'dda0dd',
    powderblue: 'b0e0e6',
    purple: '800080',
    rebeccapurple: '639',
    red: 'f00',
    rosybrown: 'bc8f8f',
    royalblue: '4169e1',
    saddlebrown: '8b4513',
    salmon: 'fa8072',
    sandybrown: 'f4a460',
    seagreen: '2e8b57',
    seashell: 'fff5ee',
    sienna: 'a0522d',
    silver: 'c0c0c0',
    skyblue: '87ceeb',
    slateblue: '6a5acd',
    slategray: '708090',
    slategrey: '708090',
    snow: 'fffafa',
    springgreen: '00ff7f',
    steelblue: '4682b4',
    tan: 'd2b48c',
    teal: '008080',
    thistle: 'd8bfd8',
    tomato: 'ff6347',
    turquoise: '40e0d0',
    violet: 'ee82ee',
    wheat: 'f5deb3',
    white: 'fff',
    whitesmoke: 'f5f5f5',
    yellow: 'ff0',
    yellowgreen: '9acd32'
    /**
     * Checks if a string is a CSS named color and returns its equivalent hex value, otherwise returns the original color.
     * @private
     */

  };

  function nameToHex(color) {
    if (typeof color !== 'string') return color;
    var normalizedColorName = color.toLowerCase();
    return namedColorMap[normalizedColorName] ? "#" + namedColorMap[normalizedColorName] : color;
  }

  var hexRegex = /^#[a-fA-F0-9]{6}$/;
  var hexRgbaRegex = /^#[a-fA-F0-9]{8}$/;
  var reducedHexRegex = /^#[a-fA-F0-9]{3}$/;
  var reducedRgbaHexRegex = /^#[a-fA-F0-9]{4}$/;
  var rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i;
  var rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
  var hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/i;
  var hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i;
  /**
   * Returns an RgbColor or RgbaColor object. This utility function is only useful
   * if want to extract a color component. With the color util `toColorString` you
   * can convert a RgbColor or RgbaColor object back to a string.
   *
   * @example
   * // Assigns `{ red: 255, green: 0, blue: 0 }` to color1
   * const color1 = parseToRgb('rgb(255, 0, 0)');
   * // Assigns `{ red: 92, green: 102, blue: 112, alpha: 0.75 }` to color2
   * const color2 = parseToRgb('hsla(210, 10%, 40%, 0.75)');
   */

  function parseToRgb(color) {
    if (typeof color !== 'string') {
      throw new PolishedError(3);
    }

    var normalizedColor = nameToHex(color);

    if (normalizedColor.match(hexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16)
      };
    }

    if (normalizedColor.match(hexRgbaRegex)) {
      var alpha = parseFloat((parseInt("" + normalizedColor[7] + normalizedColor[8], 16) / 255).toFixed(2));
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[2], 16),
        green: parseInt("" + normalizedColor[3] + normalizedColor[4], 16),
        blue: parseInt("" + normalizedColor[5] + normalizedColor[6], 16),
        alpha: alpha
      };
    }

    if (normalizedColor.match(reducedHexRegex)) {
      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16)
      };
    }

    if (normalizedColor.match(reducedRgbaHexRegex)) {
      var _alpha = parseFloat((parseInt("" + normalizedColor[4] + normalizedColor[4], 16) / 255).toFixed(2));

      return {
        red: parseInt("" + normalizedColor[1] + normalizedColor[1], 16),
        green: parseInt("" + normalizedColor[2] + normalizedColor[2], 16),
        blue: parseInt("" + normalizedColor[3] + normalizedColor[3], 16),
        alpha: _alpha
      };
    }

    var rgbMatched = rgbRegex.exec(normalizedColor);

    if (rgbMatched) {
      return {
        red: parseInt("" + rgbMatched[1], 10),
        green: parseInt("" + rgbMatched[2], 10),
        blue: parseInt("" + rgbMatched[3], 10)
      };
    }

    var rgbaMatched = rgbaRegex.exec(normalizedColor);

    if (rgbaMatched) {
      return {
        red: parseInt("" + rgbaMatched[1], 10),
        green: parseInt("" + rgbaMatched[2], 10),
        blue: parseInt("" + rgbaMatched[3], 10),
        alpha: parseFloat("" + rgbaMatched[4])
      };
    }

    var hslMatched = hslRegex.exec(normalizedColor);

    if (hslMatched) {
      var hue = parseInt("" + hslMatched[1], 10);
      var saturation = parseInt("" + hslMatched[2], 10) / 100;
      var lightness = parseInt("" + hslMatched[3], 10) / 100;
      var rgbColorString = "rgb(" + hslToRgb(hue, saturation, lightness) + ")";
      var hslRgbMatched = rgbRegex.exec(rgbColorString);

      if (!hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, rgbColorString);
      }

      return {
        red: parseInt("" + hslRgbMatched[1], 10),
        green: parseInt("" + hslRgbMatched[2], 10),
        blue: parseInt("" + hslRgbMatched[3], 10)
      };
    }

    var hslaMatched = hslaRegex.exec(normalizedColor);

    if (hslaMatched) {
      var _hue = parseInt("" + hslaMatched[1], 10);

      var _saturation = parseInt("" + hslaMatched[2], 10) / 100;

      var _lightness = parseInt("" + hslaMatched[3], 10) / 100;

      var _rgbColorString = "rgb(" + hslToRgb(_hue, _saturation, _lightness) + ")";

      var _hslRgbMatched = rgbRegex.exec(_rgbColorString);

      if (!_hslRgbMatched) {
        throw new PolishedError(4, normalizedColor, _rgbColorString);
      }

      return {
        red: parseInt("" + _hslRgbMatched[1], 10),
        green: parseInt("" + _hslRgbMatched[2], 10),
        blue: parseInt("" + _hslRgbMatched[3], 10),
        alpha: parseFloat("" + hslaMatched[4])
      };
    }

    throw new PolishedError(5);
  }

  function rgbToHsl(color) {
    // make sure rgb are contained in a set of [0, 255]
    var red = color.red / 255;
    var green = color.green / 255;
    var blue = color.blue / 255;
    var max = Math.max(red, green, blue);
    var min = Math.min(red, green, blue);
    var lightness = (max + min) / 2;

    if (max === min) {
      // achromatic
      if (color.alpha !== undefined) {
        return {
          hue: 0,
          saturation: 0,
          lightness: lightness,
          alpha: color.alpha
        };
      } else {
        return {
          hue: 0,
          saturation: 0,
          lightness: lightness
        };
      }
    }

    var hue;
    var delta = max - min;
    var saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0);
        break;

      case green:
        hue = (blue - red) / delta + 2;
        break;

      default:
        // blue case
        hue = (red - green) / delta + 4;
        break;
    }

    hue *= 60;

    if (color.alpha !== undefined) {
      return {
        hue: hue,
        saturation: saturation,
        lightness: lightness,
        alpha: color.alpha
      };
    }

    return {
      hue: hue,
      saturation: saturation,
      lightness: lightness
    };
  }

  /**
   * Returns an HslColor or HslaColor object. This utility function is only useful
   * if want to extract a color component. With the color util `toColorString` you
   * can convert a HslColor or HslaColor object back to a string.
   *
   * @example
   * // Assigns `{ hue: 0, saturation: 1, lightness: 0.5 }` to color1
   * const color1 = parseToHsl('rgb(255, 0, 0)');
   * // Assigns `{ hue: 128, saturation: 1, lightness: 0.5, alpha: 0.75 }` to color2
   * const color2 = parseToHsl('hsla(128, 100%, 50%, 0.75)');
   */
  function parseToHsl(color) {
    // Note: At a later stage we can optimize this function as right now a hsl
    // color would be parsed converted to rgb values and converted back to hsl.
    return rgbToHsl(parseToRgb(color));
  }

  /**
   * Reduces hex values if possible e.g. #ff8866 to #f86
   * @private
   */
  var reduceHexValue = function reduceHexValue(value) {
    if (value.length === 7 && value[1] === value[2] && value[3] === value[4] && value[5] === value[6]) {
      return "#" + value[1] + value[3] + value[5];
    }

    return value;
  };

  function numberToHex(value) {
    var hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function colorToHex(color) {
    return numberToHex(Math.round(color * 255));
  }

  function convertToHex(red, green, blue) {
    return reduceHexValue("#" + colorToHex(red) + colorToHex(green) + colorToHex(blue));
  }

  function hslToHex(hue, saturation, lightness) {
    return hslToRgb(hue, saturation, lightness, convertToHex);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: hsl(359, 0.75, 0.4),
   *   background: hsl({ hue: 360, saturation: 0.75, lightness: 0.4 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${hsl(359, 0.75, 0.4)};
   *   background: ${hsl({ hue: 360, saturation: 0.75, lightness: 0.4 })};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#b3191c";
   *   background: "#b3191c";
   * }
   */
  function hsl(value, saturation, lightness) {
    if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number') {
      return hslToHex(value, saturation, lightness);
    } else if (typeof value === 'object' && saturation === undefined && lightness === undefined) {
      return hslToHex(value.hue, value.saturation, value.lightness);
    }

    throw new PolishedError(1);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: hsla(359, 0.75, 0.4, 0.7),
   *   background: hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 }),
   *   background: hsla(359, 0.75, 0.4, 1),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${hsla(359, 0.75, 0.4, 0.7)};
   *   background: ${hsla({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0,7 })};
   *   background: ${hsla(359, 0.75, 0.4, 1)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(179,25,28,0.7)";
   *   background: "rgba(179,25,28,0.7)";
   *   background: "#b3191c";
   * }
   */
  function hsla(value, saturation, lightness, alpha) {
    if (typeof value === 'number' && typeof saturation === 'number' && typeof lightness === 'number' && typeof alpha === 'number') {
      return alpha >= 1 ? hslToHex(value, saturation, lightness) : "rgba(" + hslToRgb(value, saturation, lightness) + "," + alpha + ")";
    } else if (typeof value === 'object' && saturation === undefined && lightness === undefined && alpha === undefined) {
      return value.alpha >= 1 ? hslToHex(value.hue, value.saturation, value.lightness) : "rgba(" + hslToRgb(value.hue, value.saturation, value.lightness) + "," + value.alpha + ")";
    }

    throw new PolishedError(2);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible hex notation.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: rgb(255, 205, 100),
   *   background: rgb({ red: 255, green: 205, blue: 100 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${rgb(255, 205, 100)};
   *   background: ${rgb({ red: 255, green: 205, blue: 100 })};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#ffcd64";
   *   background: "#ffcd64";
   * }
   */
  function rgb(value, green, blue) {
    if (typeof value === 'number' && typeof green === 'number' && typeof blue === 'number') {
      return reduceHexValue("#" + numberToHex(value) + numberToHex(green) + numberToHex(blue));
    } else if (typeof value === 'object' && green === undefined && blue === undefined) {
      return reduceHexValue("#" + numberToHex(value.red) + numberToHex(value.green) + numberToHex(value.blue));
    }

    throw new PolishedError(6);
  }

  /**
   * Returns a string value for the color. The returned result is the smallest possible rgba or hex notation.
   *
   * Can also be used to fade a color by passing a hex value or named CSS color along with an alpha value.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: rgba(255, 205, 100, 0.7),
   *   background: rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 }),
   *   background: rgba(255, 205, 100, 1),
   *   background: rgba('#ffffff', 0.4),
   *   background: rgba('black', 0.7),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${rgba(255, 205, 100, 0.7)};
   *   background: ${rgba({ red: 255, green: 205, blue: 100, alpha: 0.7 })};
   *   background: ${rgba(255, 205, 100, 1)};
   *   background: ${rgba('#ffffff', 0.4)};
   *   background: ${rgba('black', 0.7)};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(255,205,100,0.7)";
   *   background: "rgba(255,205,100,0.7)";
   *   background: "#ffcd64";
   *   background: "rgba(255,255,255,0.4)";
   *   background: "rgba(0,0,0,0.7)";
   * }
   */
  function rgba(firstValue, secondValue, thirdValue, fourthValue) {
    if (typeof firstValue === 'string' && typeof secondValue === 'number') {
      var rgbValue = parseToRgb(firstValue);
      return "rgba(" + rgbValue.red + "," + rgbValue.green + "," + rgbValue.blue + "," + secondValue + ")";
    } else if (typeof firstValue === 'number' && typeof secondValue === 'number' && typeof thirdValue === 'number' && typeof fourthValue === 'number') {
      return fourthValue >= 1 ? rgb(firstValue, secondValue, thirdValue) : "rgba(" + firstValue + "," + secondValue + "," + thirdValue + "," + fourthValue + ")";
    } else if (typeof firstValue === 'object' && secondValue === undefined && thirdValue === undefined && fourthValue === undefined) {
      return firstValue.alpha >= 1 ? rgb(firstValue.red, firstValue.green, firstValue.blue) : "rgba(" + firstValue.red + "," + firstValue.green + "," + firstValue.blue + "," + firstValue.alpha + ")";
    }

    throw new PolishedError(7);
  }

  var isRgb = function isRgb(color) {
    return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
  };

  var isRgba = function isRgba(color) {
    return typeof color.red === 'number' && typeof color.green === 'number' && typeof color.blue === 'number' && typeof color.alpha === 'number';
  };

  var isHsl = function isHsl(color) {
    return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && (typeof color.alpha !== 'number' || typeof color.alpha === 'undefined');
  };

  var isHsla = function isHsla(color) {
    return typeof color.hue === 'number' && typeof color.saturation === 'number' && typeof color.lightness === 'number' && typeof color.alpha === 'number';
  };
  /**
   * Converts a RgbColor, RgbaColor, HslColor or HslaColor object to a color string.
   * This util is useful in case you only know on runtime which color object is
   * used. Otherwise we recommend to rely on `rgb`, `rgba`, `hsl` or `hsla`.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: toColorString({ red: 255, green: 205, blue: 100 }),
   *   background: toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 }),
   *   background: toColorString({ hue: 240, saturation: 1, lightness: 0.5 }),
   *   background: toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 }),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${toColorString({ red: 255, green: 205, blue: 100 })};
   *   background: ${toColorString({ red: 255, green: 205, blue: 100, alpha: 0.72 })};
   *   background: ${toColorString({ hue: 240, saturation: 1, lightness: 0.5 })};
   *   background: ${toColorString({ hue: 360, saturation: 0.75, lightness: 0.4, alpha: 0.72 })};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#ffcd64";
   *   background: "rgba(255,205,100,0.72)";
   *   background: "#00f";
   *   background: "rgba(179,25,25,0.72)";
   * }
   */


  function toColorString(color) {
    if (typeof color !== 'object') throw new PolishedError(8);
    if (isRgba(color)) return rgba(color);
    if (isRgb(color)) return rgb(color);
    if (isHsla(color)) return hsla(color);
    if (isHsl(color)) return hsl(color);
    throw new PolishedError(8);
  }

  // Type definitions taken from https://github.com/gcanti/flow-static-land/blob/master/src/Fun.js
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-redeclare
  function curried(f, length, acc) {
    return function fn() {
      // eslint-disable-next-line prefer-rest-params
      var combined = acc.concat(Array.prototype.slice.call(arguments));
      return combined.length >= length ? f.apply(this, combined) : curried(f, length, combined);
    };
  } // eslint-disable-next-line no-redeclare


  function curry(f) {
    // eslint-disable-line no-redeclare
    return curried(f, f.length, []);
  }

  function guard(lowerBoundary, upperBoundary, value) {
    return Math.max(lowerBoundary, Math.min(upperBoundary, value));
  }

  /**
   * Returns a string value for the darkened color.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: darken(0.2, '#FFCD64'),
   *   background: darken('0.2', 'rgba(255,205,100,0.7)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${darken(0.2, '#FFCD64')};
   *   background: ${darken('0.2', 'rgba(255,205,100,0.7)')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#ffbd31";
   *   background: "rgba(255,189,49,0.7)";
   * }
   */

  function darken(amount, color) {
    if (color === 'transparent') return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends$3({}, hslColor, {
      lightness: guard(0, 1, hslColor.lightness - parseFloat(amount))
    }));
  } // prettier-ignore


  var curriedDarken =
  /*#__PURE__*/
  curry
  /* ::<number | string, string, string> */
  (darken);

  /**
   * Decreases the intensity of a color. Its range is between 0 to 1. The first
   * argument of the desaturate function is the amount by how much the color
   * intensity should be decreased.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: desaturate(0.2, '#CCCD64'),
   *   background: desaturate('0.2', 'rgba(204,205,100,0.7)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${desaturate(0.2, '#CCCD64')};
   *   background: ${desaturate('0.2', 'rgba(204,205,100,0.7)')};
   * `
   *
   * // CSS in JS Output
   * element {
   *   background: "#b8b979";
   *   background: "rgba(184,185,121,0.7)";
   * }
   */

  function desaturate(amount, color) {
    if (color === 'transparent') return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends$3({}, hslColor, {
      saturation: guard(0, 1, hslColor.saturation - parseFloat(amount))
    }));
  } // prettier-ignore


  var curriedDesaturate =
  /*#__PURE__*/
  curry
  /* ::<number | string, string, string> */
  (desaturate);

  /**
   * Returns a number (float) representing the luminance of a color.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff',
   *   background: getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
   *                             'rgba(58, 133, 255, 1)' :
   *                             'rgba(255, 57, 149, 1)',
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${getLuminance('#CCCD64') >= getLuminance('#0000ff') ? '#CCCD64' : '#0000ff'};
   *   background: ${getLuminance('rgba(58, 133, 255, 1)') >= getLuminance('rgba(255, 57, 149, 1)') ?
   *                             'rgba(58, 133, 255, 1)' :
   *                             'rgba(255, 57, 149, 1)'};
   *
   * // CSS in JS Output
   *
   * div {
   *   background: "#CCCD64";
   *   background: "rgba(58, 133, 255, 1)";
   * }
   */

  function getLuminance(color) {
    if (color === 'transparent') return 0;
    var rgbColor = parseToRgb(color);

    var _Object$keys$map = Object.keys(rgbColor).map(function (key) {
      var channel = rgbColor[key] / 255;
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
    }),
        r = _Object$keys$map[0],
        g = _Object$keys$map[1],
        b = _Object$keys$map[2];

    return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
  }

  /**
   * Returns a string value for the lightened color.
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: lighten(0.2, '#CCCD64'),
   *   background: lighten('0.2', 'rgba(204,205,100,0.7)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${lighten(0.2, '#FFCD64')};
   *   background: ${lighten('0.2', 'rgba(204,205,100,0.7)')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "#e5e6b1";
   *   background: "rgba(229,230,177,0.7)";
   * }
   */

  function lighten(amount, color) {
    if (color === 'transparent') return color;
    var hslColor = parseToHsl(color);
    return toColorString(_extends$3({}, hslColor, {
      lightness: guard(0, 1, hslColor.lightness + parseFloat(amount))
    }));
  } // prettier-ignore


  var curriedLighten =
  /*#__PURE__*/
  curry
  /* ::<number | string, string, string> */
  (lighten);

  /**
   * Returns black or white (or optional light and dark return colors) for best contrast depending on the luminosity of the given color.
   * Follows [W3C specs for readability](https://www.w3.org/TR/WCAG20-TECHS/G18.html).
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   color: readableColor('#000'),
   *   color: readableColor('black', '#001', '#ff8'),
   *   color: readableColor('white', '#001', '#ff8'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   color: ${readableColor('#000')};
   *   color: ${readableColor('black', '#001', '#ff8')};
   *   color: ${readableColor('white', '#001', '#ff8')};
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   color: "#fff";
   *   color: "#ff8";
   *   color: "#001";
   * }
   */

  function readableColor(color, lightReturnColor, darkReturnColor) {
    if (lightReturnColor === void 0) {
      lightReturnColor = '#000';
    }

    if (darkReturnColor === void 0) {
      darkReturnColor = '#fff';
    }

    return getLuminance(color) > 0.179 ? lightReturnColor : darkReturnColor;
  }

  /**
   * Decreases the opacity of a color. Its range for the amount is between 0 to 1.
   *
   *
   * @example
   * // Styles as object usage
   * const styles = {
   *   background: transparentize(0.1, '#fff');
   *   background: transparentize(0.2, 'hsl(0, 0%, 100%)'),
   *   background: transparentize('0.5', 'rgba(255, 0, 0, 0.8)'),
   * }
   *
   * // styled-components usage
   * const div = styled.div`
   *   background: ${transparentize(0.1, '#fff')};
   *   background: ${transparentize(0.2, 'hsl(0, 0%, 100%)')},
   *   background: ${transparentize('0.5', 'rgba(255, 0, 0, 0.8)')},
   * `
   *
   * // CSS in JS Output
   *
   * element {
   *   background: "rgba(255,255,255,0.9)";
   *   background: "rgba(255,255,255,0.8)";
   *   background: "rgba(255,0,0,0.3)";
   * }
   */

  function transparentize(amount, color) {
    if (color === 'transparent') return color;
    var parsedColor = parseToRgb(color);
    var alpha = typeof parsedColor.alpha === 'number' ? parsedColor.alpha : 1;

    var colorWithAlpha = _extends$3({}, parsedColor, {
      alpha: guard(0, 1, (alpha * 100 - parseFloat(amount) * 100) / 100)
    });

    return rgba(colorWithAlpha);
  } // prettier-ignore


  var curriedTransparentize =
  /*#__PURE__*/
  curry
  /* ::<number | string, string, string> */
  (transparentize);

  var styles = {
    arrowSize: 2.1,
    overlayOpacity: 0.5,
    shepherdButtonBorderRadius: '3px',
    shepherdElementBorderRadius: '5px',
    shepherdElementMaxHeight: '100%',
    shepherdElementMaxWidth: '100%',
    shepherdElementZIndex: 9999,
    shepherdTextBackground: '#ffffff',
    shepherdTextLineHeight: '1.3em',
    shepherdTextFontSize: '1rem',
    shepherdThemePrimary: '#3288e6'
  };
  function getVariables(options) {
    if (options.styleVariables) {
      _extends(styles, options.styleVariables);
    }

    if (!styles.shepherdHeaderBackground) {
      styles.shepherdHeaderBackground = curriedDarken(0.1, styles.shepherdTextBackground);
    }

    if (!styles.shepherdThemeSecondary) {
      styles.shepherdThemeSecondary = curriedDesaturate(0.7, curriedLighten(0.4, styles.shepherdThemePrimary));
    }

    _setTextColors();

    return styles;
  }
  /**
   * Set all the text colors to contrasting ones, for readability, if not already defined.
   * @private
   */

  function _setTextColors() {
    if (!styles.shepherdThemeTextPrimary) {
      styles.shepherdThemeTextPrimary = curriedTransparentize(0.25, readableColor(styles.shepherdThemePrimary));
    }

    if (!styles.shepherdThemeTextSecondary) {
      styles.shepherdThemeTextSecondary = curriedTransparentize(0.25, readableColor(styles.shepherdThemeSecondary));
    }

    if (!styles.shepherdThemeTextHeader) {
      styles.shepherdThemeTextHeader = curriedTransparentize(0.25, readableColor(styles.shepherdHeaderBackground));
    }

    if (!styles.shepherdThemeTextColor) {
      styles.shepherdThemeTextColor = curriedTransparentize(0.25, readableColor(styles.shepherdTextBackground));
    }
  }

  /**
   * Code refactored from Mozilla Developer Network:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
   */

  function assign$1(target, firstSource) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      var keysArray = Object.keys(Object(nextSource));
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }

  function polyfill$1() {
    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: assign$1
      });
    }
  }

  var es6ObjectAssign = {
    assign: assign$1,
    polyfill: polyfill$1
  };
  var es6ObjectAssign_1 = es6ObjectAssign.assign;

  var KEBAB_REGEX = /[A-Z]/g;

  var _hash = function hash(str) {
    var hash = 5381,
        i = str.length;

    while (i) {
      hash = hash * 33 ^ str.charCodeAt(--i);
    }

    return '_' + (hash >>> 0).toString(36);
  };

  var create$2 = function create(config) {
    config = config || {};
    var assign = config.assign || Object.assign;
    var client = typeof window === 'object'; // Check if we are really in browser environment.

    var renderer = assign({
      raw: '',
      pfx: '_',
      client: client,
      assign: assign,
      stringify: JSON.stringify,
      kebab: function kebab(prop) {
        return prop.replace(KEBAB_REGEX, '-$&').toLowerCase();
      },
      decl: function decl(key, value) {
        key = renderer.kebab(key);
        return key + ':' + value + ';';
      },
      hash: function hash(obj) {
        return _hash(renderer.stringify(obj));
      },
      selector: function selector(parent, _selector) {
        return parent + (_selector[0] === ':' ? '' : ' ') + _selector;
      },
      putRaw: function putRaw(rawCssRule) {
        renderer.raw += rawCssRule;
      }
    }, config);

    if (renderer.client) {
      if (!renderer.sh) document.head.appendChild(renderer.sh = document.createElement('style'));

      renderer.putRaw = function (rawCssRule) {
        // .insertRule() is faster than .appendChild(), that's why we use it in PROD.
        // But CSS injected using .insertRule() is not displayed in Chrome Devtools,
        // that's why we use .appendChild in DEV.
        {
          var sheet = renderer.sh.sheet; // Unknown pseudo-selectors will throw, this try/catch swallows all errors.

          try {
            sheet.insertRule(rawCssRule, sheet.cssRules.length); // eslint-disable-next-line no-empty
          } catch (error) {}
        }
      };
    }

    renderer.put = function (selector, decls, atrule) {
      var str = '';
      var prop, value;
      var postponed = [];

      for (prop in decls) {
        value = decls[prop];

        if (value instanceof Object && !(value instanceof Array)) {
          postponed.push(prop);
        } else {
          {
            str += renderer.decl(prop, value, selector, atrule);
          }
        }
      }

      if (str) {
        {
          str = selector + '{' + str + '}';
        }

        renderer.putRaw(atrule ? atrule + '{' + str + '}' : str);
      }

      for (var i = 0; i < postponed.length; i++) {
        prop = postponed[i];

        if (prop[0] === "@" && prop !== "@font-face") {
          renderer.putAt(selector, decls[prop], prop);
        } else {
          renderer.put(renderer.selector(selector, prop), decls[prop], atrule);
        }
      }
    };

    renderer.putAt = renderer.put;
    return renderer;
  };

  var addon = function addon(renderer) {
    var cache = {};

    renderer.cache = function (css) {
      if (!css) return '';
      var key = renderer.hash(css);

      if (!cache[key]) {
        cache[key] = renderer.rule(css, key);
      }

      return cache[key];
    };
  };

  var addon$1 = function addon(renderer) {
    renderer.selector = function (parentSelectors, selector) {
      var parents = parentSelectors.split(',');
      var result = [];
      var selectors = selector.split(',');
      var len1 = parents.length;
      var len2 = selectors.length;
      var i, j, sel, pos, parent, replacedSelector;

      for (i = 0; i < len2; i++) {
        sel = selectors[i];
        pos = sel.indexOf('&');

        if (pos > -1) {
          for (j = 0; j < len1; j++) {
            parent = parents[j];
            replacedSelector = sel.replace(/&/g, parent);
            result.push(replacedSelector);
          }
        } else {
          for (j = 0; j < len1; j++) {
            parent = parents[j];

            if (parent) {
              result.push(parent + ' ' + sel);
            } else {
              result.push(sel);
            }
          }
        }
      }

      return result.join(',');
    };
  };

  var addon$2 = function addon(renderer) {

    renderer.rule = function (css, block) {

      block = block || renderer.hash(css);
      block = renderer.pfx + block;
      renderer.put('.' + block, css);
      return ' ' + block;
    };
  };

  var addon$3 = function addon(renderer) {

    renderer.sheet = function (map, block) {
      var result = {};

      if (!block) {
        block = renderer.hash(map);
      }

      var onElementModifier = function onElementModifier(elementModifier) {
        var styles = map[elementModifier];

        {
          Object.defineProperty(result, elementModifier, {
            configurable: true,
            enumerable: true,
            get: function get() {
              var classNames = renderer.rule(styles, block + '-' + elementModifier);
              Object.defineProperty(result, elementModifier, {
                value: classNames,
                enumerable: true
              });
              return classNames;
            }
          });
        }
      };

      for (var elementModifier in map) {
        onElementModifier(elementModifier);
      }

      return result;
    };
  };

  var nano = create$2({
    assign: es6ObjectAssign_1,
    h: h,
    pfx: ''
  });
  addon(nano);
  addon$1(nano);
  addon$2(nano);
  addon$3(nano);
  var rule = nano.rule,
      sheet = nano.sheet;

  function buttonStyles(classPrefix, variables, includeStyles) {
    if (includeStyles) {
      var _button;

      return {
        button: (_button = {
          background: variables.shepherdThemePrimary,
          borderRadius: variables.shepherdButtonBorderRadius,
          border: 0,
          color: variables.shepherdThemeTextPrimary,
          cursor: 'pointer',
          display: 'inline-block',
          fontFamily: 'inherit',
          fontSize: '0.8em',
          letterSpacing: '0.1em',
          lineHeight: '1em',
          marginRight: '0.5em',
          padding: '0.75em 2em',
          textTransform: 'uppercase',
          transition: 'all 0.5s ease',
          verticalAlign: 'middle',
          '&:hover': {
            background: curriedDarken(0.1, variables.shepherdThemePrimary)
          }
        }, _button["&." + classPrefix + "shepherd-button-secondary"] = {
          background: variables.shepherdThemeSecondary,
          color: variables.shepherdThemeTextSecondary,
          '&:hover': {
            background: curriedDarken(0.1, variables.shepherdThemeSecondary),
            color: curriedDarken(0.1, variables.shepherdThemeTextSecondary)
          }
        }, _button)
      };
    }

    return {
      button: {}
    };
  }

  function contentStyles(variables, includeStyles) {
    if (includeStyles) {
      return {
        content: {
          background: variables.shepherdTextBackground,
          borderRadius: variables.shepherdElementBorderRadius,
          fontSize: 'inherit',
          outline: 'none',
          padding: 0
        }
      };
    }

    return {
      content: {}
    };
  }

  function elementStyles() {
    return {
      element: {
        'outline': 'none',
        // We need box-sizing: border-box on shepherd-element and everything under it
        '&, *': {
          '&, &:after, &:before': {
            boxSizing: 'border-box'
          }
        }
      }
    };
  }

  function footerStyles(classPrefix, variables, includeStyles) {
    if (includeStyles) {
      var _footer;

      return {
        footer: (_footer = {
          borderBottomLeftRadius: variables.shepherdElementBorderRadius,
          borderBottomRightRadius: variables.shepherdElementBorderRadius,
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 0.75em 0.75em'
        }, _footer["." + classPrefix + "shepherd-button"] = {
          '&:last-child': {
            marginRight: 0
          }
        }, _footer)
      };
    }

    return {
      footer: {}
    };
  }

  /**
   * Check the luminance of the color and lighten or darken accordingly
   * @param {string} color The color to check
   * @return {string} The lightened or darkened color
   */

  function getLighterOrDarker(color) {
    var l = getLuminance(color);

    if (l > 0.6) {
      return curriedDarken(l / 2, color);
    }

    return curriedLighten((1 - l) / 2, color);
  }

  function headerStyles(classPrefix, variables, includeStyles) {
    var _header, _cancelIcon;

    var header = (_header = {
      alignItems: 'center',
      borderTopLeftRadius: variables.shepherdElementBorderRadius,
      borderTopRightRadius: variables.shepherdElementBorderRadius,
      display: 'flex',
      justifyContent: 'flex-end',
      lineHeight: '2em',
      padding: '0.75em 0.75em 0'
    }, _header["." + classPrefix + "shepherd-has-title ." + classPrefix + "shepherd-content &"] = {
      background: variables.shepherdHeaderBackground,
      padding: '1em'
    }, _header);
    var title = {
      color: variables.shepherdThemeTextHeader,
      display: 'flex',
      flex: '1 0 auto',
      fontSize: '1.1em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      verticalAlign: 'middle'
    };
    var styles = {
      'cancel-icon': (_cancelIcon = {
        background: 'transparent',
        border: 'none',
        color: getLighterOrDarker(variables.shepherdThemeTextColor),
        fontSize: '2em',
        fontWeight: 'normal',
        margin: 0,
        padding: 0,
        position: 'relative',
        textDecoration: 'none',
        transition: 'color 0.5s ease',
        verticalAlign: 'middle',
        '&:hover': {
          color: variables.shepherdThemeTextColor,
          cursor: 'pointer'
        }
      }, _cancelIcon["." + classPrefix + "shepherd-has-title ." + classPrefix + "shepherd-content &"] = {
        color: getLighterOrDarker(variables.shepherdThemeTextHeader),
        '&:hover': {
          color: variables.shepherdThemeTextHeader
        }
      }, _cancelIcon)
    };

    if (includeStyles) {
      styles = _extends({}, styles, {
        header: header,
        title: title
      });
    } else {
      styles = _extends({}, styles, {
        header: {},
        title: {}
      });
    }

    return styles;
  }

  function modalStyles(classPrefix, variables) {
    var _modalOverlayContai;

    return {
      'modal-overlay-container': (_modalOverlayContai = {
        '-ms-filter': 'progid:dximagetransform.microsoft.gradient.alpha(Opacity=50)',
        filter: 'alpha(opacity=50)',
        height: 0,
        left: 0,
        opacity: 0,
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        transition: 'all 0.3s ease-out, height 0ms 0.3s, opacity 0.3s 0ms',
        width: '100vw',
        zIndex: variables.shepherdElementZIndex - 2
      }, _modalOverlayContai["." + classPrefix + "shepherd-modal-is-visible &"] = {
        height: '100vh',
        opacity: variables.overlayOpacity,
        transition: 'all 0.3s ease-out, height 0s 0s, opacity 0.3s 0s'
      }, _modalOverlayContai),
      'modal-mask-rect': {
        height: '100vh',
        width: '100vw'
      }
    };
  }

  function textStyles(variables, includeStyles) {
    if (includeStyles) {
      return {
        text: {
          color: variables.shepherdThemeTextColor,
          fontSize: variables.shepherdTextFontSize,
          lineHeight: variables.shepherdTextLineHeight,
          padding: '0.75em',
          p: {
            marginTop: 0,
            '&:last-child': {
              marginBottom: 0
            }
          }
        }
      };
    }

    return {
      text: {}
    };
  }

  function generateStyles(options) {
    var _ref, _active, _xPlacementTop, _ref2, _xPlacementBott, _xPlacementLeft, _xPlacementRigh, _ref3, _extends2, _rule;

    var variables = getVariables(options);
    var classPrefix = normalizePrefix(options.classPrefix);
    var tippyPrefix = normalizePrefix(options.tippyClassPrefix);
    var includeStyles = options.includeStyles;

    var styles = _extends({
      active: (_active = {}, _active["&." + classPrefix + "shepherd-modal-is-visible"] = (_ref = {}, _ref[":not(." + classPrefix + "shepherd-target)"] = {
        pointerEvents: 'none'
      }, _ref["." + classPrefix + "shepherd-button, ." + classPrefix + "shepherd-cancel-icon, ." + classPrefix + "shepherd-element, ." + classPrefix + "shepherd-target"] = {
        pointerEvents: 'auto',
        '*': {
          pointerEvents: 'auto'
        }
      }, _ref), _active)
    }, buttonStyles(classPrefix, variables, includeStyles), {}, contentStyles(variables, includeStyles), {}, elementStyles(), {}, footerStyles(classPrefix, variables, includeStyles), {}, headerStyles(classPrefix, variables, includeStyles), {}, modalStyles(classPrefix, variables), {}, textStyles(variables, includeStyles));

    if (variables.useDropShadow) {
      styles.element.filter = 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))';
    }

    var classes = sheet(styles, classPrefix + "shepherd");
    var arrowMargin = "calc((" + variables.arrowSize + " / 2.1) * 16px)";
    var popperThemeArrows = {
      '&[x-placement^="top"]': (_xPlacementTop = {
        marginBottom: arrowMargin
      }, _xPlacementTop["." + tippyPrefix + "tippy-arrow"] = {
        borderTopColor: variables.shepherdTextBackground
      }, _xPlacementTop),
      '&[x-placement^="bottom"]': (_xPlacementBott = {
        marginTop: arrowMargin
      }, _xPlacementBott["." + tippyPrefix + "tippy-arrow"] = {
        borderBottomColor: variables.shepherdTextBackground
      }, _xPlacementBott["&." + classPrefix + "shepherd-has-title"] = (_ref2 = {}, _ref2["." + tippyPrefix + "tippy-arrow"] = {
        borderBottomColor: variables.shepherdHeaderBackground
      }, _ref2), _xPlacementBott),
      '&[x-placement^="left"]': (_xPlacementLeft = {
        marginRight: arrowMargin
      }, _xPlacementLeft["." + tippyPrefix + "tippy-arrow"] = {
        borderLeftColor: variables.shepherdTextBackground
      }, _xPlacementLeft),
      '&[x-placement^="right"]': (_xPlacementRigh = {
        marginLeft: arrowMargin
      }, _xPlacementRigh["." + tippyPrefix + "tippy-arrow"] = {
        borderRightColor: variables.shepherdTextBackground
      }, _xPlacementRigh)
    }; // We have to add the root shepherd class separately

    classes.shepherd = rule((_rule = {}, _rule["&." + tippyPrefix + "tippy-popper"] = _extends({}, popperThemeArrows, (_extends2 = {
      zIndex: variables.shepherdElementZIndex
    }, _extends2["." + tippyPrefix + "tippy-tooltip"] = (_ref3 = {
      backgroundColor: variables.shepherdTextBackground
    }, _ref3["." + tippyPrefix + "tippy-arrow"] = {
      transform: "scale(" + variables.arrowSize + ")",
      zIndex: variables.shepherdElementZIndex + 1
    }, _ref3["." + tippyPrefix + "tippy-content"] = {
      maxHeight: variables.shepherdElementMaxHeight,
      maxWidth: variables.shepherdElementMaxWidth,
      padding: 0,
      textAlign: 'center'
    }, _ref3), _extends2)), _rule), classPrefix + "shepherd");
    return classes;
  }

  var Component$7 = preact.Component;

  var ShepherdModal =
  /*#__PURE__*/
  function (_Component) {
    _inheritsLoose(ShepherdModal, _Component);

    function ShepherdModal(props) {
      var _this;

      _this = _Component.call(this, props) || this;
      _this._onScreenChange = null;
      _this.classPrefix = props.classPrefix;
      autoBind(_assertThisInitialized(_this)); // Setup initial state

      _this.closeModalOpening();

      return _this;
    }

    var _proto = ShepherdModal.prototype;

    _proto.render = function render(props, state) {
      var classPrefix = props.classPrefix,
          styles = props.styles;
      return preact.h("svg", {
        className: styles['modal-overlay-container'],
        onTouchMove: ShepherdModal.handlePreventModalOverlayTouch
      }, preact.h("defs", null, preact.h("mask", {
        className: classPrefix + "shepherd-modal-mask",
        height: "100%",
        id: classPrefix + "shepherd-modal-mask",
        width: "100%",
        x: "0",
        y: "0"
      }, preact.h("rect", {
        className: styles['modal-mask-rect'],
        fill: "#FFFFFF",
        height: "100%",
        width: "100%",
        x: "0",
        y: "0"
      }), preact.h("rect", {
        className: classPrefix + "shepherd-modal-mask-opening",
        fill: "#000000",
        height: state.openingProperties.height,
        x: state.openingProperties.x,
        y: state.openingProperties.y,
        width: state.openingProperties.width
      }))), preact.h("rect", {
        height: "100%",
        width: "100%",
        x: "0",
        y: "0",
        mask: "url(#" + classPrefix + "shepherd-modal-mask)"
      }));
    };

    _proto.closeModalOpening = function closeModalOpening() {
      this.setState({
        openingProperties: {
          height: 0,
          x: 0,
          y: 0,
          width: 0
        }
      });
    }
    /**
     * Hide the modal overlay
     */
    ;

    _proto.hide = function hide() {
      document.body.classList.remove(this.classPrefix + "shepherd-modal-is-visible"); // Ensure we cleanup all event listeners when we hide the modal

      this._cleanupStepEventListeners();
    }
    /**
     * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
     * @param {HTMLElement} targetElement The element the opening will expose
     * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
     */
    ;

    _proto.positionModalOpening = function positionModalOpening(targetElement, modalOverlayOpeningPadding) {
      if (modalOverlayOpeningPadding === void 0) {
        modalOverlayOpeningPadding = 0;
      }

      if (targetElement.getBoundingClientRect) {
        var _targetElement$getBou = targetElement.getBoundingClientRect(),
            x = _targetElement$getBou.x,
            y = _targetElement$getBou.y,
            width = _targetElement$getBou.width,
            height = _targetElement$getBou.height,
            left = _targetElement$getBou.left,
            top = _targetElement$getBou.top; // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top


        this.setState({
          openingProperties: {
            x: (x || left) - modalOverlayOpeningPadding,
            y: (y || top) - modalOverlayOpeningPadding,
            width: width + modalOverlayOpeningPadding * 2,
            height: height + modalOverlayOpeningPadding * 2
          }
        });
      }
    }
    /**
     * If modal is enabled, setup the svg mask opening and modal overlay for the step
     * @param {Step} step The step instance
     */
    ;

    _proto.setupForStep = function setupForStep(step) {
      // Ensure we move listeners from the previous step, before we setup new ones
      this._cleanupStepEventListeners();

      if (step.tour.options.useModalOverlay) {
        this._styleForStep(step);

        this.show();
      } else {
        this.hide();
      }
    }
    /**
     * Show the modal overlay
     */
    ;

    _proto.show = function show() {
      document.body.classList.add(this.classPrefix + "shepherd-modal-is-visible");
    }
    /**
     * Add touchmove event listener
     * @private
     */
    ;

    _proto._addStepEventListeners = function _addStepEventListeners() {
      // Prevents window from moving on touch.
      window.addEventListener('touchmove', ShepherdModal._preventModalBodyTouch, {
        passive: false
      });
    }
    /**
     * Cancel the requestAnimationFrame loop and remove touchmove event listeners
     * @private
     */
    ;

    _proto._cleanupStepEventListeners = function _cleanupStepEventListeners() {
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = undefined;
      }

      window.removeEventListener('touchmove', ShepherdModal._preventModalBodyTouch, {
        passive: false
      });
    }
    /**
     * Style the modal for the step
     * @param {Step} step The step to style the opening for
     * @private
     */
    ;

    _proto._styleForStep = function _styleForStep(step) {
      var _this2 = this;

      var modalOverlayOpeningPadding = step.options.modalOverlayOpeningPadding;

      if (step.target) {
        // Setup recursive function to call requestAnimationFrame to update the modal opening position
        var rafLoop = function rafLoop() {
          _this2.rafId = undefined;

          _this2.positionModalOpening(step.target, modalOverlayOpeningPadding);

          _this2.rafId = requestAnimationFrame(rafLoop);
        };

        rafLoop();

        this._addStepEventListeners();
      } else {
        this.closeModalOpening();
      }
    };

    ShepherdModal._preventModalBodyTouch = function _preventModalBodyTouch(e) {
      e.preventDefault();
    };

    ShepherdModal.handlePreventModalOverlayTouch = function handlePreventModalOverlayTouch(e) {
      e.stopPropagation();
    };

    return ShepherdModal;
  }(Component$7);

  var render$2 = preact.render;
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
    _inheritsLoose(Tour, _Evented);

    /**
     * @param {Object} options The options for the tour
     * @param {boolean} options.confirmCancel If true, will issue a `window.confirm` before cancelling
     * @param {string} options.confirmCancelMessage The message to display in the confirm dialog
     * @param {string} options.classPrefix The prefix to add to all the `shepherd-*` class names.
     * @param {Object} options.defaultStepOptions Default options for Steps ({@link Step#constructor}), created through `addStep`
     * @param {boolean} options.disableScroll When set to true, will keep the user from scrolling with the scrollbar,
     * mousewheel, arrow keys, etc. You may want to use this to ensure you are driving the scroll position with the tour.
     * @param {boolean} options.exitOnEsc Exiting the tour with the escape key will be enabled unless this is explicitly
     * set to false.
     * @param {boolean} options.includeStyles If false, the majority of the Shepherd styles will not be included.
     * You may want to use this option if you find yourself overriding a lot of the Shepherd styles.
     * @param {boolean} options.keyboardNavigation Navigating the tour via left and right arrow keys will be enabled
     * unless this is explicitly set to false.
     * @param {HTMLElement} options.modalContainer An optional container element for the modal.
     * If not set, the modal will be appended to `document.body`.
     * @param {object[] | Step[]} options.steps An array of step options objects or Step instances to initialize the tour with
     * @param {object} options.styleVariables An object hash of style variables to override
     * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
     * dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute
     * whenever the tour becomes active.
     * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
     * modal overlay. If true, the overlay will create an opening around the target element so that it
     * can remain interactive
     * @returns {Tour}
     */
    function Tour(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Evented.call(this, options) || this;
      autoBind(_assertThisInitialized(_this));
      var defaultTourOptions = {
        exitOnEsc: true,
        includeStyles: true,
        keyboardNavigation: true
      };
      _this.options = _extends({}, defaultTourOptions, options);
      _this.classPrefix = _this.options ? normalizePrefix(_this.options.classPrefix) : '';
      _this.styles = generateStyles(_this.options);
      _this.steps = [];

      _this.addSteps(_this.options.steps); // Pass these events onto the global Shepherd object


      var events = ['active', 'cancel', 'complete', 'inactive', 'show', 'start'];
      events.map(function (event) {
        (function (e) {
          _this.on(e, function (opts) {
            opts = opts || {};
            opts.tour = _assertThisInitialized(_this);
            Shepherd.trigger(e, opts);
          });
        })(event);
      });
      var existingModal = document.querySelector("." + _this.classPrefix + "shepherd-modal-overlay-container");
      render$2(preact.h(ShepherdModal, {
        classPrefix: _this.classPrefix,
        ref: function ref(c) {
          return _this.modal = c;
        },
        styles: _this.styles
      }), options.modalContainer || document.body, existingModal);

      _this._setTooltipDefaults();

      _this._setTourID();

      return _assertThisInitialized(_this) || _assertThisInitialized(_this);
    }
    /**
     * Adds a new step to the tour
     * @param {Object|Step} options An object containing step options or a Step instance
     * @return {Step} The newly added step
     */


    var _proto = Tour.prototype;

    _proto.addStep = function addStep(options) {
      var step = options;

      if (!(step instanceof Step)) {
        step = this._setupStep(step);
      } else {
        step.tour = this;
      }

      this.steps.push(step);
      return step;
    }
    /**
     * Add multiple steps to the tour
     * @param {Array<object> | Array<Step>} steps The steps to add to the tour
     */
    ;

    _proto.addSteps = function addSteps(steps) {
      var _this2 = this;

      if (Array.isArray(steps)) {
        steps.forEach(function (step) {
          _this2.addStep(step);
        });
      }

      return this;
    }
    /**
     * Go to the previous step in the tour
     */
    ;

    _proto.back = function back() {
      var index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }
    /**
     * Calls _done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     */
    ;

    _proto.cancel = function cancel() {
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
    ;

    _proto.complete = function complete() {
      this._done('complete');
    }
    /**
     * Gets the step from a given id
     * @param {Number|String} id The id of the step to retrieve
     * @return {Step} The step corresponding to the `id`
     */
    ;

    _proto.getById = function getById(id) {
      return this.steps.find(function (step) {
        return step.id === id;
      });
    }
    /**
     * Gets the current step
     * @returns {Step|null}
     */
    ;

    _proto.getCurrentStep = function getCurrentStep() {
      return this.currentStep;
    }
    /**
     * Hide the current step
     */
    ;

    _proto.hide = function hide() {
      var currentStep = this.getCurrentStep();

      if (currentStep) {
        return currentStep.hide();
      }
    }
    /**
     * Check if the tour is active
     * @return {boolean}
     */
    ;

    _proto.isActive = function isActive() {
      return Shepherd.activeTour === this;
    }
    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */
    ;

    _proto.next = function next() {
      var index = this.steps.indexOf(this.currentStep);

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
    ;

    _proto.removeStep = function removeStep(name) {
      var _this3 = this;

      var current = this.getCurrentStep(); // Find the step, destroy it and remove it from this.steps

      this.steps.some(function (step, i) {
        if (step.id === name) {
          if (step.isOpen()) {
            step.hide();
          }

          step.destroy();

          _this3.steps.splice(i, 1);

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
    ;

    _proto.show = function show(key, forward) {
      if (key === void 0) {
        key = 0;
      }

      if (forward === void 0) {
        forward = true;
      }

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
    ;

    _proto.start = function start() {
      this.trigger('start');

      if (this.options.disableScroll) {
        bodyScrollLock.disableBodyScroll();
      } // Save the focused element before the tour opens


      this.focusedElBeforeOpen = document.activeElement;
      this.currentStep = null;

      this._setupActiveTour();

      this.next();
    }
    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {String} event The event name to trigger
     * @private
     */
    ;

    _proto._done = function _done(event) {
      var index = this.steps.indexOf(this.currentStep);

      if (Array.isArray(this.steps)) {
        this.steps.forEach(function (step) {
          return step.destroy();
        });
      }

      cleanupSteps(this);
      this.trigger(event, {
        index: index
      });
      Shepherd.activeTour = null;

      this._removeBodyAttrs();

      this.trigger('inactive', {
        tour: this
      });

      if (this.options.disableScroll) {
        bodyScrollLock.clearAllBodyScrollLocks();
      }

      this.modal.hide(); // Focus the element that was focused before the tour started

      if (isElement(this.focusedElBeforeOpen)) {
        this.focusedElBeforeOpen.focus();
      }
    }
    /**
     * Make this tour "active"
     * @private
     */
    ;

    _proto._setupActiveTour = function _setupActiveTour() {
      this._addBodyAttrs();

      this.trigger('active', {
        tour: this
      });
      Shepherd.activeTour = this;
    }
    /**
     * Setup a new step object
     * @param {Object} stepOptions The object describing the options for the step
     * @return {Step} The step instance
     * @private
     */
    ;

    _proto._setupStep = function _setupStep(stepOptions) {
      stepOptions = _extends({}, this.options.defaultStepOptions, stepOptions);
      return new Step(this, stepOptions);
    }
    /**
     * Called when `showOn` evaluates to false, to skip the step
     * @param {Step} step The step to skip
     * @param {Boolean} forward True if we are going forward, false if backward
     * @private
     */
    ;

    _proto._skipStep = function _skipStep(step, forward) {
      var index = this.steps.indexOf(step);
      var nextIndex = forward ? index + 1 : index - 1;
      this.show(nextIndex, forward);
    }
    /**
     * Set the tippy defaults
     * @private
     */
    ;

    _proto._setTooltipDefaults = function _setTooltipDefaults() {
      tippy.setDefaultProps(defaults);
    }
    /**
     * Before showing, hide the current step and if the tour is not
     * already active, call `this._setupActiveTour`.
     * @private
     */
    ;

    _proto._updateStateBeforeShow = function _updateStateBeforeShow() {
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
    ;

    _proto._setTourID = function _setTourID() {
      var tourName = this.options.tourName || 'tour';
      var uuid = uniqueId$1();
      this.id = tourName + "--" + uuid;
    }
    /**
     * Adds the data-shepherd-active-tour attribute and the 'shepherd-active'
     * class to the body.
     * @private
     */
    ;

    _proto._addBodyAttrs = function _addBodyAttrs() {
      document.body.setAttribute("data-" + this.classPrefix + "shepherd-active-tour", this.id);
      document.body.classList.add(this.styles.active.trim());
    }
    /**
     * Removes the data-shepherd-active-tour attribute and the 'shepherd-active'
     * class from the body.
     * @private
     */
    ;

    _proto._removeBodyAttrs = function _removeBodyAttrs() {
      document.body.removeAttribute("data-" + this.classPrefix + "shepherd-active-tour");
      document.body.classList.remove(this.styles.active.trim());
    };

    return Tour;
  }(Evented);

  _extends(Shepherd, {
    Tour: Tour,
    Step: Step
  });

  return Shepherd;

}));
//# sourceMappingURL=shepherd.js.map
