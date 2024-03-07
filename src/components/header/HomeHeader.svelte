<script lang="ts">
  import { browser } from '$app/environment';
  import { DateTime } from 'luxon';
  import { searchOpen } from '../../stores/search';
  import Container from '../Container.svelte';
  import IconButton from '../IconButton.svelte';
  import ThePaladinLogo from '../svgs/ThePaladinLogo.svelte';
  import ThePaladinLogoAlt from '../svgs/ThePaladinLogoAlt.svelte';
  import HorizontalNav from './_HorizontalNav.svelte';
  import SideNav from './_SideNav.svelte';

  $: windowWidth = 0;
  $: windowScrollY = 0;

  let isSideNavOpen = false;
  const color = `var(--topbar-color)`;

  function ordinal(n: number) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const todayDateTime = DateTime.fromISO(new Date().toISOString(), { zone: 'utc' });
  const today =
    todayDateTime.toFormat('EEEE, LLLL ') +
    ordinal(parseInt(todayDateTime.toFormat('d'))) +
    todayDateTime.toFormat(', yyyy');
</script>

<svelte:window bind:innerWidth={windowWidth} bind:scrollY={windowScrollY} />

<Container>
  <div class="quick-links">
    <div>
      <a href="/about">About</a>
      <a href="/contact">Ads</a>
      <a href="/contact">Tips</a>
      <a href="/contact">Submit Work</a>
    </div>
    <div>{today}</div>
    <div>
      <a href="/jobs">Jobs</a>
    </div>
  </div>
</Container>
<div class="topbar-wrapper" class:scrolled={windowScrollY > 0}>
  <div class="topbar" class:scrolled={windowScrollY > 0}>
    <div class="left">
      <div class="left" onclick="toggleSideNav()">
        <IconButton ariaLabel={'menu'} {color}>
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </IconButton>
      </div>
      {#if browser && windowWidth > 760}
        <IconButton ariaLabel={'search'} on:click={() => ($searchOpen = true)} {color}>
          <path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </IconButton>
      {/if}
    </div>
    <div class="logo" class:hidden={windowScrollY < 180}>
      <a href={'/'} aria-label={'home'}><ThePaladinLogo width={'100%'} height={46} /></a>
    </div>
    <div class="right">
      <div class="gt-760">
        <IconButton
          ariaLabel={'view The Paladin on Facebook'}
          href={'https://www.facebook.com/thepaladin.news'}
          target={'_blank'}
          rel={'external noopener noreferrer'}
        >
          <path
            d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
          />
        </IconButton>
        <IconButton
          ariaLabel={'view The Paladin on Twitter'}
          href={'https://twitter.com/thepaladin_news'}
          target={'_blank'}
          rel={'external noopener noreferrer'}
        >
          <path
            d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
          />
        </IconButton>
        <IconButton
          ariaLabel={'view The Paladin on Instagram'}
          href={'https://instagram.com/thepaladin.news?igshid=1jfrjveophlx7'}
          target={'_blank'}
          rel={'external noopener noreferrer'}
        >
          <path
            d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
          />
        </IconButton>
        <IconButton
          ariaLabel={'view The Paladin on LinkedIn'}
          href={'https://www.linkedin.com/company/thepaladin/'}
          target={'_blank'}
          rel={'external noopener noreferrer'}
        >
          <path
            d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
          />
        </IconButton>
      </div>
      {#if browser && windowWidth <= 760}
        <IconButton ariaLabel={'search'} on:click={() => ($searchOpen = true)} {color}>
          <path
            d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
          />
        </IconButton>
      {/if}
    </div>
  </div>
</div>
<Container>
  <div class="logo-wrapper">
    <a href={'/'} aria-label={'home'}><ThePaladinLogoAlt width={416} height={36} /></a>
  </div>
  <div class={`horizontal-nav`}>
    <HorizontalNav />
  </div>
</Container>
<SideNav bind:isOpen={isSideNavOpen} />

<slot />

<style>
  /* wrapper for the topbar */
  .topbar {
    height: 42px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  .topbar-wrapper {
    background-color: var(--topbar-bg);
    transition: box-shadow 200ms;
    padding: 0 13px;
    margin: 0 auto;
    max-width: 1214px;
    width: 100%;
    box-sizing: content-box;
  }
  @media (max-width: 1214px) {
    .topbar-wrapper {
      box-sizing: border-box;
    }
  }
  @media (max-width: 990px) {
    .topbar {
      height: 52px;
      border-bottom: 1px solid var(--border-light);
      padding: 0 20px;
    }
    .topbar.scrolled {
      border-bottom: 1px solid transparent;
    }
    .topbar-wrapper {
      position: sticky;
      align-self: flex-start;
      top: 0;
      z-index: 99;
      padding: 0;
    }
    .topbar-wrapper.scrolled {
      box-shadow: var(--topbar-scroll-shadow);
    }
  }

  /* wrapper for the logo */
  .logo-wrapper {
    padding: 26px 0 24px 0;
    margin-top: -42px;
    display: flex;
    justify-content: center;
  }
  .logo-wrapper > a {
    display: inline-block;
    color: var(--topbar-color);
  }
  @media (max-width: 990px) {
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
  @media (max-width: 760px) {
    .gt-760 {
      display: none;
    }
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
    div.horizontal-nav {
      display: none;
    }
  }

  /* links row at top */
  .quick-links {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    height: 30px;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    font-size: 13px;
    font-family: var(--font-detail);
  }

  @media (max-width: 990px) {
    .quick-links {
      display: none;
    }
  }

  .quick-links > div:nth-of-type(2) {
    justify-content: center;
  }

  .quick-links > div:nth-of-type(3) {
    justify-content: end;
  }

  .quick-links > div {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }

  .quick-links a {
    color: var(--color-neutral-dark);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  .quick-links a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  .quick-links a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
