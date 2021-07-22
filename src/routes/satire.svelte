<style>
  .wrapper {
    position: relative;
    top: -52px;
    background-color: white;
  }
</style>

<script>
  import HomeHeader from '../components/header/HomeHeader.svelte';
  import Container from '/src/components/Container.svelte';
</script>

<div class={'wrapper'}>
  <Container>
    <HomeHeader isSatire={true} />
  </Container>
</div>
