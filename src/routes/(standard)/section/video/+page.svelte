<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import { FeaturedVideo, Playlist } from '$lib/components/Video';
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';

  // receive the articles from the page endpoint
  export let data: PageData;
</script>

<svelte:head>
  <title>Videos – The Paladin</title>
</svelte:head>

{#if data?.videoPublic?.video_url?.includes('v=')}
  <Container>
    <div class="featured" in:fly={{ y: 10, duration: 240 }}>
      <FeaturedVideo
        thumbnail={(() => {
          const url = new URL(data.videoPublic.video_url);
          const videoId = url.searchParams.get('v');
          if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          return '';
        })()}
        name={data.videoPublic.name}
        description={data.videoPublic.description}
        href={`/section/video/${data.videoPublic._id}`}
      />
    </div>
  </Container>
{/if}

{#if data?.videoPlaylistsPublic?.docs}
  <div class="playlist-continer" in:fly={{ y: 10, duration: 240 }}>
    {#each data.videoPlaylistsPublic.docs as playlist}
      <Playlist
        name={playlist.name}
        videos={playlist.videos
          .filter((doc) => doc._id !== data?.videoPublic?._id)
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
