<style>
  /* wrapper for the topbar */
  .topbar {
    height: 42px;
    border-bottom: 1px solid var(--border-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .topbar-wrapper {
    background-color: var(--topbar-bg);
    transition: box-shadow 200ms;
  }
  @media (max-width: 990px) {
    .topbar {
      height: 52px;
    }
    .topbar.scrolled {
      border-bottom: 1px solid transparent;
    }
    .topbar-wrapper {
      position: sticky;
      top: 0;
      z-index: 99;
    }
  }

  /* wrapper for the logo */
  .logo-wrapper {
    padding: 16px 0 20px 0;
    display: flex;
    justify-content: center;
  }
  .logo-wrapper > a {
    display: inline-block;
    color: var(--topbar-color);
  }
  @media (max-width: 990px) {
    .logo-wrapper {
      border-bottom: 1px solid var(--border-light);
    }
  }
  @media (max-width: 560px) {
    .logo-wrapper {
      display: none;
    }
  }

  /* containers for the buttons in the header */
  .left,
  .right {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
  }

  /* container for small logo in header */
  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  .logo > a {
    display: inline-block;
    color: var(--topbar-color);
  }
  @media (max-width: 990px) {
    .logo {
      margin: 4px 0 0 0;
      opacity: 1;
      transition: opacity 200ms;
    }
    .logo.hidden {
      opacity: 0;
    }
    div.horizontal-nav {
      display: none;
    }
  }
  @media (max-width: 560px) {
    .logo,
    .logo.hidden {
      opacity: 1;
    }
  }
</style>

<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import ThePaladinLogo from '../svgs/ThePaladinLogo.svelte';
  import TheHorseLogo from '../svgs/TheHorseLogo.svelte';
  import HorizontalNav from './_HorizontalNav.svelte';
  import SideNav from './_SideNav.svelte';
  import { searchOpen } from '../../stores/search';
  import SignInUp from './SignInUp.svelte';

  $: windowWidth = 0;
  $: windowScrollY = 0;

  let isSideNavOpen = false;
  export let isSatire = false;
  const color = `var(--topbar-color)`;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={windowScrollY} />

<div class="topbar-wrapper">
  <div class="topbar" class:scrolled={windowScrollY > 0}>
    <div class="left">
      <IconButton ariaLabel={'menu'} on:click={() => (isSideNavOpen = !isSideNavOpen)} {color}
        ><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></IconButton>
      {#if windowWidth > 760}
        <IconButton ariaLabel={'search'} on:click={() => ($searchOpen = true)} {color}
          ><path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></IconButton>
      {/if}
    </div>
    <div class="logo" class:hidden={windowScrollY < 180}>
      {#if isSatire}
        <a href={'/satire'} aria-label={'satire home'}
          ><TheHorseLogo width={'100%'} height={46} /></a>
      {:else}
        <a href={'/'} aria-label={'home'}><ThePaladinLogo width={'100%'} height={46} /></a>
      {/if}
    </div>
    <div class="right">
      {#if windowWidth > 760}
        <SignInUp />
      {:else}
        <IconButton ariaLabel={'search'} on:click={() => ($searchOpen = true)} {color}
          ><path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></IconButton>
        <SignInUp isCompact />
      {/if}
    </div>
  </div>
</div>
<div class="logo-wrapper">
  {#if isSatire}
    <a href={'/satire'} aria-label={'satire home'}><TheHorseLogo width={307} height={140} /></a>
  {:else}
    <a href={'/'} aria-label={'home'}><ThePaladinLogo width={416} height={140} /></a>
  {/if}
</div>
<div class={`horizontal-nav`}>
  <HorizontalNav />
</div>
<SideNav bind:isOpen={isSideNavOpen} />

<slot />
