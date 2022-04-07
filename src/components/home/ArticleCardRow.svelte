<script lang="ts">
  import ArticleCard from './ArticleCard.svelte';
  import { insertDate } from '../../utils/insertDate';
  import type { GET_ARTICLES__DOC_TYPE, Paged } from '../../queries';

  export let quantity: [number, number, number, number] = [5, 4, 2, 3]; // breakpoints: largest, medium, small, mobile
  export let mobilePhotoMultiple = 4; // hide every photo on mobile except for any multiple of this number (e.g. 3 shows photos for first photo, fourth photo, seventh photo, etc.)
  export let label: string;
  export let href: string = undefined;
  export let categories: string = undefined;
  export let gridArea = 'auto';
  export let forceVertical = false;
  export let articles: Paged<GET_ARTICLES__DOC_TYPE>;
  export let hideDate: boolean = false;

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
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class:mobile={windowWidth && windowWidth <= 560} style={`grid-area: ${gridArea}`}>
  {#if href}
    <h2><a {href}>{label}</a></h2>
  {:else}
    <h2>{label}</h2>
  {/if}
  <div class:mobile={windowWidth && windowWidth <= 560} class:vertical={forceVertical}>
    {#if articles && articles.docs}
      {#each insertDate(Array.from(articles.docs).slice(0, arrayLength)) as article, index}
        <ArticleCard
          name={article.name}
          href={article.date
            ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
            : `/articles/${article.slug}`}
          description={(windowWidth > 560 && !forceVertical) ||
          (windowWidth > 560 && !Number.isInteger(index / mobilePhotoMultiple) && forceVertical)
            ? undefined
            : article.description}
          photo={(windowWidth &&
            windowWidth <= 560 &&
            !Number.isInteger(index / mobilePhotoMultiple)) ||
          (windowWidth > 560 && !Number.isInteger(index / mobilePhotoMultiple) && forceVertical)
            ? undefined
            : article.photo_path}
          photoCredit={article.photo_credit}
          date={hideDate ? undefined : article.timestamps.published_at}
          authors={article.people.authors}
          isCompact={forceVertical}
        />
        <span
          class:mobile={((windowWidth && windowWidth <= 560) || forceVertical) &&
            index < arrayLength - 1}
        />
      {/each}
    {:else}
      <p>loading...</p>
    {/if}
  </div>
</section>

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
  @media (max-width: 590px) {
    div {
      flex-direction: column;
    }
  }
  h2 {
    font-family: var(--font-detail);
    font-size: 18px;
    line-height: 18px;
    text-transform: uppercase;
    margin: 0 0 16px 0;
    color: var(--color-neutral-dark);
  }
  h2 > a {
    text-decoration: none;
    color: var(--color-neutral-dark);
  }
  span {
    display: none;
  }
  span.mobile {
    display: block;
    border-bottom: 1px solid var(--border-dark);
  }
</style>
