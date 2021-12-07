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
  .header {
    background-color: #222222;
    padding: 40px 0;
  }
  h2 {
    font-size: 1.5em;
    font-weight: 900;
    letter-spacing: 2px;
    text-shadow: 0 1px 0 #111111;
    text-transform: uppercase;
    font-family: var(--legacy-font-body);
    margin: 0;
  }
  h2 > a {
    color: #ffffff;
    text-decoration: none;
  }
  h2 > a:hover {
    color: rgb(var(--legacy-primary));
  }
  h4 {
    color: #999;
    font-family: var(--legacy-font-headline);
    font-size: 0.9em;
    font-style: italic;
    line-height: 115%;
    margin: 11px 0 0;
    font-weight: 400;
  }
  note {
    display: block;
    background-color: rgb(var(--legacy-primary-darker));
    color: #e0e0e0;
    font-size: 12px;
    padding: 4px 0;
    letter-spacing: 0.3px;
  }
  note a {
    color: #e0e0e0;
  }
</style>

<script lang="ts">
  import type { IArticle } from 'src/interfaces/articles';
  import Container from '/src/components/Container.svelte';
  import { onDestroy, onMount } from 'svelte';
  import {
    ArticleCategories,
    ArticleHeading,
    ArticlePhoto,
    ArticleCaption,
    ArticlePhotoCredit,
    ArticleBody,
    ArticleMeta,
  } from '.';
  import { browser } from '$app/env';

  export let article: IArticle;

  // keep track of window width
  $: windowWidth = 0;

  // set header colors
  onMount(() => {
    const topbar: HTMLDivElement | undefined = document.querySelector(`.topbar-wrapper`);
    document.body.style.setProperty(`--topbar-bg`, `#26272b`);
    document.body.style.setProperty(`--topbar-color`, `#999999`);
    document.body.style.setProperty(`background-color`, `#f4f4f4`);
    topbar?.style.setProperty(`--border-light`, `#212121`);
  });
  onDestroy(() => {
    if (browser) {
      // onDestroy runs in SSR, so we need to ensure we are in the browser
      const topbar: HTMLDivElement | undefined = document.querySelector(`.topbar-wrapper`);
      document.body.style.removeProperty(`--topbar-bg`);
      document.body.style.removeProperty(`--topbar-color`);
      document.body.style.removeProperty(`background-color`);
      topbar?.style.removeProperty(`--border-light`);
    }
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
  {#if article}
    <meta
      property={'og:url'}
      content={`https://thepaladin.news/${
        article && article.date
          ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
          : `articles/${article.slug}`
      }`} />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={article.name} />
    <meta property={'og:description'} content={article.description} />
    <meta property={'og:image'} content={article.photo_path} />
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

<note
  ><Container
    >This article was migrated from the original furmanpaladin.com. <a href={`/contact`}
      >Contact us</a> if you notice missing information.</Container
  ></note>

<div class={`header`}>
  <Container>
    <h2><a href={`/`}>The Paladin</a></h2>
    <h4>Serving the Furman Community</h4>
  </Container>
</div>

<Container>
  <article>
    <header>
      <!-- categories -->
      <ArticleCategories categories={article.categories} />

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
      <ArticleMeta authors={article.people.authors} date={article.timestamps.published_at} />
      <ArticleBody doc={article.body} />
    </div>
  </article>
</Container>
