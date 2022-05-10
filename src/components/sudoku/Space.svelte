<script lang="ts">
  export let forcedValue: number | undefined = undefined;
  export let value: number | undefined = undefined;

  export let top: boolean = false;
  export let right: boolean = false;
  export let bottom: boolean = false;
  export let left: boolean = false;
  export let disabled: boolean = false;

  function forceNumbers(
    e: KeyboardEvent & {
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) {
    const approvedInsert =
      e.key === '1' ||
      e.key === '2' ||
      e.key === '3' ||
      e.key === '4' ||
      e.key === '5' ||
      e.key === '6' ||
      e.key === '7' ||
      e.key === '8' ||
      e.key === '9';
    const approvedDelete = e.key === 'Backspace' || e.key === 'Delete';
    const approvedNavigate = e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight';
    if (approvedInsert && e.currentTarget.value.length === 0) return;
    if (approvedDelete && e.currentTarget.value.length > 0) return;
    if (approvedNavigate) return;
    e.preventDefault();
  }
</script>

{#if forcedValue}
  <div class:top class:right class:bottom class:left>
    <input type={'number'} value={forcedValue} disabled max={9} min={0} />
  </div>
{:else}
  <div class:top class:right class:bottom class:left>
    <input
      type="number"
      bind:value
      on:change
      on:keydown={forceNumbers}
      {disabled}
      max={9}
      min={0}
    />
  </div>
{/if}

<style>
  input {
    width: 50px;
    height: 50px;
    appearance: none;
    text-align: center;
    font-family: var(--font-detail);
    font-size: 16px;
    font-weight: 700;
    border: none;
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.076);
    font-style: italic;
    position: relative;
  }

  @media (max-width: 520px) {
    input {
      width: 40px;
      height: 40px;
    }
  }

  @media (max-width: 420px) {
    input {
      width: 32px;
      height: 32px;
    }
  }

  div {
    display: inline-flex;
    background: white;
    box-shadow: 0px 0px 0px 1px black;
  }

  input:disabled {
    background-color: rgba(200, 200, 200, 0.1);
    color: var(--color-neutral-dark);
    font-weight: 600;
    font-style: normal;
  }

  input:focus {
    box-shadow: inset 0 0 0 2px rgb(var(--primary));
  }

  div.top {
    margin-top: 3px;
  }

  div.right {
    margin-right: 3px;
  }

  div.bottom {
    margin-bottom: 3px;
  }

  div.left {
    margin-left: 3px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  @media print {
    input {
      background: none;
    }
  }
</style>
