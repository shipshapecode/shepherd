init = ->
  setupTour()

setupTour = ->
  tour = new Tour
    defaults:
      classes: 'shepherd shepherd-open shepherd-theme-arrows'
      scrollTo: true

  tour.addStep 'welcome',
    text: 'Shepherd is a javascript library for guiding users through your app. It uses <a href="http://github.hubspot.com/tether/">Tether</a>, another open source library, to position all of its guides.'
    attachTo: '.hero-welcome bottom'
    buttons: [
      text: 'Next'
      action: tour.next
    ]

  tour.addStep 'including',
    title: 'Including'
    text: 'Including Shepherd is easy! Just include <a href="http://github.hubspot.com/tether">Tether</a>, Shepherd, and a Shepherd theme file.'
    attachTo: '.hero-including bottom'

  tour.addStep 'example',
    title: 'Example Shepherd'
    text: 'Creating a Shepherd is easy too! Just create Shepherd and add as many steps as you want. Check out the <a href="http://github.hubspot.com/shepherd">documentation</a> to learn more.'
    attachTo: '.hero-example bottom'

  tour.addStep 'followup',
    title: 'Learn more'
    text: 'Check us out on GitHub or download the latest release.'
    attachTo: '.hero-followup bottom'
    buttons: [
      text: 'Back'
      action: tour.back
    ,
      text: 'Done'
      action: ->
        $('body').addClass('shepherd-completed')
        tour.next()
    ]

  tour.start
    hash: true

$ init
