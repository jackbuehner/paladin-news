<style>
  div.wrapper {
    display: flex;
    flex-direction: column;
    height: fit-content;
    min-height: 100%;
  }
  div.content {
    flex-grow: 1;
  }
</style>

<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page }) {
    return { props: { path: page.path } };
  }
</script>

<script lang="ts">
  import { title } from '../../src/stores/title';
  import Footer from '../components/Footer.svelte';
  import Header from '../components/header/Header.svelte';
  import Search from '/src/components/search/Search.svelte';
  import NProgress from 'nprogress';
  import { onMount, afterUpdate } from 'svelte';

  $: title_ = $title ? `${$title} - The Paladin` : 'The Paladin';

  // determine the header type based on path
  export let path: string;
  afterUpdate(() => {
    // keep the path updated when the component changes
    path = window.location.pathname;
  });
  $: headerType = path === '/' ? 'full' : (undefined as 'full' | undefined); // full only when on home page

  onMount(() => {
    // configure the navigation progress bar
    NProgress.configure({
      parent: 'body',
      easing: 'ease',
      speed: 500,
      trickle: true,
      trickleSpeed: 200,
      showSpinner: false,
    });

    // show progress bar on page navigate
    window.addEventListener('sveltekit:navigation-start', () => {
      NProgress.start();
    });

    // hide progress bar on navigation end
    window.addEventListener('sveltekit:navigation-end', () => {
      NProgress.done();
    });
  });
</script>

<svelte:head>
  <title>{title_}</title>
</svelte:head>

<div class={'wrapper'}>
  <Header type={headerType} />

  <div class={'content'}>
    <slot />
  </div>

  <Footer />
</div>

<Search />
