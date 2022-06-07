<script lang="ts">
  import { page } from '$app/stores';

  import { headerLabel, headerNoLogoUntil } from '../../stores/header';
  import Container from '../Container.svelte';
  import IconButton from '../IconButton.svelte';
  import SideNav from './_SideNav.svelte';

  $: windowWidth = 0;
  $: windowScrollY = 0;

  let isSideNavOpen = false;
  const color = `var(--topbar-color)`;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={windowScrollY} />

{#if windowWidth <= 990}
  <div style={'flex: 0 0 52px'} class={`sticky-spacer`} />
{/if}

<div class="topbar-wrapper compact-header" class:scrolled={windowScrollY > 0}>
  <Container width={$page.url.pathname === '/games' ? '100%' : '1200px'}>
    <div class="topbar" class:scrolled={windowScrollY > 0}>
      <div class="left">
        <IconButton ariaLabel={'menu'} on:click={() => (isSideNavOpen = !isSideNavOpen)} {color}
          ><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></IconButton
        >
        {#if $headerLabel}
          <div class={'label'}>{$headerLabel}</div>
        {/if}
      </div>
      <div class="logo" class:hidden={windowScrollY < $headerNoLogoUntil}>
        <a href={'/games'} aria-label={'games home'}
          ><span class={'logotext'}
            >The Paladin <span
              class={'logotext'}
              style={`height: 30px;
            align-items: center;`}>⁘</span
            > Games</span
          ></a
        >
      </div>
      <div class="right" />
    </div>
  </Container>
</div>

<SideNav bind:isOpen={isSideNavOpen} />

<slot />

<style>
  .logotext {
    font-family: var(--font-headline);
    font-size: 19px;
    font-weight: 700;
    line-height: 36px;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    font-style: italic;
    /* filter: drop-shadow(rgb(0 0 0 / 40%) 0 0 1px); */
    white-space: pre;
    display: flex;
  }

  .topbar {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  /* wrapper for the topbar */
  .topbar-wrapper {
    border-bottom: 1px solid var(--border-light);
    background-color: var(--topbar-bg);
    transition: box-shadow 200ms;
  }
  .sticky-spacer {
    display: none;
  }
  @media (max-width: 990px) {
    .topbar-wrapper {
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 99;
    }
    .topbar.scrolled {
      border-bottom: 1px solid transparent;
    }
    .topbar-wrapper.scrolled {
      box-shadow: var(--topbar-scroll-shadow);
    }
    .sticky-spacer {
      display: block;
    }
  }

  /* containers for the buttons in the header */
  .left,
  .right {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  /* container for small logo in header */
  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 1;
    transition: opacity 200ms, background-color 240ms;
    margin: 2px 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 6px;
    padding: 0 10px;
    border-radius: var(--radius);
  }
  .logo > a {
    display: inline-block;
    color: var(--topbar-color);
    text-decoration: none;
  }
  .logo.hidden {
    opacity: 0;
  }

  .logo:hover {
    background-color: rgba(var(--primary), 0.08);
  }
  .logo:active {
    background-color: rgba(var(--primary), 0.16);
  }

  /* label in header */
  .label {
    font-family: var(--font-detail);
    font-size: 16px;
    font-weight: 700;
    line-height: 36px;
    text-transform: uppercase;
    margin-left: 16px;
    letter-spacing: 0.7px;
  }
  @media (max-width: 760px) {
    .label {
      display: none;
    }
  }

  /* hide when printing */
  @media print {
    .topbar-wrapper,
    .sticky-spacer {
      display: none;
    }
  }
</style>
