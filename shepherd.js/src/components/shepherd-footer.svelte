<script>
  import ShepherdButton from './shepherd-button.svelte';

  const { step } = $props();

  let buttons = $derived(step.options.buttons ?? []);
</script>

<footer class="shepherd-footer">
  {#if buttons}
    {#each buttons as config}
      <ShepherdButton {config} {step} />
    {/each}
  {/if}
</footer>
