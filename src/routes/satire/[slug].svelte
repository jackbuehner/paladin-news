<style>
  article {
    max-width: 590px;
    margin: 32px auto;
  }
</style>

<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/satire/${page.params.slug}.json`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          satire: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import {
    ArticleHeading,
    ArticleSubtitle,
    ArticleCategories,
    ArticlePhoto,
    ArticleCaption,
    ArticlePhotoCredit,
    ArticleBody,
  } from '../../components/article/jackbuehner2020';
  import type { ISatire } from 'src/interfaces/satire';
  import Container from '/src/components/Container.svelte';
  import SatireMeta from '/src/components/article/jackbuehner2020/SatireMeta.svelte';
  import { headerIsSatire } from '../../stores/header';
  import { beforeUpdate, onDestroy, onMount } from 'svelte';
  import { title } from '../../stores/title';

  export let satire: ISatire;

  // set the header to satire
  beforeUpdate(() => ($headerIsSatire = true));
  onDestroy(() => ($headerIsSatire = false));

  // set the document title
  onMount(() => ($title = `${satire.name} - Satire`));
</script>

<svelte:head>
  <meta property={'og:url'} content={`https://thepaladin.news/satire/${satire.slug}`} />
  <meta property={'og:type'} content={'article'} />
  <meta property={'og:title'} content={satire.name} />
  <meta property={'og:description'} content={satire.description} />
  <meta property={'og:image'} content={satire.photo_path} />
  <meta property={'og:locale'} content={'en_US'} />
</svelte:head>

<Container>
  <article>
    <ArticleCategories categories={['Satire']} />
    <ArticleHeading>{satire.name}</ArticleHeading>
    <ArticleSubtitle>{satire.description}</ArticleSubtitle>
    <SatireMeta authors={satire.people.display_authors} date={satire.timestamps.published_at} />
    <ArticlePhoto src={satire.photo_path} />
    {#if satire.photo_caption}
      <ArticleCaption>{satire.photo_caption}</ArticleCaption>
    {/if}
    {#if satire.photo_credit}
      <ArticlePhotoCredit>{satire.photo_credit}</ArticlePhotoCredit>
    {/if}

    <ArticleBody doc={satire.body} />
  </article>
</Container>
