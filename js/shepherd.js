(function() {
  var ATTACHMENT, Evented, Shepherd, Step, Tour, addClass, createFromHTML, extend, getBounds, hasClass, matchesSelector, parseShorthand, removeClass, uniqueId, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = Tether.Utils, extend = _ref.extend, removeClass = _ref.removeClass, addClass = _ref.addClass, hasClass = _ref.hasClass, Evented = _ref.Evented, getBounds = _ref.getBounds, uniqueId = _ref.uniqueId;

  Shepherd = new Evented;

  ATTACHMENT = {
    'top': 'bottom center',
    'left': 'middle right',
    'right': 'middle left',
    'bottom': 'top center'
  };

  createFromHTML = function(html) {
    var el;
    el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  };

  matchesSelector = function(el, sel) {
    var matches, _ref1, _ref2, _ref3, _ref4;
    matches = (_ref1 = (_ref2 = (_ref3 = (_ref4 = el.matches) != null ? _ref4 : el.matchesSelector) != null ? _ref3 : el.webkitMatchesSelector) != null ? _ref2 : el.mozMatchesSelector) != null ? _ref1 : el.oMatchesSelector;
    return matches.call(el, sel);
  };

  parseShorthand = function(obj, props) {
    var i, out, prop, vals, _i, _len;
    if (obj == null) {
      return obj;
    } else if (typeof obj === 'object') {
      return obj;
    } else {
      vals = obj.split(' ');
      if (vals.length > props.length) {
        vals[0] = vals.slice(0, +(vals.length - props.length) + 1 || 9e9).join(' ');
        vals.splice(1, vals.length - props.length);
      }
      out = {};
      for (i = _i = 0, _len = props.length; _i < _len; i = ++_i) {
        prop = props[i];
        out[prop] = vals[i];
      }
      return out;
    }
  };

  Step = (function(_super) {
    __extends(Step, _super);

    function Step(tour, options) {
      this.tour = tour;
      this.destroy = __bind(this.destroy, this);
      this.scrollTo = __bind(this.scrollTo, this);
      this.complete = __bind(this.complete, this);
      this.cancel = __bind(this.cancel, this);
      this.isOpen = __bind(this.isOpen, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.setOptions(options);
      this;
    }

    Step.prototype.setOptions = function(options) {
      var event, handler, _base, _ref1;
      this.options = options != null ? options : {};
      this.destroy();
      this.id = this.options.id || this.id || ("step-" + (uniqueId()));
      if (this.options.when) {
        _ref1 = this.options.when;
        for (event in _ref1) {
          handler = _ref1[event];
          this.on(event, handler, this);
        }
      }
      return (_base = this.options).buttons != null ? (_base = this.options).buttons : _base.buttons = [
        {
          text: 'Next',
          action: this.tour.next
        }
      ];
    };

    Step.prototype.getTour = function() {
      return this.tour;
    };

    Step.prototype.bindAdvance = function() {
      var event, handler, selector, _ref1,
        _this = this;
      _ref1 = parseShorthand(this.options.advanceOn, ['selector', 'event']), event = _ref1.event, selector = _ref1.selector;
      handler = function(e) {
        if (!_this.isOpen()) {
          return;
        }
        if (selector != null) {
          if (matchesSelector(e.target, selector)) {
            return _this.tour.next();
          }
        } else {
          if (_this.el && e.target === _this.el) {
            return _this.tour.next();
          }
        }
      };
      document.body.addEventListener(event, handler);
      return this.on('destroy', function() {
        return document.body.removeEventListener(event, handler);
      });
    };

    Step.prototype.getAttachTo = function() {
      var opts;
      opts = parseShorthand(this.options.attachTo, ['element', 'on']);
      if (opts == null) {
        opts = {};
      }
      if (typeof opts.element === 'string') {
        opts.element = document.querySelector(opts.element);
        if (opts.element == null) {
          throw new Error("Shepherd step's attachTo was not found in the page");
        }
      }
      return opts;
    };

    Step.prototype.setupTether = function() {
      var attachment, opts, tetherOpts;
      if (typeof Tether === "undefined" || Tether === null) {
        throw new Error("Using the attachment feature of Shepherd requires the Tether library");
      }
      opts = this.getAttachTo();
      attachment = ATTACHMENT[opts.on || 'right'];
      if (opts.element == null) {
        opts.element = 'viewport';
        attachment = 'middle center';
      }
      tetherOpts = {
        classPrefix: 'shepherd',
        element: this.el,
        constraints: [
          {
            to: 'window',
            pin: true,
            attachment: 'together'
          }
        ],
        target: opts.element,
        offset: opts.offset || '0 0',
        attachment: attachment
      };
      return this.tether = new Tether(extend(tetherOpts, this.options.tetherOptions));
    };

    Step.prototype.show = function() {
      var _this = this;
      if (this.el == null) {
        this.render();
      }
      addClass(this.el, 'shepherd-open');
      document.body.setAttribute('data-shepherd-step', this.id);
      this.setupTether();
      if (this.options.scrollTo) {
        setTimeout(function() {
          return _this.scrollTo();
        });
      }
      return this.trigger('show');
    };

    Step.prototype.hide = function() {
      var _ref1;
      removeClass(this.el, 'shepherd-open');
      document.body.removeAttribute('data-shepherd-step');
      if ((_ref1 = this.tether) != null) {
        _ref1.destroy();
      }
      this.tether = null;
      return this.trigger('hide');
    };

    Step.prototype.isOpen = function() {
      return hasClass(this.el, 'shepherd-open');
    };

    Step.prototype.cancel = function() {
      this.tour.cancel();
      return this.trigger('cancel');
    };

    Step.prototype.complete = function() {
      this.tour.complete();
      return this.trigger('complete');
    };

    Step.prototype.scrollTo = function() {
      var element;
      element = this.getAttachTo().element;
      return element != null ? element.scrollIntoView() : void 0;
    };

    Step.prototype.destroy = function() {
      var _ref1;
      if (this.el != null) {
        document.body.removeChild(this.el);
        delete this.el;
      }
      if ((_ref1 = this.tether) != null) {
        _ref1.destroy();
      }
      this.tether = null;
      return this.trigger('destroy');
    };

    Step.prototype.render = function() {
      var button, buttons, cfg, content, footer, header, link, paragraph, paragraphs, text, _i, _j, _len, _len1, _ref1, _ref2, _ref3;
      if (this.el != null) {
        this.destroy();
      }
      this.el = createFromHTML("<div class='shepherd-step " + ((_ref1 = this.options.classes) != null ? _ref1 : '') + "' data-id='" + this.id + "'></div>");
      content = document.createElement('div');
      content.className = 'shepherd-content';
      this.el.appendChild(content);
      header = document.createElement('header');
      content.appendChild(header);
      if (this.options.title != null) {
        header.innerHTML += "<h3 class='shepherd-title'>" + this.options.title + "</h3>";
        this.el.className += ' shepherd-has-title';
      }
      if (this.options.showCancelLink) {
        link = createFromHTML("<a href class='shepherd-cancel-link'>✕</a>");
        header.appendChild(link);
        this.el.className += ' shepherd-has-cancel-link';
        this.bindCancelLink(link);
      }
      if (this.options.text != null) {
        text = createFromHTML("<div class='shepherd-text'></div>");
        paragraphs = this.options.text;
        if (typeof paragraphs === 'string') {
          paragraphs = [paragraphs];
        }
        for (_i = 0, _len = paragraphs.length; _i < _len; _i++) {
          paragraph = paragraphs[_i];
          text.innerHTML += "<p>" + paragraph + "</p>";
        }
        content.appendChild(text);
      }
      footer = document.createElement('footer');
      if (this.options.buttons) {
        buttons = createFromHTML("<ul class='shepherd-buttons'></ul>");
        _ref2 = this.options.buttons;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          cfg = _ref2[_j];
          button = createFromHTML("<li><a class='shepherd-button " + ((_ref3 = cfg.classes) != null ? _ref3 : '') + "'>" + cfg.text + "</a>");
          buttons.appendChild(button);
          this.bindButtonEvents(cfg, button.querySelector('a'));
        }
        footer.appendChild(buttons);
      }
      content.appendChild(footer);
      document.body.appendChild(this.el);
      this.setupTether();
      if (this.options.advanceOn) {
        return this.bindAdvance();
      }
    };

    Step.prototype.bindCancelLink = function(link) {
      var _this = this;
      return link.addEventListener('click', function(e) {
        e.preventDefault();
        return _this.cancel();
      });
    };

    Step.prototype.bindButtonEvents = function(cfg, el) {
      var event, handler, page, _ref1,
        _this = this;
      if (cfg.events == null) {
        cfg.events = {};
      }
      if (cfg.action != null) {
        cfg.events.click = cfg.action;
      }
      _ref1 = cfg.events;
      for (event in _ref1) {
        handler = _ref1[event];
        if (typeof handler === 'string') {
          page = handler;
          handler = function() {
            return _this.tour.show(page);
          };
        }
        el.addEventListener(event, handler);
      }
      return this.on('destroy', function() {
        var _ref2, _results;
        _ref2 = cfg.events;
        _results = [];
        for (event in _ref2) {
          handler = _ref2[event];
          _results.push(el.removeEventListener(event, handler));
        }
        return _results;
      });
    };

    return Step;

  })(Evented);

  Tour = (function(_super) {
    __extends(Tour, _super);

    function Tour(options) {
      var event, _fn, _i, _len, _ref1, _ref2,
        _this = this;
      this.options = options != null ? options : {};
      this.hide = __bind(this.hide, this);
      this.complete = __bind(this.complete, this);
      this.cancel = __bind(this.cancel, this);
      this.back = __bind(this.back, this);
      this.next = __bind(this.next, this);
      this.steps = (_ref1 = this.options.steps) != null ? _ref1 : [];
      _ref2 = ['complete', 'cancel', 'hide', 'start', 'show', 'active', 'inactive'];
      _fn = function(event) {
        return _this.on(event, function(opts) {
          if (opts == null) {
            opts = {};
          }
          opts.tour = _this;
          return Shepherd.trigger(event, opts);
        });
      };
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        event = _ref2[_i];
        _fn(event);
      }
      this;
    }

    Tour.prototype.addStep = function(name, step) {
      var _ref1;
      if (step == null) {
        step = name;
      }
      if (!(step instanceof Step)) {
        if ((_ref1 = typeof name) === 'string' || _ref1 === 'number') {
          step.id = name.toString();
        }
        step = extend({}, this.options.defaults, step);
        step = new Step(this, step);
      } else {
        step.tour = this;
      }
      this.steps.push(step);
      return step;
    };

    Tour.prototype.getById = function(id) {
      var step, _i, _len, _ref1;
      _ref1 = this.steps;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        step = _ref1[_i];
        if (step.id === id) {
          return step;
        }
      }
    };

    Tour.prototype.getCurrentStep = function() {
      return this.currentStep;
    };

    Tour.prototype.next = function() {
      var index;
      index = this.steps.indexOf(this.currentStep);
      if (index === this.steps.length - 1) {
        this.hide(index);
        this.trigger('complete');
        return this.done();
      } else {
        return this.show(index + 1);
      }
    };

    Tour.prototype.back = function() {
      var index;
      index = this.steps.indexOf(this.currentStep);
      return this.show(index - 1);
    };

    Tour.prototype.cancel = function() {
      var _ref1;
      if ((_ref1 = this.currentStep) != null) {
        _ref1.hide();
      }
      this.trigger('cancel');
      return this.done();
    };

    Tour.prototype.complete = function() {
      var _ref1;
      if ((_ref1 = this.currentStep) != null) {
        _ref1.hide();
      }
      this.trigger('complete');
      return this.done();
    };

    Tour.prototype.hide = function() {
      var _ref1;
      if ((_ref1 = this.currentStep) != null) {
        _ref1.hide();
      }
      this.trigger('hide');
      return this.done();
    };

    Tour.prototype.done = function() {
      Shepherd.activeTour = null;
      removeClass(document.body, 'shepherd-active');
      return this.trigger('inactive', {
        tour: this
      });
    };

    Tour.prototype.show = function(key) {
      var next;
      if (key == null) {
        key = 0;
      }
      if (this.currentStep) {
        this.currentStep.hide();
      } else {
        addClass(document.body, 'shepherd-active');
        this.trigger('active', {
          tour: this
        });
      }
      Shepherd.activeTour = this;
      if (typeof key === 'string') {
        next = this.getById(key);
      } else {
        next = this.steps[key];
      }
      if (next) {
        this.trigger('show', {
          step: next,
          previous: this.currentStep
        });
        this.currentStep = next;
        return next.show();
      }
    };

    Tour.prototype.start = function() {
      this.trigger('start');
      this.currentStep = null;
      return this.next();
    };

    return Tour;

  })(Evented);

  extend(Shepherd, {
    Tour: Tour,
    Step: Step,
    Evented: Evented
  });

  window.Shepherd = Shepherd;

}).call(this);
