/*! shepherd.js 10.0.1 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Shepherd = factory());
})(this, (function () { 'use strict';

	var isMergeableObject = function isMergeableObject(value) {
	  return isNonNullObject(value) && !isSpecial(value);
	};

	function isNonNullObject(value) {
	  return !!value && typeof value === 'object';
	}

	function isSpecial(value) {
	  var stringValue = Object.prototype.toString.call(value);
	  return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
	} // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25


	var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

	function isReactElement(value) {
	  return value.$$typeof === REACT_ELEMENT_TYPE;
	}

	function emptyTarget(val) {
	  return Array.isArray(val) ? [] : {};
	}

	function cloneUnlessOtherwiseSpecified(value, options) {
	  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
	}

	function defaultArrayMerge(target, source, options) {
	  return target.concat(source).map(function (element) {
	    return cloneUnlessOtherwiseSpecified(element, options);
	  });
	}

	function getMergeFunction(key, options) {
	  if (!options.customMerge) {
	    return deepmerge;
	  }

	  var customMerge = options.customMerge(key);
	  return typeof customMerge === 'function' ? customMerge : deepmerge;
	}

	function getEnumerableOwnPropertySymbols(target) {
	  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
	    return target.propertyIsEnumerable(symbol);
	  }) : [];
	}

	function getKeys(target) {
	  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
	}

	function propertyIsOnObject(object, property) {
	  try {
	    return property in object;
	  } catch (_) {
	    return false;
	  }
	} // Protects from prototype poisoning and unexpected merging up the prototype chain.


	function propertyIsUnsafe(target, key) {
	  return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
	  && !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
	  && Object.propertyIsEnumerable.call(target, key)); // and also unsafe if they're nonenumerable.
	}

	function mergeObject(target, source, options) {
	  var destination = {};

	  if (options.isMergeableObject(target)) {
	    getKeys(target).forEach(function (key) {
	      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
	    });
	  }

	  getKeys(source).forEach(function (key) {
	    if (propertyIsUnsafe(target, key)) {
	      return;
	    }

	    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
	      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
	    } else {
	      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
	    }
	  });
	  return destination;
	}

	function deepmerge(target, source, options) {
	  options = options || {};
	  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	  options.isMergeableObject = options.isMergeableObject || isMergeableObject; // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	  // implementations can use it. The caller may not replace it.

	  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
	  var sourceIsArray = Array.isArray(source);
	  var targetIsArray = Array.isArray(target);
	  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	  if (!sourceAndTargetTypesMatch) {
	    return cloneUnlessOtherwiseSpecified(source, options);
	  } else if (sourceIsArray) {
	    return options.arrayMerge(target, source, options);
	  } else {
	    return mergeObject(target, source, options);
	  }
	}

	deepmerge.all = function deepmergeAll(array, options) {
	  if (!Array.isArray(array)) {
	    throw new Error('first argument should be an array');
	  }

	  return array.reduce(function (prev, next) {
	    return deepmerge(prev, next, options);
	  }, {});
	};

	var deepmerge_1 = deepmerge;
	var cjs = deepmerge_1;

	/**
	 * Checks if `value` is classified as an `Element`.
	 * @param {*} value The param to check if it is an Element
	 */
	function isElement$1(value) {
	  return value instanceof Element;
	}
	/**
	 * Checks if `value` is classified as an `HTMLElement`.
	 * @param {*} value The param to check if it is an HTMLElement
	 */

	function isHTMLElement$1(value) {
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

	class Evented {
	  on(event, handler, ctx, once) {
	    if (once === void 0) {
	      once = false;
	    }

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
	    return this;
	  }

	  once(event, handler, ctx) {
	    return this.on(event, handler, ctx, true);
	  }

	  off(event, handler) {
	    if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
	      return this;
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

	    return this;
	  }

	  trigger(event) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    if (!isUndefined(this.bindings) && this.bindings[event]) {
	      this.bindings[event].forEach((binding, index) => {
	        const {
	          ctx,
	          handler,
	          once
	        } = binding;
	        const context = ctx || this;
	        handler.apply(context, args);

	        if (once) {
	          this.bindings[event].splice(index, 1);
	        }
	      });
	    }

	    return this;
	  }

	}

	/**
	 * Binds all the methods on a JS Class to the `this` context of the class.
	 * Adapted from https://github.com/sindresorhus/auto-bind
	 * @param {object} self The `this` context of the class
	 * @return {object} The `this` context of the class
	 */
	function autoBind(self) {
	  const keys = Object.getOwnPropertyNames(self.constructor.prototype);

	  for (let i = 0; i < keys.length; i++) {
	    const key = keys[i];
	    const val = self[key];

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
	  return event => {
	    if (step.isOpen()) {
	      const targetIsEl = step.el && event.currentTarget === step.el;
	      const targetIsSelector = !isUndefined(selector) && event.currentTarget.matches(selector);

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
	  const {
	    event,
	    selector
	  } = step.options.advanceOn || {};

	  if (event) {
	    const handler = _setupAdvanceOnHandler(selector, step); // TODO: this should also bind/unbind on show/hide


	    let el;

	    try {
	      el = document.querySelector(selector);
	    } catch (e) {// TODO
	    }

	    if (!isUndefined(selector) && !el) {
	      return console.error(`No element was found for the selector supplied to advanceOn: ${selector}`);
	    } else if (el) {
	      el.addEventListener(event, handler);
	      step.on('destroy', () => {
	        return el.removeEventListener(event, handler);
	      });
	    } else {
	      document.body.addEventListener(event, handler, true);
	      step.on('destroy', () => {
	        return document.body.removeEventListener(event, handler, true);
	      });
	    }
	  } else {
	    return console.error('advanceOn was defined, but no event name was passed.');
	  }
	}

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getBoundingClientRect(element, includeScale) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }

	  var rect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;

	  if (isHTMLElement(element) && includeScale) {
	    var offsetHeight = element.offsetHeight;
	    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
	    // Fallback to 1 in case both values are `0`

	    if (offsetWidth > 0) {
	      scaleX = round(rect.width) / offsetWidth || 1;
	    }

	    if (offsetHeight > 0) {
	      scaleY = round(rect.height) / offsetHeight || 1;
	    }
	  }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	    var next = child;

	    do {
	      if (next && parent.isSameNode(next)) {
	        return true;
	      } // $FlowFixMe[prop-missing]: need a better way to handle this...


	      next = next.parentNode || next.host;
	    } while (next);
	  } // Give up, the result is false


	  return false;
	}

	function getComputedStyle(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	      x = _offsets$x === void 0 ? 0 : _offsets$x,
	      _offsets$y = offsets.y,
	      y = _offsets$y === void 0 ? 0 : _offsets$y;

	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref4.x;
	  y = _ref4.y;

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref5) {
	  var state = _ref5.state,
	      options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name; // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step

	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });

	        for (var index = 0; index < state.orderedModifiers.length; index++) {

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	function _extends() {
	  _extends = Object.assign ? Object.assign.bind() : function (target) {
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

	function _getCenteredStylePopperModifier() {
	  return [{
	    name: 'applyStyles',

	    fn(_ref) {
	      let {
	        state
	      } = _ref;
	      Object.keys(state.elements).forEach(name => {
	        if (name !== 'popper') {
	          return;
	        }

	        const style = {
	          position: 'fixed',
	          left: '50%',
	          top: '50%',
	          transform: 'translate(-50%, -50%)'
	        };
	        const attributes = state.attributes[name] || {};
	        const element = state.elements[name];
	        Object.assign(element.style, style);
	        Object.keys(attributes).forEach(name => {
	          const value = attributes[name];

	          if (value === false) {
	            element.removeAttribute(name);
	          } else {
	            element.setAttribute(name, value === true ? '' : value);
	          }
	        });
	      });
	    }

	  }, {
	    name: 'computeStyles',
	    options: {
	      adaptive: false
	    }
	  }];
	}
	/**
	 * Generates a modifier for popper that will help focus the element after it has
	 * been rendered
	 *
	 * @param {Step} step The step instance
	 * @return {Object} The focus after render modifier configuration object
	 */


	function generateFocusAfterRenderModifier(step) {
	  return {
	    name: 'focusAfterRender',
	    enabled: true,
	    phase: 'afterWrite',

	    fn() {
	      setTimeout(() => {
	        if (step.el) {
	          const focusOptions = {
	            preventScroll: true
	          };
	          step.el.focus(focusOptions);
	        }
	      }, 300);
	    }

	  };
	}
	/**
	 * Generates the array of options for a tooltip that doesn't have a
	 * target element in the DOM -- and thus is positioned in the center
	 * of the view
	 *
	 * @param {Step} step The step instance
	 * @return {Object} The final Popper options object
	 */

	function makeCenteredPopper(step) {
	  const centeredStylePopperModifier = _getCenteredStylePopperModifier();

	  let popperOptions = {
	    placement: 'top',
	    strategy: 'fixed',
	    modifiers: [generateFocusAfterRenderModifier(step)]
	  };
	  popperOptions = _extends({}, popperOptions, {
	    modifiers: Array.from(new Set([...popperOptions.modifiers, ...centeredStylePopperModifier]))
	  });
	  return popperOptions;
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

	  return prefix.charAt(prefix.length - 1) !== '-' ? `${prefix}-` : prefix;
	}
	/**
	 * Resolves attachTo options, converting element option value to a qualified HTMLElement.
	 * @param {Step} step The step instance
	 * @returns {{}|{element, on}}
	 * `element` is a qualified HTML Element
	 * `on` is a string position value
	 */

	function parseAttachTo(step) {
	  const options = step.options.attachTo || {};
	  const returnOpts = Object.assign({}, options);

	  if (isFunction(returnOpts.element)) {
	    // Bind the callback to step so that it has access to the object, to enable running additional logic
	    returnOpts.element = returnOpts.element.call(step);
	  }

	  if (isString(returnOpts.element)) {
	    // Can't override the element in user opts reference because we can't
	    // guarantee that the element will exist in the future.
	    try {
	      returnOpts.element = document.querySelector(returnOpts.element);
	    } catch (e) {// TODO
	    }

	    if (!returnOpts.element) {
	      console.error(`The element for this Shepherd step was not found ${options.element}`);
	    }
	  }

	  return returnOpts;
	}
	/**
	 * Checks if the step should be centered or not. Does not trigger attachTo.element evaluation, making it a pure
	 * alternative for the deprecated step.isCentered() method.
	 * @param resolvedAttachToOptions
	 * @returns {boolean}
	 */

	function shouldCenterStep(resolvedAttachToOptions) {
	  if (resolvedAttachToOptions === undefined || resolvedAttachToOptions === null) {
	    return true;
	  }

	  return !resolvedAttachToOptions.element || !resolvedAttachToOptions.on;
	}
	/**
	 * Determines options for the tooltip and initializes
	 * `step.tooltip` as a Popper instance.
	 * @param {Step} step The step instance
	 */

	function setupTooltip(step) {
	  if (step.tooltip) {
	    step.tooltip.destroy();
	  }

	  const attachToOptions = step._getResolvedAttachToOptions();

	  let target = attachToOptions.element;
	  const popperOptions = getPopperOptions(attachToOptions, step);

	  if (shouldCenterStep(attachToOptions)) {
	    target = document.body;
	    const content = step.shepherdElementComponent.getElement();
	    content.classList.add('shepherd-centered');
	  }

	  step.tooltip = createPopper(target, step.el, popperOptions);
	  step.target = attachToOptions.element;
	  return popperOptions;
	}
	/**
	 * Create a unique id for steps, tours, modals, etc
	 * @return {string}
	 */

	function uuid() {
	  let d = Date.now();
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
	    const r = (d + Math.random() * 16) % 16 | 0;
	    d = Math.floor(d / 16);
	    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
	  });
	}
	/**
	 * Gets the `Popper` options from a set of base `attachTo` options
	 * @param attachToOptions
	 * @param {Step} step The step instance
	 * @return {Object}
	 * @private
	 */

	function getPopperOptions(attachToOptions, step) {
	  let popperOptions = {
	    modifiers: [{
	      name: 'preventOverflow',
	      options: {
	        altAxis: true,
	        tether: false
	      }
	    }, generateFocusAfterRenderModifier(step)],
	    strategy: 'absolute'
	  };

	  if (shouldCenterStep(attachToOptions)) {
	    popperOptions = makeCenteredPopper(step);
	  } else {
	    popperOptions.placement = attachToOptions.on;
	  }

	  const defaultStepOptions = step.tour && step.tour.options && step.tour.options.defaultStepOptions;

	  if (defaultStepOptions) {
	    popperOptions = _mergeModifiers(defaultStepOptions, popperOptions);
	  }

	  popperOptions = _mergeModifiers(step.options, popperOptions);
	  return popperOptions;
	}

	function _mergeModifiers(stepOptions, popperOptions) {
	  if (stepOptions.popperOptions) {
	    let mergedPopperOptions = Object.assign({}, popperOptions, stepOptions.popperOptions);

	    if (stepOptions.popperOptions.modifiers && stepOptions.popperOptions.modifiers.length > 0) {
	      const names = stepOptions.popperOptions.modifiers.map(mod => mod.name);
	      const filteredModifiers = popperOptions.modifiers.filter(mod => !names.includes(mod.name));
	      mergedPopperOptions.modifiers = Array.from(new Set([...filteredModifiers, ...stepOptions.popperOptions.modifiers]));
	    }

	    return mergedPopperOptions;
	  }

	  return popperOptions;
	}

	function noop() {}

	function assign(tar, src) {
	  // @ts-ignore
	  for (const k in src) tar[k] = src[k];

	  return tar;
	}

	function run(fn) {
	  return fn();
	}

	function blank_object() {
	  return Object.create(null);
	}

	function run_all(fns) {
	  fns.forEach(run);
	}

	function is_function(thing) {
	  return typeof thing === 'function';
	}

	function safe_not_equal(a, b) {
	  return a != a ? b == b : a !== b || a && typeof a === 'object' || typeof a === 'function';
	}

	function is_empty(obj) {
	  return Object.keys(obj).length === 0;
	}

	function append(target, node) {
	  target.appendChild(node);
	}

	function insert(target, node, anchor) {
	  target.insertBefore(node, anchor || null);
	}

	function detach(node) {
	  node.parentNode.removeChild(node);
	}

	function destroy_each(iterations, detaching) {
	  for (let i = 0; i < iterations.length; i += 1) {
	    if (iterations[i]) iterations[i].d(detaching);
	  }
	}

	function element(name) {
	  return document.createElement(name);
	}

	function svg_element(name) {
	  return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	function text(data) {
	  return document.createTextNode(data);
	}

	function space() {
	  return text(' ');
	}

	function empty() {
	  return text('');
	}

	function listen(node, event, handler, options) {
	  node.addEventListener(event, handler, options);
	  return () => node.removeEventListener(event, handler, options);
	}

	function attr(node, attribute, value) {
	  if (value == null) node.removeAttribute(attribute);else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	function set_attributes(node, attributes) {
	  // @ts-ignore
	  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);

	  for (const key in attributes) {
	    if (attributes[key] == null) {
	      node.removeAttribute(key);
	    } else if (key === 'style') {
	      node.style.cssText = attributes[key];
	    } else if (key === '__value') {
	      node.value = node[key] = attributes[key];
	    } else if (descriptors[key] && descriptors[key].set) {
	      node[key] = attributes[key];
	    } else {
	      attr(node, key, attributes[key]);
	    }
	  }
	}

	function children(element) {
	  return Array.from(element.childNodes);
	}

	function toggle_class(element, name, toggle) {
	  element.classList[toggle ? 'add' : 'remove'](name);
	}

	let current_component;

	function set_current_component(component) {
	  current_component = component;
	}

	function get_current_component() {
	  if (!current_component) throw new Error('Function called outside component initialization');
	  return current_component;
	}

	function onMount(fn) {
	  get_current_component().$$.on_mount.push(fn);
	}

	function afterUpdate(fn) {
	  get_current_component().$$.after_update.push(fn);
	}

	const dirty_components = [];
	const binding_callbacks = [];
	const render_callbacks = [];
	const flush_callbacks = [];
	const resolved_promise = Promise.resolve();
	let update_scheduled = false;

	function schedule_update() {
	  if (!update_scheduled) {
	    update_scheduled = true;
	    resolved_promise.then(flush);
	  }
	}

	function add_render_callback(fn) {
	  render_callbacks.push(fn);
	}
	// 1. All beforeUpdate callbacks, in order: parents before children
	// 2. All bind:this callbacks, in reverse order: children before parents.
	// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
	//    for afterUpdates called during the initial onMount, which are called in
	//    reverse order: children before parents.
	// Since callbacks might update component values, which could trigger another
	// call to flush(), the following steps guard against this:
	// 1. During beforeUpdate, any updated components will be added to the
	//    dirty_components array and will cause a reentrant call to flush(). Because
	//    the flush index is kept outside the function, the reentrant call will pick
	//    up where the earlier call left off and go through all dirty components. The
	//    current_component value is saved and restored so that the reentrant call will
	//    not interfere with the "parent" flush() call.
	// 2. bind:this callbacks cannot trigger new flush() calls.
	// 3. During afterUpdate, any updated components will NOT have their afterUpdate
	//    callback called a second time; the seen_callbacks set, outside the flush()
	//    function, guarantees this behavior.


	const seen_callbacks = new Set();
	let flushidx = 0; // Do *not* move this inside the flush() function

	function flush() {
	  const saved_component = current_component;

	  do {
	    // first, call beforeUpdate functions
	    // and update components
	    while (flushidx < dirty_components.length) {
	      const component = dirty_components[flushidx];
	      flushidx++;
	      set_current_component(component);
	      update(component.$$);
	    }

	    set_current_component(null);
	    dirty_components.length = 0;
	    flushidx = 0;

	    while (binding_callbacks.length) binding_callbacks.pop()(); // then, once components are updated, call
	    // afterUpdate functions. This may cause
	    // subsequent updates...


	    for (let i = 0; i < render_callbacks.length; i += 1) {
	      const callback = render_callbacks[i];

	      if (!seen_callbacks.has(callback)) {
	        // ...so guard against infinite loops
	        seen_callbacks.add(callback);
	        callback();
	      }
	    }

	    render_callbacks.length = 0;
	  } while (dirty_components.length);

	  while (flush_callbacks.length) {
	    flush_callbacks.pop()();
	  }

	  update_scheduled = false;
	  seen_callbacks.clear();
	  set_current_component(saved_component);
	}

	function update($$) {
	  if ($$.fragment !== null) {
	    $$.update();
	    run_all($$.before_update);
	    const dirty = $$.dirty;
	    $$.dirty = [-1];
	    $$.fragment && $$.fragment.p($$.ctx, dirty);
	    $$.after_update.forEach(add_render_callback);
	  }
	}

	const outroing = new Set();
	let outros;

	function group_outros() {
	  outros = {
	    r: 0,
	    c: [],
	    p: outros // parent group

	  };
	}

	function check_outros() {
	  if (!outros.r) {
	    run_all(outros.c);
	  }

	  outros = outros.p;
	}

	function transition_in(block, local) {
	  if (block && block.i) {
	    outroing.delete(block);
	    block.i(local);
	  }
	}

	function transition_out(block, local, detach, callback) {
	  if (block && block.o) {
	    if (outroing.has(block)) return;
	    outroing.add(block);
	    outros.c.push(() => {
	      outroing.delete(block);

	      if (callback) {
	        if (detach) block.d(1);
	        callback();
	      }
	    });
	    block.o(local);
	  } else if (callback) {
	    callback();
	  }
	}

	function get_spread_update(levels, updates) {
	  const update = {};
	  const to_null_out = {};
	  const accounted_for = {
	    $$scope: 1
	  };
	  let i = levels.length;

	  while (i--) {
	    const o = levels[i];
	    const n = updates[i];

	    if (n) {
	      for (const key in o) {
	        if (!(key in n)) to_null_out[key] = 1;
	      }

	      for (const key in n) {
	        if (!accounted_for[key]) {
	          update[key] = n[key];
	          accounted_for[key] = 1;
	        }
	      }

	      levels[i] = n;
	    } else {
	      for (const key in o) {
	        accounted_for[key] = 1;
	      }
	    }
	  }

	  for (const key in to_null_out) {
	    if (!(key in update)) update[key] = undefined;
	  }

	  return update;
	}

	function create_component(block) {
	  block && block.c();
	}

	function mount_component(component, target, anchor, customElement) {
	  const {
	    fragment,
	    on_mount,
	    on_destroy,
	    after_update
	  } = component.$$;
	  fragment && fragment.m(target, anchor);

	  if (!customElement) {
	    // onMount happens before the initial afterUpdate
	    add_render_callback(() => {
	      const new_on_destroy = on_mount.map(run).filter(is_function);

	      if (on_destroy) {
	        on_destroy.push(...new_on_destroy);
	      } else {
	        // Edge case - component was destroyed immediately,
	        // most likely as a result of a binding initialising
	        run_all(new_on_destroy);
	      }

	      component.$$.on_mount = [];
	    });
	  }

	  after_update.forEach(add_render_callback);
	}

	function destroy_component(component, detaching) {
	  const $$ = component.$$;

	  if ($$.fragment !== null) {
	    run_all($$.on_destroy);
	    $$.fragment && $$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
	    // preserve final state?)

	    $$.on_destroy = $$.fragment = null;
	    $$.ctx = [];
	  }
	}

	function make_dirty(component, i) {
	  if (component.$$.dirty[0] === -1) {
	    dirty_components.push(component);
	    schedule_update();
	    component.$$.dirty.fill(0);
	  }

	  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
	}

	function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty) {
	  if (dirty === void 0) {
	    dirty = [-1];
	  }

	  const parent_component = current_component;
	  set_current_component(component);
	  const $$ = component.$$ = {
	    fragment: null,
	    ctx: null,
	    // state
	    props,
	    update: noop,
	    not_equal,
	    bound: blank_object(),
	    // lifecycle
	    on_mount: [],
	    on_destroy: [],
	    on_disconnect: [],
	    before_update: [],
	    after_update: [],
	    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
	    // everything else
	    callbacks: blank_object(),
	    dirty,
	    skip_bound: false,
	    root: options.target || parent_component.$$.root
	  };
	  append_styles && append_styles($$.root);
	  let ready = false;
	  $$.ctx = instance ? instance(component, options.props || {}, function (i, ret) {
	    const value = (arguments.length <= 2 ? 0 : arguments.length - 2) ? arguments.length <= 2 ? undefined : arguments[2] : ret;

	    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
	      if (ready) make_dirty(component, i);
	    }

	    return ret;
	  }) : [];
	  $$.update();
	  ready = true;
	  run_all($$.before_update); // `false` as a special case of no DOM component

	  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;

	  if (options.target) {
	    if (options.hydrate) {
	      const nodes = children(options.target); // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

	      $$.fragment && $$.fragment.l(nodes);
	      nodes.forEach(detach);
	    } else {
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	      $$.fragment && $$.fragment.c();
	    }

	    if (options.intro) transition_in(component.$$.fragment);
	    mount_component(component, options.target, options.anchor, options.customElement);
	    flush();
	  }

	  set_current_component(parent_component);
	}
	/**
	 * Base class for Svelte components. Used when dev=false.
	 */


	class SvelteComponent {
	  $destroy() {
	    destroy_component(this, 1);
	    this.$destroy = noop;
	  }

	  $on(type, callback) {
	    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
	    callbacks.push(callback);
	    return () => {
	      const index = callbacks.indexOf(callback);
	      if (index !== -1) callbacks.splice(index, 1);
	    };
	  }

	  $set($$props) {
	    if (this.$$set && !is_empty($$props)) {
	      this.$$.skip_bound = true;
	      this.$$set($$props);
	      this.$$.skip_bound = false;
	    }
	  }

	}

	/* src/js/components/shepherd-button.svelte generated by Svelte v3.49.0 */

	function create_fragment$8(ctx) {
	  let button;
	  let button_aria_label_value;
	  let button_class_value;
	  let mounted;
	  let dispose;
	  return {
	    c() {
	      button = element("button");
	      attr(button, "aria-label", button_aria_label_value =
	      /*label*/
	      ctx[3] ?
	      /*label*/
	      ctx[3] : null);
	      attr(button, "class", button_class_value = `${
      /*classes*/
      ctx[1] || ''} shepherd-button ${
      /*secondary*/
      ctx[4] ? 'shepherd-button-secondary' : ''}`);
	      button.disabled =
	      /*disabled*/
	      ctx[2];
	      attr(button, "tabindex", "0");
	    },

	    m(target, anchor) {
	      insert(target, button, anchor);
	      button.innerHTML =
	      /*text*/
	      ctx[5];

	      if (!mounted) {
	        dispose = listen(button, "click", function () {
	          if (is_function(
	          /*action*/
	          ctx[0]))
	            /*action*/
	            ctx[0].apply(this, arguments);
	        });
	        mounted = true;
	      }
	    },

	    p(new_ctx, _ref) {
	      let [dirty] = _ref;
	      ctx = new_ctx;
	      if (dirty &
	      /*text*/
	      32) button.innerHTML =
	      /*text*/
	      ctx[5];

	      if (dirty &
	      /*label*/
	      8 && button_aria_label_value !== (button_aria_label_value =
	      /*label*/
	      ctx[3] ?
	      /*label*/
	      ctx[3] : null)) {
	        attr(button, "aria-label", button_aria_label_value);
	      }

	      if (dirty &
	      /*classes, secondary*/
	      18 && button_class_value !== (button_class_value = `${
      /*classes*/
      ctx[1] || ''} shepherd-button ${
      /*secondary*/
      ctx[4] ? 'shepherd-button-secondary' : ''}`)) {
	        attr(button, "class", button_class_value);
	      }

	      if (dirty &
	      /*disabled*/
	      4) {
	        button.disabled =
	        /*disabled*/
	        ctx[2];
	      }
	    },

	    i: noop,
	    o: noop,

	    d(detaching) {
	      if (detaching) detach(button);
	      mounted = false;
	      dispose();
	    }

	  };
	}

	function instance$8($$self, $$props, $$invalidate) {
	  let {
	    config,
	    step
	  } = $$props;
	  let action, classes, disabled, label, secondary, text;

	  function getConfigOption(option) {
	    if (isFunction(option)) {
	      return option = option.call(step);
	    }

	    return option;
	  }

	  $$self.$$set = $$props => {
	    if ('config' in $$props) $$invalidate(6, config = $$props.config);
	    if ('step' in $$props) $$invalidate(7, step = $$props.step);
	  };

	  $$self.$$.update = () => {
	    if ($$self.$$.dirty &
	    /*config, step*/
	    192) {
	      {
	        $$invalidate(0, action = config.action ? config.action.bind(step.tour) : null);
	        $$invalidate(1, classes = config.classes);
	        $$invalidate(2, disabled = config.disabled ? getConfigOption(config.disabled) : false);
	        $$invalidate(3, label = config.label ? getConfigOption(config.label) : null);
	        $$invalidate(4, secondary = config.secondary);
	        $$invalidate(5, text = config.text ? getConfigOption(config.text) : null);
	      }
	    }
	  };

	  return [action, classes, disabled, label, secondary, text, config, step];
	}

	class Shepherd_button extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$8, create_fragment$8, safe_not_equal, {
	      config: 6,
	      step: 7
	    });
	  }

	}

	/* src/js/components/shepherd-footer.svelte generated by Svelte v3.49.0 */

	function get_each_context(ctx, list, i) {
	  const child_ctx = ctx.slice();
	  child_ctx[2] = list[i];
	  return child_ctx;
	} // (24:4) {#if buttons}


	function create_if_block$3(ctx) {
	  let each_1_anchor;
	  let current;
	  let each_value =
	  /*buttons*/
	  ctx[1];
	  let each_blocks = [];

	  for (let i = 0; i < each_value.length; i += 1) {
	    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	  }

	  const out = i => transition_out(each_blocks[i], 1, 1, () => {
	    each_blocks[i] = null;
	  });

	  return {
	    c() {
	      for (let i = 0; i < each_blocks.length; i += 1) {
	        each_blocks[i].c();
	      }

	      each_1_anchor = empty();
	    },

	    m(target, anchor) {
	      for (let i = 0; i < each_blocks.length; i += 1) {
	        each_blocks[i].m(target, anchor);
	      }

	      insert(target, each_1_anchor, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      if (dirty &
	      /*buttons, step*/
	      3) {
	        each_value =
	        /*buttons*/
	        ctx[1];
	        let i;

	        for (i = 0; i < each_value.length; i += 1) {
	          const child_ctx = get_each_context(ctx, each_value, i);

	          if (each_blocks[i]) {
	            each_blocks[i].p(child_ctx, dirty);
	            transition_in(each_blocks[i], 1);
	          } else {
	            each_blocks[i] = create_each_block(child_ctx);
	            each_blocks[i].c();
	            transition_in(each_blocks[i], 1);
	            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
	          }
	        }

	        group_outros();

	        for (i = each_value.length; i < each_blocks.length; i += 1) {
	          out(i);
	        }

	        check_outros();
	      }
	    },

	    i(local) {
	      if (current) return;

	      for (let i = 0; i < each_value.length; i += 1) {
	        transition_in(each_blocks[i]);
	      }

	      current = true;
	    },

	    o(local) {
	      each_blocks = each_blocks.filter(Boolean);

	      for (let i = 0; i < each_blocks.length; i += 1) {
	        transition_out(each_blocks[i]);
	      }

	      current = false;
	    },

	    d(detaching) {
	      destroy_each(each_blocks, detaching);
	      if (detaching) detach(each_1_anchor);
	    }

	  };
	} // (25:8) {#each buttons as config}


	function create_each_block(ctx) {
	  let shepherdbutton;
	  let current;
	  shepherdbutton = new Shepherd_button({
	    props: {
	      config:
	      /*config*/
	      ctx[2],
	      step:
	      /*step*/
	      ctx[0]
	    }
	  });
	  return {
	    c() {
	      create_component(shepherdbutton.$$.fragment);
	    },

	    m(target, anchor) {
	      mount_component(shepherdbutton, target, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      const shepherdbutton_changes = {};
	      if (dirty &
	      /*buttons*/
	      2) shepherdbutton_changes.config =
	      /*config*/
	      ctx[2];
	      if (dirty &
	      /*step*/
	      1) shepherdbutton_changes.step =
	      /*step*/
	      ctx[0];
	      shepherdbutton.$set(shepherdbutton_changes);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdbutton.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdbutton.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      destroy_component(shepherdbutton, detaching);
	    }

	  };
	}

	function create_fragment$7(ctx) {
	  let footer;
	  let current;
	  let if_block =
	  /*buttons*/
	  ctx[1] && create_if_block$3(ctx);
	  return {
	    c() {
	      footer = element("footer");
	      if (if_block) if_block.c();
	      attr(footer, "class", "shepherd-footer");
	    },

	    m(target, anchor) {
	      insert(target, footer, anchor);
	      if (if_block) if_block.m(footer, null);
	      current = true;
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (
	      /*buttons*/
	      ctx[1]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);

	          if (dirty &
	          /*buttons*/
	          2) {
	            transition_in(if_block, 1);
	          }
	        } else {
	          if_block = create_if_block$3(ctx);
	          if_block.c();
	          transition_in(if_block, 1);
	          if_block.m(footer, null);
	        }
	      } else if (if_block) {
	        group_outros();
	        transition_out(if_block, 1, 1, () => {
	          if_block = null;
	        });
	        check_outros();
	      }
	    },

	    i(local) {
	      if (current) return;
	      transition_in(if_block);
	      current = true;
	    },

	    o(local) {
	      transition_out(if_block);
	      current = false;
	    },

	    d(detaching) {
	      if (detaching) detach(footer);
	      if (if_block) if_block.d();
	    }

	  };
	}

	function instance$7($$self, $$props, $$invalidate) {
	  let buttons;
	  let {
	    step
	  } = $$props;

	  $$self.$$set = $$props => {
	    if ('step' in $$props) $$invalidate(0, step = $$props.step);
	  };

	  $$self.$$.update = () => {
	    if ($$self.$$.dirty &
	    /*step*/
	    1) {
	      $$invalidate(1, buttons = step.options.buttons);
	    }
	  };

	  return [step, buttons];
	}

	class Shepherd_footer extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
	      step: 0
	    });
	  }

	}

	/* src/js/components/shepherd-cancel-icon.svelte generated by Svelte v3.49.0 */

	function create_fragment$6(ctx) {
	  let button;
	  let span;
	  let button_aria_label_value;
	  let mounted;
	  let dispose;
	  return {
	    c() {
	      button = element("button");
	      span = element("span");
	      span.textContent = "×";
	      attr(span, "aria-hidden", "true");
	      attr(button, "aria-label", button_aria_label_value =
	      /*cancelIcon*/
	      ctx[0].label ?
	      /*cancelIcon*/
	      ctx[0].label : 'Close Tour');
	      attr(button, "class", "shepherd-cancel-icon");
	      attr(button, "type", "button");
	    },

	    m(target, anchor) {
	      insert(target, button, anchor);
	      append(button, span);

	      if (!mounted) {
	        dispose = listen(button, "click",
	        /*handleCancelClick*/
	        ctx[1]);
	        mounted = true;
	      }
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (dirty &
	      /*cancelIcon*/
	      1 && button_aria_label_value !== (button_aria_label_value =
	      /*cancelIcon*/
	      ctx[0].label ?
	      /*cancelIcon*/
	      ctx[0].label : 'Close Tour')) {
	        attr(button, "aria-label", button_aria_label_value);
	      }
	    },

	    i: noop,
	    o: noop,

	    d(detaching) {
	      if (detaching) detach(button);
	      mounted = false;
	      dispose();
	    }

	  };
	}

	function instance$6($$self, $$props, $$invalidate) {
	  let {
	    cancelIcon,
	    step
	  } = $$props;
	  /**
	  * Add a click listener to the cancel link that cancels the tour
	  */

	  const handleCancelClick = e => {
	    e.preventDefault();
	    step.cancel();
	  };

	  $$self.$$set = $$props => {
	    if ('cancelIcon' in $$props) $$invalidate(0, cancelIcon = $$props.cancelIcon);
	    if ('step' in $$props) $$invalidate(2, step = $$props.step);
	  };

	  return [cancelIcon, handleCancelClick, step];
	}

	class Shepherd_cancel_icon extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
	      cancelIcon: 0,
	      step: 2
	    });
	  }

	}

	/* src/js/components/shepherd-title.svelte generated by Svelte v3.49.0 */

	function create_fragment$5(ctx) {
	  let h3;
	  return {
	    c() {
	      h3 = element("h3");
	      attr(h3, "id",
	      /*labelId*/
	      ctx[1]);
	      attr(h3, "class", "shepherd-title");
	    },

	    m(target, anchor) {
	      insert(target, h3, anchor);
	      /*h3_binding*/

	      ctx[3](h3);
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (dirty &
	      /*labelId*/
	      2) {
	        attr(h3, "id",
	        /*labelId*/
	        ctx[1]);
	      }
	    },

	    i: noop,
	    o: noop,

	    d(detaching) {
	      if (detaching) detach(h3);
	      /*h3_binding*/

	      ctx[3](null);
	    }

	  };
	}

	function instance$5($$self, $$props, $$invalidate) {
	  let {
	    labelId,
	    element,
	    title
	  } = $$props;
	  afterUpdate(() => {
	    if (isFunction(title)) {
	      $$invalidate(2, title = title());
	    }

	    $$invalidate(0, element.innerHTML = title, element);
	  });

	  function h3_binding($$value) {
	    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
	      element = $$value;
	      $$invalidate(0, element);
	    });
	  }

	  $$self.$$set = $$props => {
	    if ('labelId' in $$props) $$invalidate(1, labelId = $$props.labelId);
	    if ('element' in $$props) $$invalidate(0, element = $$props.element);
	    if ('title' in $$props) $$invalidate(2, title = $$props.title);
	  };

	  return [element, labelId, title, h3_binding];
	}

	class Shepherd_title extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$5, create_fragment$5, safe_not_equal, {
	      labelId: 1,
	      element: 0,
	      title: 2
	    });
	  }

	}

	/* src/js/components/shepherd-header.svelte generated by Svelte v3.49.0 */

	function create_if_block_1$1(ctx) {
	  let shepherdtitle;
	  let current;
	  shepherdtitle = new Shepherd_title({
	    props: {
	      labelId:
	      /*labelId*/
	      ctx[0],
	      title:
	      /*title*/
	      ctx[2]
	    }
	  });
	  return {
	    c() {
	      create_component(shepherdtitle.$$.fragment);
	    },

	    m(target, anchor) {
	      mount_component(shepherdtitle, target, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      const shepherdtitle_changes = {};
	      if (dirty &
	      /*labelId*/
	      1) shepherdtitle_changes.labelId =
	      /*labelId*/
	      ctx[0];
	      if (dirty &
	      /*title*/
	      4) shepherdtitle_changes.title =
	      /*title*/
	      ctx[2];
	      shepherdtitle.$set(shepherdtitle_changes);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdtitle.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdtitle.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      destroy_component(shepherdtitle, detaching);
	    }

	  };
	} // (39:4) {#if cancelIcon && cancelIcon.enabled}


	function create_if_block$2(ctx) {
	  let shepherdcancelicon;
	  let current;
	  shepherdcancelicon = new Shepherd_cancel_icon({
	    props: {
	      cancelIcon:
	      /*cancelIcon*/
	      ctx[3],
	      step:
	      /*step*/
	      ctx[1]
	    }
	  });
	  return {
	    c() {
	      create_component(shepherdcancelicon.$$.fragment);
	    },

	    m(target, anchor) {
	      mount_component(shepherdcancelicon, target, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      const shepherdcancelicon_changes = {};
	      if (dirty &
	      /*cancelIcon*/
	      8) shepherdcancelicon_changes.cancelIcon =
	      /*cancelIcon*/
	      ctx[3];
	      if (dirty &
	      /*step*/
	      2) shepherdcancelicon_changes.step =
	      /*step*/
	      ctx[1];
	      shepherdcancelicon.$set(shepherdcancelicon_changes);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdcancelicon.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdcancelicon.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      destroy_component(shepherdcancelicon, detaching);
	    }

	  };
	}

	function create_fragment$4(ctx) {
	  let header;
	  let t;
	  let current;
	  let if_block0 =
	  /*title*/
	  ctx[2] && create_if_block_1$1(ctx);
	  let if_block1 =
	  /*cancelIcon*/
	  ctx[3] &&
	  /*cancelIcon*/
	  ctx[3].enabled && create_if_block$2(ctx);
	  return {
	    c() {
	      header = element("header");
	      if (if_block0) if_block0.c();
	      t = space();
	      if (if_block1) if_block1.c();
	      attr(header, "class", "shepherd-header");
	    },

	    m(target, anchor) {
	      insert(target, header, anchor);
	      if (if_block0) if_block0.m(header, null);
	      append(header, t);
	      if (if_block1) if_block1.m(header, null);
	      current = true;
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (
	      /*title*/
	      ctx[2]) {
	        if (if_block0) {
	          if_block0.p(ctx, dirty);

	          if (dirty &
	          /*title*/
	          4) {
	            transition_in(if_block0, 1);
	          }
	        } else {
	          if_block0 = create_if_block_1$1(ctx);
	          if_block0.c();
	          transition_in(if_block0, 1);
	          if_block0.m(header, t);
	        }
	      } else if (if_block0) {
	        group_outros();
	        transition_out(if_block0, 1, 1, () => {
	          if_block0 = null;
	        });
	        check_outros();
	      }

	      if (
	      /*cancelIcon*/
	      ctx[3] &&
	      /*cancelIcon*/
	      ctx[3].enabled) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);

	          if (dirty &
	          /*cancelIcon*/
	          8) {
	            transition_in(if_block1, 1);
	          }
	        } else {
	          if_block1 = create_if_block$2(ctx);
	          if_block1.c();
	          transition_in(if_block1, 1);
	          if_block1.m(header, null);
	        }
	      } else if (if_block1) {
	        group_outros();
	        transition_out(if_block1, 1, 1, () => {
	          if_block1 = null;
	        });
	        check_outros();
	      }
	    },

	    i(local) {
	      if (current) return;
	      transition_in(if_block0);
	      transition_in(if_block1);
	      current = true;
	    },

	    o(local) {
	      transition_out(if_block0);
	      transition_out(if_block1);
	      current = false;
	    },

	    d(detaching) {
	      if (detaching) detach(header);
	      if (if_block0) if_block0.d();
	      if (if_block1) if_block1.d();
	    }

	  };
	}

	function instance$4($$self, $$props, $$invalidate) {
	  let {
	    labelId,
	    step
	  } = $$props;
	  let title, cancelIcon;

	  $$self.$$set = $$props => {
	    if ('labelId' in $$props) $$invalidate(0, labelId = $$props.labelId);
	    if ('step' in $$props) $$invalidate(1, step = $$props.step);
	  };

	  $$self.$$.update = () => {
	    if ($$self.$$.dirty &
	    /*step*/
	    2) {
	      {
	        $$invalidate(2, title = step.options.title);
	        $$invalidate(3, cancelIcon = step.options.cancelIcon);
	      }
	    }
	  };

	  return [labelId, step, title, cancelIcon];
	}

	class Shepherd_header extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$4, create_fragment$4, safe_not_equal, {
	      labelId: 0,
	      step: 1
	    });
	  }

	}

	/* src/js/components/shepherd-text.svelte generated by Svelte v3.49.0 */

	function create_fragment$3(ctx) {
	  let div;
	  return {
	    c() {
	      div = element("div");
	      attr(div, "class", "shepherd-text");
	      attr(div, "id",
	      /*descriptionId*/
	      ctx[1]);
	    },

	    m(target, anchor) {
	      insert(target, div, anchor);
	      /*div_binding*/

	      ctx[3](div);
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (dirty &
	      /*descriptionId*/
	      2) {
	        attr(div, "id",
	        /*descriptionId*/
	        ctx[1]);
	      }
	    },

	    i: noop,
	    o: noop,

	    d(detaching) {
	      if (detaching) detach(div);
	      /*div_binding*/

	      ctx[3](null);
	    }

	  };
	}

	function instance$3($$self, $$props, $$invalidate) {
	  let {
	    descriptionId,
	    element,
	    step
	  } = $$props;
	  afterUpdate(() => {
	    let {
	      text
	    } = step.options;

	    if (isFunction(text)) {
	      text = text.call(step);
	    }

	    if (isHTMLElement$1(text)) {
	      element.appendChild(text);
	    } else {
	      $$invalidate(0, element.innerHTML = text, element);
	    }
	  });

	  function div_binding($$value) {
	    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
	      element = $$value;
	      $$invalidate(0, element);
	    });
	  }

	  $$self.$$set = $$props => {
	    if ('descriptionId' in $$props) $$invalidate(1, descriptionId = $$props.descriptionId);
	    if ('element' in $$props) $$invalidate(0, element = $$props.element);
	    if ('step' in $$props) $$invalidate(2, step = $$props.step);
	  };

	  return [element, descriptionId, step, div_binding];
	}

	class Shepherd_text extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$3, create_fragment$3, safe_not_equal, {
	      descriptionId: 1,
	      element: 0,
	      step: 2
	    });
	  }

	}

	/* src/js/components/shepherd-content.svelte generated by Svelte v3.49.0 */

	function create_if_block_2(ctx) {
	  let shepherdheader;
	  let current;
	  shepherdheader = new Shepherd_header({
	    props: {
	      labelId:
	      /*labelId*/
	      ctx[1],
	      step:
	      /*step*/
	      ctx[2]
	    }
	  });
	  return {
	    c() {
	      create_component(shepherdheader.$$.fragment);
	    },

	    m(target, anchor) {
	      mount_component(shepherdheader, target, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      const shepherdheader_changes = {};
	      if (dirty &
	      /*labelId*/
	      2) shepherdheader_changes.labelId =
	      /*labelId*/
	      ctx[1];
	      if (dirty &
	      /*step*/
	      4) shepherdheader_changes.step =
	      /*step*/
	      ctx[2];
	      shepherdheader.$set(shepherdheader_changes);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdheader.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdheader.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      destroy_component(shepherdheader, detaching);
	    }

	  };
	} // (28:2) {#if !isUndefined(step.options.text)}


	function create_if_block_1(ctx) {
	  let shepherdtext;
	  let current;
	  shepherdtext = new Shepherd_text({
	    props: {
	      descriptionId:
	      /*descriptionId*/
	      ctx[0],
	      step:
	      /*step*/
	      ctx[2]
	    }
	  });
	  return {
	    c() {
	      create_component(shepherdtext.$$.fragment);
	    },

	    m(target, anchor) {
	      mount_component(shepherdtext, target, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      const shepherdtext_changes = {};
	      if (dirty &
	      /*descriptionId*/
	      1) shepherdtext_changes.descriptionId =
	      /*descriptionId*/
	      ctx[0];
	      if (dirty &
	      /*step*/
	      4) shepherdtext_changes.step =
	      /*step*/
	      ctx[2];
	      shepherdtext.$set(shepherdtext_changes);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdtext.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdtext.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      destroy_component(shepherdtext, detaching);
	    }

	  };
	} // (35:2) {#if Array.isArray(step.options.buttons) && step.options.buttons.length}


	function create_if_block$1(ctx) {
	  let shepherdfooter;
	  let current;
	  shepherdfooter = new Shepherd_footer({
	    props: {
	      step:
	      /*step*/
	      ctx[2]
	    }
	  });
	  return {
	    c() {
	      create_component(shepherdfooter.$$.fragment);
	    },

	    m(target, anchor) {
	      mount_component(shepherdfooter, target, anchor);
	      current = true;
	    },

	    p(ctx, dirty) {
	      const shepherdfooter_changes = {};
	      if (dirty &
	      /*step*/
	      4) shepherdfooter_changes.step =
	      /*step*/
	      ctx[2];
	      shepherdfooter.$set(shepherdfooter_changes);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdfooter.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdfooter.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      destroy_component(shepherdfooter, detaching);
	    }

	  };
	}

	function create_fragment$2(ctx) {
	  let div;
	  let show_if_2 = !isUndefined(
	  /*step*/
	  ctx[2].options.title) ||
	  /*step*/
	  ctx[2].options.cancelIcon &&
	  /*step*/
	  ctx[2].options.cancelIcon.enabled;
	  let t0;
	  let show_if_1 = !isUndefined(
	  /*step*/
	  ctx[2].options.text);
	  let t1;
	  let show_if = Array.isArray(
	  /*step*/
	  ctx[2].options.buttons) &&
	  /*step*/
	  ctx[2].options.buttons.length;
	  let current;
	  let if_block0 = show_if_2 && create_if_block_2(ctx);
	  let if_block1 = show_if_1 && create_if_block_1(ctx);
	  let if_block2 = show_if && create_if_block$1(ctx);
	  return {
	    c() {
	      div = element("div");
	      if (if_block0) if_block0.c();
	      t0 = space();
	      if (if_block1) if_block1.c();
	      t1 = space();
	      if (if_block2) if_block2.c();
	      attr(div, "class", "shepherd-content");
	    },

	    m(target, anchor) {
	      insert(target, div, anchor);
	      if (if_block0) if_block0.m(div, null);
	      append(div, t0);
	      if (if_block1) if_block1.m(div, null);
	      append(div, t1);
	      if (if_block2) if_block2.m(div, null);
	      current = true;
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;
	      if (dirty &
	      /*step*/
	      4) show_if_2 = !isUndefined(
	      /*step*/
	      ctx[2].options.title) ||
	      /*step*/
	      ctx[2].options.cancelIcon &&
	      /*step*/
	      ctx[2].options.cancelIcon.enabled;

	      if (show_if_2) {
	        if (if_block0) {
	          if_block0.p(ctx, dirty);

	          if (dirty &
	          /*step*/
	          4) {
	            transition_in(if_block0, 1);
	          }
	        } else {
	          if_block0 = create_if_block_2(ctx);
	          if_block0.c();
	          transition_in(if_block0, 1);
	          if_block0.m(div, t0);
	        }
	      } else if (if_block0) {
	        group_outros();
	        transition_out(if_block0, 1, 1, () => {
	          if_block0 = null;
	        });
	        check_outros();
	      }

	      if (dirty &
	      /*step*/
	      4) show_if_1 = !isUndefined(
	      /*step*/
	      ctx[2].options.text);

	      if (show_if_1) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);

	          if (dirty &
	          /*step*/
	          4) {
	            transition_in(if_block1, 1);
	          }
	        } else {
	          if_block1 = create_if_block_1(ctx);
	          if_block1.c();
	          transition_in(if_block1, 1);
	          if_block1.m(div, t1);
	        }
	      } else if (if_block1) {
	        group_outros();
	        transition_out(if_block1, 1, 1, () => {
	          if_block1 = null;
	        });
	        check_outros();
	      }

	      if (dirty &
	      /*step*/
	      4) show_if = Array.isArray(
	      /*step*/
	      ctx[2].options.buttons) &&
	      /*step*/
	      ctx[2].options.buttons.length;

	      if (show_if) {
	        if (if_block2) {
	          if_block2.p(ctx, dirty);

	          if (dirty &
	          /*step*/
	          4) {
	            transition_in(if_block2, 1);
	          }
	        } else {
	          if_block2 = create_if_block$1(ctx);
	          if_block2.c();
	          transition_in(if_block2, 1);
	          if_block2.m(div, null);
	        }
	      } else if (if_block2) {
	        group_outros();
	        transition_out(if_block2, 1, 1, () => {
	          if_block2 = null;
	        });
	        check_outros();
	      }
	    },

	    i(local) {
	      if (current) return;
	      transition_in(if_block0);
	      transition_in(if_block1);
	      transition_in(if_block2);
	      current = true;
	    },

	    o(local) {
	      transition_out(if_block0);
	      transition_out(if_block1);
	      transition_out(if_block2);
	      current = false;
	    },

	    d(detaching) {
	      if (detaching) detach(div);
	      if (if_block0) if_block0.d();
	      if (if_block1) if_block1.d();
	      if (if_block2) if_block2.d();
	    }

	  };
	}

	function instance$2($$self, $$props, $$invalidate) {
	  let {
	    descriptionId,
	    labelId,
	    step
	  } = $$props;

	  $$self.$$set = $$props => {
	    if ('descriptionId' in $$props) $$invalidate(0, descriptionId = $$props.descriptionId);
	    if ('labelId' in $$props) $$invalidate(1, labelId = $$props.labelId);
	    if ('step' in $$props) $$invalidate(2, step = $$props.step);
	  };

	  return [descriptionId, labelId, step];
	}

	class Shepherd_content extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$2, create_fragment$2, safe_not_equal, {
	      descriptionId: 0,
	      labelId: 1,
	      step: 2
	    });
	  }

	}

	/* src/js/components/shepherd-element.svelte generated by Svelte v3.49.0 */

	function create_if_block(ctx) {
	  let div;
	  return {
	    c() {
	      div = element("div");
	      attr(div, "class", "shepherd-arrow");
	      attr(div, "data-popper-arrow", "");
	    },

	    m(target, anchor) {
	      insert(target, div, anchor);
	    },

	    d(detaching) {
	      if (detaching) detach(div);
	    }

	  };
	}

	function create_fragment$1(ctx) {
	  let div;
	  let t;
	  let shepherdcontent;
	  let div_aria_describedby_value;
	  let div_aria_labelledby_value;
	  let current;
	  let mounted;
	  let dispose;
	  let if_block =
	  /*step*/
	  ctx[4].options.arrow &&
	  /*step*/
	  ctx[4].options.attachTo &&
	  /*step*/
	  ctx[4].options.attachTo.element &&
	  /*step*/
	  ctx[4].options.attachTo.on && create_if_block();
	  shepherdcontent = new Shepherd_content({
	    props: {
	      descriptionId:
	      /*descriptionId*/
	      ctx[2],
	      labelId:
	      /*labelId*/
	      ctx[3],
	      step:
	      /*step*/
	      ctx[4]
	    }
	  });
	  let div_levels = [{
	    "aria-describedby": div_aria_describedby_value = !isUndefined(
	    /*step*/
	    ctx[4].options.text) ?
	    /*descriptionId*/
	    ctx[2] : null
	  }, {
	    "aria-labelledby": div_aria_labelledby_value =
	    /*step*/
	    ctx[4].options.title ?
	    /*labelId*/
	    ctx[3] : null
	  },
	  /*dataStepId*/
	  ctx[1], {
	    role: "dialog"
	  }, {
	    tabindex: "0"
	  }];
	  let div_data = {};

	  for (let i = 0; i < div_levels.length; i += 1) {
	    div_data = assign(div_data, div_levels[i]);
	  }

	  return {
	    c() {
	      div = element("div");
	      if (if_block) if_block.c();
	      t = space();
	      create_component(shepherdcontent.$$.fragment);
	      set_attributes(div, div_data);
	      toggle_class(div, "shepherd-has-cancel-icon",
	      /*hasCancelIcon*/
	      ctx[5]);
	      toggle_class(div, "shepherd-has-title",
	      /*hasTitle*/
	      ctx[6]);
	      toggle_class(div, "shepherd-element", true);
	    },

	    m(target, anchor) {
	      insert(target, div, anchor);
	      if (if_block) if_block.m(div, null);
	      append(div, t);
	      mount_component(shepherdcontent, div, null);
	      /*div_binding*/

	      ctx[13](div);
	      current = true;

	      if (!mounted) {
	        dispose = listen(div, "keydown",
	        /*handleKeyDown*/
	        ctx[7]);
	        mounted = true;
	      }
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (
	      /*step*/
	      ctx[4].options.arrow &&
	      /*step*/
	      ctx[4].options.attachTo &&
	      /*step*/
	      ctx[4].options.attachTo.element &&
	      /*step*/
	      ctx[4].options.attachTo.on) {
	        if (if_block) ; else {
	          if_block = create_if_block();
	          if_block.c();
	          if_block.m(div, t);
	        }
	      } else if (if_block) {
	        if_block.d(1);
	        if_block = null;
	      }

	      const shepherdcontent_changes = {};
	      if (dirty &
	      /*descriptionId*/
	      4) shepherdcontent_changes.descriptionId =
	      /*descriptionId*/
	      ctx[2];
	      if (dirty &
	      /*labelId*/
	      8) shepherdcontent_changes.labelId =
	      /*labelId*/
	      ctx[3];
	      if (dirty &
	      /*step*/
	      16) shepherdcontent_changes.step =
	      /*step*/
	      ctx[4];
	      shepherdcontent.$set(shepherdcontent_changes);
	      set_attributes(div, div_data = get_spread_update(div_levels, [(!current || dirty &
	      /*step, descriptionId*/
	      20 && div_aria_describedby_value !== (div_aria_describedby_value = !isUndefined(
	      /*step*/
	      ctx[4].options.text) ?
	      /*descriptionId*/
	      ctx[2] : null)) && {
	        "aria-describedby": div_aria_describedby_value
	      }, (!current || dirty &
	      /*step, labelId*/
	      24 && div_aria_labelledby_value !== (div_aria_labelledby_value =
	      /*step*/
	      ctx[4].options.title ?
	      /*labelId*/
	      ctx[3] : null)) && {
	        "aria-labelledby": div_aria_labelledby_value
	      }, dirty &
	      /*dataStepId*/
	      2 &&
	      /*dataStepId*/
	      ctx[1], {
	        role: "dialog"
	      }, {
	        tabindex: "0"
	      }]));
	      toggle_class(div, "shepherd-has-cancel-icon",
	      /*hasCancelIcon*/
	      ctx[5]);
	      toggle_class(div, "shepherd-has-title",
	      /*hasTitle*/
	      ctx[6]);
	      toggle_class(div, "shepherd-element", true);
	    },

	    i(local) {
	      if (current) return;
	      transition_in(shepherdcontent.$$.fragment, local);
	      current = true;
	    },

	    o(local) {
	      transition_out(shepherdcontent.$$.fragment, local);
	      current = false;
	    },

	    d(detaching) {
	      if (detaching) detach(div);
	      if (if_block) if_block.d();
	      destroy_component(shepherdcontent);
	      /*div_binding*/

	      ctx[13](null);
	      mounted = false;
	      dispose();
	    }

	  };
	}

	const KEY_TAB = 9;
	const KEY_ESC = 27;
	const LEFT_ARROW = 37;
	const RIGHT_ARROW = 39;

	function getClassesArray(classes) {
	  return classes.split(' ').filter(className => !!className.length);
	}

	function instance$1($$self, $$props, $$invalidate) {
	  let {
	    classPrefix,
	    element,
	    descriptionId,
	    firstFocusableElement,
	    focusableElements,
	    labelId,
	    lastFocusableElement,
	    step,
	    dataStepId
	  } = $$props;
	  let hasCancelIcon, hasTitle, classes;

	  const getElement = () => element;

	  onMount(() => {
	    // Get all elements that are focusable
	    $$invalidate(1, dataStepId = {
	      [`data-${classPrefix}shepherd-step-id`]: step.id
	    });
	    $$invalidate(9, focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
	    $$invalidate(8, firstFocusableElement = focusableElements[0]);
	    $$invalidate(10, lastFocusableElement = focusableElements[focusableElements.length - 1]);
	  });
	  afterUpdate(() => {
	    if (classes !== step.options.classes) {
	      updateDynamicClasses();
	    }
	  });

	  function updateDynamicClasses() {
	    removeClasses(classes);
	    classes = step.options.classes;
	    addClasses(classes);
	  }

	  function removeClasses(classes) {
	    if (isString(classes)) {
	      const oldClasses = getClassesArray(classes);

	      if (oldClasses.length) {
	        element.classList.remove(...oldClasses);
	      }
	    }
	  }

	  function addClasses(classes) {
	    if (isString(classes)) {
	      const newClasses = getClassesArray(classes);

	      if (newClasses.length) {
	        element.classList.add(...newClasses);
	      }
	    }
	  }
	  /**
	  * Setup keydown events to allow closing the modal with ESC
	  *
	  * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
	  *
	  * @private
	  */


	  const handleKeyDown = e => {
	    const {
	      tour
	    } = step;

	    switch (e.keyCode) {
	      case KEY_TAB:
	        if (focusableElements.length === 0) {
	          e.preventDefault();
	          break;
	        } // Backward tab


	        if (e.shiftKey) {
	          if (document.activeElement === firstFocusableElement || document.activeElement.classList.contains('shepherd-element')) {
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
	        if (tour.options.exitOnEsc) {
	          step.cancel();
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
	    }
	  };

	  function div_binding($$value) {
	    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
	      element = $$value;
	      $$invalidate(0, element);
	    });
	  }

	  $$self.$$set = $$props => {
	    if ('classPrefix' in $$props) $$invalidate(11, classPrefix = $$props.classPrefix);
	    if ('element' in $$props) $$invalidate(0, element = $$props.element);
	    if ('descriptionId' in $$props) $$invalidate(2, descriptionId = $$props.descriptionId);
	    if ('firstFocusableElement' in $$props) $$invalidate(8, firstFocusableElement = $$props.firstFocusableElement);
	    if ('focusableElements' in $$props) $$invalidate(9, focusableElements = $$props.focusableElements);
	    if ('labelId' in $$props) $$invalidate(3, labelId = $$props.labelId);
	    if ('lastFocusableElement' in $$props) $$invalidate(10, lastFocusableElement = $$props.lastFocusableElement);
	    if ('step' in $$props) $$invalidate(4, step = $$props.step);
	    if ('dataStepId' in $$props) $$invalidate(1, dataStepId = $$props.dataStepId);
	  };

	  $$self.$$.update = () => {
	    if ($$self.$$.dirty &
	    /*step*/
	    16) {
	      {
	        $$invalidate(5, hasCancelIcon = step.options && step.options.cancelIcon && step.options.cancelIcon.enabled);
	        $$invalidate(6, hasTitle = step.options && step.options.title);
	      }
	    }
	  };

	  return [element, dataStepId, descriptionId, labelId, step, hasCancelIcon, hasTitle, handleKeyDown, firstFocusableElement, focusableElements, lastFocusableElement, classPrefix, getElement, div_binding];
	}

	class Shepherd_element extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance$1, create_fragment$1, safe_not_equal, {
	      classPrefix: 11,
	      element: 0,
	      descriptionId: 2,
	      firstFocusableElement: 8,
	      focusableElements: 9,
	      labelId: 3,
	      lastFocusableElement: 10,
	      step: 4,
	      dataStepId: 1,
	      getElement: 12
	    });
	  }

	  get getElement() {
	    return this.$$.ctx[12];
	  }

	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var smoothscroll = createCommonjsModule(function (module, exports) {
	  /* smoothscroll v0.4.4 - 2019 - Dustan Kasten, Jeremias Menichelli - MIT License */
	  (function () {

	    function polyfill() {
	      // aliases
	      var w = window;
	      var d = document; // return if scroll behavior is supported and polyfill is not forced

	      if ('scrollBehavior' in d.documentElement.style && w.__forceSmoothScrollPolyfill__ !== true) {
	        return;
	      } // globals


	      var Element = w.HTMLElement || w.Element;
	      var SCROLL_TIME = 468; // object gathering original scroll methods

	      var original = {
	        scroll: w.scroll || w.scrollTo,
	        scrollBy: w.scrollBy,
	        elementScroll: Element.prototype.scroll || scrollElement,
	        scrollIntoView: Element.prototype.scrollIntoView
	      }; // define timing method

	      var now = w.performance && w.performance.now ? w.performance.now.bind(w.performance) : Date.now;
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
	        if (firstArg === null || typeof firstArg !== 'object' || firstArg.behavior === undefined || firstArg.behavior === 'auto' || firstArg.behavior === 'instant') {
	          // first argument is not an object/null
	          // or behavior is auto, instant or undefined
	          return true;
	        }

	        if (typeof firstArg === 'object' && firstArg.behavior === 'smooth') {
	          // first argument is an object and behavior is smooth
	          return false;
	        } // throw error when behavior is not supported


	        throw new TypeError('behavior member of ScrollOptions ' + firstArg.behavior + ' is not a valid value for enumeration ScrollBehavior.');
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
	        var elapsed = (time - context.startTime) / SCROLL_TIME; // avoid elapsed times higher than one

	        elapsed = elapsed > 1 ? 1 : elapsed; // apply easing to elapsed time

	        value = ease(elapsed);
	        currentX = context.startX + (context.x - context.startX) * value;
	        currentY = context.startY + (context.y - context.startY) * value;
	        context.method.call(context.scrollable, currentX, currentY); // scroll more if we have not reached our destination

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
	        var startTime = now(); // define scroll context

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
	        } // scroll looping over a frame


	        step({
	          scrollable: scrollable,
	          method: method,
	          startTime: startTime,
	          startX: startX,
	          startY: startY,
	          x: x,
	          y: y
	        });
	      } // ORIGINAL METHODS OVERRIDES
	      // w.scroll and w.scrollTo


	      w.scroll = w.scrollTo = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0]) === true) {
	          original.scroll.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== 'object' ? arguments[0] : w.scrollX || w.pageXOffset, // use top prop, second argument if present or fallback to scrollY
	          arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : w.scrollY || w.pageYOffset);
	          return;
	        } // LET THE SMOOTHNESS BEGIN!


	        smoothScroll.call(w, d.body, arguments[0].left !== undefined ? ~~arguments[0].left : w.scrollX || w.pageXOffset, arguments[0].top !== undefined ? ~~arguments[0].top : w.scrollY || w.pageYOffset);
	      }; // w.scrollBy


	      w.scrollBy = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0])) {
	          original.scrollBy.call(w, arguments[0].left !== undefined ? arguments[0].left : typeof arguments[0] !== 'object' ? arguments[0] : 0, arguments[0].top !== undefined ? arguments[0].top : arguments[1] !== undefined ? arguments[1] : 0);
	          return;
	        } // LET THE SMOOTHNESS BEGIN!


	        smoothScroll.call(w, d.body, ~~arguments[0].left + (w.scrollX || w.pageXOffset), ~~arguments[0].top + (w.scrollY || w.pageYOffset));
	      }; // Element.prototype.scroll and Element.prototype.scrollTo


	      Element.prototype.scroll = Element.prototype.scrollTo = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0]) === true) {
	          // if one number is passed, throw error to match Firefox implementation
	          if (typeof arguments[0] === 'number' && arguments[1] === undefined) {
	            throw new SyntaxError('Value could not be converted');
	          }

	          original.elementScroll.call(this, // use left prop, first number argument or fallback to scrollLeft
	          arguments[0].left !== undefined ? ~~arguments[0].left : typeof arguments[0] !== 'object' ? ~~arguments[0] : this.scrollLeft, // use top prop, second argument or fallback to scrollTop
	          arguments[0].top !== undefined ? ~~arguments[0].top : arguments[1] !== undefined ? ~~arguments[1] : this.scrollTop);
	          return;
	        }

	        var left = arguments[0].left;
	        var top = arguments[0].top; // LET THE SMOOTHNESS BEGIN!

	        smoothScroll.call(this, this, typeof left === 'undefined' ? this.scrollLeft : ~~left, typeof top === 'undefined' ? this.scrollTop : ~~top);
	      }; // Element.prototype.scrollBy


	      Element.prototype.scrollBy = function () {
	        // avoid action when no arguments are passed
	        if (arguments[0] === undefined) {
	          return;
	        } // avoid smooth behavior if not required


	        if (shouldBailOut(arguments[0]) === true) {
	          original.elementScroll.call(this, arguments[0].left !== undefined ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, arguments[0].top !== undefined ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop);
	          return;
	        }

	        this.scroll({
	          left: ~~arguments[0].left + this.scrollLeft,
	          top: ~~arguments[0].top + this.scrollTop,
	          behavior: arguments[0].behavior
	        });
	      }; // Element.prototype.scrollIntoView


	      Element.prototype.scrollIntoView = function () {
	        // avoid smooth behavior if not required
	        if (shouldBailOut(arguments[0]) === true) {
	          original.scrollIntoView.call(this, arguments[0] === undefined ? true : arguments[0]);
	          return;
	        } // LET THE SMOOTHNESS BEGIN!


	        var scrollableParent = findScrollableParent(this);
	        var parentRects = scrollableParent.getBoundingClientRect();
	        var clientRects = this.getBoundingClientRect();

	        if (scrollableParent !== d.body) {
	          // reveal element inside parent
	          smoothScroll.call(this, scrollableParent, scrollableParent.scrollLeft + clientRects.left - parentRects.left, scrollableParent.scrollTop + clientRects.top - parentRects.top); // reveal parent in viewport unless is fixed

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
	      module.exports = {
	        polyfill: polyfill
	      };
	    }
	  })();
	});
	smoothscroll.polyfill;

	smoothscroll.polyfill();
	/**
	 * A class representing steps to be added to a tour.
	 * @extends {Evented}
	 */

	class Step extends Evented {
	  /**
	   * Create a step
	   * @param {Tour} tour The tour for the step
	   * @param {object} options The options for the step
	   * @param {boolean} options.arrow Whether to display the arrow for the tooltip or not. Defaults to `true`.
	   * @param {object} options.attachTo The element the step should be attached to on the page.
	   * An object with properties `element` and `on`.
	   *
	   * ```js
	   * const step = new Step(tour, {
	   *   attachTo: { element: '.some .selector-path', on: 'left' },
	   *   ...moreOptions
	   * });
	   * ```
	   *
	   * If you don’t specify an `attachTo` the element will appear in the middle of the screen. The same will happen if your `attachTo.element` callback returns `null`, `undefined`, or a selector that does not exist in the DOM.
	   * If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
	   * in the middle of the screen, without an arrow pointing to the target.
	   * If the element to highlight does not yet exist while instantiating tour steps, you may use lazy evaluation by supplying a function to `attachTo.element`. The function will be called in the `before-show` phase.
	   * @param {string|HTMLElement|function} options.attachTo.element An element selector string, DOM element, or a function (returning a selector, a DOM element, `null` or `undefined`).
	   * @param {string} options.attachTo.on The optional direction to place the Popper tooltip relative to the element.
	   *   - Possible string values: 'auto', 'auto-start', 'auto-end', 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'
	   * @param {Object} options.advanceOn An action on the page which should advance shepherd to the next step.
	   * It should be an object with a string `selector` and an `event` name
	   * ```js
	   * const step = new Step(tour, {
	   *   advanceOn: { selector: '.some .selector-path', event: 'click' },
	   *   ...moreOptions
	   * });
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
	   * @param {boolean} options.buttons.button.disabled Should the button be disabled?
	   * @param {string} options.buttons.button.label The aria-label text of the button
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
	   * @param {number} options.modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
	   * @param {number} options.modalOverlayOpeningRadius An amount of border radius to add around the modal overlay opening
	   * @param {object} options.popperOptions Extra options to pass to Popper
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
	   * @param {string} options.title The step's title. It becomes an `h3` at the top of the step. It can be one of two types:
	   * ```
	   * - HTML string
	   * - `Function` to be executed when the step is built. It must return HTML string.
	   * ```
	   * @param {object} options.when You can define `show`, `hide`, etc events inside `when`. For example:
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
	    if (options === void 0) {
	      options = {};
	    }

	    super(tour, options);
	    this.tour = tour;
	    this.classPrefix = this.tour.options ? normalizePrefix(this.tour.options.classPrefix) : '';
	    this.styles = tour.styles;
	    /**
	     * Resolved attachTo options. Due to lazy evaluation, we only resolve the options during `before-show` phase.
	     * Do not use this directly, use the _getResolvedAttachToOptions method instead.
	     * @type {null|{}|{element, to}}
	     * @private
	     */

	    this._resolvedAttachTo = null;
	    autoBind(this);

	    this._setOptions(options);

	    return this;
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
	   * Remove the step, delete the step's element, and destroy the Popper instance for the step.
	   * Triggers `destroy` event
	   */


	  destroy() {
	    if (this.tooltip) {
	      this.tooltip.destroy();
	      this.tooltip = null;
	    }

	    if (isHTMLElement$1(this.el) && this.el.parentNode) {
	      this.el.parentNode.removeChild(this.el);
	      this.el = null;
	    }

	    this._updateStepTargetOnHide();

	    this.trigger('destroy');
	  }
	  /**
	   * Returns the tour for the step
	   * @return {Tour} The tour instance
	   */


	  getTour() {
	    return this.tour;
	  }
	  /**
	   * Hide the step
	   */


	  hide() {
	    this.tour.modal.hide();
	    this.trigger('before-hide');

	    if (this.el) {
	      this.el.hidden = true;
	    }

	    this._updateStepTargetOnHide();

	    this.trigger('hide');
	  }
	  /**
	   * Resolves attachTo options.
	   * @returns {{}|{element, on}}
	   * @private
	   */


	  _resolveAttachToOptions() {
	    this._resolvedAttachTo = parseAttachTo(this);
	    return this._resolvedAttachTo;
	  }
	  /**
	   * A selector for resolved attachTo options.
	   * @returns {{}|{element, on}}
	   * @private
	   */


	  _getResolvedAttachToOptions() {
	    if (this._resolvedAttachTo === null) {
	      return this._resolveAttachToOptions();
	    }

	    return this._resolvedAttachTo;
	  }
	  /**
	   * Check if the step is open and visible
	   * @return {boolean} True if the step is open and visible
	   */


	  isOpen() {
	    return Boolean(this.el && !this.el.hidden);
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
	   * Updates the options of the step.
	   *
	   * @param {Object} options The options for the step
	   */


	  updateStepOptions(options) {
	    Object.assign(this.options, options);

	    if (this.shepherdElementComponent) {
	      this.shepherdElementComponent.$set({
	        step: this
	      });
	    }
	  }
	  /**
	   * Returns the element for the step
	   * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
	   */


	  getElement() {
	    return this.el;
	  }
	  /**
	   * Returns the target for the step
	   * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if query string has not been found
	   */


	  getTarget() {
	    return this.target;
	  }
	  /**
	   * Creates Shepherd element for step based on options
	   *
	   * @return {Element} The DOM element for the step tooltip
	   * @private
	   */


	  _createTooltipContent() {
	    const descriptionId = `${this.id}-description`;
	    const labelId = `${this.id}-label`;
	    this.shepherdElementComponent = new Shepherd_element({
	      target: this.tour.options.stepsContainer || document.body,
	      props: {
	        classPrefix: this.classPrefix,
	        descriptionId,
	        labelId,
	        step: this,
	        styles: this.styles
	      }
	    });
	    return this.shepherdElementComponent.getElement();
	  }
	  /**
	   * If a custom scrollToHandler is defined, call that, otherwise do the generic
	   * scrollIntoView call.
	   *
	   * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
	   * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
	   * @private
	   */


	  _scrollTo(scrollToOptions) {
	    const {
	      element
	    } = this._getResolvedAttachToOptions();

	    if (isFunction(this.options.scrollToHandler)) {
	      this.options.scrollToHandler(element);
	    } else if (isElement$1(element) && typeof element.scrollIntoView === 'function') {
	      element.scrollIntoView(scrollToOptions);
	    }
	  }
	  /**
	   * _getClassOptions gets all possible classes for the step
	   * @param {Object} stepOptions The step specific options
	   * @returns {String} unique string from array of classes
	   * @private
	   */


	  _getClassOptions(stepOptions) {
	    const defaultStepOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
	    const stepClasses = stepOptions.classes ? stepOptions.classes : '';
	    const defaultStepOptionsClasses = defaultStepOptions && defaultStepOptions.classes ? defaultStepOptions.classes : '';
	    const allClasses = [...stepClasses.split(' '), ...defaultStepOptionsClasses.split(' ')];
	    const uniqClasses = new Set(allClasses);
	    return Array.from(uniqClasses).join(' ').trim();
	  }
	  /**
	   * Sets the options for the step, maps `when` to events, sets up buttons
	   * @param {Object} options The options for the step
	   * @private
	   */


	  _setOptions(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    let tourOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
	    tourOptions = cjs({}, tourOptions || {});
	    this.options = Object.assign({
	      arrow: true
	    }, tourOptions, options);
	    const {
	      when
	    } = this.options;
	    this.options.classes = this._getClassOptions(options);
	    this.destroy();
	    this.id = this.options.id || `step-${uuid()}`;

	    if (when) {
	      Object.keys(when).forEach(event => {
	        this.on(event, when[event], this);
	      });
	    }
	  }
	  /**
	   * Create the element and set up the Popper instance
	   * @private
	   */


	  _setupElements() {
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
	   * sets up a Popper instance for the tooltip, then triggers `show`.
	   * @private
	   */


	  _show() {
	    this.trigger('before-show'); // Force resolve to make sure the options are updated on subsequent shows.

	    this._resolveAttachToOptions();

	    this._setupElements();

	    if (!this.tour.modal) {
	      this.tour._setupModal();
	    }

	    this.tour.modal.setupForStep(this);

	    this._styleTargetElementForStep(this);

	    this.el.hidden = false; // start scrolling to target before showing the step

	    if (this.options.scrollTo) {
	      setTimeout(() => {
	        this._scrollTo(this.options.scrollTo);
	      });
	    }

	    this.el.hidden = false;
	    const content = this.shepherdElementComponent.getElement();
	    const target = this.target || document.body;
	    target.classList.add(`${this.classPrefix}shepherd-enabled`);
	    target.classList.add(`${this.classPrefix}shepherd-target`);
	    content.classList.add('shepherd-enabled');
	    this.trigger('show');
	  }
	  /**
	   * Modulates the styles of the passed step's target element, based on the step's options and
	   * the tour's `modal` option, to visually emphasize the element
	   *
	   * @param step The step object that attaches to the element
	   * @private
	   */


	  _styleTargetElementForStep(step) {
	    const targetElement = step.target;

	    if (!targetElement) {
	      return;
	    }

	    if (step.options.highlightClass) {
	      targetElement.classList.add(step.options.highlightClass);
	    }

	    targetElement.classList.remove('shepherd-target-click-disabled');

	    if (step.options.canClickTarget === false) {
	      targetElement.classList.add('shepherd-target-click-disabled');
	    }
	  }
	  /**
	   * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
	   * and 'shepherd-target' classes
	   * @private
	   */


	  _updateStepTargetOnHide() {
	    const target = this.target || document.body;

	    if (this.options.highlightClass) {
	      target.classList.remove(this.options.highlightClass);
	    }

	    target.classList.remove('shepherd-target-click-disabled', `${this.classPrefix}shepherd-enabled`, `${this.classPrefix}shepherd-target`);
	  }

	}

	/**
	 * Cleanup the steps and set pointerEvents back to 'auto'
	 * @param tour The tour object
	 */
	function cleanupSteps(tour) {
	  if (tour) {
	    const {
	      steps
	    } = tour;
	    steps.forEach(step => {
	      if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
	        if (step.target instanceof HTMLElement) {
	          step.target.classList.remove('shepherd-target-click-disabled');
	        }
	      }
	    });
	  }
	}

	/**
	 * Generates the svg path data for a rounded rectangle overlay
	 * @param {Object} dimension - Dimensions of rectangle.
	 * @param {number} width - Width.
	 * @param {number} height - Height.
	 * @param {number} [x=0] - Offset from top left corner in x axis. default 0.
	 * @param {number} [y=0] - Offset from top left corner in y axis. default 0.
	 * @param {number} [r=0] - Corner Radius. Keep this smaller than  half of width or height.
	 * @returns {string} - Rounded rectangle overlay path data.
	 */
	function makeOverlayPath(_ref) {
	  let {
	    width,
	    height,
	    x = 0,
	    y = 0,
	    r = 0
	  } = _ref;
	  const {
	    innerWidth: w,
	    innerHeight: h
	  } = window;
	  return `M${w},${h}\
H0\
V0\
H${w}\
V${h}\
Z\
M${x + r},${y}\
a${r},${r},0,0,0-${r},${r}\
V${height + y - r}\
a${r},${r},0,0,0,${r},${r}\
H${width + x - r}\
a${r},${r},0,0,0,${r}-${r}\
V${y + r}\
a${r},${r},0,0,0-${r}-${r}\
Z`;
	}

	/* src/js/components/shepherd-modal.svelte generated by Svelte v3.49.0 */

	function create_fragment(ctx) {
	  let svg;
	  let path;
	  let svg_class_value;
	  let mounted;
	  let dispose;
	  return {
	    c() {
	      svg = svg_element("svg");
	      path = svg_element("path");
	      attr(path, "d",
	      /*pathDefinition*/
	      ctx[2]);
	      attr(svg, "class", svg_class_value = `${
      /*modalIsVisible*/
      ctx[1] ? 'shepherd-modal-is-visible' : ''} shepherd-modal-overlay-container`);
	    },

	    m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, path);
	      /*svg_binding*/

	      ctx[11](svg);

	      if (!mounted) {
	        dispose = listen(svg, "touchmove",
	        /*_preventModalOverlayTouch*/
	        ctx[3]);
	        mounted = true;
	      }
	    },

	    p(ctx, _ref) {
	      let [dirty] = _ref;

	      if (dirty &
	      /*pathDefinition*/
	      4) {
	        attr(path, "d",
	        /*pathDefinition*/
	        ctx[2]);
	      }

	      if (dirty &
	      /*modalIsVisible*/
	      2 && svg_class_value !== (svg_class_value = `${
      /*modalIsVisible*/
      ctx[1] ? 'shepherd-modal-is-visible' : ''} shepherd-modal-overlay-container`)) {
	        attr(svg, "class", svg_class_value);
	      }
	    },

	    i: noop,
	    o: noop,

	    d(detaching) {
	      if (detaching) detach(svg);
	      /*svg_binding*/

	      ctx[11](null);
	      mounted = false;
	      dispose();
	    }

	  };
	}

	function _getScrollParent(element) {
	  if (!element) {
	    return null;
	  }

	  const isHtmlElement = element instanceof HTMLElement;
	  const overflowY = isHtmlElement && window.getComputedStyle(element).overflowY;
	  const isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';

	  if (isScrollable && element.scrollHeight >= element.clientHeight) {
	    return element;
	  }

	  return _getScrollParent(element.parentElement);
	}
	/**
	 * Get the visible height of the target element relative to its scrollParent.
	 * If there is no scroll parent, the height of the element is returned.
	 *
	 * @param {HTMLElement} element The target element
	 * @param {HTMLElement} [scrollParent] The scrollable parent element
	 * @returns {{y: number, height: number}}
	 * @private
	 */


	function _getVisibleHeight(element, scrollParent) {
	  const elementRect = element.getBoundingClientRect();
	  let top = elementRect.y || elementRect.top;
	  let bottom = elementRect.bottom || top + elementRect.height;

	  if (scrollParent) {
	    const scrollRect = scrollParent.getBoundingClientRect();
	    const scrollTop = scrollRect.y || scrollRect.top;
	    const scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;
	    top = Math.max(top, scrollTop);
	    bottom = Math.min(bottom, scrollBottom);
	  }

	  const height = Math.max(bottom - top, 0); // Default to 0 if height is negative

	  return {
	    y: top,
	    height
	  };
	}

	function instance($$self, $$props, $$invalidate) {
	  let {
	    element,
	    openingProperties
	  } = $$props;
	  uuid();
	  let modalIsVisible = false;
	  let rafId = undefined;
	  let pathDefinition;
	  closeModalOpening();

	  const getElement = () => element;

	  function closeModalOpening() {
	    $$invalidate(4, openingProperties = {
	      width: 0,
	      height: 0,
	      x: 0,
	      y: 0,
	      r: 0
	    });
	  }

	  function hide() {
	    $$invalidate(1, modalIsVisible = false); // Ensure we cleanup all event listeners when we hide the modal

	    _cleanupStepEventListeners();
	  }

	  function positionModal(modalOverlayOpeningPadding, modalOverlayOpeningRadius, scrollParent, targetElement) {
	    if (modalOverlayOpeningPadding === void 0) {
	      modalOverlayOpeningPadding = 0;
	    }

	    if (modalOverlayOpeningRadius === void 0) {
	      modalOverlayOpeningRadius = 0;
	    }

	    if (targetElement) {
	      const {
	        y,
	        height
	      } = _getVisibleHeight(targetElement, scrollParent);

	      const {
	        x,
	        width,
	        left
	      } = targetElement.getBoundingClientRect(); // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top

	      $$invalidate(4, openingProperties = {
	        width: width + modalOverlayOpeningPadding * 2,
	        height: height + modalOverlayOpeningPadding * 2,
	        x: (x || left) - modalOverlayOpeningPadding,
	        y: y - modalOverlayOpeningPadding,
	        r: modalOverlayOpeningRadius
	      });
	    } else {
	      closeModalOpening();
	    }
	  }

	  function setupForStep(step) {
	    // Ensure we move listeners from the previous step, before we setup new ones
	    _cleanupStepEventListeners();

	    if (step.tour.options.useModalOverlay) {
	      _styleForStep(step);

	      show();
	    } else {
	      hide();
	    }
	  }

	  function show() {
	    $$invalidate(1, modalIsVisible = true);
	  }

	  const _preventModalBodyTouch = e => {
	    e.preventDefault();
	  };

	  const _preventModalOverlayTouch = e => {
	    e.stopPropagation();
	  };
	  /**
	  * Add touchmove event listener
	  * @private
	  */


	  function _addStepEventListeners() {
	    // Prevents window from moving on touch.
	    window.addEventListener('touchmove', _preventModalBodyTouch, {
	      passive: false
	    });
	  }
	  /**
	  * Cancel the requestAnimationFrame loop and remove touchmove event listeners
	  * @private
	  */


	  function _cleanupStepEventListeners() {
	    if (rafId) {
	      cancelAnimationFrame(rafId);
	      rafId = undefined;
	    }

	    window.removeEventListener('touchmove', _preventModalBodyTouch, {
	      passive: false
	    });
	  }
	  /**
	  * Style the modal for the step
	  * @param {Step} step The step to style the opening for
	  * @private
	  */


	  function _styleForStep(step) {
	    const {
	      modalOverlayOpeningPadding,
	      modalOverlayOpeningRadius
	    } = step.options;

	    const scrollParent = _getScrollParent(step.target); // Setup recursive function to call requestAnimationFrame to update the modal opening position


	    const rafLoop = () => {
	      rafId = undefined;
	      positionModal(modalOverlayOpeningPadding, modalOverlayOpeningRadius, scrollParent, step.target);
	      rafId = requestAnimationFrame(rafLoop);
	    };

	    rafLoop();

	    _addStepEventListeners();
	  }

	  function svg_binding($$value) {
	    binding_callbacks[$$value ? 'unshift' : 'push'](() => {
	      element = $$value;
	      $$invalidate(0, element);
	    });
	  }

	  $$self.$$set = $$props => {
	    if ('element' in $$props) $$invalidate(0, element = $$props.element);
	    if ('openingProperties' in $$props) $$invalidate(4, openingProperties = $$props.openingProperties);
	  };

	  $$self.$$.update = () => {
	    if ($$self.$$.dirty &
	    /*openingProperties*/
	    16) {
	      $$invalidate(2, pathDefinition = makeOverlayPath(openingProperties));
	    }
	  };

	  return [element, modalIsVisible, pathDefinition, _preventModalOverlayTouch, openingProperties, getElement, closeModalOpening, hide, positionModal, setupForStep, show, svg_binding];
	}

	class Shepherd_modal extends SvelteComponent {
	  constructor(options) {
	    super();
	    init(this, options, instance, create_fragment, safe_not_equal, {
	      element: 0,
	      openingProperties: 4,
	      getElement: 5,
	      closeModalOpening: 6,
	      hide: 7,
	      positionModal: 8,
	      setupForStep: 9,
	      show: 10
	    });
	  }

	  get getElement() {
	    return this.$$.ctx[5];
	  }

	  get closeModalOpening() {
	    return this.$$.ctx[6];
	  }

	  get hide() {
	    return this.$$.ctx[7];
	  }

	  get positionModal() {
	    return this.$$.ctx[8];
	  }

	  get setupForStep() {
	    return this.$$.ctx[9];
	  }

	  get show() {
	    return this.$$.ctx[10];
	  }

	}

	const Shepherd = new Evented();
	/**
	 * Class representing the site tour
	 * @extends {Evented}
	 */

	class Tour extends Evented {
	  /**
	   * @param {Object} options The options for the tour
	   * @param {boolean} options.confirmCancel If true, will issue a `window.confirm` before cancelling
	   * @param {string} options.confirmCancelMessage The message to display in the confirm dialog
	   * @param {string} options.classPrefix The prefix to add to the `shepherd-enabled` and `shepherd-target` class names as well as the `data-shepherd-step-id`.
	   * @param {Object} options.defaultStepOptions Default options for Steps ({@link Step#constructor}), created through `addStep`
	   * @param {boolean} options.exitOnEsc Exiting the tour with the escape key will be enabled unless this is explicitly
	   * set to false.
	   * @param {boolean} options.keyboardNavigation Navigating the tour via left and right arrow keys will be enabled
	   * unless this is explicitly set to false.
	   * @param {HTMLElement} options.stepsContainer An optional container element for the steps.
	   * If not set, the steps will be appended to `document.body`.
	   * @param {HTMLElement} options.modalContainer An optional container element for the modal.
	   * If not set, the modal will be appended to `document.body`.
	   * @param {object[] | Step[]} options.steps An array of step options objects or Step instances to initialize the tour with
	   * @param {string} options.tourName An optional "name" for the tour. This will be appended to the the tour's
	   * dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute
	   * whenever the tour becomes active.
	   * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
	   * modal overlay. If true, the overlay will create an opening around the target element so that it
	   * can remain interactive
	   * @returns {Tour}
	   */
	  constructor(options) {
	    if (options === void 0) {
	      options = {};
	    }

	    super(options);
	    autoBind(this);
	    const defaultTourOptions = {
	      exitOnEsc: true,
	      keyboardNavigation: true
	    };
	    this.options = Object.assign({}, defaultTourOptions, options);
	    this.classPrefix = normalizePrefix(this.options.classPrefix);
	    this.steps = [];
	    this.addSteps(this.options.steps); // Pass these events onto the global Shepherd object

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

	    this._setTourID();

	    return this;
	  }
	  /**
	   * Adds a new step to the tour
	   * @param {Object|Step} options An object containing step options or a Step instance
	   * @param {number} index The optional index to insert the step at. If undefined, the step
	   * is added to the end of the array.
	   * @return {Step} The newly added step
	   */


	  addStep(options, index) {
	    let step = options;

	    if (!(step instanceof Step)) {
	      step = new Step(this, step);
	    } else {
	      step.tour = this;
	    }

	    if (!isUndefined(index)) {
	      this.steps.splice(index, 0, step);
	    } else {
	      this.steps.push(step);
	    }

	    return step;
	  }
	  /**
	   * Add multiple steps to the tour
	   * @param {Array<object> | Array<Step>} steps The steps to add to the tour
	   */


	  addSteps(steps) {
	    if (Array.isArray(steps)) {
	      steps.forEach(step => {
	        this.addStep(step);
	      });
	    }

	    return this;
	  }
	  /**
	   * Go to the previous step in the tour
	   */


	  back() {
	    const index = this.steps.indexOf(this.currentStep);
	    this.show(index - 1, false);
	  }
	  /**
	   * Calls _done() triggering the 'cancel' event
	   * If `confirmCancel` is true, will show a window.confirm before cancelling
	   */


	  cancel() {
	    if (this.options.confirmCancel) {
	      const cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
	      const stopTour = window.confirm(cancelMessage);

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


	  complete() {
	    this._done('complete');
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
	  /**
	   * Check if the tour is active
	   * @return {boolean}
	   */


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
	   * Show a specific step in the tour
	   * @param {Number|String} key The key to look up the step by
	   * @param {Boolean} forward True if we are going forward, false if backward
	   */


	  show(key, forward) {
	    if (key === void 0) {
	      key = 0;
	    }

	    if (forward === void 0) {
	      forward = true;
	    }

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
	    this.trigger('start'); // Save the focused element before the tour opens

	    this.focusedElBeforeOpen = document.activeElement;
	    this.currentStep = null;

	    this._setupModal();

	    this._setupActiveTour();

	    this.next();
	  }
	  /**
	   * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
	   * @param {String} event The event name to trigger
	   * @private
	   */


	  _done(event) {
	    const index = this.steps.indexOf(this.currentStep);

	    if (Array.isArray(this.steps)) {
	      this.steps.forEach(step => step.destroy());
	    }

	    cleanupSteps(this);
	    this.trigger(event, {
	      index
	    });
	    Shepherd.activeTour = null;
	    this.trigger('inactive', {
	      tour: this
	    });

	    if (this.modal) {
	      this.modal.hide();
	    }

	    if (event === 'cancel' || event === 'complete') {
	      if (this.modal) {
	        const modalContainer = document.querySelector('.shepherd-modal-overlay-container');

	        if (modalContainer) {
	          modalContainer.remove();
	        }
	      }
	    } // Focus the element that was focused before the tour started


	    if (isHTMLElement$1(this.focusedElBeforeOpen)) {
	      this.focusedElBeforeOpen.focus();
	    }
	  }
	  /**
	   * Make this tour "active"
	   * @private
	   */


	  _setupActiveTour() {
	    this.trigger('active', {
	      tour: this
	    });
	    Shepherd.activeTour = this;
	  }
	  /**
	   * _setupModal create the modal container and instance
	   * @private
	   */


	  _setupModal() {
	    this.modal = new Shepherd_modal({
	      target: this.options.modalContainer || document.body,
	      props: {
	        classPrefix: this.classPrefix,
	        styles: this.styles
	      }
	    });
	  }
	  /**
	   * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
	   * @param {Step} step The step to skip
	   * @param {Boolean} forward True if we are going forward, false if backward
	   * @private
	   */


	  _skipStep(step, forward) {
	    const index = this.steps.indexOf(step);

	    if (index === this.steps.length - 1) {
	      this.complete();
	    } else {
	      const nextIndex = forward ? index + 1 : index - 1;
	      this.show(nextIndex, forward);
	    }
	  }
	  /**
	   * Before showing, hide the current step and if the tour is not
	   * already active, call `this._setupActiveTour`.
	   * @private
	   */


	  _updateStateBeforeShow() {
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


	  _setTourID() {
	    const tourName = this.options.tourName || 'tour';
	    this.id = `${tourName}--${uuid()}`;
	  }

	}

	Object.assign(Shepherd, {
	  Tour,
	  Step
	});

	return Shepherd;

}));
//# sourceMappingURL=shepherd.js.map
