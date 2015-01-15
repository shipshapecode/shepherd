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
    init: function(options, buttonLocation) {
      var i, step, stepOptions, steps, textLines, tour, _i, _j, _len, _len1, _ref, _ref1;
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
          if (typeof step.text === 'string') {
            textLines = step.text.split('\n');
            if (textLines.length) {
              step.text = textLines;
            }
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
        stepOptions.buttons = [];
        if (i > 0) {
          stepOptions.buttons.push({
            text: 'Back',
            action: tour.back,
            classes: 'shepherd-button-secondary'
          });
        } else {
          stepOptions.button.push({
            text: 'Exit',
            action: tour.cancel,
            classes: 'shepherd-button-secondary'
          });
        }
        if (i < steps.length - 1) {
          stepOptions.buttons.push({
            text: 'Next',
            action: tour.next
          });
        } else {
          stepOptions.buttons.push({
            text: 'Done',
            action: tour.next
          });
        }
        tour.addStep('step-' + i, stepOptions);
      }
      return ready(function() {
        var button, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
        if (options.trigger === 'first-page-visit') {
          if ((_ref2 = location.href) != null ? (_ref3 = _ref2.match(/https:\/\/.+\.p\.eager\.works\//i)) != null ? _ref3.length : void 0 : void 0) {
            tour.start();
          } else if ((((_ref4 = window.Eager) != null ? (_ref5 = _ref4.installs) != null ? (_ref6 = _ref5.preview) != null ? _ref6.appId : void 0 : void 0 : void 0) != null) === 'AalP5veMma6s') {
            tour.start();
          } else if (((_ref7 = window.localStorage) != null ? _ref7.eagerShepherdHasRun : void 0) !== 'true') {
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
          if ((buttonLocation != null ? buttonLocation.appendChild : void 0) != null) {
            buttonLocation.appendChild(button);
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
