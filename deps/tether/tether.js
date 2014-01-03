(function() {
  var MIRROR_LR, MIRROR_TB, OFFSET_MAP, addClass, addOffset, attachmentToOffset, autoToFixedAttachment, debounce, event, extend, getBounds, getOffsetParent, getOuterSize, getScrollParent, getSize, lastCall, offsetToPx, parseAttachment, parseOffset, position, removeClass, tethers, _Tether, _i, _len, _ref, _ref1,
    __slice = [].slice,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

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
    top: '0',
    left: '0',
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

    _Tether.prototype.setOptions = function(options, position) {
      var defaults, key, _j, _len1, _ref2, _ref3;
      this.options = options;
      if (position == null) {
        position = true;
      }
      defaults = {
        offset: '0 0',
        targetOffset: '0 0',
        targetAttachment: 'auto auto'
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
      addClass(this.element, 'tether-element');
      addClass(this.target, 'tether-target');
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
      if (position == null) {
        position = true;
      }
      this.addClass('tether-enabled');
      this.enabled = true;
      this.scrollParent.addEventListener('scroll', this.position);
      if (position) {
        return this.position();
      }
    };

    _Tether.prototype.disable = function() {
      this.removeClass('tether-enabled');
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
        this.removeClass("tether-element-attached-" + side);
      }
      if (elementAttach.top) {
        this.addClass("tether-element-attached-" + elementAttach.top);
      }
      if (elementAttach.left) {
        this.addClass("tether-element-attached-" + elementAttach.left);
      }
      for (_k = 0, _len2 = sides.length; _k < _len2; _k++) {
        side = sides[_k];
        this.removeClass("tether-target-attached-" + side);
      }
      if (targetAttach.top) {
        this.addClass("tether-target-attached-" + targetAttach.top);
      }
      if (targetAttach.left) {
        return this.addClass("tether-target-attached-" + targetAttach.left);
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
      targetOffset = addOffset(targetOffset, manualTargetOffset);
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
