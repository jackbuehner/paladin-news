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
  import Footer from '../components/Footer.svelte';
  import CompactHeader from '../components/header/CompactHeader.svelte';
</script>

<div class={'wrapper'}>
  <CompactHeader />

  <div class={'content'}>
    <slot />
  </div>

  <Footer />
</div>
