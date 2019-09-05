<script>
  import ShepherdButton from './shepherd-button/index.svelte';

  export let classPrefix, step, styles;
  const { buttons } = step.options;
</script>

<style>
  footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 0.75rem 0.75rem;
  }
</style>

<footer class="{styles.footer.trim()}">
    {#if buttons}
        {#each buttons as config}
          <ShepherdButton
            {classPrefix}
            {config}
            {step}
            {styles}
          />
        {/each}
    {/if}
</footer>
