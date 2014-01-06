init = ->
  setupTour()

setupTour = ->
  tour = new Tour
    defaults:
      classes: 'shepherd shepherd-open shepherd-theme-arrows'
      scrollTo: true

  tour.addStep 'start',
    title: 'This is Shepherd'
    text: 'Shepherd is a library for guiding users through your interface.'
    attachTo: '.hero-inner h1 bottom'

  tour.addStep 'buttons',
    text: 'Check us out on GitHub or download the latest release.'
    attachTo: '.hero-inner p right'

  tour.start
    hash: true

$ init
