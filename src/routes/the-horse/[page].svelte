<script lang="ts">
  import { goto } from '$app/navigation';
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
  import { beforeUpdate, onDestroy } from 'svelte';
  import { headerIsSatire, headerNoLogoUntil } from '$lib/stores/header';
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import ArticleCard from '$lib/components/home/ArticleCard.svelte';
  import ArticleRow from '$lib/components/home/ArticleRow.svelte';
  import TheHorseLogo from '$lib/components/svgs/TheHorseLogo.svelte';
  import type { GET_SATIRES__DOC_TYPE, Paged } from '$lib/queries';
  import { title } from '$lib/stores/title';

  // set the document title
  title.set('The Horse (Satire)');

  // get article data
  export let data: string | undefined;
  $: articles = data ? (JSON.parse(data) as Paged<GET_SATIRES__DOC_TYPE>) : undefined;

  $: windowWidth = 0;

  // set the header to satire
  beforeUpdate(() => {
    $headerIsSatire = true;
    $headerNoLogoUntil = 180;
  });
  onDestroy(() => {
    $headerIsSatire = false;
    $headerNoLogoUntil = 0;
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<Container>
  <div class={'header'}>
    <TheHorseLogo width={307} height={140} />
    <p>
      <em>The Horse</em> is <em>The Paladin</em>'s satire section. Beginning as an annual special
      issue, <em>The Horse</em> lives on in an all-year, online format.<br />Archives are available
      <a
        href="https://cdm16821.contentdm.oclc.org/digital/collection/p16821coll21/search/searchterm/Horse/field/title/mode/all/conn/and/order/date/ad/desc"
        >on SCDL</a
      >.
    </p>
  </div>

  <div class={'top-grid'} class:hidden={articles?.page !== 1}>
    {#if articles && articles.docs && articles.page === 1}
      {#each Array.from(articles.docs).slice(0, 4) as article, index}
        <ArticleCard
          style={`grid-area: a${index}`}
          name={article.name}
          href={`/satire/${article.slug}`}
          description={article.description}
          photo={article.photo_path}
          photoCredit={article.photo_credit}
          date={article.timestamps.published_at}
          authors={article.people.display_authors.map((author) => {
            return { name: author };
          })}
          isCompact={windowWidth <= 770 ? index > 1 : index > 0}
          isCategoryPage={true}
          isLargerHeadline={true}
        />
        {#if index < 3}
          <span style={`grid-area: d${index}`} />
        {/if}
      {/each}
    {/if}
  </div>
  <div class={'main-grid'} class:firstPage={articles?.page === 1}>
    {#if articles && articles.docs}
      {#each Array.from(articles.docs).slice(articles.page === 1 ? 4 : 0, 21) as article, index}
        {#if index !== 0}
          <span style={'grid-area: auto / 1 / auto / 3;'} />
        {:else if articles.page === 1}
          <span style={'grid-area: auto / 1 / auto / 3;'} />
        {/if}
        <ArticleRow
          style={'grid-area: auto / 1 / auto / 3;'}
          name={article.name}
          href={`/satire/${article.slug}`}
          description={article.description}
          photo={article.photo_path}
          date={article.timestamps.published_at}
          authors={article.people.display_authors.map((author) => {
            return { name: author };
          })}
        />
      {/each}
    {/if}
    <span style={'grid-area: auto / 1 / auto / 3;'} />

    {#if articles}
      <div class={'navrow'}>
        {#if articles.hasNextPage || articles.hasPrevPage}
          Page {articles.page} of {articles.totalPages}
        {/if}
        <div class={'buttonrow'}>
          {#if articles.hasPrevPage}
            <Button on:click={() => goto(`?page=${articles?.prevPage}`)}>Previous</Button>
          {/if}
          {#if articles.hasNextPage}
            <Button on:click={() => goto(`?page=${articles?.nextPage}`)}>Next</Button>
          {/if}
        </div>
      </div>
    {/if}

    <span
      style={`grid-area: 1 / 3 / -1 / 3; ${windowWidth <= 990 ? 'display: none;' : 'opacity: 0;'}`}
    />
    <aside style={`grid-area: 1 / 4 / -1 / 4; ${windowWidth <= 990 ? 'display: none;' : ''}`} />
  </div>
</Container>

<style>
  .header {
    margin: 0 0 20px 0;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    border-bottom: 1px solid var(--border-light);
  }
  .header p {
    margin-bottom: 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 18px;
    line-height: 24px;
    font-weight: 400;
    text-align: center;
  }

  a {
    color: rgb(var(--primary));
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
    grid-template-rows: repeat(20, auto 0.5px) auto;
    gap: 16px;
    margin: 24px 0;
  }
  .main-grid.firstPage {
    grid-template-rows: auto auto repeat(16, 0.5px auto) 0.5px auto;
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
