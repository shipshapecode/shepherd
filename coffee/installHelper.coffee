ready = (fn) ->
  if document.addEventListener
    document.addEventListener 'DOMContentLoaded', fn
  else
    document.attachEvent 'onreadystatechange', ->
      if document.readyState is 'interactive'
        fn()

ShepherdInstallHelper =
  init: (options) ->
    return unless options?.steps?.length > 0

    tour = new Shepherd.Tour
      defaults:
        classes: 'shepherd-element shepherd-open shepherd-theme-arrows'

    sanitizedSteps = []

    for step in options.steps
      if step.title and step.text and step.attachToSelector and step.attachToDirection
        textLines = step.text?.split('\n')
        if textLines?.length
          step.text = textLines

        sanitizedSteps.push step

    for step, i in sanitizedSteps
      stepOptions =
        title: step.title
        text: step.text
        showCancelLink: step.showCancelLink
        attachTo: (step.attachToSelector || 'body') + ' ' +  step.attachToDirection

      if sanitizedSteps.length is 1
        stepOptions.buttons = [
          text: 'Done'
          action: tour.next
        ]

      if sanitizedSteps.length > 1
        stepOptions.buttons = [
          text: 'Back'
          classes: 'shepherd-button-secondary'
          action: tour.back
        ,
          text: 'Next'
          action: tour.next
        ]

        if i is 0
          stepOptions.buttons = [
            text: 'Exit'
            classes: 'shepherd-button-secondary'
            action: tour.cancel
          ,
            text: 'Next'
            action: tour.next
            classes: 'shepherd-button-example-primary'
          ]

        if i is sanitizedSteps.length - 1
          stepOptions.buttons = [
            text: 'Back'
            classes: 'shepherd-button-secondary'
            action: tour.back
          ,
            text: 'Done'
            action: tour.next
          ]

      tour.addStep 'step-' + i, stepOptions

    ready ->
      tour.start()

window.ShepherdInstallHelper = ShepherdInstallHelper
