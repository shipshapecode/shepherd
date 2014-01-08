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
