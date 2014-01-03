(function() {
  var init, isMobile, setupBrowserDemo, setupHero;

  isMobile = $(window).width() < 567;

  init = function() {
    setupHero();
    return setupBrowserDemo();
  };

  setupHero = function() {
    var $target, frameLengthMS, frames, openAllDrops, openIndex, openNextDrop, position, positions, _i, _len;
    $target = $('.tether-target-demo');
    positions = ['top left', 'left top', 'left bottom', 'bottom left', 'bottom right', 'right bottom', 'right top', 'top right'];
    if (isMobile) {
      positions = ['top left', 'bottom left', 'bottom right', 'top right'];
    }
    window.drops = {};
    for (_i = 0, _len = positions.length; _i < _len; _i++) {
      position = positions[_i];
      drops[position] = new Drop({
        target: $target[0],
        className: 'drop-tooltip-theme-arrows',
        attach: position,
        constrainToScrollParent: true,
        openOn: '',
        content: $.map(position.split(' '), function(word) {
          return word.substr(0, 1).toUpperCase() + word.substr(1);
        }).join(' ')
      });
      drops[position].$drop.addClass("drop-attached-" + (position.replace(' ', '-')));
    }
    openIndex = 0;
    frames = 0;
    frameLengthMS = 10;
    openAllDrops = function() {
      var drop, _results;
      _results = [];
      for (position in drops) {
        drop = drops[position];
        _results.push(drop.open());
      }
      return _results;
    };
    openNextDrop = function() {
      var drop;
      for (position in drops) {
        drop = drops[position];
        drop.close();
      }
      drops[positions[openIndex]].open();
      openIndex = (openIndex + 1) % positions.length;
      if (frames > 20) {
        return openAllDrops();
      }
      frames += 1;
      return setTimeout(openNextDrop, frameLengthMS * frames);
    };
    if (isMobile) {
      drops['top left'].open();
      return drops['bottom right'].open();
    } else {
      return openNextDrop();
    }
  };

  setupBrowserDemo = function() {
    var $browserContents, $browserDemo, $iframe, $sections, $startPoint, $stopPoint, setSection;
    $browserDemo = $('.browser-demo.showcase');
    $startPoint = $('.browser-demo-start-point');
    $stopPoint = $('.browser-demo-stop-point');
    $iframe = $('.browser-window iframe');
    $browserContents = $('.browser-content .browser-demo-inner');
    $sections = $('.browser-demo-section');
    $('body').append("<style>\n    table.showcase.browser-demo.fixed-bottom {\n        top: " + $sections.length + "00%\n    }\n</style>");
    $(window).scroll(function() {
      var scrollTop;
      scrollTop = $(window).scrollTop();
      if ($startPoint.position().top < scrollTop && scrollTop + window.innerHeight < $stopPoint.position().top) {
        $browserDemo.removeClass('fixed-bottom');
        $browserDemo.addClass('fixed');
        return $sections.each(function() {
          var $section;
          $section = $(this);
          if (($section.position().top < scrollTop && scrollTop < $section.position().top + $section.outerHeight())) {
            setSection($section.data('section'));
          }
          return true;
        });
      } else {
        $browserDemo.removeAttr('data-section');
        $browserDemo.removeClass('fixed');
        if (scrollTop + window.innerHeight > $stopPoint.position().top) {
          return $browserDemo.addClass('fixed-bottom');
        } else {
          return $browserDemo.removeClass('fixed-bottom');
        }
      }
    });
    $iframe.load(function() {
      var $items, iframeWindow;
      iframeWindow = $iframe[0].contentWindow;
      $items = $iframe.contents().find('.item');
      return $items.each(function(i) {
        var $item, drop;
        $item = $(this);
        drop = new iframeWindow.Drop({
          target: $item[0],
          className: 'drop-theme-arrows',
          attach: 'right top',
          constrainToWindow: true,
          openOn: 'click',
          content: '<div class="drop-demo-spacer"></div>'
        });
        $item.data('drop', drop);
        return drop.$drop.addClass("drop-attached-right-top");
      });
    });
    return setSection = function(section) {
      var closeAllItems, openExampleItem;
      $browserDemo.attr('data-section', section);
      $('.section-copy').removeClass('active');
      $(".section-copy[data-section=\"" + section + "\"]").addClass('active');
      openExampleItem = function() {
        if (isMobile) {
          return $iframe.contents().find('.item:first').data().drop.open();
        } else {
          return $iframe.contents().find('.item:eq(2)').data().drop.open();
        }
      };
      closeAllItems = function() {
        return $iframe.contents().find('.item').each(function() {
          return $(this).data().drop.close() || true;
        });
      };
      switch (section) {
        case 'intro':
          closeAllItems();
          return openExampleItem();
        case 'explain':
          closeAllItems();
          return openExampleItem();
        case 'resize':
          closeAllItems();
          return openExampleItem();
        case 'outro':
          closeAllItems();
          return openExampleItem();
      }
    };
  };

  init();

}).call(this);
