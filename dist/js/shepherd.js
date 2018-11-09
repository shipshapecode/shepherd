/*!
 * /*! shepherd.js 2.0.0-beta.35 * /
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Shepherd"] = factory();
	else
		root["Shepherd"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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

module.exports = isUndefined;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

module.exports = isObjectLike;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isArray = __webpack_require__(8),
    isObjectLike = __webpack_require__(1);

/** `Object#toString` result references. */
var stringTag = '[object String]';

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
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
}

module.exports = isString;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Evented = undefined;

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _drop2 = __webpack_require__(15);

var _drop3 = _interopRequireDefault(_drop2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Evented =
/*#__PURE__*/
exports.Evented = function () {
  function Evented() {
    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: "on",
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if ((0, _isUndefined3.default)(this.bindings)) {
        this.bindings = {};
      }

      if ((0, _isUndefined3.default)(this.bindings[event])) {
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

      if ((0, _isUndefined3.default)(this.bindings) || (0, _isUndefined3.default)(this.bindings[event])) {
        return false;
      }

      if ((0, _isUndefined3.default)(handler)) {
        delete this.bindings[event];
      } else {
        this.bindings[event].forEach(function (binding, index) {
          if (binding.handler === handler) {
            _this.bindings[event].splice(index, 1);
          }
        });
      }
    }
  }, {
    key: "trigger",
    value: function trigger(event) {
      var _this2 = this;

      if (!(0, _isUndefined3.default)(this.bindings) && this.bindings[event]) {
        var args = (0, _drop3.default)(arguments);
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
    }
  }]);

  return Evented;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isObject = __webpack_require__(18);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
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
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

module.exports = overArg;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = undefined;

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(2);

var _isString3 = _interopRequireDefault(_isString2);

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEmpty2 = __webpack_require__(9);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isElement2 = __webpack_require__(27);

var _isElement3 = _interopRequireDefault(_isElement2);

var _forOwn2 = __webpack_require__(10);

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _evented = __webpack_require__(4);

__webpack_require__(35);

var _bind = __webpack_require__(11);

var _utils = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

/**
 * Creates incremented ID for each newly created step
 *
 * @private
 * @return {Number} The unique id for the step
 */
var uniqueId = function () {
  var id = 0;
  return function () {
    return ++id;
  };
}();
/**
 * Class representing steps to be added to a tour
 * @extends {Evented}
 */


var Step =
/*#__PURE__*/
exports.Step = function (_Evented) {
  _inherits(Step, _Evented);

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
  function Step(tour, options) {
    var _this;

    _classCallCheck(this, Step);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Step).call(this, tour, options));
    _this.tour = tour;

    _bind.bindMethods.call(_assertThisInitialized(_assertThisInitialized(_this)), ['_show', 'cancel', 'complete', 'destroy', 'hide', 'isOpen', 'scrollTo', 'setupElements', 'show']);

    _this.setOptions(options);

    _this.bindAdvance = _bind.bindAdvance.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindButtonEvents = _bind.bindButtonEvents.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.bindCancelLink = _bind.bindCancelLink.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setupTooltip = _utils.setupTooltip.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.parseAttachTo = _utils.parseAttachTo.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _possibleConstructorReturn(_this, _assertThisInitialized(_assertThisInitialized(_this)));
  }
  /**
   * Adds buttons to the step as passed into options
   *
   * @private
   * @param {HTMLElement} content The element for the step, to append the footer with buttons to
   */


  _createClass(Step, [{
    key: "_addButtons",
    value: function _addButtons(content) {
      var _this2 = this;

      if (!(0, _isEmpty3.default)(this.options.buttons)) {
        var footer = document.createElement('footer');
        var buttons = (0, _utils.createFromHTML)('<ul class="shepherd-buttons"></ul>');
        footer.classList.add('shepherd-footer');
        this.options.buttons.map(function (cfg) {
          var button = (0, _utils.createFromHTML)("<li><a class=\"shepherd-button ".concat(cfg.classes || '', "\">").concat(cfg.text, "</a>"));
          buttons.appendChild(button);

          _this2.bindButtonEvents(cfg, button.querySelector('a'));
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

  }, {
    key: "_addCancelLink",
    value: function _addCancelLink(element, header) {
      if (this.options.showCancelLink) {
        var link = (0, _utils.createFromHTML)('<a href class="shepherd-cancel-link"></a>');
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

  }, {
    key: "_addContent",
    value: function _addContent(content) {
      var text = (0, _utils.createFromHTML)('<div class="shepherd-text"></div>');
      var paragraphs = this.options.text;

      if ((0, _isFunction3.default)(paragraphs)) {
        paragraphs = paragraphs.call(this, text);
      }

      if (paragraphs instanceof HTMLElement) {
        text.appendChild(paragraphs);
      } else {
        if ((0, _isString3.default)(paragraphs)) {
          paragraphs = [paragraphs];
        }

        paragraphs.map(function (paragraph) {
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

  }, {
    key: "_createTooltipContent",
    value: function _createTooltipContent() {
      var content = document.createElement('div');
      var classes = this.options.classes || '';
      var element = (0, _utils.createFromHTML)("<div class='".concat(classes, "' data-shepherd-step-id='").concat(this.id, "' id=\"step-").concat(this.options.id, "-").concat(uniqueId(), "\"}>"));
      var header = document.createElement('header');

      if (this.options.title) {
        var title = document.createElement('h3');
        title.classList.add('shepherd-title');
        title.innerHTML = "".concat(this.options.title);
        header.appendChild(title);
        element.classList.add('shepherd-has-title');
      }

      content.classList.add('shepherd-content');
      header.classList.add('shepherd-header');
      element.appendChild(content);
      content.appendChild(header);

      if (!(0, _isUndefined3.default)(this.options.text)) {
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

  }, {
    key: "getTour",
    value: function getTour() {
      return this.tour;
    }
    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */

  }, {
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

      if ((0, _isElement3.default)(this.el) && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        this.el = null;
      }

      if (this.target) {
        this.target.classList.remove('shepherd-enabled', 'shepherd-target');
      }

      this.trigger('destroy');
    }
    /**
     * Hide the step and destroy the tippy instance
     */

  }, {
    key: "hide",
    value: function hide() {
      this.trigger('before-hide');
      document.body.removeAttribute('data-shepherd-step');

      if (this.target) {
        this.target.classList.remove('shepherd-enabled', 'shepherd-target');
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
     * Create the element and set up the tippy instance
     */

  }, {
    key: "setupElements",
    value: function setupElements() {
      if (!(0, _isUndefined3.default)(this.el)) {
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

  }, {
    key: "scrollTo",
    value: function scrollTo() {
      var _this$parseAttachTo = this.parseAttachTo(),
          element = _this$parseAttachTo.element;

      if ((0, _isFunction3.default)(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if ((0, _isElement3.default)(element)) {
        element.scrollIntoView();
      }
    }
    /**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param {Object} options The options for the step
     */

  }, {
    key: "setOptions",
    value: function setOptions() {
      var _this3 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options = options;
      var when = this.options.when;
      this.destroy();
      this.id = this.options.id || "step-".concat(uniqueId());
      (0, _forOwn3.default)(when, function (handler, event) {
        _this3.on(event, handler, _this3);
      });
    }
    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     * @return {*|Promise}
     */

  }, {
    key: "show",
    value: function show() {
      var _this4 = this;

      if ((0, _isFunction3.default)(this.options.beforeShowPromise)) {
        var beforeShowPromise = this.options.beforeShowPromise();

        if (!(0, _isUndefined3.default)(beforeShowPromise)) {
          return beforeShowPromise.then(function () {
            return _this4._show();
          });
        }
      }

      this._show();
    }
    /**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a tippy instance for the tooltip, then triggers `show`.
     * @private
     */

  }, {
    key: "_show",
    value: function _show() {
      var _this5 = this;

      this.trigger('before-show');

      if (!this.el) {
        this.setupElements();
      }

      this.target.classList.add('shepherd-enabled', 'shepherd-target');
      document.body.setAttribute('data-shepherd-step', this.id);

      if (this.options.scrollTo) {
        setTimeout(function () {
          _this5.scrollTo();
        });
      }

      this.tooltip.show();
      this.trigger('show');
    }
  }]);

  return Step;
}(_evented.Evented);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

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

module.exports = isArray;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(19),
    getTag = __webpack_require__(20),
    isArguments = __webpack_require__(21),
    isArray = __webpack_require__(8),
    isArrayLike = __webpack_require__(22),
    isBuffer = __webpack_require__(24),
    isPrototype = __webpack_require__(25),
    isTypedArray = __webpack_require__(26);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
  var tag = getTag(value);
  if (tag == mapTag || tag == setTag) {
    return !value.size;
  }
  if (isPrototype(value)) {
    return !baseKeys(value).length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(30),
    castFunction = __webpack_require__(34);

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

module.exports = forOwn;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(2);

var _isString3 = _interopRequireDefault(_isString2);

var _forOwn2 = __webpack_require__(10);

var _forOwn3 = _interopRequireDefault(_forOwn2);

exports.bindAdvance = bindAdvance;
exports.bindButtonEvents = bindButtonEvents;
exports.bindCancelLink = bindCancelLink;
exports.bindMethods = bindMethods;

var _utils = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sets up the handler to determine if we should advance the tour
 * @private
 */
function _setupAdvanceOnHandler(selector) {
  var _this = this;

  return function (event) {
    if (_this.isOpen()) {
      var targetIsEl = _this.el && event.target === _this.el;
      var targetIsSelector = !(0, _isUndefined3.default)(selector) && event.target.matches(selector);

      if (targetIsSelector || targetIsEl) {
        _this.tour.next();
      }
    }
  };
}
/**
 * Bind the event handler for advanceOn
 */


function bindAdvance() {
  // An empty selector matches the step element
  var _parseShorthand = (0, _utils.parseShorthand)(this.options.advanceOn, ['selector', 'event']),
      event = _parseShorthand.event,
      selector = _parseShorthand.selector;

  var handler = _setupAdvanceOnHandler.call(this, selector); // TODO: this should also bind/unbind on show/hide


  var el = document.querySelector(selector);

  if (!(0, _isUndefined3.default)(selector) && el) {
    el.addEventListener(event, handler);
  } else {
    document.body.addEventListener(event, handler, true);
  }

  this.on('destroy', function () {
    return document.body.removeEventListener(event, handler, true);
  });
}
/**
 * Bind events to the buttons for next, back, etc
 * @param {Object} cfg An object containing the config options for the button
 * @param {HTMLElement} el The element for the button
 */


function bindButtonEvents(cfg, el) {
  var _this2 = this;

  cfg.events = cfg.events || {};

  if (!(0, _isUndefined3.default)(cfg.action)) {
    // Including both a click event and an action is not supported
    cfg.events.click = cfg.action;
  }

  (0, _forOwn3.default)(cfg.events, function (handler, event) {
    if ((0, _isString3.default)(handler)) {
      var page = handler;

      handler = function handler() {
        return _this2.tour.show(page);
      };
    }

    el.dataset.buttonEvent = true;
    el.addEventListener(event, handler); // Cleanup event listeners on destroy

    _this2.on('destroy', function () {
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
  var _this3 = this;

  link.addEventListener('click', function (e) {
    e.preventDefault();

    _this3.cancel();
  });
}
/**
 * Take an array of strings and look up methods by name, then bind them to `this`
 * @param {String[]} methods The names of methods to bind
 */


function bindMethods(methods) {
  var _this4 = this;

  methods.map(function (method) {
    _this4[method] = _this4[method].bind(_this4);
  });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zipObject2 = __webpack_require__(36);

var _zipObject3 = _interopRequireDefault(_zipObject2);

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isObjectLike2 = __webpack_require__(1);

var _isObjectLike3 = _interopRequireDefault(_isObjectLike2);

var _isString2 = __webpack_require__(2);

var _isString3 = _interopRequireDefault(_isString2);

exports.createFromHTML = createFromHTML;
exports._parseAttachToOpts = _parseAttachToOpts;
exports.parseShorthand = parseShorthand;
exports.setupTooltip = setupTooltip;
exports.parseAttachTo = parseAttachTo;

var _tippy = __webpack_require__(13);

var _tippy2 = _interopRequireDefault(_tippy);

var _errorMessages = __webpack_require__(44);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var centeredStylePopperModifier = {
  computeStyle: {
    enabled: true,
    fn: function fn(data) {
      data.styles = Object.assign({}, data.styles, {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      });
      return data;
    }
  }
}; // Used to compose settings for tippyOptions.popperOptions (https://atomiks.github.io/tippyjs/#popper-options-option)

var defaultPopperOptions = {
  positionFixed: true
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
 * Parse the position object or string to return the attachment and element to attach to
 * @param {Object|String} position Either a string or object denoting the selector and position for attachment
 * @return {Object} The object with `element` and `on` for the step
 * @private
 */


function _parseAttachToOpts(opts) {
  if ((0, _isObjectLike3.default)(opts)) {
    if (opts.hasOwnProperty('element') && opts.hasOwnProperty('on')) {
      return opts;
    }

    return null;
  }

  var positionRe = /^(.+) ((auto|top|left|right|bottom)(-start|-end)?)$/;
  var matches = positionRe.exec(opts);

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
  if (obj === null || (0, _isUndefined3.default)(obj)) {
    return obj;
  } else if ((0, _isObjectLike3.default)(obj)) {
    return obj;
  }

  var values = obj.split(' ');
  return (0, _zipObject3.default)(props, values);
}
/**
 * Determines options for the tooltip and initializes
 * `this.tooltip` as a Tippy.js instance.
 */


function setupTooltip() {
  if ((0, _isUndefined3.default)(_tippy2.default)) {
    throw new Error(_errorMessages.missingTippy);
  }

  if (this.tooltip) {
    this.tooltip.destroy();
  }

  var attachToOpts = this.parseAttachTo();
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
  var options = _parseAttachToOpts(this.options.attachTo) || {};
  var returnOpts = Object.assign({}, options);

  if ((0, _isString3.default)(options.element)) {
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

  var tippyOptions = _makeAttachedTippyOptions.call(this, attachToOptions);

  return _tippy2.default.one(attachToOptions.element, tippyOptions);
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
  var resultingTippyOptions = _objectSpread({
    content: this.el,
    placement: attachToOptions.on || 'right'
  }, this.options.tippyOptions);

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
  var tippyOptions = _objectSpread({
    content: this.el,
    placement: 'top'
  }, this.options.tippyOptions);

  tippyOptions.arrow = false;
  tippyOptions.popperOptions = tippyOptions.popperOptions || {};
  var finalPopperOptions = Object.assign({}, defaultPopperOptions, tippyOptions.popperOptions, {
    modifiers: Object.assign(centeredStylePopperModifier, tippyOptions.popperOptions.modifiers)
  });
  tippyOptions.popperOptions = finalPopperOptions;
  return _tippy2.default.one(document.body, tippyOptions);
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(e,t){ true?module.exports=t():undefined})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var a=getComputedStyle(e,null);return t?a[t]:a}function a(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function r(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var p=t(e),o=p.overflow,i=p.overflowX,n=p.overflowY;return /(auto|scroll|overlay)/.test(o+n+i)?e:r(a(e))}function p(e){return 11===e?he:10===e?be:he||be}function o(e){if(!e)return document.documentElement;for(var a=p(10)?document.body:null,r=e.offsetParent;r===a&&e.nextElementSibling;)r=(e=e.nextElementSibling).offsetParent;var i=r&&r.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TD','TABLE'].indexOf(r.nodeName)&&'static'===t(r,'position')?o(r):r:e?e.ownerDocument.documentElement:document.documentElement}function n(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||o(e.firstElementChild)===e)}function s(e){return null===e.parentNode?e:s(e.parentNode)}function l(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var a=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,r=a?e:t,p=a?t:e,i=document.createRange();i.setStart(r,0),i.setEnd(p,0);var d=i.commonAncestorContainer;if(e!==d&&t!==d||r.contains(p))return n(d)?d:o(d);var c=s(e);return c.host?l(c.host,t):l(e,s(t).host)}function d(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',a='top'===t?'scrollTop':'scrollLeft',r=e.nodeName;if('BODY'===r||'HTML'===r){var p=e.ownerDocument.documentElement,o=e.ownerDocument.scrollingElement||p;return o[a]}return e[a]}function c(e,t){var a=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],r=d(t,'top'),p=d(t,'left'),o=a?-1:1;return e.top+=r*o,e.bottom+=r*o,e.left+=p*o,e.right+=p*o,e}function m(e,t){var a='x'===t?'Left':'Top',r='Left'===a?'Right':'Bottom';return parseFloat(e['border'+a+'Width'],10)+parseFloat(e['border'+r+'Width'],10)}function f(e,t,a,r){return ae(t['offset'+e],t['scroll'+e],a['client'+e],a['offset'+e],a['scroll'+e],p(10)?parseInt(a['offset'+e])+parseInt(r['margin'+('Height'===e?'Top':'Left')])+parseInt(r['margin'+('Height'===e?'Bottom':'Right')]):0)}function h(e){var t=e.body,a=e.documentElement,r=p(10)&&getComputedStyle(a);return{height:f('Height',t,a,r),width:f('Width',t,a,r)}}function b(e){return xe({},e,{right:e.left+e.width,bottom:e.top+e.height})}function u(e){var a={};try{if(p(10)){a=e.getBoundingClientRect();var r=d(e,'top'),o=d(e,'left');a.top+=r,a.left+=o,a.bottom+=r,a.right+=o}else a=e.getBoundingClientRect()}catch(t){}var i={left:a.left,top:a.top,width:a.right-a.left,height:a.bottom-a.top},n='HTML'===e.nodeName?h(e.ownerDocument):{},s=n.width||e.clientWidth||i.right-i.left,l=n.height||e.clientHeight||i.bottom-i.top,c=e.offsetWidth-s,f=e.offsetHeight-l;if(c||f){var y=t(e);c-=m(y,'x'),f-=m(y,'y'),i.width-=c,i.height-=f}return b(i)}function y(e,a){var o=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],i=p(10),n='HTML'===a.nodeName,s=u(e),l=u(a),d=r(e),m=t(a),f=parseFloat(m.borderTopWidth,10),h=parseFloat(m.borderLeftWidth,10);o&&n&&(l.top=ae(l.top,0),l.left=ae(l.left,0));var y=b({top:s.top-l.top-f,left:s.left-l.left-h,width:s.width,height:s.height});if(y.marginTop=0,y.marginLeft=0,!i&&n){var g=parseFloat(m.marginTop,10),x=parseFloat(m.marginLeft,10);y.top-=f-g,y.bottom-=f-g,y.left-=h-x,y.right-=h-x,y.marginTop=g,y.marginLeft=x}return(i&&!o?a.contains(d):a===d&&'BODY'!==d.nodeName)&&(y=c(y,a)),y}function g(e){var t=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],a=e.ownerDocument.documentElement,r=y(e,a),p=ae(a.clientWidth,window.innerWidth||0),o=ae(a.clientHeight,window.innerHeight||0),i=t?0:d(a),n=t?0:d(a,'left'),s={top:i-r.top+r.marginTop,left:n-r.left+r.marginLeft,width:p,height:o};return b(s)}function x(e){var r=e.nodeName;return'BODY'!==r&&'HTML'!==r&&('fixed'===t(e,'position')||x(a(e)))}function w(e){if(!e||!e.parentElement||p())return document.documentElement;for(var a=e.parentElement;a&&'none'===t(a,'transform');)a=a.parentElement;return a||document.documentElement}function v(e,t,p,o){var i=!!(4<arguments.length&&void 0!==arguments[4])&&arguments[4],n={top:0,left:0},s=i?w(e):l(e,t);if('viewport'===o)n=g(s,i);else{var d;'scrollParent'===o?(d=r(a(t)),'BODY'===d.nodeName&&(d=e.ownerDocument.documentElement)):'window'===o?d=e.ownerDocument.documentElement:d=o;var c=y(d,s,i);if('HTML'===d.nodeName&&!x(s)){var m=h(e.ownerDocument),f=m.height,b=m.width;n.top+=c.top-c.marginTop,n.bottom=f+c.top,n.left+=c.left-c.marginLeft,n.right=b+c.left}else n=c}p=p||0;var u='number'==typeof p;return n.left+=u?p:p.left||0,n.top+=u?p:p.top||0,n.right-=u?p:p.right||0,n.bottom-=u?p:p.bottom||0,n}function k(e){var t=e.width,a=e.height;return t*a}function E(e,t,a,r,p){var o=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var i=v(a,r,o,p),n={top:{width:i.width,height:t.top-i.top},right:{width:i.right-t.right,height:i.height},bottom:{width:i.width,height:i.bottom-t.bottom},left:{width:t.left-i.left,height:i.height}},s=Object.keys(n).map(function(e){return xe({key:e},n[e],{area:k(n[e])})}).sort(function(e,t){return t.area-e.area}),l=s.filter(function(e){var t=e.width,r=e.height;return t>=a.clientWidth&&r>=a.clientHeight}),d=0<l.length?l[0].key:s[0].key,c=e.split('-')[1];return d+(c?'-'+c:'')}function O(e,t,a){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,p=r?w(t):l(t,a);return y(a,p,r)}function L(e){var t=getComputedStyle(e),a=parseFloat(t.marginTop)+parseFloat(t.marginBottom),r=parseFloat(t.marginLeft)+parseFloat(t.marginRight),p={width:e.offsetWidth+r,height:e.offsetHeight+a};return p}function C(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function T(e,t,a){a=a.split('-')[0];var r=L(e),p={width:r.width,height:r.height},o=-1!==['right','left'].indexOf(a),i=o?'top':'left',n=o?'left':'top',s=o?'height':'width',l=o?'width':'height';return p[i]=t[i]+t[s]/2-r[s]/2,p[n]=a===n?t[n]-r[l]:t[C(n)],p}function A(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function Y(e,t,a){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===a});var r=A(e,function(e){return e[t]===a});return e.indexOf(r)}function S(t,a,r){var p=void 0===r?t:t.slice(0,Y(t,'name',r));return p.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var r=t['function']||t.fn;t.enabled&&e(r)&&(a.offsets.popper=b(a.offsets.popper),a.offsets.reference=b(a.offsets.reference),a=r(a,t))}),a}function P(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=O(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=E(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=T(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?'fixed':'absolute',e=S(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function D(e,t){return e.some(function(e){var a=e.name,r=e.enabled;return r&&a===t})}function X(e){for(var t=[!1,'ms','Webkit','Moz','O'],a=e.charAt(0).toUpperCase()+e.slice(1),r=0;r<t.length;r++){var p=t[r],o=p?''+p+a:e;if('undefined'!=typeof document.body.style[o])return o}return null}function I(){return this.state.isDestroyed=!0,D(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.position='',this.popper.style.top='',this.popper.style.left='',this.popper.style.right='',this.popper.style.bottom='',this.popper.style.willChange='',this.popper.style[X('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function N(e){var t=e.ownerDocument;return t?t.defaultView:window}function H(e,t,a,p){var o='BODY'===e.nodeName,i=o?e.ownerDocument.defaultView:e;i.addEventListener(t,a,{passive:!0}),o||H(r(i.parentNode),t,a,p),p.push(i)}function R(e,t,a,p){a.updateBound=p,N(e).addEventListener('resize',a.updateBound,{passive:!0});var o=r(e);return H(o,'scroll',a.updateBound,a.scrollParents),a.scrollElement=o,a.eventsEnabled=!0,a}function B(){this.state.eventsEnabled||(this.state=R(this.reference,this.options,this.state,this.scheduleUpdate))}function M(e,t){return N(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function W(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=M(this.reference,this.state))}function z(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function _(e,t){Object.keys(t).forEach(function(a){var r='';-1!==['width','height','top','right','bottom','left'].indexOf(a)&&z(t[a])&&(r='px'),e.style[a]=t[a]+r})}function U(e,t){Object.keys(t).forEach(function(a){var r=t[a];!1===r?e.removeAttribute(a):e.setAttribute(a,t[a])})}function F(e,t,a){var r=A(e,function(e){var a=e.name;return a===t}),p=!!r&&e.some(function(e){return e.name===a&&e.enabled&&e.order<r.order});if(!p){var o='`'+t+'`';console.warn('`'+a+'`'+' modifier is required by '+o+' modifier in order to work, be sure to include it before '+o+'!')}return p}function V(e){return'end'===e?'start':'start'===e?'end':e}function q(e){var t=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],a=ve.indexOf(e),r=ve.slice(a+1).concat(ve.slice(0,a));return t?r.reverse():r}function j(e,t,a,r){var p=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+p[1],i=p[2];if(!o)return e;if(0===i.indexOf('%')){var n;switch(i){case'%p':n=a;break;case'%':case'%r':default:n=r;}var s=b(n);return s[t]/100*o}if('vh'===i||'vw'===i){var l;return l='vh'===i?ae(document.documentElement.clientHeight,window.innerHeight||0):ae(document.documentElement.clientWidth,window.innerWidth||0),l/100*o}return o}function K(e,t,a,r){var p=[0,0],o=-1!==['right','left'].indexOf(r),i=e.split(/(\+|\-)/).map(function(e){return e.trim()}),n=i.indexOf(A(i,function(e){return-1!==e.search(/,|\s/)}));i[n]&&-1===i[n].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var s=/\s*,\s*|\s+/,l=-1===n?[i]:[i.slice(0,n).concat([i[n].split(s)[0]]),[i[n].split(s)[1]].concat(i.slice(n+1))];return l=l.map(function(e,r){var p=(1===r?!o:o)?'height':'width',i=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,i=!0,e):i?(e[e.length-1]+=t,i=!1,e):e.concat(t)},[]).map(function(e){return j(e,p,t,a)})}),l.forEach(function(e,t){e.forEach(function(a,r){z(a)&&(p[t]+=a*('-'===e[r-1]?-1:1))})}),p}function G(e,t){var a=t.offset,r=e.placement,p=e.offsets,o=p.popper,i=p.reference,n=r.split('-')[0],s=void 0;return s=z(+a)?[+a,0]:K(a,o,i,n),'left'===n?(o.top+=s[0],o.left-=s[1]):'right'===n?(o.top+=s[0],o.left+=s[1]):'top'===n?(o.left+=s[0],o.top-=s[1]):'bottom'===n&&(o.left+=s[0],o.top+=s[1]),e.popper=o,e}function Q(e){document.addEventListener('click',Ct,e),document.addEventListener('touchstart',Et),window.addEventListener('blur',Tt),window.addEventListener('resize',At),!vt&&(navigator.maxTouchPoints||navigator.msMaxTouchPoints)&&document.addEventListener('pointerdown',Et)}function Z(e,t){function a(){lt(function(){W=!1})}function r(e){var t=I=e,a=t.clientX,r=t.clientY;if(q.popperInstance){var p=q.reference.getBoundingClientRect(),o=q.props.followCursor,i='horizontal'===o,n='vertical'===o;q.popperInstance.reference={getBoundingClientRect:function(){return{width:0,height:0,top:i?p.top:r,bottom:i?p.bottom:r,left:n?p.left:a,right:n?p.right:a}},clientWidth:0,clientHeight:0},q.popperInstance.scheduleUpdate()}}function p(e){var t=Ze(e.target,q.props.target);t&&!t._tippy&&(Z(t,oe({},q.props,{target:'',showOnInit:!0})),o(e))}function o(e){if(C(),!q.state.isVisible){if(q.props.target)return p(e);if(R=!0,q.props.wait)return q.props.wait(q,e);g()&&(V.arrow&&(V.arrow.style.margin='0'),document.addEventListener('mousemove',r));var t=Be(q.props.delay,0,ie.delay);t?N=setTimeout(function(){A()},t):A()}}function i(){if(C(),!q.state.isVisible)return n();R=!1;var e=Be(q.props.delay,1,ie.delay);e?H=setTimeout(function(){q.state.isVisible&&Y()},e):Y()}function n(){document.removeEventListener('mousemove',r),I=null}function s(){document.body.removeEventListener('mouseleave',i),document.removeEventListener('mousemove',_)}function l(e){!q.state.isEnabled||b(e)||(!q.state.isVisible&&(X=e),'click'===e.type&&!1!==q.props.hideOnClick&&q.state.isVisible?i():o(e))}function d(e){var t=$e(e.target,function(e){return e._tippy}),a=Ze(e.target,Oe.POPPER)===q.popper,r=t===q.reference;a||r||dt(mt(q.popper),q.popper.getBoundingClientRect(),e,q.props)&&(s(),i())}function c(e){return b(e)?void 0:q.props.interactive?(document.body.addEventListener('mouseleave',i),void document.addEventListener('mousemove',_)):void i()}function m(e){if(e.target===q.reference){if(q.props.interactive){if(!e.relatedTarget)return;if(Ze(e.relatedTarget,Oe.POPPER))return}i()}}function f(e){Ze(e.target,q.props.target)&&o(e)}function h(e){Ze(e.target,q.props.target)&&i()}function b(e){var t=-1<e.type.indexOf('touch'),a=vt&&kt&&q.props.touchHold&&!t,r=kt&&!q.props.touchHold&&t;return a||r}function y(){var e=q.popperChildren.tooltip,t=q.props.popperOptions,a=Oe['round'===q.props.arrowType?'ROUND_ARROW':'ARROW'],r=e.querySelector(a),p=oe({placement:q.props.placement},t||{},{modifiers:oe({},t?t.modifiers:{},{arrow:oe({element:a},t&&t.modifiers?t.modifiers.arrow:{}),flip:oe({enabled:q.props.flip,padding:q.props.distance+5,behavior:q.props.flipBehavior},t&&t.modifiers?t.modifiers.flip:{}),offset:oe({offset:q.props.offset},t&&t.modifiers?t.modifiers.offset:{})}),onCreate:function(){e.style[mt(q.popper)]=ct(q.props.distance,ie.distance),r&&q.props.arrowTransform&&it(r,q.props.arrowTransform)},onUpdate:function(){var t=e.style;t.top='',t.bottom='',t.left='',t.right='',t[mt(q.popper)]=ct(q.props.distance,ie.distance),r&&q.props.arrowTransform&&it(r,q.props.arrowTransform)}}),n=new MutationObserver(function(){q.popperInstance.update()});return n.observe(q.popper,{childList:!0,subtree:!0}),D&&D.disconnect(),D=n,z||(z=!0,q.popper.addEventListener('mouseenter',function(e){q.props.interactive&&q.state.isVisible&&'mouseenter'===X.type&&o(e)}),q.popper.addEventListener('mouseleave',function(e){q.props.interactive&&'mouseenter'===X.type&&0===q.props.interactiveDebounce&&dt(mt(q.popper),q.popper.getBoundingClientRect(),e,q.props)&&i()})),new Ee(q.reference,q.popper,p)}function u(e){if(q.popperInstance?(!g()&&q.popperInstance.scheduleUpdate(),q.props.livePlacement&&!g()&&q.popperInstance.enableEventListeners()):(q.popperInstance=y(),!q.props.livePlacement&&q.popperInstance.disableEventListeners()),q.popperInstance.reference=q.reference,g()){q.popperChildren.arrow&&(q.popperChildren.arrow.style.margin='');var t=Be(q.props.delay,0,ie.delay);X.type&&r(t&&I?I:X)}st(q.popperInstance,e),q.props.appendTo.contains(q.popper)||(q.props.appendTo.appendChild(q.popper),q.props.onMount(q),q.state.isMounted=!0)}function g(){return q.props.followCursor&&!kt&&'focus'!==X.type}function x(){Pe([q.popper],xt?0:q.props.updateDuration);(function e(){q.popperInstance&&q.popperInstance.scheduleUpdate(),q.state.isMounted?requestAnimationFrame(e):Pe([q.popper],0)})()}function w(e,t){k(e,function(){!q.state.isVisible&&q.props.appendTo.contains(q.popper)&&t()})}function v(e,t){k(e,t)}function k(e,t){if(0===e)return t();var a=q.popperChildren.tooltip,r=function r(p){p.target===a&&(ht(a,'remove',r),t())};ht(a,'remove',B),ht(a,'add',r),B=r}function E(e,t,a){q.reference.addEventListener(e,t),a.push({eventType:e,handler:t})}function O(){M=q.props.trigger.trim().split(' ').reduce(function(e,t){return'manual'===t?e:(q.props.target?'mouseenter'===t?(E('mouseover',f,e),E('mouseout',h,e)):'focus'===t?(E('focusin',f,e),E('focusout',h,e)):'click'===t?E(t,f,e):void 0:(E(t,l,e),q.props.touchHold&&(E('touchstart',l,e),E('touchend',c,e)),'mouseenter'===t?E('mouseleave',c,e):'focus'===t?E(xt?'focusout':'blur',m,e):void 0),e)},[])}function L(){M.forEach(function(e){var t=e.eventType,a=e.handler;q.reference.removeEventListener(t,a)})}function C(){clearTimeout(N),clearTimeout(H)}function T(e){yt(e,ie);var t=q.props,a=ft(q.reference,oe({},q.props,e,{performance:!0}));a.performance=e.performance||t.performance,q.props=a,('trigger'in e||'touchHold'in e)&&(L(),O()),'interactiveDebounce'in e&&(s(),_=bt(d,e.interactiveDebounce)),qe(q.popper,t,a),q.popperChildren=De(q.popper),q.popperInstance&&se.some(function(t){return t in e})&&(q.popperInstance.destroy(),q.popperInstance=y(),!q.state.isVisible&&q.popperInstance.disableEventListeners(),q.props.followCursor&&I&&r(I))}function A(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:Be(q.props.duration,0,ie.duration[0]);return q.state.isDestroyed||!q.state.isEnabled||kt&&!q.props.touch?void 0:q.reference.isVirtual||document.documentElement.contains(q.reference)?q.reference.hasAttribute('disabled')?void 0:W?void(W=!1):void(!1===q.props.onShow(q)||(q.popper.style.visibility='visible',q.state.isVisible=!0,Pe([q.popper,q.popperChildren.tooltip,q.popperChildren.backdrop],0),u(function(){q.state.isVisible&&(!g()&&q.popperInstance.update(),Pe([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],e),q.popperChildren.backdrop&&(q.popperChildren.content.style.transitionDelay=ee(e/6)+'ms'),q.props.interactive&&q.reference.classList.add('tippy-active'),q.props.sticky&&x(),nt([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],'visible'),v(e,function(){0===q.props.updateDuration&&q.popperChildren.tooltip.classList.add('tippy-notransition'),q.props.interactive&&-1<['focus','click'].indexOf(X.type)&&Je(q.popper),q.reference.setAttribute('aria-describedby',q.popper.id),q.props.onShown(q),q.state.isShown=!0}))}))):S()}function Y(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:Be(q.props.duration,1,ie.duration[1]);q.state.isDestroyed||!q.state.isEnabled||!1===q.props.onHide(q)||(0===q.props.updateDuration&&q.popperChildren.tooltip.classList.remove('tippy-notransition'),q.props.interactive&&q.reference.classList.remove('tippy-active'),q.popper.style.visibility='hidden',q.state.isVisible=!1,q.state.isShown=!1,Pe([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],e),nt([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],'hidden'),q.props.interactive&&!W&&-1<['focus','click'].indexOf(X.type)&&('focus'===X.type&&(W=!0),Je(q.reference)),w(e,function(){R||n(),q.reference.removeAttribute('aria-describedby'),q.popperInstance.disableEventListeners(),q.props.appendTo.removeChild(q.popper),q.state.isMounted=!1,q.props.onHidden(q)}))}function S(e){q.state.isDestroyed||(q.state.isVisible&&Y(0),L(),q.reference.removeEventListener('click',a),delete q.reference._tippy,q.props.target&&e&&Ae(q.reference.querySelectorAll(q.props.target)).forEach(function(e){return e._tippy&&e._tippy.destroy()}),q.popperInstance&&q.popperInstance.destroy(),D&&D.disconnect(),q.state.isDestroyed=!0)}var P=ft(e,t);if(!P.multiple&&e._tippy)return null;var D=null,X={},I=null,N=0,H=0,R=!1,B=function(){},M=[],W=!1,z=!1,_=0<P.interactiveDebounce?bt(d,P.interactiveDebounce):d,U=Yt++,F=Ve(U,P),V=De(F),q={id:U,reference:e,popper:F,popperChildren:V,popperInstance:null,props:P,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},clearDelayTimeouts:C,set:T,setContent:function(e){T({content:e})},show:A,hide:Y,enable:function(){q.state.isEnabled=!0},disable:function(){q.state.isEnabled=!1},destroy:S};return O(),e.addEventListener('click',a),P.lazy||(q.popperInstance=y(),q.popperInstance.disableEventListeners()),P.showOnInit&&setTimeout(o,20),!P.a11y||P.target||Se(e)||e.setAttribute('tabindex','0'),e._tippy=q,F._tippy=q,q}function $(e,t,a){yt(t,ie),St||(Q(Pt),St=!0);var r=oe({},ie,t);Xe(e)&&Ge(e);var p=He(e),o=p[0],i=(a&&o?[o]:p).reduce(function(e,t){var a=t&&Z(t,r);return a&&e.push(a),e},[]);return{targets:e,props:r,instances:i,destroyAll:function(){this.instances.forEach(function(e){e.destroy()}),this.instances=[]}}}for(var J=Math.min,ee=Math.round,te=Math.floor,ae=Math.max,re='.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%);opacity:1}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(60deg);transform:translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%);opacity:1}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-60deg);transform:translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-60deg);transform:translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%);opacity:1}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(60deg);transform:translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{opacity:1;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{opacity:1;-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;max-width:350px;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}@media (max-width:360px){.tippy-popper{max-width:96%;max-width:calc(100% - 20px)}}',pe='3.1.1',oe=Object.assign||function(e){for(var t,a=1;a<arguments.length;a++)for(var r in t=arguments[a],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},ie={a11y:!0,content:'',placement:'top',livePlacement:!0,trigger:'mouseenter focus',hideOnClick:!0,animation:'shift-away',animateFill:!0,arrow:!1,delay:[0,20],duration:[325,275],interactive:!1,interactiveBorder:2,interactiveDebounce:0,theme:'dark',size:'regular',distance:10,offset:0,multiple:!1,followCursor:!1,inertia:!1,updateDuration:200,sticky:!1,appendTo:function(){return document.body},zIndex:9999,touchHold:!1,performance:!1,flip:!0,flipBehavior:'flip',arrowType:'sharp',arrowTransform:'',target:'',allowHTML:!0,showOnInit:!1,popperOptions:{},lazy:!0,touch:!0,wait:null,shouldPopperHideOnBlur:function(){return!0},onShow:function(){},onShown:function(){},onHide:function(){},onHidden:function(){},onMount:function(){}},ne=function(e){ie=oe({},ie,e)},se=['placement','popperOptions','flip','flipBehavior','distance','offset'],le='undefined'!=typeof window&&'undefined'!=typeof document,de=['Edge','Trident','Firefox'],ce=0,me=0;me<de.length;me+=1)if(le&&0<=navigator.userAgent.indexOf(de[me])){ce=1;break}var i=le&&window.Promise,fe=i?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},ce))}},he=le&&!!(window.MSInputMethodContext&&document.documentMode),be=le&&/MSIE 10/.test(navigator.userAgent),ye=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},ue=function(){function e(e,t){for(var a,r=0;r<t.length;r++)a=t[r],a.enumerable=a.enumerable||!1,a.configurable=!0,'value'in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),ge=function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e},xe=Object.assign||function(e){for(var t,a=1;a<arguments.length;a++)for(var r in t=arguments[a],t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e},we=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],ve=we.slice(3),ke={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},Ee=function(){function t(a,r){var p=this,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};ye(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(p.update)},this.update=fe(this.update.bind(this)),this.options=xe({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=a&&a.jquery?a[0]:a,this.popper=r&&r.jquery?r[0]:r,this.options.modifiers={},Object.keys(xe({},t.Defaults.modifiers,o.modifiers)).forEach(function(e){p.options.modifiers[e]=xe({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return xe({name:e},p.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(p.reference,p.popper,p.options,t,p.state)}),this.update();var i=this.options.eventsEnabled;i&&this.enableEventListeners(),this.state.eventsEnabled=i}return ue(t,[{key:'update',value:function(){return P.call(this)}},{key:'destroy',value:function(){return I.call(this)}},{key:'enableEventListeners',value:function(){return B.call(this)}},{key:'disableEventListeners',value:function(){return W.call(this)}}]),t}();Ee.Utils=('undefined'==typeof window?global:window).PopperUtils,Ee.placements=we,Ee.Defaults={placement:'bottom',positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,a=t.split('-')[0],r=t.split('-')[1];if(r){var p=e.offsets,o=p.reference,i=p.popper,n=-1!==['bottom','top'].indexOf(a),s=n?'left':'top',l=n?'width':'height',d={start:ge({},s,o[s]),end:ge({},s,o[s]+o[l]-i[l])};e.offsets.popper=xe({},i,d[r])}return e}},offset:{order:200,enabled:!0,fn:G,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var a=t.boundariesElement||o(e.instance.popper);e.instance.reference===a&&(a=o(a));var r=X('transform'),p=e.instance.popper.style,i=p.top,n=p.left,s=p[r];p.top='',p.left='',p[r]='';var l=v(e.instance.popper,e.instance.reference,t.padding,a,e.positionFixed);p.top=i,p.left=n,p[r]=s,t.boundaries=l;var d=t.priority,c=e.offsets.popper,m={primary:function(e){var a=c[e];return c[e]<l[e]&&!t.escapeWithReference&&(a=ae(c[e],l[e])),ge({},e,a)},secondary:function(e){var a='right'===e?'left':'top',r=c[a];return c[e]>l[e]&&!t.escapeWithReference&&(r=J(c[a],l[e]-('right'===e?c.width:c.height))),ge({},a,r)}};return d.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';c=xe({},c,m[t](e))}),e.offsets.popper=c,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,a=t.popper,r=t.reference,p=e.placement.split('-')[0],o=te,i=-1!==['top','bottom'].indexOf(p),n=i?'right':'bottom',s=i?'left':'top',l=i?'width':'height';return a[n]<o(r[s])&&(e.offsets.popper[s]=o(r[s])-a[l]),a[s]>o(r[n])&&(e.offsets.popper[s]=o(r[n])),e}},arrow:{order:500,enabled:!0,fn:function(e,a){var r;if(!F(e.instance.modifiers,'arrow','keepTogether'))return e;var p=a.element;if('string'==typeof p){if(p=e.instance.popper.querySelector(p),!p)return e;}else if(!e.instance.popper.contains(p))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var o=e.placement.split('-')[0],i=e.offsets,n=i.popper,s=i.reference,l=-1!==['left','right'].indexOf(o),d=l?'height':'width',c=l?'Top':'Left',m=c.toLowerCase(),f=l?'left':'top',h=l?'bottom':'right',y=L(p)[d];s[h]-y<n[m]&&(e.offsets.popper[m]-=n[m]-(s[h]-y)),s[m]+y>n[h]&&(e.offsets.popper[m]+=s[m]+y-n[h]),e.offsets.popper=b(e.offsets.popper);var u=s[m]+s[d]/2-y/2,g=t(e.instance.popper),x=parseFloat(g['margin'+c],10),w=parseFloat(g['border'+c+'Width'],10),v=u-e.offsets.popper[m]-x-w;return v=ae(J(n[d]-y,v),0),e.arrowElement=p,e.offsets.arrow=(r={},ge(r,m,ee(v)),ge(r,f,''),r),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(D(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var a=v(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),r=e.placement.split('-')[0],p=C(r),o=e.placement.split('-')[1]||'',i=[];switch(t.behavior){case ke.FLIP:i=[r,p];break;case ke.CLOCKWISE:i=q(r);break;case ke.COUNTERCLOCKWISE:i=q(r,!0);break;default:i=t.behavior;}return i.forEach(function(n,s){if(r!==n||i.length===s+1)return e;r=e.placement.split('-')[0],p=C(r);var l=e.offsets.popper,d=e.offsets.reference,c=te,m='left'===r&&c(l.right)>c(d.left)||'right'===r&&c(l.left)<c(d.right)||'top'===r&&c(l.bottom)>c(d.top)||'bottom'===r&&c(l.top)<c(d.bottom),f=c(l.left)<c(a.left),h=c(l.right)>c(a.right),b=c(l.top)<c(a.top),y=c(l.bottom)>c(a.bottom),u='left'===r&&f||'right'===r&&h||'top'===r&&b||'bottom'===r&&y,g=-1!==['top','bottom'].indexOf(r),x=!!t.flipVariations&&(g&&'start'===o&&f||g&&'end'===o&&h||!g&&'start'===o&&b||!g&&'end'===o&&y);(m||u||x)&&(e.flipped=!0,(m||u)&&(r=i[s+1]),x&&(o=V(o)),e.placement=r+(o?'-'+o:''),e.offsets.popper=xe({},e.offsets.popper,T(e.instance.popper,e.offsets.reference,e.placement)),e=S(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,a=t.split('-')[0],r=e.offsets,p=r.popper,o=r.reference,i=-1!==['left','right'].indexOf(a),n=-1===['top','left'].indexOf(a);return p[i?'left':'top']=o[a]-(n?p[i?'width':'height']:0),e.placement=C(t),e.offsets.popper=b(p),e}},hide:{order:800,enabled:!0,fn:function(e){if(!F(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,a=A(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<a.top||t.left>a.right||t.top>a.bottom||t.right<a.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var a=t.x,r=t.y,p=e.offsets.popper,i=A(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==i&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var n=void 0===i?t.gpuAcceleration:i,s=o(e.instance.popper),l=u(s),d={position:p.position},c={left:te(p.left),top:ee(p.top),bottom:ee(p.bottom),right:te(p.right)},m='bottom'===a?'top':'bottom',f='right'===r?'left':'right',h=X('transform'),b=void 0,y=void 0;if(y='bottom'==m?'HTML'===s.nodeName?-s.clientHeight+c.bottom:-l.height+c.bottom:c.top,b='right'==f?'HTML'===s.nodeName?-s.clientWidth+c.right:-l.width+c.right:c.left,n&&h)d[h]='translate3d('+b+'px, '+y+'px, 0)',d[m]=0,d[f]=0,d.willChange='transform';else{var g='bottom'==m?-1:1,x='right'==f?-1:1;d[m]=y*g,d[f]=b*x,d.willChange=m+', '+f}var w={"x-placement":e.placement};return e.attributes=xe({},w,e.attributes),e.styles=xe({},d,e.styles),e.arrowStyles=xe({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return _(e.instance.popper,e.styles),U(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&_(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,a,r,p){var o=O(p,t,e,a.positionFixed),i=E(a.placement,o,t,e,a.modifiers.flip.boundariesElement,a.modifiers.flip.padding);return t.setAttribute('x-placement',i),_(t,{position:a.positionFixed?'fixed':'absolute'}),a},gpuAcceleration:void 0}}};var Oe={POPPER:'.tippy-popper',TOOLTIP:'.tippy-tooltip',CONTENT:'.tippy-content',BACKDROP:'.tippy-backdrop',ARROW:'.tippy-arrow',ROUND_ARROW:'.tippy-roundarrow'},Le={x:!0},Ce='undefined'!=typeof window,Te=Ce&&'MutationObserver'in window,Ae=function(e){return[].slice.call(e)},Ye=function(e,t){t.content instanceof Element?(Ne(e,''),e.appendChild(t.content)):e[t.allowHTML?'innerHTML':'textContent']=t.content},Se=function(e){return!(e instanceof Element)||Qe.call(e,'a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]')&&!e.hasAttribute('disabled')},Pe=function(e,t){e.filter(Boolean).forEach(function(e){e.style.transitionDuration=t+'ms'})},De=function(e){var t=function(t){return e.querySelector(t)};return{tooltip:t(Oe.TOOLTIP),backdrop:t(Oe.BACKDROP),content:t(Oe.CONTENT),arrow:t(Oe.ARROW)||t(Oe.ROUND_ARROW)}},Xe=function(e){return'[object Object]'==={}.toString.call(e)},Ie=function(){return document.createElement('div')},Ne=function(e,t){e[Le.x&&'innerHTML']=t instanceof Element?t[Le.x&&'innerHTML']:t},He=function(e){if(e instanceof Element||Xe(e))return[e];if(e instanceof NodeList)return Ae(e);if(Array.isArray(e))return e;try{return Ae(document.querySelectorAll(e))}catch(t){return[]}},Re=function(e){return!isNaN(e)&&!isNaN(parseFloat(e))},Be=function(e,t,a){if(Array.isArray(e)){var r=e[t];return null==r?a:r}return e},Me=function(e){var t=Ie();return'round'===e?(t.className='tippy-roundarrow',Ne(t,'<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>')):t.className='tippy-arrow',t},We=function(){var e=Ie();return e.className='tippy-backdrop',e.setAttribute('data-state','hidden'),e},ze=function(e,t){e.setAttribute('tabindex','-1'),t.setAttribute('data-interactive','')},_e=function(e,t){e.removeAttribute('tabindex'),t.removeAttribute('data-interactive')},Ue=function(e){e.setAttribute('data-inertia','')},Fe=function(e){e.removeAttribute('data-inertia')},Ve=function(e,t){var a=Ie();a.className='tippy-popper',a.setAttribute('role','tooltip'),a.id='tippy-'+e,a.style.zIndex=t.zIndex;var r=Ie();r.className='tippy-tooltip',r.setAttribute('data-size',t.size),r.setAttribute('data-animation',t.animation),r.setAttribute('data-state','hidden'),t.theme.split(' ').forEach(function(e){r.classList.add(e+'-theme')});var p=Ie();return p.className='tippy-content',p.setAttribute('data-state','hidden'),t.interactive&&ze(a,r),t.arrow&&r.appendChild(Me(t.arrowType)),t.animateFill&&(r.appendChild(We()),r.setAttribute('data-animatefill','')),t.inertia&&r.setAttribute('data-inertia',''),Ye(p,t),r.appendChild(p),a.appendChild(r),a.addEventListener('focusout',function(t){t.relatedTarget&&a._tippy&&!$e(t.relatedTarget,function(e){return e===a})&&t.relatedTarget!==a._tippy.reference&&a._tippy.props.shouldPopperHideOnBlur(t)&&a._tippy.hide()}),a},qe=function(e,t,a){var r=De(e),p=r.tooltip,o=r.content,i=r.backdrop,n=r.arrow;e.style.zIndex=a.zIndex,p.setAttribute('data-size',a.size),p.setAttribute('data-animation',a.animation),t.content!==a.content&&Ye(o,a),!t.animateFill&&a.animateFill?(p.appendChild(We()),p.setAttribute('data-animatefill','')):t.animateFill&&!a.animateFill&&(p.removeChild(i),p.removeAttribute('data-animatefill')),!t.arrow&&a.arrow?p.appendChild(Me(a.arrowType)):t.arrow&&!a.arrow&&p.removeChild(n),t.arrow&&a.arrow&&t.arrowType!==a.arrowType&&p.replaceChild(Me(a.arrowType),n),!t.interactive&&a.interactive?ze(e,p):t.interactive&&!a.interactive&&_e(e,p),!t.inertia&&a.inertia?Ue(p):t.inertia&&!a.inertia&&Fe(p),t.theme!==a.theme&&(t.theme.split(' ').forEach(function(e){p.classList.remove(e+'-theme')}),a.theme.split(' ').forEach(function(e){p.classList.add(e+'-theme')}))},je=function(e){Ae(document.querySelectorAll(Oe.POPPER)).forEach(function(t){var a=t._tippy;a&&!0===a.props.hideOnClick&&(!e||t!==e.popper)&&a.hide()})},Ke=function(e){return Object.keys(ie).reduce(function(t,a){var r=(e.getAttribute('data-tippy-'+a)||'').trim();return r?(t[a]='content'===a?r:'true'===r||'false'!==r&&(Re(r)?+r:'['===r[0]||'{'===r[0]?JSON.parse(r):r),t):t},{})},Ge=function(e){var t={isVirtual:!0,attributes:e.attributes||{},setAttribute:function(t,a){e.attributes[t]=a},getAttribute:function(t){return e.attributes[t]},removeAttribute:function(t){delete e.attributes[t]},hasAttribute:function(t){return t in e.attributes},addEventListener:function(){},removeEventListener:function(){},classList:{classNames:{},add:function(t){e.classList.classNames[t]=!0},remove:function(t){delete e.classList.classNames[t]},contains:function(t){return t in e.classList.classNames}}};for(var a in t)e[a]=t[a];return e},Qe=function(){if(Ce){var t=Element.prototype;return t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector}}(),Ze=function(e,t){return(Element.prototype.closest||function(e){for(var t=this;t;){if(Qe.call(t,e))return t;t=t.parentElement}}).call(e,t)},$e=function(e,t){for(;e;){if(t(e))return e;e=e.parentElement}},Je=function(e){var t=window.scrollX||window.pageXOffset,a=window.scrollY||window.pageYOffset;e.focus(),scroll(t,a)},et=function(e){void e.offsetHeight},tt=function(e,t){return(t?e:{X:'Y',Y:'X'}[e])||''},at=function(e,t,r,p){var o=t[0],i=t[1];if(!o&&!i)return'';var n={scale:function(){return i?r?o+', '+i:i+', '+o:''+o}(),translate:function(){return i?r?p?o+'px, '+-i+'px':o+'px, '+i+'px':p?-i+'px, '+o+'px':i+'px, '+o+'px':p?-o+'px':o+'px'}()};return n[e]},rt=function(e,t){var a=e.match(new RegExp(t+'([XY])'));return a?a[1]:''},pt=function(e,t){var a=e.match(t);return a?a[1].split(',').map(parseFloat):[]},ot={translate:/translateX?Y?\(([^)]+)\)/,scale:/scaleX?Y?\(([^)]+)\)/},it=function(e,t){var a=mt(Ze(e,Oe.POPPER)),r='top'===a||'bottom'===a,p='right'===a||'bottom'===a,o={translate:{axis:rt(t,'translate'),numbers:pt(t,ot.translate)},scale:{axis:rt(t,'scale'),numbers:pt(t,ot.scale)}},i=t.replace(ot.translate,'translate'+tt(o.translate.axis,r)+'('+at('translate',o.translate.numbers,r,p)+')').replace(ot.scale,'scale'+tt(o.scale.axis,r)+'('+at('scale',o.scale.numbers,r,p)+')');e.style['undefined'==typeof document.body.style.transform?'webkitTransform':'transform']=i},nt=function(e,t){e.filter(Boolean).forEach(function(e){e.setAttribute('data-state',t)})},st=function(e,t){var a=e.popper,r=e.options,p=r.onCreate,o=r.onUpdate;r.onCreate=r.onUpdate=function(){et(a),t(),o(),r.onCreate=p,r.onUpdate=o}},lt=function(e){setTimeout(e,1)},dt=function(e,t,a,r){if(!e)return!0;var p=a.clientX,o=a.clientY,i=r.interactiveBorder,n=r.distance,s=t.top-o>('top'===e?i+n:i),l=o-t.bottom>('bottom'===e?i+n:i),d=t.left-p>('left'===e?i+n:i),c=p-t.right>('right'===e?i+n:i);return s||l||d||c},ct=function(e,t){return-(e-t)+'px'},mt=function(e){var t=e.getAttribute('x-placement');return t?t.split('-')[0]:''},ft=function(e,t){var a=oe({},t,t.performance?{}:Ke(e));return a.arrow&&(a.animateFill=!1),'function'==typeof a.appendTo&&(a.appendTo=t.appendTo(e)),'function'==typeof a.content&&(a.content=t.content(e)),a},ht=function(e,t,a){e[t+'EventListener']('transitionend',a)},bt=function(e,t){var a;return function(){var r=this,p=arguments;clearTimeout(a),a=setTimeout(function(){return e.apply(r,p)},t)}},yt=function(e,t){for(var a in e||{})if(!(a in t))throw Error('[tippy]: `'+a+'` is not a valid option')},ut=Ce?navigator:{},gt=Ce?window:{},xt=/MSIE |Trident\//.test(ut.userAgent),wt=/iPhone|iPad|iPod/.test(ut.platform)&&!gt.MSStream,vt='ontouchstart'in gt,kt=!1,Et=function(){kt||(kt=!0,wt&&document.body.classList.add('tippy-iOS'),window.performance&&document.addEventListener('mousemove',Lt))},Ot=0,Lt=function e(){var t=performance.now();20>t-Ot&&(kt=!1,document.removeEventListener('mousemove',e),!wt&&document.body.classList.remove('tippy-iOS')),Ot=t},Ct=function(e){var t=e.target;if(!(t instanceof Element))return je();var a=Ze(t,Oe.POPPER);if(!(a&&a._tippy&&a._tippy.props.interactive)){var r=$e(t,function(e){return e._tippy&&e._tippy.reference===e});if(r){var p=r._tippy,o=-1<p.props.trigger.indexOf('click');if(kt||o)return je(p);if(!0!==p.props.hideOnClick||o)return;p.clearDelayTimeouts()}je()}},Tt=function(){var e=document,t=e.activeElement;t&&t.blur&&t._tippy&&t.blur()},At=function(){Ae(document.querySelectorAll(Oe.POPPER)).forEach(function(e){var t=e._tippy;t.props.livePlacement||t.popperInstance.scheduleUpdate()})},Yt=1,St=!1,Pt=!1;$.version=pe,$.defaults=ie,$.one=function(e,t){return $(e,t,!0).instances[0]},$.setDefaults=function(e){ne(e),$.defaults=ie},$.disableAnimations=function(){$.setDefaults({duration:0,updateDuration:0,animateFill:!1})},$.hideAllPoppers=je,$.useCapture=function(){Pt=!0};return Ce&&setTimeout(function(){Ae(document.querySelectorAll('[data-tippy]')).forEach(function(e){var t=e.getAttribute('data-tippy');t&&$(e,{content:t})})}),function(e){if(Te){var t=document.createElement('style');t.type='text/css',t.textContent=e,document.head.insertBefore(t,document.head.firstChild)}}(re),$});
//# sourceMappingURL=tippy.all.min.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(43)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _evented = __webpack_require__(4);

var _step = __webpack_require__(7);

var _tour = __webpack_require__(45);

Object.assign(_tour.Shepherd, {
  Tour: _tour.Tour,
  Step: _step.Step,
  Evented: _evented.Evented
});
exports.default = _tour.Shepherd;
module.exports = exports.default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(16),
    toInteger = __webpack_require__(17);

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

module.exports = drop;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

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

module.exports = baseSlice;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

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

module.exports = identity;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

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

module.exports = isObject;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(6);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

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

module.exports = stubFalse;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(5),
    isLength = __webpack_require__(23);

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

module.exports = isArrayLike;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

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
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

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

module.exports = stubFalse;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

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

module.exports = stubFalse;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

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

module.exports = stubFalse;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(1),
    isPlainObject = __webpack_require__(28);

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

module.exports = isElement;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    getPrototype = __webpack_require__(29),
    isObjectLike = __webpack_require__(1);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(6);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(31),
    keys = __webpack_require__(33);

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

module.exports = baseForOwn;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(32);

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

module.exports = baseFor;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

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

module.exports = createBaseFor;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(6);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

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

module.exports = identity;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(37),
    baseZipObject = __webpack_require__(42);

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

module.exports = zipObject;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(38),
    eq = __webpack_require__(41);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

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
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(39);

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

module.exports = baseAssignValue;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(40);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 40 */
/***/ (function(module, exports) {

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

module.exports = getValue;


/***/ }),
/* 41 */
/***/ (function(module, exports) {

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

module.exports = eq;


/***/ }),
/* 42 */
/***/ (function(module, exports) {

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

module.exports = baseZipObject;


/***/ }),
/* 43 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var missingTippy = exports.missingTippy = 'Using the attachment feature of Shepherd requires the Tippy.js library';

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shepherd = exports.Tour = undefined;

var _isEmpty2 = __webpack_require__(9);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(2);

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = __webpack_require__(46);

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isFunction2 = __webpack_require__(5);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _evented = __webpack_require__(4);

var _step = __webpack_require__(7);

var _bind = __webpack_require__(11);

var _tippy = __webpack_require__(13);

var _tippy2 = _interopRequireDefault(_tippy);

var _tooltipDefaults = __webpack_require__(47);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Shepherd = new _evented.Evented();
/**
 * Class representing the site tour
 * @extends {Evented}
 */

var Tour =
/*#__PURE__*/
exports.Tour = function (_Evented) {
  _inherits(Tour, _Evented);

  /**
   *
   * @param {Object} options The options for the tour
   * @param {Object} options.defaultStepOptions Default options for Steps created through `addStep`
   * @param {Step[]} options.steps An array of Step instances to initialize the tour with
   * @returns {Tour}
   */
  function Tour() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tour);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tour).call(this, options));

    _bind.bindMethods.call(_assertThisInitialized(_assertThisInitialized(_this)), ['back', 'cancel', 'complete', 'next']);

    _this.options = options;
    _this.steps = _this.options.steps || []; // Pass these events onto the global Shepherd object

    var events = ['active', 'cancel', 'complete', 'inactive', 'show', 'start'];
    events.map(function (event) {
      (function (e) {
        _this.on(e, function (opts) {
          opts = opts || {};
          opts.tour = _assertThisInitialized(_assertThisInitialized(_this));
          Shepherd.trigger(e, opts);
        });
      })(event);
    });

    _this._setTooltipDefaults();

    return _possibleConstructorReturn(_this, _assertThisInitialized(_assertThisInitialized(_this)));
  }
  /**
   * Adds a new step to the tour
   * @param {Object|Number|Step|String} arg1
   * When arg2 is defined, arg1 can either be a string or number, to use for the `id` for the step
   * When arg2 is undefined, arg1 is either an object containing step options or a Step instance
   * @param {Object|Step} arg2 An object containing step options or a Step instance
   * @return {Step} The newly added step
   */


  _createClass(Tour, [{
    key: "addStep",
    value: function addStep(arg1, arg2) {
      var name, step; // If we just have one argument, we can assume it is an object of step options, with an id

      if ((0, _isUndefined3.default)(arg2)) {
        step = arg1;
      } else {
        name = arg1;
        step = arg2;
      }

      if (!(step instanceof _step.Step)) {
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

  }, {
    key: "back",
    value: function back() {
      var index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }
    /**
     * Calls done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     */

  }, {
    key: "cancel",
    value: function cancel() {
      if (this.options.confirmCancel) {
        var cancelMessage = this.options.confirmCancelMessage || 'Are you sure you want to stop the tour?';
        var stopTour = window.confirm(cancelMessage);

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

  }, {
    key: "complete",
    value: function complete() {
      this.done('complete');
    }
    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param {String} event The event name to trigger
     */

  }, {
    key: "done",
    value: function done(event) {
      if (!(0, _isEmpty3.default)(this.steps)) {
        this.steps.forEach(function (step) {
          return step.destroy();
        });
      }

      this.trigger(event);
      Shepherd.activeTour = null;
      document.body.classList.remove('shepherd-active');
      this.trigger('inactive', {
        tour: this
      });
    }
    /**
     * Gets the step from a given id
     * @param {Number|String} id The id of the step to retrieve
     * @return {Step} The step corresponding to the `id`
     */

  }, {
    key: "getById",
    value: function getById(id) {
      return this.steps.find(function (step) {
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

  }, {
    key: "removeStep",
    value: function removeStep(name) {
      var _this2 = this;

      var current = this.getCurrentStep(); // Find the step, destroy it and remove it from this.steps

      this.steps.some(function (step, i) {
        if (step.id === name) {
          if (step.isOpen()) {
            step.hide();
          }

          step.destroy();

          _this2.steps.splice(i, 1);

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

  }, {
    key: "setupStep",
    value: function setupStep(stepOptions, name) {
      if ((0, _isString3.default)(name) || (0, _isNumber3.default)(name)) {
        stepOptions.id = name.toString();
      }

      stepOptions = Object.assign({}, this.options.defaultStepOptions, stepOptions);
      return new _step.Step(this, stepOptions);
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
      var step = (0, _isString3.default)(key) ? this.getById(key) : this.steps[key];

      if (step) {
        this._updateStateBeforeShow();

        var shouldSkipStep = (0, _isFunction3.default)(step.options.showOn) && !step.options.showOn(); // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal

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
      this.currentStep = null;

      this._setupActiveTour();

      this.next();
    }
    /**
     * Make this tour "active"
     * @private
     */

  }, {
    key: "_setupActiveTour",
    value: function _setupActiveTour() {
      document.body.classList.add('shepherd-active');
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

  }, {
    key: "_skipStep",
    value: function _skipStep(step, forward) {
      var index = this.steps.indexOf(step);
      var nextIndex = forward ? index + 1 : index - 1;
      this.show(nextIndex, forward);
    }
  }, {
    key: "_setTooltipDefaults",
    value: function _setTooltipDefaults() {
      _tippy2.default.setDefaults(_tooltipDefaults.defaults);
    }
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
  }]);

  return Tour;
}(_evented.Evented);

exports.Shepherd = Shepherd;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isObjectLike = __webpack_require__(1);

/** `Object#toString` result references. */
var numberTag = '[object Number]';

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
    (isObjectLike(value) && baseGetTag(value) == numberTag);
}

module.exports = isNumber;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var defaults = exports.defaults = {
  trigger: 'manual',
  arrow: true,
  arrowTransform: 'scale(2)',
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

/***/ })
/******/ ]);
});
//# sourceMappingURL=shepherd.js.map