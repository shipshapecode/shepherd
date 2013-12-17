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
  if typeof obj is 'object'
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
    return unless @bindings?

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
    if @bindings[event]
      i = 0
      while i < @bindings[event].length
        {handler, ctx, once} = @bindings[event][i]

        handler.apply(ctx ? @, args)

        if once
          @bindings[event].splice i, 1
        else
          i++

class Step extends Evented
  constructor: (options) ->
    @setOptions options

  setOptions: (@options={}) ->
    @destroy()

    @id = @options.id or @id or uniqueId()

    if @options.when
      for event, handler of @options.when
        @on event, handler, @

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

  setupTether: ->
    if not Tether?
      throw new Error "Using the attachment feature of Shepherd requires the Tether library"

    opts = parseShorthand @options.attachTo, ['element']

    if typeof opts.element is 'string'
      opts.element = document.querySelector opts.element

    @tether = new Tether
      element: @el
      target: opts.element
      offset: opts.offset or '0 0'
      attachment: ATTACHMENT[opts.on or 'right']

  show: =>
    if not @el?
      @render()

    removeClass @el, 'shepherd-hidden'

    @tether?.enable()

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

    if @options.title?
      header = document.createElement 'header'
      header.innerHTML = "<h3 class='shepherd-title'>#{ @options.title }</h3>"
      @el.appendChild header

    if @options.text?
      content = createFromHTML "<div class='shepherd-text'></div>"

      paragraphs = @options.text
      if typeof paragraphs is 'string'
        paragraphs = [paragraphs]

      for paragraph in paragraphs
        content.innerHTML += "<p>#{ paragraph }</p>"

      @el.appendChild content

    footer = document.createElement 'footer'

    if @options.buttons
      buttons = createFromHTML "<ul class='shepherd-buttons'></ul>"

      for cfg in @options.button
        button = createFromHTML "<li><a class='shepherd-button #{ cfg.classes ? '' }'>#{ cfg.text }</a>"
        buttons.appendChild button

        @bindButtonEvents cfg, button

      footer.appendChild buttons

    @el.appendChild footer

    document.body.appendChild @el

    if @options.attachTo
      @setupTether()

    if @options.advanceOn
      @bindAdvance()

  bindButtonEvents: (cfg, el) ->
    cfg.events ?= {}
    if cfg.action?
      # Including both a click event and an action is not supported
      cfg.events.click = cfg.action

    for event, handler of cfg.events
      addEventListener el, event, handler

    @on 'destroy', ->
      for event, handler of cfg.events
        removeEventListener el, event, handler

class Tour
  initialize: (@options={}) ->
    @steps = @options.steps ? []

  addStep: (step) ->
    @steps.push step

  next: ->
    index = 0
    if @currentStep
      index = @steps.indexOf(@currentStep)

    @currentStep = @steps[index]

    @currentStep.show @

tour = new Tour
tour.addStep 'start',
  title: "Welcome to KaPow!"
  text: "KaPow is the ultimate comic book marketplace.  We supply over six
  hundred tons of comic books to the waste management industry each year.  The
  burning of these books supplies enough energy to power eight hundred American
  homes."
  
tour.addStep
  title: "Are you a seller, or a waste management professional?"
  buttons: [
    text: "Seller"
    action: 'seller-start'
  ,
    text: "Waste Management Pro"
    action: 'wmp-start'
  ]

tour.addStep 'seller-start',
  text: [
    "Selling is the ultimate way to unload your useless 'art'.",
    "Begin by clicking the 'Start Selling' button."
  ]
  attachTo: 'bottom button.start-selling'
  advanceOn: 'click button.start-selling'
  classes: 'tour-wide'
  
tour.addStep 'wmp-start',
  text: [
    "Thousands of pounds of priceless memories can be in your furnaces in
    as little as three days!",
    "Begin by entering your Waste Management Licence number below."
  ]
  attachTo:
    element: 'form.wmp-start'
    on: 'bottom'
    classes: 'tour-highlight'
    offset: '2px 0'
  advanceOn: 'submit form.wmp-start'
  when:
    shown: ->
    completed: ->
    cancelled: ->
    hidden: ->
  buttons: [
    text: "Back"
    action: tour.back
  ,
    text: "Cancel"
    action: tour.cancel
  ,
    text: "Skip"
    action: tour.next
  ]

tour.start
  hash: true

tour.completed 'seller-start'
