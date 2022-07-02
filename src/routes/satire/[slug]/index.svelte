<script lang="ts">
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
  import Container from '$lib/components/Container.svelte';
  import type { GET_SATIRE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import { headerIsSatire } from '$lib/stores/header';
  import { title } from '$lib/stores/title';
  import { onDestroy } from 'svelte';
  import { send, receive } from '../../../utils/crossfade.js';

  export let data: string | undefined;
  $: satire = data ? (JSON.parse(data) as GET_SATIRE_BY_SLUG__DOC_TYPE) : undefined;

  // set the document title
  $: {
    if (satire) title.set(`${satire.name} - Satire`);
  }

  // set the header to satire
  headerIsSatire.set(true);

  // unset the header as satire on unmount
  onDestroy(() => ($headerIsSatire = false));
</script>

<svelte:head>
  {#if satire}
    <meta property={'og:url'} content={`https://thepaladin.news/satire/${satire.slug}`} />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={satire.name} />
    <meta property={'og:description'} content={satire.description} />
    <meta property={'og:image'} content={satire.photo_path} />
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

{#if satire}
  <Container>
    <article>
      <ArticleCategories categories={['Satire']} />
      <ArticleHeading>{satire.name}</ArticleHeading>
      <ArticleSubtitle>{satire.description}</ArticleSubtitle>
      <SatireMeta authors={satire.people.display_authors} date={satire.timestamps.published_at} />
      <div in:receive={{ key: `photo-article-${satire._id}`, duration: 400 }}>
        <ArticlePhoto src={satire.photo_path} />
      </div>
      {#if satire.photo_caption}
        <ArticleCaption>{satire.photo_caption}</ArticleCaption>
      {/if}
      {#if satire.photo_credit}
        <ArticlePhotoCredit>{satire.photo_credit}</ArticlePhotoCredit>
      {/if}

      <ArticleBody doc={satire.body} />
    </article>
  </Container>

  <style>
    article {
      max-width: 590px;
      margin: 32px auto;
    }
  </style>
{/if}
