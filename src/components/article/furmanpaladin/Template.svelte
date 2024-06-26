<script lang="ts">
  import { browser } from '$app/environment';
  import Container from '$lib/components/Container.svelte';
  import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import { notEmpty } from '$lib/utils';
  import type { PublishedDocWithDate } from '$lib/utils/insertDate';
  import { onDestroy, onMount } from 'svelte';
  import {
    ArticleBody,
    ArticleCaption,
    ArticleCategories,
    ArticleHeading,
    ArticleMeta,
    ArticlePhoto,
    ArticlePhotoCredit,
    LegacyHeader,
  } from '.';
  import ArticleComments from './ArticleComments.svelte';

  export let article: PublishedDocWithDate<GET_ARTICLE_BY_SLUG__DOC_TYPE>;

  // keep track of window width
  $: windowWidth = 0;
</script>

<div>
  <!-- set header colors -->
  <style>
    body {
      --topbar-bg: #26272b;
      --topbar-color: #999999;
      background-color: #f4f4f4;
    }
    .topbar-wrapper {
      --border-light: #212121;
    }
  </style>
</div>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
  {#if article?.name}
    <title>{article.name} – The Paladin</title>
  {:else}
    <title>– The Paladin</title>
  {/if}
  {#if article}
    <meta
      property={'og:url'}
      content={`https://thepaladin.news/${
        article && article.date
          ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
          : `articles/${article.slug}`
      }`}
    />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={article.name} />
    <meta property={'og:description'} content={article.description} />
    <meta property={'og:image'} content={article.photo_path} />
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

<note>
  <Container>
    This article was migrated from the original furmanpaladin.com. <a href="/contact">Contact us</a>
    if you notice missing information.
  </Container>
</note>

<LegacyHeader />

<Container>
  <article>
    <header>
      <!-- categories -->
      <ArticleCategories categories={article.categories || []} />

      <!-- heading -->
      <ArticleHeading>{article.name}</ArticleHeading>
    </header>

    <!-- photo -->
    {#if article.photo_path && article.photo_path.length > 0}
      <figure>
        <ArticlePhoto src={article.photo_path} />
        {#if article.photo_caption && article.photo_caption.length > 0}
          <ArticleCaption>{article.photo_caption}</ArticleCaption>
        {/if}
        {#if article.photo_credit && article.photo_credit.length > 0}
          <ArticlePhotoCredit>{article.photo_credit}</ArticlePhotoCredit>
        {/if}
      </figure>
    {/if}

    <div class={`columns`}>
      <ArticleMeta
        authors={article.people.authors}
        date={article.timestamps.published_at}
        commentsCount={article.legacy_comments
          ?.filter(notEmpty)
          .filter((comment) => comment?.comment_approved === '1').length}
      />
      <ArticleBody doc={article.body || ''} />
    </div>

    <ArticleComments comments={article.legacy_comments} name={article.name} />
  </article>
</Container>

<style>
  article {
    max-width: 816px;
    position: relative;
  }
  @media (min-width: 951px) {
    article::after {
      content: '';
      border-right: 1px solid rgba(0, 0, 0, 0.2);
      background: var(--background);
      position: absolute;
      height: calc(100% + 60px + 100px);
      width: 100vw;
      top: -60px;
      right: calc(-40px);
      z-index: -99999;
    }
  }
  @media (max-width: 950px) {
    article::after {
      content: '';
      background: var(--background);
      position: absolute;
      height: calc(100% + 60px + 100px);
      width: 100vw;
      top: -60px;
      left: -20px;
      z-index: -99999;
    }
  }
  header {
    margin-bottom: 30px;
  }
  figure {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 0 40px;
  }
  .columns {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    max-width: 100%;
  }
  @media (max-width: 950px) {
    .columns {
      flex-direction: column;
    }
  }
  :global(.article-metadata-furmanpaladin) {
    width: 155px;
    flex-shrink: 0;
  }
  :global(.article-body-furmanpaladin) {
    width: calc(100% - 155px - 20px);
    flex-grow: 0;
  }
  @media (max-width: 950px) {
    :global(.article-body-furmanpaladin) {
      width: 100%;
    }
  }
  note {
    display: block;
    background-color: rgb(var(--legacy-primary-darker));
    color: #e0e0e0;
    font-size: 12px;
    padding: 4px 0;
    letter-spacing: 0.3px;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  note a {
    color: #e0e0e0;
  }
</style>
