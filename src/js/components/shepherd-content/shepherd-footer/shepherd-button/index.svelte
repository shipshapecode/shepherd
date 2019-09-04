<script>
  export let classPrefix, config, step, styles;
  const { action, classes, secondary, text } = config;
</script>


<button
  class="{(classes || '') + styles.button + (secondary ? ` ${classPrefix}shepherd-button-secondary` : '')}"
  on:click={action ? action.bind(step.tour) : null}
  tabindex='0'
>
    {text}
</button>
