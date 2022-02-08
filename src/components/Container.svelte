<script lang="ts">
  export let width: number = 1200;
</script>

<div class="outer">
  <div class="inner" style={`--width: ${width}px`}>
    <slot />
  </div>
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
</style>
