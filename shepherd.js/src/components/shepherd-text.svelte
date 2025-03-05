<script>
  import { effect } from 'svelte';
  import { isFunction, isHTMLElement } from '../utils/type-check.ts';

  let { descriptionId, element, step } = $props();

  $effect(() => {
    let text = step.options.text;

    if (isFunction(text)) {
      text = text.call(step);
    }

    // Clear existing content
    while (element?.firstChild) {
      element.removeChild(element.firstChild);
    }

    if (isHTMLElement(text)) {
      element?.appendChild(text);
    } else {
      if (element) {
        element.innerHTML = text;
      }
    }
  });
</script>

<div bind:this={element} class="shepherd-text" id={descriptionId}></div>
