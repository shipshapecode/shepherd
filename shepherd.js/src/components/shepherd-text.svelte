<script>
  import { afterUpdate } from 'svelte';
  import { isHTMLElement, isFunction } from '../utils/type-check';

  export let descriptionId, element, step;

  afterUpdate(() => {
    let { text } = step.options;

    if (isFunction(text)) {
      text = text.call(step);
    }

    if (isHTMLElement(text)) {
      element.appendChild(text);
    } else {
      element.innerHTML = text;
    }
  });
</script>

<style global>
  .shepherd-text {
    color: rgba(0, 0, 0, 0.75);
    font-size: 1rem;
    line-height: 1.3em;
    padding: 0.75em;
  }

  .shepherd-text p {
    margin-top: 0;
  }

  .shepherd-text p:last-child {
    margin-bottom: 0;
  }
</style>

<div
  bind:this={element}
  class="shepherd-text"
  id="{descriptionId}"
>
</div>

