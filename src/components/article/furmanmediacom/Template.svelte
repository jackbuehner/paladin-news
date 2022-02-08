<script lang="ts">
  import type { IArticle } from 'src/interfaces/articles';
  import Container from '/src/components/Container.svelte';
  import {
    ArticleHeading,
    ArticlePhoto,
    ArticleCaption,
    ArticlePhotoCredit,
    ArticleBody,
    ArticleMeta,
  } from '.';

  export let article: IArticle;

  // keep track of window width
  $: windowWidth = 0;
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
      }`}
    />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={article.name} />
    <meta property={'og:description'} content={article.description} />
    <meta property={'og:image'} content={article.photo_path} />
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

<note
  ><Container
    >This article was migrated from furmanmedia.com. <a href={`/contact`}>Contact us</a> if information
    is missing.</Container
  ></note
>

<Container>
  <article>
    <header>
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
        categories={article.categories}
      />
      <ArticleBody doc={article.body} />
    </div>
  </article>
</Container>

<style>
  article {
    max-width: 816px;
    position: relative;
    margin: 0 15%;
  }
  @media (max-width: 950px) {
    article {
      margin: 0 23% 0 7.5%;
    }
  }
  @media (max-width: 700px) {
    article {
      margin: 0 7.5%;
    }
  }
  header {
    margin-bottom: 30px;
  }
  figure {
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
  :global(.article-metadata-furmanmediacom) {
    width: 155px;
    flex-shrink: 0;
  }
  :global(.article-body-furmanmediacom) {
    width: calc(100% - 155px - 20px);
    flex-grow: 0;
  }
  @media (max-width: 950px) {
    :global(.article-body-furmanmediacom) {
      width: 100%;
    }
  }
  note {
    display: block;
    background-color: var(--color-neutral-dark);
    color: #e0e0e0;
    font-size: 12px;
    padding: 4px 0;
    letter-spacing: 0.3px;
  }
  note a {
    color: #e0e0e0;
  }
</style>
