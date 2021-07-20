<style>
  section {
    padding: 30px 0;
    border-bottom: 1px solid var(--border-dark);
    height: fit-content;
  }
  section.mobile {
    border-top: 1px solid black;
  }
  div {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }
  div.mobile,
  div.vertical {
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
    border-bottom: 1px solid var(--border-dark);
  }
</style>

<script lang="ts">
  import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
  import type { IArticle } from 'src/interfaces/articles';
  import { onMount } from 'svelte';
  import ArticleCard from './ArticleCard.svelte';
  import { variables } from '../../variables';

  export let quantity: [number, number, number, number] = [5, 4, 2, 3]; // breakpoints: largest, medium, small, mobile
  export let mobilePhotoMultiple: number = 4; // hide every photo on mobile except for any multiple of this number (e.g. 3 shows photos for first photo, fourth photo, seventh photo, etc.)
  export let label: string;
  export let categories: string = undefined;
  export let gridArea: string = 'auto';
  export let forceVertical: boolean = false;

  $: windowWidth = 0;

  // the length of the articles array, calculated based on the number specified in `quantity` for each breakpoint
  $: arrayLength =
    windowWidth > 990
      ? quantity[0]
      : windowWidth > 760
      ? quantity[1]
      : windowWidth > 560
      ? quantity[2]
      : quantity[3];

  let articles: AggregatePaginateResult<IArticle>;

  onMount(async () => {
    const hostUrl =
      variables.mode === 'development'
        ? 'http://localhost:3001'
        : 'https://api.thepaladin.cristata.app';
    const res = await fetch(
      `${hostUrl}/api/v2/articles/public?limit=${Math.max(...quantity)}${
        categories ? categories.split(',').map((category) => `&category=${category}`) : ''
      }`.replace(',', '')
    );
    articles = await res.json();
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class:mobile={windowWidth <= 560} style={`grid-area: ${gridArea}`}>
  <h2>{label}</h2>
  <div class:mobile={windowWidth <= 560} class:vertical={forceVertical}>
    {#if articles && articles.docs}
      {#each Array.from(articles.docs).slice(0, arrayLength) as article, index}
        <ArticleCard
          name={article.name}
          href={`articles/${article.slug}`}
          description={(windowWidth > 560 && !forceVertical) ||
          (windowWidth > 560 && !Number.isInteger(index / mobilePhotoMultiple) && forceVertical)
            ? undefined
            : article.description}
          photo={(windowWidth <= 560 && !Number.isInteger(index / mobilePhotoMultiple)) ||
          (windowWidth > 560 && !Number.isInteger(index / mobilePhotoMultiple) && forceVertical)
            ? undefined
            : article.photo_path}
          photoCredit={'not implimented'}
          date={article.timestamps.published_at}
          authors={article.people.authors}
          isCompact={forceVertical} />
        <span class:mobile={(windowWidth <= 560 || forceVertical) && index < arrayLength - 1} />
      {/each}
    {:else}
      <p>loading...</p>
    {/if}
  </div>
</section>
