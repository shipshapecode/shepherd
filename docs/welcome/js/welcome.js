(function() {
  var init, setupTour;

  init = function() {
    return setupTour();
  };

  setupTour = function() {
    var tour;
    tour = new Tour({
      defaults: {
        classes: 'drop drop-open drop-theme-arrows',
        scrollTo: true
      }
    });
    tour.addStep('start', {
      title: 'This is Shepherd',
      text: 'Shepherd is amazing...',
      attachTo: '.hero-inner h1 right'
    });
    tour.addStep('buttons', {
      text: 'Here are the actions you can take...',
      attachTo: '.hero-inner p right'
    });
    return tour.start({
      hash: true
    });
  };

  $(init);

}).call(this);
