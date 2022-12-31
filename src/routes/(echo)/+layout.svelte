<script lang="ts">
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import SideNav from '$lib/components/header/_SideNav.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import TheEchoLogo from '$lib/components/svgs/TheEchoLogo.svelte';
  import { title } from '$lib/stores/title';
  import { afterUpdate } from 'svelte';

  let isSideNavOpen = false;

  // keep track of the page path
  export let path: string = $page.url.pathname;
  afterUpdate(() => {
    // keep the path updated when the component changes
    path = $page.url.pathname;
  });

  // create the document title
  $: title_ = (() => {
    if (path === '/magazine')
      return `The Echo – Furman University's Student Literary and Arts Magazine `;
    return `${$title} – The Echo`;
  })();
</script>

<svelte:head>
  <title>{title_}</title>
</svelte:head>

<div class="wrapper">
  <Container backgroundColor="var(--echo-header-bg)" width="800px">
    <header>
      <div class="toprow">
        <div class="left">
          <IconButton ariaLabel={'menu'} on:click={() => (isSideNavOpen = !isSideNavOpen)}>
            <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
          </IconButton>
        </div>
        <div class="center">
          <a href="/magazine">
            <TheEchoLogo size={140} />
          </a>
        </div>
        <div class="right">
          <IconButton
            ariaLabel="view The Paladin on Facebook"
            href="https://www.facebook.com/furmanecho"
          >
            <path
              d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
            />
          </IconButton>
          <IconButton
            ariaLabel="view The Paladin on Instagram"
            href="https://www.instagram.com/furman.echo/"
          >
            <path
              d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
            />
          </IconButton>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="/magazine">Home</a></li>
          <li><a href="/magazine/category/poetry">Poetry</a></li>
          <li><a href="/magazine/category/photography">Photography</a></li>
          <li><a href="/magazine/category/studio-art">Studio Art</a></li>
          <li><a href="/magazine/category/prose">Prose</a></li>
          <li><a href="/">The Paladin</a></li>
        </ul>
      </nav>
    </header>
  </Container>

  <div class="content">
    <slot />
  </div>

  <Footer bottomOnly />
</div>

<SideNav bind:isOpen={isSideNavOpen} />

<style>
  :global(:root) {
    --echo-header-bg: #ffffff;
    --echo-header-border-color: var(--color-neutral-light);
    --echo-font-heading: 'Bodoni72';
    --echo-font-body: 'Pala';
  }

  header {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--echo-header-border-color);
    padding: 6px 0;
  }

  header .toprow {
    display: grid;
    grid-template-columns: 120px 2fr 120px;
    grid-template-rows: 1fr;
  }

  @media (max-width: 500px) {
    header .toprow {
      grid-template-columns: 36px 2fr 36px;
    }

    header .toprow .right {
      display: none;
    }
  }

  header .toprow > div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }

  header .toprow .left {
    justify-content: flex-start;
  }

  header .toprow .center {
    margin: 10px 0 14px 0;
  }

  header .toprow .right {
    justify-content: flex-end;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  nav ul li {
    display: contents;
  }

  nav ul a {
    font-family: var(--font-detail);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--color-neutral-dark);
    text-decoration: none;
    padding: 2.5px 10px 4px 10px;
    background-color: var(--button-bg);
    border: 1px solid transparent;
    transition: 200ms;
    border-radius: var(--radius);
    white-space: nowrap;
    cursor: default;
  }
  nav ul a:hover {
    background-color: var(--button-bg-hover);
    border: 1px solid var(--button-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  nav ul a:active {
    background-color: var(--button-bg-active);
    border: 1px solid var(--button-bg-active);
    box-shadow: var(--button-shadow-active);
  }

  div.wrapper {
    display: flex;
    flex-direction: column;
    height: fit-content;
    min-height: 100%;
  }

  div.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  a[href='/magazine'] {
    color: inherit;
  }

  @media print {
    header {
      display: none;
    }
  }
</style>
