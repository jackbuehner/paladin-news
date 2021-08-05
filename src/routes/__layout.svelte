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

  $: title_ = $title ? `${$title} - The Paladin` : 'The Paladin';

  // keep track of window width
  $: windowWidth = 0;
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
