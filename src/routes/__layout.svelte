<style>
  div.wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  div.content {
    flex-grow: 1;
  }
</style>

<script>
  import { title } from '../../src/stores/title';
  import Footer from '../components/Footer.svelte';
  import CompactHeader from '../components/header/CompactHeader.svelte';
  import Search from '/src/components/search/Search.svelte';
  import NProgress from 'nprogress';
  import { onMount } from 'svelte';

  $: title_ = $title ? `${$title} - The Paladin` : 'The Paladin';

  // keep track of window width
  $: windowWidth = 0;

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

<svelte:window bind:innerWidth={windowWidth} />

<!--do not show content until windowWidth has been calculated-->
{#if windowWidth > 0}
  <div class={'wrapper'}>
    <CompactHeader />

    <div class={'content'}>
      <slot />
    </div>

    <Footer />
  </div>
{/if}

<Search />
