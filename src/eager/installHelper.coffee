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

options = INSTALL_OPTIONS
tour = null
buttonLocation = null

render = ->
  tour or= new Shepherd.Tour

  steps = []
  for step in options.steps
    if step.text and step.attachToSelector and step.attachToDirection
      if typeof step.text is 'string'
        textLines = step.text.split '\n'
        if textLines.length
          step.text = textLines

      steps.push step

  open = tour.getCurrentStep()?.id

  lastI = -1

  for step, i in steps
    if i is 0
      firstStepSelector = step.attachToSelector

    stepOptions =
      title: step.title
      text: step.text
      showCancelLink: step.showCancelLink
      attachTo: step.attachToSelector + ' ' + step.attachToDirection
      classes: "shepherd-element shepherd-theme-#{ options.theme }"
      scrollTo: options.scrollTo

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

    id = "step-#{ i }"

    existing = tour.getById(id)
    if existing
      existing.setOptions stepOptions
      existing.render()

      if open is id
        tour.show(id)
    else
      tour.addStep 'step-' + i, stepOptions

    lastI = i

  while existing = tour.getById("step-#{ ++lastI }")
    tour.removeStep(existing.id)

  ready ->
    if options.trigger is 'first-page-visit' and not Shepherd.activeTour
      tries = 0
      start = ->
        if document.querySelector(firstStepSelector)
          tour.start()

          if INSTALL_ID isnt 'preview'
            localStorage?.eagerShepherdHasRun = 'true'

        else if tries < 3
          tries++
          setTimeout start, 250

      if INSTALL_ID is 'preview' or window.localStorage?.eagerShepherdHasRun isnt 'true'
        start()

    if options.trigger is 'button-click'
      buttonLocation = Eager.createElement options.buttonLocation, buttonLocation

      button = document.createElement 'button'
      button.className = "shepherd-start-tour-button shepherd-theme-#{ options.theme }"
      button.appendChild document.createTextNode options.buttonText

      if buttonLocation
        buttonLocation.appendChild button

        addEventListener button, 'click', ->
          tour.start()

    else if buttonLocation?.parentNode
      Eager.createElement {method: 'append', selector: 'x:not(x)'}, buttonLocation
      buttonLocation = null

render()

ShepherdInstallHelper = {
  setOptions: (opts) ->
    options = opts

    render()

  tour: tour
}

window.ShepherdInstallHelper = ShepherdInstallHelper
