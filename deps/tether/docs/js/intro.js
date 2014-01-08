(function() {
  var OUTPUT_HTML, SETUP_JS, getOutput, init, run, setupBlock;

  SETUP_JS = "yellowBox = $('.yellow-box', $output);\ngreenBox = $('.green-box', $output);";

  OUTPUT_HTML = function(key) {
    return "<div class=\"scroll-box\">\n  <div class=\"scroll-content\">\n    <div class=\"yellow-box\" data-example=\"" + key + "\"></div>\n    <div class=\"green-box\" data-example=\"" + key + "\"></div>\n  </div>\n</div>";
  };

  getOutput = function($block) {
    var key;
    key = $block.data('example');
    if (key && typeof key === 'string') {
      return $("output[data-example='" + key + "']");
    } else {
      return $block.parents('pre').nextAll('output').first();
    }
  };

  run = function(key) {
    var $block, $output, code;
    if (typeof key === 'string') {
      $block = $("code[data-example='" + key + "']");
    } else {
      $block = key;
    }
    $output = getOutput($block);
    code = $block.text();
    if (code.indexOf(SETUP_JS) === -1) {
      code = SETUP_JS + code;
    }
    window.$output = $output;
    return eval(code);
  };

  setupBlock = function($block) {
    var $output, $scrollBox, $scrollContent, key;
    key = $block.data('example');
    $output = getOutput($block);
    $output.html(OUTPUT_HTML(key));
    $scrollBox = $output.find('.scroll-box');
    $scrollContent = $scrollBox.find('.scroll-content');
    $scrollBox.scrollTop(parseInt($scrollContent.css('height')) / 2 - $scrollBox.height() / 2);
    $scrollBox.scrollLeft(parseInt($scrollContent.css('width')) / 2 - $scrollBox.width() / 2);
    setTimeout(function() {
      return $scrollBox.on('scroll', function() {
        return $output.addClass('scrolled');
      });
    });
    $scrollBox.css('height', "" + ($block.parent().outerHeight()) + "px");
    return run($block);
  };

  init = function() {
    var $blocks, block, _i, _len, _results;
    $blocks = $('code[data-example]');
    _results = [];
    for (_i = 0, _len = $blocks.length; _i < _len; _i++) {
      block = $blocks[_i];
      _results.push(setupBlock($(block)));
    }
    return _results;
  };

  window.EXECUTR_OPTIONS = {
    codeSelector: 'code[executable]'
  };

  $(init);

}).call(this);
