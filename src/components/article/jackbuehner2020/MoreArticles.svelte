<script lang="ts">
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
  import type { GET_ARTICLES__DOC_TYPE, Paged } from '$lib/queries';
  import type { RespondedArticle } from '$lib/routes/(standard)/articles/+layout';
  import { notEmpty } from '$lib/utils';
  import { insertDate, type PublishedDocWithDate } from '$lib/utils/insertDate';
  import { beforeUpdate, onMount } from 'svelte';
  import { fetchMore } from '.';

  export let article: PublishedDocWithDate<RespondedArticle>;
</script>

<div class="more-container">
  <h1>More articles</h1>
  <div class={'grid'}>
    {#if article.more?.articles}
      {#each insertDate(article.more.articles) as moreArticle}
        <ArticleCard
          name={moreArticle.name}
          href={moreArticle.date
            ? `/articles/${moreArticle.date.year}/${moreArticle.date.month}/${moreArticle.date.day}/${moreArticle.slug}`
            : `/articles/${moreArticle.slug}`}
          photo={moreArticle.photo_path}
          categories={moreArticle.categories}
          date={moreArticle.timestamps.published_at}
          authors={moreArticle.people.authors}
        />
      {/each}
    {/if}
  </div>
</div>

<div style="display: none;">
  <style>
    @container (max-width: 860px) {
      .grid {
        grid-template-columns: 1fr 1fr !important;
        grid-template-rows: auto auto auto !important;
      }
      a:nth-child(6) {
        display: none;
      }
    }
  </style>
</div>

<style>
  .more-container {
    container-type: inline-size;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: auto auto auto auto auto !important;
    }
    .grid :global(a:nth-child(5)) {
      display: none;
    }
  }

  h1 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 22px;
    line-height: 26px;
    font-weight: 700;
    margin: 40px 0 20px 0;
  }

  /* hide when printing */
  @media print {
    div {
      display: none;
    }
  }

  /* simulate compact mode article cards */
  @media (max-width: 900px) {
    .grid :global(.description) {
      display: none;
    }
    .grid :global(.categories),
    .grid :global(.meta) {
      margin-top: 0;
    }
    .grid :global(.name) {
      margin-bottom: 0;
    }
    .grid :global(.photo-wrapper) {
      width: 88px;
      padding-top: 62.6px;
      float: right;
      margin-left: 10px;
    }
  }
</style>
