(function() {
  var ShepherdInstallHelper, addEventListener, buttonLocation, firstStepSelector, options, ready, render, tour;

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

  firstStepSelector = void 0;

  options = INSTALL_OPTIONS;

  tour = null;

  buttonLocation = null;

  render = function() {
    var existing, i, id, j, k, lastI, len, len1, open, ref, ref1, step, stepOptions, steps, textLines;
    tour || (tour = new Shepherd.Tour);
    steps = [];
    ref = options.steps;
    for (j = 0, len = ref.length; j < len; j++) {
      step = ref[j];
      if (step.text && step.attachToSelector && step.attachToDirection) {
        if (typeof step.text === 'string') {
          textLines = step.text.split('\n');
          if (textLines.length) {
            step.text = textLines;
          }
        }
        steps.push(step);
      }
    }
    open = (ref1 = tour.getCurrentStep()) != null ? ref1.id : void 0;
    lastI = -1;
    for (i = k = 0, len1 = steps.length; k < len1; i = ++k) {
      step = steps[i];
      if (i === 0) {
        firstStepSelector = step.attachToSelector;
      }
      stepOptions = {
        title: step.title,
        text: step.text,
        showCancelLink: step.showCancelLink,
        attachTo: step.attachToSelector + ' ' + step.attachToDirection,
        classes: "shepherd-element shepherd-theme-" + options.theme,
        scrollTo: options.scrollTo
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
      id = "step-" + i;
      existing = tour.getById(id);
      if (existing) {
        existing.setOptions(stepOptions);
        existing.render();
        if (open === id) {
          tour.show(id);
        }
      } else {
        tour.addStep('step-' + i, stepOptions);
      }
      lastI = i;
    }
    while (existing = tour.getById("step-" + (++lastI))) {
      tour.removeStep(existing.id);
    }
    return ready(function() {
      var button, ref2, start, tries;
      if (options.trigger === 'first-page-visit' && !Shepherd.activeTour) {
        tries = 0;
        start = function() {
          if (document.querySelector(firstStepSelector)) {
            tour.start();
            if (INSTALL_ID !== 'preview') {
              return typeof localStorage !== "undefined" && localStorage !== null ? localStorage.eagerShepherdHasRun = 'true' : void 0;
            }
          } else if (tries < 3) {
            tries++;
            return setTimeout(start, 250);
          }
        };
        if (INSTALL_ID === 'preview' || ((ref2 = window.localStorage) != null ? ref2.eagerShepherdHasRun : void 0) !== 'true') {
          start();
        }
      }
      if (options.trigger === 'button-click') {
        buttonLocation = Eager.createElement(options.buttonLocation, buttonLocation);
        button = document.createElement('button');
        button.className = "shepherd-start-tour-button shepherd-theme-" + options.theme;
        button.appendChild(document.createTextNode(options.buttonText));
        if (buttonLocation) {
          buttonLocation.appendChild(button);
          return addEventListener(button, 'click', function() {
            return tour.start();
          });
        }
      } else if (buttonLocation != null ? buttonLocation.parentNode : void 0) {
        Eager.createElement({
          method: 'append',
          selector: 'x:not(x)'
        }, buttonLocation);
        return buttonLocation = null;
      }
    });
  };

  render();

  ShepherdInstallHelper = {
    setOptions: function(opts) {
      options = opts;
      return render();
    },
    tour: tour
  };

  window.ShepherdInstallHelper = ShepherdInstallHelper;

}).call(this);
