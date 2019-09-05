<script>
  export let cancelIcon, step, styles;

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  const handleCancelClick = (e) => {
    e.preventDefault();
    step.cancel();
  };
</script>

<style>
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-weight: normal;
    margin: 0;
    padding: 0;
    transition: color 0.5s ease;
  }
</style>

<button
  aria-label="{cancelIcon.label ? cancelIcon.label : 'Close Tour'}"
  class="{styles['cancel-icon'].trim()}"
  on:click={handleCancelClick}
  type="button"
>
  <span aria-hidden="true">&times;</span>
</button>
