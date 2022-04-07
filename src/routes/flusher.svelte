<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    // get data from the flusher endpoint
    const url = `/flusher.json?${page.query.toString()}`;
    const res = await fetch(url);

    // set the document title
    title.set('The Royal Flush');

    // if the request was successful, return the data to the component's props
    if (res.ok) {
      return {
        props: {
          // return it as JSON
          flusher: await res.json(),
        },
      };
    }

    // otherwise, return an error
    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import Container from '/src/components/Container.svelte';
  import { title } from '../stores/title';
  import type { IFlush } from 'src/interfaces/flush';
  import ArticleRow from '/src/components/home/ArticleRow.svelte';
  import { constructArticlePath, insertDate, formatISODate } from '../utils';

  // the flusher document retrieved from the load function (above)
  export let flusher: IFlush;

  // get the featured article and insert date components
  // (to be used when contructing the URL to the article)
  const featuredArticle = flusher.articles.featured
    ? insertDate([flusher.articles.featured])[0]
    : null;
</script>

<!-- page title -->
<h1>The Royal Flush</h1>
<!-- flusher week formatted in AP style -->
<subtitle>Week of {formatISODate(flusher.timestamps.week)}</subtitle>

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
      authors={featuredArticle.people.authors.filter((author) => !!author)}
    />
  {/if}

  <!-- include the more articles section as an ordered list where each article is a numbered item in the list -->
  <h2>More Articles</h2>
  <ol>
    {#each insertDate(flusher.articles.more) as article}
      <li>
        <a href={constructArticlePath(article.slug, article.date)}>{article.name}</a>
      </li>
    {/each}
  </ol>
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
