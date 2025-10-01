<script>
  import { isFunction } from '../utils/type-check.ts';

  let { config, step } = $props();

  function getConfigOption(option) {
    if (isFunction(option)) {
      return (option = option.call(step));
    }
    return option;
  }

  const action = $derived(config.action ? config.action.bind(step.tour) : null);
  const classes = $derived(config.classes);
  const disabled = $derived(
    config.disabled ? getConfigOption(config.disabled) : false
  );
  const label = $derived(config.label ? getConfigOption(config.label) : null);
  const secondary = $derived(config.secondary);
  const text = $derived(config.text ? getConfigOption(config.text) : null);
</script>

<button
  aria-label={label ? label : null}
  class={`${classes || ''} shepherd-button ${
    secondary ? 'shepherd-button-secondary' : ''
  }`}
  {disabled}
  onclick={action}
  tabindex="0"
  type="button"
>
  {@html text}
</button>

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
