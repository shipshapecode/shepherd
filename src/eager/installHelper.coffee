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

firstStepSelector = undefined

ShepherdInstallHelper =
  init: (options) ->
    return unless options?.steps?.length > 0

    tour = new Shepherd.Tour
      defaults:
        classes: "shepherd-element shepherd-open shepherd-theme-#{ options.theme }"

    steps = []

    for step in options.steps
      if step.title and step.text and step.attachToSelector and step.attachToDirection
        if typeof step.text is 'string'
          textLines = step.text.split '\n'
          if textLines.length
            step.text = textLines

        steps.push step

    for step, i in steps
      if i is 0
        firstStepSelector = step.attachToSelector

      stepOptions =
        title: step.title
        text: step.text
        showCancelLink: step.showCancelLink
        attachTo: step.attachToSelector + ' ' + step.attachToDirection

      stepOptions.buttons = []
      if i > 0
        stepOptions.buttons.push
          text: 'Back'
          action: tour.back
          classes: 'shepherd-button-secondary'
      else if steps.length > 1
        stepOptions.buttons.push
          text: 'Exit'
          action: tour.cancel
          classes: 'shepherd-button-secondary'

      if i < steps.length - 1
        stepOptions.buttons.push
          text: 'Next'
          action: tour.next
      else
        stepOptions.buttons.push
          text: 'Done'
          action: tour.next

      tour.addStep 'step-' + i, stepOptions

    ready ->
      if options.trigger is 'first-page-visit'
        if window.Eager?.installs?.preview?.appId is 'AalP5veMma6s'
          tour.start()

        else if document.querySelector(firstStepSelector) and window.localStorage?.eagerShepherdHasRun isnt 'true'
          localStorage?.eagerShepherdHasRun = 'true'
          tour.start()

      if options.trigger is 'button-click'
        buttonLocation = Eager.createElement options.buttonLocation

        button = document.createElement 'button'
        button.className = "shepherd-start-tour-button shepherd-theme-#{ options.theme }"
        button.appendChild document.createTextNode options.buttonText

        if buttonLocation?.appendChild?
          buttonLocation.appendChild button

          addEventListener button, 'click', ->
            tour.start()

window.ShepherdInstallHelper = ShepherdInstallHelper
