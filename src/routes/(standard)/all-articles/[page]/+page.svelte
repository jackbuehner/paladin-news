<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import ArticleRow from '$lib/components/home/ArticleRow.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import type { GET_ARTICLES__DOC_TYPE, Paged } from '$lib/queries';
  import { insertDate } from '$lib/utils';
  import type { PageData } from './$types';

  // receive the data from the page endpoint
  export let data: PageData;
</script>

<svelte:head>
  <title>All articles – The Paladin</title>
</svelte:head>

<PageHeading>All articles</PageHeading>

{#if data}
  <Container>
    <headblock>
      <subtitle>
        {#if data.hasNextPage || data.hasPrevPage}
          Page {data.page} of {data.totalPages}
        {/if}
      </subtitle>
    </headblock>
  </Container>
{/if}

<Container>
  {#if data && data.docs}
    {#each insertDate(data.docs) as article, index}
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
      {#if data.hasNextPage || data.hasPrevPage}
        Page {data.page} of {data.totalPages}
      {/if}
      <div class={'buttonrow'}>
        {#if data.hasPrevPage}
          <Button href={`./${data.prevPage}`}>Previous</Button>
        {/if}
        {#if data.hasNextPage}
          <Button href={`./${data.nextPage}`}>Next</Button>
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
