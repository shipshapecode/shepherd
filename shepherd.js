(function() {
  var ATTACHMENT, Evented, Sheep, Step, Tour, addClass, addEventListener, createFromHTML, extend, matchesSelector, parseShorthand, removeClass, removeEventListener, uniqueId,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Sheep = (function() {
    function Sheep() {}

    return Sheep;

  })();

  ATTACHMENT = {
    'top': 'top center',
    'left': 'middle right',
    'right': 'middle left',
    'bottom': 'bottom center'
  };

  uniqueId = (function() {
    var id;
    id = 0;
    return function() {
      return id++;
    };
  })();

  extend = function(out) {
    var args, key, obj, val, _i, _len, _ref;
    if (out == null) {
      out = {};
    }
    args = [];
    Array.prototype.push.apply(args, arguments);
    _ref = args.slice(1);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      if (obj) {
        for (key in obj) {
          if (!__hasProp.call(obj, key)) continue;
          val = obj[key];
          out[key] = val;
        }
      }
    }
    return out;
  };

  createFromHTML = function(html) {
    var el;
    el = document.createElement('div');
    el.innerHTML = html;
    return el.children[0];
  };

  removeClass = function(el, name) {
    return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
  };

  addClass = function(el, name) {
    removeClass(el, name);
    return el.className += " " + name;
  };

  addEventListener = function(el, event, handler) {
    if (el.addEventListener != null) {
      return el.addEventListener(event, handler, false);
    } else {
      return el.attachEvent("on" + event, handler);
    }
  };

  removeEventListener = function(el, event, handler) {
    if (el.removeEventListener != null) {
      return el.removeEventListener(event, handler, false);
    } else {
      return el.detachEvent("on" + event, handler);
    }
  };

  matchesSelector = function(el, sel) {
    var element, list, matches, _i, _len, _ref, _ref1, _ref2, _ref3;
    matches = (_ref = (_ref1 = (_ref2 = (_ref3 = el.matches) != null ? _ref3 : el.matchesSelector) != null ? _ref2 : el.webkitMatchesSelector) != null ? _ref1 : el.mozMatchesSelector) != null ? _ref : el.oMatchesSelector;
    if (matches != null) {
      return matches.call(el, sel);
    } else {
      list = document.querySelectorAll(sel);
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        element = list[_i];
        if (element === el) {
          return true;
        }
      }
      return false;
    }
  };

  parseShorthand = function(obj, props) {
    var i, out, prop, vals, _i, _len;
    if (obj == null) {
      return obj;
    } else if (typeof obj === 'object') {
      return obj;
    } else {
      vals = obj.split(' ');
      out = {};
      for (i = _i = 0, _len = props.length; _i < _len; i = ++_i) {
        prop = props[i];
        out[prop] = vals[i];
      }
      return out;
    }
  };

  Evented = (function() {
    function Evented() {}

    Evented.prototype.on = function(event, handler, ctx, once) {
      var _base;
      if (once == null) {
        once = false;
      }
      if (this.bindings == null) {
        this.bindings = {};
      }
      if ((_base = this.bindings)[event] == null) {
        _base[event] = [];
      }
      return this.bindings[event].push({
        handler: handler,
        ctx: ctx,
        once: once
      });
    };

    Evented.prototype.once = function(event, handler, ctx) {
      return this.on(event, handler, ctx, true);
    };

    Evented.prototype.off = function(event, handler) {
      var i, _ref, _results;
      if (((_ref = this.bindings) != null ? _ref[event] : void 0) == null) {
        return;
      }
      if (handler == null) {
        return delete this.bindings[event];
      } else {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          if (this.bindings[event][i].handler === handler) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    Evented.prototype.trigger = function() {
      var args, ctx, event, handler, i, once, _ref, _ref1, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if ((_ref = this.bindings) != null ? _ref[event] : void 0) {
        i = 0;
        _results = [];
        while (i < this.bindings[event].length) {
          _ref1 = this.bindings[event][i], handler = _ref1.handler, ctx = _ref1.ctx, once = _ref1.once;
          handler.apply(ctx != null ? ctx : this, args);
          if (once) {
            _results.push(this.bindings[event].splice(i, 1));
          } else {
            _results.push(i++);
          }
        }
        return _results;
      }
    };

    return Evented;

  })();

  Step = (function(_super) {
    __extends(Step, _super);

    function Step(tour, options) {
      this.tour = tour;
      this.destroy = __bind(this.destroy, this);
      this.scrollTo = __bind(this.scrollTo, this);
      this.complete = __bind(this.complete, this);
      this.cancel = __bind(this.cancel, this);
      this.hide = __bind(this.hide, this);
      this.show = __bind(this.show, this);
      this.setOptions(options);
    }

    Step.prototype.setOptions = function(options) {
      var event, handler, _base, _ref;
      this.options = options != null ? options : {};
      this.destroy();
      this.id = this.options.id || this.id || ("step-" + (uniqueId()));
      if (this.options.when) {
        _ref = this.options.when;
        for (event in _ref) {
          handler = _ref[event];
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

    Step.prototype.bindAdvance = function() {
      var event, handler, selector, _ref,
        _this = this;
      _ref = parseShorthand(this.options.advanceOn, ['event', 'selector']), event = _ref.event, selector = _ref.selector;
      handler = function(e) {
        if (selector != null) {
          if (matchesSelector(e.target, selector)) {
            return _this.tour.advance();
          }
        } else {
          if (_this.el && e.target === _this.el) {
            return _this.tour.advance();
          }
        }
      };
      addEventListener(document.body, event, handler);
      return this.on('destroy', function() {
        return removeEventListener(document.body, event, handler);
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
        element: this.el,
        target: opts.element,
        offset: opts.offset || '0 0',
        attachment: attachment
      };
      return this.tether = new Tether(extend(tetherOpts, this.options.tetherOptions));
    };

    Step.prototype.show = function() {
      var _ref,
        _this = this;
      if (this.el == null) {
        this.render();
      }
      removeClass(this.el, 'shepherd-hidden');
      if ((_ref = this.tether) != null) {
        _ref.enable();
      }
      if (this.options.scrollTo) {
        setTimeout(function() {
          return _this.scrollTo();
        });
      }
      return this.trigger('show');
    };

    Step.prototype.hide = function() {
      var _ref;
      addClass(this.el, 'shepherd-hidden');
      if ((_ref = this.tether) != null) {
        _ref.disable();
      }
      return this.trigger('hide');
    };

    Step.prototype.cancel = function() {
      this.hide();
      return this.trigger('cancel');
    };

    Step.prototype.complete = function() {
      this.hide();
      return this.trigger('complete');
    };

    Step.prototype.scrollTo = function() {
      var $attachTo, elHeight, elLeft, elTop, element, height, left, offset, top, _ref;
      element = this.getAttachTo().element;
      if (element == null) {
        return;
      }
      $attachTo = jQuery(element);
      _ref = $attachTo.offset(), top = _ref.top, left = _ref.left;
      height = $attachTo.outerHeight();
      offset = $(this.el).offset();
      elTop = offset.top;
      elLeft = offset.left;
      elHeight = $(this.el).outerHeight();
      if (top < pageYOffset || elTop < pageYOffset) {
        return jQuery(document.body).scrollTop(Math.min(top, elTop) - 10);
      } else if ((top + height) > (pageYOffset + innerHeight) || (elTop + elHeight) > (pageYOffset + innerHeight)) {
        return jQuery(document.body).scrollTop(Math.max(top + height, elTop + elHeight) - innerHeight + 10);
      }
    };

    Step.prototype.destroy = function() {
      var _ref;
      if (this.el != null) {
        document.body.removeChild(this.el);
        delete this.el;
      }
      if ((_ref = this.tether) != null) {
        _ref.destroy();
      }
      return this.trigger('destroy');
    };

    Step.prototype.render = function() {
      var button, buttons, cfg, content, footer, header, paragraph, paragraphs, text, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      if (this.el != null) {
        this.destroy();
      }
      this.el = createFromHTML("<div class='shepherd-step " + ((_ref = this.options.classes) != null ? _ref : '') + "' data-id='" + this.id + "'></div>");
      content = document.createElement('div');
      content.className = 'drop-content';
      this.el.appendChild(content);
      if (this.options.title != null) {
        header = document.createElement('header');
        header.innerHTML = "<h3 class='shepherd-title'>" + this.options.title + "</h3>";
        content.appendChild(header);
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
        _ref1 = this.options.buttons;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          cfg = _ref1[_j];
          button = createFromHTML("<li><a class='shepherd-button " + ((_ref2 = cfg.classes) != null ? _ref2 : '') + "'>" + cfg.text + "</a>");
          buttons.appendChild(button);
          this.bindButtonEvents(cfg, button);
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

    Step.prototype.bindButtonEvents = function(cfg, el) {
      var event, handler, page, _ref,
        _this = this;
      if (cfg.events == null) {
        cfg.events = {};
      }
      if (cfg.action != null) {
        cfg.events.click = cfg.action;
      }
      _ref = cfg.events;
      for (event in _ref) {
        handler = _ref[event];
        if (typeof handler === 'string') {
          page = handler;
          handler = function() {
            return _this.tour.show(page);
          };
        }
        addEventListener(el, event, handler);
      }
      return this.on('destroy', function() {
        var _ref1, _results;
        _ref1 = cfg.events;
        _results = [];
        for (event in _ref1) {
          handler = _ref1[event];
          _results.push(removeEventListener(el, event, handler));
        }
        return _results;
      });
    };

    return Step;

  })(Evented);

  Tour = (function() {
    function Tour(options) {
      var _ref;
      this.options = options != null ? options : {};
      this.hide = __bind(this.hide, this);
      this.cancel = __bind(this.cancel, this);
      this.back = __bind(this.back, this);
      this.next = __bind(this.next, this);
      this.steps = (_ref = this.options.steps) != null ? _ref : [];
    }

    Tour.prototype.addStep = function(name, step) {
      if (step == null) {
        step = name;
      } else {
        step.id = name;
      }
      step = extend({}, this.options.defaults, step);
      return this.steps.push(new Step(this, step));
    };

    Tour.prototype.getById = function(id) {
      var step, _i, _len, _ref;
      _ref = this.steps;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        step = _ref[_i];
        if (step.id === id) {
          return step;
        }
      }
    };

    Tour.prototype.next = function() {
      var index;
      index = this.steps.indexOf(this.currentStep);
      return this.show(index + 1);
    };

    Tour.prototype.back = function() {
      var index;
      index = this.steps.indexOf(this.currentStep);
      return this.show(index - 1);
    };

    Tour.prototype.cancel = function() {
      var _ref;
      return (_ref = this.currentStep) != null ? _ref.cancel() : void 0;
    };

    Tour.prototype.hide = function() {
      var _ref;
      return (_ref = this.currentStep) != null ? _ref.hide() : void 0;
    };

    Tour.prototype.show = function(key) {
      var next;
      if (key == null) {
        key = 0;
      }
      if (this.currentStep) {
        this.currentStep.hide();
      }
      if (typeof key === 'string') {
        next = this.getById(key);
      } else {
        next = this.steps[key];
      }
      if (next) {
        this.currentStep = next;
        return next.show();
      }
    };

    Tour.prototype.start = function() {
      this.currentStep = null;
      return this.next();
    };

    return Tour;

  })();

  window.Tour = Tour;

}).call(this);
