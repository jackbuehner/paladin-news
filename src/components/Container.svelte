<script lang="ts">
  export let width: string | number = 1200;
  export let backgroundColor: string = 'transparent';
  export let borderBottom: string = 'none';
  export let expandUp: number = 0;
  export let expandDown: number = 0;
  export let grow: boolean = false;
</script>

<div
  class="outer"
  class:grow
  style={`--this-background-color: ${backgroundColor}; --expandUp: ${expandUp}px; --expandDown: ${expandDown}px`}
>
  {#if typeof width === 'number'}
    <div class="inner" style={`--width: ${width}px; --borderBottom: ${borderBottom}`}>
      <slot />
    </div>
  {:else}
    <div class="inner" style={`--width: ${width}; --borderBottom: ${borderBottom}`}>
      <slot />
    </div>
  {/if}
</div>

<style>
  .outer {
    display: flex;
    margin: calc(var(--expandUp) * -1) 0 calc(var(--expandDown) * -1) 0;
    padding: var(--expandUp) 20px var(--expandDown) 20px;
    justify-content: center;
    background-color: var(--this-background-color);
  }
  .outer.grow {
    flex-grow: 1;
  }
  .inner {
    width: var(--width);
    border-bottom: var(--borderBottom);
  }
  @media print {
    .outer {
      padding: 0;
    }
  }
</style>
