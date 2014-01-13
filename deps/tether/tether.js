/*! tether v0.2.8-10-gc7da4d5 */
(function() {
  var Evented, addClass, extend, getBounds, getOffsetParent, getScrollParent, hasClass, removeClass,
    __hasProp = {}.hasOwnProperty,
    __slice = [].slice;

  if (window.Tether == null) {
    window.Tether = {};
  }

  getScrollParent = function(el) {
    var parent, position, scrollParent, style, _ref;
    position = getComputedStyle(el).position;
    if (position === 'fixed') {
      return el;
    }
    scrollParent = void 0;
    parent = el;
    while (parent = parent.parentNode) {
      if (!(style = getComputedStyle(parent))) {
        return parent;
      }
      if (/(auto|scroll)/.test(style['overflow'] + style['overflow-y'] + style['overflow-x'])) {
        if (position !== 'absolute' || ((_ref = style['position']) === 'relative' || _ref === 'absolute' || _ref === 'fixed')) {
          return parent;
        }
      }
    }
    return document.body;
  };

  getBounds = function(el) {
    var box, doc, docEl, style;
    doc = el.ownerDocument;
    docEl = doc.documentElement;
    box = extend({}, el.getBoundingClientRect());
    box.top = box.top + window.pageYOffset - docEl.clientTop;
    box.left = box.left + window.pageXOffset - docEl.clientLeft;
    box.right = doc.body.clientWidth - box.width - box.left;
    box.bottom = doc.body.clientHeight - box.height - box.top;
    if (!box.height || !box.width) {
      style = getComputedStyle(el);
      box.height || (box.height = parseFloat(style.height));
      box.width || (box.width = parseFloat(style.width));
    }
    return box;
  };

  getOffsetParent = function(el) {
    return el.offsetParent || document.documentElement;
  };

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

  removeClass = function(el, name) {
    var cls, _i, _len, _ref, _results;
    if (el.classList != null) {
      _ref = name.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cls = _ref[_i];
        _results.push(el.classList.remove(cls));
      }
      return _results;
    } else {
      return el.className = el.className.replace(new RegExp("(^| )" + (name.split(' ').join('|')) + "( |$)", 'gi'), ' ');
    }
  };

  addClass = function(el, name) {
    var cls, _i, _len, _ref, _results;
    if (el.classList != null) {
      _ref = name.split(' ');
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        cls = _ref[_i];
        _results.push(el.classList.add(cls));
      }
      return _results;
    } else {
      removeClass(el, name);
      return el.className += " " + name;
    }
  };

  hasClass = function(el, name) {
    if (el.classList != null) {
      return el.classList.contains(name);
    } else {
      return new RegExp("(^| )" + name + "( |$)", 'gi').test(el.className);
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

  Tether.Utils = {
    getScrollParent: getScrollParent,
    getBounds: getBounds,
    getOffsetParent: getOffsetParent,
    extend: extend,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    Evented: Evented
  };

}).call(this);

