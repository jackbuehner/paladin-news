<script lang="ts">
  import { Playlist } from '$lib/components/Video';
  import { title } from '$lib/stores/title';
  import { fly } from 'svelte/transition';
  import type { PageData } from './$types';

  // set the document title
  title.set('Video playlists');

  // receive the articles from the page endpoint
  export let data: PageData;
</script>

{#if data.docs}
  <div class="playlist-continer" in:fly={{ y: 10, duration: 240 }}>
    {#each data.docs as playlist}
      <Playlist
        name={playlist.name}
        videos={playlist.videos.map(({ _id, name, video_url }) => ({
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
    margin: 20px auto;
    padding: 0 20px;
  }
</style>
