isMobile = $(window).width() < 567

init = ->
    setupHero()
    setupBrowserDemo()

setupHero = ->
    $target = $('.tether-target-demo')

    positions = [
        'top left'
        'left top'
        'left bottom'
        'bottom left'
        'bottom right'
        'right bottom'
        'right top'
        'top right'
    ]

    if isMobile
        positions = [
            'top left'
            'bottom left'
            'bottom right'
            'top right'
        ]

    window.drops = {}

    for position in positions
        drops[position] = new Drop
            target: $target[0]
            className: 'drop-tooltip-theme-arrows'
            attach: position
            constrainToScrollParent: true
            openOn: ''
            content: $.map(position.split(' '), (word) -> word.substr(0, 1).toUpperCase() + word.substr(1)).join(' ')

        # TODO - remove once zackbloom fixes
        drops[position].$drop.addClass "drop-attached-#{ position.replace(' ', '-')}"

    openIndex = 0
    frames = 0
    frameLengthMS = 10

    openAllDrops = ->
        for position, drop of drops
            drop.open()

    openNextDrop = ->
        for position, drop of drops
            drop.close()

        drops[positions[openIndex]].open()

        openIndex = (openIndex + 1) % positions.length

        if frames > 20
            return openAllDrops()

        frames += 1

        setTimeout openNextDrop, frameLengthMS * frames

    if isMobile
        drops['top left'].open()
        drops['bottom right'].open()

    else
        openNextDrop()

setupBrowserDemo = ->
    $browserDemo = $('.browser-demo.showcase')

    $startPoint = $('.browser-demo-start-point')
    $stopPoint = $('.browser-demo-stop-point')

    $iframe = $('.browser-window iframe')
    $browserContents = $('.browser-content .browser-demo-inner')

    $sections = $('.browser-demo-section')

    $('body').append """
        <style>
            table.showcase.browser-demo.fixed-bottom {
                top: #{ $sections.length }00%
            }
        </style>
    """

    $(window).scroll ->
        scrollTop = $(window).scrollTop()

        if $startPoint.position().top < scrollTop and scrollTop + window.innerHeight < $stopPoint.position().top
            $browserDemo.removeClass('fixed-bottom')
            $browserDemo.addClass('fixed')

            $sections.each ->
                $section = $ @

                if $section.position().top < scrollTop < $section.position().top + $section.outerHeight()
                    setSection $section.data('section')

                return true

        else
            $browserDemo.removeAttr('data-section')
            $browserDemo.removeClass('fixed')

            if scrollTop + window.innerHeight > $stopPoint.position().top
                $browserDemo.addClass('fixed-bottom')
            else
                $browserDemo.removeClass('fixed-bottom')

    $iframe.load ->
        iframeWindow = $iframe[0].contentWindow

        $items = $iframe.contents().find('.item')

        $items.each (i) ->
            $item = $(@)

            drop = new iframeWindow.Drop
                target: $item[0]
                className: 'drop-theme-arrows'
                attach: 'right top'
                constrainToWindow: true
                openOn: 'click'
                content: '<div class="drop-demo-spacer"></div>'

            $item.data('drop', drop)

            # TODO - remove once zackbloom fixes
            drop.$drop.addClass "drop-attached-right-top"

    setSection = (section) ->
        $browserDemo.attr('data-section', section)

        $('.section-copy').removeClass('active')
        $(""".section-copy[data-section="#{ section }"]""").addClass('active')

        openExampleItem = ->
            if isMobile
                $iframe.contents().find('.item:first').data().drop.open()
            else
                $iframe.contents().find('.item:eq(2)').data().drop.open()

        closeAllItems = ->
            $iframe.contents().find('.item').each -> $(@).data().drop.close() or true

        switch section

            when 'intro'
                closeAllItems()
                openExampleItem()

            when 'explain'
                closeAllItems()
                openExampleItem()

            when 'resize'
                closeAllItems()
                openExampleItem()

            when 'outro'
                closeAllItems()
                openExampleItem()

init()