(function() {
  var MIRROR_LR, MIRROR_TB, OFFSET_MAP, addClass, addOffset, attachmentToOffset, autoToFixedAttachment, debounce, event, extend, getBounds, getOffsetParent, getOuterSize, getScrollParent, getSize, lastCall, offsetToPx, parseAttachment, parseOffset, position, removeClass, tethers, _Tether, _i, _len, _ref, _ref1,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  if (typeof Tether === "undefined" || Tether === null) {
    throw new Error("You must include the utils.js file before tether.js");
  }

  _ref = Tether.Utils, getScrollParent = _ref.getScrollParent, getSize = _ref.getSize, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getOffsetParent = _ref.getOffsetParent, extend = _ref.extend, addClass = _ref.addClass, removeClass = _ref.removeClass;

  debounce = function(fn, time) {
    var pending;
    if (time == null) {
      time = 16;
    }
    pending = false;
    return function() {
      var args,
        _this = this;
      if (pending) {
        return;
      }
      args = arguments;
      pending = true;
      return setTimeout(function() {
        pending = false;
        return fn.apply(_this, args);
      }, time);
    };
  };

  tethers = [];

  position = function() {
    var tether, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tethers.length; _i < _len; _i++) {
      tether = tethers[_i];
      _results.push(tether.position());
    }
    return _results;
  };

  lastCall = null;

  _ref1 = ['resize', 'scroll'];
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    event = _ref1[_i];
    window.addEventListener(event, function() {
      if ((lastCall == null) || (new Date - lastCall) > 16) {
        lastCall = +(new Date);
        return position();
      }
    });
  }

  MIRROR_LR = {
    center: 'center',
    left: 'right',
    right: 'left'
  };

  MIRROR_TB = {
    middle: 'middle',
    top: 'bottom',
    bottom: 'top'
  };

  OFFSET_MAP = {
    top: 0,
    left: 0,
    middle: '50%',
    center: '50%',
    bottom: '100%',
    right: '100%'
  };

  autoToFixedAttachment = function(attachment, relativeToAttachment) {
    var left, top;
    left = attachment.left, top = attachment.top;
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
  };

  attachmentToOffset = function(attachment) {
    var _ref2, _ref3;
    return {
      left: (_ref2 = OFFSET_MAP[attachment.left]) != null ? _ref2 : attachment.left,
      top: (_ref3 = OFFSET_MAP[attachment.top]) != null ? _ref3 : attachment.top
    };
  };

  addOffset = function() {
    var left, offsets, out, top, _j, _len1, _ref2;
    offsets = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    out = {
      top: 0,
      left: 0
    };
    for (_j = 0, _len1 = offsets.length; _j < _len1; _j++) {
      _ref2 = offsets[_j], top = _ref2.top, left = _ref2.left;
      if (typeof top === 'string') {
        top = parseFloat(top, 10);
      }
      if (typeof left === 'string') {
        left = parseFloat(left, 10);
      }
      out.top += top;
      out.left += left;
    }
    return out;
  };

  offsetToPx = function(offset, size) {
    if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
      offset.left = parseFloat(offset.left, 10) / 100 * size.width;
    }
    if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
      offset.top = parseFloat(offset.top, 10) / 100 * size.height;
    }
    return offset;
  };

  parseAttachment = parseOffset = function(value) {
    var left, top, _ref2;
    _ref2 = value.split(' '), top = _ref2[0], left = _ref2[1];
    return {
      top: top,
      left: left
    };
  };

  _Tether = (function() {
    _Tether.modules = [];

    function _Tether(options) {
      this.position = __bind(this.position, this);
      var module, _j, _len1, _ref2, _ref3;
      tethers.push(this);
      this.history = [];
      this.setOptions(options, false);
      _ref2 = Tether.modules;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        module = _ref2[_j];
        if ((_ref3 = module.initialize) != null) {
          _ref3.call(this);
        }
      }
      this.position();
    }

    _Tether.prototype.getClass = function(key) {
      var _ref2, _ref3;
      if ((_ref2 = this.options.classes) != null ? _ref2[key] : void 0) {
        return this.options.classes[key];
      } else if (((_ref3 = this.options.classes) != null ? _ref3[key] : void 0) !== false) {
        if (this.options.classPrefix) {
          return "" + this.options.classPrefix + "-" + key;
        } else {
          return key;
        }
      } else {
        return '';
      }
    };

    _Tether.prototype.setOptions = function(options, position) {
      var defaults, key, _j, _len1, _ref2, _ref3;
      this.options = options;
      if (position == null) {
        position = true;
      }
      defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto',
        classPrefix: 'tether'
      };
      this.options = extend(defaults, this.options);
      _ref2 = this.options, this.element = _ref2.element, this.target = _ref2.target, this.targetModifier = _ref2.targetModifier;
      if (this.target === 'viewport') {
        this.target = document.body;
        this.targetModifier = 'visible';
      } else if (this.target === 'scroll-handle') {
        this.target = document.body;
        this.targetModifier = 'scroll-handle';
      }
      _ref3 = ['element', 'target'];
      for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
        key = _ref3[_j];
        if (this[key].jquery != null) {
          this[key] = this[key][0];
        } else if (typeof this[key] === 'string') {
          this[key] = document.querySelector(this[key]);
        }
        if (this[key] == null) {
          throw new Error("Tether Error: Both element and target must be defined");
        }
      }
      addClass(this.element, this.getClass('element'));
      addClass(this.target, this.getClass('target'));
      if (!this.options.attachment) {
        throw new Error("Tether Error: You must provide an attachment");
      }
      this.targetAttachment = parseAttachment(this.options.targetAttachment);
      this.attachment = parseAttachment(this.options.attachment);
      this.offset = parseOffset(this.options.offset);
      this.targetOffset = parseOffset(this.options.targetOffset);
      if (this.scrollParent != null) {
        this.disable();
      }
      this.scrollParent = getScrollParent(this.target);
      if (this.options.enabled !== false) {
        return this.enable(position);
      }
    };

    _Tether.prototype.getTargetBounds = function() {
      if (this.targetModifier != null) {
        switch (this.targetModifier) {
          case 'visible':
            return {
              top: pageYOffset,
              left: pageXOffset,
              height: innerHeight,
              width: innerWidth
            };
          case 'scroll-handle':
            return {
              top: pageYOffset + innerHeight * (pageYOffset / document.body.scrollHeight),
              left: innerWidth - 15,
              height: innerHeight * 0.98 * (innerHeight / document.body.scrollHeight),
              width: 15
            };
        }
      } else {
        return getBounds(this.target);
      }
    };

    _Tether.prototype.clearCache = function() {
      return this._cache = {};
    };

    _Tether.prototype.cache = function(k, getter) {
      if (this._cache == null) {
        this._cache = {};
      }
      if (this._cache[k] == null) {
        this._cache[k] = getter.call(this);
      }
      return this._cache[k];
    };

    _Tether.prototype.enable = function(position) {
      var _this = this;
      if (position == null) {
        position = true;
      }
      this.addClass(this.getClass('enabled'));
      this.enabled = true;
      this.scrollParent.addEventListener('scroll', this.position);
      if (position) {
        return setTimeout(function() {
          return _this.position();
        });
      }
    };

    _Tether.prototype.disable = function() {
      this.removeClass(this.getClass('enabled'));
      this.enabled = false;
      if (this.scrollParent != null) {
        return this.scrollParent.removeEventListener('scroll', this.position);
      }
    };

    _Tether.prototype.destroy = function() {
      var i, tether, _j, _len1, _results;
      this.disable();
      _results = [];
      for (i = _j = 0, _len1 = tethers.length; _j < _len1; i = ++_j) {
        tether = tethers[i];
        if (tether === this) {
          tethers.splice(i, 1);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    _Tether.prototype.updateAttachClasses = function(elementAttach, targetAttach) {
      var side, sides, _j, _k, _len1, _len2;
      if (elementAttach == null) {
        elementAttach = this.attachment;
      }
      if (targetAttach == null) {
        targetAttach = this.targetAttachment;
      }
      sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
      for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
        side = sides[_j];
        this.removeClass("" + (this.getClass('element-attached')) + "-" + side);
      }
      if (elementAttach.top) {
        this.addClass("" + (this.getClass('element-attached')) + "-" + elementAttach.top);
      }
      if (elementAttach.left) {
        this.addClass("" + (this.getClass('element-attached')) + "-" + elementAttach.left);
      }
      for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
        side = sides[_k];
        this.removeClass("" + (this.getClass('target-attached')) + "-" + side);
      }
      if (targetAttach.top) {
        this.addClass("" + (this.getClass('target-attached')) + "-" + targetAttach.top);
      }
      if (targetAttach.left) {
        return this.addClass("" + (this.getClass('target-attached')) + "-" + targetAttach.left);
      }
    };

    _Tether.prototype.addClass = function(classes) {
      addClass(this.element, classes);
      return addClass(this.target, classes);
    };

    _Tether.prototype.removeClass = function(classes) {
      removeClass(this.element, classes);
      return removeClass(this.target, classes);
    };

    _Tether.prototype.position = function() {
      var elementPos, height, left, manualOffset, manualTargetOffset, module, next, offset, offsetBorder, offsetParent, offsetParentSize, offsetParentStyle, offsetPosition, ret, scrollLeft, scrollTop, side, targetAttachment, targetOffset, targetPos, targetSize, top, width, _j, _k, _len1, _len2, _ref2, _ref3, _ref4,
        _this = this;
      if (!this.enabled) {
        return;
      }
      this.clearCache();
      targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
      this.updateAttachClasses(this.attachment, targetAttachment);
      elementPos = this.cache('element-bounds', function() {
        return getBounds(_this.element);
      });
      width = elementPos.width, height = elementPos.height;
      targetSize = targetPos = this.cache('target-bounds', function() {
        return _this.getTargetBounds();
      });
      offset = offsetToPx(attachmentToOffset(this.attachment), {
        width: width,
        height: height
      });
      targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
      manualOffset = offsetToPx(this.offset, {
        width: width,
        height: height
      });
      manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
      offset = addOffset(offset, manualOffset);
      left = targetPos.left + targetOffset.left - offset.left;
      top = targetPos.top + targetOffset.top - offset.top;
      _ref2 = Tether.modules;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        module = _ref2[_j];
        ret = module.position.call(this, {
          left: left,
          top: top,
          targetAttachment: targetAttachment,
          targetPos: targetPos,
          elementPos: elementPos,
          offset: offset,
          targetOffset: targetOffset,
          manualOffset: manualOffset,
          manualTargetOffset: manualTargetOffset
        });
        if ((ret == null) || typeof ret !== 'object') {
          continue;
        } else if (ret === false) {
          return false;
        } else {
          top = ret.top, left = ret.left;
        }
      }
      next = {
        page: {
          top: top,
          bottom: document.body.scrollHeight - top - height,
          left: left,
          right: document.body.scrollWidth - left - width
        },
        viewport: {
          top: top - pageYOffset,
          bottom: pageYOffset - top - height + innerHeight,
          left: left - pageXOffset,
          right: pageXOffset - left - width + innerWidth
        }
      };
      if (((_ref3 = this.options.optimizations) != null ? _ref3.moveElement : void 0) !== false && (this.targetModifier == null)) {
        offsetParent = this.cache('target-offsetparent', function() {
          return getOffsetParent(_this.target);
        });
        offsetPosition = this.cache('target-offsetparent-bounds', function() {
          return getBounds(offsetParent);
        });
        offsetParentStyle = getComputedStyle(offsetParent);
        offsetParentSize = offsetPosition;
        offsetBorder = {};
        _ref4 = ['top', 'left', 'bottom', 'right'];
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          side = _ref4[_k];
          offsetBorder[side] = parseFloat(offsetParentStyle["border-" + side + "-width"]);
        }
        offsetPosition.left += offsetBorder.left;
        offsetPosition.top += offsetBorder.top;
        offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width;
        offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height;
        if (next.page.top >= offsetPosition.top && next.page.bottom >= offsetPosition.bottom) {
          if (next.page.left >= offsetPosition.left && next.page.right >= offsetPosition.right) {
            scrollTop = offsetParent.scrollTop;
            scrollLeft = offsetParent.scrollLeft;
            next.offset = {
              top: next.page.top - offsetPosition.top + scrollTop + offsetBorder.top,
              left: next.page.left - offsetPosition.left + scrollLeft + offsetBorder.left,
              right: next.page.right - offsetPosition.right + offsetParent.scrollWidth - scrollLeft + offsetBorder.right,
              bottom: next.page.bottom - offsetPosition.bottom + offsetParent.scrollHeight - scrollTop + offsetBorder.bottom
            };
          }
        }
      }
      this.move(next);
      this.history.unshift(next);
      if (this.history.length > 3) {
        this.history.pop();
      }
      return true;
    };

    _Tether.prototype.move = function(position) {
      var css, found, key, moved, offset, offsetParent, offsetParentStyle, point, same, side, transcribe, type, val, write, _j, _k, _len1, _len2, _ref2, _ref3, _ref4,
        _this = this;
      if (this.element.parentNode == null) {
        return;
      }
      same = {};
      for (type in position) {
        same[type] = {};
        for (key in position[type]) {
          found = false;
          _ref2 = this.history;
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            point = _ref2[_j];
            if (((_ref3 = point[type]) != null ? _ref3[key] : void 0) !== position[type][key]) {
              found = true;
              break;
            }
          }
          if (!found) {
            same[type][key] = true;
          }
        }
      }
      css = {
        top: '',
        left: '',
        right: '',
        bottom: ''
      };
      transcribe = function(same, pos) {
        if (same.top) {
          css.top = "" + pos.top + "px";
        } else {
          css.bottom = "" + pos.bottom + "px";
        }
        if (same.left) {
          return css.left = "" + pos.left + "px";
        } else {
          return css.right = "" + pos.right + "px";
        }
      };
      moved = false;
      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
        css.position = 'absolute';
        transcribe(same.page, position.page);
      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
        css.position = 'fixed';
        transcribe(same.viewport, position.viewport);
      } else if ((same.offset != null) && (same.offset.top || same.offset.bottom) && (same.offset.left || same.offset.right)) {
        css.position = 'absolute';
        offsetParent = this.cache('target-offsetparent', function() {
          return getOffsetParent(_this.target);
        });
        if (getOffsetParent(this.element) !== offsetParent) {
          this.element.parentNode.removeChild(this.element);
          offsetParent.appendChild(this.element);
        }
        offsetParentStyle = getComputedStyle(offsetParent);
        offset = extend({}, position.offset);
        _ref4 = ['top', 'left', 'bottom', 'right'];
        for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
          side = _ref4[_k];
          offset[side] -= parseFloat(offsetParentStyle["border-" + side + "-width"]);
        }
        transcribe(same.offset, offset);
        moved = true;
      } else {
        css.position = 'absolute';
        css.top = "" + position.page.top + "px";
        css.left = "" + position.page.left + "px";
      }
      if (!moved && this.element.parentNode.tagName !== 'BODY') {
        this.element.parentNode.removeChild(this.element);
        document.body.appendChild(this.element);
      }
      write = false;
      for (key in css) {
        val = css[key];
        if (this.element.style[key] !== val) {
          write = true;
          break;
        }
      }
      if (write) {
        return extend(this.element.style, css);
      }
    };

    return _Tether;

  })();

  window.Tether = extend(_Tether, Tether);

}).call(this);

