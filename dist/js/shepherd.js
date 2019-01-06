/*!
 * /*! shepherd.js 2.1.0 * /
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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
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
    isArray = __webpack_require__(10),
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
var svgNS = 'http://www.w3.org/2000/svg';
var elementIds = {
  modalOverlay: 'shepherdModalOverlayContainer',
  modalOverlayMask: 'shepherdModalMask',
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
  element.setAttributeNS(null, 'id', elementIds.modalOverlayMask);
  element.setAttributeNS(null, 'x', '0');
  element.setAttributeNS(null, 'y', '0');
  element.setAttributeNS(null, 'width', '100%');
  element.setAttributeNS(null, 'height', '100%');
  return element;
}
/**
 *  <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
 */


function _createMaskRect() {
  var element = document.createElementNS(svgNS, 'rect');
  element.setAttributeNS(null, 'x', '0');
  element.setAttributeNS(null, 'y', '0');
  element.setAttributeNS(null, 'width', '100%');
  element.setAttributeNS(null, 'height', '100%');
  element.setAttributeNS(null, 'fill', '#FFFFFF');
  return element;
}
/**
 * <rect id="shepherdModalMaskOpening" fill="#000000"/>
 */


function _createMaskOpening() {
  var element = document.createElementNS(svgNS, 'rect');
  element.setAttributeNS(null, 'id', elementIds.modalOverlayMaskOpening);
  element.setAttributeNS(null, 'fill', '#000000');
  return element;
}
/**
 * <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
 */


function _createMaskConsumer() {
  var element = document.createElementNS(svgNS, 'rect');
  element.setAttributeNS(null, 'x', '0');
  element.setAttributeNS(null, 'y', '0');
  element.setAttributeNS(null, 'width', '100%');
  element.setAttributeNS(null, 'height', '100%');
  element.setAttributeNS(null, 'mask', "url(#".concat(elementIds.modalOverlayMask, ")"));
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

function positionModalOpening(targetElement, openingElement) {
  if (targetElement.getBoundingClientRect && openingElement instanceof SVGElement) {
    var _targetElement$getBou = targetElement.getBoundingClientRect(),
        x = _targetElement$getBou.x,
        y = _targetElement$getBou.y,
        width = _targetElement$getBou.width,
        height = _targetElement$getBou.height;

    openingElement.setAttributeNS(null, 'x', x);
    openingElement.setAttributeNS(null, 'y', y);
    openingElement.setAttributeNS(null, 'width', width);
    openingElement.setAttributeNS(null, 'height', height);
  }
}

function closeModalOpening(openingElement) {
  if (openingElement && openingElement instanceof SVGElement) {
    openingElement.setAttributeNS(null, 'x', '0');
    openingElement.setAttributeNS(null, 'y', '0');
    openingElement.setAttributeNS(null, 'width', '0');
    openingElement.setAttributeNS(null, 'height', '0');
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

exports.createModalOverlay = createModalOverlay;
exports.positionModalOpening = positionModalOpening;
exports.preventModalBodyTouch = preventModalBodyTouch;
exports.preventModalOverlayTouch = preventModalOverlayTouch;
exports.closeModalOpening = closeModalOpening;
exports.getModalMaskOpening = getModalMaskOpening;
exports.elementIds = elementIds;
exports.classNames = classNames;
exports.toggleShepherdModalClass = toggleShepherdModalClass;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Evented = undefined;

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _drop2 = __webpack_require__(19);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    isObject = __webpack_require__(11);

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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementForStep = exports.elementIsHidden = exports.cleanupStepEventListeners = exports.addStepEventListeners = undefined;

var _modal = __webpack_require__(4);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Helper method to check if element is hidden, since we cannot use :visible without jQuery
 * @param {HTMLElement} element The element to check for visibility
 * @returns {boolean} true if element is hidden
 * @private
 */
function elementIsHidden(element) {
  return element.offsetWidth === 0 && element.offsetHeight === 0;
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

  var type = _typeof(attachTo);

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
      _element$split2 = _slicedToArray(_element$split, 1),
      selector = _element$split2[0];

  return document.querySelector(selector);
}

function addStepEventListeners() {
  if (typeof this._onScreenChange === 'function') {
    window.removeEventListener('resize', this._onScreenChange, false);
    window.removeEventListener('scroll', this._onScreenChange, false);
  }

  window.addEventListener('resize', this._onScreenChange, false);
  window.addEventListener('scroll', this._onScreenChange, false);
  var overlay = document.querySelector("#".concat(_modal.elementIds.modalOverlay)); // Prevents window from moving on touch.

  window.addEventListener('touchmove', _modal.preventModalBodyTouch, {
    passive: false
  }); // Allows content to move on touch.

  if (overlay) {
    overlay.addEventListener('touchmove', _modal.preventModalOverlayTouch, false);
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
}

exports.addStepEventListeners = addStepEventListeners;
exports.cleanupStepEventListeners = cleanupStepEventListeners;
exports.elementIsHidden = elementIsHidden;
exports.getElementForStep = getElementForStep;

/***/ }),
/* 9 */
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

var _isFunction2 = __webpack_require__(6);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEmpty2 = __webpack_require__(12);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isElement2 = __webpack_require__(30);

var _isElement3 = _interopRequireDefault(_isElement2);

var _forOwn2 = __webpack_require__(13);

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _evented = __webpack_require__(5);

__webpack_require__(38);

var _bind = __webpack_require__(14);

var _utils = __webpack_require__(15);

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
      var element = (0, _utils.createFromHTML)("<div class=\"".concat(classes, "\" data-shepherd-step-id=\"").concat(this.id, "\">"));
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
        this._updateStepTargetOnHide();
      }

      this.trigger('destroy');
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

      this.tour.beforeShowStep(this);
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
}(_evented.Evented);

/***/ }),
/* 10 */
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
/* 11 */
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var baseKeys = __webpack_require__(22),
    getTag = __webpack_require__(23),
    isArguments = __webpack_require__(24),
    isArray = __webpack_require__(10),
    isArrayLike = __webpack_require__(25),
    isBuffer = __webpack_require__(27),
    isPrototype = __webpack_require__(28),
    isTypedArray = __webpack_require__(29);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(33),
    castFunction = __webpack_require__(37);

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(2);

var _isString3 = _interopRequireDefault(_isString2);

var _forOwn2 = __webpack_require__(13);

var _forOwn3 = _interopRequireDefault(_forOwn2);

exports.bindAdvance = bindAdvance;
exports.bindButtonEvents = bindButtonEvents;
exports.bindCancelLink = bindCancelLink;
exports.bindMethods = bindMethods;

var _utils = __webpack_require__(15);

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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zipObject2 = __webpack_require__(39);

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

var _tippy = __webpack_require__(16);

var _tippy2 = _interopRequireDefault(_tippy);

