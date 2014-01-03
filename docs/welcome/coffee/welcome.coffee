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
    attachTo: '.hero-inner>h1' # Todo fix bug in which spaces in selector make it not work
    tetherOptions:
      attachment: 'middle left'
      targetAttachment: 'middle right'

  tour.addStep 'buttons',
    text: 'Here are the actions you can take...'
    attachTo: '.hero-inner>p' # Todo fix bug in which spaces in selector make it not work
    tetherOptions:
      attachment: 'middle left'
      targetAttachment: 'middle right'

  tour.start
    hash: true

$ init