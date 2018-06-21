/*! tether-shepherd 1.8.1 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["popper"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('popper'));
  } else {
    root.Shepherd = factory(root.Popper);
  }
}(this, function(Popper) {

"use strict";

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* global Popper */
var uniqueId = function () {
  var id = 0;
  return function () {
    return ++id;
  };
}();
/**
 * @param {*} target
 * @param {object} varArgs
 * @returns {*}
 */


function assign(target, varArgs) {
  // .length of function is 2
  'use strict';

  if (target == null) {
    // TypeError if undefined or null
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var to = Object(target);

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index];

    if (nextSource != null) {
      // Skip over if undefined or null
      for (var nextKey in nextSource) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
  }

  return to;
}
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


function isArray(obj) {
  return obj && obj.constructor === Array;
}
/**
 * @param obj
 * @returns {*|boolean}
 */


function isObject(obj) {
  return obj && obj.constructor === Object;
}
/**
 * @param obj
 * @returns {boolean}
 */


function isObjectLoose(obj) {
  return _typeof(obj) === 'object';
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
  var matches;

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

  var on = matches[2];

  if (on[0] === '[') {
    on = on.substring(1, on.length - 1);
  }

  return {
    'element': matches[1],
    'on': on
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

var Evented =
/*#__PURE__*/
function () {
  function Evented() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Evented);
  }

  _createClass(Evented, [{
    key: "on",
    value: function on(event, handler, ctx) {
      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

      if (typeof this.bindings === 'undefined') {
        this.bindings = {};
      }

      if (typeof this.bindings[event] === 'undefined') {
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
    key: "trigger",
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
          var handler = _bindings$event$i.handler;
          var ctx = _bindings$event$i.ctx;
          var once = _bindings$event$i.once;
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

var Step =
/*#__PURE__*/
function (_Evented) {
  _inherits(Step, _Evented);

  function Step(tour, options) {
    var _this;

    _classCallCheck(this, Step);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Step).call(this, tour, options));
    _this.tour = tour;

    _this.bindMethods();

    _this.setOptions(options);

    return _possibleConstructorReturn(_this, _assertThisInitialized(_assertThisInitialized(_this)));
  }

  _createClass(Step, [{
    key: "bindMethods",
    value: function bindMethods() {
      var _this2 = this;

      var methods = ['_show', 'show', 'hide', 'isOpen', 'cancel', 'complete', 'scrollTo', 'destroy', 'render'];
      methods.map(function (method) {
        _this2[method] = _this2[method].bind(_this2);
      });
    }
  }, {
    key: "setOptions",
    value: function setOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.options = options;
      this.destroy();
      this.id = this.options.id || this.id || "step-".concat(uniqueId());
      var when = this.options.when;

      if (when) {
        for (var event in when) {
          if ({}.hasOwnProperty.call(when, event)) {
            var handler = when[event];
            this.on(event, handler, this);
          }
        }
      } // Button configuration


      var buttonsJson = JSON.stringify(this.options.buttons);
      var buttonsAreDefault = isUndefined(buttonsJson) || buttonsJson === 'true';
      var buttonsAreEmpty = buttonsJson === '{}' || buttonsJson === '[]' || buttonsJson === 'null' || buttonsJson === 'false';
      var buttonsAreArray = !buttonsAreDefault && isArray(this.options.buttons);
      var buttonsAreObject = !buttonsAreDefault && isObject(this.options.buttons); // Show default button if undefined or 'true'

      if (buttonsAreDefault) {
        this.options.buttons = [{
          text: 'Next',
          action: this.tour.next,
          classes: 'btn'
        }]; // Can pass in an object which will assume asingle button
      } else if (!buttonsAreEmpty && buttonsAreObject) {
        this.options.buttons = [this.options.buttons]; // Falsey/empty values or non-object values prevent buttons from rendering
      } else if (buttonsAreEmpty || !buttonsAreArray) {
        this.options.buttons = false;
      }
    }
  }, {
    key: "getTour",
    value: function getTour() {
      return this.tour;
    }
  }, {
    key: "bindAdvance",
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
      }; // TODO: this should also bind/unbind on show/hide


      document.body.addEventListener(event, handler);
      this.on('destroy', function () {
        return document.body.removeEventListener(event, handler);
      });
    }
  }, {
    key: "getAttachTo",
    value: function getAttachTo() {
      var opts = parsePosition(this.options.attachTo) || {};
      var returnOpts = assign({}, opts);

      if (typeof opts.element === 'string') {
        // Can't override the element in user opts reference because we can't
        // guarantee that the element will exist in the future.
        returnOpts.element = document.querySelector(opts.element);

        if (!returnOpts.element) {
          console.error("The element for this Shepherd step was not found ".concat(opts.element));
        }
      }

      return returnOpts;
    }
  }, {
    key: "setupPopper",
    value: function setupPopper() {
      if (isUndefined(Popper)) {
        throw new Error('Using the attachment feature of Shepherd requires the Popper.js library');
      }

      var opts = this.getAttachTo();
      opts.modifiers = opts.modifiers || {};
      var attachment = opts.on || 'right';
      opts.positionFixed = false;

      if (isUndefined(opts.element)) {
        opts.element = document.body;
        attachment = 'top';
        opts.modifiers = assign({
          offset: {
            enabled: true,
            offset: '0,50vh'
          },
          flip: {
            enabled: false
          },
          hide: {
            enabled: false
          },
          inner: {
            enabled: true
          },
          keepTogether: {
            enabled: false
          },
          preventOverflow: {
            enabled: false,
            padding: 0
          }
        }, opts.modifiers);
        opts.positionFixed = true; // This will require the next version of popper. @see v1.13.0-next
      }

      var popperOpts = assign({}, {
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
      this.popper = new Popper(opts.element, this.el, popperOpts);
      this.target = opts.element;
      this.target.classList.add('shepherd-target');
      this.target.classList.add('shepherd-enabled');
    }
  }, {
    key: "show",
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
    key: "_show",
    value: function _show() {
      var _this5 = this;

      this.trigger('before-show');

      if (!this.el) {
        this.render();
      }

      this.el.classList.add('shepherd-open');
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
    key: "hide",
    value: function hide() {
      this.trigger('before-hide');
      this.el.classList.remove('shepherd-open');
      document.body.removeAttribute('data-shepherd-step');

      if (this.target) {
        this.target.classList.remove('shepherd-enabled');
      }

      if (this.popper) {
        this.popper.destroy();
      }

      this.popper = null;
      this.trigger('hide');
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      return this.el && this.el.classList.hasClass('shepherd-open');
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this.tour.cancel();
      this.trigger('cancel');
    }
  }, {
    key: "complete",
    value: function complete() {
      this.tour.complete();
      this.trigger('complete');
    }
  }, {
    key: "scrollTo",
    value: function scrollTo() {
      var _this$getAttachTo = this.getAttachTo(),
          element = _this$getAttachTo.element;

      if (!isUndefined(this.options.scrollToHandler)) {
        this.options.scrollToHandler(element);
      } else if (!isUndefined(element)) {
        element.scrollIntoView();
      }
    }
  }, {
    key: "destroy",
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
    key: "render",
    value: function render() {
      var _this6 = this;

      if (!isUndefined(this.el)) {
        this.destroy();
      }

      this.el = createFromHTML("<div class='shepherd-step ".concat(this.options.classes || '', "' data-id='").concat(this.id, "' ").concat(this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : '', ">"));

      if (this.options.attachTo) {
        this.el.appendChild(createFromHTML('<div class="popper__arrow" x-arrow></div>'));
      }

      var content = document.createElement('div');
      content.className = 'shepherd-content';
      this.el.appendChild(content);
      var header = document.createElement('header');
      content.appendChild(header);

      if (this.options.title) {
        header.innerHTML += "<h3 class='shepherd-title'>".concat(this.options.title, "</h3>");
        this.el.className += ' shepherd-has-title';
      }

      if (this.options.showCancelLink) {
        var link = createFromHTML('<a href class=\'shepherd-cancel-link\'>✕</a>');
        header.appendChild(link);
        this.el.className += ' shepherd-has-cancel-link';
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
            text.innerHTML += "<p>".concat(paragraph, "</p>");
          });
        }

        content.appendChild(text);
      }

      if (this.options.buttons) {
        var footer = document.createElement('footer');
        var buttons = createFromHTML('<ul class=\'shepherd-buttons\'></ul>');
        this.options.buttons.map(function (cfg) {
          var button = createFromHTML("<li><a class='shepherd-button ".concat(cfg.classes || '', "'>").concat(cfg.text, "</a>"));
          buttons.appendChild(button);

          _this6.bindButtonEvents(cfg, button.querySelector('a'));
        });
        footer.appendChild(buttons);
        content.appendChild(footer);
      }

      document.body.appendChild(this.el);
      this.setupPopper();

      if (this.options.advanceOn) {
        this.bindAdvance();
      }
    }
  }, {
    key: "bindCancelLink",
    value: function bindCancelLink(link) {
      var _this7 = this;

      link.addEventListener('click', function (e) {
        e.preventDefault();

        _this7.cancel();
      });
    }
  }, {
    key: "bindButtonEvents",
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

var Tour =
/*#__PURE__*/
function (_Evented2) {
  _inherits(Tour, _Evented2);

  function Tour() {
    var _this9;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tour);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(Tour).call(this, options));

    _this9.bindMethods();

    _this9.options = options;
    _this9.steps = _this9.options.steps || []; // Pass these events onto the global Shepherd object

    var events = ['complete', 'cancel', 'hide', 'start', 'show', 'active', 'inactive'];
    events.map(function (event) {
      (function (e) {
        _this9.on(e, function (opts) {
          opts = opts || {};
          opts.tour = _assertThisInitialized(_assertThisInitialized(_this9));
          Shepherd.trigger(e, opts);
        });
      })(event);
    });
    return _possibleConstructorReturn(_this9, _assertThisInitialized(_assertThisInitialized(_this9)));
  }

  _createClass(Tour, [{
    key: "bindMethods",
    value: function bindMethods() {
      var _this10 = this;

      var methods = ['next', 'back', 'cancel', 'complete', 'hide'];
      methods.map(function (method) {
        _this10[method] = _this10[method].bind(_this10);
      });
    }
  }, {
    key: "addStep",
    value: function addStep(name, step) {
      if (isUndefined(step)) {
        step = name;
      }

      if (!(step instanceof Step)) {
        if (typeof name === 'string' || typeof name === 'number') {
          step.id = name.toString();
        }

        step = assign({}, this.options.defaults, step);
        step = new Step(this, step);
      } else {
        step.tour = this;
      }

      this.steps.push(step);
      return this;
    }
  }, {
    key: "removeStep",
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
        if (this.steps.length) this.show(0);else this.hide();
      }
    }
  }, {
    key: "getById",
    value: function getById(id) {
      for (var i = 0; i < this.steps.length; ++i) {
        var step = this.steps[i];

        if (step.id === id) {
          return step;
        }
      }
    }
  }, {
    key: "getCurrentStep",
    value: function getCurrentStep() {
      return this.currentStep;
    }
  }, {
    key: "next",
    value: function next() {
      var index = this.steps.indexOf(this.currentStep);

      if (index === this.steps.length - 1) {
        this.hide(index);
        this.trigger('complete');
        this.done();
      } else {
        this.show(index + 1, true);
      }
    }
  }, {
    key: "back",
    value: function back() {
      var index = this.steps.indexOf(this.currentStep);
      this.show(index - 1, false);
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.currentStep) {
        this.currentStep.hide();
      }

      this.trigger('cancel');
      this.done();
    }
  }, {
    key: "complete",
    value: function complete() {
      if (this.currentStep) {
        this.currentStep.hide();
      }

      this.trigger('complete');
      this.done();
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this.currentStep) {
        this.currentStep.hide();
      }

      this.trigger('hide');
      this.done();
    }
  }, {
    key: "done",
    value: function done() {
      Shepherd.activeTour = null;
      document.body.classList.remove('shepherd-active');
      this.trigger('inactive', {
        tour: this
      });
    }
  }, {
    key: "show",
    value: function show() {
      var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var forward = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.currentStep) {
        this.currentStep.hide();
      } else {
        document.body.classList.add('shepherd-active');
        this.trigger('active', {
          tour: this
        });
      }

      Shepherd.activeTour = this;
      var next;

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

          if (this.currentStep) {
            this.currentStep.hide();
          }

          this.currentStep = next;
          next.show();
        }
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.trigger('start');
      this.currentStep = null;
      this.next();
    }
  }]);

  return Tour;
}(Evented);

var Shepherd = new Evented();
assign(Shepherd, {
  Tour: Tour,
  Step: Step,
  Evented: Evented
});
return Shepherd;

}));
