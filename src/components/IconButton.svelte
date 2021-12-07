<style>
  button,
  a {
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
    margin: 0;
    padding: 6px;
  }
  button.isOutlined,
  a.isOutlined {
    border-color: var(--border-dark);
  }
  button:hover:not(.disabled),
  a:hover:not(.disabled) {
    background-color: var(--button-bg-hover);
    border: 1px solid var(--button-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  button:active:not(.disabled),
  a:active:not(.disabled) {
    background-color: var(--button-bg-active);
    border: 1px solid var(--button-bg-active);
    box-shadow: var(--button-shadow-active);
  }
  svg {
    fill: currentColor;
  }
  button.disabled,
  a.disabled {
    color: var(--button-color-disabled);
  }
</style>

<script lang="ts">
  //export let type = 'default';
  export let viewBox = '0 0 24 24';
  export let disabled = false;
  export let isOutlined: boolean = false;
  export let ariaLabel: string;
  export let href: string = undefined;
  export let color: string = undefined;
  export let radius: string = undefined;
  export let background: { base?: string; hover?: string; active?: string } = undefined;
</script>

{#if href}
  <a
    {href}
    class:disabled
    class:isOutlined
    aria-label={ariaLabel}
    style={`
    ${color ? `--button-color: ${color};` : ``}
    ${radius ? `--radius: ${radius};` : ``}
    ${background?.base ? `--button-bg: ${background.base};` : ``}
    ${background?.hover ? `--button-bg-hover: ${background.hover};` : ``}
    ${background?.active ? `--button-bg-active: ${background.active};` : ``}
  `}>
    <svg style="width:24px;height:24px" {viewBox}>
      <slot />
    </svg>
  </a>
{:else}
  <button
    on:click
    class:disabled
    class:isOutlined
    aria-label={ariaLabel}
    style={`
      ${color ? `--button-color: ${color};` : ``}
      ${radius ? `--radius: ${radius};` : ``}
      ${background?.base ? `--button-bg: ${background.base};` : ``}
      ${background?.hover ? `--button-bg-hover: ${background.hover};` : ``}
      ${background?.active ? `--button-bg-active: ${background.active};` : ``}
    `}>
    <svg style="width:24px;height:24px" {viewBox}>
      <slot />
    </svg>
  </button>
{/if}
