<script>
  import ShepherdButton from './shepherd-button/index.svelte';

  export let classPrefix, step, styles;
  const { buttons } = step.options;
</script>

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
