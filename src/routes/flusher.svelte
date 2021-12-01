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

<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/flusher.json?${page.query.toString()}`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          flusher: await res.json(),
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
  import Container from '/src/components/Container.svelte';
  import { onMount } from 'svelte';
  import { title } from '../stores/title';
  import type { IFlush } from 'src/interfaces/flush';
  import ArticleRow from '/src/components/home/ArticleRow.svelte';
  import { formatISODate } from '../utils/formatISODate';
  import { insertDate } from '../utils/insertDate';

  // set the document title
  onMount(() => ($title = 'The Royal Flush'));

  export let flusher: IFlush;

  const featuredArticle = insertDate([flusher.articles.featured])[0];
</script>

<h1>The Royal Flush</h1>
<subtitle>Week of {formatISODate(flusher.timestamps.week)}</subtitle>

<Container>
  <h2>Featured Article</h2>
  <ArticleRow
    name={featuredArticle.name}
    href={featuredArticle.date
      ? `/articles/${featuredArticle.date.year}/${featuredArticle.date.month}/${featuredArticle.date.day}/${featuredArticle.slug}`
      : `/articles/${featuredArticle.slug}`}
    description={featuredArticle.description}
    photo={featuredArticle.photo_path}
    date={featuredArticle.timestamps.published_at}
    authors={featuredArticle.people.authors.filter((author) => !!author)} />

  <h2>More Articles</h2>
  <ol>
    {#each insertDate(flusher.articles.more) as article}
      <li>
        <a
          href={article.date
            ? `/articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
            : `/articles/${article.slug}`}>{article.name}</a>
      </li>
    {/each}
  </ol>
</Container>
