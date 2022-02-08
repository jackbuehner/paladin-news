<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { TABS } from './store';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  export let grow = false;
  export let isDefault = false;

  onMount(() => {
    if (isDefault === true) selectTab(tab);
  });

  registerTab(tab);
</script>

<div class:selected={$selectedTab === tab} class:grow>
  <button on:click={() => selectTab(tab)}>
    <slot />
  </button>
</div>

<style>
  button {
    display: inline-flex;
    min-width: 80px;
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
    font-family: var(--font-detail);
    text-transform: uppercase;
    font-weight: 600;
    white-space: nowrap;
    letter-spacing: 0.17px;
    width: 100%;
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

  div {
    display: inline-flex;
  }
  .grow {
    flex-grow: 1;
  }

  .selected {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  .selected button {
    color: rgb(var(--primary));
  }
</style>
