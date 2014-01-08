$ = jQuery

Tether.modules.push
  initialize: ->
    @markers = {}

    for type in ['target', 'element']
      el = document.createElement 'div'
      el.className = @getClass("#{ type }-marker")

      dot = document.createElement 'div'
      dot.className = @getClass('marker-dot')
      el.appendChild dot

      @[type].appendChild el

      @markers[type] = {dot, el}

  position: ({manualOffset, manualTargetOffset}) ->
    offsets =
      element: manualOffset
      target: manualTargetOffset

    for type, offset of offsets
      for side, val of offset
        if typeof val isnt 'string' or (val.indexOf('%') is -1 and val.indexOf('px') is -1)
          val += 'px'

        if @markers[type].dot.style[side] isnt val
          @markers[type].dot.style[side] = val

    true
