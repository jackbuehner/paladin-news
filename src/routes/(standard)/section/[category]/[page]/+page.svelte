<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
  import ArticleRow from '$lib/components/home/ArticleRow.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { headerLabel } from '$lib/stores/header';
  import { insertDate } from '$lib/utils/insertDate';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: articles = data.articles;
  $: pageTitle = data.pageTitle;

  $: {
    if (pageTitle) {
      headerLabel.set(pageTitle);
    }
  }

  $: windowWidth = 0;

  // unset the header label on destroy
  onDestroy(() => ($headerLabel = ''));
</script>

<svelte:head>
  {#if pageTitle}
    <title>{pageTitle} – The Paladin</title>
  {:else}
    <title>The Paladin</title>
  {/if}
</svelte:head>

<svelte:window bind:innerWidth={windowWidth} />

<PageHeading>{$headerLabel}</PageHeading>

{#if articles}
  <Container>
    <div class={'top-grid'} class:hidden={articles.page !== 1}>
      {#if articles && articles.docs && articles.page === 1}
        {#each insertDate(Array.from(articles.docs).slice(0, 4)) as article, index}
          <ArticleCard
            style={`grid-area: a${index}`}
            name={article.name}
            href={article.date
              ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `/articles/${article.slug}`}
            description={article.description}
            photo={article.photo_path}
            photoCredit={article.photo_credit}
            date={article.timestamps.published_at}
            authors={article.people.authors}
            isCompact={windowWidth <= 770 && windowWidth > 560 ? index > 1 : index > 0}
            isCategoryPage={true}
            isLargerHeadline={true}
          />
          {#if index < 3}
            <span style={`grid-area: d${index}`} />
          {/if}
        {/each}
      {/if}
    </div>
    <div class={'main-grid'} class:firstPage={articles.page === 1}>
      {#if articles && articles.docs && articles.page === 1}
        {#each insertDate(Array.from(articles.docs).slice(4, 12)) as article, index}
          {#if windowWidth <= 560 && windowWidth > 0}
            <span style={'grid-area: auto / 1 / auto / 3;'} />
          {/if}
          <ArticleCard
            name={article.name}
            href={article.date
              ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `/articles/${article.slug}`}
            description={article.description}
            photo={article.photo_path}
            photoCredit={article.photo_credit}
            date={article.timestamps.published_at}
            authors={article.people.authors}
            isCompact={windowWidth <= 560 && windowWidth > 0}
            style={windowWidth <= 560 && windowWidth > 0 ? 'grid-area: auto / 1 / auto / 3;' : ''}
          />
        {/each}
      {/if}
      {#if articles && articles.docs}
        {#each insertDate(Array.from(articles.docs).slice(articles.page === 1 ? 12 : 0, 26)) as article, index}
          {#if index !== 0}
            <span style={'grid-area: auto / 1 / auto / 3;'} />
          {:else if articles.page === 1}
            <span style={'grid-area: auto / 1 / auto / 3;'} />
          {/if}
          <ArticleRow
            style={'grid-area: auto / 1 / auto / 3;'}
            name={article.name}
            href={article.date
              ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
              : `/articles/${article.slug}`}
            description={article.description}
            photo={article.photo_path}
            date={article.timestamps.published_at}
            authors={article.people.authors}
          />
        {/each}
      {/if}
      <span style={'grid-area: auto / 1 / auto / 3;'} />
      <div class={'navrow'}>
        {#if articles.hasNextPage || articles.hasPrevPage}
          Page {articles.page} of {articles.totalPages}
        {/if}
        <div class={'buttonrow'}>
          {#if articles.hasPrevPage}
            <Button href={`./${articles.prevPage}`}>Previous</Button>
          {/if}
          {#if articles.hasNextPage}
            <Button href={`./${articles.nextPage}`}>Next</Button>
          {/if}
        </div>
      </div>
      <span
        style={`grid-area: 1 / 3 / -1 / 3; ${
          windowWidth <= 990 && windowWidth > 0 ? 'display: none;' : ''
        }`}
      />
      <aside
        style={`grid-area: 1 / 4 / -1 / 4;  ${
          windowWidth <= 990 && windowWidth > 0 ? 'display: none;' : ''
        }`}
      />
    </div>
  </Container>
{/if}

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
