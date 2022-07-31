<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ url }: LoadEvent) {
    // return 204 status when sveltekit tries to load scripts as pages
    // (this happens with embedded scripts and pwabuilder scripts)
    if (url.pathname.includes('/pwa-update.js') || url.pathname.includes('/js/')) {
      return { status: 204 };
    }

    // return the page path to the page
    return { props: { path: url.pathname } };
  }
</script>

<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Search from '$lib/components/search/Search.svelte';
  import { title } from '$lib/stores/title';
  import type { LoadEvent } from '@sveltejs/kit';
  import { afterUpdate, onMount } from 'svelte';

  // keep track of the page path
  export let path: string;
  afterUpdate(() => {
    // keep the path updated when the component changes
    path = window.location.pathname;
  });

  // determine the header type based on path
  let headerType: 'full' | 'compact';
  $: headerType = path === '/' ? 'full' : 'compact'; // full only when on home page
  onMount(() => {
    window.addEventListener('sveltekit:navigation-end', () => {
      headerType = path === '/' ? 'full' : 'compact'; // full only when on home page
    });
  });

  // create the document title
  $: title_ = $title || path !== '/' ? `${$title} - The Paladin` : 'The Paladin';
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

<style>
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
</style>
