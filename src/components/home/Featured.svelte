<script lang="ts">
  import type { GET_FRONT_PAGE__DOC_TYPE } from '$lib/queries';
  import { insertDate } from '$lib/utils/insertDate';
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';

  export let articles: GET_FRONT_PAGE__DOC_TYPE[];
  export let hideDate: boolean = false;
</script>

<div class={'grid featured'}>
  <h2>Featured articles</h2>
  {#if articles}
    {#each insertDate(Array.from(articles).slice(0, 4)) as article, index}
      <ArticleCard
        style={`grid-area: fa-${index}`}
        name={article.name}
        href={article.date
          ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
          : `/articles/${article.slug}`}
        description={article.description}
        photo={article.photo_path}
        date={hideDate ? undefined : article.timestamps.published_at}
        authors={article.people.authors}
        categories={article.categories}
        isCompact={index === 2 || index === 3}
      />

      {#if index < articles.length - 1}
        <span style={`grid-area: d${index}`} />
      {/if}
    {/each}
  {/if}
</div>

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
      padding-top: 2px;
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
