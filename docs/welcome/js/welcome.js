(function() {
  var init, setupTour;

  init = function() {
    return setupTour();
  };

  setupTour = function() {
    var tour;
    tour = new Tour({
      defaults: {
        classes: 'shepherd shepherd-open shepherd-theme-arrows',
        scrollTo: true
      }
    });
    tour.addStep('start', {
      title: 'This is Shepherd',
      text: 'Shepherd is a library for guiding users through your interface.',
      attachTo: '.hero-inner h1 bottom'
    });
    tour.addStep('buttons', {
      text: 'Check us out on GitHub or download the latest release.',
      attachTo: '.hero-inner p right',
      buttons: [
        {
          text: "Back",
          action: tour.back
        }, {
          text: "Done",
          action: tour.cancel
        }
      ]
    });
    return tour.start({
      hash: true
    });
  };

  $(init);

}).call(this);
