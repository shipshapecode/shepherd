{extend, removeClass, addClass, Evented} = Tether.Utils

ATTACHMENT =
  'top': 'top center'
  'left': 'middle right'
  'right': 'middle left'
  'bottom': 'bottom center'

uniqueId = do ->
  id = 0
  ->
    id++

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
  constructor: (@shepherd, options) ->
    @setOptions options

  setOptions: (@options={}) ->
    @destroy()

    @id = @options.id or @id or "step-#{ uniqueId() }"

    if @options.when
      for event, handler of @options.when
        @on event, handler, @

    @options.buttons ?= [
      text: 'Next'
      action: @shepherd.next
    ]

  bindAdvance: ->
    # An empty selector matches the step element
    {event, selector} = parseShorthand @options.advanceOn, ['event', 'selector']

    handler = (e) =>
      if selector?
        if matchesSelector(e.target, selector)
          @shepherd.advance()
      else
        if @el and e.target is @el
          @shepherd.advance()

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

    @tether?.enable()

    if @options.scrollTo
      setTimeout =>
        @scrollTo()

    @trigger 'show'

  hide: =>
    removeClass @el, 'shepherd-open'

    @tether?.disable()

    @trigger 'hide'

  cancel: =>
    @hide()

    @trigger 'cancel'

  complete: =>
    @hide()

    @trigger 'complete'

  scrollTo: =>
    {element} = @getAttachTo()
    return unless element?

    $attachTo = jQuery element

    {top, left} = $attachTo.offset()
    height = $attachTo.outerHeight()

    offset = $(@el).offset()
    elTop = offset.top
    elLeft = offset.left
    elHeight = $(@el).outerHeight()

    if top < pageYOffset or elTop < pageYOffset
      jQuery(document.body).scrollTop(Math.min(top, elTop) - 10)
    else if (top + height) > (pageYOffset + innerHeight) or (elTop + elHeight) > (pageYOffset + innerHeight)
      jQuery(document.body).scrollTop(Math.max(top + height, elTop + elHeight) - innerHeight + 10)

  destroy: =>
    if @el?
      document.body.removeChild @el
      delete @el

    @tether?.destroy()

    @trigger 'destroy'

  render: ->
    if @el?
      @destroy()

    @el = createFromHTML "<div class='shepherd-step #{ @options.classes ? '' }' data-id='#{ @id }'></div>"

    content = document.createElement 'div'
    content.className = 'shepherd-content'
    @el.appendChild content

    if @options.title?
      header = document.createElement 'header'
      header.innerHTML = "<h3 class='shepherd-title'>#{ @options.title }</h3>"
      @el.className += ' shepherd-has-title'
      content.appendChild header

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

  bindButtonEvents: (cfg, el) ->
    cfg.events ?= {}
    if cfg.action?
      # Including both a click event and an action is not supported
      cfg.events.click = cfg.action

    for event, handler of cfg.events
      if typeof handler is 'string'
        page = handler
        handler = =>
          @shepherd.show page

      el.addEventListener event, handler

    @on 'destroy', ->
      for event, handler of cfg.events
        el.removeEventListener event, handler

class Shepherd extends Evented
  constructor: (@options={}) ->
    @steps = @options.steps ? []

  addStep: (name, step) ->
    if not step?
      step = name
    else
      step.id = name

    step = extend {}, @options.defaults, step

    @steps.push new Step(@, step)

  getById: (id) ->
    for step in @steps when step.id is id
      return step

  next: =>
    index = @steps.indexOf(@currentStep)

    if index is @steps.length - 1
      @hide index
      @trigger 'complete'
    else
      @show(index + 1)

  back: =>
    index = @steps.indexOf(@currentStep)

    @show(index - 1)

  cancel: =>
    @currentStep?.cancel()

    @trigger 'cancel'

  hide: =>
    @currentStep?.hide()

    @trigger 'hide'

  show: (key=0) ->
    if @currentStep
      @currentStep.hide()

    if typeof key is 'string'
      next = @getById key
    else
      next = @steps[key]

    if next
      @trigger 'shown', {step: next, previous: @currentStep}

      @currentStep = next
      next.show()

  start: ->
    @currentStep = null
    @next()

window.Shepherd = Shepherd