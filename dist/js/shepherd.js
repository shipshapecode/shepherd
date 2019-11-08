/*! shepherd.js 6.0.2 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Shepherd = factory());
}(this, (function () { 'use strict';

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
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

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  /**
   * Checks if `value` is classified as a `Function` object.
   * @param {*} value The param to check if it is a function
   */
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

    _proto.on = function on(event, handler, ctx, once) {
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
        handler: handler,
        ctx: ctx,
        once: once
      });
      return this;
    };

    _proto.once = function once(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    _proto.off = function off(event, handler) {
      var _this = this;

      if (isUndefined(this.bindings) || isUndefined(this.bindings[event])) {
        return this;
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

      return this;
    };

    _proto.trigger = function trigger(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!isUndefined(this.bindings) && this.bindings[event]) {
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

      return this;
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

  function isUndefined$1(value) {
    return value === undefined;
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
        var targetIsSelector = !isUndefined$1(selector) && event.currentTarget.matches(selector);

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

      if (!isUndefined$1(selector) && !el) {
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

  /*! tether 2.0.0-beta.4 */
  function _inheritsLoose$1(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  function _assertThisInitialized$1(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }
  /**
   * Checks if `value` is classified as a `Function` object.
   * @param {*} value The param to check if it is a function
   */


  function isFunction$1(value) {
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
   * Checks if `value` is classified as an `Object`.
   * @param {*} value The param to check if it is an object
   */


  function isObject(value) {
    return typeof value === 'object';
  }
  /**
   * Checks if `value` is classified as a `String` object.
   * @param {*} value The param to check if it is a string
   */


  function isString$1(value) {
    return typeof value === 'string';
  }
  /**
   * Checks if `value` is undefined.
   * @param {*} value The param to check if it is undefined
   */


  function isUndefined$2(value) {
    return value === undefined;
  }

  function addClass(el, name) {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.add(cls);
      }
    });
  }
  /**
   * Get class string based on previously determined classes
   * @param  {String} [key=''] - default value for the classes object
   * @param  {Object} classes
   * @param  {String} classPrefix
   */


  function getClass(key, classes, classPrefix) {
    if (key === void 0) {
      key = '';
    }

    if (!isUndefined$2(classes) && !isUndefined$2(classes[key])) {
      if (classes[key] === false) {
        return '';
      }

      return classes[key];
    } else if (classPrefix) {
      return classPrefix + "-" + key;
    } else {
      return key;
    }
  }

  function removeClass(el, name) {
    name.split(' ').forEach(function (cls) {
      if (cls.trim()) {
        el.classList.remove(cls);
      }
    });
  }

  function updateClasses(el, add, all) {
    // Of the set of 'all' classes, we need the 'add' classes, and only the
    // 'add' classes to be set.
    all.forEach(function (cls) {
      if (add.indexOf(cls) === -1 && el.classList.contains(cls)) {
        removeClass(el, cls);
      }
    });
    add.forEach(function (cls) {
      if (!el.classList.contains(cls)) {
        addClass(el, cls);
      }
    });
  }

  var deferred = [];

  function defer(fn) {
    deferred.push(fn);
  }

  function flush() {
    var fn; // eslint-disable-next-line

    while (fn = deferred.pop()) {
      fn();
    }
  }

  var _scrollBarSize = null;

  function extend(out) {
    if (out === void 0) {
      out = {};
    }

    var args = [];
    Array.prototype.push.apply(args, arguments);
    args.slice(1).forEach(function (obj) {
      if (obj) {
        for (var key in obj) {
          if ({}.hasOwnProperty.call(obj, key)) {
            out[key] = obj[key];
          }
        }
      }
    });
    return out;
  }

  function getScrollBarSize() {
    if (_scrollBarSize) {
      return _scrollBarSize;
    }

    var inner = document.createElement('div');
    inner.style.width = '100%';
    inner.style.height = '200px';
    var outer = document.createElement('div');
    extend(outer.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      visibility: 'hidden',
      width: '200px',
      height: '150px',
      overflow: 'hidden'
    });
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var widthContained = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var widthScroll = inner.offsetWidth;

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth;
    }

    document.body.removeChild(outer);
    var width = widthContained - widthScroll;
    _scrollBarSize = {
      width: width,
      height: width
    };
    return _scrollBarSize;
  }

  var uniqueId = function () {
    var id = 0;
    return function () {
      return ++id;
    };
  }();

  var zeroPosCache = {};
  var zeroElement = null;

  function getBounds(el) {
    var doc;

    if (el === document) {
      doc = document;
      el = document.documentElement;
    } else {
      doc = el.ownerDocument;
    }

    var docEl = doc.documentElement;

    var box = _getActualBoundingClientRect(el);

    var origin = _getOrigin();

    box.top -= origin.top;
    box.left -= origin.left;

    if (isUndefined$2(box.width)) {
      box.width = document.body.scrollWidth - box.left - box.right;
    }

    if (isUndefined$2(box.height)) {
      box.height = document.body.scrollHeight - box.top - box.bottom;
    }

    box.top = box.top - docEl.clientTop;
    box.left = box.left - docEl.clientLeft;
    box.right = doc.body.clientWidth - box.width - box.left;
    box.bottom = doc.body.clientHeight - box.height - box.top;
    return box;
  }
  /**
   * Gets bounds for when target modifiier is 'scroll-handle'
   * @param target
   * @return {{left: number, width: number, height: number}}
   */


  function getScrollHandleBounds(target) {
    var bounds; // We have to do the check for the scrollTop and if target === document.body here and set to variables
    // because we may reset target below.

    var targetScrollTop = target.scrollTop;
    var targetIsBody = target === document.body;

    if (targetIsBody) {
      target = document.documentElement;
      bounds = {
        left: pageXOffset,
        top: pageYOffset,
        height: innerHeight,
        width: innerWidth
      };
    } else {
      bounds = getBounds(target);
    }

    var style = getComputedStyle(target);
    var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || !targetIsBody;
    var scrollBottom = 0;

    if (hasBottomScroll) {
      scrollBottom = 15;
    }

    var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
    var out = {
      width: 15,
      height: height * 0.975 * (height / target.scrollHeight),
      left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
    };
    var fitAdj = 0;

    if (height < 408 && targetIsBody) {
      fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
    }

    if (!targetIsBody) {
      out.height = Math.max(out.height, 24);
    }

    var scrollPercentage = targetScrollTop / (target.scrollHeight - height);
    out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

    if (targetIsBody) {
      out.height = Math.max(out.height, 24);
    }

    return out;
  }
  /**
   * Gets bounds for when target modifiier is 'visible
   * @param target
   * @return {{top: *, left: *, width: *, height: *}}
   */


  function getVisibleBounds(target) {
    if (target === document.body) {
      return {
        top: pageYOffset,
        left: pageXOffset,
        height: innerHeight,
        width: innerWidth
      };
    } else {
      var bounds = getBounds(target);
      var out = {
        height: bounds.height,
        width: bounds.width,
        top: bounds.top,
        left: bounds.left
      };
      out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
      out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
      out.height = Math.min(innerHeight, out.height);
      out.height -= 2;
      out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
      out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
      out.width = Math.min(innerWidth, out.width);
      out.width -= 2;

      if (out.top < pageYOffset) {
        out.top = pageYOffset;
      }

      if (out.left < pageXOffset) {
        out.left = pageXOffset;
      }

      return out;
    }
  }

  function removeUtilElements() {
    if (zeroElement) {
      document.body.removeChild(zeroElement);
    }

    zeroElement = null;
  }
  /**
   * Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
   * if the element lies within a nested document (<frame> or <iframe>-like).
   * @param node
   */


  function _getActualBoundingClientRect(node) {
    var boundingRect = node.getBoundingClientRect(); // The original object returned by getBoundingClientRect is immutable, so we clone it
    // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9

    var rect = {};

    for (var k in boundingRect) {
      rect[k] = boundingRect[k];
    }

    try {
      if (node.ownerDocument !== document) {
        var frameElement = node.ownerDocument.defaultView.frameElement;

        if (frameElement) {
          var frameRect = _getActualBoundingClientRect(frameElement);

          rect.top += frameRect.top;
          rect.bottom += frameRect.top;
          rect.left += frameRect.left;
          rect.right += frameRect.left;
        }
      }
    } catch (err) {// Ignore "Access is denied" in IE11/Edge
    }

    return rect;
  }

  function _getOrigin() {
    // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
    // jitter as the user scrolls that messes with our ability to detect if two positions
    // are equivilant or not.  We place an element at the top left of the page that will
    // get the same jitter, so we can cancel the two out.
    var node = zeroElement;

    if (!node || !document.body.contains(node)) {
      node = document.createElement('div');
      node.setAttribute('data-tether-id', uniqueId());
      extend(node.style, {
        top: 0,
        left: 0,
        position: 'absolute'
      });
      document.body.appendChild(node);
      zeroElement = node;
    }

    var id = node.getAttribute('data-tether-id');

    if (isUndefined$2(zeroPosCache[id])) {
      zeroPosCache[id] = _getActualBoundingClientRect(node); // Clear the cache when this position call is done

      defer(function () {
        delete zeroPosCache[id];
      });
    }

    return zeroPosCache[id];
  }

  var Abutment = {
    position: function position(_ref) {
      var _this = this;

      var top = _ref.top,
          left = _ref.left;

      var _this$cache = this.cache('element-bounds', function () {
        return getBounds(_this.element);
      }),
          height = _this$cache.height,
          width = _this$cache.width;

      var targetPos = this.getTargetBounds();
      var bottom = top + height;
      var right = left + width;
      var abutted = [];

      if (top <= targetPos.bottom && bottom >= targetPos.top) {
        ['left', 'right'].forEach(function (side) {
          var targetPosSide = targetPos[side];

          if (targetPosSide === left || targetPosSide === right) {
            abutted.push(side);
          }
        });
      }

      if (left <= targetPos.right && right >= targetPos.left) {
        ['top', 'bottom'].forEach(function (side) {
          var targetPosSide = targetPos[side];

          if (targetPosSide === top || targetPosSide === bottom) {
            abutted.push(side);
          }
        });
      }

      var sides = ['left', 'top', 'right', 'bottom'];
      var _this$options = this.options,
          classes = _this$options.classes,
          classPrefix = _this$options.classPrefix;
      this.all.push(getClass('abutted', classes, classPrefix));
      sides.forEach(function (side) {
        _this.all.push(getClass('abutted', classes, classPrefix) + "-" + side);
      });

      if (abutted.length) {
        this.add.push(getClass('abutted', classes, classPrefix));
      }

      abutted.forEach(function (side) {
        _this.add.push(getClass('abutted', classes, classPrefix) + "-" + side);
      });
      defer(function () {
        if (!(_this.options.addTargetClasses === false)) {
          updateClasses(_this.target, _this.add, _this.all);
        }

        updateClasses(_this.element, _this.add, _this.all);
      });
      return true;
    }
  };
  var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];
  /**
   * Returns an array of bounds of the format [left, top, right, bottom]
   * @param tether
   * @param to
   * @return {*[]|HTMLElement|ActiveX.IXMLDOMElement}
   */

  function getBoundingRect(tether, to) {
    if (to === 'scrollParent') {
      to = tether.scrollParents[0];
    } else if (to === 'window') {
      to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
    }

    if (to === document) {
      to = to.documentElement;
    }

    if (!isUndefined$2(to.nodeType)) {
      var node = to;
      var size = getBounds(to);
      var pos = size;
      var style = getComputedStyle(to);
      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top]; // Account any parent Frames scroll offset

      if (node.ownerDocument !== document) {
        var win = node.ownerDocument.defaultView;
        to[0] += win.pageXOffset;
        to[1] += win.pageYOffset;
        to[2] += win.pageXOffset;
        to[3] += win.pageYOffset;
      }

      BOUNDS_FORMAT.forEach(function (side, i) {
        side = side[0].toUpperCase() + side.substr(1);

        if (side === 'Top' || side === 'Left') {
          to[i] += parseFloat(style["border" + side + "Width"]);
        } else {
          to[i] -= parseFloat(style["border" + side + "Width"]);
        }
      });
    }

    return to;
  }
  /**
   * Add out of bounds classes to the list of classes we add to tether
   * @param {string[]} oob An array of directions that are out of bounds
   * @param {string[]} addClasses The array of classes to add to Tether
   * @param {string[]} classes The array of class types for Tether
   * @param {string} classPrefix The prefix to add to the front of the class
   * @param {string} outOfBoundsClass The class to apply when out of bounds
   * @private
   */


  function _addOutOfBoundsClass(oob, addClasses, classes, classPrefix, outOfBoundsClass) {
    if (oob.length) {
      var oobClass;

      if (!isUndefined$2(outOfBoundsClass)) {
        oobClass = outOfBoundsClass;
      } else {
        oobClass = getClass('out-of-bounds', classes, classPrefix);
      }

      addClasses.push(oobClass);
      oob.forEach(function (side) {
        addClasses.push(oobClass + "-" + side);
      });
    }
  }
  /**
   * Calculates if out of bounds or pinned in the X direction.
   *
   * @param {number} left
   * @param {number[]} bounds Array of bounds of the format [left, top, right, bottom]
   * @param {number} width
   * @param pin
   * @param pinned
   * @param {string[]} oob
   * @return {number}
   * @private
   */


  function _calculateOOBAndPinnedLeft(left, bounds, width, pin, pinned, oob) {
    if (left < bounds[0]) {
      if (pin.indexOf('left') >= 0) {
        left = bounds[0];
        pinned.push('left');
      } else {
        oob.push('left');
      }
    }

    if (left + width > bounds[2]) {
      if (pin.indexOf('right') >= 0) {
        left = bounds[2] - width;
        pinned.push('right');
      } else {
        oob.push('right');
      }
    }

    return left;
  }
  /**
   * Calculates if out of bounds or pinned in the Y direction.
   *
   * @param {number} top
   * @param {number[]} bounds Array of bounds of the format [left, top, right, bottom]
   * @param {number} height
   * @param pin
   * @param {string[]} pinned
   * @param {string[]} oob
   * @return {number}
   * @private
   */


  function _calculateOOBAndPinnedTop(top, bounds, height, pin, pinned, oob) {
    if (top < bounds[1]) {
      if (pin.indexOf('top') >= 0) {
        top = bounds[1];
        pinned.push('top');
      } else {
        oob.push('top');
      }
    }

    if (top + height > bounds[3]) {
      if (pin.indexOf('bottom') >= 0) {
        top = bounds[3] - height;
        pinned.push('bottom');
      } else {
        oob.push('bottom');
      }
    }

    return top;
  }
  /**
   * Flip X "together"
   * @param {object} tAttachment The target attachment
   * @param {object} eAttachment The element attachment
   * @param {number[]} bounds Array of bounds of the format [left, top, right, bottom]
   * @param {number} width
   * @param targetWidth
   * @param {number} left
   * @private
   */


  function _flipXTogether(tAttachment, eAttachment, bounds, width, targetWidth, left) {
    if (left < bounds[0] && tAttachment.left === 'left') {
      if (eAttachment.left === 'right') {
        left += targetWidth;
        tAttachment.left = 'right';
        left += width;
        eAttachment.left = 'left';
      } else if (eAttachment.left === 'left') {
        left += targetWidth;
        tAttachment.left = 'right';
        left -= width;
        eAttachment.left = 'right';
      }
    } else if (left + width > bounds[2] && tAttachment.left === 'right') {
      if (eAttachment.left === 'left') {
        left -= targetWidth;
        tAttachment.left = 'left';
        left -= width;
        eAttachment.left = 'right';
      } else if (eAttachment.left === 'right') {
        left -= targetWidth;
        tAttachment.left = 'left';
        left += width;
        eAttachment.left = 'left';
      }
    } else if (tAttachment.left === 'center') {
      if (left + width > bounds[2] && eAttachment.left === 'left') {
        left -= width;
        eAttachment.left = 'right';
      } else if (left < bounds[0] && eAttachment.left === 'right') {
        left += width;
        eAttachment.left = 'left';
      }
    }

    return left;
  }
  /**
   * Flip Y "together"
   * @param {object} tAttachment The target attachment
   * @param {object} eAttachment The element attachment
   * @param {number[]} bounds Array of bounds of the format [left, top, right, bottom]
   * @param {number} height
   * @param targetHeight
   * @param {number} top
   * @private
   */


  function _flipYTogether(tAttachment, eAttachment, bounds, height, targetHeight, top) {
    if (tAttachment.top === 'top') {
      if (eAttachment.top === 'bottom' && top < bounds[1]) {
        top += targetHeight;
        tAttachment.top = 'bottom';
        top += height;
        eAttachment.top = 'top';
      } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
        top -= height - targetHeight;
        tAttachment.top = 'bottom';
        eAttachment.top = 'bottom';
      }
    }

    if (tAttachment.top === 'bottom') {
      if (eAttachment.top === 'top' && top + height > bounds[3]) {
        top -= targetHeight;
        tAttachment.top = 'top';
        top -= height;
        eAttachment.top = 'bottom';
      } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
        top += height - targetHeight;
        tAttachment.top = 'top';
        eAttachment.top = 'top';
      }
    }

    if (tAttachment.top === 'middle') {
      if (top + height > bounds[3] && eAttachment.top === 'top') {
        top -= height;
        eAttachment.top = 'bottom';
      } else if (top < bounds[1] && eAttachment.top === 'bottom') {
        top += height;
        eAttachment.top = 'top';
      }
    }

    return top;
  }
  /**
   * Get all the initial classes
   * @param classes
   * @param {string} classPrefix
   * @param constraints
   * @return {[*, *]}
   * @private
   */


  function _getAllClasses(classes, classPrefix, constraints) {
    var allClasses = [getClass('pinned', classes, classPrefix), getClass('out-of-bounds', classes, classPrefix)];
    constraints.forEach(function (constraint) {
      var outOfBoundsClass = constraint.outOfBoundsClass,
          pinnedClass = constraint.pinnedClass;

      if (outOfBoundsClass) {
        allClasses.push(outOfBoundsClass);
      }

      if (pinnedClass) {
        allClasses.push(pinnedClass);
      }
    });
    allClasses.forEach(function (cls) {
      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
        allClasses.push(cls + "-" + side);
      });
    });
    return allClasses;
  }

  var Constraint = {
    position: function position(_ref) {
      var _this = this;

      var top = _ref.top,
          left = _ref.left,
          targetAttachment = _ref.targetAttachment;

      if (!this.options.constraints) {
        return true;
      }

      var _this$cache = this.cache('element-bounds', function () {
        return getBounds(_this.element);
      }),
          height = _this$cache.height,
          width = _this$cache.width;

      if (width === 0 && height === 0 && !isUndefined$2(this.lastSize)) {
        // Handle the item getting hidden as a result of our positioning without glitching
        // the classes in and out
        var _this$lastSize = this.lastSize;
        width = _this$lastSize.width;
        height = _this$lastSize.height;
      }

      var targetSize = this.cache('target-bounds', function () {
        return _this.getTargetBounds();
      });
      var targetHeight = targetSize.height,
          targetWidth = targetSize.width;
      var _this$options = this.options,
          classes = _this$options.classes,
          classPrefix = _this$options.classPrefix;

      var allClasses = _getAllClasses(classes, classPrefix, this.options.constraints);

      var addClasses = [];
      var tAttachment = extend({}, targetAttachment);
      var eAttachment = extend({}, this.attachment);
      this.options.constraints.forEach(function (constraint) {
        var to = constraint.to,
            attachment = constraint.attachment,
            pin = constraint.pin;

        if (isUndefined$2(attachment)) {
          attachment = '';
        }

        var changeAttachX, changeAttachY;

        if (attachment.indexOf(' ') >= 0) {
          var _attachment$split = attachment.split(' ');

          changeAttachY = _attachment$split[0];
          changeAttachX = _attachment$split[1];
        } else {
          changeAttachX = changeAttachY = attachment;
        }

        var bounds = getBoundingRect(_this, to);

        if (changeAttachY === 'target' || changeAttachY === 'both') {
          if (top < bounds[1] && tAttachment.top === 'top') {
            top += targetHeight;
            tAttachment.top = 'bottom';
          }

          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
            top -= targetHeight;
            tAttachment.top = 'top';
          }
        }

        if (changeAttachY === 'together') {
          top = _flipYTogether(tAttachment, eAttachment, bounds, height, targetHeight, top);
        }

        if (changeAttachX === 'target' || changeAttachX === 'both') {
          if (left < bounds[0] && tAttachment.left === 'left') {
            left += targetWidth;
            tAttachment.left = 'right';
          }

          if (left + width > bounds[2] && tAttachment.left === 'right') {
            left -= targetWidth;
            tAttachment.left = 'left';
          }
        }

        if (changeAttachX === 'together') {
          left = _flipXTogether(tAttachment, eAttachment, bounds, width, targetWidth, left);
        }

        if (changeAttachY === 'element' || changeAttachY === 'both') {
          if (top < bounds[1] && eAttachment.top === 'bottom') {
            top += height;
            eAttachment.top = 'top';
          }

          if (top + height > bounds[3] && eAttachment.top === 'top') {
            top -= height;
            eAttachment.top = 'bottom';
          }
        }

        if (changeAttachX === 'element' || changeAttachX === 'both') {
          if (left < bounds[0]) {
            if (eAttachment.left === 'right') {
              left += width;
              eAttachment.left = 'left';
            } else if (eAttachment.left === 'center') {
              left += width / 2;
              eAttachment.left = 'left';
            }
          }

          if (left + width > bounds[2]) {
            if (eAttachment.left === 'left') {
              left -= width;
              eAttachment.left = 'right';
            } else if (eAttachment.left === 'center') {
              left -= width / 2;
              eAttachment.left = 'right';
            }
          }
        }

        if (isString$1(pin)) {
          pin = pin.split(',').map(function (p) {
            return p.trim();
          });
        } else if (pin === true) {
          pin = ['top', 'left', 'right', 'bottom'];
        }

        pin = pin || [];
        var pinned = [];
        var oob = [];
        left = _calculateOOBAndPinnedLeft(left, bounds, width, pin, pinned, oob);
        top = _calculateOOBAndPinnedTop(top, bounds, height, pin, pinned, oob);

        if (pinned.length) {
          var pinnedClass;

          if (!isUndefined$2(_this.options.pinnedClass)) {
            pinnedClass = _this.options.pinnedClass;
          } else {
            pinnedClass = getClass('pinned', classes, classPrefix);
          }

          addClasses.push(pinnedClass);
          pinned.forEach(function (side) {
            addClasses.push(pinnedClass + "-" + side);
          });
        }

        _addOutOfBoundsClass(oob, addClasses, classes, classPrefix, _this.options.outOfBoundsClass);

        if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
          eAttachment.left = tAttachment.left = false;
        }

        if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
          eAttachment.top = tAttachment.top = false;
        }

        if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
          _this.updateAttachClasses(eAttachment, tAttachment);

          _this.trigger('update', {
            attachment: eAttachment,
            targetAttachment: tAttachment
          });
        }
      });
      defer(function () {
        if (!(_this.options.addTargetClasses === false)) {
          updateClasses(_this.target, addClasses, allClasses);
        }

        updateClasses(_this.element, addClasses, allClasses);
      });
      return {
        top: top,
        left: left
      };
    }
  };
  var Shift = {
    position: function position(_ref) {
      var top = _ref.top,
          left = _ref.left;

      if (!this.options.shift) {
        return;
      }

      var shift = this.options.shift;

      if (isFunction$1(shift)) {
        shift = shift.call(this, {
          top: top,
          left: left
        });
      }

      var shiftTop, shiftLeft;

      if (isString$1(shift)) {
        shift = shift.split(' ');
        shift[1] = shift[1] || shift[0];
        var _shift = shift;
        shiftTop = _shift[0];
        shiftLeft = _shift[1];
        shiftTop = parseFloat(shiftTop, 10);
        shiftLeft = parseFloat(shiftLeft, 10);
      } else {
        var _ref2 = [shift.top, shift.left];
        shiftTop = _ref2[0];
        shiftLeft = _ref2[1];
      }

      top += shiftTop;
      left += shiftLeft;
      return {
        top: top,
        left: left
      };
    }
  };

  var Evented$1 =
  /*#__PURE__*/
  function () {
    function Evented() {}

    var _proto = Evented.prototype;

    _proto.on = function on(event, handler, ctx, once) {
      if (once === void 0) {
        once = false;
      }

      if (isUndefined$2(this.bindings)) {
        this.bindings = {};
      }

      if (isUndefined$2(this.bindings[event])) {
        this.bindings[event] = [];
      }

      this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
      return this;
    };

    _proto.once = function once(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    _proto.off = function off(event, handler) {
      var _this = this;

      if (isUndefined$2(this.bindings) || isUndefined$2(this.bindings[event])) {
        return this;
      }

      if (isUndefined$2(handler)) {
        delete this.bindings[event];
      } else {
        this.bindings[event].forEach(function (binding, index) {
          if (binding.handler === handler) {
            _this.bindings[event].splice(index, 1);
          }
        });
      }

      return this;
    };

    _proto.trigger = function trigger(event) {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (!isUndefined$2(this.bindings) && this.bindings[event]) {
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

      return this;
    };

    return Evented;
  }();

  var MIRROR_LR = {
    center: 'center',
    left: 'right',
    right: 'left'
  };
  var MIRROR_TB = {
    middle: 'middle',
    top: 'bottom',
    bottom: 'top'
  };
  var OFFSET_MAP = {
    top: 0,
    left: 0,
    middle: '50%',
    center: '50%',
    bottom: '100%',
    right: '100%'
  };

  function addOffset() {
    var out = {
      top: 0,
      left: 0
    };

    for (var _len = arguments.length, offsets = new Array(_len), _key = 0; _key < _len; _key++) {
      offsets[_key] = arguments[_key];
    }

    offsets.forEach(function (_ref) {
      var top = _ref.top,
          left = _ref.left;

      if (isString$1(top)) {
        top = parseFloat(top);
      }

      if (isString$1(left)) {
        left = parseFloat(left);
      }

      out.top += top;
      out.left += left;
    });
    return out;
  }

  function attachmentToOffset(attachment) {
    var left = attachment.left,
        top = attachment.top;

    if (!isUndefined$2(OFFSET_MAP[attachment.left])) {
      left = OFFSET_MAP[attachment.left];
    }

    if (!isUndefined$2(OFFSET_MAP[attachment.top])) {
      top = OFFSET_MAP[attachment.top];
    }

    return {
      left: left,
      top: top
    };
  }

  function autoToFixedAttachment(attachment, relativeToAttachment) {
    var left = attachment.left,
        top = attachment.top;

    if (left === 'auto') {
      left = MIRROR_LR[relativeToAttachment.left];
    }

    if (top === 'auto') {
      top = MIRROR_TB[relativeToAttachment.top];
    }

    return {
      left: left,
      top: top
    };
  }

  function offsetToPx(offset, size) {
    if (isString$1(offset.left) && offset.left.indexOf('%') !== -1) {
      offset.left = parseFloat(offset.left) / 100 * size.width;
    }

    if (isString$1(offset.top) && offset.top.indexOf('%') !== -1) {
      offset.top = parseFloat(offset.top) / 100 * size.height;
    }

    return offset;
  }

  function parseTopLeft(value) {
    var _value$split = value.split(' '),
        top = _value$split[0],
        left = _value$split[1];

    return {
      top: top,
      left: left
    };
  }

  function getScrollParents(el) {
    // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
    // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
    var computedStyle = getComputedStyle(el) || {};
    var position = computedStyle.position;
    var parents = [];

    if (position === 'fixed') {
      return [el];
    }

    var parent = el;

    while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
      var style = void 0;

      try {
        style = getComputedStyle(parent);
      } catch (err) {// Intentionally blank
      }

      if (isUndefined$2(style) || style === null) {
        parents.push(parent);
        return parents;
      }

      var _style = style,
          overflow = _style.overflow,
          overflowX = _style.overflowX,
          overflowY = _style.overflowY;

      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
          parents.push(parent);
        }
      }
    }

    parents.push(el.ownerDocument.body); // If the node is within a frame, account for the parent window scroll

    if (el.ownerDocument !== document) {
      parents.push(el.ownerDocument.defaultView);
    }

    return parents;
  }

  function getOffsetParent(el) {
    return el.offsetParent || document.documentElement;
  }

  var TetherBase = {
    modules: [Constraint, Abutment, Shift]
  };

  function isFullscreenElement(e) {
    var d = e.ownerDocument;
    var fe = d.fullscreenElement || d.webkitFullscreenElement || d.mozFullScreenElement || d.msFullscreenElement;
    return fe === e;
  }

  function within(a, b, diff) {
    if (diff === void 0) {
      diff = 1;
    }

    return a + diff >= b && b >= a - diff;
  }

  var transformKey = function () {
    if (isUndefined$2(document)) {
      return '';
    }

    var el = document.createElement('div');
    var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];

    for (var i = 0; i < transforms.length; ++i) {
      var key = transforms[i];

      if (el.style[key] !== undefined) {
        return key;
      }
    }
  }();

  var tethers = [];

  var position = function position() {
    tethers.forEach(function (tether) {
      tether.position(false);
    });
    flush();
  };

  function now() {
    return performance.now();
  }

  (function () {
    var lastCall = null;
    var lastDuration = null;
    var pendingTimeout = null;

    var tick = function tick() {
      if (!isUndefined$2(lastDuration) && lastDuration > 16) {
        // We voluntarily throttle ourselves if we can't manage 60fps
        lastDuration = Math.min(lastDuration - 16, 250); // Just in case this is the last event, remember to position just once more

        pendingTimeout = setTimeout(tick, 250);
        return;
      }

      if (!isUndefined$2(lastCall) && now() - lastCall < 10) {
        // Some browsers call events a little too frequently, refuse to run more than is reasonable
        return;
      }

      if (pendingTimeout != null) {
        clearTimeout(pendingTimeout);
        pendingTimeout = null;
      }

      lastCall = now();
      position();
      lastDuration = now() - lastCall;
    };

    if (!isUndefined$2(window) && !isUndefined$2(window.addEventListener)) {
      ['resize', 'scroll', 'touchmove'].forEach(function (event) {
        window.addEventListener(event, tick);
      });
    }
  })();

  var TetherClass =
  /*#__PURE__*/
  function (_Evented) {
    _inheritsLoose$1(TetherClass, _Evented);

    function TetherClass(options) {
      var _this;

      _this = _Evented.call(this) || this;
      _this.position = _this.position.bind(_assertThisInitialized$1(_this));
      tethers.push(_assertThisInitialized$1(_this));
      _this.history = [];

      _this.setOptions(options, false);

      TetherBase.modules.forEach(function (module) {
        if (!isUndefined$2(module.initialize)) {
          module.initialize.call(_assertThisInitialized$1(_this));
        }
      });

      _this.position();

      return _this;
    }

    var _proto = TetherClass.prototype;

    _proto.setOptions = function setOptions(options, pos) {
      var _this2 = this;

      if (pos === void 0) {
        pos = true;
      }

      var defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };
      this.options = extend(defaults, options);
      var _this$options = this.options,
          element = _this$options.element,
          target = _this$options.target,
          targetModifier = _this$options.targetModifier;
      this.element = element;
      this.target = target;
      this.targetModifier = targetModifier;

      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }

      ['element', 'target'].forEach(function (key) {
        if (isUndefined$2(_this2[key])) {
          throw new Error('Tether Error: Both element and target must be defined');
        }

        if (!isUndefined$2(_this2[key].jquery)) {
          _this2[key] = _this2[key][0];
        } else if (isString$1(_this2[key])) {
          _this2[key] = document.querySelector(_this2[key]);
        }
      });

      this._addClasses();

      if (!this.options.attachment) {
        throw new Error('Tether Error: You must provide an attachment');
      }

      this.targetAttachment = parseTopLeft(this.options.targetAttachment);
      this.attachment = parseTopLeft(this.options.attachment);
      this.offset = parseTopLeft(this.options.offset);
      this.targetOffset = parseTopLeft(this.options.targetOffset);

      if (!isUndefined$2(this.scrollParents)) {
        this.disable();
      }

      if (this.targetModifier === 'scroll-handle') {
        this.scrollParents = [this.target];
      } else {
        this.scrollParents = getScrollParents(this.target);
      }

      if (!(this.options.enabled === false)) {
        this.enable(pos);
      }
    };

    _proto.getTargetBounds = function getTargetBounds() {
      if (!isUndefined$2(this.targetModifier)) {
        if (this.targetModifier === 'visible') {
          return getVisibleBounds(this.target);
        } else if (this.targetModifier === 'scroll-handle') {
          return getScrollHandleBounds(this.target);
        }
      } else {
        return getBounds(this.target);
      }
    };

    _proto.clearCache = function clearCache() {
      this._cache = {};
    };

    _proto.cache = function cache(k, getter) {
      // More than one module will often need the same DOM info, so
      // we keep a cache which is cleared on each position call
      if (isUndefined$2(this._cache)) {
        this._cache = {};
      }

      if (isUndefined$2(this._cache[k])) {
        this._cache[k] = getter.call(this);
      }

      return this._cache[k];
    };

    _proto.enable = function enable(pos) {
      var _this3 = this;

      if (pos === void 0) {
        pos = true;
      }

      var _this$options2 = this.options,
          classes = _this$options2.classes,
          classPrefix = _this$options2.classPrefix;

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, getClass('enabled', classes, classPrefix));
      }

      addClass(this.element, getClass('enabled', classes, classPrefix));
      this.enabled = true;
      this.scrollParents.forEach(function (parent) {
        if (parent !== _this3.target.ownerDocument) {
          parent.addEventListener('scroll', _this3.position);
        }
      });

      if (pos) {
        this.position();
      }
    };

    _proto.disable = function disable() {
      var _this4 = this;

      var _this$options3 = this.options,
          classes = _this$options3.classes,
          classPrefix = _this$options3.classPrefix;
      removeClass(this.target, getClass('enabled', classes, classPrefix));
      removeClass(this.element, getClass('enabled', classes, classPrefix));
      this.enabled = false;

      if (!isUndefined$2(this.scrollParents)) {
        this.scrollParents.forEach(function (parent) {
          parent.removeEventListener('scroll', _this4.position);
        });
      }
    };

    _proto.destroy = function destroy() {
      var _this5 = this;

      this.disable();

      this._removeClasses();

      tethers.forEach(function (tether, i) {
        if (tether === _this5) {
          tethers.splice(i, 1);
        }
      }); // Remove any elements we were using for convenience from the DOM

      if (tethers.length === 0) {
        removeUtilElements();
      }
    };

    _proto.updateAttachClasses = function updateAttachClasses(elementAttach, targetAttach) {
      var _this6 = this;

      elementAttach = elementAttach || this.attachment;
      targetAttach = targetAttach || this.targetAttachment;
      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
      var _this$options4 = this.options,
          classes = _this$options4.classes,
          classPrefix = _this$options4.classPrefix;

      if (!isUndefined$2(this._addAttachClasses) && this._addAttachClasses.length) {
        // updateAttachClasses can be called more than once in a position call, so
        // we need to clean up after ourselves such that when the last defer gets
        // ran it doesn't add any extra classes from previous calls.
        this._addAttachClasses.splice(0, this._addAttachClasses.length);
      }

      if (isUndefined$2(this._addAttachClasses)) {
        this._addAttachClasses = [];
      }

      this.add = this._addAttachClasses;

      if (elementAttach.top) {
        this.add.push(getClass('element-attached', classes, classPrefix) + "-" + elementAttach.top);
      }

      if (elementAttach.left) {
        this.add.push(getClass('element-attached', classes, classPrefix) + "-" + elementAttach.left);
      }

      if (targetAttach.top) {
        this.add.push(getClass('target-attached', classes, classPrefix) + "-" + targetAttach.top);
      }

      if (targetAttach.left) {
        this.add.push(getClass('target-attached', classes, classPrefix) + "-" + targetAttach.left);
      }

      this.all = [];
      sides.forEach(function (side) {
        _this6.all.push(getClass('element-attached', classes, classPrefix) + "-" + side);

        _this6.all.push(getClass('target-attached', classes, classPrefix) + "-" + side);
      });
      defer(function () {
        if (isUndefined$2(_this6._addAttachClasses)) {
          return;
        }

        updateClasses(_this6.element, _this6._addAttachClasses, _this6.all);

        if (!(_this6.options.addTargetClasses === false)) {
          updateClasses(_this6.target, _this6._addAttachClasses, _this6.all);
        }

        delete _this6._addAttachClasses;
      });
    };

    _proto.position = function position(flushChanges) {
      var _this7 = this;

      if (flushChanges === void 0) {
        flushChanges = true;
      } // flushChanges commits the changes immediately, leave true unless you are positioning multiple
      // tethers (in which case call Tether.Utils.flush yourself when you're done)


      if (!this.enabled) {
        return;
      }

      this.clearCache(); // Turn 'auto' attachments into the appropriate corner or edge

      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
      this.updateAttachClasses(this.attachment, targetAttachment);
      var elementPos = this.cache('element-bounds', function () {
        return getBounds(_this7.element);
      });
      var width = elementPos.width,
          height = elementPos.height;

      if (width === 0 && height === 0 && !isUndefined$2(this.lastSize)) {
        // We cache the height and width to make it possible to position elements that are
        // getting hidden.
        var _this$lastSize = this.lastSize;
        width = _this$lastSize.width;
        height = _this$lastSize.height;
      } else {
        this.lastSize = {
          width: width,
          height: height
        };
      }

      var targetPos = this.cache('target-bounds', function () {
        return _this7.getTargetBounds();
      });
      var targetSize = targetPos; // Get an actual px offset from the attachment

      var offset = offsetToPx(attachmentToOffset(this.attachment), {
        width: width,
        height: height
      });
      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
      var manualOffset = offsetToPx(this.offset, {
        width: width,
        height: height
      });
      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize); // Add the manually provided offset

      offset = addOffset(offset, manualOffset);
      targetOffset = addOffset(targetOffset, manualTargetOffset); // It's now our goal to make (element position + offset) == (target position + target offset)

      var left = targetPos.left + targetOffset.left - offset.left;
      var top = targetPos.top + targetOffset.top - offset.top;

      for (var i = 0; i < TetherBase.modules.length; ++i) {
        var module = TetherBase.modules[i];
        var ret = module.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset,
          scrollbarSize: scrollbarSize,
          attachment: this.attachment
        });

        if (ret === false) {
          return false;
        } else if (isUndefined$2(ret) || !isObject(ret)) {
          continue;
        } else {
          top = ret.top;
          left = ret.left;
        }
      } // We describe the position three different ways to give the optimizer
      // a chance to decide the best possible way to position the element
      // with the fewest repaints.


      var next = {
        // It's position relative to the page (absolute positioning when
        // the element is a child of the body)
        page: {
          top: top,
          left: left
        },
        // It's position relative to the viewport (fixed positioning)
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };
      var doc = this.target.ownerDocument;
      var win = doc.defaultView;
      var scrollbarSize;

      if (win.innerHeight > doc.documentElement.clientHeight) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.bottom -= scrollbarSize.height;
      }

      if (win.innerWidth > doc.documentElement.clientWidth) {
        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
        next.viewport.right -= scrollbarSize.width;
      }

      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
        next.page.bottom = doc.body.scrollHeight - top - height;
        next.page.right = doc.body.scrollWidth - left - width;
      }

      if (!isUndefined$2(this.options.optimizations) && this.options.optimizations.moveElement !== false && isUndefined$2(this.targetModifier)) {
        var offsetParent = this.cache('target-offsetparent', function () {
          return getOffsetParent(_this7.target);
        });
        var offsetPosition = this.cache('target-offsetparent-bounds', function () {
          return getBounds(offsetParent);
        });
        var offsetParentStyle = getComputedStyle(offsetParent);
        var offsetParentSize = offsetPosition;
        var offsetBorder = {};
        ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
          offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle["border" + side + "Width"]);
        });
        offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
        offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

        if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
          if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
            // We're within the visible part of the target's scroll parent
            var scrollLeft = offsetParent.scrollLeft,
                scrollTop = offsetParent.scrollTop; // It's position relative to the target's offset parent (absolute positioning when
            // the element is moved to be a child of the target's offset parent).

            next.offset = {
              top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
              left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
            };
          }
        }
      } // We could also travel up the DOM and try each containing context, rather than only
      // looking at the body, but we're gonna get diminishing returns.


      this.move(next);
      this.history.unshift(next);

      if (this.history.length > 3) {
        this.history.pop();
      }

      if (flushChanges) {
        flush();
      }

      return true;
    } // THE ISSUE
    ;

    _proto.move = function move(pos) {
      var _this8 = this;

      if (isUndefined$2(this.element.parentNode)) {
        return;
      }

      var same = {};

      for (var type in pos) {
        same[type] = {};

        for (var key in pos[type]) {
          var found = false;

          for (var i = 0; i < this.history.length; ++i) {
            var point = this.history[i];

            if (!isUndefined$2(point[type]) && !within(point[type][key], pos[type][key])) {
              found = true;
              break;
            }
          }

          if (!found) {
            same[type][key] = true;
          }
        }
      }

      var css = {
        top: '',
        left: '',
        right: '',
        bottom: ''
      };

      var transcribe = function transcribe(_same, _pos) {
        var hasOptimizations = !isUndefined$2(_this8.options.optimizations);
        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;

        if (gpu !== false) {
          var yPos, xPos;

          if (_same.top) {
            css.top = 0;
            yPos = _pos.top;
          } else {
            css.bottom = 0;
            yPos = -_pos.bottom;
          }

          if (_same.left) {
            css.left = 0;
            xPos = _pos.left;
          } else {
            css.right = 0;
            xPos = -_pos.right;
          }

          if (isNumber(window.devicePixelRatio) && devicePixelRatio % 1 === 0) {
            xPos = Math.round(xPos * devicePixelRatio) / devicePixelRatio;
            yPos = Math.round(yPos * devicePixelRatio) / devicePixelRatio;
          }

          css[transformKey] = "translateX(" + xPos + "px) translateY(" + yPos + "px)";

          if (transformKey !== 'msTransform') {
            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
            // but IE9 doesn't support 3d transforms and will choke.
            css[transformKey] += ' translateZ(0)';
          }
        } else {
          if (_same.top) {
            css.top = _pos.top + "px";
          } else {
            css.bottom = _pos.bottom + "px";
          }

          if (_same.left) {
            css.left = _pos.left + "px";
          } else {
            css.right = _pos.right + "px";
          }
        }
      };

      var hasOptimizations = !isUndefined$2(this.options.optimizations);
      var allowPositionFixed = true;

      if (hasOptimizations && this.options.optimizations.allowPositionFixed === false) {
        allowPositionFixed = false;
      }

      var moved = false;

      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, pos.page);
      } else if (allowPositionFixed && (same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, pos.viewport);
      } else if (!isUndefined$2(same.offset) && same.offset.top && same.offset.left) {
        css.position = 'absolute';
        var offsetParent = this.cache('target-offsetparent', function () {
          return getOffsetParent(_this8.target);
        });

        if (getOffsetParent(this.element) !== offsetParent) {
          defer(function () {
            _this8.element.parentNode.removeChild(_this8.element);

            offsetParent.appendChild(_this8.element);
          });
        }

        transcribe(same.offset, pos.offset);
        moved = true;
      } else {
        css.position = 'absolute';
        transcribe({
          top: true,
          left: true
        }, pos.page);
      }

      if (!moved) {
        if (this.options.bodyElement) {
          if (this.element.parentNode !== this.options.bodyElement) {
            this.options.bodyElement.appendChild(this.element);
          }
        } else {
          var offsetParentIsBody = true;
          var currentNode = this.element.parentNode;

          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY' && !isFullscreenElement(currentNode)) {
            if (getComputedStyle(currentNode).position !== 'static') {
              offsetParentIsBody = false;
              break;
            }

            currentNode = currentNode.parentNode;
          }

          if (!offsetParentIsBody) {
            this.element.parentNode.removeChild(this.element);
            this.element.ownerDocument.body.appendChild(this.element);
          }
        }
      } // Any css change will trigger a repaint, so let's avoid one if nothing changed


      var writeCSS = {};
      var write = false;

      for (var _key in css) {
        var val = css[_key];
        var elVal = this.element.style[_key];

        if (elVal !== val) {
          write = true;
          writeCSS[_key] = val;
        }
      }

      if (write) {
        defer(function () {
          extend(_this8.element.style, writeCSS);

          _this8.trigger('repositioned');
        });
      }
    };

    _proto._addClasses = function _addClasses() {
      var _this$options5 = this.options,
          classes = _this$options5.classes,
          classPrefix = _this$options5.classPrefix;
      addClass(this.element, getClass('element', classes, classPrefix));

      if (!(this.options.addTargetClasses === false)) {
        addClass(this.target, getClass('target', classes, classPrefix));
      }
    };

    _proto._removeClasses = function _removeClasses() {
      var _this9 = this;

      var _this$options6 = this.options,
          classes = _this$options6.classes,
          classPrefix = _this$options6.classPrefix;
      removeClass(this.element, getClass('element', classes, classPrefix));

      if (!(this.options.addTargetClasses === false)) {
        removeClass(this.target, getClass('target', classes, classPrefix));
      }

      this.all.forEach(function (className) {
        _this9.element.classList.remove(className);

        _this9.target.classList.remove(className);
      });
    };

    return TetherClass;
  }(Evented$1);

  TetherClass.modules = [];
  TetherBase.position = position;
  var Tether = extend(TetherClass, TetherBase);
  Tether.modules.push({
    initialize: function initialize() {
      var _this10 = this;

      var _this$options7 = this.options,
          classes = _this$options7.classes,
          classPrefix = _this$options7.classPrefix;
      this.markers = {};
      ['target', 'element'].forEach(function (type) {
        var el = document.createElement('div');
        el.className = getClass(type + "-marker", classes, classPrefix);
        var dot = document.createElement('div');
        dot.className = getClass('marker-dot', classes, classPrefix);
        el.appendChild(dot);

        _this10[type].appendChild(el);

        _this10.markers[type] = {
          dot: dot,
          el: el
        };
      });
    },
    position: function position(_ref) {
      var manualOffset = _ref.manualOffset,
          manualTargetOffset = _ref.manualTargetOffset;
      var offsets = {
        element: manualOffset,
        target: manualTargetOffset
      };

      for (var type in offsets) {
        var offset = offsets[type];

        for (var side in offset) {
          var val = offset[side];

          if (!isString$1(val) || val.indexOf('%') === -1 && val.indexOf('px') === -1) {
            val += 'px';
          }

          if (this.markers[type].dot.style[side] !== val) {
            this.markers[type].dot.style[side] = val;
          }
        }
      }

      return true;
    }
  });

  var ATTACHMENT = {
    'bottom': 'top center',
    'bottom center': 'top center',
    'bottom left': 'top right',
    'bottom right': 'top left',
    'center': 'middle center',
    'left': 'middle right',
    'middle': 'middle center',
    'middle center': 'middle center',
    'middle left': 'middle right',
    'middle right': 'middle left',
    'right': 'middle left',
    'top': 'bottom center',
    'top center': 'bottom center',
    'top left': 'bottom right',
    'top right': 'bottom left'
  };
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
    var returnOpts = Object.assign({}, options);

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
   * `step.tooltip` as a Tether instance.
   * @param {Step} step The step instance
   */

  function setupTooltip(step) {
    if (step.tooltip) {
      step.tooltip.destroy();
    }

    var attachToOpts = parseAttachTo(step);
    var tetherOptions = getTetherOptions(attachToOpts, step);
    step.tooltip = new Tether(tetherOptions);
    step.target = attachToOpts.element;
  }
  /**
   * Create a unique id for steps, tours, modals, etc
   * @return {string}
   */

  function uuid() {
    var d = Date.now();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
  }
  /**
   * Gets the `Tether` options from a set of base `attachTo` options
   * @param attachToOptions
   * @param {Step} step The step instance
   * @return {Object}
   * @private
   */

  function getTetherOptions(attachToOptions, step) {
    var tetherOptions = {
      classPrefix: 'shepherd',
      constraints: [{
        to: 'scrollParent',
        attachment: 'together',
        pin: ['left', 'right', 'top']
      }, {
        to: 'window',
        attachment: 'together'
      }]
    };
    var target = document.body;

    if (!attachToOptions.element || !attachToOptions.on) {
      tetherOptions.attachment = 'middle center';
      tetherOptions.targetModifier = 'visible';
    } else {
      tetherOptions.attachment = ATTACHMENT[attachToOptions.on] || ATTACHMENT.right;
      target = attachToOptions.element;
    }

    tetherOptions.element = step.el;
    tetherOptions.target = target;

    if (step.options.tetherOptions) {
      if (step.options.tetherOptions.constraints) {
        tetherOptions.constraints = step.options.tetherOptions.constraints;
      }

      tetherOptions.classes = _extends({}, tetherOptions.classes, {}, step.options.tetherOptions.classes);
      tetherOptions.optimizations = _extends({}, tetherOptions.optimizations, {}, step.options.tetherOptions.optimizations);
      tetherOptions = _extends({}, tetherOptions, {}, step.options.tetherOptions);
    }

    return tetherOptions;
  }

  function noop() {}

  function assign(tar, src) {
    // @ts-ignore
    for (var k in src) {
      tar[k] = src[k];
    }

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
    for (var i = 0; i < iterations.length; i += 1) {
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
    return function () {
      return node.removeEventListener(event, handler, options);
    };
  }

  function attr(node, attribute, value) {
    if (value == null) node.removeAttribute(attribute);else node.setAttribute(attribute, value);
  }

  function set_attributes(node, attributes) {
    for (var key in attributes) {
      if (key === 'style') {
        node.style.cssText = attributes[key];
      } else if (key in node) {
        node[key] = attributes[key];
      } else {
        attr(node, key, attributes[key]);
      }
    }
  }

  function children(element) {
    return Array.from(element.childNodes);
  }

  function set_data(text, data) {
    data = '' + data;
    if (text.data !== data) text.data = data;
  }

  function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
  }

  var current_component;

  function set_current_component(component) {
    current_component = component;
  }

  function get_current_component() {
    if (!current_component) throw new Error("Function called outside component initialization");
    return current_component;
  }

  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }

  function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
  }

  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = Promise.resolve();
  var update_scheduled = false;

  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush$1);
    }
  }

  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }

  function flush$1() {
    var seen_callbacks = new Set();

    do {
      // first, call beforeUpdate functions
      // and update components
      while (dirty_components.length) {
        var component = dirty_components.shift();
        set_current_component(component);
        update(component.$$);
      }

      while (binding_callbacks.length) {
        binding_callbacks.pop()();
      } // then, once components are updated, call
      // afterUpdate functions. This may cause
      // subsequent updates...


      for (var i = 0; i < render_callbacks.length; i += 1) {
        var callback = render_callbacks[i];

        if (!seen_callbacks.has(callback)) {
          callback(); // ...so guard against infinite loops

          seen_callbacks.add(callback);
        }
      }

      render_callbacks.length = 0;
    } while (dirty_components.length);

    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }

    update_scheduled = false;
  }

  function update($$) {
    if ($$.fragment) {
      $$.update($$.dirty);
      run_all($$.before_update);
      $$.fragment.p($$.dirty, $$.ctx);
      $$.dirty = null;
      $$.after_update.forEach(add_render_callback);
    }
  }

  var outroing = new Set();
  var outros;

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
      outros.c.push(function () {
        outroing.delete(block);

        if (callback) {
          if (detach) block.d(1);
          callback();
        }
      });
      block.o(local);
    }
  }

  function get_spread_update(levels, updates) {
    var update = {};
    var to_null_out = {};
    var accounted_for = {
      $$scope: 1
    };
    var i = levels.length;

    while (i--) {
      var o = levels[i];
      var n = updates[i];

      if (n) {
        for (var key in o) {
          if (!(key in n)) to_null_out[key] = 1;
        }

        for (var _key2 in n) {
          if (!accounted_for[_key2]) {
            update[_key2] = n[_key2];
            accounted_for[_key2] = 1;
          }
        }

        levels[i] = n;
      } else {
        for (var _key3 in o) {
          accounted_for[_key3] = 1;
        }
      }
    }

    for (var _key4 in to_null_out) {
      if (!(_key4 in update)) update[_key4] = undefined;
    }

    return update;
  }

  function mount_component(component, target, anchor) {
    var _component$$$ = component.$$,
        fragment = _component$$$.fragment,
        on_mount = _component$$$.on_mount,
        on_destroy = _component$$$.on_destroy,
        after_update = _component$$$.after_update;
    fragment.m(target, anchor); // onMount happens before the initial afterUpdate

    add_render_callback(function () {
      var new_on_destroy = on_mount.map(run).filter(is_function);

      if (on_destroy) {
        on_destroy.push.apply(on_destroy, new_on_destroy);
      } else {
        // Edge case - component was destroyed immediately,
        // most likely as a result of a binding initialising
        run_all(new_on_destroy);
      }

      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }

  function destroy_component(component, detaching) {
    if (component.$$.fragment) {
      run_all(component.$$.on_destroy);
      component.$$.fragment.d(detaching); // TODO null out other refs, including component.$$ (but need to
      // preserve final state?)

      component.$$.on_destroy = component.$$.fragment = null;
      component.$$.ctx = {};
    }
  }

  function make_dirty(component, key) {
    if (!component.$$.dirty) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty = blank_object();
    }

    component.$$.dirty[key] = true;
  }

  function init(component, options, instance, create_fragment, not_equal, prop_names) {
    var parent_component = current_component;
    set_current_component(component);
    var props = options.props || {};
    var $$ = component.$$ = {
      fragment: null,
      ctx: null,
      // state
      props: prop_names,
      update: noop,
      not_equal: not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      before_update: [],
      after_update: [],
      context: new Map(parent_component ? parent_component.$$.context : []),
      // everything else
      callbacks: blank_object(),
      dirty: null
    };
    var ready = false;
    $$.ctx = instance ? instance(component, props, function (key, ret, value) {
      if (value === void 0) {
        value = ret;
      }

      if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
        if ($$.bound[key]) $$.bound[key](value);
        if (ready) make_dirty(component, key);
      }

      return ret;
    }) : props;
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment($$.ctx);

    if (options.target) {
      if (options.hydrate) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment.l(children(options.target));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        $$.fragment.c();
      }

      if (options.intro) transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      flush$1();
    }

    set_current_component(parent_component);
  }

  var SvelteElement;

  if (typeof HTMLElement !== 'undefined') {
    SvelteElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inheritsLoose(SvelteElement, _HTMLElement);

      function SvelteElement() {
        var _this;

        _this = _HTMLElement.call(this) || this;

        _this.attachShadow({
          mode: 'open'
        });

        return _this;
      }

      var _proto2 = SvelteElement.prototype;

      _proto2.connectedCallback = function connectedCallback() {
        // @ts-ignore todo: improve typings
        for (var key in this.$$.slotted) {
          // @ts-ignore todo: improve typings
          this.appendChild(this.$$.slotted[key]);
        }
      };

      _proto2.attributeChangedCallback = function attributeChangedCallback(attr, _oldValue, newValue) {
        this[attr] = newValue;
      };

      _proto2.$destroy = function $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
      };

      _proto2.$on = function $on(type, callback) {
        // TODO should this delegate to addEventListener?
        var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
        callbacks.push(callback);
        return function () {
          var index = callbacks.indexOf(callback);
          if (index !== -1) callbacks.splice(index, 1);
        };
      };

      _proto2.$set = function $set() {// overridden by instance, if it has props
      };

      return SvelteElement;
    }(_wrapNativeSuper(HTMLElement));
  }

  var SvelteComponent =
  /*#__PURE__*/
  function () {
    function SvelteComponent() {}

    var _proto3 = SvelteComponent.prototype;

    _proto3.$destroy = function $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    };

    _proto3.$on = function $on(type, callback) {
      var callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return function () {
        var index = callbacks.indexOf(callback);
        if (index !== -1) callbacks.splice(index, 1);
      };
    };

    _proto3.$set = function $set() {// overridden by instance, if it has props
    };

    return SvelteComponent;
  }();

  function create_fragment(ctx) {
    var button, t, button_aria_label_value, button_class_value, dispose;
    return {
      c: function c() {
        button = element("button");
        t = text(ctx.text);
        attr(button, "aria-label", button_aria_label_value = ctx.label ? ctx.label : null);
        attr(button, "class", button_class_value = (ctx.classes || '') + " shepherd-button " + (ctx.secondary ? 'shepherd-button-secondary' : ''));
        button.disabled = ctx.disabled;
        attr(button, "tabindex", "0");
        dispose = listen(button, "click", ctx.action);
      },
      m: function m(target, anchor) {
        insert(target, button, anchor);
        append(button, t);
      },
      p: function p(changed, ctx) {
        if (changed.text) {
          set_data(t, ctx.text);
        }

        if (changed.label && button_aria_label_value !== (button_aria_label_value = ctx.label ? ctx.label : null)) {
          attr(button, "aria-label", button_aria_label_value);
        }

        if ((changed.classes || changed.secondary) && button_class_value !== (button_class_value = (ctx.classes || '') + " shepherd-button " + (ctx.secondary ? 'shepherd-button-secondary' : ''))) {
          attr(button, "class", button_class_value);
        }

        if (changed.disabled) {
          button.disabled = ctx.disabled;
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) {
          detach(button);
        }

        dispose();
      }
    };
  }

  function instance($$self, $$props, $$invalidate) {
    var config = $$props.config,
        step = $$props.step;
    var action, classes, secondary, text, label, disabled;

    function getDisabled(disabled) {
      if (isFunction(disabled)) {
        return disabled = disabled.call(step);
      }

      return disabled;
    }

    $$self.$set = function ($$props) {
      if ('config' in $$props) $$invalidate('config', config = $$props.config);
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
    };

    $$self.$$.update = function ($$dirty) {
      if ($$dirty === void 0) {
        $$dirty = {
          config: 1,
          step: 1
        };
      }

      if ($$dirty.config || $$dirty.step) {
        {
          $$invalidate('action', action = config.action ? config.action.bind(step.tour) : null);
          $$invalidate('classes', classes = config.classes);
          $$invalidate('secondary', secondary = config.secondary);
          $$invalidate('text', text = config.text);
          $$invalidate('label', label = config.label);
          $$invalidate('disabled', disabled = config.disabled ? getDisabled(config.disabled) : false);
        }
      }
    };

    return {
      config: config,
      step: step,
      action: action,
      classes: classes,
      secondary: secondary,
      text: text,
      label: label,
      disabled: disabled
    };
  }

  var Shepherd_button =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_button, _SvelteComponent);

    function Shepherd_button(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance, create_fragment, safe_not_equal, ["config", "step"]);
      return _this;
    }

    return Shepherd_button;
  }(SvelteComponent);

  function get_each_context(ctx, list, i) {
    var child_ctx = Object.create(ctx);
    child_ctx.config = list[i];
    return child_ctx;
  } // (25:4) {#if buttons}


  function create_if_block(ctx) {
    var each_1_anchor, current;
    var each_value = ctx.buttons;
    var each_blocks = [];

    for (var i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }

    var out = function out(i) {
      return transition_out(each_blocks[i], 1, 1, function () {
        each_blocks[i] = null;
      });
    };

    return {
      c: function c() {
        for (var _i = 0; _i < each_blocks.length; _i += 1) {
          each_blocks[_i].c();
        }

        each_1_anchor = empty();
      },
      m: function m(target, anchor) {
        for (var _i2 = 0; _i2 < each_blocks.length; _i2 += 1) {
          each_blocks[_i2].m(target, anchor);
        }

        insert(target, each_1_anchor, anchor);
        current = true;
      },
      p: function p(changed, ctx) {
        if (changed.buttons || changed.step) {
          each_value = ctx.buttons;

          var _i3;

          for (_i3 = 0; _i3 < each_value.length; _i3 += 1) {
            var child_ctx = get_each_context(ctx, each_value, _i3);

            if (each_blocks[_i3]) {
              each_blocks[_i3].p(changed, child_ctx);

              transition_in(each_blocks[_i3], 1);
            } else {
              each_blocks[_i3] = create_each_block(child_ctx);

              each_blocks[_i3].c();

              transition_in(each_blocks[_i3], 1);

              each_blocks[_i3].m(each_1_anchor.parentNode, each_1_anchor);
            }
          }

          group_outros();

          for (_i3 = each_value.length; _i3 < each_blocks.length; _i3 += 1) {
            out(_i3);
          }

          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;

        for (var _i4 = 0; _i4 < each_value.length; _i4 += 1) {
          transition_in(each_blocks[_i4]);
        }

        current = true;
      },
      o: function o(local) {
        each_blocks = each_blocks.filter(Boolean);

        for (var _i5 = 0; _i5 < each_blocks.length; _i5 += 1) {
          transition_out(each_blocks[_i5]);
        }

        current = false;
      },
      d: function d(detaching) {
        destroy_each(each_blocks, detaching);

        if (detaching) {
          detach(each_1_anchor);
        }
      }
    };
  } // (26:8) {#each buttons as config}


  function create_each_block(ctx) {
    var current;
    var shepherdbutton = new Shepherd_button({
      props: {
        config: ctx.config,
        step: ctx.step
      }
    });
    return {
      c: function c() {
        shepherdbutton.$$.fragment.c();
      },
      m: function m(target, anchor) {
        mount_component(shepherdbutton, target, anchor);
        current = true;
      },
      p: function p(changed, ctx) {
        var shepherdbutton_changes = {};
        if (changed.buttons) shepherdbutton_changes.config = ctx.config;
        if (changed.step) shepherdbutton_changes.step = ctx.step;
        shepherdbutton.$set(shepherdbutton_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdbutton.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdbutton.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdbutton, detaching);
      }
    };
  }

  function create_fragment$1(ctx) {
    var footer, current;
    var if_block = ctx.buttons && create_if_block(ctx);
    return {
      c: function c() {
        footer = element("footer");
        if (if_block) if_block.c();
        attr(footer, "class", "shepherd-footer");
      },
      m: function m(target, anchor) {
        insert(target, footer, anchor);
        if (if_block) if_block.m(footer, null);
        current = true;
      },
      p: function p(changed, ctx) {
        if (ctx.buttons) {
          if (if_block) {
            if_block.p(changed, ctx);
            transition_in(if_block, 1);
          } else {
            if_block = create_if_block(ctx);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(footer, null);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, function () {
            if_block = null;
          });
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(if_block);
        current = true;
      },
      o: function o(local) {
        transition_out(if_block);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) {
          detach(footer);
        }

        if (if_block) if_block.d();
      }
    };
  }

  function instance$1($$self, $$props, $$invalidate) {
    var step = $$props.step;

    $$self.$set = function ($$props) {
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
    };

    var buttons;

    $$self.$$.update = function ($$dirty) {
      if ($$dirty === void 0) {
        $$dirty = {
          step: 1
        };
      }

      if ($$dirty.step) {
        $$invalidate('buttons', buttons = step.options.buttons);
      }
    };

    return {
      step: step,
      buttons: buttons
    };
  }

  var Shepherd_footer =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_footer, _SvelteComponent);

    function Shepherd_footer(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$1, create_fragment$1, safe_not_equal, ["step"]);
      return _this;
    }

    return Shepherd_footer;
  }(SvelteComponent);

  function create_fragment$2(ctx) {
    var button, span, button_aria_label_value, dispose;
    return {
      c: function c() {
        button = element("button");
        span = element("span");
        span.textContent = "×";
        attr(span, "aria-hidden", "true");
        attr(button, "aria-label", button_aria_label_value = ctx.cancelIcon.label ? ctx.cancelIcon.label : 'Close Tour');
        attr(button, "class", "shepherd-cancel-icon");
        attr(button, "type", "button");
        dispose = listen(button, "click", ctx.handleCancelClick);
      },
      m: function m(target, anchor) {
        insert(target, button, anchor);
        append(button, span);
      },
      p: function p(changed, ctx) {
        if (changed.cancelIcon && button_aria_label_value !== (button_aria_label_value = ctx.cancelIcon.label ? ctx.cancelIcon.label : 'Close Tour')) {
          attr(button, "aria-label", button_aria_label_value);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) {
          detach(button);
        }

        dispose();
      }
    };
  }

  function instance$2($$self, $$props, $$invalidate) {
    var cancelIcon = $$props.cancelIcon,
        step = $$props.step;
    /**
     * Add a click listener to the cancel link that cancels the tour
     */

    var handleCancelClick = function handleCancelClick(e) {
      e.preventDefault();
      step.cancel();
    };

    $$self.$set = function ($$props) {
      if ('cancelIcon' in $$props) $$invalidate('cancelIcon', cancelIcon = $$props.cancelIcon);
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
    };

    return {
      cancelIcon: cancelIcon,
      step: step,
      handleCancelClick: handleCancelClick
    };
  }

  var Shepherd_cancel_icon =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_cancel_icon, _SvelteComponent);

    function Shepherd_cancel_icon(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$2, create_fragment$2, safe_not_equal, ["cancelIcon", "step"]);
      return _this;
    }

    return Shepherd_cancel_icon;
  }(SvelteComponent);

  function create_fragment$3(ctx) {
    var h3;
    return {
      c: function c() {
        h3 = element("h3");
        attr(h3, "id", ctx.labelId);
        attr(h3, "class", "shepherd-title");
      },
      m: function m(target, anchor) {
        insert(target, h3, anchor);
        ctx.h3_binding(h3);
      },
      p: function p(changed, ctx) {
        if (changed.labelId) {
          attr(h3, "id", ctx.labelId);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) {
          detach(h3);
        }

        ctx.h3_binding(null);
      }
    };
  }

  function instance$3($$self, $$props, $$invalidate) {
    var labelId = $$props.labelId,
        element = $$props.element,
        title = $$props.title;
    afterUpdate(function () {
      if (isFunction(title)) {
        $$invalidate('title', title = title());
      }

      $$invalidate('element', element.innerHTML = title, element);
    });

    function h3_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        $$invalidate('element', element = $$value);
      });
    }

    $$self.$set = function ($$props) {
      if ('labelId' in $$props) $$invalidate('labelId', labelId = $$props.labelId);
      if ('element' in $$props) $$invalidate('element', element = $$props.element);
      if ('title' in $$props) $$invalidate('title', title = $$props.title);
    };

    return {
      labelId: labelId,
      element: element,
      title: title,
      h3_binding: h3_binding
    };
  }

  var Shepherd_title =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_title, _SvelteComponent);

    function Shepherd_title(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$3, create_fragment$3, safe_not_equal, ["labelId", "element", "title"]);
      return _this;
    }

    return Shepherd_title;
  }(SvelteComponent);

  function create_if_block_1(ctx) {
    var current;
    var shepherdtitle = new Shepherd_title({
      props: {
        labelId: ctx.labelId,
        title: ctx.title
      }
    });
    return {
      c: function c() {
        shepherdtitle.$$.fragment.c();
      },
      m: function m(target, anchor) {
        mount_component(shepherdtitle, target, anchor);
        current = true;
      },
      p: function p(changed, ctx) {
        var shepherdtitle_changes = {};
        if (changed.labelId) shepherdtitle_changes.labelId = ctx.labelId;
        if (changed.title) shepherdtitle_changes.title = ctx.title;
        shepherdtitle.$set(shepherdtitle_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdtitle.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdtitle.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdtitle, detaching);
      }
    };
  } // (40:4) {#if cancelIcon && cancelIcon.enabled}


  function create_if_block$1(ctx) {
    var current;
    var shepherdcancelicon = new Shepherd_cancel_icon({
      props: {
        cancelIcon: ctx.cancelIcon,
        step: ctx.step
      }
    });
    return {
      c: function c() {
        shepherdcancelicon.$$.fragment.c();
      },
      m: function m(target, anchor) {
        mount_component(shepherdcancelicon, target, anchor);
        current = true;
      },
      p: function p(changed, ctx) {
        var shepherdcancelicon_changes = {};
        if (changed.cancelIcon) shepherdcancelicon_changes.cancelIcon = ctx.cancelIcon;
        if (changed.step) shepherdcancelicon_changes.step = ctx.step;
        shepherdcancelicon.$set(shepherdcancelicon_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdcancelicon.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdcancelicon.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdcancelicon, detaching);
      }
    };
  }

  function create_fragment$4(ctx) {
    var header, t, current;
    var if_block0 = ctx.title && create_if_block_1(ctx);
    var if_block1 = ctx.cancelIcon && ctx.cancelIcon.enabled && create_if_block$1(ctx);
    return {
      c: function c() {
        header = element("header");
        if (if_block0) if_block0.c();
        t = space();
        if (if_block1) if_block1.c();
        attr(header, "class", "shepherd-header");
      },
      m: function m(target, anchor) {
        insert(target, header, anchor);
        if (if_block0) if_block0.m(header, null);
        append(header, t);
        if (if_block1) if_block1.m(header, null);
        current = true;
      },
      p: function p(changed, ctx) {
        if (ctx.title) {
          if (if_block0) {
            if_block0.p(changed, ctx);
            transition_in(if_block0, 1);
          } else {
            if_block0 = create_if_block_1(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(header, t);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, function () {
            if_block0 = null;
          });
          check_outros();
        }

        if (ctx.cancelIcon && ctx.cancelIcon.enabled) {
          if (if_block1) {
            if_block1.p(changed, ctx);
            transition_in(if_block1, 1);
          } else {
            if_block1 = create_if_block$1(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(header, null);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, function () {
            if_block1 = null;
          });
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o: function o(local) {
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) {
          detach(header);
        }

        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
      }
    };
  }

  function instance$4($$self, $$props, $$invalidate) {
    var labelId = $$props.labelId,
        step = $$props.step;
    var title, cancelIcon;

    $$self.$set = function ($$props) {
      if ('labelId' in $$props) $$invalidate('labelId', labelId = $$props.labelId);
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
    };

    $$self.$$.update = function ($$dirty) {
      if ($$dirty === void 0) {
        $$dirty = {
          step: 1
        };
      }

      if ($$dirty.step) {
        {
          $$invalidate('title', title = step.options.title);
          $$invalidate('cancelIcon', cancelIcon = step.options.cancelIcon);
        }
      }
    };

    return {
      labelId: labelId,
      step: step,
      title: title,
      cancelIcon: cancelIcon
    };
  }

  var Shepherd_header =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_header, _SvelteComponent);

    function Shepherd_header(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$4, create_fragment$4, safe_not_equal, ["labelId", "step"]);
      return _this;
    }

    return Shepherd_header;
  }(SvelteComponent);

  function create_fragment$5(ctx) {
    var div;
    return {
      c: function c() {
        div = element("div");
        attr(div, "class", "shepherd-text");
        attr(div, "id", ctx.descriptionId);
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        ctx.div_binding(div);
      },
      p: function p(changed, ctx) {
        if (changed.descriptionId) {
          attr(div, "id", ctx.descriptionId);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) {
          detach(div);
        }

        ctx.div_binding(null);
      }
    };
  }

  function instance$5($$self, $$props, $$invalidate) {
    var descriptionId = $$props.descriptionId,
        element = $$props.element,
        step = $$props.step;
    afterUpdate(function () {
      var text = step.options.text;

      if (isFunction(text)) {
        text = text.call(step);
      }

      if (isElement(text)) {
        element.appendChild(text);
      } else {
        $$invalidate('element', element.innerHTML = text, element);
      }
    });

    function div_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        $$invalidate('element', element = $$value);
      });
    }

    $$self.$set = function ($$props) {
      if ('descriptionId' in $$props) $$invalidate('descriptionId', descriptionId = $$props.descriptionId);
      if ('element' in $$props) $$invalidate('element', element = $$props.element);
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
    };

    return {
      descriptionId: descriptionId,
      element: element,
      step: step,
      div_binding: div_binding
    };
  }

  var Shepherd_text =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_text, _SvelteComponent);

    function Shepherd_text(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$5, create_fragment$5, safe_not_equal, ["descriptionId", "element", "step"]);
      return _this;
    }

    return Shepherd_text;
  }(SvelteComponent);

  function create_if_block_1$1(ctx) {
    var current;
    var shepherdtext = new Shepherd_text({
      props: {
        descriptionId: ctx.descriptionId,
        step: ctx.step
      }
    });
    return {
      c: function c() {
        shepherdtext.$$.fragment.c();
      },
      m: function m(target, anchor) {
        mount_component(shepherdtext, target, anchor);
        current = true;
      },
      p: function p(changed, ctx) {
        var shepherdtext_changes = {};
        if (changed.descriptionId) shepherdtext_changes.descriptionId = ctx.descriptionId;
        if (changed.step) shepherdtext_changes.step = ctx.step;
        shepherdtext.$set(shepherdtext_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdtext.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdtext.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdtext, detaching);
      }
    };
  } // (34:4) {#if Array.isArray(step.options.buttons) && step.options.buttons.length}


  function create_if_block$2(ctx) {
    var current;
    var shepherdfooter = new Shepherd_footer({
      props: {
        step: ctx.step
      }
    });
    return {
      c: function c() {
        shepherdfooter.$$.fragment.c();
      },
      m: function m(target, anchor) {
        mount_component(shepherdfooter, target, anchor);
        current = true;
      },
      p: function p(changed, ctx) {
        var shepherdfooter_changes = {};
        if (changed.step) shepherdfooter_changes.step = ctx.step;
        shepherdfooter.$set(shepherdfooter_changes);
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdfooter.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdfooter.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        destroy_component(shepherdfooter, detaching);
      }
    };
  }

  function create_fragment$6(ctx) {
    var div,
        t0,
        show_if_1 = !isUndefined$1(ctx.step.options.text),
        t1,
        show_if = Array.isArray(ctx.step.options.buttons) && ctx.step.options.buttons.length,
        current;
    var shepherdheader = new Shepherd_header({
      props: {
        labelId: ctx.labelId,
        step: ctx.step
      }
    });
    var if_block0 = show_if_1 && create_if_block_1$1(ctx);
    var if_block1 = show_if && create_if_block$2(ctx);
    return {
      c: function c() {
        div = element("div");
        shepherdheader.$$.fragment.c();
        t0 = space();
        if (if_block0) if_block0.c();
        t1 = space();
        if (if_block1) if_block1.c();
        attr(div, "class", "shepherd-content");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        mount_component(shepherdheader, div, null);
        append(div, t0);
        if (if_block0) if_block0.m(div, null);
        append(div, t1);
        if (if_block1) if_block1.m(div, null);
        current = true;
      },
      p: function p(changed, ctx) {
        var shepherdheader_changes = {};
        if (changed.labelId) shepherdheader_changes.labelId = ctx.labelId;
        if (changed.step) shepherdheader_changes.step = ctx.step;
        shepherdheader.$set(shepherdheader_changes);
        if (changed.step) show_if_1 = !isUndefined$1(ctx.step.options.text);

        if (show_if_1) {
          if (if_block0) {
            if_block0.p(changed, ctx);
            transition_in(if_block0, 1);
          } else {
            if_block0 = create_if_block_1$1(ctx);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(div, t1);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, function () {
            if_block0 = null;
          });
          check_outros();
        }

        if (changed.step) show_if = Array.isArray(ctx.step.options.buttons) && ctx.step.options.buttons.length;

        if (show_if) {
          if (if_block1) {
            if_block1.p(changed, ctx);
            transition_in(if_block1, 1);
          } else {
            if_block1 = create_if_block$2(ctx);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(div, null);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, function () {
            if_block1 = null;
          });
          check_outros();
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdheader.$$.fragment, local);
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdheader.$$.fragment, local);
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) {
          detach(div);
        }

        destroy_component(shepherdheader);
        if (if_block0) if_block0.d();
        if (if_block1) if_block1.d();
      }
    };
  }

  function instance$6($$self, $$props, $$invalidate) {
    var descriptionId = $$props.descriptionId,
        labelId = $$props.labelId,
        step = $$props.step;

    $$self.$set = function ($$props) {
      if ('descriptionId' in $$props) $$invalidate('descriptionId', descriptionId = $$props.descriptionId);
      if ('labelId' in $$props) $$invalidate('labelId', labelId = $$props.labelId);
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
    };

    return {
      descriptionId: descriptionId,
      labelId: labelId,
      step: step
    };
  }

  var Shepherd_content =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_content, _SvelteComponent);

    function Shepherd_content(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$6, create_fragment$6, safe_not_equal, ["descriptionId", "labelId", "step"]);
      return _this;
    }

    return Shepherd_content;
  }(SvelteComponent);

  function create_if_block$3(ctx) {
    var div;
    return {
      c: function c() {
        div = element("div");
        attr(div, "class", "shepherd-arrow");
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
      },
      d: function d(detaching) {
        if (detaching) {
          detach(div);
        }
      }
    };
  }

  function create_fragment$7(ctx) {
    var div, t, current, dispose;
    var if_block = ctx.step.options.arrow && ctx.step.options.attachTo && ctx.step.options.attachTo.element && create_if_block$3();
    var shepherdcontent = new Shepherd_content({
      props: {
        descriptionId: ctx.descriptionId,
        labelId: ctx.labelId,
        step: ctx.step
      }
    });
    var div_levels = [{
      "aria-describedby": !isUndefined$1(ctx.step.options.text) ? ctx.descriptionId : null
    }, {
      "aria-labelledby": ctx.step.options.title ? ctx.labelId : null
    }, ctx.dataStepId, {
      role: "dialog"
    }, {
      tabindex: "0"
    }];
    var div_data = {};

    for (var i = 0; i < div_levels.length; i += 1) {
      div_data = assign(div_data, div_levels[i]);
    }

    return {
      c: function c() {
        div = element("div");
        if (if_block) if_block.c();
        t = space();
        shepherdcontent.$$.fragment.c();
        set_attributes(div, div_data);
        toggle_class(div, "shepherd-has-cancel-icon", ctx.hasCancelIcon);
        toggle_class(div, "shepherd-has-title", ctx.hasTitle);
        toggle_class(div, "shepherd-element", true);
        dispose = listen(div, "keydown", ctx.handleKeyDown);
      },
      m: function m(target, anchor) {
        insert(target, div, anchor);
        if (if_block) if_block.m(div, null);
        append(div, t);
        mount_component(shepherdcontent, div, null);
        ctx.div_binding(div);
        current = true;
      },
      p: function p(changed, ctx) {
        if (ctx.step.options.arrow && ctx.step.options.attachTo && ctx.step.options.attachTo.element) {
          if (!if_block) {
            if_block = create_if_block$3();
            if_block.c();
            if_block.m(div, t);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }

        var shepherdcontent_changes = {};
        if (changed.descriptionId) shepherdcontent_changes.descriptionId = ctx.descriptionId;
        if (changed.labelId) shepherdcontent_changes.labelId = ctx.labelId;
        if (changed.step) shepherdcontent_changes.step = ctx.step;
        shepherdcontent.$set(shepherdcontent_changes);
        set_attributes(div, get_spread_update(div_levels, [(changed.isUndefined || changed.step || changed.descriptionId) && {
          "aria-describedby": !isUndefined$1(ctx.step.options.text) ? ctx.descriptionId : null
        }, (changed.step || changed.labelId) && {
          "aria-labelledby": ctx.step.options.title ? ctx.labelId : null
        }, changed.dataStepId && ctx.dataStepId, {
          role: "dialog"
        }, {
          tabindex: "0"
        }]));

        if (changed.hasCancelIcon) {
          toggle_class(div, "shepherd-has-cancel-icon", ctx.hasCancelIcon);
        }

        if (changed.hasTitle) {
          toggle_class(div, "shepherd-has-title", ctx.hasTitle);
        }
      },
      i: function i(local) {
        if (current) return;
        transition_in(shepherdcontent.$$.fragment, local);
        current = true;
      },
      o: function o(local) {
        transition_out(shepherdcontent.$$.fragment, local);
        current = false;
      },
      d: function d(detaching) {
        if (detaching) {
          detach(div);
        }

        if (if_block) if_block.d();
        destroy_component(shepherdcontent);
        ctx.div_binding(null);
        dispose();
      }
    };
  }

  var KEY_TAB = 9;
  var KEY_ESC = 27;
  var LEFT_ARROW = 37;
  var RIGHT_ARROW = 39;

  function getClassesArray(classes) {
    return classes.split(' ').filter(function (className) {
      return !!className.length;
    });
  }

  function instance$7($$self, $$props, $$invalidate) {
    var classPrefix = $$props.classPrefix,
        element = $$props.element,
        descriptionId = $$props.descriptionId,
        firstFocusableElement = $$props.firstFocusableElement,
        focusableElements = $$props.focusableElements,
        labelId = $$props.labelId,
        lastFocusableElement = $$props.lastFocusableElement,
        step = $$props.step,
        dataStepId = $$props.dataStepId;
    var hasCancelIcon, hasTitle, classes;

    var getElement = function getElement() {
      return element;
    };

    onMount(function () {
      var _dataStepId;

      // Get all elements that are focusable
      $$invalidate('dataStepId', dataStepId = (_dataStepId = {}, _dataStepId["data-" + classPrefix + "shepherd-step-id"] = step.id, _dataStepId));
      $$invalidate('focusableElements', focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'));
      $$invalidate('firstFocusableElement', firstFocusableElement = focusableElements[0]);
      $$invalidate('lastFocusableElement', lastFocusableElement = focusableElements[focusableElements.length - 1]);
    });
    afterUpdate(function () {
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
        var oldClasses = getClassesArray(classes);

        if (oldClasses.length) {
          var _element$classList;

          (_element$classList = element.classList).remove.apply(_element$classList, oldClasses);
        }
      }
    }

    function addClasses(classes) {
      if (isString(classes)) {
        var newClasses = getClassesArray(classes);

        if (newClasses.length) {
          var _element$classList2;

          (_element$classList2 = element.classList).add.apply(_element$classList2, newClasses);
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


    var handleKeyDown = function handleKeyDown(e) {
      var _step = step,
          tour = _step.tour;

      switch (e.keyCode) {
        case KEY_TAB:
          if (focusableElements.length === 0) {
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
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        $$invalidate('element', element = $$value);
      });
    }

    $$self.$set = function ($$props) {
      if ('classPrefix' in $$props) $$invalidate('classPrefix', classPrefix = $$props.classPrefix);
      if ('element' in $$props) $$invalidate('element', element = $$props.element);
      if ('descriptionId' in $$props) $$invalidate('descriptionId', descriptionId = $$props.descriptionId);
      if ('firstFocusableElement' in $$props) $$invalidate('firstFocusableElement', firstFocusableElement = $$props.firstFocusableElement);
      if ('focusableElements' in $$props) $$invalidate('focusableElements', focusableElements = $$props.focusableElements);
      if ('labelId' in $$props) $$invalidate('labelId', labelId = $$props.labelId);
      if ('lastFocusableElement' in $$props) $$invalidate('lastFocusableElement', lastFocusableElement = $$props.lastFocusableElement);
      if ('step' in $$props) $$invalidate('step', step = $$props.step);
      if ('dataStepId' in $$props) $$invalidate('dataStepId', dataStepId = $$props.dataStepId);
    };

    $$self.$$.update = function ($$dirty) {
      if ($$dirty === void 0) {
        $$dirty = {
          step: 1
        };
      }

      if ($$dirty.step) {
        {
          $$invalidate('hasCancelIcon', hasCancelIcon = step.options && step.options.cancelIcon && step.options.cancelIcon.enabled);
          $$invalidate('hasTitle', hasTitle = step.options && step.options.title);
        }
      }
    };

    return {
      classPrefix: classPrefix,
      element: element,
      descriptionId: descriptionId,
      firstFocusableElement: firstFocusableElement,
      focusableElements: focusableElements,
      labelId: labelId,
      lastFocusableElement: lastFocusableElement,
      step: step,
      dataStepId: dataStepId,
      hasCancelIcon: hasCancelIcon,
      hasTitle: hasTitle,
      getElement: getElement,
      handleKeyDown: handleKeyDown,
      div_binding: div_binding
    };
  }

  var Shepherd_element =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_element, _SvelteComponent);

    function Shepherd_element(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$7, create_fragment$7, safe_not_equal, ["classPrefix", "element", "descriptionId", "firstFocusableElement", "focusableElements", "labelId", "lastFocusableElement", "step", "dataStepId", "getElement"]);
      return _this;
    }

    _createClass(Shepherd_element, [{
      key: "getElement",
      get: function get() {
        return this.$$.ctx.getElement;
      }
    }]);

    return Shepherd_element;
  }(SvelteComponent);

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
  var smoothscroll_1 = smoothscroll.polyfill;

  smoothscroll.polyfill();
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
     * @param {Object} options.arrow Whether to display the arrow for the tooltip or not.
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
     * @param {boolean} options.buttons.button.disabled Should the button be disabled?
     * @param {string} options.buttons.button.label The aria-label text of the button
     * @param {boolean} options.canClickTarget A boolean, that when set to false, will set `pointer-events: none` on the target
     * @param {object} options.cancelIcon Options for the cancel icon
     * @param {boolean} options.cancelIcon.enabled Should a cancel “✕” be shown in the header of the step?
     * @param {string} options.cancelIcon.label The label to add for `aria-label`
     * @param {string} options.classes A string of extra classes to add to the step's content element.
     * @param {string} options.highlightClass An extra class to apply to the `attachTo` element when it is
     * highlighted (that is, when its step is active). You can then target that selector in your CSS.
     * @param {string} options.id The string to use as the `id` for the step.
     * @param {boolean|Object} options.scrollTo Should the element be scrolled to when this step is shown? If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{behavior: 'smooth', block: 'center'}`
     * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
     * define a custom action to do the scrolling, and possibly other logic.
     * @param {function} options.showOn A function that, when it returns `true`, will show the step.
     * If it returns false, the step will be skipped.
     * @param {string} options.tetherOptions Extra options to pass to tether
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
     * Hide the step
     */
    ;

    _proto.hide = function hide() {
      this.tour.modal.hide();
      this.trigger('before-hide');

      if (this.el) {
        this.el.hidden = true;
      }

      if (this.target) {
        this._updateStepTargetOnHide();
      }

      this.trigger('hide');
    }
    /**
     * Check if the step is open and visible
     * @return {boolean} True if the step is open and visible
     */
    ;

    _proto.isOpen = function isOpen() {
      return Boolean(this.el && !this.el.hidden);
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

        if (!isUndefined$1(beforeShowPromise)) {
          return beforeShowPromise.then(function () {
            return _this2._show();
          });
        }
      }

      this._show();
    }
    /**
     * Updates the options of the step.
     *
     * @param {Object} options The options for the step
     */
    ;

    _proto.updateStepOptions = function updateStepOptions(options) {
      Object.assign(this.options, options);

      if (this.shepherdElementComponent) {
        this.shepherdElementComponent.$set({
          step: this
        });
      }
    }
    /**
     * Creates Shepherd element for step based on options
     *
     * @return {Element} The DOM element for the step tooltip
     * @private
     */
    ;

    _proto._createTooltipContent = function _createTooltipContent() {
      var descriptionId = this.id + "-description";
      var labelId = this.id + "-label";
      this.shepherdElementComponent = new Shepherd_element({
        target: document.body,
        props: {
          classPrefix: this.classPrefix,
          descriptionId: descriptionId,
          labelId: labelId,
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
    ;

    _proto._scrollTo = function _scrollTo(scrollToOptions) {
      var _parseAttachTo = parseAttachTo(this),
          element = _parseAttachTo.element;

      if (isFunction(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if (isElement(element) && typeof element.scrollIntoView === 'function') {
        element.scrollIntoView(scrollToOptions);
      }
    }
    /**
     * _getClassOptions gets all possible classes for the step
     * @param {Object} stepOptions The step specific options
     * @returns {String} unique string from array of classes
     * @private
     */
    ;

    _proto._getClassOptions = function _getClassOptions(stepOptions) {
      var defaultStepOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
      var stepClasses = stepOptions.classes ? stepOptions.classes : '';
      var defaultStepOptionsClasses = defaultStepOptions && defaultStepOptions.classes ? defaultStepOptions.classes : '';
      var allClasses = [].concat(stepClasses.split(' '), defaultStepOptionsClasses.split(' '));
      var uniqClasses = new Set(allClasses);
      return Array.from(uniqClasses).join(' ').trim();
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

      var tourOptions = this.tour && this.tour.options && this.tour.options.defaultStepOptions;
      this.options = Object.assign({
        arrow: true
      }, tourOptions, options);
      var when = this.options.when;
      this.options.classes = this._getClassOptions(options);
      this.destroy();
      this.id = this.options.id || "step-" + uuid();

      if (when) {
        Object.keys(when).forEach(function (event) {
          _this3.on(event, when[event], _this3);
        });
      }
    }
    /**
     * Create the element and set up the Tether instance
     * @private
     */
    ;

    _proto._setupElements = function _setupElements() {
      if (!isUndefined$1(this.el)) {
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
     * sets up a Tether instance for the tooltip, then triggers `show`.
     * @private
     */
    ;

    _proto._show = function _show() {
      var _this4 = this;

      this.trigger('before-show');

      this._setupElements();

      this.tour.modal.setupForStep(this);

      this._styleTargetElementForStep(this);

      this.el.hidden = false;
      this.tooltip.position();
      var target = this.target || document.body;
      target.classList.add(this.classPrefix + "shepherd-enabled", this.classPrefix + "shepherd-target");

      if (this.options.scrollTo) {
        setTimeout(function () {
          _this4._scrollTo(_this4.options.scrollTo);
        });
      }

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

      if (step.options.highlightClass) {
        targetElement.classList.add(step.options.highlightClass);
      }

      if (step.options.canClickTarget === false) {
        targetElement.classList.add('shepherd-target-click-disabled');
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

  /**
   * Cleanup the steps and set pointerEvents back to 'auto'
   * @param tour The tour object
   */
  function cleanupSteps(tour) {
    if (tour) {
      var steps = tour.steps;
      steps.forEach(function (step) {
        if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
          if (step.target instanceof HTMLElement) {
            step.target.classList.remove('shepherd-target-click-disabled');
          }
        }
      });
    }
  }

  function create_fragment$8(ctx) {
    var svg, path, path_d_value, svg_class_value, dispose;
    return {
      c: function c() {
        svg = svg_element("svg");
        path = svg_element("path");
        attr(path, "d", path_d_value = "M " + ctx.openingProperties.x + " " + ctx.openingProperties.y + " H " + (ctx.openingProperties.width + ctx.openingProperties.x) + " V " + (ctx.openingProperties.height + ctx.openingProperties.y) + " H " + ctx.openingProperties.x + " L " + ctx.openingProperties.x + " 0 Z M 0 0 H " + ctx.window.innerWidth + " V " + ctx.window.innerHeight + " H 0 L 0 0 Z");
        attr(svg, "class", svg_class_value = (ctx.modalIsVisible ? 'shepherd-modal-is-visible' : '') + " shepherd-modal-overlay-container");
        dispose = listen(svg, "touchmove", ctx._preventModalOverlayTouch);
      },
      m: function m(target, anchor) {
        insert(target, svg, anchor);
        append(svg, path);
        ctx.svg_binding(svg);
      },
      p: function p(changed, ctx) {
        if (changed.openingProperties && path_d_value !== (path_d_value = "M " + ctx.openingProperties.x + " " + ctx.openingProperties.y + " H " + (ctx.openingProperties.width + ctx.openingProperties.x) + " V " + (ctx.openingProperties.height + ctx.openingProperties.y) + " H " + ctx.openingProperties.x + " L " + ctx.openingProperties.x + " 0 Z M 0 0 H " + ctx.window.innerWidth + " V " + ctx.window.innerHeight + " H 0 L 0 0 Z")) {
          attr(path, "d", path_d_value);
        }

        if (changed.modalIsVisible && svg_class_value !== (svg_class_value = (ctx.modalIsVisible ? 'shepherd-modal-is-visible' : '') + " shepherd-modal-overlay-container")) {
          attr(svg, "class", svg_class_value);
        }
      },
      i: noop,
      o: noop,
      d: function d(detaching) {
        if (detaching) {
          detach(svg);
        }

        ctx.svg_binding(null);
        dispose();
      }
    };
  }

  function _getScrollParent(element) {
    if (!element) {
      return null;
    }

    var isHtmlElement = element instanceof HTMLElement;
    var overflowY = isHtmlElement && window.getComputedStyle(element).overflowY;
    var isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';

    if (isScrollable && element.scrollHeight >= element.clientHeight) {
      return element;
    }

    return _getScrollParent(element.parentElement);
  }

  function _getVisibleHeight(element, scrollParent) {
    var elementRect = element.getBoundingClientRect();
    var top = elementRect.y || elementRect.top;
    var bottom = elementRect.bottom || top + elementRect.height;

    if (scrollParent) {
      var scrollRect = scrollParent.getBoundingClientRect();
      var scrollTop = scrollRect.y || scrollRect.top;
      var scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;
      top = Math.max(top, scrollTop);
      bottom = Math.min(bottom, scrollBottom);
    }

    var height = Math.max(bottom - top, 0); // Default to 0 if height is negative

    return {
      y: top,
      height: height
    };
  }

  function instance$8($$self, $$props, $$invalidate) {
    var element = $$props.element,
        openingProperties = $$props.openingProperties;
    var guid = uuid();
    var modalIsVisible = false;
    var rafId = undefined;
    closeModalOpening();

    var getElement = function getElement() {
      return element;
    };

    function closeModalOpening() {
      $$invalidate('openingProperties', openingProperties = {
        height: 0,
        x: 0,
        y: 0,
        width: 0
      });
    }
    /**
     * Hide the modal overlay
     */


    function hide() {
      $$invalidate('modalIsVisible', modalIsVisible = false); // Ensure we cleanup all event listeners when we hide the modal

      _cleanupStepEventListeners();
    }
    /**
     * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
     * @param {HTMLElement} targetElement The element the opening will expose
     * @param {HTMLElement} scrollParent The scrollable parent of the target element
     * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
     */


    function positionModalOpening(targetElement, scrollParent, modalOverlayOpeningPadding) {
      if (modalOverlayOpeningPadding === void 0) {
        modalOverlayOpeningPadding = 0;
      }

      if (targetElement.getBoundingClientRect) {
        var _getVisibleHeight2 = _getVisibleHeight(targetElement, scrollParent),
            y = _getVisibleHeight2.y,
            height = _getVisibleHeight2.height;

        var _targetElement$getBou = targetElement.getBoundingClientRect(),
            x = _targetElement$getBou.x,
            width = _targetElement$getBou.width,
            left = _targetElement$getBou.left; // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top


        $$invalidate('openingProperties', openingProperties = {
          x: (x || left) - modalOverlayOpeningPadding,
          y: y - modalOverlayOpeningPadding,
          width: width + modalOverlayOpeningPadding * 2,
          height: height + modalOverlayOpeningPadding * 2
        });
      }
    }
    /**
     * If modal is enabled, setup the svg mask opening and modal overlay for the step
     * @param {Step} step The step instance
     */


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
    /**
     * Show the modal overlay
     */


    function show() {
      $$invalidate('modalIsVisible', modalIsVisible = true);
    }

    var _preventModalBodyTouch = function _preventModalBodyTouch(e) {
      e.preventDefault();
    };

    var _preventModalOverlayTouch = function _preventModalOverlayTouch(e) {
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
      var modalOverlayOpeningPadding = step.options.modalOverlayOpeningPadding;

      if (step.target) {
        var scrollParent = _getScrollParent(step.target); // Setup recursive function to call requestAnimationFrame to update the modal opening position


        var rafLoop = function rafLoop() {
          rafId = undefined;
          positionModalOpening(step.target, scrollParent, modalOverlayOpeningPadding);
          rafId = requestAnimationFrame(rafLoop);
        };

        rafLoop();

        _addStepEventListeners();
      } else {
        closeModalOpening();
      }
    }

    function svg_binding($$value) {
      binding_callbacks[$$value ? 'unshift' : 'push'](function () {
        $$invalidate('element', element = $$value);
      });
    }

    $$self.$set = function ($$props) {
      if ('element' in $$props) $$invalidate('element', element = $$props.element);
      if ('openingProperties' in $$props) $$invalidate('openingProperties', openingProperties = $$props.openingProperties);
    };

    return {
      element: element,
      openingProperties: openingProperties,
      modalIsVisible: modalIsVisible,
      getElement: getElement,
      closeModalOpening: closeModalOpening,
      hide: hide,
      positionModalOpening: positionModalOpening,
      setupForStep: setupForStep,
      show: show,
      _preventModalOverlayTouch: _preventModalOverlayTouch,
      window: window,
      svg_binding: svg_binding
    };
  }

  var Shepherd_modal =
  /*#__PURE__*/
  function (_SvelteComponent) {
    _inheritsLoose(Shepherd_modal, _SvelteComponent);

    function Shepherd_modal(options) {
      var _this;

      _this = _SvelteComponent.call(this) || this;
      init(_assertThisInitialized(_this), options, instance$8, create_fragment$8, safe_not_equal, ["element", "openingProperties", "getElement", "closeModalOpening", "hide", "positionModalOpening", "setupForStep", "show"]);
      return _this;
    }

    _createClass(Shepherd_modal, [{
      key: "getElement",
      get: function get() {
        return this.$$.ctx.getElement;
      }
    }, {
      key: "closeModalOpening",
      get: function get() {
        return this.$$.ctx.closeModalOpening;
      }
    }, {
      key: "hide",
      get: function get() {
        return this.$$.ctx.hide;
      }
    }, {
      key: "positionModalOpening",
      get: function get() {
        return this.$$.ctx.positionModalOpening;
      }
    }, {
      key: "setupForStep",
      get: function get() {
        return this.$$.ctx.setupForStep;
      }
    }, {
      key: "show",
      get: function get() {
        return this.$$.ctx.show;
      }
    }]);

    return Shepherd_modal;
  }(SvelteComponent);

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
     * @param {boolean} options.exitOnEsc Exiting the tour with the escape key will be enabled unless this is explicitly
     * set to false.
     * @param {boolean} options.keyboardNavigation Navigating the tour via left and right arrow keys will be enabled
     * unless this is explicitly set to false.
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
    function Tour(options) {
      var _this;

      if (options === void 0) {
        options = {};
      }

      _this = _Evented.call(this, options) || this;
      autoBind(_assertThisInitialized(_this));
      var defaultTourOptions = {
        exitOnEsc: true,
        keyboardNavigation: true
      };
      _this.options = Object.assign({}, defaultTourOptions, options);
      _this.classPrefix = normalizePrefix(_this.options.classPrefix);
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
      _this.modal = new Shepherd_modal({
        target: options.modalContainer || document.body,
        props: {
          classPrefix: _this.classPrefix,
          styles: _this.styles
        }
      });

      _this._setTourID();

      return _assertThisInitialized(_this) || _assertThisInitialized(_this);
    }
    /**
     * Adds a new step to the tour
     * @param {Object|Step} options An object containing step options or a Step instance
     * @param {number} index The optional index to insert the step at. If undefined, the step
     * is added to the end of the array.
     * @return {Step} The newly added step
     */


    var _proto = Tour.prototype;

    _proto.addStep = function addStep(options, index) {
      var step = options;

      if (!(step instanceof Step)) {
        step = new Step(this, step);
      } else {
        step.tour = this;
      }

      if (!isUndefined$1(index)) {
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
      this.trigger('start'); // Save the focused element before the tour opens

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
      this.trigger('inactive', {
        tour: this
      });
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
      this.trigger('active', {
        tour: this
      });
      Shepherd.activeTour = this;
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
      this.id = tourName + "--" + uuid();
    };

    return Tour;
  }(Evented);

  Object.assign(Shepherd, {
    Tour: Tour,
    Step: Step
  });

  return Shepherd;

})));
//# sourceMappingURL=shepherd.js.map
