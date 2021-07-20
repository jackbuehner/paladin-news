<style>
  section {
    padding: 30px 0;
    border-bottom: 1px solid var(--border-light);
  }
  section.mobile {
    border-top: 1px solid black;
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
  div.mobile {
    flex-direction: column;
  }
  h2 {
    font-family: var(--font-detail);
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    margin: 0 0 16px 0;
  }
  span {
    display: none;
  }
  span.mobile {
    display: block;
    border-bottom: 1px solid var(--border-light);
  }
</style>

<script lang="ts">
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import type { IArticle } from 'src/interfaces/articles';
  import { onMount } from 'svelte';
  import ArticleCard from './ArticleCard.svelte';

  export let quantity: [number, number, number, number] = [5, 4, 2, 3]; // breakpoints: largest, medium, small, mobile
  export let mobilePhotoMultiple: number = 4; // hide every photo on mobile except for any multiple of this number (e.g. 3 shows photos for first photo, fourth photo, seventh photo, etc.)
  export let label: string;
  export let categories: string = undefined;

  $: windowWidth = 0;

  let articles: AggregatePaginateResult<IArticle>;

  onMount(async () => {
    const res = await fetch(
      `http://localhost:3001/api/v2/articles/public?limit=${Math.max(...quantity)}${
        categories ? categories.split(',').map((category) => `&category=${category}`) : ''
      }`.replace(',', '')
    );
    articles = await res.json();
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class:mobile={windowWidth <= 560}>
  <h2>{label}</h2>
  <div class:mobile={windowWidth <= 560}>
    {#if articles && articles.docs}
      {#each Array.from(articles.docs).slice(0, windowWidth > 990 ? quantity[0] : windowWidth > 760 ? quantity[1] : windowWidth > 560 ? quantity[2] : quantity[3]) as article, index}
        <ArticleCard
          name={article.name}
          href={`articles/${article.slug}`}
          description={article.description}
          photo={windowWidth <= 560 && !Number.isInteger(index / mobilePhotoMultiple)
            ? undefined
            : article.photo_path}
          photoCredit={'not implimented'}
          date={article.timestamps.published_at}
          authors={article.people.authors} />
        <span class:mobile={windowWidth <= 560} />
      {/each}
    {:else}
      <p>loading...</p>
    {/if}
  </div>
</section>
