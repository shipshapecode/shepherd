Tether.modules.push
  position: ({top, left}) ->
    return unless @options.shift

    result = (val) ->
      if typeof val is 'function'
        val.call @, {top, left}
      else
        val

    shift = result @options.shift

    if typeof shift is 'string'
      shift = shift.split(' ')
      shift[1] or= shift[0]

      [shiftTop, shiftLeft] = shift

      shiftTop = parseFloat shiftTop, 10
      shiftLeft = parseFloat shiftLeft, 10
    else
      [shiftTop, shiftLeft] = [shift.top, shift.left]

    top += shiftTop
    left += shiftLeft

    {top, left}
