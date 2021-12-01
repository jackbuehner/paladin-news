<style>
  .header {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 20px 0;
    border-bottom: 2px solid black;
  }
  h1 {
    margin: 0;
    font-family: var(--font-detail);
    font-size: 36px;
    line-height: 42px;
    font-weight: 700;
    color: var(--color-neutral-dark);
  }
  img {
    border-radius: var(--radius);
  }
  .detail {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 18px;
    line-height: 26px;
    font-weight: 400;
  }
  .email {
    font-size: 16px;
    line-height: 16px;
    box-shadow: none;
  }
  a {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
    text-decoration: none;
  }
  a:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
  h2 {
    font-size: 22px;
    margin: 20px 0 0 0;
    font-weight: 700;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    border-bottom: 1px solid var(--border-dark);
    padding-bottom: 4px;
  }
  .bio {
    font-size: 16px;
    font-family: var(--font-detail);
    line-height: 1.5;
    font-weight: 400;
    color: var(--color-neutral-dark);
    margin-top: 10px;
    margin-bottom: 10px;
  }
  span {
    display: block;
    border-bottom: 1px solid var(--border-dark);
    margin: 16px 0;
  }
  .articles {
    padding: 16px 0;
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
  import ArticleRow from '/src/components/home/ArticleRow.svelte';
  import Button from '/src/components/Button.svelte';
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import type { IArticle } from 'src/interfaces/articles';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const pageNumber = page.query.get('page') || '1';
    const url = `/profile/${page.params.profile_slug}_${pageNumber}.json`;
    const res = await fetch(url);
    const { profile, articles } = await res.json();

    if (res.ok) {
      return {
        props: {
          profile: profile,
          articles: articles,
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
  import type { IProfile } from 'src/interfaces/profiles';
  import { goto } from '$app/navigation';
  import Container from '/src/components/Container.svelte';
  import { onMount } from 'svelte';
  import { title } from '../../stores/title';
  import { insertDate } from '../../utils/insertDate';

  export let profile: IProfile;
  export let articles: AggregatePaginateResult<IArticle>;

  // set the document title
  onMount(() => ($title = `${profile.name} - Profile`));
</script>

<Container>
  <div class={'header'}>
    <img src={profile.photo} alt={''} height={profile.email ? 90 : 74} />
    <div>
      <h1>{profile.name.replace(' (Provisional)', '')}</h1>
      <div class={'detail'}>{profile.current_title}</div>
      {#if profile.email}
        <a href={`mailto:${profile.email}`} class={'detail email'}>{profile.email}</a>
      {/if}
    </div>
  </div>

  {#if profile.biography}
    <h2>About</h2>
    <p class={'bio'}>{profile.biography}</p>
    {#if profile.twitter}
      <p class={'bio'}>
        You can follow {profile.name} on Twitter at
        <a href={`https://twitter.com/${profile.twitter}`}>@{profile.twitter}</a>.
      </p>
    {/if}
  {/if}

  <h2>Articles</h2>
  <div class={'articles'}>
    {#if articles && articles.docs}
      {#each insertDate(articles.docs) as article, index}
        <ArticleRow
          name={article.name}
          href={article.date
            ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
            : `/articles/${article.slug}`}
          description={article.description}
          photo={article.photo_path}
          date={article.timestamps.published_at}
          authors={article.people.authors}
          categories={article.categories} />
        <span />
      {/each}
    {/if}
  </div>

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
</Container>
