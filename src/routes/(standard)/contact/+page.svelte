<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
</script>

<svelte:head>
  <title>Contact us – The Paladin</title>
</svelte:head>

<PageHeading>Contact us</PageHeading>

<Container>
  <p>
    To place an advertisement, contact <a href="mailto:ads.manager@thepaladin.news"
      >ads.manager@thepaladin.news</a
    >
  </p>
  <p>
    To give us a news tip, contact <a href="mailto:tips@thepaladin.news">tips@thepaladin.news</a>
  </p>
  <p>
    For all other inquiries, contact us at <a href="mailto:contact@thepaladin.news"
      >contact@thepaladin.news</a
    >
  </p>
</Container>

<style>
  :global(div.kw-alert) {
    font-family: var(--font-detail);
    font-size: 14px;
    border-radius: var(--radius);
  }
  :global(div.kw-alert-warning) {
    color: hsl(37, 98%, 38%);
    background-color: hsl(43, 100%, 96%);
    border: 1px solid hsla(37, 98%, 38%, 0.1);
  }
  :global(div.kw-alert-error) {
    color: hsl(352, 100%, 61%);
    background-color: hsl(351, 100%, 96%);
    border: 1px solid hsla(352, 100%, 61%, 0.1);
  }
</style>
