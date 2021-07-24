<style>
  article {
    max-width: 590px;
    margin: 32px auto;
  }
  aside h1 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 22px;
    line-height: 26px;
    font-weight: 700;
    margin: 40px 0 20px 0;
  }
</style>

<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/articles/${page.params.slug}.json`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          article: await res.json(),
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
  import ArticleHeading from '/src/components/article/ArticleHeading.svelte';
  import ArticleSubtitle from '/src/components/article/ArticleSubtitle.svelte';
  import ArticleCategories from '/src/components/article/ArticleCategories.svelte';
  import ArticlePhoto from '/src/components/article/ArticlePhoto.svelte';
  import ArticleCaption from '/src/components/article/ArticleCaption.svelte';
  import ArticlePhotoCredit from '/src/components/article/ArticlePhotoCredit.svelte';
  import ArticleMeta from '/src/components/article/ArticleMeta.svelte';
  import ArticleBody from '/src/components/article/ArticleBody.svelte';
  import type { IArticle } from 'src/interfaces/articles';
  import Container from '/src/components/Container.svelte';
  import { onMount } from 'svelte';
  import { title } from '../../../stores/title';

  export let article: IArticle;

  // set the document title
  onMount(() => ($title = article.name));

  // video embed options
  let video_embed_path: string | null = null;
  if (article.video_path) {
    const videoParams = new URLSearchParams(article.video_path.split('?')[1]);
    const videoType: 'youtube' | 'vimeo' | null = article.video_path.indexOf('youtube.com')
      ? 'youtube'
      : article.video_path.indexOf('vimeo.com')
      ? 'vimeo'
      : null;
    const videoId: string | null =
      videoType === 'youtube'
        ? videoParams.get('v')
        : videoType === 'vimeo'
        ? new URL('https://vimeo.com/309904631').pathname.replace('/', '')
        : null;
    video_embed_path =
      videoId === null
        ? null
        : videoType === 'youtube'
        ? `https://www.youtube.com/embed/${videoId}?color=white&rel=0`
        : videoType === 'vimeo'
        ? `https://player.vimeo.com/video/${videoId}?color=ffffff&byline=0&portrait=0`
        : null;
  }
</script>

<svelte:head>
  <meta property={'og:url'} content={`https://thepaladin.news/articles/${article.slug}`} />
  <meta property={'og:type'} content={'article'} />
  <meta property={'og:title'} content={article.name} />
  <meta property={'og:description'} content={article.description} />
  <meta property={'og:image'} content={article.photo_path} />
  <meta property={'og:locale'} content={'en_US'} />
</svelte:head>

<Container>
  <article>
    <ArticleCategories categories={article.categories} />
    <ArticleHeading>{article.name}</ArticleHeading>
    <ArticleSubtitle>{article.description}</ArticleSubtitle>
    {#if video_embed_path && article.video_replaces_photo}
      <div style={'padding: 56.25% 0 0 0; position: relative;'}>
        <iframe
          title={'related video'}
          src={video_embed_path}
          style={'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'}
          frameborder={'0'} />
      </div>
    {:else}
      <ArticlePhoto src={article.photo_path} />
      <ArticleCaption>{article.photo_caption}</ArticleCaption>
      <ArticlePhotoCredit>{article.photo_credit}</ArticlePhotoCredit>
    {/if}
    <ArticleMeta
      date={article.timestamps.published_at}
      authors={article.people.authors}
      articleName={article.name}
      articleLocation={`https://thepaladin.news/articles/${article.slug}`}
      articleDescription={article.description} />
    <ArticleBody doc={article.body} />
    {#if video_embed_path && !article.video_replaces_photo}
      <aside>
        <h1>Related video</h1>
        <div style={'padding: 56.25% 0 0 0; position: relative;'}>
          <iframe
            title={'related video'}
            src={video_embed_path}
            style={'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'}
            frameborder={'0'} />
        </div>
      </aside>
    {/if}
    <script src="https://player.vimeo.com/api/player.js"></script>
  </article>
</Container>
