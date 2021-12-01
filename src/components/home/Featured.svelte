<style>
  /* base grid styles*/
  .grid {
    display: grid;
    gap: 16px;
    padding: 30px 0;
    border-bottom: 1px solid var(--border-dark);
  }
  @media (min-width: 991px) {
    .grid {
      padding-top: 14px;
    }
  }

  /* featured grid styles*/
  .grid.featured {
    grid-template-columns: 4fr 0.5px 2.75fr 0.5px 2.25fr;
    grid-template-rows: 0fr auto 0.5px auto;
    grid-template-areas:
      'h    h   h     h   h   '
      'fa-0 d0  fa-1  d1  fa-2'
      'fa-0 d0  fa-1  d1  d2  '
      'fa-0 d0  fa-1  d1  fa-3';
  }
  @media (max-width: 990px) {
    .grid.featured {
      grid-template-columns: 1fr 0.5px 1fr;
      grid-template-rows: auto auto 0.5px auto 0.5px auto;
      grid-template-areas:
        'h     h     h   '
        'fa-0  d0    fa-1'
        'd1    d1    d1  '
        'fa-2  fa-2  fa-2'
        'd2    d2    d2  '
        'fa-3  fa-3  fa-3';
    }
  }
  @media (max-width: 480px) {
    .grid.featured {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 0.5px auto 0.5px auto 0.5px auto;
      grid-template-areas:
        'h   '
        'fa-0'
        'd0  '
        'fa-1'
        'd1  '
        'fa-2'
        'd2  '
        'fa-3';
    }
  }

  /* divider */
  span {
    background-color: var(--border-dark);
  }

  /* heading style */
  h2 {
    font-family: var(--font-detail);
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    margin: 0;
    grid-area: h;
  }
  @media (min-width: 991px) {
    h2 {
      display: none;
    }
  }
</style>

<script lang="ts">
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import type { IArticle } from 'src/interfaces/articles';
  import { variables } from '../../variables';
  import { onMount } from 'svelte';
  import ArticleCard from '../home/ArticleCard.svelte';
  import { insertDate } from '../../utils/insertDate';

  export let type: 'featured' = 'featured';
  export let articles: AggregatePaginateResult<IArticle> = undefined;

  // if articles is undefined, retrieve the featured articles
  onMount(async () => {
    if (!articles) {
      const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
      const res = await fetch(`${hostUrl}/api/v2/articles/public?limit=4&featured=true`);
      articles = await res.json();
    }
  });
</script>

<div class={'grid'} class:featured={type === 'featured'}>
  <h2>Featured articles</h2>
  {#if articles && articles.docs}
    {#each insertDate(Array.from(articles.docs).slice(0, 4)) as article, index}
      <ArticleCard
        style={`grid-area: fa-${index}`}
        name={article.name}
        href={article.date
          ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
          : `/articles/${article.slug}`}
        description={article.description}
        photo={article.photo_path}
        photoCredit={article.photo_credit}
        date={article.timestamps.published_at}
        authors={article.people.authors}
        categories={article.categories}
        isCompact={type === 'featured' ? index === 2 || index === 3 : false} />

      {#if index < articles.docs.length - 1}
        <span style={`grid-area: d${index}`} />
      {/if}
    {/each}
  {/if}
</div>
