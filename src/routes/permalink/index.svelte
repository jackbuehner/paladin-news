<script lang="ts">
  import Container from '../../components/Container.svelte';
</script>

<Container>
  <p>
    We couldn't find that document with the provided permalink. If you think this is a mistake,
    please <a href={`/contact`}>contact us</a>.
  </p>
</Container>

<style>
  p {
    margin: 60px 0 0 0;
    font-family: var(--font-detail);
  }
</style>
