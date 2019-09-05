<script>
  export let labelId, step, styles;
  const { cancelIcon, title } = step.options;

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  const handleCancelClick = (e) => {
    e.preventDefault();
    step.cancel();
  };
</script>

<header class="{styles.header.trim()}">
    {#if title}
      <h3
        id="{labelId}"
        class="{styles.title.trim()}"
      >
          {title}
      </h3>
    {/if}

    {#if cancelIcon && cancelIcon.enabled}
      <button
        aria-label="{cancelIcon.label ? cancelIcon.label : 'Close Tour'}"
        class="{styles['cancel-icon'].trim()}"
        on:click={handleCancelClick}
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    {/if}
</header>
