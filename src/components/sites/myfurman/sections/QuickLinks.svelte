<style>
  div.quick-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, max-content));
    gap: 6px;
  }
  div.quick-links.compact {
    grid-template-columns: repeat(auto-fit, 110px);
    justify-content: space-between;
  }
  div.quick-links.small {
    grid-template-columns: repeat(auto-fit, 60px);
  }
</style>

<script lang="ts">
  import { QuickLink, SH } from '..';

  export let links: { name: string; description: string; imgsrc: string; href: string }[];

  $: windowWidth = 0;
  $: compact = windowWidth <= 900;
  $: small = windowWidth <= 700;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class={'quick-links-container'}>
  <SH>Quick links</SH>
  <div class={'quick-links'} class:compact class:small={compact && small}>
    {#each links as { name, description, imgsrc, href }}
      <QuickLink {name} {description} {imgsrc} {href} {compact} {small} />
    {/each}
  </div>
</div>
