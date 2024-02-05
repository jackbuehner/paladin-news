<script lang="ts">
  import { VideoCard } from '$lib/components/Video';
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';

  // receive the articles from the page endpoint
  export let data: PageData;
</script>

<svelte:head>
  <title>All videos – The Paladin</title>
</svelte:head>

<div class="list" in:fly={{ y: 10, duration: 240 }}>
  {#if data.docs}
    {#each data.docs as { _id, name, video_url }}
      <div class="item">
        <VideoCard
          {name}
          thumbnail={(() => {
            const url = new URL(video_url);
            const videoId = url.searchParams.get('v');
            if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            return '';
          })()}
          href={`/section/video/${_id}`}
        />
      </div>
    {/each}
  {/if}
</div>

<style>
  .list {
    max-width: 1240px;
    margin: 20px auto;
    padding: 0 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }

  .item {
    flex-grow: 0;
    flex-shrink: 0;
  }
</style>
