<script>
  export let labelId, styles, title;
</script>

<style>
  h3 {
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
  class="{styles.title.trim()}"
>
    {title}
</h3>
