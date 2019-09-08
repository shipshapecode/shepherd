<script>
  import { onMount } from 'svelte';
  import { isElement, isFunction } from '../utils/type-check';

  export let base, classPrefix, descriptionId, step;

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

<style>
  .shepherd-text {
    color: rgba(0, 0, 0, 0.75);
    font-size: 1rem;
    line-height: 1.3em;
    padding: 0.75em;
  }

  .shepherd-text :global(p) {
    margin-top: 0;
  }

  .shepherd-text :global(p:last-child) {
    margin-bottom: 0;
  }
</style>

<div
  bind:this={base}
  class="{`${classPrefix} shepherd-text`}"
  id="{descriptionId}"
>
</div>

