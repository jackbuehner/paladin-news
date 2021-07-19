<style>
  .outer {
    display: flex;
    padding: 0 20px;
    justify-content: center;
  }
  .inner {
    width: 1200px;
  }
</style>

<div class="outer">
  <div class="inner">
    <slot />
  </div>
</div>
