<script lang="ts">
  export let width: string | number = 1200;
</script>

<div class="outer">
  {#if typeof width === 'number'}
    <div class="inner" style={`--width: ${width}px`}>
      <slot />
    </div>
  {:else}
    <div class="inner" style={`--width: ${width}`}>
      <slot />
    </div>
  {/if}
</div>

<style>
  .outer {
    display: flex;
    padding: 0 20px;
    justify-content: center;
  }
  .inner {
    width: var(--width);
  }
  @media print {
    .outer {
      padding: 0;
    }
  }
</style>
