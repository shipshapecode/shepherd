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
      var i, j, k, len, len1, ref, ref1, step, stepOptions, steps, textLines, tour;
      if (!((options != null ? (ref = options.steps) != null ? ref.length : void 0 : void 0) > 0)) {
        return;
      }
      tour = new Shepherd.Tour({
        defaults: {
          classes: "shepherd-element shepherd-open shepherd-theme-" + options.theme
        }
      });
      steps = [];
      ref1 = options.steps;
      for (j = 0, len = ref1.length; j < len; j++) {
        step = ref1[j];
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
      for (i = k = 0, len1 = steps.length; k < len1; i = ++k) {
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
        } else if (steps.length > 1) {
          stepOptions.buttons.push({
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
        var button, buttonLocation, ref2, ref3, ref4, ref5;
        if (options.trigger === 'first-page-visit') {
          if (((ref2 = window.Eager) != null ? (ref3 = ref2.installs) != null ? (ref4 = ref3.preview) != null ? ref4.appId : void 0 : void 0 : void 0) === 'AalP5veMma6s') {
            tour.start();
          } else if (((ref5 = window.localStorage) != null ? ref5.eagerShepherdHasRun : void 0) !== 'true') {
            if (typeof localStorage !== "undefined" && localStorage !== null) {
              localStorage.eagerShepherdHasRun = 'true';
            }
            tour.start();
          }
        }
        if (options.trigger === 'button-click') {
          buttonLocation = Eager.createElement(options.buttonLocation);
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
