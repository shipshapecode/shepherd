<script>
  import ShepherdCancelIcon from './shepherd-cancel-icon/index.svelte';
  import ShepherdTitle from './shepherd-title/index.svelte';

  export let labelId, step, styles;
  const { cancelIcon, title } = step.options;
</script>

<style>
  header {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    padding: 0.75rem 0.75rem 0;
  }
</style>

<header class="{styles.header.trim()}">
    {#if title}
      <ShepherdTitle
        {labelId}
        {styles}
        {title}
      />
    {/if}

    {#if cancelIcon && cancelIcon.enabled}
      <ShepherdCancelIcon
        {cancelIcon}
        {step}
        {styles}
      />
    {/if}
</header>
