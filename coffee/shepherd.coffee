{extend, removeClass, addClass, hasClass, Evented, getBounds, uniqueId} = Tether.Utils

Shepherd = new Evented

ATTACHMENT =
  'top': 'bottom center'
  'left': 'middle right'
  'right': 'middle left'
  'bottom': 'top center'

createFromHTML = (html) ->
  el = document.createElement('div')
  el.innerHTML = html
  el.children[0]

matchesSelector = (el, sel) ->
  matches = el.matches ? el.matchesSelector ? el.webkitMatchesSelector ? el.mozMatchesSelector ? el.oMatchesSelector
  return matches.call(el, sel)

parseShorthand = (obj, props) ->
  if not obj?
    return obj
  else if typeof obj is 'object'
    return obj
  else
    vals = obj.split(' ')

    if vals.length > props.length
      vals[0] = vals[0..vals.length - props.length].join(' ')
      vals.splice 1, (vals.length - props.length)

    out = {}
    for prop, i in props
      out[prop] = vals[i]

    out

class Step extends Evented
  constructor: (@tour, options) ->
    @setOptions options

    @

  setOptions: (@options={}) ->
    @destroy()

    @id = @options.id or @id or "step-#{ uniqueId() }"

    if @options.when
      for event, handler of @options.when
        @on event, handler, @

    @options.buttons ?= [
      text: 'Next'
      action: @tour.next
    ]

  getTour: ->
    @tour

  bindAdvance: ->
    # An empty selector matches the step element
    {event, selector} = parseShorthand @options.advanceOn, ['selector', 'event']

    handler = (e) =>
      return unless @isOpen()

      if selector?
        if matchesSelector(e.target, selector)
          @tour.next()
      else
        if @el and e.target is @el
          @tour.next()

    document.body.addEventListener event, handler
    # TODO: this should also bind/unbind on show/hide
    @on 'destroy', ->
      document.body.removeEventListener event, handler

  getAttachTo: ->
    opts = parseShorthand @options.attachTo, ['element', 'on']
    opts ?= {}

    if typeof opts.element is 'string'
      opts.element = document.querySelector opts.element

      if not opts.element?
        throw new Error "Shepherd step's attachTo was not found in the page"

    opts

  setupTether: ->
    if not Tether?
      throw new Error "Using the attachment feature of Shepherd requires the Tether library"

    opts = @getAttachTo()

    attachment = ATTACHMENT[opts.on or 'right']
    if not opts.element?
      opts.element = 'viewport'
      attachment = 'middle center'

    tetherOpts =
      classPrefix: 'shepherd'
      element: @el
      constraints: [
        to: 'window'
        pin: true
        attachment: 'together'
      ]
      target: opts.element
      offset: opts.offset or '0 0'
      attachment: attachment

    @tether = new Tether extend(tetherOpts, @options.tetherOptions)

  show: =>
    if not @el?
      @render()

    addClass @el, 'shepherd-open'

    document.body.setAttribute 'data-shepherd-step', @id

    @setupTether()

    if @options.scrollTo
      setTimeout =>
        @scrollTo()

    @trigger 'show'

  hide: =>
    removeClass @el, 'shepherd-open'

    document.body.removeAttribute 'data-shepherd-step'

    @tether?.destroy()
    @tether = null

    @trigger 'hide'

  isOpen: =>
    hasClass @el, 'shepherd-open'

  cancel: =>
    @tour.cancel()

    @trigger 'cancel'

  complete: =>
    @tour.complete()

    @trigger 'complete'

  scrollTo: =>
    {element} = @getAttachTo()

    element?.scrollIntoView()

  destroy: =>
    if @el?
      document.body.removeChild @el
      delete @el

    @tether?.destroy()
    @tether = null

    @trigger 'destroy'

  render: ->
    if @el?
      @destroy()

    @el = createFromHTML "<div class='shepherd-step #{ @options.classes ? '' }' data-id='#{ @id }'></div>"

    content = document.createElement 'div'
    content.className = 'shepherd-content'
    @el.appendChild content

    header = document.createElement 'header'
    content.appendChild header

    if @options.title?
      header.innerHTML += "<h3 class='shepherd-title'>#{ @options.title }</h3>"
      @el.className += ' shepherd-has-title'

    if @options.showCancelLink
      link = createFromHTML "<a href class='shepherd-cancel-link'>✕</a>"
      header.appendChild link

      @el.className += ' shepherd-has-cancel-link'

      @bindCancelLink link

    if @options.text?
      text = createFromHTML "<div class='shepherd-text'></div>"

      paragraphs = @options.text
      if typeof paragraphs is 'string'
        paragraphs = [paragraphs]

      for paragraph in paragraphs
        text.innerHTML += "<p>#{ paragraph }</p>"

      content.appendChild text

    footer = document.createElement 'footer'

    if @options.buttons
      buttons = createFromHTML "<ul class='shepherd-buttons'></ul>"

      for cfg in @options.buttons
        button = createFromHTML "<li><a class='shepherd-button #{ cfg.classes ? '' }'>#{ cfg.text }</a>"
        buttons.appendChild button

        @bindButtonEvents cfg, button.querySelector('a')

      footer.appendChild buttons

    content.appendChild footer

    document.body.appendChild @el

    @setupTether()

    if @options.advanceOn
      @bindAdvance()

  bindCancelLink: (link) ->
    link.addEventListener 'click', (e) =>
      e.preventDefault()

      @cancel()

  bindButtonEvents: (cfg, el) ->
    cfg.events ?= {}
    if cfg.action?
      # Including both a click event and an action is not supported
      cfg.events.click = cfg.action

    for event, handler of cfg.events
      if typeof handler is 'string'
        page = handler
        handler = =>
          @tour.show page

      el.addEventListener event, handler

    @on 'destroy', ->
      for event, handler of cfg.events
        el.removeEventListener event, handler