(function() {
  var BOUNDS_FORMAT, MIRROR_ATTACH, extend, getBoundingRect, getBounds, getOuterSize, getSize, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = Tether.Utils, getOuterSize = _ref.getOuterSize, getBounds = _ref.getBounds, getSize = _ref.getSize, extend = _ref.extend;

  MIRROR_ATTACH = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
    middle: 'middle'
  };

  BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

  getBoundingRect = function(tether, to) {
    var i, pos, side, size, style, _i, _len;
    if (to === 'scrollParent') {
      to = tether.scrollParent;
    } else if (to === 'window') {
      to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
    }
    if (to.nodeType != null) {
      pos = size = getBounds(to);
      style = getComputedStyle(to);
      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
      for (i = _i = 0, _len = BOUNDS_FORMAT.length; _i < _len; i = ++_i) {
        side = BOUNDS_FORMAT[i];
        if (side === 'top' || side === 'left') {
          to[i] += parseFloat(style["border-" + side + "-width"]);
        } else {
          to[i] -= parseFloat(style["border-" + side + "-width"]);
        }
      }
    }
    return to;
  };

  Tether.modules.push({
    position: function(_arg) {
      var attachment, bounds, changeAttachX, changeAttachY, cls, constraint, eAttachment, height, left, oob, oobClass, p, pin, pinned, pinnedClass, removeClass, removeClasses, side, tAttachment, targetAttachment, targetHeight, targetSize, targetWidth, to, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6,
        _this = this;
      top = _arg.top, left = _arg.left, targetAttachment = _arg.targetAttachment;
      if (!this.options.constraints) {
        return true;
      }
      removeClass = function(prefix) {
        var side, _i, _len, _results;
        _this.removeClass(prefix);
        _results = [];
        for (_i = 0, _len = BOUNDS_FORMAT.length; _i < _len; _i++) {
          side = BOUNDS_FORMAT[_i];
          _results.push(_this.removeClass("" + prefix + "-" + side));
        }
        return _results;
      };
      _ref1 = this.cache('element-bounds', function() {
        return getBounds(_this.element);
      }), height = _ref1.height, width = _ref1.width;
      targetSize = this.cache('target-bounds', function() {
        return _this.getTargetBounds();
      });
      targetHeight = targetSize.height;
      targetWidth = targetSize.width;
      tAttachment = {};
      eAttachment = {};
      removeClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
      _ref2 = this.options.constraints;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        constraint = _ref2[_i];
        if (constraint.outOfBoundsClass) {
          removeClasses.push(constraint.outOfBoundsClass);
        }
        if (constraint.pinnedClass) {
          removeClasses.push(constraint.pinnedClass);
        }
      }
      for (_j = 0, _len1 = removeClasses.length; _j < _len1; _j++) {
        cls = removeClasses[_j];
        removeClass(cls);
      }
      tAttachment = extend({}, targetAttachment);
      eAttachment = extend({}, this.attachment);
      _ref3 = this.options.constraints;
      for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
        constraint = _ref3[_k];
        to = constraint.to, attachment = constraint.attachment, pin = constraint.pin;
        if (attachment == null) {
          attachment = '';
        }
        if (__indexOf.call(attachment, ' ') >= 0) {
          _ref4 = attachment.split(' '), changeAttachY = _ref4[0], changeAttachX = _ref4[1];
        } else {
          changeAttachX = changeAttachY = attachment;
        }
        bounds = getBoundingRect(this, to);
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
          if (top < bounds[1] && tAttachment.top === 'top') {
            if (eAttachment.top === 'bottom') {
              top += targetHeight;
              tAttachment.top = 'bottom';
              top += height;
              eAttachment.top = 'top';
            } else if (eAttachment.top === 'top') {
              top += targetHeight;
              tAttachment.top = 'bottom';
              top -= height;
              eAttachment.top = 'bottom';
            }
          }
          if (top + height > bounds[3] && tAttachment.top === 'bottom') {
            if (eAttachment.top === 'top') {
              top -= targetHeight;
              tAttachment.top = 'top';
              top -= height;
              eAttachment.top = 'bottom';
            } else if (eAttachment.top === 'bottom') {
              top -= targetHeight;
              tAttachment.top = 'top';
              top += height;
              eAttachment.top = 'top';
            }
          }
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
          }
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
          if (left < bounds[0] && eAttachment.left === 'right') {
            left += width;
            eAttachment.left = 'left';
          }
          if (left + width > bounds[2] && eAttachment.left === 'left') {
            left -= width;
            eAttachment.left = 'right';
          }
        }
        if (typeof pin === 'string') {
          pin = (function() {
            var _l, _len3, _ref5, _results;
            _ref5 = pin.split(',');
            _results = [];
            for (_l = 0, _len3 = _ref5.length; _l < _len3; _l++) {
              p = _ref5[_l];
              _results.push(p.trim());
            }
            return _results;
          })();
        } else if (pin === true) {
          pin = ['top', 'left', 'right', 'bottom'];
        }
        pin || (pin = []);
        pinned = [];
        oob = [];
        if (top < bounds[1]) {
          if (__indexOf.call(pin, 'top') >= 0) {
            top = bounds[1];
            pinned.push('top');
          } else {
            oob.push('top');
          }
        }
        if (top + height > bounds[3]) {
          if (__indexOf.call(pin, 'bottom') >= 0) {
            top = bounds[3] - height;
            pinned.push('bottom');
          } else {
            oob.push('bottom');
          }
        }
        if (left < bounds[0]) {
          if (__indexOf.call(pin, 'left') >= 0) {
            left = bounds[0];
            pinned.push('left');
          } else {
            oob.push('left');
          }
        }
        if (left + width > bounds[2]) {
          if (__indexOf.call(pin, 'right') >= 0) {
            left = bounds[2] - width;
            pinned.push('right');
          } else {
            oob.push('right');
          }
        }
        if (pinned.length) {
          pinnedClass = (_ref5 = this.options.pinnedClass) != null ? _ref5 : this.getClass('pinned');
          this.addClass(pinnedClass);
          for (_l = 0, _len3 = pinned.length; _l < _len3; _l++) {
            side = pinned[_l];
            this.addClass("" + pinnedClass + "-" + side);
          }
        }
        if (oob.length) {
          oobClass = (_ref6 = this.options.outOfBoundsClass) != null ? _ref6 : this.getClass('out-of-bounds');
          this.addClass(oobClass);
          for (_m = 0, _len4 = oob.length; _m < _len4; _m++) {
            side = oob[_m];
            this.addClass("" + oobClass + "-" + side);
          }
        }
        if (__indexOf.call(pinned, 'left') >= 0 || __indexOf.call(pinned, 'right') >= 0) {
          eAttachment.left = tAttachment.left = false;
        }
        if (__indexOf.call(pinned, 'top') >= 0 || __indexOf.call(pinned, 'bottom') >= 0) {
          eAttachment.top = tAttachment.top = false;
        }
        if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== this.attachment.top || eAttachment.left !== this.attachment.left) {
          this.updateAttachClasses(eAttachment, tAttachment);
        }
      }
      return {
        top: top,
        left: left
      };
    }
  });

}).call(this);

