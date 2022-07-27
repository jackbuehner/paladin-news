<script lang="ts">
  import { VideoCard } from '$lib/components/Video';
  import type { GET_VIDEOS__TYPE } from '$lib/queries';
  import { title } from '$lib/stores/title';
  import { fly } from 'svelte/transition';

  // set the document title
  title.set('All videos');

  // receive the articles from the page endpoint
  export let data: string | undefined;
  $: endpointData = data ? (JSON.parse(data) as GET_VIDEOS__TYPE) : undefined;
</script>

<div class="list" in:fly={{ y: 10, duration: 240 }}>
  {#if endpointData?.videosPublic?.docs}
    {#each endpointData.videosPublic.docs as { _id, name, video_url }}
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
