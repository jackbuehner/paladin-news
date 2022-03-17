<script lang="ts">
  import { onMount } from 'svelte';
  import { get as getStore } from 'svelte/store';
  import { Applause } from './Applause';

  // component props
  export let onDebouncedChange = (claps: number, newClaps: number) => {};
  export let initialClaps = 0;
  export let id: string;

  // manage button interactions
  let clicked = false;
  let clickTimer: NodeJS.Timeout;
  let active = false;
  let bubbleTimer: NodeJS.Timeout;
  let interacted = false;

  // track claps
  let claps: Applause;
  let userClaps = 0;

  onMount(() => {
    claps = new Applause(id, 15, initialClaps);

    // number of times the current client has clapped
    userClaps = getStore(claps.clientClapsStore);
    claps.clientClapsStore.subscribe((claps) => {
      userClaps = claps;
    });

    // tell parent that the number of claps changed
    // after it has been three seconds (debounce)
    let sentClaps = $claps; // keep track of the previous number of claps sent in the onChange function
    let newClaps = 0; // the number of new claps (claps - sentClaps)
    let changeTimer: NodeJS.Timer;
    claps.clapsStore.subscribe((claps) => {
      // remove previous timeout if it has not already executed
      clearTimeout(changeTimer);

      // send claps after 1.4 seconds
      changeTimer = setTimeout(() => {
        newClaps = claps - sentClaps;
        onDebouncedChange(claps, claps - sentClaps);
        sentClaps = claps;
      }, 1400);
    });
  });

  let randomFloat: number;
</script>

