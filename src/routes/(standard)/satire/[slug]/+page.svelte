<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import {
    ArticleBody,
    ArticleCaption,
    ArticleCategories,
    ArticleHeading,
    ArticlePhoto,
    ArticlePhotoCredit,
    ArticleSubtitle,
  } from '$lib/components/article/jackbuehner2020';
  import SatireMeta from '$lib/components/article/jackbuehner2020/SatireMeta.svelte';
  import { headerIsSatire } from '$lib/stores/header';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  // set the header to satire
  headerIsSatire.set(true);

  // unset the header as satire on unmount
  onDestroy(() => ($headerIsSatire = false));
</script>

<svelte:head>
  {#if data?.name}
    <title>{data.name} – The House</title>
  {:else}
    <title>The Horse</title>
  {/if}
  {#if data}
    <meta property={'og:url'} content={`https://thepaladin.news/satire/${data.slug}`} />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={data.name} />
    <meta property={'og:description'} content={data.description} />
    <meta property={'og:image'} content={data.photo_path} />
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

{#if data}
  <Container>
    <article>
      <ArticleCategories categories={['Satire']} />
      <ArticleHeading>{data.name}</ArticleHeading>
      <ArticleSubtitle>{data.description}</ArticleSubtitle>
      <SatireMeta authors={data.people.display_authors} date={data.timestamps.published_at} />
      <ArticlePhoto src={data.photo_path} />
      {#if data.photo_caption}
        <ArticleCaption>{data.photo_caption}</ArticleCaption>
      {/if}
      {#if data.photo_credit}
        <ArticlePhotoCredit>{data.photo_credit}</ArticlePhotoCredit>
      {/if}

      <ArticleBody doc={data.body || ''} />
    </article>
  </Container>

  <style>
    article {
      max-width: 590px;
      margin: 32px auto;
    }
  </style>
{/if}
