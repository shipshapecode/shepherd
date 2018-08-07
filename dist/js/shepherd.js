/*!
 * /*! shepherd.js 2.0.0-beta.15 * /
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("popper.js/dist/umd/popper"));
	else if(typeof define === 'function' && define.amd)
		define(["popper.js/dist/umd/popper"], factory);
	else if(typeof exports === 'object')
		exports["Shepherd"] = factory(require("popper.js/dist/umd/popper"));
	else
		root["Shepherd"] = factory(root["Popper"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _popper = __webpack_require__(1);

var _popper2 = _interopRequireDefault(_popper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uniqueId = function () {
  var id = 0;
  return function () {
    return ++id;
  };
}();

/**
 * @param obj
 * @returns {boolean}
 */
function isUndefined(obj) {
  return typeof obj === 'undefined';
}

/**
 * @param obj
 * @returns {*|boolean}
 */
function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && Array.isArray(obj) === false;
}

/**
 * @param obj
 * @returns {boolean}
 */
function isObjectLoose(obj) {
  return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

/**
 * TODO rewrite the way items are being added to use more performant documentFragment code
 * @param html
 * @returns {HTMLElement}
 */
function createFromHTML(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

function matchesSelector(el, sel) {
  var matches = void 0;
  if (!isUndefined(el.matches)) {
    matches = el.matches;
  } else if (!isUndefined(el.matchesSelector)) {
    matches = el.matchesSelector;
  } else if (!isUndefined(el.msMatchesSelector)) {
    matches = el.msMatchesSelector;
  } else if (!isUndefined(el.webkitMatchesSelector)) {
    matches = el.webkitMatchesSelector;
  } else if (!isUndefined(el.mozMatchesSelector)) {
    matches = el.mozMatchesSelector;
  } else if (!isUndefined(el.oMatchesSelector)) {
    matches = el.oMatchesSelector;
  }
  return matches.call(el, sel);
}

var positionRe = /^(.+) (top|left|right|bottom|center)$/;

/**
 * @param str
 * @returns {*}
 */
function parsePosition(str) {
  if (isObjectLoose(str)) {
    if (str.hasOwnProperty('element') && str.hasOwnProperty('on')) {
      return str;
    }
    return null;
  }

  var matches = positionRe.exec(str);
  if (!matches) {
    return null;
  }

  var on = matches[2]; // eslint-disable-line
  if (on[0] === '[') {
    on = on.substring(1, on.length - 1);
  }

  return {
    'element': matches[1],
    on: on
  };
}

/**
 * @param obj
 * @param {Array} props
 * @returns {*}
 */
function parseShorthand(obj, props) {
  if (obj === null || isUndefined(obj)) {
    return obj;
  } else if (isObjectLoose(obj)) {
    return obj;
  }

  var vals = obj.split(' ');
  var out = {};
  var j = props.length - 1;
  for (var i = vals.length - 1; i >= 0; i--) {
    if (j === 0) {
      out[props[j]] = vals.slice(0, i + 1).join(' ');
      break;
    } else {
      out[props[j]] = vals[i];
    }

    j--;
  }

  return out;
}

var Evented = function () {
  function Evented() /* options = {}*/{
    // TODO: do we need this empty constructor?

    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: 'on',
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }
      if (typeof this.bindings[event] === 'undefined') {
        this.bindings[event] = [];
      }
      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
    }
  }, {
    key: 'once',
    value: function once(event, handler, ctx) {
      this.on(event, handler, ctx, true);
    }
  }, {
    key: 'off',
    value: function off(event, handler) {
      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
        return;
      }

      if (typeof handler === 'undefined') {
        delete this.bindings[event];
      } else {
        var i = 0;
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }, {
    key: 'trigger',
    value: function trigger(event) {
      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
        var _len = arguments.length;
        var args = Array(_len > 1 ? _len - 1 : 0);
        var i = 0;

        for (var _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        while (i < this.bindings[event].length) {
          var _bindings$event$i = this.bindings[event][i];
          var ctx = _bindings$event$i.ctx,
              handler = _bindings$event$i.handler,
              once = _bindings$event$i.once;


          var context = ctx;
          if (typeof context === 'undefined') {
            context = this;
          }

          handler.apply(context, args);

          if (once) {
            this.bindings[event].splice(i, 1);
          } else {
            ++i;
          }
        }
      }
    }
  }]);

  return Evented;
}();

