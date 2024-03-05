<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import ArticleRow from '$lib/components/home/ArticleRow.svelte';
  import { insertDate } from '$lib/utils/insertDate';
  import type { PageData } from './$types';

  export let data: PageData;
  $: profile = data.profile;
  $: articles = data.articles;
</script>

<svelte:head>
  {#if profile?.name}
    <title>{profile.name} – Profile – The Paladin</title>
  {:else}
    <title>Profile – The Paladin</title>
  {/if}
</svelte:head>

<Container>
  <div class={'header'}>
    {#if profile?.photo}
      <img src={profile?.photo} alt={''} height={profile?.email ? 90 : 74} />
    {/if}
    <div>
      <h1>{profile?.name?.replace(' (Provisional)', '')}</h1>
      <div class={'detail'}>{profile?.current_title}</div>
      {#if profile?.email}
        <a href={`mailto:${profile.email}`} class={'detail email'}>{profile.email}</a>
      {/if}
    </div>
  </div>

  {#if profile?.biography}
    <h2>About</h2>
    <p class={'bio'}>{profile?.biography}</p>
    {#if profile?.twitter && profile?.name}
      <p class={'bio'}>
        You can follow {profile.name} on Twitter at
        <a href={`https://twitter.com/${profile.twitter}`}>@{profile.twitter}</a>.
      </p>
    {/if}
  {/if}

  {#if articles && articles.docs && articles.docs.length > 0}
    <h2>Articles</h2>
    <div class={'articles'}>
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
          categories={article.categories}
        />
        <span />
      {/each}
    </div>
  {:else}
    <div class="no-articles">This person has not written any articles.</div>
  {/if}

  <div class={'navrow'}>
    {#if articles?.hasNextPage || articles?.hasPrevPage}
      Page {articles.page} of {articles.totalPages}
    {/if}
    <div class={'buttonrow'}>
      {#if articles?.hasPrevPage}
        <Button href={`./${articles.prevPage}`}>Previous</Button>
      {/if}
      {#if articles?.hasNextPage}
        <Button href={`./${articles.nextPage}`}>Next</Button>
      {/if}
    </div>
  </div>
</Container>

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
  .no-articles {
    font-size: 16px;
    font-family: var(--font-detail);
    line-height: 1.5;
    font-weight: 400;
    color: var(--color-neutral-dark);
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
