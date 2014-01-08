SETUP_JS = """
yellowBox = $('.yellow-box', $output);
greenBox = $('.green-box', $output);
"""

OUTPUT_HTML = (key) -> """
<div class="scroll-box">
  <div class="scroll-content">
    <div class="yellow-box" data-example="#{ key }"></div>
    <div class="green-box" data-example="#{ key }"></div>
  </div>
</div>
"""

getOutput = ($block) ->
  key = $block.data('example')
  if key and typeof key is 'string'
    return $("output[data-example='#{ key }']")
  else
    return $block.parents('pre').nextAll('output').first()

run = (key) ->
  if typeof key is 'string'
    $block = $("code[data-example='#{ key }']")
  else
    $block = key

  $output = getOutput $block

  code = $block.text()

  if code.indexOf(SETUP_JS) is -1
    code = SETUP_JS + code

  window.$output = $output
  eval code

setupBlock = ($block) ->
  #addSetupLink $block

  key = $block.data('example')
  $output = getOutput $block

  $output.html OUTPUT_HTML(key)

  $scrollBox = $output.find('.scroll-box')
  $scrollContent = $scrollBox.find('.scroll-content')
  $scrollBox.scrollTop(parseInt($scrollContent.css('height')) / 2 - $scrollBox.height() / 2)
  $scrollBox.scrollLeft(parseInt($scrollContent.css('width')) / 2 - $scrollBox.width() / 2)
  setTimeout ->
    $scrollBox.on 'scroll', ->
      $output.addClass 'scrolled'

  $scrollBox.css 'height', "#{ $block.parent().outerHeight() }px"

  run $block

init = ->
  $blocks = $('code[data-example]')

  setupBlock($ block) for block in $blocks

window.EXECUTR_OPTIONS =
  codeSelector: 'code[executable]'

$ init
