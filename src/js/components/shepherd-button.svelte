<script>
  import { afterUpdate } from 'svelte';
  import { isFunction } from '../utils/type-check';

  export let config, step;
  const { action, classes, secondary, text } = config;
  let { disabled } = config || false;

  afterUpdate(() => {
    if (isFunction(disabled)) {
      disabled = disabled.call(step);
    }
  });
</script>

<style global>
  .shepherd-button {
    background: rgb(50, 136, 230);
    border: 0;
    border-radius: 3px;
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0.5rem 1.5rem;
    transition: all 0.5s ease;
  }

  .shepherd-button:not(:disabled):hover {
    background: rgb(25, 111, 204);
    color: rgba(255, 255, 255, 0.75);
  }

  .shepherd-button.shepherd-button-secondary {
    background: rgb(241, 242, 243);
    color: rgba(0, 0, 0, 0.75);
  }

  .shepherd-button.shepherd-button-secondary:not(:disabled):hover {
    background: rgb(214, 217, 219);
    color: rgba(0, 0, 0, 0.75);
  }

  .shepherd-button:disabled {
    cursor: not-allowed;
  }
</style>

<button
  class="{`${(classes || '')} shepherd-button ${(secondary ? 'shepherd-button-secondary' : '')}`}"
  disabled={disabled}
  on:click={action ? action.bind(step.tour) : null}
  tabindex="0"
>
    {text}
</button>