var Step = function (_Evented) {
  _inherits(Step, _Evented);

  function Step(tour, options) {
    var _ret;

    _classCallCheck(this, Step);

    var _this = _possibleConstructorReturn(this, (Step.__proto__ || Object.getPrototypeOf(Step)).call(this, tour, options));

    _this.tour = tour;
    _this.bindMethods();
    _this.setOptions(options);
    return _ret = _this, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Step, [{
    key: 'bindMethods',
    value: function bindMethods() {
      var _this2 = this;

      var methods = ['_show', 'show', 'hide', 'isOpen', 'cancel', 'complete', 'scrollTo', 'destroy', 'render'];
      methods.map(function (method) {
        _this2[method] = _this2[method].bind(_this2);
      });
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.options = options;
      this.destroy();

      this.id = this.options.id || this.id || 'step-' + uniqueId();

      var when = this.options.when;

      if (when) {
        for (var event in when) {
          if ({}.hasOwnProperty.call(when, event)) {
            var handler = when[event];
            this.on(event, handler, this);
          }
        }
      }

      // Button configuration

      var buttonsJson = JSON.stringify(this.options.buttons);
      var buttonsAreDefault = isUndefined(buttonsJson) || buttonsJson === 'true';

      var buttonsAreEmpty = buttonsJson === '{}' || buttonsJson === '[]' || buttonsJson === 'null' || buttonsJson === 'false';

      var buttonsAreArray = !buttonsAreDefault && Array.isArray(this.options.buttons);

      var buttonsAreObject = !buttonsAreDefault && isObject(this.options.buttons);

      // Show default button if undefined or 'true'
      if (buttonsAreDefault) {
        this.options.buttons = [{
          text: 'Next',
          action: this.tour.next,
          classes: 'btn'
        }];

        // Can pass in an object which will assume asingle button
      } else if (!buttonsAreEmpty && buttonsAreObject) {
        this.options.buttons = [this.options.buttons];

        // Falsey/empty values or non-object values prevent buttons from rendering
      } else if (buttonsAreEmpty || !buttonsAreArray) {
        this.options.buttons = false;
      }
    }
  }, {
    key: 'getTour',
    value: function getTour() {
      return this.tour;
    }
  }, {
    key: 'bindAdvance',
    value: function bindAdvance() {
      var _this3 = this;

      // An empty selector matches the step element
      var _parseShorthand = parseShorthand(this.options.advanceOn, ['selector', 'event']),
          event = _parseShorthand.event,
          selector = _parseShorthand.selector;

      var handler = function handler(e) {
        if (!_this3.isOpen()) {
          return;
        }

        if (!isUndefined(selector)) {
          if (matchesSelector(e.target, selector)) {
            _this3.tour.next();
          }
        } else {
          if (_this3.el && e.target === _this3.el) {
            _this3.tour.next();
          }
        }
      };

      // TODO: this should also bind/unbind on show/hide
      document.body.addEventListener(event, handler);
      this.on('destroy', function () {
        return document.body.removeEventListener(event, handler);
      });
    }
  }, {
    key: 'getAttachTo',
    value: function getAttachTo() {
      var opts = parsePosition(this.options.attachTo) || {};
      var returnOpts = Object.assign({}, opts);

      if (typeof opts.element === 'string') {
        // Can't override the element in user opts reference because we can't
        // guarantee that the element will exist in the future.
        try {
          returnOpts.element = document.querySelector(opts.element);
        } catch (e) {
          // TODO
        }
        if (!returnOpts.element) {
          console.error('The element for this Shepherd step was not found ' + opts.element);
        }
      }

      return returnOpts;
    }
  }, {
    key: 'setupPopper',
    value: function setupPopper() {
      if (isUndefined(_popper2.default)) {
        throw new Error('Using the attachment feature of Shepherd requires the Popper.js library');
      }

      var opts = this.getAttachTo();
      opts.modifiers = opts.modifiers || {};
      var attachment = opts.on || 'right';
      opts.positionFixed = false;

      if (isUndefined(opts.element)) {
        opts.element = document.body;
        attachment = 'top';

        opts.modifiers = Object.assign({
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
        }, opts.modifiers);

        opts.positionFixed = true;
      }

      var popperOpts = Object.assign({}, {
        // constraints: [{ // Pretty much handled by popper
        //     to: 'window',
        //     pin: true,
        //     attachment: 'together' // Might be interested in https://popper.js.org/popper-documentation.html#modifiers..keepTogether
        // }],
        placement: attachment,
        arrowElement: this.el.querySelector('.popper__arrow'),
        modifiers: opts.modifiers,
        positionFixed: opts.positionFixed
      }, this.options.popperOptions);

      if (this.popper) {
        this.popper.destroy();
      }

      this.el.classList.add('shepherd-element');
      this.popper = new _popper2.default(opts.element, this.el, popperOpts);

      this.target = opts.element;
      this.target.classList.add('shepherd-enabled', 'shepherd-target');
    }
  }, {
    key: 'show',
    value: function show() {
      var _this4 = this;

      if (!isUndefined(this.options.beforeShowPromise)) {
        var beforeShowPromise = this.options.beforeShowPromise();
        if (!isUndefined(beforeShowPromise)) {
          return beforeShowPromise.then(function () {
            return _this4._show();
          });
        }
      }
      this._show();
    }
  }, {
    key: '_show',
    value: function _show() {
      var _this5 = this;

      this.trigger('before-show');

      if (!this.el) {
        this.render();
      }

      this.el.hidden = false;
      // We need to manually set styles for < IE11 support
      this.el.style.display = 'block';

      document.body.setAttribute('data-shepherd-step', this.id);

      this.setupPopper();

      if (this.options.scrollTo) {
        setTimeout(function () {
          _this5.scrollTo();
        });
      }

      this.trigger('show');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.trigger('before-hide');

      if (this.el) {
        this.el.hidden = true;
        // We need to manually set styles for < IE11 support
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
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.el && !this.el.hidden;
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.tour.cancel();
      this.trigger('cancel');
    }
  }, {
    key: 'complete',
    value: function complete() {
      this.tour.complete();
      this.trigger('complete');
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo() {
      var _getAttachTo = this.getAttachTo(),
          element = _getAttachTo.element;

      if (!isUndefined(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if (!isUndefined(element)) {
        element.scrollIntoView();
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (!isUndefined(this.el) && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
        delete this.el;
      }

      if (this.popper) {
        this.popper.destroy();
      }
      this.popper = null;

      this.trigger('destroy');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      if (!isUndefined(this.el)) {
        this.destroy();
      }

      this.el = createFromHTML('<div class=\'' + (this.options.classes || '') + '\' data-id=\'' + this.id + '\' ' + (this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : '') + '>');

      if (this.options.attachTo) {
        this.el.appendChild(createFromHTML('<div class="popper__arrow" x-arrow></div>'));
      }

      var content = document.createElement('div');
      content.classList.add('shepherd-content');
      this.el.appendChild(content);

      var header = document.createElement('header');
      content.appendChild(header);

      if (this.options.title) {
        header.innerHTML += '<h3 class=\'shepherd-title\'>' + this.options.title + '</h3>';
        this.el.classList.add('shepherd-has-title');
      }

      if (this.options.showCancelLink) {
        var link = createFromHTML('<a href class="shepherd-cancel-link"></a>');
        header.appendChild(link);

        this.el.classList.add('shepherd-has-cancel-link');

        this.bindCancelLink(link);
      }

      if (!isUndefined(this.options.text)) {
        var text = createFromHTML('<div class=\'shepherd-text\'></div>');
        var paragraphs = this.options.text;

        if (typeof paragraphs === 'function') {
          paragraphs = paragraphs.call(this, text);
        }

        if (paragraphs instanceof HTMLElement) {
          text.appendChild(paragraphs);
        } else {
          if (typeof paragraphs === 'string') {
            paragraphs = [paragraphs];
          }

          paragraphs.map(function (paragraph) {
            text.innerHTML += '<p>' + paragraph + '</p>';
          });
        }

        content.appendChild(text);
      }

      if (this.options.buttons) {
        var footer = document.createElement('footer');
        var buttons = createFromHTML('<ul class=\'shepherd-buttons\'></ul>');

        this.options.buttons.map(function (cfg) {
          var button = createFromHTML('<li><a class=\'shepherd-button ' + (cfg.classes || '') + '\'>' + cfg.text + '</a>');
          buttons.appendChild(button);
          _this6.bindButtonEvents(cfg, button.querySelector('a'));
        });

        footer.appendChild(buttons);
        content.appendChild(footer);
      }

      var renderLocation = this.options.renderLocation;


      if (renderLocation) {
        if (renderLocation instanceof HTMLElement) {
          renderLocation.appendChild(this.el);
        } else if (typeof renderLocation === 'string') {
          document.querySelector(renderLocation).appendChild(this.el);
        }
      } else {
        document.body.appendChild(this.el);
      }

      this.setupPopper();

      if (this.options.advanceOn) {
        this.bindAdvance();
      }
    }
  }, {
    key: 'bindCancelLink',
    value: function bindCancelLink(link) {
      var _this7 = this;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        _this7.cancel();
      });
    }
  }, {
    key: 'bindButtonEvents',
    value: function bindButtonEvents(cfg, el) {
      var _this8 = this;

      cfg.events = cfg.events || {};
      if (!isUndefined(cfg.action)) {
        // Including both a click event and an action is not supported
        cfg.events.click = cfg.action;
      }

      for (var event in cfg.events) {
        if ({}.hasOwnProperty.call(cfg.events, event)) {
          var handler = cfg.events[event];
          if (typeof handler === 'string') {
            (function () {
              var page = handler;
              handler = function handler() {
                return _this8.tour.show(page);
              };
            })();
          }
          el.addEventListener(event, handler);
        }
      }

      this.on('destroy', function () {
        for (var _event in cfg.events) {
          if ({}.hasOwnProperty.call(cfg.events, _event)) {
            var _handler = cfg.events[_event];
            el.removeEventListener(_event, _handler);
          }
        }
      });
    }
  }]);

  return Step;
}(Evented);

var Tour = function (_Evented2) {
  _inherits(Tour, _Evented2);

  function Tour() {
    var _ret3;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tour);

    var _this9 = _possibleConstructorReturn(this, (Tour.__proto__ || Object.getPrototypeOf(Tour)).call(this, options));

    _this9.bindMethods();
    _this9.options = options;
    _this9.steps = _this9.options.steps || [];

    // Pass these events onto the global Shepherd object
    var events = ['complete', 'cancel', 'start', 'show', 'active', 'inactive'];
    events.map(function (event) {
      (function (e) {
        _this9.on(e, function (opts) {
          opts = opts || {};
          opts.tour = _this9;
          Shepherd.trigger(e, opts);
        });
      })(event);
    });

    return _ret3 = _this9, _possibleConstructorReturn(_this9, _ret3);
  }

  _createClass(Tour, [{
    key: 'bindMethods',
    value: function bindMethods() {
      var _this10 = this;

      var methods = ['next', 'back', 'cancel', 'complete'];
      methods.map(function (method) {
        _this10[method] = _this10[method].bind(_this10);
      });
    }
  }, {
    key: 'addStep',
    value: function addStep(name, step) {
      if (isUndefined(step)) {
        step = name;
      }

      if (!(step instanceof Step)) {
        if (typeof name === 'string' || typeof name === 'number') {
          step.id = name.toString();
        }
        step = Object.assign({}, this.options.defaults, step);
        step = new Step(this, step);
      } else {
        step.tour = this;
      }

      this.steps.push(step);
      return step;
    }
  }, {
    key: 'removeStep',
    value: function removeStep(name) {
      var current = this.getCurrentStep();

      for (var i = 0; i < this.steps.length; ++i) {
        var step = this.steps[i];
        if (step.id === name) {
          if (step.isOpen()) {
            step.hide();
          }
          step.destroy();
          this.steps.splice(i, 1);
          break;
        }
      }

      if (current && current.id === name) {
        this.currentStep = undefined;

        if (this.steps.length) {
          this.show(0);
        } else {
          this.cancel();
        }
      }
    }
  }, {
    key: 'getById',
    value: function getById(id) {
      for (var i = 0; i < this.steps.length; ++i) {
        var step = this.steps[i];
        if (step.id === id) {
          return step;
        }
      }
    }
  }, {
    key: 'getCurrentStep',
    value: function getCurrentStep() {
      return this.currentStep;
    }
  }, {
    key: 'next',
    value: function next() {
      var index = this.steps.indexOf(this.currentStep);

      if (index === this.steps.length - 1) {
        this.complete();
      } else {
        this.show(index + 1, true);
      }
    }
  }, {
    key: 'back',
    value: function back() {
      var index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }

    /**
     * Calls done() triggering the 'cancel' event
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      this.done('cancel');
    }

    /**
     * Calls done() triggering the 'complete' event
     */

  }, {
    key: 'complete',
    value: function complete() {
      this.done('complete');
    }

    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param event
     */

  }, {
    key: 'done',
    value: function done(event) {
      if (this.currentStep) {
        this.currentStep.hide();
      }

      this.trigger(event);

      Shepherd.activeTour.steps.forEach(function (step) {
        step.destroy();
      });
      Shepherd.activeTour = null;
      document.body.classList.remove('shepherd-active');
      this.trigger('inactive', { tour: this });
    }
  }, {
    key: 'show',
    value: function show() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.currentStep) {
        this.currentStep.hide();
      } else {
        document.body.classList.add('shepherd-active');
        this.trigger('active', { tour: this });
      }

      Shepherd.activeTour = this;

      var next = void 0;

      if (typeof key === 'string') {
        next = this.getById(key);
      } else {
        next = this.steps[key];
      }

      if (next) {
        if (!isUndefined(next.options.showOn) && !next.options.showOn()) {
          var index = this.steps.indexOf(next);
          var nextIndex = forward ? index + 1 : index - 1;
          this.show(nextIndex, forward);
        } else {
          this.trigger('show', {
            step: next,
            previous: this.currentStep
          });

          this.currentStep = next;
          next.show();
        }
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.trigger('start');

      this.currentStep = null;
      this.next();
    }
  }]);

  return Tour;
}(Evented);

var Shepherd = new Evented();
Object.assign(Shepherd, { Tour: Tour, Step: Step, Evented: Evented });

exports.default = Shepherd;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=shepherd.js.map