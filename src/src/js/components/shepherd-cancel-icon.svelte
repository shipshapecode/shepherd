<script>
  export let cancelIcon, step;

  /**
   * Add a click listener to the cancel link that cancels the tour
   */
  const handleCancelClick = (e) => {
    e.preventDefault();
    step.cancel();
  };
</script>

<style global>
  .shepherd-cancel-icon {
    background: transparent;
    border: none;
    color: rgba(128, 128, 128, 0.75);
    font-size: 2em;
    cursor: pointer;
    font-weight: normal;
    margin: 0;
    padding: 0;
    transition: color 0.5s ease;
  }

  .shepherd-cancel-icon:hover {
    color: rgba(0, 0, 0, 0.75);
  }

  .shepherd-has-title .shepherd-content .shepherd-cancel-icon {
    color: rgba(128, 128, 128, 0.75);
  }

  .shepherd-has-title .shepherd-content .shepherd-cancel-icon:hover {
    color: rgba(0, 0, 0, 0.75);
  }
</style>

<button
  aria-label="{cancelIcon.label ? cancelIcon.label : 'Close Tour'}"
  class="shepherd-cancel-icon"
  on:click={handleCancelClick}
  type="button"
>
  <span aria-hidden="true">&times;</span>
</button>
