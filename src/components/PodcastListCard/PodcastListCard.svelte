<script lang="ts">
  import {
    PodcastListCardPlayButton as PlayButton,
    PodcastListCardShareButton as ShareButton,
    PodcastListCardEpisodeDetails as EpisodeDetails,
  } from '.';

  export let name: string;
  export let description: string;
  export let date: string;
  export let episode: number;
  export let index: number;
</script>

<div>
  <PlayButton {index} />
  <EpisodeDetails {name} {description} {date} {episode} />
</div>

<style>
  div {
    display: grid;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
    grid-auto-columns: 1fr;
    gap: 20px;
    grid-template-columns: 48px 1fr /*42px*/;
    grid-template-rows: auto;
    border: 1px solid var(--background-tinted);
    border-radius: var(--radius);
    background-color: var(--surface);
  }
</style>
