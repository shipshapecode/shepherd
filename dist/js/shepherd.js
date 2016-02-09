/*! tether-shepherd 1.7.0 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["tether"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('tether'));
  } else {
    root.Shepherd = factory(root.Tether);
  }
}(this, function(Tether) {

/* global Tether */

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x5, _x6, _x7) { var _again = true; _function: while (_again) { var object = _x5, property = _x6, receiver = _x7; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x5 = parent; _x6 = property; _x7 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Tether$Utils = Tether.Utils;
var Evented = _Tether$Utils.Evented;
var addClass = _Tether$Utils.addClass;
var extend = _Tether$Utils.extend;
var hasClass = _Tether$Utils.hasClass;
var removeClass = _Tether$Utils.removeClass;
var uniqueId = _Tether$Utils.uniqueId;

var Shepherd = new Evented();

function isUndefined(obj) {
  return typeof obj === 'undefined';
};

function isArray(obj) {
  return obj && obj.constructor === Array;
};

function isObject(obj) {
  return obj && obj.constructor === Object;
};

function isObjectLoose(obj) {
  return typeof obj === 'object';
};

var ATTACHMENT = {
  'top': 'bottom center',
  'left': 'middle right',
  'right': 'middle left',
  'bottom': 'top center',
  'center': 'middle center'
};

function createFromHTML(html) {
  var el = document.createElement('div');
  el.innerHTML = html;
  return el.children[0];
}

function matchesSelector(el, sel) {
  var matches = undefined;
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

var positionRe = /^(.+) (top|left|right|bottom|center|\[[a-z ]+\])$/;

function parsePosition(str) {
  if (isObjectLoose(str)) {
    if (str.hasOwnProperty("element") && str.hasOwnProperty("on")) {
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

var Step = (function (_Evented) {
  _inherits(Step, _Evented);

  function Step(tour, options) {
    _classCallCheck(this, Step);

    _get(Object.getPrototypeOf(Step.prototype), 'constructor', this).call(this, tour, options);
    this.tour = tour;
    this.bindMethods();
    this.setOptions(options);
    return this;
  }

  _createClass(Step, [{
    key: 'bindMethods',
    value: function bindMethods() {
      var _this = this;

      var methods = ['_show', 'show', 'hide', 'isOpen', 'cancel', 'complete', 'scrollTo', 'destroy', 'render'];
      methods.map(function (method) {
        _this[method] = _this[method].bind(_this);
      });
    }
  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      this.options = options;
      this.destroy();

      this.id = this.options.id || this.id || 'step-' + uniqueId();

      var when = this.options.when;
      if (when) {
        for (var _event in when) {
          if (({}).hasOwnProperty.call(when, _event)) {
            var handler = when[_event];
            this.on(_event, handler, this);
          }
        }
      }

      // Button configuration

      var buttonsJson = JSON.stringify(this.options.buttons);
      var buttonsAreDefault = isUndefined(buttonsJson) || buttonsJson === "true";

      var buttonsAreEmpty = buttonsJson === "{}" || buttonsJson === "[]" || buttonsJson === "null" || buttonsJson === "false";

      var buttonsAreArray = !buttonsAreDefault && isArray(this.options.buttons);

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
      var _this2 = this;

      // An empty selector matches the step element

      var _parseShorthand = parseShorthand(this.options.advanceOn, ['selector', 'event']);

      var event = _parseShorthand.event;
      var selector = _parseShorthand.selector;

      var handler = function handler(e) {
        if (!_this2.isOpen()) {
          return;
        }

        if (!isUndefined(selector)) {
          if (matchesSelector(e.target, selector)) {
            _this2.tour.next();
          }
        } else {
          if (_this2.el && e.target === _this2.el) {
            _this2.tour.next();
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
      var returnOpts = extend({}, opts);

      if (typeof opts.element === 'string') {
        // Can't override the element in user opts reference because we can't
        // guarantee that the element will exist in the future.
        returnOpts.element = document.querySelector(opts.element);
        if (!returnOpts.element) {
          console.error('The element for this Shepherd step was not found ' + opts.element);
        }
      }

      return returnOpts;
    }
  }, {
    key: 'setupTether',
    value: function setupTether() {
      if (isUndefined(Tether)) {
        throw new Error("Using the attachment feature of Shepherd requires the Tether library");
      }

      var opts = this.getAttachTo();
      var attachment = ATTACHMENT[opts.on || 'right'] || opts.on;
      if (isUndefined(opts.element)) {
        opts.element = 'viewport';
        attachment = 'middle center';
      }

      var tetherOpts = {
        classPrefix: 'shepherd',
        element: this.el,
        constraints: [{
          to: 'window',
          pin: true,
          attachment: 'together'
        }],
        target: opts.element,
        offset: opts.offset || '0 0',
        attachment: attachment
      };

      if (this.tether) {
        this.tether.destroy();
      }

      this.tether = new Tether(extend(tetherOpts, this.options.tetherOptions));
    }
  }, {
    key: 'show',
    value: function show() {
      var _this3 = this;

      if (!isUndefined(this.options.beforeShowPromise)) {
        var beforeShowPromise = this.options.beforeShowPromise();
        if (!isUndefined(beforeShowPromise)) {
          return beforeShowPromise.then(function () {
            return _this3._show();
          });
        }
      }
      this._show();
    }
  }, {
    key: '_show',
    value: function _show() {
      var _this4 = this;

      this.trigger('before-show');

      if (!this.el) {
        this.render();
      }

      addClass(this.el, 'shepherd-open');

      document.body.setAttribute('data-shepherd-step', this.id);

      this.setupTether();

      if (this.options.scrollTo) {
        setTimeout(function () {
          _this4.scrollTo();
        });
      }

      this.trigger('show');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.trigger('before-hide');

      removeClass(this.el, 'shepherd-open');

      document.body.removeAttribute('data-shepherd-step');

      if (this.tether) {
        this.tether.destroy();
      }
      this.tether = null;

      this.trigger('hide');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      return this.el && hasClass(this.el, 'shepherd-open');
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
      var _getAttachTo = this.getAttachTo();

      var element = _getAttachTo.element;

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

      if (this.tether) {
        this.tether.destroy();
      }
      this.tether = null;

      this.trigger('destroy');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      if (!isUndefined(this.el)) {
        this.destroy();
      }

      this.el = createFromHTML('<div class=\'shepherd-step ' + (this.options.classes || '') + '\' data-id=\'' + this.id + '\' ' + (this.options.idAttribute ? 'id="' + this.options.idAttribute + '"' : '') + '></div>');

      var content = document.createElement('div');
      content.className = 'shepherd-content';
      this.el.appendChild(content);

      var header = document.createElement('header');
      content.appendChild(header);

      if (this.options.title) {
        header.innerHTML += '<h3 class=\'shepherd-title\'>' + this.options.title + '</h3>';
        this.el.className += ' shepherd-has-title';
      }

      if (this.options.showCancelLink) {
        var link = createFromHTML("<a href class='shepherd-cancel-link'>✕</a>");
        header.appendChild(link);

        this.el.className += ' shepherd-has-cancel-link';

        this.bindCancelLink(link);
      }

      if (!isUndefined(this.options.text)) {
        (function () {
          var text = createFromHTML("<div class='shepherd-text'></div>");
          var paragraphs = _this5.options.text;

          if (typeof paragraphs === 'function') {
            paragraphs = paragraphs.call(_this5, text);
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
        })();
      }

      if (this.options.buttons) {
        (function () {
          var footer = document.createElement('footer');
          var buttons = createFromHTML("<ul class='shepherd-buttons'></ul>");

          _this5.options.buttons.map(function (cfg) {
            var button = createFromHTML('<li><a class=\'shepherd-button ' + (cfg.classes || '') + '\'>' + cfg.text + '</a>');
            buttons.appendChild(button);
            _this5.bindButtonEvents(cfg, button.querySelector('a'));
          });

          footer.appendChild(buttons);
          content.appendChild(footer);
        })();
      }

      document.body.appendChild(this.el);

      this.setupTether();

      if (this.options.advanceOn) {
        this.bindAdvance();
      }
    }
  }, {
    key: 'bindCancelLink',
    value: function bindCancelLink(link) {
      var _this6 = this;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        _this6.cancel();
      });
    }
  }, {
    key: 'bindButtonEvents',
    value: function bindButtonEvents(cfg, el) {
      var _this7 = this;

      cfg.events = cfg.events || {};
      if (!isUndefined(cfg.action)) {
        // Including both a click event and an action is not supported
        cfg.events.click = cfg.action;
      }

      for (var _event2 in cfg.events) {
        if (({}).hasOwnProperty.call(cfg.events, _event2)) {
          var handler = cfg.events[_event2];
          if (typeof handler === 'string') {
            (function () {
              var page = handler;
              handler = function () {
                return _this7.tour.show(page);
              };
            })();
          }
          el.addEventListener(_event2, handler);
        }
      }

      this.on('destroy', function () {
        for (var _event3 in cfg.events) {
          if (({}).hasOwnProperty.call(cfg.events, _event3)) {
            var handler = cfg.events[_event3];
            el.removeEventListener(_event3, handler);
          }
        }
      });
    }
  }]);

  return Step;
})(Evented);

var Tour = (function (_Evented2) {
  _inherits(Tour, _Evented2);

  function Tour() {
    var _this8 = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Tour);

    _get(Object.getPrototypeOf(Tour.prototype), 'constructor', this).call(this, options);
    this.bindMethods();
    this.options = options;
    this.steps = this.options.steps || [];

    // Pass these events onto the global Shepherd object
    var events = ['complete', 'cancel', 'hide', 'start', 'show', 'active', 'inactive'];
    events.map(function (event) {
      (function (e) {
        _this8.on(e, function (opts) {
          opts = opts || {};
          opts.tour = _this8;
          Shepherd.trigger(e, opts);
        });
      })(event);
    });

    return this;
  }

  _createClass(Tour, [{
    key: 'bindMethods',
    value: function bindMethods() {
      var _this9 = this;

      var methods = ['next', 'back', 'cancel', 'complete', 'hide'];
      methods.map(function (method) {
        _this9[method] = _this9[method].bind(_this9);
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
        step = extend({}, this.options.defaults, step);
        step = new Step(this, step);
      } else {
        step.tour = this;
      }

      this.steps.push(step);
      return this;
    }
  }, {
    key: 'removeStep',
    value: function removeStep(name) {
      var current = this.getCurrentStep();

      for (var i = 0; i < this.steps.length; ++i) {
        var step = this.steps[i];
        if (step.id === name) {
          step.hide();
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
        this.hide(index);
        this.trigger('complete');
        this.done();
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
  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      this.trigger('cancel');
      this.done();
    }
  }, {
    key: 'complete',
    value: function complete() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      this.trigger('complete');
      this.done();
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (this.currentStep) {
        this.currentStep.hide();
      }
      this.trigger('hide');
      this.done();
    }
  }, {
    key: 'done',
    value: function done() {
      Shepherd.activeTour = null;
      removeClass(document.body, 'shepherd-active');
      this.trigger('inactive', { tour: this });
    }
  }, {
    key: 'show',
    value: function show() {
      var key = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
      var forward = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

      if (this.currentStep) {
        this.currentStep.hide();
      } else {
        addClass(document.body, 'shepherd-active');
        this.trigger('active', { tour: this });
      }

      Shepherd.activeTour = this;

      var next = undefined;

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
    key: 'start',
    value: function start() {
      this.trigger('start');

      this.currentStep = null;
      this.next();
    }
  }]);

  return Tour;
})(Evented);

extend(Shepherd, { Tour: Tour, Step: Step, Evented: Evented });
return Shepherd;

}));
