<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import ArticleRow from '$lib/components/home/ArticleRow.svelte';
  import type { GET_FLUSHERS__DOC_TYPE } from '$lib/queries';
  import { title } from '$lib/stores/title';
  import { constructArticlePath, formatISODate, insertDate } from '$lib/utils';
  import type { PageData } from './$types';
  import { DateTime } from 'luxon';
  import { romanize } from 'romans';

  // the flusher document retrieved from the page endpoint
  export let data: PageData;

  // set the document title
  $: isTheRoyalFlush = new Date(data?.timestamps.week || Date.now()) < new Date('2022-04-20');
  $: {
    if (data)
      title.set(
        isTheRoyalFlush
          ? `The Royal Flush – Vol. ${romanize(data.volume)}, Iss. ${data.issue}`
          : `The Flusher – Vol. ${romanize(data.volume)}, Iss. ${data.issue}`
      );
    else title.set(`The Flusher`);
  }

  // get the featured article and insert date components
  // (to be used when contructing the URL to the article)
  $: featuredArticle = data?.articles.featured
    ? insertDate([data.articles.featured])[0]
    : undefined;
  $: featuredArticleAuthors =
    featuredArticle?.people.authors.filter((author): author is { name: string } => !!author) || [];

  /**
   * Opens the document in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c' && data?._id) {
      window.open(`https://thepaladin.cristata.app/cms/collection/flushes/${data._id}`, '_blank');
    }
  };
</script>

<svelte:window on:keydown={openInCMS} />

<!-- page title -->
{#if isTheRoyalFlush}
  <h1>The Royal Flush</h1>
{:else}
  <h1>The Flusher</h1>
{/if}
<!-- flusher week formatted in AP style -->
{#if data}
  <subtitle>Week of {formatISODate(data.timestamps.week)}</subtitle>
{/if}

<Container>
  <!-- include a featured article first (if it is defined) -->
  {#if featuredArticle}
    <h2>Featured Article</h2>
    <ArticleRow
      name={featuredArticle.name}
      href={constructArticlePath(featuredArticle.slug, featuredArticle.date)}
      description={featuredArticle.description}
      photo={featuredArticle.photo_path}
      date={featuredArticle.timestamps.published_at}
      authors={featuredArticleAuthors}
    />
  {/if}

  <!-- include the more articles section as an ordered list where each article is a numbered item in the list -->
  {#if data && data.articles && data.articles.more}
    <h2>More Articles</h2>
    <ol>
      {#each insertDate(data.articles.more) as article}
        <li>
          <a href={constructArticlePath(article.slug, article.date)}>{article.name}</a>
        </li>
      {/each}
    </ol>
  {/if}

  {#if data?.timestamps?.week}
    <br />
    <br />
    <br />
    <Button href={`/flusher/${DateTime.fromISO(data.timestamps.week).toISODate()}/print`}
      >View print edition</Button
    >
  {/if}
</Container>

<style>
  h1 {
    font-family: var(--font-headline);
    font-size: 40px;
    line-height: 52px;
    font-style: italic;
    font-weight: 700;
    letter-spacing: 0.3px;
    color: var(--color-neutral-dark);
    text-transform: uppercase;
    text-align: center;
    margin: 36px 0 0 0;
  }
  subtitle {
    display: block;
    font-family: var(--font-detail);
    letter-spacing: 1px;
    font-size: 16px;
    line-height: 18px;
    font-style: italic;
    font-weight: 500;
    color: var(--color-neutral-dark);
    text-transform: uppercase;
    text-align: center;
    margin: 0;
    padding: 0 0 36px 0;
    border-bottom: 1px solid var(--border-light);
  }
  h2 {
    font-family: var(--font-headline);
    font-size: 22px;
    line-height: 28px;
    font-style: italic;
    font-weight: 700;
    letter-spacing: 0px;
    color: var(--color-neutral-dark);
    text-transform: uppercase;
    text-align: left;
    margin: 2em 0 0.4em 0;
  }
  ol {
    margin: 10px 0;
    padding-inline-start: 16px;
    font-family: var(--font-headline);
    color: var(--color-neutral-dark);
    font-size: 16px;
    line-height: 22px;
    font-weight: normal;
  }
  li {
    margin: 0 0 6px 0;
  }
  a {
    color: var(--color-neutral-dark);
  }
  a:hover {
    color: var(--color-neutral-light);
  }
</style>