var _errorMessages = __webpack_require__(46);

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function(e,t){ true?module.exports=t():undefined})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var r=e.ownerDocument.defaultView,a=r.getComputedStyle(e,null);return t?a[t]:a}function r(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function a(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var p=t(e),o=p.overflow,i=p.overflowX,n=p.overflowY;return /(auto|scroll|overlay)/.test(o+n+i)?e:a(r(e))}function p(e){return 11===e?ke:10===e?Ee:ke||Ee}function o(e){if(!e)return document.documentElement;for(var r=p(10)?document.body:null,a=e.offsetParent||null;a===r&&e.nextElementSibling;)a=(e=e.nextElementSibling).offsetParent;var i=a&&a.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TH','TD','TABLE'].indexOf(a.nodeName)&&'static'===t(a,'position')?o(a):a:e?e.ownerDocument.documentElement:document.documentElement}function n(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||o(e.firstElementChild)===e)}function s(e){return null===e.parentNode?e:s(e.parentNode)}function l(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var r=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,a=r?e:t,p=r?t:e,i=document.createRange();i.setStart(a,0),i.setEnd(p,0);var d=i.commonAncestorContainer;if(e!==d&&t!==d||a.contains(p))return n(d)?d:o(d);var m=s(e);return m.host?l(m.host,t):l(e,s(t).host)}function d(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',r='top'===t?'scrollTop':'scrollLeft',a=e.nodeName;if('BODY'===a||'HTML'===a){var p=e.ownerDocument.documentElement,o=e.ownerDocument.scrollingElement||p;return o[r]}return e[r]}function m(e,t){var r=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],a=d(t,'top'),p=d(t,'left'),o=r?-1:1;return e.top+=a*o,e.bottom+=a*o,e.left+=p*o,e.right+=p*o,e}function c(e,t){var r='x'===t?'Left':'Top',a='Left'===r?'Right':'Bottom';return parseFloat(e['border'+r+'Width'],10)+parseFloat(e['border'+a+'Width'],10)}function f(e,t,r,a){return ae(t['offset'+e],t['scroll'+e],r['client'+e],r['offset'+e],r['scroll'+e],p(10)?parseInt(r['offset'+e])+parseInt(a['margin'+('Height'===e?'Top':'Left')])+parseInt(a['margin'+('Height'===e?'Bottom':'Right')]):0)}function h(e){var t=e.body,r=e.documentElement,a=p(10)&&getComputedStyle(r);return{height:f('Height',t,r,a),width:f('Width',t,r,a)}}function b(e){return Te({},e,{right:e.left+e.width,bottom:e.top+e.height})}function u(e){var r={};try{if(p(10)){r=e.getBoundingClientRect();var a=d(e,'top'),o=d(e,'left');r.top+=a,r.left+=o,r.bottom+=a,r.right+=o}else r=e.getBoundingClientRect()}catch(t){}var i={left:r.left,top:r.top,width:r.right-r.left,height:r.bottom-r.top},n='HTML'===e.nodeName?h(e.ownerDocument):{},s=n.width||e.clientWidth||i.right-i.left,l=n.height||e.clientHeight||i.bottom-i.top,m=e.offsetWidth-s,f=e.offsetHeight-l;if(m||f){var y=t(e);m-=c(y,'x'),f-=c(y,'y'),i.width-=m,i.height-=f}return b(i)}function y(e,r){var o=!!(2<arguments.length&&void 0!==arguments[2])&&arguments[2],i=p(10),n='HTML'===r.nodeName,s=u(e),l=u(r),d=a(e),c=t(r),f=parseFloat(c.borderTopWidth,10),h=parseFloat(c.borderLeftWidth,10);o&&n&&(l.top=ae(l.top,0),l.left=ae(l.left,0));var y=b({top:s.top-l.top-f,left:s.left-l.left-h,width:s.width,height:s.height});if(y.marginTop=0,y.marginLeft=0,!i&&n){var g=parseFloat(c.marginTop,10),x=parseFloat(c.marginLeft,10);y.top-=f-g,y.bottom-=f-g,y.left-=h-x,y.right-=h-x,y.marginTop=g,y.marginLeft=x}return(i&&!o?r.contains(d):r===d&&'BODY'!==d.nodeName)&&(y=m(y,r)),y}function g(e){var t=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],r=e.ownerDocument.documentElement,a=y(e,r),p=ae(r.clientWidth,window.innerWidth||0),o=ae(r.clientHeight,window.innerHeight||0),i=t?0:d(r),n=t?0:d(r,'left'),s={top:i-a.top+a.marginTop,left:n-a.left+a.marginLeft,width:p,height:o};return b(s)}function x(e){var a=e.nodeName;return'BODY'!==a&&'HTML'!==a&&('fixed'===t(e,'position')||x(r(e)))}function w(e){if(!e||!e.parentElement||p())return document.documentElement;for(var r=e.parentElement;r&&'none'===t(r,'transform');)r=r.parentElement;return r||document.documentElement}function v(e,t,p,o){var i=!!(4<arguments.length&&void 0!==arguments[4])&&arguments[4],n={top:0,left:0},s=i?w(e):l(e,t);if('viewport'===o)n=g(s,i);else{var d;'scrollParent'===o?(d=a(r(t)),'BODY'===d.nodeName&&(d=e.ownerDocument.documentElement)):'window'===o?d=e.ownerDocument.documentElement:d=o;var m=y(d,s,i);if('HTML'===d.nodeName&&!x(s)){var c=h(e.ownerDocument),f=c.height,b=c.width;n.top+=m.top-m.marginTop,n.bottom=f+m.top,n.left+=m.left-m.marginLeft,n.right=b+m.left}else n=m}p=p||0;var u='number'==typeof p;return n.left+=u?p:p.left||0,n.top+=u?p:p.top||0,n.right-=u?p:p.right||0,n.bottom-=u?p:p.bottom||0,n}function k(e){var t=e.width,r=e.height;return t*r}function E(e,t,r,a,p){var o=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var i=v(r,a,o,p),n={top:{width:i.width,height:t.top-i.top},right:{width:i.right-t.right,height:i.height},bottom:{width:i.width,height:i.bottom-t.bottom},left:{width:t.left-i.left,height:i.height}},s=Object.keys(n).map(function(e){return Te({key:e},n[e],{area:k(n[e])})}).sort(function(e,t){return t.area-e.area}),l=s.filter(function(e){var t=e.width,a=e.height;return t>=r.clientWidth&&a>=r.clientHeight}),d=0<l.length?l[0].key:s[0].key,m=e.split('-')[1];return d+(m?'-'+m:'')}function O(e,t,r){var a=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,p=a?w(t):l(t,r);return y(r,p,a)}function C(e){var t=e.ownerDocument.defaultView,r=t.getComputedStyle(e),a=parseFloat(r.marginTop||0)+parseFloat(r.marginBottom||0),p=parseFloat(r.marginLeft||0)+parseFloat(r.marginRight||0),o={width:e.offsetWidth+p,height:e.offsetHeight+a};return o}function L(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function T(e,t,r){r=r.split('-')[0];var a=C(e),p={width:a.width,height:a.height},o=-1!==['right','left'].indexOf(r),i=o?'top':'left',n=o?'left':'top',s=o?'height':'width',l=o?'width':'height';return p[i]=t[i]+t[s]/2-a[s]/2,p[n]=r===n?t[n]-a[l]:t[L(n)],p}function A(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function Y(e,t,r){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===r});var a=A(e,function(e){return e[t]===r});return e.indexOf(a)}function S(t,r,a){var p=void 0===a?t:t.slice(0,Y(t,'name',a));return p.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var a=t['function']||t.fn;t.enabled&&e(a)&&(r.offsets.popper=b(r.offsets.popper),r.offsets.reference=b(r.offsets.reference),r=a(r,t))}),r}function P(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=O(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=E(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=T(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?'fixed':'absolute',e=S(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function D(e,t){return e.some(function(e){var r=e.name,a=e.enabled;return a&&r===t})}function X(e){for(var t=[!1,'ms','Webkit','Moz','O'],r=e.charAt(0).toUpperCase()+e.slice(1),a=0;a<t.length;a++){var p=t[a],o=p?''+p+r:e;if('undefined'!=typeof document.body.style[o])return o}return null}function I(){return this.state.isDestroyed=!0,D(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.position='',this.popper.style.top='',this.popper.style.left='',this.popper.style.right='',this.popper.style.bottom='',this.popper.style.willChange='',this.popper.style[X('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function N(e){var t=e.ownerDocument;return t?t.defaultView:window}function H(e,t,r,p){var o='BODY'===e.nodeName,i=o?e.ownerDocument.defaultView:e;i.addEventListener(t,r,{passive:!0}),o||H(a(i.parentNode),t,r,p),p.push(i)}function R(e,t,r,p){r.updateBound=p,N(e).addEventListener('resize',r.updateBound,{passive:!0});var o=a(e);return H(o,'scroll',r.updateBound,r.scrollParents),r.scrollElement=o,r.eventsEnabled=!0,r}function W(){this.state.eventsEnabled||(this.state=R(this.reference,this.options,this.state,this.scheduleUpdate))}function B(e,t){return N(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function M(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=B(this.reference,this.state))}function z(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function _(e,t){Object.keys(t).forEach(function(r){var a='';-1!==['width','height','top','right','bottom','left'].indexOf(r)&&z(t[r])&&(a='px'),e.style[r]=t[r]+a})}function F(e,t){Object.keys(t).forEach(function(r){var a=t[r];!1===a?e.removeAttribute(r):e.setAttribute(r,t[r])})}function U(e,t){var r=e.offsets,a=r.popper,p=r.reference,o=re,i=function(e){return e},n=o(a.width),s=o(p.width),l=-1!==['left','right'].indexOf(e.placement),d=-1!==e.placement.indexOf('-'),m=t?l||d||s%2==n%2?o:te:i,c=t?o:i;return{left:m(1==s%2&&1==n%2&&!d&&t?a.left-1:a.left),top:c(a.top),bottom:c(a.bottom),right:m(a.right)}}function V(e,t,r){var a=A(e,function(e){var r=e.name;return r===t}),p=!!a&&e.some(function(e){return e.name===r&&e.enabled&&e.order<a.order});if(!p){var o='`'+t+'`';console.warn('`'+r+'`'+' modifier is required by '+o+' modifier in order to work, be sure to include it before '+o+'!')}return p}function q(e){return'end'===e?'start':'start'===e?'end':e}function j(e){var t=!!(1<arguments.length&&void 0!==arguments[1])&&arguments[1],r=Se.indexOf(e),a=Se.slice(r+1).concat(Se.slice(0,r));return t?a.reverse():a}function K(e,t,r,a){var p=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),o=+p[1],i=p[2];if(!o)return e;if(0===i.indexOf('%')){var n;switch(i){case'%p':n=r;break;case'%':case'%r':default:n=a;}var s=b(n);return s[t]/100*o}if('vh'===i||'vw'===i){var l;return l='vh'===i?ae(document.documentElement.clientHeight,window.innerHeight||0):ae(document.documentElement.clientWidth,window.innerWidth||0),l/100*o}return o}function G(e,t,r,a){var p=[0,0],o=-1!==['right','left'].indexOf(a),i=e.split(/(\+|\-)/).map(function(e){return e.trim()}),n=i.indexOf(A(i,function(e){return-1!==e.search(/,|\s/)}));i[n]&&-1===i[n].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var s=/\s*,\s*|\s+/,l=-1===n?[i]:[i.slice(0,n).concat([i[n].split(s)[0]]),[i[n].split(s)[1]].concat(i.slice(n+1))];return l=l.map(function(e,a){var p=(1===a?!o:o)?'height':'width',i=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,i=!0,e):i?(e[e.length-1]+=t,i=!1,e):e.concat(t)},[]).map(function(e){return K(e,p,t,r)})}),l.forEach(function(e,t){e.forEach(function(r,a){z(r)&&(p[t]+=r*('-'===e[a-1]?-1:1))})}),p}function J(e,t){var r=t.offset,a=e.placement,p=e.offsets,o=p.popper,i=p.reference,n=a.split('-')[0],s=void 0;return s=z(+r)?[+r,0]:G(r,o,i,n),'left'===n?(o.top+=s[0],o.left-=s[1]):'right'===n?(o.top+=s[0],o.left+=s[1]):'top'===n?(o.left+=s[0],o.top-=s[1]):'bottom'===n&&(o.left+=s[0],o.top+=s[1]),e.popper=o,e}function Z(){document.addEventListener('click',Yt,!0),document.addEventListener('touchstart',Lt,{passive:!0}),window.addEventListener('blur',St),window.addEventListener('resize',Pt),!ye&&(navigator.maxTouchPoints||navigator.msMaxTouchPoints)&&document.addEventListener('pointerdown',Lt)}function $(e,t){function r(){yt(function(){z=!1})}function a(){X=new MutationObserver(function(){q.popperInstance.update()}),X.observe(U,{childList:!0,subtree:!0,characterData:!0})}function p(e){var t=N=e,r=t.clientX,a=t.clientY;if(q.popperInstance){var p=xt(q.popper),o=q.popperChildren.arrow?20:5,i='top'===p||'bottom'===p,n='left'===p||'right'===p,s=i?ae(o,r):r,l=n?ae(o,a):a;i&&s>o&&(s=ee(r,window.innerWidth-o)),n&&l>o&&(l=ee(a,window.innerHeight-o));var d=q.reference.getBoundingClientRect(),m=q.props.followCursor,c='horizontal'===m,f='vertical'===m;q.popperInstance.reference={getBoundingClientRect:function(){return{width:0,height:0,top:c?d.top:l,bottom:c?d.bottom:l,left:f?d.left:s,right:f?d.right:s}},clientWidth:0,clientHeight:0},q.popperInstance.scheduleUpdate()}}function o(e){var t=pt(e.target,q.props.target);t&&!t._tippy&&($(t,ie({},q.props,{target:'',showOnInit:!0})),i(e))}function i(e){if(T(),!q.state.isVisible){if(q.props.target)return o(e);if(W=!0,q.props.wait)return q.props.wait(q,e);x()&&document.addEventListener('mousemove',p);var t=Ve(q.props.delay,0,ne.delay);t?H=setTimeout(function(){Y()},t):Y()}}function n(){if(T(),!q.state.isVisible)return s();W=!1;var e=Ve(q.props.delay,1,ne.delay);e?R=setTimeout(function(){q.state.isVisible&&S()},e):S()}function s(){document.removeEventListener('mousemove',p),N=null}function l(){document.body.removeEventListener('mouseleave',n),document.removeEventListener('mousemove',_)}function d(e){!q.state.isEnabled||y(e)||(!q.state.isVisible&&(I=e),'click'===e.type&&!1!==q.props.hideOnClick&&q.state.isVisible?n():i(e))}function m(e){var t=ot(e.target,function(e){return e._tippy}),r=pt(e.target,Xe.POPPER)===q.popper,a=t===q.reference;r||a||ut(xt(q.popper),q.popper.getBoundingClientRect(),e,q.props)&&(l(),n())}function c(e){return y(e)?void 0:q.props.interactive?(document.body.addEventListener('mouseleave',n),void document.addEventListener('mousemove',_)):void n()}function f(e){if(e.target===q.reference){if(q.props.interactive){if(!e.relatedTarget)return;if(pt(e.relatedTarget,Xe.POPPER))return}n()}}function h(e){pt(e.target,q.props.target)&&i(e)}function b(e){pt(e.target,q.props.target)&&n()}function y(e){var t=-1<e.type.indexOf('touch'),r=ye&&Ct&&q.props.touchHold&&!t,a=Ct&&!q.props.touchHold&&t;return r||a}function u(){var e=q.popperChildren.tooltip,t=q.props.popperOptions,r=Xe['round'===q.props.arrowType?'ROUND_ARROW':'ARROW'],p=e.querySelector(r),o=ie({placement:q.props.placement},t||{},{modifiers:ie({},t?t.modifiers:{},{arrow:ie({element:r},t&&t.modifiers?t.modifiers.arrow:{}),flip:ie({enabled:q.props.flip,padding:q.props.distance+5,behavior:q.props.flipBehavior},t&&t.modifiers?t.modifiers.flip:{}),offset:ie({offset:q.props.offset},t&&t.modifiers?t.modifiers.offset:{})}),onCreate:function(){e.style[xt(q.popper)]=gt(q.props.distance,ne.distance),p&&q.props.arrowTransform&&ft(p,q.props.arrowTransform)},onUpdate:function(){var t=e.style;t.top='',t.bottom='',t.left='',t.right='',t[xt(q.popper)]=gt(q.props.distance,ne.distance),p&&q.props.arrowTransform&&ft(p,q.props.arrowTransform)}});return X||a(),new De(q.reference,q.popper,o)}function g(e){q.popperInstance?!x()&&(q.popperInstance.scheduleUpdate(),q.props.livePlacement&&q.popperInstance.enableEventListeners()):(q.popperInstance=u(),(!q.props.livePlacement||x())&&q.popperInstance.disableEventListeners()),q.popperInstance.reference=q.reference;var t=q.popperChildren.arrow;if(x()){t&&(t.style.margin='0');var r=Ve(q.props.delay,0,ne.delay);I.type&&p(r&&N?N:I)}else t&&(t.style.margin='');bt(q.popperInstance,e),q.props.appendTo.contains(q.popper)||(q.props.appendTo.appendChild(q.popper),q.props.onMount(q),q.state.isMounted=!0)}function x(){return q.props.followCursor&&!Ct&&'focus'!==I.type}function w(){We([q.popper],he?0:q.props.updateDuration);(function e(){q.popperInstance&&q.popperInstance.scheduleUpdate(),q.state.isMounted?requestAnimationFrame(e):We([q.popper],0)})()}function v(e,t){E(e,function(){!q.state.isVisible&&q.props.appendTo.contains(q.popper)&&t()})}function k(e,t){E(e,t)}function E(e,t){if(0===e)return t();var r=q.popperChildren.tooltip,a=function a(p){p.target===r&&(vt(r,'remove',a),t())};vt(r,'remove',B),vt(r,'add',a),B=a}function O(e,t,r){q.reference.addEventListener(e,t),r.push({eventType:e,handler:t})}function C(){M=q.props.trigger.trim().split(' ').reduce(function(e,t){return'manual'===t?e:(q.props.target?'mouseenter'===t?(O('mouseover',h,e),O('mouseout',b,e)):'focus'===t?(O('focusin',h,e),O('focusout',b,e)):'click'===t?O(t,h,e):void 0:(O(t,d,e),q.props.touchHold&&(O('touchstart',d,e),O('touchend',c,e)),'mouseenter'===t?O('mouseleave',c,e):'focus'===t?O(he?'focusout':'blur',f,e):void 0),e)},[])}function L(){M.forEach(function(e){var t=e.eventType,r=e.handler;q.reference.removeEventListener(t,r)})}function T(){clearTimeout(H),clearTimeout(R)}function A(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};Et(e,ne);var t=q.props,r=wt(q.reference,ie({},q.props,e,{performance:!0}));r.performance=Ot(e,'performance')?e.performance:t.performance,q.props=r,(Ot(e,'trigger')||Ot(e,'touchHold'))&&(L(),C()),Ot(e,'interactiveDebounce')&&(l(),_=kt(m,e.interactiveDebounce)),Qe(q.popper,t,r),q.popperChildren=Be(q.popper),q.popperInstance&&le.some(function(t){return Ot(e,t)})&&(q.popperInstance.destroy(),q.popperInstance=u(),!q.state.isVisible&&q.popperInstance.disableEventListeners(),q.props.followCursor&&N&&p(N))}function Y(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:Ve(q.props.duration,0,ne.duration[0]);return q.state.isDestroyed||!q.state.isEnabled||Ct&&!q.props.touch?void 0:q.reference.isVirtual||document.documentElement.contains(q.reference)?q.reference.hasAttribute('disabled')?void 0:z?void(z=!1):void(!1===q.props.onShow(q)||(q.popper.style.visibility='visible',q.state.isVisible=!0,We([q.popper,q.popperChildren.tooltip,q.popperChildren.backdrop],0),g(function(){q.state.isVisible&&(!x()&&q.popperInstance.update(),We([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],e),q.popperChildren.backdrop&&(q.popperChildren.content.style.transitionDelay=re(e/6)+'ms'),q.props.interactive&&q.reference.classList.add('tippy-active'),q.props.sticky&&w(),ht([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],'visible'),k(e,function(){0===q.props.updateDuration&&q.popperChildren.tooltip.classList.add('tippy-notransition'),q.props.interactive&&-1<['focus','click'].indexOf(I.type)&&it(q.popper),q.reference.setAttribute('aria-describedby',q.popper.id),q.props.onShown(q),q.state.isShown=!0}))}))):P()}function S(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:Ve(q.props.duration,1,ne.duration[1]);q.state.isDestroyed||!q.state.isEnabled||!1===q.props.onHide(q)||(0===q.props.updateDuration&&q.popperChildren.tooltip.classList.remove('tippy-notransition'),q.props.interactive&&q.reference.classList.remove('tippy-active'),q.popper.style.visibility='hidden',q.state.isVisible=!1,q.state.isShown=!1,We([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],e),ht([q.popperChildren.tooltip,q.popperChildren.backdrop,q.popperChildren.content],'hidden'),q.props.interactive&&!z&&-1<['focus','click'].indexOf(I.type)&&('focus'===I.type&&(z=!0),it(q.reference)),v(e,function(){W||s(),q.reference.removeAttribute('aria-describedby'),q.popperInstance.disableEventListeners(),q.props.appendTo.removeChild(q.popper),q.state.isMounted=!1,q.props.onHidden(q)}))}function P(e){q.state.isDestroyed||(q.state.isMounted&&S(0),L(),q.reference.removeEventListener('click',r),delete q.reference._tippy,q.props.target&&e&&Ne(q.reference.querySelectorAll(q.props.target)).forEach(function(e){return e._tippy&&e._tippy.destroy()}),q.popperInstance&&q.popperInstance.destroy(),X&&X.disconnect(),q.state.isDestroyed=!0)}var D=wt(e,t);if(!D.multiple&&e._tippy)return null;var X=null,I={},N=null,H=0,R=0,W=!1,B=function(){},M=[],z=!1,_=0<D.interactiveDebounce?kt(m,D.interactiveDebounce):m,F=Dt++,U=$e(F,D);U.addEventListener('mouseenter',function(e){q.props.interactive&&q.state.isVisible&&'mouseenter'===I.type&&i(e)}),U.addEventListener('mouseleave',function(e){q.props.interactive&&'mouseenter'===I.type&&0===q.props.interactiveDebounce&&ut(xt(U),U.getBoundingClientRect(),e,q.props)&&n()});var V=Be(U),q={id:F,reference:e,popper:U,popperChildren:V,popperInstance:null,props:D,state:{isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},clearDelayTimeouts:T,set:A,setContent:function(e){A({content:e})},show:Y,hide:S,enable:function(){q.state.isEnabled=!0},disable:function(){q.state.isEnabled=!1},destroy:P};return C(),e.addEventListener('click',r),D.lazy||(q.popperInstance=u(),q.popperInstance.disableEventListeners()),D.showOnInit&&i(),!D.a11y||D.target||Re(e)||e.setAttribute('tabindex','0'),e._tippy=q,U._tippy=q,q}function Q(e,t,r){Et(t,ne),Xt||(Z(),Xt=!0);var a=ie({},ne,t);Me(e)&&rt(e);var p=Fe(e),o=p[0],i=(r&&o?[o]:p).reduce(function(e,t){var r=t&&$(t,a);return r&&e.push(r),e},[]);return{targets:e,props:a,instances:i,destroyAll:function(){this.instances.forEach(function(e){e.destroy()}),this.instances=[]}}}for(var ee=Math.min,te=Math.floor,re=Math.round,ae=Math.max,pe='.tippy-iOS{cursor:pointer!important}.tippy-notransition{transition:none!important}.tippy-popper{-webkit-perspective:700px;perspective:700px;z-index:9999;outline:0;transition-timing-function:cubic-bezier(.165,.84,.44,1);pointer-events:none;line-height:1.4;max-width:calc(100% - 10px)}.tippy-popper[x-placement^=top] .tippy-backdrop{border-radius:40% 40% 0 0}.tippy-popper[x-placement^=top] .tippy-roundarrow{bottom:-8px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.tippy-popper[x-placement^=top] .tippy-arrow{border-top:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;bottom:-7px;margin:0 6px;-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=top] .tippy-backdrop{-webkit-transform-origin:0 25%;transform-origin:0 25%}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-55%);transform:scale(1) translate(-50%,-55%)}.tippy-popper[x-placement^=top] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%,-45%);transform:scale(.2) translate(-50%,-45%);opacity:0}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(-20px);transform:translateY(-20px)}.tippy-popper[x-placement^=top] [data-animation=perspective]{-webkit-transform-origin:bottom;transform-origin:bottom}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(-10px) rotateX(0);transform:translateY(-10px) rotateX(0)}.tippy-popper[x-placement^=top] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(60deg);transform:translateY(0) rotateX(60deg)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(-10px);transform:translateY(-10px)}.tippy-popper[x-placement^=top] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(-10px) scale(1);transform:translateY(-10px) scale(1)}.tippy-popper[x-placement^=top] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=bottom] .tippy-backdrop{border-radius:0 0 30% 30%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow{top:-8px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(0);transform:rotate(0)}.tippy-popper[x-placement^=bottom] .tippy-arrow{border-bottom:8px solid #333;border-right:8px solid transparent;border-left:8px solid transparent;top:-7px;margin:0 6px;-webkit-transform-origin:50% 100%;transform-origin:50% 100%}.tippy-popper[x-placement^=bottom] .tippy-backdrop{-webkit-transform-origin:0 -50%;transform-origin:0 -50%}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-45%);transform:scale(1) translate(-50%,-45%)}.tippy-popper[x-placement^=bottom] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-50%);transform:scale(.2) translate(-50%);opacity:0}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}.tippy-popper[x-placement^=bottom] [data-animation=perspective]{-webkit-transform-origin:top;transform-origin:top}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=visible]{-webkit-transform:translateY(10px) rotateX(0);transform:translateY(10px) rotateX(0)}.tippy-popper[x-placement^=bottom] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) rotateX(-60deg);transform:translateY(0) rotateX(-60deg)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateY(10px);transform:translateY(10px)}.tippy-popper[x-placement^=bottom] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateY(0);transform:translateY(0)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=visible]{-webkit-transform:translateY(10px) scale(1);transform:translateY(10px) scale(1)}.tippy-popper[x-placement^=bottom] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateY(0) scale(.5);transform:translateY(0) scale(.5)}.tippy-popper[x-placement^=left] .tippy-backdrop{border-radius:50% 0 0 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow{right:-16px;-webkit-transform-origin:33.33333333% 50%;transform-origin:33.33333333% 50%}.tippy-popper[x-placement^=left] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.tippy-popper[x-placement^=left] .tippy-arrow{border-left:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;right:-7px;margin:3px 0;-webkit-transform-origin:0 50%;transform-origin:0 50%}.tippy-popper[x-placement^=left] .tippy-backdrop{-webkit-transform-origin:50% 0;transform-origin:50% 0}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=left] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-75%,-50%);transform:scale(.2) translate(-75%,-50%);opacity:0}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(-20px);transform:translateX(-20px)}.tippy-popper[x-placement^=left] [data-animation=perspective]{-webkit-transform-origin:right;transform-origin:right}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(-10px) rotateY(0);transform:translateX(-10px) rotateY(0)}.tippy-popper[x-placement^=left] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(-60deg);transform:translateX(0) rotateY(-60deg)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(-10px);transform:translateX(-10px)}.tippy-popper[x-placement^=left] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(-10px) scale(1);transform:translateX(-10px) scale(1)}.tippy-popper[x-placement^=left] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-popper[x-placement^=right] .tippy-backdrop{border-radius:0 50% 50% 0}.tippy-popper[x-placement^=right] .tippy-roundarrow{left:-16px;-webkit-transform-origin:66.66666666% 50%;transform-origin:66.66666666% 50%}.tippy-popper[x-placement^=right] .tippy-roundarrow svg{position:absolute;left:0;-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.tippy-popper[x-placement^=right] .tippy-arrow{border-right:8px solid #333;border-top:8px solid transparent;border-bottom:8px solid transparent;left:-7px;margin:3px 0;-webkit-transform-origin:100% 50%;transform-origin:100% 50%}.tippy-popper[x-placement^=right] .tippy-backdrop{-webkit-transform-origin:-50% 0;transform-origin:-50% 0}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=visible]{-webkit-transform:scale(1) translate(-50%,-50%);transform:scale(1) translate(-50%,-50%)}.tippy-popper[x-placement^=right] .tippy-backdrop[data-state=hidden]{-webkit-transform:scale(.2) translate(-25%,-50%);transform:scale(.2) translate(-25%,-50%);opacity:0}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-toward][data-state=hidden]{opacity:0;-webkit-transform:translateX(20px);transform:translateX(20px)}.tippy-popper[x-placement^=right] [data-animation=perspective]{-webkit-transform-origin:left;transform-origin:left}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=visible]{-webkit-transform:translateX(10px) rotateY(0);transform:translateX(10px) rotateY(0)}.tippy-popper[x-placement^=right] [data-animation=perspective][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) rotateY(60deg);transform:translateX(0) rotateY(60deg)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=fade][data-state=hidden]{opacity:0;-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=visible]{-webkit-transform:translateX(10px);transform:translateX(10px)}.tippy-popper[x-placement^=right] [data-animation=shift-away][data-state=hidden]{opacity:0;-webkit-transform:translateX(0);transform:translateX(0)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=visible]{-webkit-transform:translateX(10px) scale(1);transform:translateX(10px) scale(1)}.tippy-popper[x-placement^=right] [data-animation=scale][data-state=hidden]{opacity:0;-webkit-transform:translateX(0) scale(.5);transform:translateX(0) scale(.5)}.tippy-tooltip{position:relative;color:#fff;border-radius:4px;font-size:.9rem;padding:.3rem .6rem;max-width:350px;text-align:center;will-change:transform;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background-color:#333}.tippy-tooltip[data-size=small]{padding:.2rem .4rem;font-size:.75rem}.tippy-tooltip[data-size=large]{padding:.4rem .8rem;font-size:1rem}.tippy-tooltip[data-animatefill]{overflow:hidden;background-color:transparent}.tippy-tooltip[data-interactive],.tippy-tooltip[data-interactive] path{pointer-events:auto}.tippy-tooltip[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.53,2,.36,.85)}.tippy-tooltip[data-inertia][data-state=hidden]{transition-timing-function:ease}.tippy-arrow,.tippy-roundarrow{position:absolute;width:0;height:0}.tippy-roundarrow{width:24px;height:8px;fill:#333;pointer-events:none}.tippy-backdrop{position:absolute;will-change:transform;background-color:#333;border-radius:50%;width:calc(110% + 2rem);left:50%;top:50%;z-index:-1;transition:all cubic-bezier(.46,.1,.52,.98);-webkit-backface-visibility:hidden;backface-visibility:hidden}.tippy-backdrop:after{content:"";float:left;padding-top:100%}.tippy-backdrop+.tippy-content{transition-property:opacity;will-change:opacity}.tippy-backdrop+.tippy-content[data-state=visible]{opacity:1}.tippy-backdrop+.tippy-content[data-state=hidden]{opacity:0}',oe='3.3.0',ie=Object.assign||function(e){for(var t,r=1;r<arguments.length;r++)for(var a in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},ne={a11y:!0,allowHTML:!0,animateFill:!0,animation:'shift-away',appendTo:function(){return document.body},arrow:!1,arrowTransform:'',arrowType:'sharp',content:'',delay:[0,20],distance:10,duration:[325,275],flip:!0,flipBehavior:'flip',followCursor:!1,hideOnClick:!0,inertia:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,lazy:!0,livePlacement:!0,maxWidth:'',multiple:!1,offset:0,onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},performance:!1,placement:'top',popperOptions:{},shouldPopperHideOnBlur:function(){return!0},showOnInit:!1,size:'regular',sticky:!1,target:'',theme:'dark',touch:!0,touchHold:!1,trigger:'mouseenter focus',updateDuration:200,wait:null,zIndex:9999},se=function(e){ne=ie({},ne,e)},le=['arrowType','distance','flip','flipBehavior','offset','placement','popperOptions'],de='undefined'!=typeof window,me=de?navigator:{},ce=de?window:{},fe=('MutationObserver'in ce),he=/MSIE |Trident\//.test(me.userAgent),be=/iPhone|iPad|iPod/.test(me.platform)&&!ce.MSStream,ye=('ontouchstart'in ce),ue='undefined'!=typeof window&&'undefined'!=typeof document,ge=['Edge','Trident','Firefox'],xe=0,we=0;we<ge.length;we+=1)if(ue&&0<=navigator.userAgent.indexOf(ge[we])){xe=1;break}var i=ue&&window.Promise,ve=i?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},xe))}},ke=ue&&!!(window.MSInputMethodContext&&document.documentMode),Ee=ue&&/MSIE 10/.test(navigator.userAgent),Oe=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},Ce=function(){function e(e,t){for(var r,a=0;a<t.length;a++)r=t[a],r.enumerable=r.enumerable||!1,r.configurable=!0,'value'in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),Le=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},Te=Object.assign||function(e){for(var t,r=1;r<arguments.length;r++)for(var a in t=arguments[r],t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},Ae=ue&&/Firefox/i.test(navigator.userAgent),Ye=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],Se=Ye.slice(3),Pe={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},De=function(){function t(r,a){var p=this,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};Oe(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(p.update)},this.update=ve(this.update.bind(this)),this.options=Te({},t.Defaults,o),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=r&&r.jquery?r[0]:r,this.popper=a&&a.jquery?a[0]:a,this.options.modifiers={},Object.keys(Te({},t.Defaults.modifiers,o.modifiers)).forEach(function(e){p.options.modifiers[e]=Te({},t.Defaults.modifiers[e]||{},o.modifiers?o.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return Te({name:e},p.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(p.reference,p.popper,p.options,t,p.state)}),this.update();var i=this.options.eventsEnabled;i&&this.enableEventListeners(),this.state.eventsEnabled=i}return Ce(t,[{key:'update',value:function(){return P.call(this)}},{key:'destroy',value:function(){return I.call(this)}},{key:'enableEventListeners',value:function(){return W.call(this)}},{key:'disableEventListeners',value:function(){return M.call(this)}}]),t}();De.Utils=('undefined'==typeof window?global:window).PopperUtils,De.placements=Ye,De.Defaults={placement:'bottom',positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,r=t.split('-')[0],a=t.split('-')[1];if(a){var p=e.offsets,o=p.reference,i=p.popper,n=-1!==['bottom','top'].indexOf(r),s=n?'left':'top',l=n?'width':'height',d={start:Le({},s,o[s]),end:Le({},s,o[s]+o[l]-i[l])};e.offsets.popper=Te({},i,d[a])}return e}},offset:{order:200,enabled:!0,fn:J,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var r=t.boundariesElement||o(e.instance.popper);e.instance.reference===r&&(r=o(r));var a=X('transform'),p=e.instance.popper.style,i=p.top,n=p.left,s=p[a];p.top='',p.left='',p[a]='';var l=v(e.instance.popper,e.instance.reference,t.padding,r,e.positionFixed);p.top=i,p.left=n,p[a]=s,t.boundaries=l;var d=t.priority,m=e.offsets.popper,c={primary:function(e){var r=m[e];return m[e]<l[e]&&!t.escapeWithReference&&(r=ae(m[e],l[e])),Le({},e,r)},secondary:function(e){var r='right'===e?'left':'top',a=m[r];return m[e]>l[e]&&!t.escapeWithReference&&(a=ee(m[r],l[e]-('right'===e?m.width:m.height))),Le({},r,a)}};return d.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';m=Te({},m,c[t](e))}),e.offsets.popper=m,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,r=t.popper,a=t.reference,p=e.placement.split('-')[0],o=te,i=-1!==['top','bottom'].indexOf(p),n=i?'right':'bottom',s=i?'left':'top',l=i?'width':'height';return r[n]<o(a[s])&&(e.offsets.popper[s]=o(a[s])-r[l]),r[s]>o(a[n])&&(e.offsets.popper[s]=o(a[n])),e}},arrow:{order:500,enabled:!0,fn:function(e,r){var a;if(!V(e.instance.modifiers,'arrow','keepTogether'))return e;var p=r.element;if('string'==typeof p){if(p=e.instance.popper.querySelector(p),!p)return e;}else if(!e.instance.popper.contains(p))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var o=e.placement.split('-')[0],i=e.offsets,n=i.popper,s=i.reference,l=-1!==['left','right'].indexOf(o),d=l?'height':'width',m=l?'Top':'Left',c=m.toLowerCase(),f=l?'left':'top',h=l?'bottom':'right',y=C(p)[d];s[h]-y<n[c]&&(e.offsets.popper[c]-=n[c]-(s[h]-y)),s[c]+y>n[h]&&(e.offsets.popper[c]+=s[c]+y-n[h]),e.offsets.popper=b(e.offsets.popper);var u=s[c]+s[d]/2-y/2,g=t(e.instance.popper),x=parseFloat(g['margin'+m],10),w=parseFloat(g['border'+m+'Width'],10),v=u-e.offsets.popper[c]-x-w;return v=ae(ee(n[d]-y,v),0),e.arrowElement=p,e.offsets.arrow=(a={},Le(a,c,re(v)),Le(a,f,''),a),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(D(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var r=v(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),a=e.placement.split('-')[0],p=L(a),o=e.placement.split('-')[1]||'',i=[];switch(t.behavior){case Pe.FLIP:i=[a,p];break;case Pe.CLOCKWISE:i=j(a);break;case Pe.COUNTERCLOCKWISE:i=j(a,!0);break;default:i=t.behavior;}return i.forEach(function(n,s){if(a!==n||i.length===s+1)return e;a=e.placement.split('-')[0],p=L(a);var l=e.offsets.popper,d=e.offsets.reference,m=te,c='left'===a&&m(l.right)>m(d.left)||'right'===a&&m(l.left)<m(d.right)||'top'===a&&m(l.bottom)>m(d.top)||'bottom'===a&&m(l.top)<m(d.bottom),f=m(l.left)<m(r.left),h=m(l.right)>m(r.right),b=m(l.top)<m(r.top),y=m(l.bottom)>m(r.bottom),u='left'===a&&f||'right'===a&&h||'top'===a&&b||'bottom'===a&&y,g=-1!==['top','bottom'].indexOf(a),x=!!t.flipVariations&&(g&&'start'===o&&f||g&&'end'===o&&h||!g&&'start'===o&&b||!g&&'end'===o&&y);(c||u||x)&&(e.flipped=!0,(c||u)&&(a=i[s+1]),x&&(o=q(o)),e.placement=a+(o?'-'+o:''),e.offsets.popper=Te({},e.offsets.popper,T(e.instance.popper,e.offsets.reference,e.placement)),e=S(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,r=t.split('-')[0],a=e.offsets,p=a.popper,o=a.reference,i=-1!==['left','right'].indexOf(r),n=-1===['top','left'].indexOf(r);return p[i?'left':'top']=o[r]-(n?p[i?'width':'height']:0),e.placement=L(t),e.offsets.popper=b(p),e}},hide:{order:800,enabled:!0,fn:function(e){if(!V(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,r=A(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<r.top||t.left>r.right||t.top>r.bottom||t.right<r.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var r=t.x,a=t.y,p=e.offsets.popper,i=A(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==i&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var n=void 0===i?t.gpuAcceleration:i,s=o(e.instance.popper),l=u(s),d={position:p.position},m=U(e,2>window.devicePixelRatio||!Ae),c='bottom'===r?'top':'bottom',f='right'===a?'left':'right',h=X('transform'),b=void 0,y=void 0;if(y='bottom'==c?'HTML'===s.nodeName?-s.clientHeight+m.bottom:-l.height+m.bottom:m.top,b='right'==f?'HTML'===s.nodeName?-s.clientWidth+m.right:-l.width+m.right:m.left,n&&h)d[h]='translate3d('+b+'px, '+y+'px, 0)',d[c]=0,d[f]=0,d.willChange='transform';else{var g='bottom'==c?-1:1,x='right'==f?-1:1;d[c]=y*g,d[f]=b*x,d.willChange=c+', '+f}var w={"x-placement":e.placement};return e.attributes=Te({},w,e.attributes),e.styles=Te({},d,e.styles),e.arrowStyles=Te({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return _(e.instance.popper,e.styles),F(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&_(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,r,a,p){var o=O(p,t,e,r.positionFixed),i=E(r.placement,o,t,e,r.modifiers.flip.boundariesElement,r.modifiers.flip.padding);return t.setAttribute('x-placement',i),_(t,{position:r.positionFixed?'fixed':'absolute'}),r},gpuAcceleration:void 0}}};var Xe={POPPER:'.tippy-popper',TOOLTIP:'.tippy-tooltip',CONTENT:'.tippy-content',BACKDROP:'.tippy-backdrop',ARROW:'.tippy-arrow',ROUND_ARROW:'.tippy-roundarrow'},Ie={x:!0},Ne=function(e){return[].slice.call(e)},He=function(e,t){t.content instanceof Element?(_e(e,''),e.appendChild(t.content)):e[t.allowHTML?'innerHTML':'textContent']=t.content},Re=function(e){return!(e instanceof Element)||at.call(e,'a[href],area[href],button,details,input,textarea,select,iframe,[tabindex]')&&!e.hasAttribute('disabled')},We=function(e,t){e.filter(Boolean).forEach(function(e){e.style.transitionDuration=t+'ms'})},Be=function(e){var t=function(t){return e.querySelector(t)};return{tooltip:t(Xe.TOOLTIP),backdrop:t(Xe.BACKDROP),content:t(Xe.CONTENT),arrow:t(Xe.ARROW)||t(Xe.ROUND_ARROW)}},Me=function(e){return'[object Object]'==={}.toString.call(e)},ze=function(){return document.createElement('div')},_e=function(e,t){e[Ie.x&&'innerHTML']=t instanceof Element?t[Ie.x&&'innerHTML']:t},Fe=function(e){if(e instanceof Element||Me(e))return[e];if(e instanceof NodeList)return Ne(e);if(Array.isArray(e))return e;try{return Ne(document.querySelectorAll(e))}catch(t){return[]}},Ue=function(e){return!isNaN(e)&&!isNaN(parseFloat(e))},Ve=function(e,t,r){if(Array.isArray(e)){var a=e[t];return null==a?r:a}return e},qe=function(e){var t=ze();return'round'===e?(t.className='tippy-roundarrow',_e(t,'<svg viewBox="0 0 24 8" xmlns="http://www.w3.org/2000/svg"><path d="M3 8s2.021-.015 5.253-4.218C9.584 2.051 10.797 1.007 12 1c1.203-.007 2.416 1.035 3.761 2.782C19.012 8.005 21 8 21 8H3z"/></svg>')):t.className='tippy-arrow',t},je=function(){var e=ze();return e.className='tippy-backdrop',e.setAttribute('data-state','hidden'),e},Ke=function(e,t){e.setAttribute('tabindex','-1'),t.setAttribute('data-interactive','')},Ge=function(e,t){e.removeAttribute('tabindex'),t.removeAttribute('data-interactive')},Je=function(e){e.setAttribute('data-inertia','')},Ze=function(e){e.removeAttribute('data-inertia')},$e=function(e,t){var r=ze();r.className='tippy-popper',r.setAttribute('role','tooltip'),r.id='tippy-'+e,r.style.zIndex=t.zIndex;var a=ze();a.className='tippy-tooltip',a.style.maxWidth=t.maxWidth+('number'==typeof t.maxWidth?'px':''),a.setAttribute('data-size',t.size),a.setAttribute('data-animation',t.animation),a.setAttribute('data-state','hidden'),t.theme.split(' ').forEach(function(e){a.classList.add(e+'-theme')});var p=ze();return p.className='tippy-content',p.setAttribute('data-state','hidden'),t.interactive&&Ke(r,a),t.arrow&&a.appendChild(qe(t.arrowType)),t.animateFill&&(a.appendChild(je()),a.setAttribute('data-animatefill','')),t.inertia&&a.setAttribute('data-inertia',''),He(p,t),a.appendChild(p),r.appendChild(a),r.addEventListener('focusout',function(t){t.relatedTarget&&r._tippy&&!ot(t.relatedTarget,function(e){return e===r})&&t.relatedTarget!==r._tippy.reference&&r._tippy.props.shouldPopperHideOnBlur(t)&&r._tippy.hide()}),r},Qe=function(e,t,r){var a=Be(e),p=a.tooltip,o=a.content,i=a.backdrop,n=a.arrow;e.style.zIndex=r.zIndex,p.setAttribute('data-size',r.size),p.setAttribute('data-animation',r.animation),p.style.maxWidth=r.maxWidth+('number'==typeof r.maxWidth?'px':''),t.content!==r.content&&He(o,r),!t.animateFill&&r.animateFill?(p.appendChild(je()),p.setAttribute('data-animatefill','')):t.animateFill&&!r.animateFill&&(p.removeChild(i),p.removeAttribute('data-animatefill')),!t.arrow&&r.arrow?p.appendChild(qe(r.arrowType)):t.arrow&&!r.arrow&&p.removeChild(n),t.arrow&&r.arrow&&t.arrowType!==r.arrowType&&p.replaceChild(qe(r.arrowType),n),!t.interactive&&r.interactive?Ke(e,p):t.interactive&&!r.interactive&&Ge(e,p),!t.inertia&&r.inertia?Je(p):t.inertia&&!r.inertia&&Ze(p),t.theme!==r.theme&&(t.theme.split(' ').forEach(function(e){p.classList.remove(e+'-theme')}),r.theme.split(' ').forEach(function(e){p.classList.add(e+'-theme')}))},et=function(e){Ne(document.querySelectorAll(Xe.POPPER)).forEach(function(t){var r=t._tippy;r&&!0===r.props.hideOnClick&&(!e||t!==e.popper)&&r.hide()})},tt=function(e){return Object.keys(ne).reduce(function(t,r){var a=(e.getAttribute('data-tippy-'+r)||'').trim();return a?(t[r]='content'===r?a:'true'===a||'false'!==a&&(Ue(a)?+a:'['===a[0]||'{'===a[0]?JSON.parse(a):a),t):t},{})},rt=function(e){var t={isVirtual:!0,attributes:e.attributes||{},setAttribute:function(t,r){e.attributes[t]=r},getAttribute:function(t){return e.attributes[t]},removeAttribute:function(t){delete e.attributes[t]},hasAttribute:function(t){return t in e.attributes},addEventListener:function(){},removeEventListener:function(){},classList:{classNames:{},add:function(t){e.classList.classNames[t]=!0},remove:function(t){delete e.classList.classNames[t]},contains:function(t){return t in e.classList.classNames}}};for(var r in t)e[r]=t[r];return e},at=function(){if(de){var t=Element.prototype;return t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector}}(),pt=function(e,t){return(Element.prototype.closest||function(e){for(var t=this;t;){if(at.call(t,e))return t;t=t.parentElement}}).call(e,t)},ot=function(e,t){for(;e;){if(t(e))return e;e=e.parentElement}},it=function(e){var t=window.scrollX||window.pageXOffset,r=window.scrollY||window.pageYOffset;e.focus(),scroll(t,r)},nt=function(e){void e.offsetHeight},st=function(e,t){return(t?e:{X:'Y',Y:'X'}[e])||''},lt=function(e,t,r,p){var o=t[0],i=t[1];if(!o&&!i)return'';var n={scale:function(){return i?r?o+', '+i:i+', '+o:''+o}(),translate:function(){return i?r?p?o+'px, '+-i+'px':o+'px, '+i+'px':p?-i+'px, '+o+'px':i+'px, '+o+'px':p?-o+'px':o+'px'}()};return n[e]},dt=function(e,t){var r=e.match(new RegExp(t+'([XY])'));return r?r[1]:''},mt=function(e,t){var r=e.match(t);return r?r[1].split(',').map(parseFloat):[]},ct={translate:/translateX?Y?\(([^)]+)\)/,scale:/scaleX?Y?\(([^)]+)\)/},ft=function(e,t){var r=xt(pt(e,Xe.POPPER)),a='top'===r||'bottom'===r,p='right'===r||'bottom'===r,o={translate:{axis:dt(t,'translate'),numbers:mt(t,ct.translate)},scale:{axis:dt(t,'scale'),numbers:mt(t,ct.scale)}},i=t.replace(ct.translate,'translate'+st(o.translate.axis,a)+'('+lt('translate',o.translate.numbers,a,p)+')').replace(ct.scale,'scale'+st(o.scale.axis,a)+'('+lt('scale',o.scale.numbers,a,p)+')');e.style['undefined'==typeof document.body.style.transform?'webkitTransform':'transform']=i},ht=function(e,t){e.filter(Boolean).forEach(function(e){e.setAttribute('data-state',t)})},bt=function(e,t){var r=e.popper,a=e.options,p=a.onCreate,o=a.onUpdate;a.onCreate=a.onUpdate=function(){nt(r),t(),o(),a.onCreate=p,a.onUpdate=o}},yt=function(e){setTimeout(e,1)},ut=function(e,t,r,a){if(!e)return!0;var p=r.clientX,o=r.clientY,i=a.interactiveBorder,n=a.distance,s=t.top-o>('top'===e?i+n:i),l=o-t.bottom>('bottom'===e?i+n:i),d=t.left-p>('left'===e?i+n:i),m=p-t.right>('right'===e?i+n:i);return s||l||d||m},gt=function(e,t){return-(e-t)+'px'},xt=function(e){var t=e.getAttribute('x-placement');return t?t.split('-')[0]:''},wt=function(e,t){var r=ie({},t,t.performance?{}:tt(e));return r.arrow&&(r.animateFill=!1),'function'==typeof r.appendTo&&(r.appendTo=t.appendTo(e)),'function'==typeof r.content&&(r.content=t.content(e)),r},vt=function(e,t,r){e[t+'EventListener']('transitionend',r)},kt=function(e,t){var r;return function(){var a=this,p=arguments;clearTimeout(r),r=setTimeout(function(){return e.apply(a,p)},t)}},Et=function(e,t){for(var r in e||{})if(!(r in t))throw Error('[tippy]: `'+r+'` is not a valid option')},Ot=function(e,t){return{}.hasOwnProperty.call(e,t)},Ct=!1,Lt=function(){Ct||(Ct=!0,be&&document.body.classList.add('tippy-iOS'),window.performance&&document.addEventListener('mousemove',At))},Tt=0,At=function e(){var t=performance.now();20>t-Tt&&(Ct=!1,document.removeEventListener('mousemove',e),!be&&document.body.classList.remove('tippy-iOS')),Tt=t},Yt=function(e){var t=e.target;if(!(t instanceof Element))return et();var r=pt(t,Xe.POPPER);if(!(r&&r._tippy&&r._tippy.props.interactive)){var a=ot(t,function(e){return e._tippy&&e._tippy.reference===e});if(a){var p=a._tippy,o=-1<p.props.trigger.indexOf('click');if(Ct||o)return et(p);if(!0!==p.props.hideOnClick||o)return;p.clearDelayTimeouts()}et()}},St=function(){var e=document,t=e.activeElement;t&&t.blur&&t._tippy&&t.blur()},Pt=function(){Ne(document.querySelectorAll(Xe.POPPER)).forEach(function(e){var t=e._tippy;t.props.livePlacement||t.popperInstance.scheduleUpdate()})},Dt=1,Xt=!1;Q.version=oe,Q.defaults=ne,Q.one=function(e,t){return Q(e,t,!0).instances[0]},Q.setDefaults=function(e){se(e),Q.defaults=ne},Q.disableAnimations=function(){Q.setDefaults({duration:0,updateDuration:0,animateFill:!1})},Q.hideAllPoppers=et,Q.useCapture=function(){};return de&&setTimeout(function(){Ne(document.querySelectorAll('[data-tippy]')).forEach(function(e){var t=e.getAttribute('data-tippy');t&&Q(e,{content:t})})}),function(e){if(fe){var t=document.createElement('style');t.type='text/css',t.textContent=e,document.head.insertBefore(t,document.head.firstChild)}}(pe),Q});
//# sourceMappingURL=tippy.all.min.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(17)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _evented = __webpack_require__(5);

var _step = __webpack_require__(9);

var _tour = __webpack_require__(47);

Object.assign(_tour.Shepherd, {
  Tour: _tour.Tour,
  Step: _step.Step,
  Evented: _evented.Evented
});
exports.default = _tour.Shepherd;
module.exports = exports.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(20),
    toInteger = __webpack_require__(21);

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
/* 20 */
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
/* 21 */
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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(7);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 23 */
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
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(6),
    isLength = __webpack_require__(26);

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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(1),
    isPlainObject = __webpack_require__(31);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(3),
    getPrototype = __webpack_require__(32),
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(7);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(34),
    keys = __webpack_require__(36);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(35);

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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(7);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports) {

if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(40),
    baseZipObject = __webpack_require__(45);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(41),
    eq = __webpack_require__(44);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(42);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(43);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 43 */
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
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var missingTippy = exports.missingTippy = 'Using the attachment feature of Shepherd requires the Tippy.js library';

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shepherd = exports.Tour = undefined;

var _isEmpty2 = __webpack_require__(12);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(2);

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = __webpack_require__(48);

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isFunction2 = __webpack_require__(6);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _evented = __webpack_require__(5);

var _modal = __webpack_require__(49);

var _step = __webpack_require__(9);

var _bind = __webpack_require__(14);

var _tippy = __webpack_require__(16);

var _tippy2 = _interopRequireDefault(_tippy);

var _tooltipDefaults = __webpack_require__(62);

var _cleanup = __webpack_require__(63);

var _dom = __webpack_require__(8);

var _modal2 = __webpack_require__(4);

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
 * Creates incremented ID for each newly created tour
 *
 * @private
 * @return {Number} The unique id for the tour
 */
var uniqueId = function () {
  var id = 0;
  return function () {
    return ++id;
  };
}();

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
    _this.modal = new _modal.Modal(options);

    _this._setTooltipDefaults();

    _this._setTourID();

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

      _dom.cleanupStepEventListeners.call(this);

      (0, _cleanup.cleanupSteps)(this.tourObject);
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
  }, {
    key: "beforeShowStep",
    value: function beforeShowStep(step) {
      this.modal.setupForStep(step);

      this._styleTargetElementForStep(step);
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

      _dom.addStepEventListeners.call(this);

      this.next();
    }
    /**
     * Make this tour "active"
     * @private
     */

  }, {
    key: "_setupActiveTour",
    value: function _setupActiveTour() {
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

  }, {
    key: "_styleTargetElementForStep",
    value: function _styleTargetElementForStep(step) {
      var targetElement = (0, _dom.getElementForStep)(step);

      if (!targetElement) {
        return;
      }

      (0, _modal2.toggleShepherdModalClass)(targetElement);

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
  }, {
    key: "_setTourID",
    value: function _setTourID() {
      var tourName = this.options.tourName || 'tour';
      var uuid = uniqueId();
      this.id = "".concat(tourName, "--").concat(uuid);
    }
  }, {
    key: "_addBodyAttrs",
    value: function _addBodyAttrs() {
      document.body.setAttribute('data-shepherd-active-tour', this.id);
      document.body.classList.add('shepherd-active');
    }
  }, {
    key: "_removeBodyAttrs",
    value: function _removeBodyAttrs() {
      document.body.removeAttribute('data-shepherd-active-tour');
      document.body.classList.remove('shepherd-active');
    }
  }]);

  return Tour;
}(_evented.Evented);

exports.Shepherd = Shepherd;

/***/ }),
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = undefined;

