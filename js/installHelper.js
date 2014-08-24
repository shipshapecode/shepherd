(function() {
  var ShepherdInstallHelper, ready;

  ready = function(fn) {
    if (document.addEventListener) {
      return document.addEventListener('DOMContentLoaded', fn);
    } else {
      return document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'interactive') {
          return fn();
        }
      });
    }
  };

  ShepherdInstallHelper = {
    init: function(options) {
      var i, sanitizedSteps, step, stepOptions, textLines, tour, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      if (!((options != null ? (_ref = options.steps) != null ? _ref.length : void 0 : void 0) > 0)) {
        return;
      }
      tour = new Shepherd.Tour({
        defaults: {
          classes: 'shepherd-element shepherd-open shepherd-theme-arrows'
        }
      });
      sanitizedSteps = [];
      _ref1 = options.steps;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        step = _ref1[_i];
        if (step.title && step.text && step.attachToSelector && step.attachToDirection) {
          textLines = (_ref2 = step.text) != null ? _ref2.split('\n') : void 0;
          if (textLines != null ? textLines.length : void 0) {
            step.text = textLines;
          }
          sanitizedSteps.push(step);
        }
      }
      for (i = _j = 0, _len1 = sanitizedSteps.length; _j < _len1; i = ++_j) {
        step = sanitizedSteps[i];
        stepOptions = {
          title: step.title,
          text: step.text,
          showCancelLink: step.showCancelLink,
          attachTo: (step.attachToSelector || 'body') + ' ' + step.attachToDirection
        };
        if (sanitizedSteps.length === 1) {
          stepOptions.buttons = [
            {
              text: 'Done',
              action: tour.next
            }
          ];
        }
        if (sanitizedSteps.length > 1) {
          stepOptions.buttons = [
            {
              text: 'Back',
              classes: 'shepherd-button-secondary',
              action: tour.back
            }, {
              text: 'Next',
              action: tour.next
            }
          ];
          if (i === 0) {
            stepOptions.buttons = [
              {
                text: 'Exit',
                classes: 'shepherd-button-secondary',
                action: tour.cancel
              }, {
                text: 'Next',
                action: tour.next,
                classes: 'shepherd-button-example-primary'
              }
            ];
          }
          if (i === sanitizedSteps.length - 1) {
            stepOptions.buttons = [
              {
                text: 'Back',
                classes: 'shepherd-button-secondary',
                action: tour.back
              }, {
                text: 'Done',
                action: tour.next
              }
            ];
          }
        }
        tour.addStep('step-' + i, stepOptions);
      }
      return ready(function() {
        return tour.start();
      });
    }
  };

  window.ShepherdInstallHelper = ShepherdInstallHelper;

}).call(this);
