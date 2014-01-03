$ = jQuery

touchDevice = 'ontouchstart' of document.documentElement
clickEvent = if touchDevice then 'touchstart' else 'click'

sortAttach = (str) ->
  [first, second] = str.split(' ')

  if first in ['left', 'right']
    [first, second] = [second, first]

  [first, second].join(' ')

MIRROR_ATTACH =
  left: 'right'
  right: 'left'
  top: 'bottom'
  bottom: 'top'
  middle: 'middle'
  center: 'center'

allDrops = []

# Drop can be included in external libraries.  Calling createContext gives you a fresh
# copy of drop which won't interact with other copies on the page (beyond calling the document events).
createContext = (options) ->
  drop = ->
    new DropInstance arguments...

  $.extend drop,
    createContext: createContext
    drops: []

  defaultOptions =
    defaults:
      attach: 'bottom left'
      openOn: 'click'
      constrainToScrollParent: true
      constrainToWindow: true
      className: ''
      tetherOptions: {}

  $.extend true, drop, defaultOptions, options

  $(document).on 'dropopen.drop, dropclose.drop', -> drop.updateBodyClasses()

  drop.updateBodyClasses = ->
    # There is only one body, so despite the context concept, we still iterate through all
    # drops created in any context before applying the class.

    anyOpen = false
    for _drop in allDrops when _drop.isOpened()
      anyOpen = true
      break

    if anyOpen
      $('body').addClass('drop-open')
    else
      $('body').removeClass('drop-open')

  class DropInstance
    constructor: (@options) ->
      @options = $.extend {}, drop.defaults, @options

      @$target = $ @options.target

      drop.drops.push @
      allDrops.push @

      @setupElements()
      @setupEvents()
      @setupTether()

    setupElements: ->
      @$drop = $ '<div>'
      @$drop.addClass 'drop'
      @$drop.addClass @options.className

      @$dropContent = $ '<div>'
      @$dropContent.addClass 'drop-content'
      @$dropContent.append @options.content

      @$drop.append @$dropContent

    setupTether: ->
      # Tether expects two attachment points, one in the target element, one in the
      # drop.  We use a single one, and use the order as well, to allow us to put
      # the drop on either side of any of the four corners.  This magic converts between
      # the two:
      dropAttach = @options.attach.split(' ')
      dropAttach[0] = MIRROR_ATTACH[dropAttach[0]]
      dropAttach = dropAttach.join(' ')

      constraints = []
      if @options.constrainToScrollParent
        constraints.push
          to: 'scrollParent'
          pin: 'top, bottom'
          attachment: 'together none'

      if @options.constrainToWindow isnt false
        constraints.push
          to: 'window'
          pin: true
          attachment: 'together'

      # To get 'out of bounds' classes
      constraints.push
        to: 'scrollParent'

      options =
        element: @$drop[0]
        target: @$target[0]
        attachment: sortAttach(dropAttach)
        targetAttachment: sortAttach(@options.attach)
        offset: '0 0'
        targetOffset: '0 0'
        enabled: false
        constraints: constraints

      @tether = new Tether $.extend {}, options, @options.tetherOptions

    setupEvents: ->
      return unless @options.openOn
      events = @options.openOn.split ' '

      if 'click' in events
        @$target.bind clickEvent, => @toggle()

        $(document).bind clickEvent, (event) =>
          return unless @isOpened()

          # Clicking inside dropdown
          if $(event.target).is(@$drop[0]) or @$drop.find(event.target).length
            return

          # Clicking target
          if $(event.target).is(@$target[0]) or @$target.find(event.target).length
            return

          @close()

      if 'hover' in events
        @$target.bind 'mouseover', => @open()
        @$target.bind 'mouseout', => @close()

    isOpened: ->
      @$drop.hasClass('drop-open')

    toggle: ->
      if @isOpened()
        @close()
      else
        @open()

    open: ->
      unless @$drop.parent().length
        $('body').append @$drop

      @$target.addClass('drop-open')
      @$drop.addClass('drop-open')

      @$drop.trigger
        type: 'dropopen'
        drop: @

      @tether.enable()

    close: ->
      @$target.removeClass('drop-open')
      @$drop.removeClass('drop-open')

      @$drop.trigger
        type: 'dropclose'
        drop: @

      @tether.disable()

  drop

window.Drop = createContext()

$ ->
  Drop.updateBodyClasses()
