<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import { TABS } from './store';

  const tab = {};
  const { registerTab, selectTab, selectedTab } = getContext(TABS);

  export let grow = false;
  export let isDefault = false;
  export let href: string | undefined = undefined;
  export let manualSelected: boolean | undefined = undefined;

  onMount(() => {
    if (isDefault === true) selectTab(tab);
  });

  registerTab(tab);
</script>

<div class:selected={manualSelected ?? $selectedTab === tab} class:grow>
  {#if href}
    <a
      {href}
      on:click
      on:mouseup
      on:mousedown
      on:mouseenter
      on:mouseleave
      on:mouseout
      on:blur
      on:mouseover
      on:focus
      on:mousemove
      on:click={() => selectTab(tab)}
    >
      <slot />
    </a>
  {:else}
    <button
      on:click
      on:mouseup
      on:mousedown
      on:mouseenter
      on:mouseleave
      on:mouseout
      on:blur
      on:mouseover
      on:focus
      on:mousemove
      on:click={() => selectTab(tab)}
    >
      <slot />
    </button>
  {/if}
</div>

<style>
  button,
  a {
    display: inline-flex;
    /* min-width: 80px; */
    padding: 0 20px;
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
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    letter-spacing: 0.17px;
    width: 100%;
    text-decoration: none;
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

  div {
    display: inline-flex;
  }
  .grow {
    flex-grow: 1;
  }

  .selected {
    box-shadow: inset 0 -2px 0 0 rgb(var(--primary));
  }
  .selected button {
    color: rgb(var(--primary));
  }
</style>
