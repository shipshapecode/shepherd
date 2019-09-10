<script>
  export let classPrefix, labelId, title;
</script>

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

<h3
  id="{labelId}"
  class="{`${classPrefix} shepherd-title`}"
>
    {title}
</h3>
