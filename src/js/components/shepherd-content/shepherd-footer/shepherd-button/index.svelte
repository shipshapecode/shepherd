<script>
  export let classPrefix, config, step, styles;
  const { action, classes, secondary, text } = config;
</script>

<style>
  button {
    border: 0;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0.5rem 1.5rem;
    transition: all 0.5s ease;
  }
</style>


<button
  class="{`${(classes || '')} ${styles.button} ${(secondary ? `${classPrefix}shepherd-button-secondary` : '')}`}"
  on:click={action ? action.bind(step.tour) : null}
  tabindex='0'
>
    {text}
</button>
