<div class={'tab-list'}>
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
</style>
