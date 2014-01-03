init = ->
  setupTour()

setupTour = ->
  tour = new Tour
    defaults:
      classes: 'drop drop-open drop-theme-arrows'
      scrollTo: true

  tour.addStep 'start',
    title: 'This is Shepherd'
    text: 'Shepherd is amazing...'
    attachTo: '.hero-inner h1 right'

  tour.addStep 'buttons',
    text: 'Here are the actions you can take...'
    attachTo: '.hero-inner p right'

  tour.start
    hash: true

$ init
