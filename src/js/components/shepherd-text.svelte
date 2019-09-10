<script>
  import { onMount } from 'svelte';
  import { isElement, isFunction } from '../utils/type-check';

  export let descriptionId, element, step;

  onMount(() => {
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    if (isElement(text)) {
      element.appendChild(text);
    } else {
      element.innerHTML = text;
    }
  });
</script>

<style type="text/scss" global>
  .shepherd-text {
    color: rgba(0, 0, 0, 0.75);
    font-size: 1rem;
    line-height: 1.3em;
    padding: 0.75em;

    p {
      margin-top: 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>

<div
  bind:this={element}
  class="shepherd-text"
  id="{descriptionId}"
>
</div>

