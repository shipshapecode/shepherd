<script>
  import { isFunction } from '../utils/type-check';

  export let config, step;
  let action, classes, secondary, text, label, disabled;

  $: {
    action = config.action ? config.action.bind(step.tour) : null;
    classes = config.classes;
    secondary = config.secondary;
    text = config.text;
    label = config.label;
    disabled = config.disabled ? getDisabled(config.disabled) : false;
  }

  function getDisabled(disabled) {
      if (isFunction(disabled)) {
          return disabled = disabled.call(step);
      }
      return disabled
  }

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
  aria-label="{label ? label : null}"
  class="{`${(classes || '')} shepherd-button ${(secondary ? 'shepherd-button-secondary' : '')}`}"
  disabled={disabled}
  on:click={action}
  tabindex="0"
>
    {text}
</button>
