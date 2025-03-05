<script>
  const { cancelIcon, step } = $props();

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  const handleCancelClick = (e) => {
    e.preventDefault();
    step.cancel();
  };
</script>

<button
  aria-label={cancelIcon.label ? cancelIcon.label : 'Close Tour'}
  class="shepherd-cancel-icon"
  onclick={handleCancelClick}
  type="button"
>
  <span aria-hidden="true">&times;</span>
</button>

