<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import Container from '../Container.svelte';
  import ThePaladinLogo from '../svgs/ThePaladinLogo.svelte';
  import TheHorseLogo from '../svgs/TheHorseLogo.svelte';
  import SideNav from './_SideNav.svelte';
  import { headerLabel } from '../../stores/header';
  import { headerIsSatire } from '../../stores/header';
  import { headerNoLogoUntil } from '../../stores/header';
  import { searchOpen } from '../../stores/search';

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
  <Container>
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
        {#if $headerIsSatire}
          <a href={'/satire'} aria-label={'satire home'}
            ><TheHorseLogo width={'100%'} height={46} /></a
          >
        {:else}
          <a href={'/'} aria-label={'home'}><ThePaladinLogo width={'100%'} height={46} /></a>
        {/if}
      </div>
      <div class="right">
        <IconButton ariaLabel={'search'} on:click={() => ($searchOpen = true)} {color}
          ><path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          /></IconButton
        >
      </div>
    </div>
  </Container>
</div>

<SideNav bind:isOpen={isSideNavOpen} />

<slot />

<style>
  /* wrapper for the topbar */
  .topbar {
    height: 52px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
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
    transition: opacity 200ms;
    margin: 4px 0 0 0;
  }
  .logo > a {
    display: inline-block;
    color: var(--topbar-color);
  }
  .logo.hidden {
    opacity: 0;
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
</style>
