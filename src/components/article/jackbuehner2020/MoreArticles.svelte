<script lang="ts">
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
  import type { GET_ARTICLES__DOC_TYPE, Paged } from '$lib/queries';
  import { insertDate } from '$lib/utils/insertDate';
  import { onMount } from 'svelte';
  import { fetchMore } from '.';

  export let thisObjectId: string;

  let articles: Paged<GET_ARTICLES__DOC_TYPE> | undefined = undefined;
  onMount(async () => {
    const res = await fetchMore([thisObjectId], 5);
    if (res.ok && res.data) articles = res.data;
  });

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
          photoCredit={article.photo_credit}
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
