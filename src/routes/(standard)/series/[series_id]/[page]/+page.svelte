<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import ArticleRow from '$lib/components/home/ArticleRow.svelte';
  import { headerLabel } from '$lib/stores/header';
  import { insertDate } from '$lib/utils/insertDate';
  import { onDestroy } from 'svelte';
  import SustainableFurmanSeriesHeader from '../SustainableFurmanSeriesHeader.svelte';
  import type { PageData } from './$types';

  export let data: PageData;
  $: articles = data.articles;
  $: pageTitle = data.pageTitle;

  $: {
    if (pageTitle) {
      headerLabel.set('Series');
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

{#if data.params.series_id === '64545157d626e3eaca3d56b1'}
  <SustainableFurmanSeriesHeader />
{:else}
  <PageHeading
    type="block"
    blockStyle="background: rgba(var(--primary), 0.12);"
    subtitle="Article series"
  >
    {pageTitle}
  </PageHeading>
{/if}

{#if articles}
  <Container>
    <headblock>
      <subtitle>
        {#if articles.hasNextPage || articles.hasPrevPage}
          Page {articles.page} of {articles.totalPages}
        {/if}
      </subtitle>
    </headblock>
  </Container>
{/if}

<Container>
  {#if data && articles.docs}
    {#each insertDate(articles.docs) as article, index}
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
        categories={article.categories}
      />
      <span />
    {/each}
  {/if}

  {#if data}
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
  {/if}
</Container>

<style>
  span {
    border-bottom: 1px solid var(--border-dark);
    display: block;
    margin: 16px 0;
  }

  subtitle {
    font-family: var(--font-detail);
    font-size: 18px;
    position: absolute;
    right: 0;
    bottom: 46px;
  }
  @media (max-width: 540px) {
    subtitle {
      bottom: 30px;
    }
  }

  headblock {
    position: relative;
    display: block;
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
