<script>
  import { isFunction } from '../utils/type-check.ts';

  const { config, step } = $props();

  let action = $derived(config.action ? config.action.bind(step.tour) : null);
  let classes = $derived(config.classes);
  let disabled = $derived(
    config.disabled ? getConfigOption(config.disabled) : false
  );
  let label = $derived(config.label ? getConfigOption(config.label) : null);
  let secondary = $derived(config.secondary);
  let text = $derived(config.text ? getConfigOption(config.text) : null);

  function getConfigOption(option) {
    if (isFunction(option)) {
      return (option = option.call(step));
    }
    return option;
  }
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