<div class={'outer-container'}>
  <button
    on:mousedown={() => {
      claps?.onMouseDown();
      randomFloat = Math.random();
      active = true;
      clearTimeout(bubbleTimer);
      clearTimeout(clickTimer);
      clicked = true;
      interacted = true;
      clickTimer = setTimeout(() => {
        clicked = false;
      }, 250);
    }}
    on:mouseup={() => {
      claps?.onMouseUp();
      // expire counter bubble after the user has not clicked
      // the button in a while (aka the user is inactive)
      bubbleTimer = setTimeout(() => (active = false), 1000);
    }}
    on:mouseleave={() => {
      claps?.onMouseUp();
      bubbleTimer = setTimeout(() => (active = false), 1000);
    }}
    aria-label={`clap`}
    class={`global-icon-button`}
    class:clapped={userClaps > 0}
    class:clicked
    class:active
    class:interacted
    class:inactive={!active}
  >
    {#if userClaps > 0}
      <svg class={`hands`} viewBox={`0 0 29 29`}>
        <g fill-rule="evenodd"
          ><path
            d="M13.74 1l.76 2.97.76-2.97zM18.63 2.22l-1.43-.47-.4 3.03zM11.79 1.75l-1.43.47 1.84 2.56zM24.47 14.3L21.45 9c-.29-.43-.69-.7-1.12-.78a1.16 1.16 0 0 0-.91.22c-.3.23-.48.52-.54.84l.05.07 2.85 5c1.95 3.56 1.32 6.97-1.85 10.14a8.46 8.46 0 0 1-.55.5 5.75 5.75 0 0 0 3.36-1.76c3.26-3.27 3.04-6.75 1.73-8.91M14.58 10.89c-.16-.83.1-1.57.7-2.15l-2.5-2.49c-.5-.5-1.38-.5-1.88 0-.18.18-.27.4-.33.63l4.01 4z"
          /><path
            d="M17.81 10.04a1.37 1.37 0 0 0-.88-.6.81.81 0 0 0-.64.15c-.18.13-.71.55-.24 1.56l1.43 3.03a.54.54 0 1 1-.87.61L9.2 7.38a.99.99 0 1 0-1.4 1.4l4.4 4.4a.54.54 0 1 1-.76.76l-4.4-4.4L5.8 8.3a.99.99 0 0 0-1.4 0 .98.98 0 0 0 0 1.39l1.25 1.24 4.4 4.4a.54.54 0 0 1 0 .76.54.54 0 0 1-.76 0l-4.4-4.4a1 1 0 0 0-1.4 0 .98.98 0 0 0 0 1.4l1.86 1.85 2.76 2.77a.54.54 0 0 1-.76.76L4.58 15.7a.98.98 0 0 0-1.4 0 .99.99 0 0 0 0 1.4l5.33 5.32c3.37 3.37 6.64 4.98 10.49 1.12 2.74-2.74 3.27-5.54 1.62-8.56l-2.8-4.94z"
          /></g
        >
      </svg>
    {:else}
      <svg class={`hands`} viewBox={`0 0 25 25`}>
        <g fill-rule="evenodd"
          ><path
            d="M11.74 0l.76 2.97.76-2.97zM14.81 3.78l1.84-2.56-1.42-.47zM8.38 1.22l1.84 2.56L9.8.75zM20.38 21.62a5.11 5.11 0 0 1-3.16 1.61l.49-.45c2.88-2.89 3.45-5.98 1.69-9.21l-1.1-1.94-.96-2.02c-.31-.67-.23-1.18.25-1.55a.84.84 0 0 1 .66-.16c.34.05.66.28.88.6l2.85 5.02c1.18 1.97 1.38 5.12-1.6 8.1M7.1 21.1l-5.02-5.02a1 1 0 0 1 .7-1.7 1 1 0 0 1 .72.3l2.6 2.6a.44.44 0 0 0 .63-.62L4.1 14.04l-1.75-1.75a1 1 0 1 1 1.41-1.41l4.15 4.15a.44.44 0 0 0 .63 0 .44.44 0 0 0 0-.62L4.4 10.26 3.22 9.08a1 1 0 0 1 0-1.4 1.02 1.02 0 0 1 1.41 0l1.18 1.16L9.96 13a.44.44 0 0 0 .62 0 .44.44 0 0 0 0-.63L6.43 8.22a.99.99 0 0 1-.3-.7.99.99 0 0 1 .3-.7 1 1 0 0 1 1.41 0l7 6.98a.44.44 0 0 0 .7-.5l-1.35-2.85c-.31-.68-.23-1.19.25-1.56a.85.85 0 0 1 .66-.16c.34.06.66.28.88.6L18.63 14c1.57 2.88 1.07 5.54-1.55 8.16a5.62 5.62 0 0 1-5.06 1.65 9.35 9.35 0 0 1-4.93-2.72zM11 5.98l2.56 2.56c-.5.6-.56 1.41-.15 2.28l.26.56-4.25-4.25a.98.98 0 0 1-.12-.45 1 1 0 0 1 .29-.7 1.02 1.02 0 0 1 1.41 0zm8.89 2.06c-.38-.56-.9-.92-1.49-1.01a1.74 1.74 0 0 0-1.34.33c-.38.29-.61.65-.71 1.06a2.1 2.1 0 0 0-1.1-.56 1.78 1.78 0 0 0-.99.13l-2.64-2.64a1.88 1.88 0 0 0-2.65 0 1.86 1.86 0 0 0-.48.85 1.89 1.89 0 0 0-2.67-.01 1.87 1.87 0 0 0-.5.9c-.76-.75-2-.75-2.7-.04a1.88 1.88 0 0 0 0 2.66c-.3.12-.61.29-.87.55a1.88 1.88 0 0 0 0 2.66l.62.62a1.88 1.88 0 0 0-.9 3.16l5.01 5.02c1.6 1.6 3.52 2.64 5.4 2.96a7.16 7.16 0 0 0 1.18.1c1.03 0 2-.25 2.9-.7A5.9 5.9 0 0 0 21 22.24c3.34-3.34 3.08-6.93 1.74-9.17l-2.87-5.04z"
          /></g
        >
      </svg>
    {/if}
    <div class={`spark-container`} class:left={randomFloat < 0.35} class:right={randomFloat > 0.65}>
      <svg
        class={`spark`}
        width="46"
        height="43"
        viewBox="0 0 46 43"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.5 12L21.3349 3L25.6651 3L23.5 12Z" fill="#EB7990" />
        <path
          d="M12.2405 19.6651L3.36372 17.0401L5.52878 13.2901L12.2405 19.6651Z"
          fill="#EB7990"
        />
        <path d="M34.25 19.6651L40.9617 13.2901L43.1268 17.0401L34.25 19.6651Z" fill="#EB7990" />
        <path d="M30.602 32.9192L38.8987 37.0244L36.1239 40.3486L30.602 32.9192Z" fill="#EB7990" />
        <path
          d="M16.1178 32.9193L10.5956 40.3485L7.82097 37.0242L16.1178 32.9193Z"
          fill="#EB7990"
        />
        <rect x="34" y="14" width="2" height="2" fill="#89948C" />
        <rect x="18" y="9" width="2" height="2" fill="#89948C" />
        <rect x="8" y="22" width="2" height="2" fill="#89948C" />
        <rect x="18" y="35" width="2" height="2" fill="#89948C" />
        <rect x="34" y="29" width="2" height="2" fill="#89948C" />
      </svg>
    </div>
    <span class={'bubble'}>{`+${userClaps}`}</span>
  </button>
  {#if claps}
    <span class="counter">{$claps}</span>
  {/if}
</div>

<style>
  .outer-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .global-icon-button {
    --size: 48px;
    --radius: 50%;
    --icon-size: 24px;
    position: relative;
  }

  .global-icon-button.clapped {
    --icon-size: 28px;
  }

  .global-icon-button.disabled {
    cursor: not-allowed;
  }

  .counter {
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 500;
    cursor: default;
    user-select: none;
  }

  /* sparks */
  .global-icon-button.clicked .spark {
    animation: spark 0.25s ease forwards;
  }

  .spark-container {
    position: absolute;
    left: 0;
    top: -2px;
    z-index: 1;
    width: calc(var(--size) * 1);
    height: calc(var(--size) * 1);
  }

  .spark-container.left {
    transform: rotate(-20deg);
  }

  .spark-container.right {
    transform: rotate(20deg);
  }

  .spark-container .spark {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.4);
    width: calc(var(--size) * 1);
    height: calc(var(--size) * 1);
  }

  @keyframes spark {
    20% {
      opacity: 1;
      visibility: visible;
    }

    70% {
      opacity: 1;
    }

    100% {
      opacity: 0;
      transform: scale(1.4);
    }
  }

  /* scale hands on click */
  .global-icon-button .hands {
    transition: transform 0.25s ease;
  }
  .global-icon-button.clicked .hands {
    transform: scale(1.1);
  }

  /* COUNTER BUBBLE */
  /* hide counter while button is active */

  /* when the button becomes inactive after an interaction, start the upwards transition */
  .global-icon-button.clapped.inactive.interacted .bubble {
    animation: bubble 0.55s ease forwards;
  }

  .global-icon-button.active .bubble,
  .global-icon-button.clicked .bubble {
    opacity: 1;
    visibility: visible;
  }

  .global-icon-button.active .bubble {
    transform: translateY(-46px);
  }

  .global-icon-button.clicked .bubble {
    transform: translateY(-46px) scale(1.05);
  }

  .bubble {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    left: 3px;
    height: 36px;
    width: 36px;
    font-family: var(--font-detail);
    font-size: 13px;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--button-color);
    color: #ffffff;
    padding: 8px;
    border-radius: 30px;
    transform: translateY(-30px);
    transition: transform 0.1s ease;
  }

  @keyframes bubble {
    0% {
      opacity: 1;
      visibility: visible;
      transform: translateY(-46px);
    }

    60% {
      opacity: 0;
    }

    100% {
      transform: translateY(-100px);
    }
  }
</style>
