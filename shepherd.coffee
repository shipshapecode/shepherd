class Sheep
  # This is not actually used for anything
  # Just wanted to name a class Sheep

ATTACHMENT =
  'top': 'top center'
  'left': 'middle right'
  'right': 'middle left'
  'bottom': 'bottom center'

uniqueId = do ->
  id = 0
  ->
    id++

extend = (out={}) ->
  args = []
  Array::push.apply(args, arguments)

  for obj in args[1..] when obj
    for own key, val of obj
      out[key] = val

  out

createFromHTML = (html) ->
  el = document.createElement('div')
  el.innerHTML = html
  el.children[0]

removeClass = (el, name) ->
  el.className = el.className.replace new RegExp("(^| )#{ name.split(' ').join('|') }( |$)", 'gi'), ' '

addClass = (el, name) ->
  removeClass el, name
  el.className += " #{ name }"

addEventListener = (el, event, handler) ->
  if el.addEventListener?
    el.addEventListener event, handler, false
  else
    el.attachEvent "on#{ event }", handler

removeEventListener = (el, event, handler) ->
  if el.removeEventListener?
    el.removeEventListener event, handler, false
  else
    el.detachEvent "on#{ event }", handler

matchesSelector = (el, sel) ->
  matches = el.matches ? el.matchesSelector ? el.webkitMatchesSelector ? el.mozMatchesSelector ? el.oMatchesSelector
  if matches?
    return matches.call(el, sel)
  else
    # IE 8
    list = document.querySelectorAll(sel)
    for element in list when element is el
      return true

    return false

parseShorthand = (obj, props) ->
  if not obj?
    return obj
  else if typeof obj is 'object'
    return obj
  else
    vals = obj.split(' ')

    out = {}
    for prop, i in props
      out[prop] = vals[i]

    out

class Evented
  on: (event, handler, ctx, once=false) ->
    @bindings ?= {}
    @bindings[event] ?= []
    @bindings[event].push {handler, ctx, once}

  once: (event, handler, ctx) ->
    @on(event, handler, ctx, true)

  off: (event, handler) ->
    return unless @bindings?[event]?

    if not handler?
      delete @bindings[event]
    else
      i = 0
      while i < @bindings[event].length
        if @bindings[event][i].handler is handler
          @bindings[event].splice i, 1
        else
          i++

  trigger: (event, args...) ->
    if @bindings?[event]
      i = 0
      while i < @bindings[event].length
        {handler, ctx, once} = @bindings[event][i]

        handler.apply(ctx ? @, args)

        if once
          @bindings[event].splice i, 1
        else
          i++

class Step extends Evented
  constructor: (@tour, options) ->
    @setOptions options

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

  bindAdvance: ->
    # An empty selector matches the step element
    {event, selector} = parseShorthand @options.advanceOn, ['event', 'selector']

    handler = (e) =>
      if selector?
        if matchesSelector(e.target, selector)
          @tour.advance()
      else
        if @el and e.target is @el
          @tour.advance()

    addEventListener document.body, event, handler
    # TODO: this should also bind/unbind on show/hide
    @on 'destroy', ->
      removeEventListener document.body, event, handler

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
      element: @el
      target: opts.element
      offset: opts.offset or '0 0'
      attachment: attachment

    @tether = new Tether extend(tetherOpts, @options.tetherOptions)

  show: =>
    if not @el?
      @render()

    removeClass @el, 'shepherd-hidden'

    @tether?.enable()

    if @options.scrollTo
      setTimeout =>
        @scrollTo()

    @trigger 'show'

  hide: =>
    addClass @el, 'shepherd-hidden'

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
    content.className = 'drop-content'
    @el.appendChild content

    if @options.title?
      header = document.createElement 'header'
      header.innerHTML = "<h3 class='shepherd-title'>#{ @options.title }</h3>"
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

        @bindButtonEvents cfg, button

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
          @tour.show page

      addEventListener el, event, handler

    @on 'destroy', ->
      for event, handler of cfg.events
        removeEventListener el, event, handler

class Tour
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

    @show(index + 1)

  back: =>
    index = @steps.indexOf(@currentStep)

    @show(index - 1)

  cancel: =>
    @currentStep?.cancel()

  hide: =>
    @currentStep?.hide()

  show: (key=0) ->
    if @currentStep
      @currentStep.hide()

    if typeof key is 'string'
      next = @getById key
    else
      next = @steps[key]

    if next
      @currentStep = next
      next.show()

  start: ->
    @currentStep = null
    @next()

window.Tour = Tour

# tour = new Tour
#   defaults:
#     classes: 'drop drop-open drop-theme-arrows'
#     scrollTo: true

# tour.addStep 'start',
#   title: "Welcome to KaPow!"
#   text: "KaPow is the ultimate comic book marketplace.  We supply over six
#   hundred tons of comic books to the waste management industry each year.  The
#   burning of these books supplies enough energy to power eight hundred American
#   homes."
#   tetherOptions:
#     attachment: 'middle center'
#     targetAttachment: 'middle center'

# tour.addStep
#   title: "Are you a seller, or a waste management professional?"
#   buttons: [
#     text: "Seller"
#     action: 'seller-start'
#   ,
#     text: "Waste Management Pro"
#     action: 'wmp-start'
#   ]

# tour.addStep 'seller-start',
#   text: [
#     "Selling is the ultimate way to unload your useless 'art'.",
#     "Begin by clicking the 'Start Selling' button."
#   ]
#   attachTo: 'a.small.button:first-of-type bottom'
#   advanceOn: 'click button.start-selling'
#   classes: 'tour-wide drop drop-open drop-theme-arrows'

# tour.addStep 'wmp-start',
#   text: [
#     "Thousands of pounds of priceless memories can be in your furnaces in
#     as little as three days!",
#     "Begin by entering your Waste Management Licence number below."
#   ]
#   attachTo:
#     element: 'input[placeholder="large-12.columns"]'
#     on: 'bottom'
#     classes: 'tour-highlight'
#     offset: '2px 0'
#   advanceOn: 'submit form.wmp-start'
#   when:
#     shown: ->
#     completed: ->
#     cancelled: ->
#     hidden: ->
#   buttons: [
#     text: "Back"
#     action: tour.back
#   ,
#     text: "Cancel"
#     action: tour.cancel
#   ,
#     text: "Skip"
#     action: tour.next
#   ]

# tour.start
#   hash: true

#tour.completed 'seller-start'
