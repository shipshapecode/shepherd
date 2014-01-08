DropTooltip = Drop.createContext()

defaults =
    attach: 'top center'

class Tooltip

    constructor: (@options) ->
        @$target = $ @options.el

        @createDrop()

    createDrop: ->
        @options.attach = defaults.attach if not @options.attach?

        @dropTooltip = new DropTooltip
            target: @$target[0]
            className: 'drop-tooltip-theme-arrows'
            attach: @options.attach
            constrainToWindow: true
            constrainToScrollParent: false
            openOn: 'hover'
            content: @options.content ? @$target.attr('data-tooltip-content')

window.Tooltip = Tooltip
