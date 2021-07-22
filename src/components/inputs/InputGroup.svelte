<style>
  div {
    margin-block-end: 12px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    width: 100%;
  }
  :global(.kw-field-error-message) {
    position: absolute;
    right: 0;
    top: 2px;
    font-size: 13px;
    color: #ff3852;
    display: block;
    font-family: var(--font-detail);
  }
</style>

<script lang="ts">
  export let style: string = '';
</script>

<div {style}><slot /></div>
