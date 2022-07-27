<script lang="ts">
  export let justify: 'left' | 'center' | 'right' = 'center';
</script>

<div
  class={'tab-list'}
  class:justifyLeft={justify === 'left'}
  class:justifyRight={justify === 'right'}
>
  <slot />
</div>

<style>
  div {
    border-bottom: 1px solid var(--border-light);
    padding-bottom: 1px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    overflow: auto hidden;
    position: relative;
    z-index: 10;
    background-color: white;
  }

  div.justifyLeft {
    justify-content: flex-start;
  }

  div.justifyRight {
    justify-content: flex-end;
  }
</style>
