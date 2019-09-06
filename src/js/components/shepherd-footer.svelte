<script>
  import ShepherdButton from './shepherd-button';

  export let classPrefix, step;
  const { buttons } = step.options;
</script>

<style>
  .shepherd-footer {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    justify-content: flex-end;
    padding: 0 0.75rem 0.75rem;
  }

  .shepherd-footer :global(.shepherd-button:last-child) {
    margin-right: 0;
  }
</style>

<footer class="{`${classPrefix} shepherd-footer`}">
    {#if buttons}
        {#each buttons as config}
          <ShepherdButton
            {classPrefix}
            {config}
            {step}
          />
        {/each}
    {/if}
</footer>
