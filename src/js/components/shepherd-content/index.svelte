<script>
  import ShepherdFooter from './shepherd-footer/index.svelte';
  import ShepherdHeader from './shepherd-header/index.svelte';
  import ShepherdText from './shepherd-text/index.svelte';
  import { isUndefined } from '../../utils/type-check';

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

