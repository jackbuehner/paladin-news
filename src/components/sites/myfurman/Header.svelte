<style>
  header {
    height: var(--app-bar-height);
    position: fixed;
    width: 100%;
    top: 0;
    background-color: var(--app-bar-background);
    overflow: hidden;
    z-index: 10;
    padding: 0 12px;
    transition: box-shadow 200ms;
    border-bottom: 1px solid var(--border-light);
  }
  header.scrolled {
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 4px 5px 0 rgba(0, 0, 0, 0.07),
      0 1px 10px 0 rgba(0, 0, 0, 0.06);
  }
  h1 {
    font-family: var(--font-logo);
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-style: italic;
    font-size: 26px;
    font-weight: 500;
    line-height: var(--app-bar-height);
    color: var(--secondary);
    margin: 3px 0 0 0;
    display: inline-block;
    position: absolute;
    left: 80px;
    transition: left 200ms;
    user-select: none;
  }
  h1 > span {
    font-size: 20px;
  }
  svg#logo {
    height: var(--app-bar-height);
    width: var(--app-bar-height);
    padding: calc((var(--app-bar-height) - 32px) / 2);
    color: var(--secondary);
    transition: left 0.2s, opacity 0.2s;
    position: relative;
    left: 0;
  }
  svg#menu {
    height: var(--app-bar-height);
    width: var(--app-bar-height);
    padding: calc((var(--app-bar-height) - 24px) / 2);
    font-size: 24px;
    position: absolute;
    opacity: 0;
    left: -20px;
    transition: left 0.2s, opacity 0.2s;
    fill: var(--secondary);
    z-index: 11;
  }
  nav {
    float: right;
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    height: var(--app-bar-height);
    position: relative;
    top: 0;
    right: 0;
    opacity: 1;
  }
  a:not(.btn),
  button:not(.btn) {
    height: 36px;
    line-height: 36px;
    letter-spacing: 0.8px;
    text-decoration: none;
    color: var(--secondary);
    font-weight: 500;
    font-family: var(--font-nav);
    padding: 0 15px;
    transition: padding 0.2s, letter-spacing 0.2s;
    border-radius: var(--radius);
    transition: ease 200ms;
    left: -20px;
  }
  a:hover,
  button:hover {
    color: var(--on-dark);
    background-color: var(--secondary);
    box-shadow: rgb(0 0 0 / 33%) 0px 3.2px 5.6px 0px, rgb(0 0 0 / 31%) 0px 0.3px 2.9px 0px;
  }
  a:active,
  button:active {
    background-color: var(--secondary);
    color: var(--on-dark);
    box-shadow: rgb(0 0 0 / 13%) 0px 1.6px 5.6px 0px, rgb(0 0 0 / 11%) 0px 0.3px 2.9px 0px;
  }
  .btn {
    border: none;
    background-color: var(--secondary);
    color: var(--on-dark);
    height: 36px;
    line-height: 36px;
    font-weight: 500;
    font-family: var(--font-nav);
    padding: 0 15px;
    border-radius: var(--radius);
    letter-spacing: 0.8px;
    text-decoration: none;
    transition: ease 200ms;
  }
  @media (max-width: 900px) {
    .hide-small {
      display: none;
    }
  }
  @media (max-width: 800px) {
    a:not(.btn) {
      padding: 0 10px;
      letter-spacing: 0.6px;
    }
    .btn {
      margin-left: 10px;
    }
  }
  @media (max-width: 730px) {
    a:not(.btn) {
      padding: 0 4px;
      letter-spacing: 0.4px;
    }
    .btn {
      margin-left: 16px;
    }
  }
  @media (max-width: 700px) {
    svg#menu {
      opacity: 1;
      left: 0;
    }
    svg#logo {
      left: -20px;
      opacity: 0;
    }
    h1 {
      left: 64px;
    }
    nav {
      position: absolute;
      top: 64px;
      flex-direction: column;
      width: 100%;
    }
    a:not(.btn) {
      right: unset;
      padding: 0 15px;
      width: calc(100% - 30px);
    }
    .btn {
      margin: 0;
      width: calc(100% - 30px);
      background-color: transparent;
      color: var(--secondary);
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { msalInstance } from '../../../stores/msalInstance';

  let innerWidth: number;
  let scrollY: number;
  let appbar: HTMLElement;

  function toggleNav() {
    if (appbar.style.height === '64px' && innerWidth <= 700) {
      appbar.style.height = '100vh';
    } else {
      appbar.style.height = '64px';
    }
  }

  onMount(() => {
    window.addEventListener(
      'resize',
      () => {
        if (innerWidth > 700) {
          appbar.style.height = '64px';
        }
      },
      true
    );
  });

  function signOut() {
    $msalInstance.logoutRedirect({ account: $msalInstance.getActiveAccount() });
  }
</script>

<svelte:window bind:innerWidth bind:scrollY />

<header id={'appbar'} bind:this={appbar} class:scrolled={scrollY > 0}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="18px"
    id="menu"
    height="18px"
    on:click={toggleNav}><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>
  <svg
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
    width="604px"
    height="604px"
    id={'logo'}
    viewBox="0 0 604 604"
    version="1.1">
    <g id="myfurman">
      <path
        d="M0 0L604 0L604 604L0 604L0 0Z"
        id="Background"
        fill="none"
        fill-rule="evenodd"
        stroke="none" />
      <g clip-path="url(#mask_1)">
        <path
          d="M130.936 95.951C134.146 86.2043 147.925 86.2043 151.135 95.951C158.512 118.402 176.123 135.996 198.557 143.373C208.304 146.583 208.304 160.363 198.557 163.572C176.107 170.95 158.512 188.561 151.135 210.995C147.925 220.742 134.146 220.742 130.936 210.995C123.559 188.544 105.948 170.95 83.5135 163.572C73.7668 160.363 73.7668 146.583 83.5135 143.373C105.948 135.996 123.559 118.385 130.936 95.951L130.936 95.951Z"
          id="Shape"
          fill="currentColor"
          fill-rule="evenodd"
          stroke="none" />
        <path
          d="M392.465 126.855C388.667 115.31 372.316 115.31 368.518 126.855L350.739 180.898C341.984 207.516 321.113 228.388 294.494 237.143L240.451 254.922C228.89 258.72 228.89 275.071 240.451 278.869L294.494 296.648C321.113 305.403 341.984 326.274 350.739 352.893L368.518 406.936C372.316 418.498 388.667 418.498 392.465 406.936L410.244 352.893C418.999 326.274 439.871 305.403 466.489 296.648L520.532 278.869C532.094 275.071 532.094 258.72 520.532 254.922L466.489 237.143C439.871 228.388 418.999 207.516 410.244 180.898L392.465 126.855L392.465 126.855Z"
          id="Shape"
          fill="currentColor"
          fill-rule="evenodd"
          stroke="none" />
        <path
          d="M203.414 353.716C199.616 342.171 183.265 342.171 179.467 353.716L177.283 360.337C168.528 386.955 147.656 407.827 121.038 416.582L114.417 418.766C102.855 422.564 102.855 438.915 114.417 442.713L121.038 444.897C147.656 453.653 168.528 474.524 177.283 501.142L179.467 507.78C183.265 519.341 199.616 519.341 203.414 507.78L205.598 501.142C214.354 474.524 235.225 453.653 261.843 444.897L268.464 442.713C280.026 438.915 280.026 422.564 268.464 418.766L261.843 416.582C235.225 407.827 214.354 386.955 205.598 360.337L203.414 353.716L203.414 353.716Z"
          id="Shape"
          fill="currentColor"
          fill-rule="evenodd"
          stroke="none" />
      </g>
    </g>
  </svg>
  <h1><span>My</span>Furman</h1>
  <nav>
    <a href={'https://www.furman.edu/offices-services/'}>Offices &amp; Services</a>
    <a href={'https://www.furman.edu/academics/departments/'}
      ><span class={'hide-small'}>Academic </span>Departments</a>
    <a href={'https://blogs.furman.edu/myfurman/a-z-for-students/'}>All Resources</a>
    <button on:click={signOut} class={'btn'}>Sign Out</button>
  </nav>
</header>
