<style>
  .top-grid {
    display: grid;
    grid-template-columns: 3fr 0.5px 1.75fr;
    gap: 16px;
    grid-template-rows: auto 0.5px auto 0.5px auto;
    grid-template-areas:
      'a0  d0  a1'
      'a0  d0  d1'
      'a0  d0  a2'
      'a0  d0  d2'
      'a0  d0  a3';
    margin-top: 24px;
    padding-bottom: 48px;
    border-bottom: 1px solid var(--border-dark);
  }
  @media (max-width: 990px) {
    .top-grid {
      grid-template-areas:
        'a0  d0  a1'
        'a0  d0  d1'
        'a0  d0  a2'
        'd2  d2  d2'
        'a3  a3  a3';
    }
  }
  @media (max-width: 770px) {
    .top-grid {
      grid-template-columns: 1fr 0.5px 1fr;
      grid-template-areas:
        'a0  d0  a1'
        'd1  d1  d1'
        'a2  a2  a2'
        'd2  d2  d2'
        'a3  a3  a3';
    }
  }
  @media (max-width: 560px) {
    .top-grid {
      grid-template-rows: auto 0.5px auto 0.5px auto 0.5px auto;
      grid-template-areas:
        'a0  a0  a0'
        'd0  d0  d0'
        'a1  a1  a1'
        'd1  d1  d1'
        'a2  a2  a2'
        'd2  d2  d2'
        'a3  a3  a3';
    }
  }
  .top-grid.hidden {
    display: none;
  }

  .main-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 0.5px 316px;
    grid-template-rows: repeat(25, auto 0.5px) auto;
    gap: 16px;
    margin: 24px 0;
  }
  .main-grid.firstPage {
    grid-template-rows: repeat(4, auto) repeat(13, 0.5px auto) 0.5px auto;
  }
  @media (max-width: 990px) {
    .main-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* divider */
  span {
    background-color: var(--border-dark);
  }

  /* page navigation*/
  .navrow {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 400;
    padding: 16px 20px 32px 20px;
    grid-area: auto / 1 / auto / 3;
  }
  .buttonrow {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }
</style>

<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  import ArticleCard from '/src/components/home/ArticleCard.svelte';
  import ArticleRow from '/src/components/home/ArticleRow.svelte';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const pageNumber = page.query.get('page') || '1';
    const url = `/${page.params.category}/${pageNumber}.json`;
    const res = await fetch(url);

    let pagePathToTitle = {
      '/news': 'News',
      '/opinions': 'Opinions',
      '/sports': 'Sports',
      '/diversity-matters': 'Diversity Matters',
      '/arts-culture': 'Arts, Campus, & Culture',
      '/arts': 'Arts',
      '/campus-culture': 'Campus & Culture',
    };

    if (res.ok) {
      return {
        props: {
          articles: await res.json(),
          pageTitle: pagePathToTitle[page.path],
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import type { IArticle } from 'src/interfaces/articles';
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import { goto } from '$app/navigation';
  import Button from '/src/components/Button.svelte';
  import { headerLabel } from '../../stores/header';
  import { beforeUpdate, onDestroy, onMount } from 'svelte';
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import { title } from '../../stores/title';

  export let articles: AggregatePaginateResult<IArticle>;
  export let pageTitle: string;

  $: windowWidth = 0;

  // set the header label
  beforeUpdate(() => ($headerLabel = pageTitle));
  onDestroy(() => ($headerLabel = undefined));

  // set the document title
  onMount(() => ($title = pageTitle));
</script>

<svelte:window bind:innerWidth={windowWidth} />

<PageHeading>{$headerLabel}</PageHeading>

<Container>
  <div class={'top-grid'} class:hidden={articles.page !== 1}>
    {#if articles && articles.docs && articles.page === 1}
      {#each Array.from(articles.docs).slice(0, 4) as article, index}
        <ArticleCard
          style={`grid-area: a${index}`}
          name={article.name}
          href={`articles/${article.slug}`}
          description={article.description}
          photo={article.photo_path}
          photoCredit={article.photo_credit}
          date={article.timestamps.published_at}
          authors={article.people.authors}
          isCompact={windowWidth <= 770 ? index > 1 : index > 0}
          isCategoryPage={true}
          isLargerHeadline={true} />
        {#if index < 3}
          <span style={`grid-area: d${index}`} />
        {/if}
      {/each}
    {/if}
  </div>
  <div class={'main-grid'} class:firstPage={articles.page === 1}>
    {#if articles && articles.docs && articles.page === 1}
      {#each Array.from(articles.docs).slice(4, 12) as article, index}
        {#if windowWidth <= 560}
          <span style={'grid-area: auto / 1 / auto / 3;'} />
        {/if}
        <ArticleCard
          name={article.name}
          href={`articles/${article.slug}`}
          description={article.description}
          photo={article.photo_path}
          photoCredit={article.photo_credit}
          date={article.timestamps.published_at}
          authors={article.people.authors}
          isCompact={windowWidth <= 560}
          style={windowWidth <= 560 ? 'grid-area: auto / 1 / auto / 3;' : ''} />
      {/each}
    {/if}
    {#if articles && articles.docs}
      {#each Array.from(articles.docs).slice(articles.page === 1 ? 12 : 0, 26) as article, index}
        {#if index !== 0}
          <span style={'grid-area: auto / 1 / auto / 3;'} />
        {:else if articles.page === 1}
          <span style={'grid-area: auto / 1 / auto / 3;'} />
        {/if}
        <ArticleRow
          style={'grid-area: auto / 1 / auto / 3;'}
          name={article.name}
          href={`articles/${article.slug}`}
          description={article.description}
          photo={article.photo_path}
          date={article.timestamps.published_at}
          authors={article.people.authors} />
      {/each}
    {/if}
    <span style={'grid-area: auto / 1 / auto / 3;'} />
    <div class={'navrow'}>
      {#if articles.hasNextPage || articles.hasPrevPage}
        Page {articles.page} of {articles.totalPages}
      {/if}
      <div class={'buttonrow'}>
        {#if articles.hasPrevPage}
          <Button on:click={() => goto(`?page=${articles.prevPage}`)}>Previous</Button>
        {/if}
        {#if articles.hasNextPage}
          <Button on:click={() => goto(`?page=${articles.nextPage}`)}>Next</Button>
        {/if}
      </div>
    </div>
    <span style={`grid-area: 1 / 3 / -1 / 3; ${windowWidth <= 990 ? 'display: none;' : ''}`} />
    <aside style={`grid-area: 1 / 4 / -1 / 4;  ${windowWidth <= 990 ? 'display: none;' : ''}`} />
  </div>
</Container>
