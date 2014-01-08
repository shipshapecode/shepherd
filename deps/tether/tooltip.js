(function() {
  var DropTooltip, Tooltip, defaults;

  DropTooltip = Drop.createContext();

  defaults = {
    attach: 'top center'
  };

  Tooltip = (function() {
    function Tooltip(options) {
      this.options = options;
      this.$target = $(this.options.el);
      this.createDrop();
    }

    Tooltip.prototype.createDrop = function() {
      var _ref;
      if (this.options.attach == null) {
        this.options.attach = defaults.attach;
      }
      return this.dropTooltip = new DropTooltip({
        target: this.$target[0],
        className: 'drop-tooltip-theme-arrows',
        attach: this.options.attach,
        constrainToWindow: true,
        constrainToScrollParent: false,
        openOn: 'hover',
        content: (_ref = this.options.content) != null ? _ref : this.$target.attr('data-tooltip-content')
      });
    };

    return Tooltip;

  })();

  window.Tooltip = Tooltip;

}).call(this);
