<script>
  import ShepherdCancelIcon from './shepherd-cancel-icon.svelte';
  import ShepherdTitle from './shepherd-title.svelte';

  export let classPrefix, labelId, step;
  const { cancelIcon, title } = step.options;
</script>

<style>
  .shepherd-header {
    align-items: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    display: flex;
    justify-content: flex-end;
    line-height: 2em;
    padding: 0.75rem 0.75rem 0;
  }

  :global(.shepherd-has-title .shepherd-content .shepherd-header) {
    background: #e6e6e6;
    padding: 1em;
  }
</style>

<header class="{`${classPrefix} shepherd-header`}">
    {#if title}
      <ShepherdTitle
        {classPrefix}
        {labelId}
        {title}
      />
    {/if}

    {#if cancelIcon && cancelIcon.enabled}
      <ShepherdCancelIcon
        {cancelIcon}
        {classPrefix}
        {step}
      />
    {/if}
</header>
