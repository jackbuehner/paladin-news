<script lang="ts">
  import { page } from '$app/stores';
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/header/Header.svelte';
  import Search from '$lib/components/search/Search.svelte';
  import { title } from '$lib/stores/title';
  import { afterUpdate, onMount } from 'svelte';

  // keep track of the page path
  export let path: string = $page.url.pathname;
  afterUpdate(() => {
    // keep the path updated when the component changes
    path = $page.url.pathname;
  });

  // determine the header type based on path
  let headerType: 'full' | 'compact';
  $: headerType = path === '/' ? 'full' : 'compact'; // full only when on home page
  onMount(() => {
    window.addEventListener('sveltekit:navigation-end', () => {
      headerType = path === '/' ? 'full' : 'compact'; // full only when on home page
    });
  });

  $: isSatireHome = path.indexOf('/the-horse') === 0;
  $: isSatire = isSatireHome || path.indexOf('/satire') === 0;

  // create the document title
  $: title_ = (() => {
    if (path === '/') return 'The Paladin';
    if (isSatireHome) return 'The Horse';
    if (isSatire) return `${$title} - The Horse`;
    return `${$title} - The Paladin`;
  })();
</script>

<svelte:head>
  <title>{title_}</title>
</svelte:head>

<div class={'wrapper'}>
  <Header type={headerType} />
  <div class={'content'}>
    <slot />
  </div>

  {#if isSatire}
    <span />
  {:else}
    <Footer />
  {/if}
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
