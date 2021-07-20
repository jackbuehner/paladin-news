<style>
  /* wrapper for the topbar */
  .topbar {
    height: 52px;
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
    .topbar-wrapper {
      position: sticky;
      top: 0;
      z-index: 99;
    }
    .topbar.scrolled {
      border-bottom: 1px solid transparent;
    }
    .topbar-wrapper.scrolled {
      box-shadow: var(--topbar-scroll-shadow);
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
    margin: 4px 0 0 0;
  }
  .logo > a {
    display: inline-block;
  }
</style>

<script lang="typescript">
  import IconButton from '../IconButton.svelte';
  import Container from '../Container.svelte';
  import ThePaladinLogo from '../svgs/ThePaladinLogo.svelte';
  import HorizontalNav from './_HorizontalNav.svelte';
  import SideNav from './_SideNav.svelte';

  $: windowWidth = 0;
  $: windowScrollY = 0;

  let isSideNavOpen = false;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={windowScrollY} />

<div class="topbar-wrapper" class:scrolled={windowScrollY > 0}>
  <Container>
    <div class="topbar" class:scrolled={windowScrollY > 0}>
      <div class="left">
        <IconButton on:click={() => (isSideNavOpen = !isSideNavOpen)}
          ><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></IconButton>
      </div>
      <div class="logo">
        <a href="."><ThePaladinLogo width={'100%'} height={46} /></a>
      </div>
      <div class="right">
        <IconButton disabled={true}
          ><path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" /></IconButton>
      </div>
    </div>
  </Container>
</div>

<SideNav bind:isOpen={isSideNavOpen} />

<slot />