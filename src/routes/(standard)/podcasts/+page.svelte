<script lang="ts">
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
  import IconButton from '$lib/components/IconButton.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { title } from '$lib/stores/title';
  import type { PageData } from './$types';
  import type { PodcastsConfig, PodcastsStuffType } from '.';

  // set the document title
  title.set(`Podcasts`);

  export let data: PageData;
  $: podcastsConfig = data.podcastsConfig;
</script>

<PageHeading type={'block'} width={1000} subtitle={podcastsConfig?.description}>
  {podcastsConfig?.name}
</PageHeading>

<Container
  width={1000}
  backgroundColor={'var(--background-tinted)'}
  borderBottom={'1px solid var(--border-dark)'}
  expandUp={20}
  expandDown={20}
  grow
>
  <div class="card-container">
    {#each podcastsConfig?.podcasts || [] as podcast}
      {#if podcast.hidden !== true}
        <div class={'card'}>
          <a href={`/podcasts/${podcast.slug}`}>
            <img src={podcast.photo} loading={'lazy'} width={'100'} height={'100'} alt={''} />
          </a>
          <div class={'actions'}>
            <IconButton isOutlined ariaLabel={'view podcast'} href={`/podcasts/${podcast.slug}`}>
              <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
            </IconButton>
          </div>
          <h2><a href={`/podcasts/${podcast.slug}`}>{podcast.name}</a></h2>
          <p><a href={`/podcasts/${podcast.slug}`}>{podcast.description}</a></p>
        </div>
      {/if}
    {/each}
  </div>
</Container>

<style>
  .card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
  .card {
    width: 242.5px;
    margin-bottom: 10px;
    padding: 20px;
    border: 1px solid var(--border-dark);
    border-radius: 2px;
    background-color: white;
    position: relative;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  @media (max-width: 540px) {
    .card {
      width: 100%;
    }
  }
  img {
    height: 100px;
    width: 100px;
    object-fit: cover;
    border: 2px solid var(--border-dark);
    border-radius: var(--radius);
  }
  h2 {
    margin: 0 0 6px 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
  }
  p {
    margin: 0 0 10px 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 15px;
    line-height: 22px;
  }
  .actions {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
