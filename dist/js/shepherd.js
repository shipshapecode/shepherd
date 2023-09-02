/*! shepherd.js 11.2.0 */

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
	}

	// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
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
	    return Object.propertyIsEnumerable.call(target, symbol);
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
	}

	// Protects from prototype poisoning and unexpected merging up the prototype chain.
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
	  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	  // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
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
	  on(event, handler, ctx, once = false) {
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
	  trigger(event, ...args) {
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
	    const handler = _setupAdvanceOnHandler(selector, step);

	    // TODO: this should also bind/unbind on show/hide
	    let el;
	    try {
	      el = document.querySelector(selector);
	    } catch (e) {
	      // TODO
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
	    } catch (e) {
	      // TODO
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
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	  return target;
	}

	const min = Math.min;
	const max = Math.max;
	const round = Math.round;
	const floor = Math.floor;
	const createCoords = v => ({
	  x: v,
	  y: v
	});
	const oppositeSideMap = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	const oppositeAlignmentMap = {
	  start: 'end',
	  end: 'start'
	};
	function clamp(start, value, end) {
	  return max(start, min(value, end));
	}
	function evaluate(value, param) {
	  return typeof value === 'function' ? value(param) : value;
	}
	function getSide(placement) {
	  return placement.split('-')[0];
	}
	function getAlignment(placement) {
	  return placement.split('-')[1];
	}
	function getOppositeAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}
	function getAxisLength(axis) {
	  return axis === 'y' ? 'height' : 'width';
	}
	function getSideAxis(placement) {
	  return ['top', 'bottom'].includes(getSide(placement)) ? 'y' : 'x';
	}
	function getAlignmentAxis(placement) {
	  return getOppositeAxis(getSideAxis(placement));
	}
	function getAlignmentSides(placement, rects, rtl) {
	  if (rtl === void 0) {
	    rtl = false;
	  }
	  const alignment = getAlignment(placement);
	  const alignmentAxis = getAlignmentAxis(placement);
	  const length = getAxisLength(alignmentAxis);
	  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
	  if (rects.reference[length] > rects.floating[length]) {
	    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	  }
	  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
	}
	function getExpandedPlacements(placement) {
	  const oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
	}
	function getOppositeAlignmentPlacement(placement) {
	  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
	}
	function getSideList(side, isStart, rtl) {
	  const lr = ['left', 'right'];
	  const rl = ['right', 'left'];
	  const tb = ['top', 'bottom'];
	  const bt = ['bottom', 'top'];
	  switch (side) {
	    case 'top':
	    case 'bottom':
	      if (rtl) return isStart ? rl : lr;
	      return isStart ? lr : rl;
	    case 'left':
	    case 'right':
	      return isStart ? tb : bt;
	    default:
	      return [];
	  }
	}
	function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	  const alignment = getAlignment(placement);
	  let list = getSideList(getSide(placement), direction === 'start', rtl);
	  if (alignment) {
	    list = list.map(side => side + "-" + alignment);
	    if (flipAlignment) {
	      list = list.concat(list.map(getOppositeAlignmentPlacement));
	    }
	  }
	  return list;
	}
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
	}
	function expandPaddingObject(padding) {
	  return _extends({
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  }, padding);
	}
	function getPaddingObject(padding) {
	  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
	    top: padding,
	    right: padding,
	    bottom: padding,
	    left: padding
	  };
	}
	function rectToClientRect(rect) {
	  return _extends({}, rect, {
	    top: rect.y,
	    left: rect.x,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	const _excluded2 = ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "fallbackAxisSideDirection", "flipAlignment"],
	  _excluded4 = ["mainAxis", "crossAxis", "limiter"];
	function computeCoordsFromPlacement(_ref, placement, rtl) {
	  let {
	    reference,
	    floating
	  } = _ref;
	  const sideAxis = getSideAxis(placement);
	  const alignmentAxis = getAlignmentAxis(placement);
	  const alignLength = getAxisLength(alignmentAxis);
	  const side = getSide(placement);
	  const isVertical = sideAxis === 'y';
	  const commonX = reference.x + reference.width / 2 - floating.width / 2;
	  const commonY = reference.y + reference.height / 2 - floating.height / 2;
	  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	  let coords;
	  switch (side) {
	    case 'top':
	      coords = {
	        x: commonX,
	        y: reference.y - floating.height
	      };
	      break;
	    case 'bottom':
	      coords = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;
	    case 'right':
	      coords = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;
	    case 'left':
	      coords = {
	        x: reference.x - floating.width,
	        y: commonY
	      };
	      break;
	    default:
	      coords = {
	        x: reference.x,
	        y: reference.y
	      };
	  }
	  switch (getAlignment(placement)) {
	    case 'start':
	      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
	      break;
	    case 'end':
	      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
	      break;
	  }
	  return coords;
	}

	/**
	 * Computes the `x` and `y` coordinates that will place the floating element
	 * next to a reference element when it is given a certain positioning strategy.
	 *
	 * This export does not have any `platform` interface logic. You will need to
	 * write one for the platform you are using Floating UI with.
	 */
	const computePosition$1 = async (reference, floating, config) => {
	  const {
	    placement = 'bottom',
	    strategy = 'absolute',
	    middleware = [],
	    platform
	  } = config;
	  const validMiddleware = middleware.filter(Boolean);
	  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	  let rects = await platform.getElementRects({
	    reference,
	    floating,
	    strategy
	  });
	  let {
	    x,
	    y
	  } = computeCoordsFromPlacement(rects, placement, rtl);
	  let statefulPlacement = placement;
	  let middlewareData = {};
	  let resetCount = 0;
	  for (let i = 0; i < validMiddleware.length; i++) {
	    const {
	      name,
	      fn
	    } = validMiddleware[i];
	    const {
	      x: nextX,
	      y: nextY,
	      data,
	      reset
	    } = await fn({
	      x,
	      y,
	      initialPlacement: placement,
	      placement: statefulPlacement,
	      strategy,
	      middlewareData,
	      rects,
	      platform,
	      elements: {
	        reference,
	        floating
	      }
	    });
	    x = nextX != null ? nextX : x;
	    y = nextY != null ? nextY : y;
	    middlewareData = _extends({}, middlewareData, {
	      [name]: _extends({}, middlewareData[name], data)
	    });
	    if (reset && resetCount <= 50) {
	      resetCount++;
	      if (typeof reset === 'object') {
	        if (reset.placement) {
	          statefulPlacement = reset.placement;
	        }
	        if (reset.rects) {
	          rects = reset.rects === true ? await platform.getElementRects({
	            reference,
	            floating,
	            strategy
	          }) : reset.rects;
	        }
	        ({
	          x,
	          y
	        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
	      }
	      i = -1;
	      continue;
	    }
	  }
	  return {
	    x,
	    y,
	    placement: statefulPlacement,
	    strategy,
	    middlewareData
	  };
	};

	/**
	 * Resolves with an object of overflow side offsets that determine how much the
	 * element is overflowing a given clipping boundary on each side.
	 * - positive = overflowing the boundary by that number of pixels
	 * - negative = how many pixels left before it will overflow
	 * - 0 = lies flush with the boundary
	 * @see https://floating-ui.com/docs/detectOverflow
	 */
	async function detectOverflow(state, options) {
	  var _await$platform$isEle;
	  if (options === void 0) {
	    options = {};
	  }
	  const {
	    x,
	    y,
	    platform,
	    rects,
	    elements,
	    strategy
	  } = state;
	  const {
	    boundary = 'clippingAncestors',
	    rootBoundary = 'viewport',
	    elementContext = 'floating',
	    altBoundary = false,
	    padding = 0
	  } = evaluate(options, state);
	  const paddingObject = getPaddingObject(padding);
	  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
	  const element = elements[altBoundary ? altContext : elementContext];
	  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
	    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
	    boundary,
	    rootBoundary,
	    strategy
	  }));
	  const rect = elementContext === 'floating' ? _extends({}, rects.floating, {
	    x,
	    y
	  }) : rects.reference;
	  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
	    x: 1,
	    y: 1
	  } : {
	    x: 1,
	    y: 1
	  };
	  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
	    rect,
	    offsetParent,
	    strategy
	  }) : rect);
	  return {
	    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
	    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
	    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
	    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	  };
	}

	/**
	 * Provides data to position an inner element of the floating element so that it
	 * appears centered to the reference element.
	 * @see https://floating-ui.com/docs/arrow
	 */
	const arrow = options => ({
	  name: 'arrow',
	  options,
	  async fn(state) {
	    const {
	      x,
	      y,
	      placement,
	      rects,
	      platform,
	      elements
	    } = state;
	    // Since `element` is required, we don't Partial<> the type.
	    const {
	      element,
	      padding = 0
	    } = evaluate(options, state) || {};
	    if (element == null) {
	      return {};
	    }
	    const paddingObject = getPaddingObject(padding);
	    const coords = {
	      x,
	      y
	    };
	    const axis = getAlignmentAxis(placement);
	    const length = getAxisLength(axis);
	    const arrowDimensions = await platform.getDimensions(element);
	    const isYAxis = axis === 'y';
	    const minProp = isYAxis ? 'top' : 'left';
	    const maxProp = isYAxis ? 'bottom' : 'right';
	    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
	    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
	    const startDiff = coords[axis] - rects.reference[axis];
	    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
	    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

	    // DOM platform can return `window` as the `offsetParent`.
	    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
	      clientSize = elements.floating[clientProp] || rects.floating[length];
	    }
	    const centerToReference = endDiff / 2 - startDiff / 2;

	    // If the padding is large enough that it causes the arrow to no longer be
	    // centered, modify the padding so that it is centered.
	    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
	    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
	    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

	    // Make sure the arrow doesn't overflow the floating element if the center
	    // point is outside the floating element's bounds.
	    const min$1 = minPadding;
	    const max = clientSize - arrowDimensions[length] - maxPadding;
	    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
	    const offset = clamp(min$1, center, max);

	    // If the reference is small enough that the arrow's padding causes it to
	    // to point to nothing for an aligned placement, adjust the offset of the
	    // floating element itself. This stops `shift()` from taking action, but can
	    // be worked around by calling it again after the `arrow()` if desired.
	    const shouldAddOffset = getAlignment(placement) != null && center != offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
	    const alignmentOffset = shouldAddOffset ? center < min$1 ? min$1 - center : max - center : 0;
	    return {
	      [axis]: coords[axis] - alignmentOffset,
	      data: {
	        [axis]: offset,
	        centerOffset: center - offset + alignmentOffset
	      }
	    };
	  }
	});

	/**
	 * Optimizes the visibility of the floating element by flipping the `placement`
	 * in order to keep it in view when the preferred placement(s) will overflow the
	 * clipping boundary. Alternative to `autoPlacement`.
	 * @see https://floating-ui.com/docs/flip
	 */
	const flip = function flip(options) {
	  if (options === void 0) {
	    options = {};
	  }
	  return {
	    name: 'flip',
	    options,
	    async fn(state) {
	      var _middlewareData$flip;
	      const {
	        placement,
	        middlewareData,
	        rects,
	        initialPlacement,
	        platform,
	        elements
	      } = state;
	      const _evaluate2 = evaluate(options, state),
	        {
	          mainAxis: checkMainAxis = true,
	          crossAxis: checkCrossAxis = true,
	          fallbackPlacements: specifiedFallbackPlacements,
	          fallbackStrategy = 'bestFit',
	          fallbackAxisSideDirection = 'none',
	          flipAlignment = true
	        } = _evaluate2,
	        detectOverflowOptions = _objectWithoutPropertiesLoose(_evaluate2, _excluded2);
	      const side = getSide(placement);
	      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
	      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
	      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== 'none') {
	        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
	      }
	      const placements = [initialPlacement, ...fallbackPlacements];
	      const overflow = await detectOverflow(state, detectOverflowOptions);
	      const overflows = [];
	      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
	      if (checkMainAxis) {
	        overflows.push(overflow[side]);
	      }
	      if (checkCrossAxis) {
	        const sides = getAlignmentSides(placement, rects, rtl);
	        overflows.push(overflow[sides[0]], overflow[sides[1]]);
	      }
	      overflowsData = [...overflowsData, {
	        placement,
	        overflows
	      }];

	      // One or more sides is overflowing.
	      if (!overflows.every(side => side <= 0)) {
	        var _middlewareData$flip2, _overflowsData$filter;
	        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
	        const nextPlacement = placements[nextIndex];
	        if (nextPlacement) {
	          // Try next placement and re-run the lifecycle.
	          return {
	            data: {
	              index: nextIndex,
	              overflows: overflowsData
	            },
	            reset: {
	              placement: nextPlacement
	            }
	          };
	        }

	        // First, find the candidates that fit on the mainAxis side of overflow,
	        // then find the placement that fits the best on the main crossAxis side.
	        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

	        // Otherwise fallback.
	        if (!resetPlacement) {
	          switch (fallbackStrategy) {
	            case 'bestFit':
	              {
	                var _overflowsData$map$so;
	                const placement = (_overflowsData$map$so = overflowsData.map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
	                if (placement) {
	                  resetPlacement = placement;
	                }
	                break;
	              }
	            case 'initialPlacement':
	              resetPlacement = initialPlacement;
	              break;
	          }
	        }
	        if (placement !== resetPlacement) {
	          return {
	            reset: {
	              placement: resetPlacement
	            }
	          };
	        }
	      }
	      return {};
	    }
	  };
	};

	/**
	 * Optimizes the visibility of the floating element by shifting it in order to
	 * keep it in view when it will overflow the clipping boundary.
	 * @see https://floating-ui.com/docs/shift
	 */
	const shift = function shift(options) {
	  if (options === void 0) {
	    options = {};
	  }
	  return {
	    name: 'shift',
	    options,
	    async fn(state) {
	      const {
	        x,
	        y,
	        placement
	      } = state;
	      const _evaluate4 = evaluate(options, state),
	        {
	          mainAxis: checkMainAxis = true,
	          crossAxis: checkCrossAxis = false,
	          limiter = {
	            fn: _ref => {
	              let {
	                x,
	                y
	              } = _ref;
	              return {
	                x,
	                y
	              };
	            }
	          }
	        } = _evaluate4,
	        detectOverflowOptions = _objectWithoutPropertiesLoose(_evaluate4, _excluded4);
	      const coords = {
	        x,
	        y
	      };
	      const overflow = await detectOverflow(state, detectOverflowOptions);
	      const crossAxis = getSideAxis(getSide(placement));
	      const mainAxis = getOppositeAxis(crossAxis);
	      let mainAxisCoord = coords[mainAxis];
	      let crossAxisCoord = coords[crossAxis];
	      if (checkMainAxis) {
	        const minSide = mainAxis === 'y' ? 'top' : 'left';
	        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
	        const min = mainAxisCoord + overflow[minSide];
	        const max = mainAxisCoord - overflow[maxSide];
	        mainAxisCoord = clamp(min, mainAxisCoord, max);
	      }
	      if (checkCrossAxis) {
	        const minSide = crossAxis === 'y' ? 'top' : 'left';
	        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
	        const min = crossAxisCoord + overflow[minSide];
	        const max = crossAxisCoord - overflow[maxSide];
	        crossAxisCoord = clamp(min, crossAxisCoord, max);
	      }
	      const limitedCoords = limiter.fn(_extends({}, state, {
	        [mainAxis]: mainAxisCoord,
	        [crossAxis]: crossAxisCoord
	      }));
	      return _extends({}, limitedCoords, {
	        data: {
	          x: limitedCoords.x - x,
	          y: limitedCoords.y - y
	        }
	      });
	    }
	  };
	};
	/**
	 * Built-in `limiter` that will stop `shift()` at a certain point.
	 */
	const limitShift = function limitShift(options) {
	  if (options === void 0) {
	    options = {};
	  }
	  return {
	    options,
	    fn(state) {
	      const {
	        x,
	        y,
	        placement,
	        rects,
	        middlewareData
	      } = state;
	      const {
	        offset = 0,
	        mainAxis: checkMainAxis = true,
	        crossAxis: checkCrossAxis = true
	      } = evaluate(options, state);
	      const coords = {
	        x,
	        y
	      };
	      const crossAxis = getSideAxis(placement);
	      const mainAxis = getOppositeAxis(crossAxis);
	      let mainAxisCoord = coords[mainAxis];
	      let crossAxisCoord = coords[crossAxis];
	      const rawOffset = evaluate(offset, state);
	      const computedOffset = typeof rawOffset === 'number' ? {
	        mainAxis: rawOffset,
	        crossAxis: 0
	      } : _extends({
	        mainAxis: 0,
	        crossAxis: 0
	      }, rawOffset);
	      if (checkMainAxis) {
	        const len = mainAxis === 'y' ? 'height' : 'width';
	        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
	        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
	        if (mainAxisCoord < limitMin) {
	          mainAxisCoord = limitMin;
	        } else if (mainAxisCoord > limitMax) {
	          mainAxisCoord = limitMax;
	        }
	      }
	      if (checkCrossAxis) {
	        var _middlewareData$offse, _middlewareData$offse2;
	        const len = mainAxis === 'y' ? 'width' : 'height';
	        const isOriginSide = ['top', 'left'].includes(getSide(placement));
	        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
	        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
	        if (crossAxisCoord < limitMin) {
	          crossAxisCoord = limitMin;
	        } else if (crossAxisCoord > limitMax) {
	          crossAxisCoord = limitMax;
	        }
	      }
	      return {
	        [mainAxis]: mainAxisCoord,
	        [crossAxis]: crossAxisCoord
	      };
	    }
	  };
	};

	function getNodeName(node) {
	  if (isNode(node)) {
	    return (node.nodeName || '').toLowerCase();
	  }
	  // Mocked nodes in testing environments may not be instances of Node. By
	  // returning `#document` an infinite loop won't occur.
	  // https://github.com/floating-ui/floating-ui/issues/2317
	  return '#document';
	}
	function getWindow(node) {
	  var _node$ownerDocument;
	  return (node == null ? void 0 : (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
	}
	function getDocumentElement(node) {
	  var _ref;
	  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
	}
	function isNode(value) {
	  return value instanceof Node || value instanceof getWindow(value).Node;
	}
	function isElement(value) {
	  return value instanceof Element || value instanceof getWindow(value).Element;
	}
	function isHTMLElement(value) {
	  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
	}
	function isShadowRoot(value) {
	  // Browsers without `ShadowRoot` support.
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }
	  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
	}
	function isOverflowElement(element) {
	  const {
	    overflow,
	    overflowX,
	    overflowY,
	    display
	  } = getComputedStyle(element);
	  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !['inline', 'contents'].includes(display);
	}
	function isTableElement(element) {
	  return ['table', 'td', 'th'].includes(getNodeName(element));
	}
	function isContainingBlock(element) {
	  const webkit = isWebKit();
	  const css = getComputedStyle(element);

	  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
	  return css.transform !== 'none' || css.perspective !== 'none' || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || ['transform', 'perspective', 'filter'].some(value => (css.willChange || '').includes(value)) || ['paint', 'layout', 'strict', 'content'].some(value => (css.contain || '').includes(value));
	}
	function getContainingBlock(element) {
	  let currentNode = getParentNode(element);
	  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
	    if (isContainingBlock(currentNode)) {
	      return currentNode;
	    } else {
	      currentNode = getParentNode(currentNode);
	    }
	  }
	  return null;
	}
	function isWebKit() {
	  if (typeof CSS === 'undefined' || !CSS.supports) return false;
	  return CSS.supports('-webkit-backdrop-filter', 'none');
	}
	function isLastTraversableNode(node) {
	  return ['html', 'body', '#document'].includes(getNodeName(node));
	}
	function getComputedStyle(element) {
	  return getWindow(element).getComputedStyle(element);
	}
	function getNodeScroll(element) {
	  if (isElement(element)) {
	    return {
	      scrollLeft: element.scrollLeft,
	      scrollTop: element.scrollTop
	    };
	  }
	  return {
	    scrollLeft: element.pageXOffset,
	    scrollTop: element.pageYOffset
	  };
	}
	function getParentNode(node) {
	  if (getNodeName(node) === 'html') {
	    return node;
	  }
	  const result =
	  // Step into the shadow DOM of the parent of a slotted node.
	  node.assignedSlot ||
	  // DOM Element detected.
	  node.parentNode ||
	  // ShadowRoot detected.
	  isShadowRoot(node) && node.host ||
	  // Fallback.
	  getDocumentElement(node);
	  return isShadowRoot(result) ? result.host : result;
	}
	function getNearestOverflowAncestor(node) {
	  const parentNode = getParentNode(node);
	  if (isLastTraversableNode(parentNode)) {
	    return node.ownerDocument ? node.ownerDocument.body : node.body;
	  }
	  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
	    return parentNode;
	  }
	  return getNearestOverflowAncestor(parentNode);
	}
	function getOverflowAncestors(node, list) {
	  var _node$ownerDocument2;
	  if (list === void 0) {
	    list = [];
	  }
	  const scrollableAncestor = getNearestOverflowAncestor(node);
	  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	  const win = getWindow(scrollableAncestor);
	  if (isBody) {
	    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : []);
	  }
	  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor));
	}

	function getCssDimensions(element) {
	  const css = getComputedStyle(element);
	  // In testing environments, the `width` and `height` properties are empty
	  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
	  let width = parseFloat(css.width) || 0;
	  let height = parseFloat(css.height) || 0;
	  const hasOffset = isHTMLElement(element);
	  const offsetWidth = hasOffset ? element.offsetWidth : width;
	  const offsetHeight = hasOffset ? element.offsetHeight : height;
	  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	  if (shouldFallback) {
	    width = offsetWidth;
	    height = offsetHeight;
	  }
	  return {
	    width,
	    height,
	    $: shouldFallback
	  };
	}
	function unwrapElement(element) {
	  return !isElement(element) ? element.contextElement : element;
	}
	function getScale(element) {
	  const domElement = unwrapElement(element);
	  if (!isHTMLElement(domElement)) {
	    return createCoords(1);
	  }
	  const rect = domElement.getBoundingClientRect();
	  const {
	    width,
	    height,
	    $
	  } = getCssDimensions(domElement);
	  let x = ($ ? round(rect.width) : rect.width) / width;
	  let y = ($ ? round(rect.height) : rect.height) / height;

	  // 0, NaN, or Infinity should always fallback to 1.

	  if (!x || !Number.isFinite(x)) {
	    x = 1;
	  }
	  if (!y || !Number.isFinite(y)) {
	    y = 1;
	  }
	  return {
	    x,
	    y
	  };
	}
	const noOffsets = /*#__PURE__*/createCoords(0);
	function getVisualOffsets(element) {
	  const win = getWindow(element);
	  if (!isWebKit() || !win.visualViewport) {
	    return noOffsets;
	  }
	  return {
	    x: win.visualViewport.offsetLeft,
	    y: win.visualViewport.offsetTop
	  };
	}
	function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }
	  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
	    return false;
	  }
	  return isFixed;
	}
	function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }
	  if (isFixedStrategy === void 0) {
	    isFixedStrategy = false;
	  }
	  const clientRect = element.getBoundingClientRect();
	  const domElement = unwrapElement(element);
	  let scale = createCoords(1);
	  if (includeScale) {
	    if (offsetParent) {
	      if (isElement(offsetParent)) {
	        scale = getScale(offsetParent);
	      }
	    } else {
	      scale = getScale(element);
	    }
	  }
	  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	  let x = (clientRect.left + visualOffsets.x) / scale.x;
	  let y = (clientRect.top + visualOffsets.y) / scale.y;
	  let width = clientRect.width / scale.x;
	  let height = clientRect.height / scale.y;
	  if (domElement) {
	    const win = getWindow(domElement);
	    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
	    let currentIFrame = win.frameElement;
	    while (currentIFrame && offsetParent && offsetWin !== win) {
	      const iframeScale = getScale(currentIFrame);
	      const iframeRect = currentIFrame.getBoundingClientRect();
	      const css = getComputedStyle(currentIFrame);
	      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
	      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
	      x *= iframeScale.x;
	      y *= iframeScale.y;
	      width *= iframeScale.x;
	      height *= iframeScale.y;
	      x += left;
	      y += top;
	      currentIFrame = getWindow(currentIFrame).frameElement;
	    }
	  }
	  return rectToClientRect({
	    width,
	    height,
	    x,
	    y
	  });
	}
	function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	  let {
	    rect,
	    offsetParent,
	    strategy
	  } = _ref;
	  const isOffsetParentAnElement = isHTMLElement(offsetParent);
	  const documentElement = getDocumentElement(offsetParent);
	  if (offsetParent === documentElement) {
	    return rect;
	  }
	  let scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  let scale = createCoords(1);
	  const offsets = createCoords(0);
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && strategy !== 'fixed') {
	    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isHTMLElement(offsetParent)) {
	      const offsetRect = getBoundingClientRect(offsetParent);
	      scale = getScale(offsetParent);
	      offsets.x = offsetRect.x + offsetParent.clientLeft;
	      offsets.y = offsetRect.y + offsetParent.clientTop;
	    }
	  }
	  return {
	    width: rect.width * scale.x,
	    height: rect.height * scale.y,
	    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
	    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
	  };
	}
	function getClientRects(element) {
	  return Array.from(element.getClientRects());
	}
	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
	}

	// Gets the entire size of the scrollable document area, even extending outside
	// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
	function getDocumentRect(element) {
	  const html = getDocumentElement(element);
	  const scroll = getNodeScroll(element);
	  const body = element.ownerDocument.body;
	  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
	  const y = -scroll.scrollTop;
	  if (getComputedStyle(body).direction === 'rtl') {
	    x += max(html.clientWidth, body.clientWidth) - width;
	  }
	  return {
	    width,
	    height,
	    x,
	    y
	  };
	}
	function getViewportRect(element, strategy) {
	  const win = getWindow(element);
	  const html = getDocumentElement(element);
	  const visualViewport = win.visualViewport;
	  let width = html.clientWidth;
	  let height = html.clientHeight;
	  let x = 0;
	  let y = 0;
	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height;
	    const visualViewportBased = isWebKit();
	    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }
	  return {
	    width,
	    height,
	    x,
	    y
	  };
	}

	// Returns the inner client rect, subtracting scrollbars if present.
	function getInnerBoundingClientRect(element, strategy) {
	  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
	  const top = clientRect.top + element.clientTop;
	  const left = clientRect.left + element.clientLeft;
	  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
	  const width = element.clientWidth * scale.x;
	  const height = element.clientHeight * scale.y;
	  const x = left * scale.x;
	  const y = top * scale.y;
	  return {
	    width,
	    height,
	    x,
	    y
	  };
	}
	function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	  let rect;
	  if (clippingAncestor === 'viewport') {
	    rect = getViewportRect(element, strategy);
	  } else if (clippingAncestor === 'document') {
	    rect = getDocumentRect(getDocumentElement(element));
	  } else if (isElement(clippingAncestor)) {
	    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	  } else {
	    const visualOffsets = getVisualOffsets(element);
	    rect = _extends({}, clippingAncestor, {
	      x: clippingAncestor.x - visualOffsets.x,
	      y: clippingAncestor.y - visualOffsets.y
	    });
	  }
	  return rectToClientRect(rect);
	}
	function hasFixedPositionAncestor(element, stopNode) {
	  const parentNode = getParentNode(element);
	  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
	    return false;
	  }
	  return getComputedStyle(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
	}

	// A "clipping ancestor" is an `overflow` element with the characteristic of
	// clipping (or hiding) child elements. This returns all clipping ancestors
	// of the given element up the tree.
	function getClippingElementAncestors(element, cache) {
	  const cachedResult = cache.get(element);
	  if (cachedResult) {
	    return cachedResult;
	  }
	  let result = getOverflowAncestors(element).filter(el => isElement(el) && getNodeName(el) !== 'body');
	  let currentContainingBlockComputedStyle = null;
	  const elementIsFixed = getComputedStyle(element).position === 'fixed';
	  let currentNode = elementIsFixed ? getParentNode(element) : element;

	  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
	  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
	    const computedStyle = getComputedStyle(currentNode);
	    const currentNodeIsContaining = isContainingBlock(currentNode);
	    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
	      currentContainingBlockComputedStyle = null;
	    }
	    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && ['absolute', 'fixed'].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
	    if (shouldDropCurrentNode) {
	      // Drop non-containing blocks.
	      result = result.filter(ancestor => ancestor !== currentNode);
	    } else {
	      // Record last containing block for next iteration.
	      currentContainingBlockComputedStyle = computedStyle;
	    }
	    currentNode = getParentNode(currentNode);
	  }
	  cache.set(element, result);
	  return result;
	}

	// Gets the maximum area that the element is visible in due to any number of
	// clipping ancestors.
	function getClippingRect(_ref) {
	  let {
	    element,
	    boundary,
	    rootBoundary,
	    strategy
	  } = _ref;
	  const elementClippingAncestors = boundary === 'clippingAncestors' ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
	  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
	  const firstClippingAncestor = clippingAncestors[0];
	  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
	    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
	  return {
	    width: clippingRect.right - clippingRect.left,
	    height: clippingRect.bottom - clippingRect.top,
	    x: clippingRect.left,
	    y: clippingRect.top
	  };
	}
	function getDimensions(element) {
	  return getCssDimensions(element);
	}
	function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	  const isOffsetParentAnElement = isHTMLElement(offsetParent);
	  const documentElement = getDocumentElement(offsetParent);
	  const isFixed = strategy === 'fixed';
	  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	  let scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  const offsets = createCoords(0);
	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }
	    if (isOffsetParentAnElement) {
	      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
	      offsets.x = offsetRect.x + offsetParent.clientLeft;
	      offsets.y = offsetRect.y + offsetParent.clientTop;
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
	function getTrueOffsetParent(element, polyfill) {
	  if (!isHTMLElement(element) || getComputedStyle(element).position === 'fixed') {
	    return null;
	  }
	  if (polyfill) {
	    return polyfill(element);
	  }
	  return element.offsetParent;
	}

	// Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.
	function getOffsetParent(element, polyfill) {
	  const window = getWindow(element);
	  if (!isHTMLElement(element)) {
	    return window;
	  }
	  let offsetParent = getTrueOffsetParent(element, polyfill);
	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	  }
	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle(offsetParent).position === 'static' && !isContainingBlock(offsetParent))) {
	    return window;
	  }
	  return offsetParent || getContainingBlock(element) || window;
	}
	const getElementRects = async function getElementRects(_ref) {
	  let {
	    reference,
	    floating,
	    strategy
	  } = _ref;
	  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	  const getDimensionsFn = this.getDimensions;
	  return {
	    reference: getRectRelativeToOffsetParent(reference, await getOffsetParentFn(floating), strategy),
	    floating: _extends({
	      x: 0,
	      y: 0
	    }, await getDimensionsFn(floating))
	  };
	};
	function isRTL(element) {
	  return getComputedStyle(element).direction === 'rtl';
	}
	const platform = {
	  convertOffsetParentRelativeRectToViewportRelativeRect,
	  getDocumentElement,
	  getClippingRect,
	  getOffsetParent,
	  getElementRects,
	  getClientRects,
	  getDimensions,
	  getScale,
	  isElement,
	  isRTL
	};

	// https://samthor.au/2021/observing-dom/
	function observeMove(element, onMove) {
	  let io = null;
	  let timeoutId;
	  const root = getDocumentElement(element);
	  function cleanup() {
	    clearTimeout(timeoutId);
	    io && io.disconnect();
	    io = null;
	  }
	  function refresh(skip, threshold) {
	    if (skip === void 0) {
	      skip = false;
	    }
	    if (threshold === void 0) {
	      threshold = 1;
	    }
	    cleanup();
	    const {
	      left,
	      top,
	      width,
	      height
	    } = element.getBoundingClientRect();
	    if (!skip) {
	      onMove();
	    }
	    if (!width || !height) {
	      return;
	    }
	    const insetTop = floor(top);
	    const insetRight = floor(root.clientWidth - (left + width));
	    const insetBottom = floor(root.clientHeight - (top + height));
	    const insetLeft = floor(left);
	    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
	    const options = {
	      rootMargin,
	      threshold: max(0, min(1, threshold)) || 1
	    };
	    let isFirstUpdate = true;
	    function handleObserve(entries) {
	      const ratio = entries[0].intersectionRatio;
	      if (ratio !== threshold) {
	        if (!isFirstUpdate) {
	          return refresh();
	        }
	        if (!ratio) {
	          timeoutId = setTimeout(() => {
	            refresh(false, 1e-7);
	          }, 100);
	        } else {
	          refresh(false, ratio);
	        }
	      }
	      isFirstUpdate = false;
	    }

	    // Older browsers don't support a `document` as the root and will throw an
	    // error.
	    try {
	      io = new IntersectionObserver(handleObserve, _extends({}, options, {
	        // Handle <iframe>s
	        root: root.ownerDocument
	      }));
	    } catch (e) {
	      io = new IntersectionObserver(handleObserve, options);
	    }
	    io.observe(element);
	  }
	  refresh(true);
	  return cleanup;
	}

	/**
	 * Automatically updates the position of the floating element when necessary.
	 * Should only be called when the floating element is mounted on the DOM or
	 * visible on the screen.
	 * @returns cleanup function that should be invoked when the floating element is
	 * removed from the DOM or hidden from the screen.
	 * @see https://floating-ui.com/docs/autoUpdate
	 */
	function autoUpdate(reference, floating, update, options) {
	  if (options === void 0) {
	    options = {};
	  }
	  const {
	    ancestorScroll = true,
	    ancestorResize = true,
	    elementResize = typeof ResizeObserver === 'function',
	    layoutShift = typeof IntersectionObserver === 'function',
	    animationFrame = false
	  } = options;
	  const referenceEl = unwrapElement(reference);
	  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
	  ancestors.forEach(ancestor => {
	    ancestorScroll && ancestor.addEventListener('scroll', update, {
	      passive: true
	    });
	    ancestorResize && ancestor.addEventListener('resize', update);
	  });
	  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
	  let reobserveFrame = -1;
	  let resizeObserver = null;
	  if (elementResize) {
	    resizeObserver = new ResizeObserver(_ref => {
	      let [firstEntry] = _ref;
	      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
	        // Prevent update loops when using the `size` middleware.
	        // https://github.com/floating-ui/floating-ui/issues/1740
	        resizeObserver.unobserve(floating);
	        cancelAnimationFrame(reobserveFrame);
	        reobserveFrame = requestAnimationFrame(() => {
	          resizeObserver && resizeObserver.observe(floating);
	        });
	      }
	      update();
	    });
	    if (referenceEl && !animationFrame) {
	      resizeObserver.observe(referenceEl);
	    }
	    resizeObserver.observe(floating);
	  }
	  let frameId;
	  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	  if (animationFrame) {
	    frameLoop();
	  }
	  function frameLoop() {
	    const nextRefRect = getBoundingClientRect(reference);
	    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
	      update();
	    }
	    prevRefRect = nextRefRect;
	    frameId = requestAnimationFrame(frameLoop);
	  }
	  update();
	  return () => {
	    ancestors.forEach(ancestor => {
	      ancestorScroll && ancestor.removeEventListener('scroll', update);
	      ancestorResize && ancestor.removeEventListener('resize', update);
	    });
	    cleanupIo && cleanupIo();
	    resizeObserver && resizeObserver.disconnect();
	    resizeObserver = null;
	    if (animationFrame) {
	      cancelAnimationFrame(frameId);
	    }
	  };
	}

	/**
	 * Computes the `x` and `y` coordinates that will place the floating element
	 * next to a reference element when it is given a certain CSS positioning
	 * strategy.
	 */
	const computePosition = (reference, floating, options) => {
	  // This caches the expensive `getClippingElementAncestors` function so that
	  // multiple lifecycle resets re-use the same result. It only lives for a
	  // single call. If other functions become expensive, we can add them as well.
	  const cache = new Map();
	  const mergedOptions = _extends({
	    platform
	  }, options);
	  const platformWithCache = _extends({}, mergedOptions.platform, {
	    _c: cache
	  });
	  return computePosition$1(reference, floating, _extends({}, mergedOptions, {
	    platform: platformWithCache
	  }));
	};

	/**
	 * Floating UI Options
	 *
	 * @typedef {object} FloatingUIOptions
	 */

	/**
	 * Determines options for the tooltip and initializes event listeners.
	 *
	 * @param {Step} step The step instance
	 *
	 * @return {FloatingUIOptions}
	 */
	function setupTooltip(step) {
	  if (step.cleanup) {
	    step.cleanup();
	  }
	  const attachToOptions = step._getResolvedAttachToOptions();
	  let target = attachToOptions.element;
	  const floatingUIOptions = getFloatingUIOptions(attachToOptions, step);
	  const shouldCenter = shouldCenterStep(attachToOptions);
	  if (shouldCenter) {
	    target = document.body;
	    const content = step.shepherdElementComponent.getElement();
	    content.classList.add('shepherd-centered');
	  }
	  step.cleanup = autoUpdate(target, step.el, () => {
	    // The element might have already been removed by the end of the tour.
	    if (!step.el) {
	      step.cleanup();
	      return;
	    }
	    setPosition(target, step, floatingUIOptions, shouldCenter);
	  });
	  step.target = attachToOptions.element;
	  return floatingUIOptions;
	}

	/**
	 * Merge tooltip options handling nested keys.
	 *
	 * @param tourOptions - The default tour options.
	 * @param options - Step specific options.
	 *
	 * @return {floatingUIOptions: FloatingUIOptions}
	 */
	function mergeTooltipConfig(tourOptions, options) {
	  return {
	    floatingUIOptions: cjs(tourOptions.floatingUIOptions || {}, options.floatingUIOptions || {})
	  };
	}

	/**
	 * Cleanup function called when the step is closed/destroyed.
	 *
	 * @param {Step} step
	 */
	function destroyTooltip(step) {
	  if (step.cleanup) {
	    step.cleanup();
	  }
	  step.cleanup = null;
	}

	/**
	 *
	 * @return {Promise<*>}
	 */
	function setPosition(target, step, floatingUIOptions, shouldCenter) {
	  return computePosition(target, step.el, floatingUIOptions).then(floatingUIposition(step, shouldCenter))
	  // Wait before forcing focus.
	  .then(step => new Promise(resolve => {
	    setTimeout(() => resolve(step), 300);
	  }))
	  // Replaces focusAfterRender modifier.
	  .then(step => {
	    if (step && step.el) {
	      step.el.focus({
	        preventScroll: true
	      });
	    }
	  });
	}

	/**
	 *
	 * @param step
	 * @param shouldCenter
	 * @return {function({x: *, y: *, placement: *, middlewareData: *}): Promise<unknown>}
	 */
	function floatingUIposition(step, shouldCenter) {
	  return ({
	    x,
	    y,
	    placement,
	    middlewareData
	  }) => {
	    if (!step.el) {
	      return step;
	    }
	    if (shouldCenter) {
	      Object.assign(step.el.style, {
	        position: 'fixed',
	        left: '50%',
	        top: '50%',
	        transform: 'translate(-50%, -50%)'
	      });
	    } else {
	      Object.assign(step.el.style, {
	        position: 'absolute',
	        left: `${x}px`,
	        top: `${y}px`
	      });
	    }
	    step.el.dataset.popperPlacement = placement;
	    placeArrow(step.el, middlewareData);
	    return step;
	  };
	}

	/**
	 *
	 * @param el
	 * @param middlewareData
	 */
	function placeArrow(el, middlewareData) {
	  const arrowEl = el.querySelector('.shepherd-arrow');
	  if (arrowEl && middlewareData.arrow) {
	    const {
	      x: arrowX,
	      y: arrowY
	    } = middlewareData.arrow;
	    Object.assign(arrowEl.style, {
	      left: arrowX != null ? `${arrowX}px` : '',
	      top: arrowY != null ? `${arrowY}px` : ''
	    });
	  }
	}

	/**
	 * Gets the `Floating UI` options from a set of base `attachTo` options
	 * @param attachToOptions
	 * @param {Step} step The step instance
	 * @return {Object}
	 * @private
	 */
	function getFloatingUIOptions(attachToOptions, step) {
	  const options = {
	    strategy: 'absolute',
	    middleware: []
	  };
	  const arrowEl = addArrow(step);
	  const shouldCenter = shouldCenterStep(attachToOptions);
	  if (!shouldCenter) {
	    options.middleware.push(flip(),
	    // Replicate PopperJS default behavior.
	    shift({
	      limiter: limitShift(),
	      crossAxis: true
	    }));
	    if (arrowEl) {
	      options.middleware.push(arrow({
	        element: arrowEl
	      }));
	    }
	    options.placement = attachToOptions.on;
	  }
	  return cjs(step.options.floatingUIOptions || {}, options);
	}

	/**
	 * @param {Step} step
	 * @return {HTMLElement|false|null}
	 */
	function addArrow(step) {
	  if (step.options.arrow && step.el) {
	    return step.el.querySelector('.shepherd-arrow');
	  }
	  return false;
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
	  if (node.parentNode) {
	    node.parentNode.removeChild(node);
	  }
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
	/**
	 * List of attributes that should always be set through the attr method,
	 * because updating them through the property setter doesn't work reliably.
	 * In the example of `width`/`height`, the problem is that the setter only
	 * accepts numeric values, but the attribute can also be set to a string like `50%`.
	 * If this list becomes too big, rethink this approach.
	 */
	const always_set_through_set_attribute = ['width', 'height'];
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
	    } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
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
	/**
	 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
	 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
	 * it can be called from an external module).
	 *
	 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
	 *
	 * https://svelte.dev/docs#run-time-svelte-onmount
	 */
	function onMount(fn) {
	  get_current_component().$$.on_mount.push(fn);
	}
	/**
	 * Schedules a callback to run immediately after the component has been updated.
	 *
	 * The first time the callback runs will be after the initial `onMount`
	 */
	function afterUpdate(fn) {
	  get_current_component().$$.after_update.push(fn);
	}
	const dirty_components = [];
	const binding_callbacks = [];
	let render_callbacks = [];
	const flush_callbacks = [];
	const resolved_promise = /* @__PURE__ */Promise.resolve();
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
	// flush() calls callbacks in this order:
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
	  // Do not reenter flush while dirty components are updated, as this can
	  // result in an infinite loop. Instead, let the inner flush handle it.
	  // Reentrancy is ok afterwards for bindings etc.
	  if (flushidx !== 0) {
	    return;
	  }
	  const saved_component = current_component;
	  do {
	    // first, call beforeUpdate functions
	    // and update components
	    try {
	      while (flushidx < dirty_components.length) {
	        const component = dirty_components[flushidx];
	        flushidx++;
	        set_current_component(component);
	        update(component.$$);
	      }
	    } catch (e) {
	      // reset dirty state to not end up in a deadlocked state and then rethrow
	      dirty_components.length = 0;
	      flushidx = 0;
	      throw e;
	    }
	    set_current_component(null);
	    dirty_components.length = 0;
	    flushidx = 0;
	    while (binding_callbacks.length) binding_callbacks.pop()();
	    // then, once components are updated, call
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
	/**
	 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
	 */
	function flush_render_callbacks(fns) {
	  const filtered = [];
	  const targets = [];
	  render_callbacks.forEach(c => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
	  targets.forEach(c => c());
	  render_callbacks = filtered;
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
	    after_update
	  } = component.$$;
	  fragment && fragment.m(target, anchor);
	  if (!customElement) {
	    // onMount happens before the initial afterUpdate
	    add_render_callback(() => {
	      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
	      // if the component was destroyed immediately
	      // it will update the `$$.on_destroy` reference to `null`.
	      // the destructured on_destroy may still reference to the old array
	      if (component.$$.on_destroy) {
	        component.$$.on_destroy.push(...new_on_destroy);
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
	    flush_render_callbacks($$.after_update);
	    run_all($$.on_destroy);
	    $$.fragment && $$.fragment.d(detaching);
	    // TODO null out other refs, including component.$$ (but need to
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
	function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
	  const parent_component = current_component;
	  set_current_component(component);
	  const $$ = component.$$ = {
	    fragment: null,
	    ctx: [],
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
	  $$.ctx = instance ? instance(component, options.props || {}, (i, ret, ...rest) => {
	    const value = rest.length ? rest[0] : ret;
	    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
	      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
	      if (ready) make_dirty(component, i);
	    }
	    return ret;
	  }) : [];
	  $$.update();
	  ready = true;
	  run_all($$.before_update);
	  // `false` as a special case of no DOM component
	  $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	  if (options.target) {
	    if (options.hydrate) {
	      const nodes = children(options.target);
	      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
	    if (!is_function(callback)) {
	      return noop;
	    }
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

	/* src/js/components/shepherd-button.svelte generated by Svelte v3.59.2 */
	function create_fragment$8(ctx) {
	  let button;
	  let button_aria_label_value;
	  let button_class_value;
	  let mounted;
	  let dispose;
	  return {
	    c() {
	      button = element("button");
	      attr(button, "aria-label", button_aria_label_value = /*label*/ctx[3] ? /*label*/ctx[3] : null);
	      attr(button, "class", button_class_value = `${/*classes*/ctx[1] || ''} shepherd-button ${/*secondary*/ctx[4] ? 'shepherd-button-secondary' : ''}`);
	      button.disabled = /*disabled*/ctx[2];
	      attr(button, "tabindex", "0");
	    },
	    m(target, anchor) {
	      insert(target, button, anchor);
	      button.innerHTML = /*text*/ctx[5];
	      if (!mounted) {
	        dispose = listen(button, "click", function () {
	          if (is_function( /*action*/ctx[0])) /*action*/ctx[0].apply(this, arguments);
	        });
	        mounted = true;
	      }
	    },
	    p(new_ctx, [dirty]) {
	      ctx = new_ctx;
	      if (dirty & /*text*/32) button.innerHTML = /*text*/ctx[5];
	      if (dirty & /*label*/8 && button_aria_label_value !== (button_aria_label_value = /*label*/ctx[3] ? /*label*/ctx[3] : null)) {
	        attr(button, "aria-label", button_aria_label_value);
	      }
	      if (dirty & /*classes, secondary*/18 && button_class_value !== (button_class_value = `${/*classes*/ctx[1] || ''} shepherd-button ${/*secondary*/ctx[4] ? 'shepherd-button-secondary' : ''}`)) {
	        attr(button, "class", button_class_value);
	      }
	      if (dirty & /*disabled*/4) {
	        button.disabled = /*disabled*/ctx[2];
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
	    if ($$self.$$.dirty & /*config, step*/192) {
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

	/* src/js/components/shepherd-footer.svelte generated by Svelte v3.59.2 */
	function get_each_context(ctx, list, i) {
	  const child_ctx = ctx.slice();
	  child_ctx[2] = list[i];
	  return child_ctx;
	}

	// (24:4) {#if buttons}
	function create_if_block$3(ctx) {
	  let each_1_anchor;
	  let current;
	  let each_value = /*buttons*/ctx[1];
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
	        if (each_blocks[i]) {
	          each_blocks[i].m(target, anchor);
	        }
	      }
	      insert(target, each_1_anchor, anchor);
	      current = true;
	    },
	    p(ctx, dirty) {
	      if (dirty & /*buttons, step*/3) {
	        each_value = /*buttons*/ctx[1];
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
	}

	// (25:8) {#each buttons as config}
	function create_each_block(ctx) {
	  let shepherdbutton;
	  let current;
	  shepherdbutton = new Shepherd_button({
	    props: {
	      config: /*config*/ctx[2],
	      step: /*step*/ctx[0]
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
	      if (dirty & /*buttons*/2) shepherdbutton_changes.config = /*config*/ctx[2];
	      if (dirty & /*step*/1) shepherdbutton_changes.step = /*step*/ctx[0];
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
	  let if_block = /*buttons*/ctx[1] && create_if_block$3(ctx);
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
	    p(ctx, [dirty]) {
	      if ( /*buttons*/ctx[1]) {
	        if (if_block) {
	          if_block.p(ctx, dirty);
	          if (dirty & /*buttons*/2) {
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
	    if ($$self.$$.dirty & /*step*/1) {
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

	/* src/js/components/shepherd-cancel-icon.svelte generated by Svelte v3.59.2 */
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
	      attr(button, "aria-label", button_aria_label_value = /*cancelIcon*/ctx[0].label ? /*cancelIcon*/ctx[0].label : 'Close Tour');
	      attr(button, "class", "shepherd-cancel-icon");
	      attr(button, "type", "button");
	    },
	    m(target, anchor) {
	      insert(target, button, anchor);
	      append(button, span);
	      if (!mounted) {
	        dispose = listen(button, "click", /*handleCancelClick*/ctx[1]);
	        mounted = true;
	      }
	    },
	    p(ctx, [dirty]) {
	      if (dirty & /*cancelIcon*/1 && button_aria_label_value !== (button_aria_label_value = /*cancelIcon*/ctx[0].label ? /*cancelIcon*/ctx[0].label : 'Close Tour')) {
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

	/* src/js/components/shepherd-title.svelte generated by Svelte v3.59.2 */
	function create_fragment$5(ctx) {
	  let h3;
	  return {
	    c() {
	      h3 = element("h3");
	      attr(h3, "id", /*labelId*/ctx[1]);
	      attr(h3, "class", "shepherd-title");
	    },
	    m(target, anchor) {
	      insert(target, h3, anchor);
	      /*h3_binding*/
	      ctx[3](h3);
	    },
	    p(ctx, [dirty]) {
	      if (dirty & /*labelId*/2) {
	        attr(h3, "id", /*labelId*/ctx[1]);
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

	/* src/js/components/shepherd-header.svelte generated by Svelte v3.59.2 */
	function create_if_block_1$1(ctx) {
	  let shepherdtitle;
	  let current;
	  shepherdtitle = new Shepherd_title({
	    props: {
	      labelId: /*labelId*/ctx[0],
	      title: /*title*/ctx[2]
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
	      if (dirty & /*labelId*/1) shepherdtitle_changes.labelId = /*labelId*/ctx[0];
	      if (dirty & /*title*/4) shepherdtitle_changes.title = /*title*/ctx[2];
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
	}

	// (39:4) {#if cancelIcon && cancelIcon.enabled}
	function create_if_block$2(ctx) {
	  let shepherdcancelicon;
	  let current;
	  shepherdcancelicon = new Shepherd_cancel_icon({
	    props: {
	      cancelIcon: /*cancelIcon*/ctx[3],
	      step: /*step*/ctx[1]
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
	      if (dirty & /*cancelIcon*/8) shepherdcancelicon_changes.cancelIcon = /*cancelIcon*/ctx[3];
	      if (dirty & /*step*/2) shepherdcancelicon_changes.step = /*step*/ctx[1];
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
	  let if_block0 = /*title*/ctx[2] && create_if_block_1$1(ctx);
	  let if_block1 = /*cancelIcon*/ctx[3] && /*cancelIcon*/ctx[3].enabled && create_if_block$2(ctx);
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
	    p(ctx, [dirty]) {
	      if ( /*title*/ctx[2]) {
	        if (if_block0) {
	          if_block0.p(ctx, dirty);
	          if (dirty & /*title*/4) {
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
	      if ( /*cancelIcon*/ctx[3] && /*cancelIcon*/ctx[3].enabled) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	          if (dirty & /*cancelIcon*/8) {
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
	    if ($$self.$$.dirty & /*step*/2) {
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

	/* src/js/components/shepherd-text.svelte generated by Svelte v3.59.2 */
	function create_fragment$3(ctx) {
	  let div;
	  return {
	    c() {
	      div = element("div");
	      attr(div, "class", "shepherd-text");
	      attr(div, "id", /*descriptionId*/ctx[1]);
	    },
	    m(target, anchor) {
	      insert(target, div, anchor);
	      /*div_binding*/
	      ctx[3](div);
	    },
	    p(ctx, [dirty]) {
	      if (dirty & /*descriptionId*/2) {
	        attr(div, "id", /*descriptionId*/ctx[1]);
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

	/* src/js/components/shepherd-content.svelte generated by Svelte v3.59.2 */
	function create_if_block_2(ctx) {
	  let shepherdheader;
	  let current;
	  shepherdheader = new Shepherd_header({
	    props: {
	      labelId: /*labelId*/ctx[1],
	      step: /*step*/ctx[2]
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
	      if (dirty & /*labelId*/2) shepherdheader_changes.labelId = /*labelId*/ctx[1];
	      if (dirty & /*step*/4) shepherdheader_changes.step = /*step*/ctx[2];
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
	}

	// (28:2) {#if !isUndefined(step.options.text)}
	function create_if_block_1(ctx) {
	  let shepherdtext;
	  let current;
	  shepherdtext = new Shepherd_text({
	    props: {
	      descriptionId: /*descriptionId*/ctx[0],
	      step: /*step*/ctx[2]
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
	      if (dirty & /*descriptionId*/1) shepherdtext_changes.descriptionId = /*descriptionId*/ctx[0];
	      if (dirty & /*step*/4) shepherdtext_changes.step = /*step*/ctx[2];
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
	}

	// (35:2) {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
	function create_if_block$1(ctx) {
	  let shepherdfooter;
	  let current;
	  shepherdfooter = new Shepherd_footer({
	    props: {
	      step: /*step*/ctx[2]
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
	      if (dirty & /*step*/4) shepherdfooter_changes.step = /*step*/ctx[2];
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
	  let show_if_2 = !isUndefined( /*step*/ctx[2].options.title) || /*step*/ctx[2].options.cancelIcon && /*step*/ctx[2].options.cancelIcon.enabled;
	  let t0;
	  let show_if_1 = !isUndefined( /*step*/ctx[2].options.text);
	  let t1;
	  let show_if = Array.isArray( /*step*/ctx[2].options.buttons) && /*step*/ctx[2].options.buttons.length;
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
	    p(ctx, [dirty]) {
	      if (dirty & /*step*/4) show_if_2 = !isUndefined( /*step*/ctx[2].options.title) || /*step*/ctx[2].options.cancelIcon && /*step*/ctx[2].options.cancelIcon.enabled;
	      if (show_if_2) {
	        if (if_block0) {
	          if_block0.p(ctx, dirty);
	          if (dirty & /*step*/4) {
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
	      if (dirty & /*step*/4) show_if_1 = !isUndefined( /*step*/ctx[2].options.text);
	      if (show_if_1) {
	        if (if_block1) {
	          if_block1.p(ctx, dirty);
	          if (dirty & /*step*/4) {
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
	      if (dirty & /*step*/4) show_if = Array.isArray( /*step*/ctx[2].options.buttons) && /*step*/ctx[2].options.buttons.length;
	      if (show_if) {
	        if (if_block2) {
	          if_block2.p(ctx, dirty);
	          if (dirty & /*step*/4) {
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

	/* src/js/components/shepherd-element.svelte generated by Svelte v3.59.2 */
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
	  let if_block = /*step*/ctx[4].options.arrow && /*step*/ctx[4].options.attachTo && /*step*/ctx[4].options.attachTo.element && /*step*/ctx[4].options.attachTo.on && create_if_block();
	  shepherdcontent = new Shepherd_content({
	    props: {
	      descriptionId: /*descriptionId*/ctx[2],
	      labelId: /*labelId*/ctx[3],
	      step: /*step*/ctx[4]
	    }
	  });
	  let div_levels = [{
	    "aria-describedby": div_aria_describedby_value = !isUndefined( /*step*/ctx[4].options.text) ? /*descriptionId*/ctx[2] : null
	  }, {
	    "aria-labelledby": div_aria_labelledby_value = /*step*/ctx[4].options.title ? /*labelId*/ctx[3] : null
	  }, /*dataStepId*/ctx[1], {
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
	      toggle_class(div, "shepherd-has-cancel-icon", /*hasCancelIcon*/ctx[5]);
	      toggle_class(div, "shepherd-has-title", /*hasTitle*/ctx[6]);
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
	        dispose = listen(div, "keydown", /*handleKeyDown*/ctx[7]);
	        mounted = true;
	      }
	    },
	    p(ctx, [dirty]) {
	      if ( /*step*/ctx[4].options.arrow && /*step*/ctx[4].options.attachTo && /*step*/ctx[4].options.attachTo.element && /*step*/ctx[4].options.attachTo.on) {
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
	      if (dirty & /*descriptionId*/4) shepherdcontent_changes.descriptionId = /*descriptionId*/ctx[2];
	      if (dirty & /*labelId*/8) shepherdcontent_changes.labelId = /*labelId*/ctx[3];
	      if (dirty & /*step*/16) shepherdcontent_changes.step = /*step*/ctx[4];
	      shepherdcontent.$set(shepherdcontent_changes);
	      set_attributes(div, div_data = get_spread_update(div_levels, [(!current || dirty & /*step, descriptionId*/20 && div_aria_describedby_value !== (div_aria_describedby_value = !isUndefined( /*step*/ctx[4].options.text) ? /*descriptionId*/ctx[2] : null)) && {
	        "aria-describedby": div_aria_describedby_value
	      }, (!current || dirty & /*step, labelId*/24 && div_aria_labelledby_value !== (div_aria_labelledby_value = /*step*/ctx[4].options.title ? /*labelId*/ctx[3] : null)) && {
	        "aria-labelledby": div_aria_labelledby_value
	      }, dirty & /*dataStepId*/2 && /*dataStepId*/ctx[1], {
	        role: "dialog"
	      }, {
	        tabindex: "0"
	      }]));
	      toggle_class(div, "shepherd-has-cancel-icon", /*hasCancelIcon*/ctx[5]);
	      toggle_class(div, "shepherd-has-title", /*hasTitle*/ctx[6]);
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
	        }
	        // Backward tab
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
	          e.stopPropagation();
	          step.cancel();
	        }
	        break;
	      case LEFT_ARROW:
	        if (tour.options.keyboardNavigation) {
	          e.stopPropagation();
	          tour.back();
	        }
	        break;
	      case RIGHT_ARROW:
	        if (tour.options.keyboardNavigation) {
	          e.stopPropagation();
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
	    if ($$self.$$.dirty & /*step*/16) {
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
	   * @param {string} options.attachTo.on The optional direction to place the FloatingUI tooltip relative to the element.
	   *   - Possible string values: 'top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'right', 'right-start', 'right-end', 'left', 'left-start', 'left-end'
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
	   * @param {number | { topLeft: number, bottomLeft: number, bottomRight: number, topRight: number }} options.modalOverlayOpeningRadius An amount of border radius to add around the modal overlay opening
	   * @param {object} options.floatingUIOptions Extra options to pass to FloatingUI
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
	  constructor(tour, options = {}) {
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
	   * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
	   * Triggers `destroy` event
	   */
	  destroy() {
	    destroyTooltip(this);
	    if (isHTMLElement$1(this.el)) {
	      this.el.remove();
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
	      return Promise.resolve(this.options.beforeShowPromise()).then(() => this._show());
	    }
	    return Promise.resolve(this._show());
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
	  _setOptions(options = {}) {
	    let tourOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
	    tourOptions = cjs({}, tourOptions || {});
	    this.options = Object.assign({
	      arrow: true
	    }, tourOptions, options, mergeTooltipConfig(tourOptions, options));
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
	   * Create the element and set up the FloatingUI instance
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

	    // The tooltip implementation details are handled outside of the Step
	    // object.
	    setupTooltip(this);
	  }

	  /**
	   * Triggers `before-show`, generates the tooltip DOM content,
	   * sets up a FloatingUI instance for the tooltip, then triggers `show`.
	   * @private
	   */
	  _show() {
	    this.trigger('before-show');

	    // Force resolve to make sure the options are updated on subsequent shows.
	    this._resolveAttachToOptions();
	    this._setupElements();
	    if (!this.tour.modal) {
	      this.tour._setupModal();
	    }
	    this.tour.modal.setupForStep(this);
	    this._styleTargetElementForStep(this);
	    this.el.hidden = false;

	    // start scrolling to target before showing the step
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
	 * @param {number | { topLeft: number, topRight: number, bottomRight: number, bottomLeft: number }} [r=0] - Corner Radius. Keep this smaller than half of width or height.
	 * @returns {string} - Rounded rectangle overlay path data.
	 */
	function makeOverlayPath({
	  width,
	  height,
	  x = 0,
	  y = 0,
	  r = 0
	}) {
	  const {
	    innerWidth: w,
	    innerHeight: h
	  } = window;
	  const {
	    topLeft = 0,
	    topRight = 0,
	    bottomRight = 0,
	    bottomLeft = 0
	  } = typeof r === 'number' ? {
	    topLeft: r,
	    topRight: r,
	    bottomRight: r,
	    bottomLeft: r
	  } : r;
	  return `M${w},${h}\
H0\
V0\
H${w}\
V${h}\
Z\
M${x + topLeft},${y}\
a${topLeft},${topLeft},0,0,0-${topLeft},${topLeft}\
V${height + y - bottomLeft}\
a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}\
H${width + x - bottomRight}\
a${bottomRight},${bottomRight},0,0,0,${bottomRight}-${bottomRight}\
V${y + topRight}\
a${topRight},${topRight},0,0,0-${topRight}-${topRight}\
Z`;
	}

	/* src/js/components/shepherd-modal.svelte generated by Svelte v3.59.2 */
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
	      attr(path, "d", /*pathDefinition*/ctx[2]);
	      attr(svg, "class", svg_class_value = `${/*modalIsVisible*/ctx[1] ? 'shepherd-modal-is-visible' : ''} shepherd-modal-overlay-container`);
	    },
	    m(target, anchor) {
	      insert(target, svg, anchor);
	      append(svg, path);
	      /*svg_binding*/
	      ctx[11](svg);
	      if (!mounted) {
	        dispose = listen(svg, "touchmove", /*_preventModalOverlayTouch*/ctx[3]);
	        mounted = true;
	      }
	    },
	    p(ctx, [dirty]) {
	      if (dirty & /*pathDefinition*/4) {
	        attr(path, "d", /*pathDefinition*/ctx[2]);
	      }
	      if (dirty & /*modalIsVisible*/2 && svg_class_value !== (svg_class_value = `${/*modalIsVisible*/ctx[1] ? 'shepherd-modal-is-visible' : ''} shepherd-modal-overlay-container`)) {
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
	    $$invalidate(1, modalIsVisible = false);

	    // Ensure we cleanup all event listeners when we hide the modal
	    _cleanupStepEventListeners();
	  }
	  function positionModal(modalOverlayOpeningPadding = 0, modalOverlayOpeningRadius = 0, scrollParent, targetElement) {
	    if (targetElement) {
	      const {
	        y,
	        height
	      } = _getVisibleHeight(targetElement, scrollParent);
	      const {
	        x,
	        width,
	        left
	      } = targetElement.getBoundingClientRect();

	      // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
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
	    const scrollParent = _getScrollParent(step.target);

	    // Setup recursive function to call requestAnimationFrame to update the modal opening position
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
	    if ($$self.$$.dirty & /*openingProperties*/16) {
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
	   * @param {boolean | function(): boolean | Promise<boolean> | function(): Promise<boolean>} options.confirmCancel If true, will issue a `window.confirm` before cancelling.
	   * If it is a function(support Async Function), it will be called and wait for the return value, and will only be cancelled if the value returned is true
	   * @param {string} options.confirmCancelMessage The message to display in the `window.confirm` dialog
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
	   * dynamically generated `id` property.
	   * @param {boolean} options.useModalOverlay Whether or not steps should be placed above a darkened
	   * modal overlay. If true, the overlay will create an opening around the target element so that it
	   * can remain interactive
	   * @returns {Tour}
	   */
	  constructor(options = {}) {
	    super(options);
	    autoBind(this);
	    const defaultTourOptions = {
	      exitOnEsc: true,
	      keyboardNavigation: true
	    };
	    this.options = Object.assign({}, defaultTourOptions, options);
	    this.classPrefix = normalizePrefix(this.options.classPrefix);
	    this.steps = [];
	    this.addSteps(this.options.steps);

	    // Pass these events onto the global Shepherd object
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
	   * If `confirmCancel` is a function, will call it and wait for the return value,
	   * and only cancel when the value returned is true
	   */
	  async cancel() {
	    if (this.options.confirmCancel) {
	      const confirmCancelIsFunction = typeof this.options.confirmCancel === 'function';
	      const cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
	      const stopTour = confirmCancelIsFunction ? await this.options.confirmCancel() : window.confirm(cancelMessage);
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
	    const current = this.getCurrentStep();

	    // Find the step, destroy it and remove it from this.steps
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
	      this.currentStep = undefined;

	      // If we have steps left, show the first one, otherwise just cancel the tour
	      this.steps.length ? this.show(0) : this.cancel();
	    }
	  }

	  /**
	   * Show a specific step in the tour
	   * @param {Number|String} key The key to look up the step by
	   * @param {Boolean} forward True if we are going forward, false if backward
	   */
	  show(key = 0, forward = true) {
	    const step = isString(key) ? this.getById(key) : this.steps[key];
	    if (step) {
	      this._updateStateBeforeShow();
	      const shouldSkipStep = isFunction(step.options.showOn) && !step.options.showOn();

	      // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal
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

	    // Save the focused element before the tour opens
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
	    }

	    // Focus the element that was focused before the tour started
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

	const isServerSide = typeof window === 'undefined';
	class NoOp {
	  constructor() {}
	}
	if (isServerSide) {
	  Object.assign(Shepherd, {
	    Tour: NoOp,
	    Step: NoOp
	  });
	} else {
	  Object.assign(Shepherd, {
	    Tour,
	    Step
	  });
	}

	return Shepherd;

}));
//# sourceMappingURL=shepherd.js.map
