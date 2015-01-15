(function() {
  var ShepherdInstallHelper, addEventListener, ready;

  addEventListener = function(el, eventName, handler) {
    if (el.addEventListener) {
      return el.addEventListener(eventName, handler);
    } else {
      return el.attachEvent("on" + eventName, function() {
        return handler.call(el);
      });
    }
  };

  ready = function(fn) {
    if (document.readyState !== 'loading') {
      return fn();
    } else if (document.addEventListener) {
      return document.addEventListener('DOMContentLoaded', fn);
    } else {
      return document.attachEvent('onreadystatechange', function() {
        if (document.readyState !== 'loading') {
          return fn();
        }
      });
    }
  };

  ShepherdInstallHelper = {
    init: function(options) {
      var i, step, stepOptions, steps, textLines, tour, _i, _j, _len, _len1, _ref, _ref1, _ref2;
      if (!((options != null ? (_ref = options.steps) != null ? _ref.length : void 0 : void 0) > 0)) {
        return;
      }
      tour = new Shepherd.Tour({
        defaults: {
          classes: "shepherd-element shepherd-open shepherd-theme-" + options.theme
        }
      });
      steps = [];
      _ref1 = options.steps;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        step = _ref1[_i];
        if (step.title && step.text && step.attachToSelector && step.attachToDirection) {
          textLines = (_ref2 = step.text) != null ? _ref2.split('\n') : void 0;
          if (textLines != null ? textLines.length : void 0) {
            step.text = textLines;
          }
          steps.push(step);
        }
      }
      for (i = _j = 0, _len1 = steps.length; _j < _len1; i = ++_j) {
        step = steps[i];
        stepOptions = {
          title: step.title,
          text: step.text,
          showCancelLink: step.showCancelLink,
          attachTo: (step.attachToSelector || 'body') + ' ' + step.attachToDirection
        };
        if (steps.length === 1) {
          stepOptions.buttons = [
            {
              text: 'Done',
              action: tour.next
            }
          ];
        }
        if (steps.length > 1) {
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
          if (i === steps.length - 1) {
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
        var button, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
        if (options.trigger === 'first-page-visit') {
          if ((_ref3 = location.href) != null ? (_ref4 = _ref3.match(/https\:\/\/(.+)\.s\.eager\.works\//)) != null ? _ref4.length : void 0 : void 0) {
            tour.start();
          } else if ((((_ref5 = window.Eager) != null ? (_ref6 = _ref5.installs) != null ? (_ref7 = _ref6.preview) != null ? _ref7.appId : void 0 : void 0 : void 0) != null) === 'AalP5veMma6s') {
            tour.start();
          } else if (((_ref8 = window.localStorage) != null ? _ref8.eagerShepherdHasRun : void 0) !== 'true') {
            if (typeof localStorage !== "undefined" && localStorage !== null) {
              localStorage.eagerShepherdHasRun = 'true';
            }
            tour.start();
          }
        }
        if (options.trigger === 'button-click') {
          button = document.createElement('button');
          button.className = "shepherd-start-tour-button shepherd-theme-" + options.theme;
          button.appendChild(document.createTextNode(options.buttonText));
          if (((_ref9 = options.buttonLocation) != null ? _ref9.appendChild : void 0) != null) {
            options.buttonLocation.appendChild(button);
            return addEventListener(button, 'click', function() {
              return tour.start();
            });
          }
        }
      });
    }
  };

  window.ShepherdInstallHelper = ShepherdInstallHelper;

}).call(this);
