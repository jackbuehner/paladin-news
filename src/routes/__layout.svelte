<script>
  import Container from '../components/Container.svelte';
  import HomeHeader from '../components/header/HomeHeader.svelte';
</script>

<HomeHeader />

<Container>
  <slot />
</Container>