var _defer2 = __webpack_require__(50);

var _defer3 = _interopRequireDefault(_defer2);

var _debounce2 = __webpack_require__(57);

var _debounce3 = _interopRequireDefault(_debounce2);

var _modal = __webpack_require__(4);

var _dom = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Modal =
/*#__PURE__*/
exports.Modal = function () {
  function Modal(options) {
    _classCallCheck(this, Modal);

    if (!this._modalOverlayElem) {
      this._modalOverlayElem = (0, _modal.createModalOverlay)();
      this._modalOverlayOpening = (0, _modal.getModalMaskOpening)(this._modalOverlayElem); // don't show yet -- each step will control that

      this.hide();
      document.body.appendChild(this._modalOverlayElem);
    }

    this.options = options;
    return this;
  }
  /**
   * Removes svg mask from modal overlay and removes classes for modal being visible
   */


  _createClass(Modal, [{
    key: "cleanup",
    value: function cleanup() {
      var _this = this;

      (0, _defer3.default)(function () {
        var element = _this._modalOverlayElem;

        if (element && element instanceof SVGElement) {
          element.parentNode.removeChild(element);
        }

        _this._modalOverlayElem = null;
        document.body.classList.remove(_modal.classNames.isVisible);
      });
    }
    /**
     * Hide the modal overlay
     */

  }, {
    key: "hide",
    value: function hide() {
      document.body.classList.remove(_modal.classNames.isVisible);

      if (this._modalOverlayElem) {
        this._modalOverlayElem.style.display = 'none';
      }
    }
    /**
     * If modal is enabled, setup the svg mask opening and modal overlay for the step
     * @param step
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
      document.body.classList.add(_modal.classNames.isVisible);

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
      var targetElement = (0, _dom.getElementForStep)(step);

      if (targetElement) {
        (0, _modal.positionModalOpening)(targetElement, modalOverlayOpening);
        this._onScreenChange = (0, _debounce3.default)(_modal.positionModalOpening.bind(this, targetElement, modalOverlayOpening), 0, {
          leading: false,
          trailing: true // see https://lodash.com/docs/#debounce

        });

        _dom.addStepEventListeners.call(this);
      } else {
        (0, _modal.closeModalOpening)(this._modalOverlayOpening);
      }
    }
  }]);

  return Modal;
}();

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var baseDelay = __webpack_require__(51),
    baseRest = __webpack_require__(52);

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

module.exports = defer;


/***/ }),
/* 51 */
/***/ (function(module, exports) {

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

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
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  return setTimeout(function() { func.apply(undefined, args); }, wait);
}

module.exports = baseDelay;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(53),
    overRest = __webpack_require__(54),
    setToString = __webpack_require__(56);

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

module.exports = baseRest;


/***/ }),
/* 53 */
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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(55);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

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
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
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

module.exports = overRest;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

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

module.exports = apply;


/***/ }),
/* 56 */
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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(11),
    now = __webpack_require__(58),
    toNumber = __webpack_require__(61);

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
function debounce(func, wait, options) {
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

module.exports = debounce;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(59);

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

module.exports = now;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(60);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(17)))

/***/ }),
/* 61 */
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
/* 62 */
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

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanupSteps = cleanupSteps;
exports.cleanupStepEventListeners = cleanupStepEventListeners;

var _modal = __webpack_require__(4);

var _dom = __webpack_require__(8);

/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
function cleanupSteps(tour) {
  if (tour) {
    var steps = tour.steps;
    steps.forEach(function (step) {
      if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
        var stepElement = (0, _dom.getElementForStep)(step);

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
    window.removeEventListener('touchmove', _modal.preventModalBodyTouch, false);
    this._onScreenChange = null;
  }
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=shepherd.js.map