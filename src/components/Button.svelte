<style>
  button {
    display: inline-flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: var(--radius);
    color: var(--button-color);
    cursor: default;
    background-color: var(--button-light-bg);
    border: 1px solid var(--button-light-border-color);
    transition: 200ms;
    color: var(--button-color);
    min-width: 80px;
    padding: 0 10px;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }
  button:hover:not(.disabled) {
    background-color: var(--button-light-bg-hover);
    border: 1px solid var(--button-light-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  button:active:not(.disabled) {
    background-color: var(--button-light-bg-active);
    border: 1px solid var(--button-light-bg-active);
    box-shadow: var(--button-shadow-active);
  }
  button.disabled {
    color: var(--button-color-disabled);
  }
</style>

<script lang="ts">
  //export let type = 'default';
  export let disabled = false;
  export let htmlType: string = undefined;
  export let width: string = undefined;
  export let href: string = undefined;
  export let style: string = undefined;
</script>

<button
  on:click
  {href}
  class:disabled
  type={htmlType}
  style={style && width
    ? `width: ${width};${style}`
    : style
    ? style
    : width
    ? `width: ${width};`
    : ''}><slot /></button>
