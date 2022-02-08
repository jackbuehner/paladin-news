<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import type { IArticle } from 'src/interfaces/articles';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const { n } = page.params;
    const url = `/all-articles/${n}.json`;
    const res = await fetch(url);

    // set the document title
    title.set('All articles');

    if (res.ok) {
      return {
        props: {
          articles: await res.json(),
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
  import Button from '/src/components/Button.svelte';
  import ArticleRow from '/src/components/home/ArticleRow.svelte';
  import PageHeading from '/src/components/PageHeading.svelte';
  import Container from '/src/components/Container.svelte';
  import { title } from '../../stores/title';
  import { insertDate } from '../../utils/insertDate';

  export let articles: AggregatePaginateResult<IArticle>;
</script>

<PageHeading>All articles</PageHeading>

<Container>
  <headblock>
    <subtitle>
      {#if articles.hasNextPage || articles.hasPrevPage}
        Page {articles.page} of {articles.totalPages}
      {/if}
    </subtitle>
  </headblock>
</Container>

<Container>
  {#if articles && articles.docs}
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
