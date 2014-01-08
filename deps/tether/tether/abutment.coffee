{getBounds} = Tether.Utils

Tether.modules.push
  position: ({top, left}) ->
    {height, width} = @cache 'element-bounds', => getBounds @element

    targetPos = @getTargetBounds()

    bottom = top + height
    right = left + width

    abutted = []
    if top <= targetPos.bottom and bottom >= targetPos.top
      for side in ['left', 'right']
        if targetPos[side] in [left, right]
          abutted.push side

    if left <= targetPos.right and right >= targetPos.left
      for side in ['top', 'bottom']
        if targetPos[side] in [top, bottom]
          abutted.push side

    sides = ['left', 'top', 'right', 'bottom']
    @removeClass @getClass('abutted')
    for side in sides
      @removeClass "#{ @getClass('abutted') }-#{ side }"

    if abutted.length
      @addClass @getClass('abutted')
    for side in abutted
      @addClass "#{ @getClass('abutted') }-#{ side }"

    true
