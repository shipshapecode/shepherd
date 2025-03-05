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

<style global>
  .shepherd-title {
    color: rgba(0, 0, 0, 0.75);
    display: flex;
    font-size: 1rem;
    font-weight: normal;
    flex: 1 0 auto;
    margin: 0;
    padding: 0;
  }
</style>
