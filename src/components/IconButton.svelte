<style>
  button {
    display: inline-flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius);
    color: var(--button-color);
    cursor: default;
    background-color: var(--button-bg);
    border: 1px solid transparent;
    transition: 200ms;
    color: var(--button-color);
  }
  button:hover:not(.disabled) {
    background-color: var(--button-bg-hover);
    border: 1px solid var(--button-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  button:active:not(.disabled) {
    background-color: var(--button-bg-active);
    border: 1px solid var(--button-bg-active);
    box-shadow: var(--button-shadow-active);
  }
  svg {
    fill: currentColor;
  }
  button.disabled {
    color: var(--button-color-disabled);
  }
</style>

<script>
  //export let type = 'default';
  export let viewBox = '0 0 24 24';
  export let disabled = false;
</script>

<button on:click class:disabled>
  <svg style="width:24px;height:24px" {viewBox}>
    <slot />
  </svg>
</button>
