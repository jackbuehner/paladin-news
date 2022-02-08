<script lang="ts">
  //export let type = 'default';
  export let disabled = false;
  export let ariaLabel: string;
</script>

<button on:click class:disabled aria-label={ariaLabel}>
  <svg style="width:15px;height:15px">
    <slot />
  </svg>
</button>

<style>
  button {
    display: inline-flex;
    width: 26px;
    height: 26px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--button-color);
    cursor: default;
    background-color: var(--button-light-bg);
    border: 1px solid var(--button-light-border-color);
    transition: 200ms;
    color: var(--button-color);
    padding: 4px;
  }
  button:hover:not(.disabled) {
    background-color: var(--button-light-bg-hover);
    border: 1px solid var(--button-light-bg-hover);
    box-shadow: var(--button-shadow-hover);
    border-radius: var(--radius);
  }
  button:active:not(.disabled) {
    background-color: var(--button-light-bg-active);
    border: 1px solid var(--button-light-bg-active);
    box-shadow: var(--button-shadow-active);
    border-radius: var(--radius);
  }
  svg {
    fill: currentColor;
  }
  button.disabled {
    color: var(--button-color-disabled);
  }
</style>
