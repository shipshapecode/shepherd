<script>
  import ShepherdCancelIcon from './shepherd-cancel-icon.svelte';
  import ShepherdTitle from './shepherd-title.svelte';

  const { labelId, step } = $props();

  let title = $derived(step.options.title);
  let cancelIcon = $derived(step.options.cancelIcon);
</script>

<header class="shepherd-header">
  {#if title}
    <ShepherdTitle {labelId} {title} />
  {/if}

  {#if cancelIcon && cancelIcon.enabled}
    <ShepherdCancelIcon {cancelIcon} {step} />
  {/if}
</header>
