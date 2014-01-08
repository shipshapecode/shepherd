(function() {
  var $;

  $ = jQuery;

  Tether.modules.push({
    initialize: function() {
      var dot, el, type, _i, _len, _ref, _results;
      this.markers = {};
      _ref = ['target', 'element'];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        el = document.createElement('div');
        el.className = this.getClass("" + type + "-marker");
        dot = document.createElement('div');
        dot.className = this.getClass('marker-dot');
        el.appendChild(dot);
        this[type].appendChild(el);
        _results.push(this.markers[type] = {
          dot: dot,
          el: el
        });
      }
      return _results;
    },
    position: function(_arg) {
      var manualOffset, manualTargetOffset, offset, offsets, side, type, val;
      manualOffset = _arg.manualOffset, manualTargetOffset = _arg.manualTargetOffset;
      offsets = {
        element: manualOffset,
        target: manualTargetOffset
      };
      for (type in offsets) {
        offset = offsets[type];
        for (side in offset) {
          val = offset[side];
          if (typeof val !== 'string' || (val.indexOf('%') === -1 && val.indexOf('px') === -1)) {
            val += 'px';
          }
          if (this.markers[type].dot.style[side] !== val) {
            this.markers[type].dot.style[side] = val;
          }
        }
      }
      return true;
    }
  });

}).call(this);
