<script>
  import { afterUpdate } from 'svelte';
  import { isFunction } from '../utils/type-check.ts';

  export let labelId, element, title;

  afterUpdate(() => {
    if (isFunction(title)) {
      title = title();
    }

    element.innerHTML = title;
  });
</script>

<!-- svelte-ignore a11y-missing-content -->
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
