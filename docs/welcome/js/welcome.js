(function() {
  var completeShepherd, init, setupShepherd;

  init = function() {
    return setupShepherd();
  };

  setupShepherd = function() {
    var shepherd;
    shepherd = new Shepherd({
      defaults: {
        classes: 'shepherd shepherd-open shepherd-theme-arrows',
        scrollTo: true
      }
    });
    shepherd.addStep('welcome', {
      text: 'Shepherd is a javascript library for guiding users through your app. It uses <a href="http://github.hubspot.com/tether/">Tether</a>, another open source library, to position all of its guides.',
      attachTo: '.hero-welcome bottom',
      classes: 'shepherd shepherd-open shepherd-theme-arrows shepherd-transparent-text',
      buttons: [
        {
          text: 'Exit',
          classes: 'shepherd-button-secondary',
          action: function() {
            completeShepherd();
            return shepherd.hide();
          }
        }, {
          text: 'Next',
          action: shepherd.next,
          classes: 'shepherd-button-example-primary'
        }
      ]
    });
    shepherd.addStep('including', {
      title: 'Including',
      text: 'Including Shepherd is easy! Just include <a href="http://github.hubspot.com/tether">Tether</a>, Shepherd, and a Shepherd theme file.',
      attachTo: '.hero-including bottom',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: shepherd.back
        }, {
          text: 'Next',
          action: shepherd.next
        }
      ]
    });
    shepherd.addStep('example', {
      title: 'Example Shepherd',
      text: 'Creating a Shepherd is easy too! Just create Shepherd and add as many steps as you want. Check out the <a href="http://github.hubspot.com/shepherd">documentation</a> to learn more.',
      attachTo: '.hero-example bottom',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: shepherd.back
        }, {
          text: 'Next',
          action: shepherd.next
        }
      ]
    });
    shepherd.addStep('followup', {
      title: 'Learn more',
      text: 'Check us out on GitHub or download the latest release.',
      attachTo: '.hero-followup bottom',
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: shepherd.back
        }, {
          text: 'Done',
          action: function() {
            completeShepherd();
            return shepherd.next();
          }
        }
      ]
    });
    return shepherd.start();
  };

  completeShepherd = function() {
    return $('body').addClass('shepherd-completed');
  };

  $(init);

}).call(this);
