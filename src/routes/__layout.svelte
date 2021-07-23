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

  $: title_ = $title ? `${$title} - The Paladin` : 'The Paladin';
</script>

<svelte:head>
  <title>{title_}</title>
</svelte:head>

<div class={'wrapper'}>
  <CompactHeader />

  <div class={'content'}>
    <slot />
  </div>

  <Footer />
</div>
