<script>
  import ShepherdFooter from './shepherd-footer.svelte';
  import ShepherdHeader from './shepherd-header.svelte';
  import ShepherdText from './shepherd-text.svelte';
  import { isUndefined } from '../utils/type-check.js';

  export let classPrefix, descriptionId, labelId, step;
</script>

<style>
  .shepherd-content {
    border-radius: 5px;
    outline: none;
    padding: 0;
  }
</style>

<div
  class="{`${classPrefix} shepherd-content`}"
>
  <ShepherdHeader
    {classPrefix}
    {labelId}
    {step}
  />

    {#if !isUndefined(step.options.text)}
      <ShepherdText
        {classPrefix}
        {descriptionId}
        {step}
      />
    {/if}

    {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
      <ShepherdFooter
        {classPrefix}
        {step}
      />
    {/if}
</div>

