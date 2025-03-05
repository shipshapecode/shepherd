<script>
  import { isFunction } from '../utils/type-check.ts';

  let { labelId, element, title } = $props();

  $effect(() => {
    let currentTitle = title;
    if (isFunction(currentTitle)) {
      currentTitle = currentTitle();
    }
    element.innerHTML = currentTitle;
  });
</script>

<!-- svelte-ignore a11y_missing_content -->
<h3 bind:this={element} id={labelId} class="shepherd-title"></h3>
