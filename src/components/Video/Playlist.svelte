<script lang="ts">
  import { VideoCard } from '.';

  export let name: string;
  export let videos: Array<{ name: string; thumbnail: string; href: string }>;
</script>

{#if videos.length > 0}
  <section>
    <h2>{name}</h2>
    <div class="list">
      {#each videos as { name, thumbnail, href }}
        <div class="item"><VideoCard {name} {thumbnail} {href} /></div>
      {/each}
    </div>
  </section>
{/if}

<style>
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 16px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 20px;
  }

  .item {
    width: 260px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  section {
    padding: 0 0 10px 0;
  }

  h2 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 22px;
    line-height: 26px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 0.16px;
  }
</style>
