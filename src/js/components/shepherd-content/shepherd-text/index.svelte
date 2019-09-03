<script>
  import { onMount } from 'svelte';
  import { isElement, isFunction } from '../../../utils/type-check';

  export let base, descriptionId, step, styles;

  onMount(() => {
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    if (isElement(text)) {
      base.appendChild(text);
    } else {
      base.innerHTML = text;
    }
  });
</script>

<div
  bind:this={base}
  class="{styles.text.trim()}"
  id="{descriptionId}"
>
</div>

