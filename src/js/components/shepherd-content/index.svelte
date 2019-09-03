<script>
  import ShepherdFooter from './shepherd-footer';
  import ShepherdHeader from './shepherd-header';
  import ShepherdText from './shepherd-text';
  import { isUndefined } from '../../utils/type-check';

  export let classPrefix, descriptionId, labelId, step, styles;
</script>

<div
  class="{styles.content.trim()}"
>
  <ShepherdHeader
    {labelId}
    {step}
    {styles}
  />

    {#if !isUndefined(step.options.text)}
      <ShepherdText
        {descriptionId}
        {step}
        {styles}
      />
    {/if}

    {#if Array.isArray(step.options.buttons) && step.options.buttons.length}
      <ShepherdFooter
        {classPrefix}
        {step}
        {styles}
      />
    {/if}
</div>

