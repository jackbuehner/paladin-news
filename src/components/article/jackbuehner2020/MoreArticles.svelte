<script lang="ts">
  import ArticleCard from '/src/components/home/ArticleCard.svelte';
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import type { IArticle } from 'src/interfaces/articles';
  import { variables } from '../../../variables';
  import { onMount } from 'svelte';
  import { insertDate } from '../../../utils/insertDate';

  onMount(async () => {
    const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
    const res = await fetch(`${hostUrl}/api/v2/articles/public?limit=6`);
    articles = await res.json();
  });

  export let articles: AggregatePaginateResult<IArticle> = undefined;
  export let thisSlug: string = undefined;

  $: componentWidth = 0;
  $: windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div>
  <h1>More articles</h1>
  <div class={'grid'} bind:clientWidth={componentWidth} class:narrower={componentWidth <= 860}>
    {#if articles && articles.docs}
      {#each insertDate(articles.docs
          .filter((article) => article.slug !== thisSlug)
          .slice(0, 5)) as article}
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
</style>
