<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import { FeaturedVideo, Playlist } from '$lib/components/Video';
  import type { GET_VIDEO_PAGE__TYPE } from '$lib/queries';
  import { title } from '$lib/stores/title';
  import { fly } from 'svelte/transition';

  // set the document title
  title.set('Videos');

  // receive the articles from the page endpoint
  export let data: string | undefined;
  $: endpointData = data ? (JSON.parse(data) as GET_VIDEO_PAGE__TYPE) : undefined;
</script>

{#if endpointData?.videoPublic?.video_url?.includes('v=')}
  <Container>
    <div class="featured" in:fly={{ y: 10, duration: 240 }}>
      <FeaturedVideo
        thumbnail={(() => {
          const url = new URL(endpointData.videoPublic.video_url);
          const videoId = url.searchParams.get('v');
          if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          return '';
        })()}
        name={endpointData.videoPublic.name}
        description={endpointData.videoPublic.description}
        href={`/section/video/${endpointData.videoPublic._id}`}
      />
    </div>
  </Container>
{/if}

{#if endpointData?.videoPlaylistsPublic?.docs}
  <div class="playlist-continer" in:fly={{ y: 10, duration: 240 }}>
    {#each endpointData.videoPlaylistsPublic.docs as playlist}
      <Playlist
        name={playlist.name}
        videos={playlist.videos
          .filter((doc) => doc._id !== endpointData?.videoPublic?._id)
          .map(({ _id, name, video_url }) => ({
            name,
            thumbnail: (() => {
              const url = new URL(video_url);
              const videoId = url.searchParams.get('v');
              if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              return '';
            })(),
            href: `/section/video/${_id}`,
          }))}
      />
    {/each}
  </div>
{/if}

<style>
  .playlist-continer {
    max-width: 1240px;
    margin: 10px auto 0 auto;
    padding: 0 20px;
  }
</style>
