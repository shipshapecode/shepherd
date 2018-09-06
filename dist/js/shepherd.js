/*!
 * /*! shepherd.js 2.0.0-beta.25 * /
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("popper.js"));
	else if(typeof define === 'function' && define.amd)
		define(["popper.js"], factory);
	else if(typeof exports === 'object')
		exports["Shepherd"] = factory(require("popper.js"));
	else
		root["Shepherd"] = factory(root["Popper"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__42__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Evented = undefined;

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _drop2 = __webpack_require__(14);

var _drop3 = _interopRequireDefault(_drop2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Evented {
  on(event, handler, ctx) {
    const once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

    if ((0, _isUndefined3.default)(this.bindings)) {
      this.bindings = {};
    }

    if ((0, _isUndefined3.default)(this.bindings[event])) {
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
    if ((0, _isUndefined3.default)(this.bindings) || (0, _isUndefined3.default)(this.bindings[event])) {
      return false;
    }

    if ((0, _isUndefined3.default)(handler)) {
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
    if (!(0, _isUndefined3.default)(this.bindings) && this.bindings[event]) {
      const args = (0, _drop3.default)(arguments);
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

exports.Evented = Evented;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2),
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
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2),
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Step = undefined;

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(4);

var _isString3 = _interopRequireDefault(_isString2);

var _isPlainObject2 = __webpack_require__(9);

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isFunction2 = __webpack_require__(6);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isEmpty2 = __webpack_require__(19);

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isElement2 = __webpack_require__(28);

var _isElement3 = _interopRequireDefault(_isElement2);

var _forOwn2 = __webpack_require__(10);

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _evented = __webpack_require__(3);

__webpack_require__(34);

var _bind = __webpack_require__(11);

var _utils = __webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


class Step extends _evented.Evented {
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
   * @param {Object[]} options.buttons An array of buttons to add to the step. By default
   * we add a Next button which triggers `next()`, set this to `false` to disable.
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
   * @param {string} options.classes Extra classes to add to the step. `shepherd-theme-arrows` will give you our theme.
   * @param {Object} options.popperOptions Extra options to pass to popper.js
   * @param {HTMLElement|string} options.renderLocation An `HTMLElement` or selector string of the element you want the
   * tour step to render in. Most of the time, you will not need to pass anything, and it will default to `document.body`,
   * but this is needed for `<dialog>` and might as well support passing anything.
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

    _bind.bindMethods.call(this, ['_show', 'cancel', 'complete', 'destroy', 'hide', 'isOpen', 'render', 'scrollTo', 'show']);

    this.setOptions(options);
    this.bindAdvance = _bind.bindAdvance.bind(this);
    this.bindButtonEvents = _bind.bindButtonEvents.bind(this);
    this.bindCancelLink = _bind.bindCancelLink.bind(this);
    this.setupPopper = _utils.setupPopper.bind(this);
    return this;
  }
  /**
   * Adds buttons to the step as passed into options
   *
   * @private
   * @param {HTMLElement} content The element for the step, to append the footer with buttons to
   */


  _addButtons(content) {
    if (this.options.buttons) {
      const footer = document.createElement('footer');
      const buttons = (0, _utils.createFromHTML)('<ul class="shepherd-buttons"></ul>');
      footer.classList.add('shepherd-footer');
      this.options.buttons.map(cfg => {
        const button = (0, _utils.createFromHTML)(`<li><a class="shepherd-button ${cfg.classes || ''}">${cfg.text}</a>`);
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
      const link = (0, _utils.createFromHTML)('<a href class="shepherd-cancel-link"></a>');
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
    const text = (0, _utils.createFromHTML)('<div class="shepherd-text"></div>');
    let paragraphs = this.options.text;

    if ((0, _isFunction3.default)(paragraphs)) {
      paragraphs = paragraphs.call(this, text);
    }

    if (paragraphs instanceof HTMLElement) {
      text.appendChild(paragraphs);
    } else {
      if ((0, _isString3.default)(paragraphs)) {
        paragraphs = [paragraphs];
      }

      paragraphs.map(paragraph => {
        text.innerHTML += `<p>${paragraph}</p>`;
      });
    }

    content.appendChild(text);
  }
  /**
   * Attaches final element to default or passed location
   *
   * @private
   * @param {HTMLElement} element The element to attach
   */


  _attach(element) {
    const renderLocation = this.options.renderLocation;

    if (renderLocation) {
      if (renderLocation instanceof HTMLElement) {
        return renderLocation.appendChild(element);
      }

      if ((0, _isString3.default)(renderLocation)) {
        return document.querySelector(renderLocation).appendChild(element);
      }
    }

    return document.body.appendChild(element);
  }
  /**
   * Creates Shepherd element for step based on options
   *
   * @private
   * @return {HTMLElement} The DOM element for the step
   */


  _createElement() {
    const content = document.createElement('div');
    const classes = this.options.classes || '';
    const element = (0, _utils.createFromHTML)(`<div class='${classes}' data-id='${this.id}' id="${this.options.idAttribute}"}>`);
    const header = document.createElement('header');

    if (this.options.title) {
      const title = document.createElement('h3');
      title.classList.add('shepherd-title');
      title.innerHTML = `${this.options.title}`;
      header.prepend(title);
      element.classList.add('shepherd-has-title');
    }

    content.classList.add('shepherd-content');
    header.classList.add('shepherd-header');
    element.appendChild(content);
    content.appendChild(header);

    if (this.options.attachTo) {
      element.appendChild((0, _utils.createFromHTML)('<div class="popper__arrow" x-arrow></div>'));
    }

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


  getTour() {
    return this.tour;
  }
  /**
   * Passes `options.attachTo` to `parsePosition` to get the correct `attachTo` format
   * @returns {({} & {element, on}) | ({})}
   */


  getAttachTo() {
    const opts = (0, _utils.parsePosition)(this.options.attachTo) || {};
    const returnOpts = Object.assign({}, opts);

    if ((0, _isString3.default)(opts.element)) {
      // Can't override the element in user opts reference because we can't
      // guarantee that the element will exist in the future.
      try {
        returnOpts.element = document.querySelector(opts.element);
      } catch (e) {// TODO
      }

      if (!returnOpts.element) {
        console.error(`The element for this Shepherd step was not found ${opts.element}`);
      }
    }

    return returnOpts;
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
   * Remove the step, delete the step's element, and destroy the popper for the step
   * Triggers `destroy` event
   */


  destroy() {
    if ((0, _isElement3.default)(this.el) && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      delete this.el;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = null;
    this.trigger('destroy');
  }
  /**
   * Hide the step and destroy the popper
   */


  hide() {
    this.trigger('before-hide');

    if (this.el) {
      this.el.hidden = true; // We need to manually set styles for < IE11 support

      this.el.style.display = 'none';
    }

    document.body.removeAttribute('data-shepherd-step');

    if (this.target) {
      this.target.classList.remove('shepherd-enabled', 'shepherd-target');
    }

    if (this.popper) {
      this.popper.destroy();
    }

    this.popper = null;
    this.trigger('hide');
  }
  /**
   * Check if the step is open and visible
   * @return {*|boolean} True if the step is open and visible
   */


  isOpen() {
    return this.el && !this.el.hidden;
  }
  /**
   * Create the element and set up the popper instance
   */


  render() {
    if (!(0, _isUndefined3.default)(this.el)) {
      this.destroy();
    }

    this.el = this._createElement();

    if (this.options.advanceOn) {
      this.bindAdvance();
    }

    this._attach(this.el);

    this.setupPopper();
  }
  /**
   * If a custom scrollToHandler is defined, call that, otherwise do the generic
   * scrollIntoView call.
   */


  scrollTo() {
    const _this$getAttachTo = this.getAttachTo(),
          element = _this$getAttachTo.element;

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


  setOptions(options = {}) {
    this.options = options;
    const when = this.options.when;
    this.destroy();
    this.id = this.options.id || `step-${uniqueId()}`;
    (0, _forOwn3.default)(when, (handler, event) => {
      this.on(event, handler, this);
    });

    this._setUpButtons();
  }
  /**
   * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
   * @return {*|Promise}
   */


  show() {
    if ((0, _isFunction3.default)(this.options.beforeShowPromise)) {
      const beforeShowPromise = this.options.beforeShowPromise();

      if (!(0, _isUndefined3.default)(beforeShowPromise)) {
        return beforeShowPromise.then(() => this._show());
      }
    }

    this._show();
  }
  /**
   * Determines button options prior to rendering
   *
   * @private
   */


  _setUpButtons() {
    const buttons = this.options.buttons;

    if (buttons) {
      const buttonsAreDefault = (0, _isUndefined3.default)(buttons) || (0, _isEmpty3.default)(buttons);

      if (buttonsAreDefault) {
        this.options.buttons = [{
          text: 'Next',
          action: this.tour.next,
          classes: 'btn'
        }];
      } else {
        const buttonsAreObject = (0, _isPlainObject3.default)(buttons); // Can pass in an object which will assume a single button

        if (buttonsAreObject) {
          this.options.buttons = [this.options.buttons];
        }
      }
    }
  }
  /**
   * Triggers `before-show` then renders the element, shows it, sets up popper and triggers `show`
   * @private
   */


  _show() {
    this.trigger('before-show');

    if (!this.el) {
      this.render();
    }

    this.el.hidden = false; // We need to manually set styles for < IE11 support

    this.el.style.display = 'block';
    document.body.setAttribute('data-shepherd-step', this.id);
    this.setupPopper();

    if (this.options.scrollTo) {
      setTimeout(() => {
        this.scrollTo();
      });
    }

    this.trigger('show');
  }

}

exports.Step = Step;

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

var baseGetTag = __webpack_require__(2),
    getPrototype = __webpack_require__(17),
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var baseForOwn = __webpack_require__(29),
    castFunction = __webpack_require__(33);

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

var _isString2 = __webpack_require__(4);

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
  return e => {
    if (this.isOpen()) {
      const targetIsEl = this.el && e.target === this.el;
      const targetIsSelector = !(0, _isUndefined3.default)(selector) && e.target.matches(selector);

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
  const _parseShorthand = (0, _utils.parseShorthand)(this.options.advanceOn, ['selector', 'event']),
        event = _parseShorthand.event,
        selector = _parseShorthand.selector;

  const handler = _setupAdvanceOnHandler.call(this, selector); // TODO: this should also bind/unbind on show/hide


  const el = document.querySelector(selector);

  if (!(0, _isUndefined3.default)(selector) && el) {
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

  if (!(0, _isUndefined3.default)(cfg.action)) {
    // Including both a click event and an action is not supported
    cfg.events.click = cfg.action;
  }

  (0, _forOwn3.default)(cfg.events, (handler, event) => {
    if ((0, _isString3.default)(handler)) {
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zipObject2 = __webpack_require__(35);

var _zipObject3 = _interopRequireDefault(_zipObject2);

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isObjectLike2 = __webpack_require__(1);

var _isObjectLike3 = _interopRequireDefault(_isObjectLike2);

exports.createFromHTML = createFromHTML;
exports.parsePosition = parsePosition;
exports.parseShorthand = parseShorthand;
exports.setupPopper = setupPopper;

var _popper = __webpack_require__(42);

var _popper2 = _interopRequireDefault(_popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
 */


function parsePosition(position) {
  if ((0, _isObjectLike3.default)(position)) {
    if (position.hasOwnProperty('element') && position.hasOwnProperty('on')) {
      return position;
    }

    return null;
  }

  const positionRe = /^(.+) (top|left|right|bottom|center)$/;
  const matches = positionRe.exec(position);

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

  const values = obj.split(' ');
  return (0, _zipObject3.default)(props, values);
}
/**
 * Determines options for Popper and initializes the Popper instance
 */


function setupPopper() {
  if ((0, _isUndefined3.default)(_popper2.default)) {
    throw new Error('Using the attachment feature of Shepherd requires the Popper.js library');
  }

  const opts = this.getAttachTo();
  opts.modifiers = opts.modifiers || {};
  let attachment = opts.on || 'right';
  opts.positionFixed = false;

  if ((0, _isUndefined3.default)(opts.element)) {
    attachment = 'top';

    _setupCenteredPopper(opts);
  }

  if (this.popper) {
    this.popper.destroy();
  }

  this.el.classList.add('shepherd-element');

  const popperOpts = _mergePopperOptions.call(this, attachment, opts);

  this.popper = new _popper2.default(opts.element, this.el, popperOpts);
  this.target = opts.element;
  this.target.classList.add('shepherd-enabled', 'shepherd-target');
}
/**
 * Merge the global popperOptions, and the local opts
 * @param {String} attachment The direction for attachment
 * @param {Object} opts The local options
 * @return {Object} The merged popperOpts object
 * @private
 */


function _mergePopperOptions(attachment, opts) {
  return Object.assign({}, {
    placement: attachment,
    arrowElement: this.el.querySelector('.popper__arrow'),
    modifiers: opts.modifiers,
    positionFixed: opts.positionFixed
  }, this.options.popperOptions);
}
/**
 * Sets up a popper centered on the screen, when there is no attachTo element
 * @param {Object} opts The config object
 * @return {*}
 * @private
 */


function _setupCenteredPopper(opts) {
  opts.element = document.body;
  opts.modifiers = Object.assign({
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
  }, opts.modifiers);
  opts.positionFixed = true;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _evented = __webpack_require__(3);

var _step = __webpack_require__(7);

var _tour = __webpack_require__(43);

Object.assign(_tour.Shepherd, {
  Tour: _tour.Tour,
  Step: _step.Step,
  Evented: _evented.Evented
});
exports.default = _tour.Shepherd;
module.exports = exports["default"];

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var baseSlice = __webpack_require__(15),
    toInteger = __webpack_require__(16);

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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(5);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


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

var baseKeys = __webpack_require__(20),
    getTag = __webpack_require__(21),
    isArguments = __webpack_require__(22),
    isArray = __webpack_require__(8),
    isArrayLike = __webpack_require__(23),
    isBuffer = __webpack_require__(25),
    isPrototype = __webpack_require__(26),
    isTypedArray = __webpack_require__(27);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(5);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 21 */
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
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(6),
    isLength = __webpack_require__(24);

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
/* 24 */
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
/***/ (function(module, exports, __webpack_require__) {

var isObjectLike = __webpack_require__(1),
    isPlainObject = __webpack_require__(9);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__(30),
    keys = __webpack_require__(32);

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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(31);

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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(5);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 33 */
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
/* 34 */
/***/ (function(module, exports) {

if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(36),
    baseZipObject = __webpack_require__(41);

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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(37),
    eq = __webpack_require__(40);

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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(38);

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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(39);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 39 */
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
/* 40 */
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
/* 41 */
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
/* 42 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__42__;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Shepherd = exports.Tour = undefined;

var _isUndefined2 = __webpack_require__(0);

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _isString2 = __webpack_require__(4);

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = __webpack_require__(44);

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isFunction2 = __webpack_require__(6);

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _evented = __webpack_require__(3);

var _step = __webpack_require__(7);

var _bind = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Shepherd = new _evented.Evented();
/**
 * Class representing the site tour
 * @extends {Evented}
 */

class Tour extends _evented.Evented {
  /**
   *
   * @param {Object} options The options for the tour
   * @param {Object} options.defaults Default options for Steps created through `addStep`
   * @param {Step[]} options.steps An array of Step instances to initialize the tour with
   * @returns {Tour}
   */
  constructor(options = {}) {
    super(options);

    _bind.bindMethods.call(this, ['back', 'cancel', 'complete', 'next']);

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
    if (this.currentStep) {
      this.currentStep.hide();
    }

    this.trigger(event);

    if (Shepherd.activeTour) {
      Shepherd.activeTour.steps.forEach(step => {
        step.destroy();
      });
    }

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
    if ((0, _isString3.default)(name) || (0, _isNumber3.default)(name)) {
      stepOptions.id = name.toString();
    }

    stepOptions = Object.assign({}, this.options.defaults, stepOptions);
    return new _step.Step(this, stepOptions);
  }
  /**
   * Show a specific step in the tour
   * @param {Number|String} key The key to look up the step by
   * @param {Boolean} forward True if we are going forward, false if backward
   */


  show(key = 0, forward = true) {
    this._setupActiveTour();

    const step = (0, _isString3.default)(key) ? this.getById(key) : this.steps[key];

    if (!step) {
      return;
    }

    const shouldSkipStep = (0, _isFunction3.default)(step.options.showOn) && !step.options.showOn(); // If `showOn` returns false, we want to skip the step, otherwise, show the step like normal

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
  /**
   * Start the tour
   */


  start() {
    this.trigger('start');
    this.currentStep = null;
    this.next();
  }
  /**
   * If we have a currentStep, the tour is active, so just hide the step and remain active.
   * Otherwise, make the tour active.
   * @private
   */


  _setupActiveTour() {
    if (this.currentStep) {
      this.currentStep.hide();
    } else {
      document.body.classList.add('shepherd-active');
      this.trigger('active', {
        tour: this
      });
    }

    Shepherd.activeTour = this;
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

}

exports.Tour = Tour;
exports.Shepherd = Shepherd;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(2),
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=shepherd.js.map