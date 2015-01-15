addEventListener = (el, eventName, handler) ->
  if el.addEventListener
    el.addEventListener eventName, handler
  else
    el.attachEvent "on#{ eventName }", -> handler.call el

ready = (fn) ->
  if document.readyState isnt 'loading'
    fn()
  else if document.addEventListener
    document.addEventListener 'DOMContentLoaded', fn
  else
    document.attachEvent 'onreadystatechange', ->
      fn() if document.readyState isnt 'loading'

ShepherdInstallHelper =
  init: (options) ->
    return unless options?.steps?.length > 0

    tour = new Shepherd.Tour
      defaults:
        classes: "shepherd-element shepherd-open shepherd-theme-#{ options.theme }"

    steps = []

    for step in options.steps
      if step.title and step.text and step.attachToSelector and step.attachToDirection
        textLines = step.text?.split '\n'
        if textLines?.length
          step.text = textLines

        steps.push step

    for step, i in steps
      stepOptions =
        title: step.title
        text: step.text
        showCancelLink: step.showCancelLink
        attachTo: (step.attachToSelector or 'body') + ' ' + step.attachToDirection

      if steps.length is 1
        stepOptions.buttons = [
          text: 'Done'
          action: tour.next
        ]

      if steps.length > 1
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

        if i is steps.length - 1
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
      if options.trigger is 'first-page-visit'
        if location.href?.match(/https\:\/\/(.+)\.s\.eager\.works\//)?.length
          tour.start()

        else if window.Eager?.installs?.preview?.appId? is 'AalP5veMma6s'
          tour.start()

        else if window.localStorage?.eagerShepherdHasRun isnt true
          localStorage?.eagerShepherdHasRun = true
          tour.start()

      if options.trigger is 'button-click'
        button = document.createElement 'button'
        button.className = "shepherd-start-tour-button shepherd-theme-#{ options.theme }"
        button.appendChild document.createTextNode buttonText

        if options.buttonLocation?.appendChild?
          options.buttonLocation.appendChild button

          addEventListener button, 'click', ->
            tour.start()

window.ShepherdInstallHelper = ShepherdInstallHelper
