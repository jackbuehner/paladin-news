<script lang="ts">
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
  import type { GET_ARTICLES__DOC_TYPE, Paged } from '$lib/queries';
  import type { RespondedArticle } from '$lib/routes/(standard)/articles/+layout';
  import { notEmpty } from '$lib/utils';
  import { insertDate, type PublishedDocWithDate } from '$lib/utils/insertDate';
  import { beforeUpdate, onMount } from 'svelte';
  import { fetchMore } from '.';

  export let article: PublishedDocWithDate<RespondedArticle>;

  let articles: Paged<GET_ARTICLES__DOC_TYPE> | undefined = undefined;
  $: (async () => {
    // do not fetch until the article series list has populated (stopped loading)
    if (article.series?._loading) return;

    const res = await fetchMore(
      [
        // exclude the current article since the reader has already read it
        article._id,
        // exclude articles in the same series since they are displayed elsewhere on the page
        ...(article.series?.articles?.filter(notEmpty).map((article) => article._id) || []),
      ],
      5
    );
    if (res.ok && res.data) articles = res.data;
  })();

  $: componentWidth = 0;
  $: windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div>
  <h1>More articles</h1>
  <div class={'grid'} bind:clientWidth={componentWidth} class:narrower={componentWidth <= 860}>
    {#if articles && articles.docs}
      {#each insertDate(articles.docs) as article}
        <ArticleCard
          name={article.name}
          href={article.date
            ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
            : `/articles/${article.slug}`}
          description={windowWidth <= 900 ? undefined : article.description}
          photo={windowWidth <= 900 ? undefined : article.photo_path}
          categories={article.categories}
          date={article.timestamps.published_at}
          authors={article.people.authors}
          isCompact={windowWidth <= 900}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 16px;
  }
  .grid.narrower {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
  }
  @media (max-width: 900px) {
    .grid,
    .grid.narrower {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto auto auto auto;
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
</style>
