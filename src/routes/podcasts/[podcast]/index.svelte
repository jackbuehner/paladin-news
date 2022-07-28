<script lang="ts">
  import { page } from '$app/stores';
  import { AudioBar } from '$lib/components/AudioBar';
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { PodcastListCard } from '$lib/components/PodcastListCard';
  import type { GET_PODCAST_EPISODES__DOC_TYPE } from '$lib/queries';
  import { title } from '$lib/stores/title';
  import { formatISODate, listOxford } from '$lib/utils';
  import type { PodcastsConfig, PodcastsStuffType } from '..';

  // the podcast episdoes retrieved from the page endpoint
  export let data: string;
  $: episodes = data ? (JSON.parse(data) as GET_PODCAST_EPISODES__DOC_TYPE[]) : undefined;

  // the page configuration/settings from the podcasts layout stuff
  $: podcastsConfig = ($page.stuff as PodcastsStuffType).podcastsConfig
    ? (JSON.parse(($page.stuff as PodcastsStuffType).podcastsConfig) as PodcastsConfig)
    : undefined;
  $: thisPodcast = podcastsConfig?.podcasts?.find(
    (podcast) => podcast.slug === $page.params.podcast.toLowerCase()
  );

  // set the document title
  title.set(`${thisPodcast?.name || $page.params.podcast} - Podcast`);

  // songs for audio player
  $: songs = episodes?.map((ep) => ({
    name: ep.name,
    artist: listOxford(ep.people.podcasters.map((p) => p.name)),
    album: thisPodcast?.name || $page.params.podcast,
    url: ep.episode_url,
    cover_art_url: thisPodcast?.photo || '',
  }));
</script>

<PageHeading type={'block'} subtitle={thisPodcast?.description} photo={thisPodcast?.photo}
  >{thisPodcast?.name || $page.params.podcast} Podcast</PageHeading
>

<Container
  backgroundColor={'var(--background-tinted)'}
  borderBottom={'1px solid var(--border-dark)'}
  expandUp={20}
  expandDown={20}
  grow
>
  {#if episodes}
    {#each episodes as { name, description, episode_number: episode, timestamps }, index}
      <PodcastListCard
        {name}
        {description}
        {episode}
        {index}
        date={formatISODate(timestamps.published_at)}
      />
    {/each}
  {/if}
  <AudioBar initialSongs={songs || []} />
</Container>
