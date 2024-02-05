<script lang="ts">
  import { page } from '$app/stores';
  import { AudioBar } from '$lib/components/AudioBar';
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { PodcastListCard } from '$lib/components/PodcastListCard';
  import { formatISODate, listOxford } from '$lib/utils';
  import type { PageData } from './$types';

  // the podcast episdoes retrieved from the page endpoint
  export let data: PageData;
  $: episodes = data.docs;

  // the page configuration/settings from the podcasts layout data
  $: podcastsConfig = data.podcastsConfig;
  $: thisPodcast = podcastsConfig?.podcasts?.find(
    (podcast) => podcast.slug === $page.params.podcast.toLowerCase()
  );

  // construct the document title
  $: pageTitle = thisPodcast?.name || $page.params.podcast;

  // songs for audio player
  $: songs = episodes?.map((ep) => ({
    name: ep.name,
    artist: listOxford(ep.people.podcasters.map((p) => p.name)),
    album: thisPodcast?.name || $page.params.podcast,
    url: ep.episode_url,
    cover_art_url: thisPodcast?.photo || '',
  }));
</script>

<svelte:head>
  {#if pageTitle}
    <title>{pageTitle} – Podcast – The Paladin</title>
  {:else}
    <title>Podcast – The Paladin</title>
  {/if}
</svelte:head>

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