(function() {
  var getBounds;

  getBounds = Tether.Utils.getBounds;

  Tether.modules.push({
    position: function(_arg) {
      var abutted, bottom, height, left, right, side, sides, targetPos, top, width, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4,
        _this = this;
      top = _arg.top, left = _arg.left;
      _ref = this.cache('element-bounds', function() {
        return getBounds(_this.element);
      }), height = _ref.height, width = _ref.width;
      targetPos = this.getTargetBounds();
      bottom = top + height;
      right = left + width;
      abutted = [];
      if (top <= targetPos.bottom && bottom >= targetPos.top) {
        _ref1 = ['left', 'right'];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          side = _ref1[_i];
          if ((_ref2 = targetPos[side]) === left || _ref2 === right) {
            abutted.push(side);
          }
        }
      }
      if (left <= targetPos.right && right >= targetPos.left) {
        _ref3 = ['top', 'bottom'];
        for (_j = 0, _len1 = _ref3.length; _j < _len1; _j++) {
          side = _ref3[_j];
          if ((_ref4 = targetPos[side]) === top || _ref4 === bottom) {
            abutted.push(side);
          }
        }
      }
      sides = ['left', 'top', 'right', 'bottom'];
      this.removeClass(this.getClass('abutted'));
      for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
        side = sides[_k];
        this.removeClass("" + (this.getClass('abutted')) + "-" + side);
      }
      if (abutted.length) {
        this.addClass(this.getClass('abutted'));
      }
      for (_l = 0, _len3 = abutted.length; _l < _len3; _l++) {
        side = abutted[_l];
        this.addClass("" + (this.getClass('abutted')) + "-" + side);
      }
      return true;
    }
  });

}).call(this);

(function() {
  Tether.modules.push({
    position: function(_arg) {
      var left, result, shift, shiftLeft, shiftTop, top, _ref;
      top = _arg.top, left = _arg.left;
      if (!this.options.shift) {
        return;
      }
      result = function(val) {
        if (typeof val === 'function') {
          return val.call(this, {
            top: top,
            left: left
          });
        } else {
          return val;
        }
      };
      shift = result(this.options.shift);
      if (typeof shift === 'string') {
        shift = shift.split(' ');
        shift[1] || (shift[1] = shift[0]);
        shiftTop = shift[0], shiftLeft = shift[1];
        shiftTop = parseFloat(shiftTop, 10);
        shiftLeft = parseFloat(shiftLeft, 10);
      } else {
        _ref = [shift.top, shift.left], shiftTop = _ref[0], shiftLeft = _ref[1];
      }
      top += shiftTop;
      left += shiftLeft;
      return {
        top: top,
        left: left
      };
    }
  });

}).call(this);