class Tour extends Evented
  constructor: (@options={}) ->
    @steps = @options.steps ? []

    # Pass these events onto the global Shepherd object
    for event in ['complete', 'cancel', 'hide', 'start', 'show', 'active', 'inactive']
      do (event) =>
        @on event, (opts={}) =>
          opts.tour = @
          Shepherd.trigger event, opts

    @

  addStep: (name, step) ->
    if not step?
      step = name

    unless step instanceof Step
      if typeof name in ['string', 'number']
        step.id = name.toString()

      step = extend {}, @options.defaults, step

      step = new Step(@, step)
    else
      step.tour = @

    @steps.push step
    
    step

  getById: (id) ->
    for step in @steps when step.id is id
      return step

  getCurrentStep: ->
    @currentStep

  next: =>
    index = @steps.indexOf(@currentStep)

    if index is @steps.length - 1
      @hide index
      @trigger 'complete'
      @done()
    else
      @show(index + 1)

  back: =>
    index = @steps.indexOf(@currentStep)

    @show(index - 1)

  cancel: =>
    @currentStep?.hide()

    @trigger 'cancel'
    @done()

  complete: =>
    @currentStep?.hide()

    @trigger 'complete'
    @done()

  hide: =>
    @currentStep?.hide()

    @trigger 'hide'
    @done()

  done: ->
    Shepherd.activeTour = null

    removeClass document.body, 'shepherd-active'
    @trigger 'inactive', {tour: @}

  show: (key=0) ->
    if @currentStep
      @currentStep.hide()
    else
      addClass document.body, 'shepherd-active'
      @trigger 'active', {tour: @}

    Shepherd.activeTour = @

    if typeof key is 'string'
      next = @getById key
    else
      next = @steps[key]

    if next
      @trigger 'show', {step: next, previous: @currentStep}

      @currentStep = next
      next.show()

  start: ->
    @trigger 'start'

    @currentStep = null
    @next()

extend Shepherd, {Tour, Step, Evented}

window.Shepherd = Shepherd
