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
  .paladin-plus-article-prompt {
    margin-top: 20px;
    margin-bottom: -14px;
    padding: 20px;
    border: 1px solid var(--border-dark);
    font-family: var(--font-detail);
    font-size: 15px;
    line-height: 21px;
    font-style: italic;
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
  import { afterUpdate, onMount } from 'svelte';
  import { title } from '../../../stores/title';
  import MoreArticles from '/src/components/article/MoreArticles.svelte';
  import Button from '/src/components/Button.svelte';
  import { goto } from '$app/navigation';

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

  // set the data for pico
  afterUpdate(() => {
    // @ts-expect-error pico exists on window
    window.pico('visit', {
      article: true,
      post_id: article._id,
      post_type: 'article',
      taxonomies: {
        tags: article.tags ? [...article.tags] : [],
        categories: article.categories ? [...article.categories] : [],
      },
      url: window.location.href,
      resource_ref: article.slug,
    });
  });
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
    <!-- categories -->
    <ArticleCategories categories={article.categories} />

    <!-- heading -->
    <ArticleHeading>{article.name}</ArticleHeading>

    <!-- subtitle -->
    <ArticleSubtitle>{article.description}</ArticleSubtitle>

    <!-- video/photo -->
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

    <!-- meta info -->
    <ArticleMeta
      date={article.timestamps.published_at}
      authors={article.people.authors}
      articleName={article.name}
      articleLocation={`https://thepaladin.news/articles/${article.slug}`}
      articleDescription={article.description} />

    <!-- special content notices -->
    {#if article.tags}
      {#if article.tags.includes('paladin profiles')}
        <div class={'paladin-plus-article-prompt'}>
          This article is part of the <b>Paladin Profiles</b> video interview newsletter. Paladin
          Profiles highlight the important work Paladins past and present are doing to improve
          diversity and inclusion on campus and beyond. To receive content like this a week early,
          <a href={'/newsletters'}>subscribe here</a>!
        </div>
      {:else if article.tags.includes('sunday summary')}
        <div class={'paladin-plus-article-prompt'}>
          This article is part of the <b>Sunday summary</b> newsletter. To receive more content like
          this a week early,
          <a href={'/newsletters'}>subscribe here</a>!
        </div>
      {:else if article.tags.includes('rwbp')}
        <div class={'paladin-plus-article-prompt'}>
          This article is part of the <b>Red, White, Blue, & Purple</b> podcast-newsletter that
          covers politics and policy from a Furman Perspective. To receive more content like this a
          week early,
          <a href={'/newsletters'}>subscribe here</a>!
        </div>
      {:else if article.tags.includes('the works')}
        <div class={'paladin-plus-article-prompt'}>
          This article is part of the <b>The Works</b> newsletter. The Works tracks the latest
          trends sweeping the student body, highlights creative talent, and shines a light on the
          best (and worst) aspects of campus culture at Furman. To receive more content like this a
          week early,
          <a href={'/newsletters'}>subscribe here</a>!
        </div>
      {:else if article.tags.includes('deep dive')}
        <div class={'paladin-plus-article-prompt'}>
          This article is part of The Paladin’s data-driven newsletter uncovering campus’ biggest
          stories, <b>Deep Dive</b>. To receive content like this a week early,
          <a href={'/newsletters'}>subscribe here</a>!
        </div>
      {:else if article.tags.includes('sports roundup')}
        <div class={'paladin-plus-article-prompt'}>
          This article is part of the <b>Paladin Sports Roundup</b>, a newsletter with comprehensive
          updates on the Paladins and special features such as video interviews with Furman
          athletes. To receive content like this a week early,
          <a href={'/newsletters'}>subscribe here</a>!
        </div>
      {/if}
    {/if}

    <!-- body -->
    <ArticleBody doc={article.body} />

    <!-- video -->
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

  <!-- more from the paladin -->
  <aside class={'more'}>
    <style>
      .more {
        display: grid;
        grid-template-columns: 1fr 320px;
        gap: 16px;
      }
      @media (max-width: 900px) {
        .more {
          grid-template-columns: 1fr;
        }
      }
      .more img {
        width: 100%;
      }
      .more .desc {
        margin-top: 10px;
        padding-bottom: 10px;
        font-family: var(--font-detail);
        color: var(--color-neutral-dark);
        font-size: 16px;
        line-height: 20px;
        font-style: normal;
        text-align: center;
      }
      .more .group {
        border: 1px solid var(--border-dark);
        border-radius: var(--radius);
        padding: 20px;
        flex: 1;
      }
      .more .groups {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      @media (max-width: 900px) {
        .more .groups {
          flex-direction: row;
        }
      }
      @media (max-width: 560px) {
        .more .groups {
          flex-direction: column;
        }
      }
    </style>
    <MoreArticles />
    <div>
      <h1>More from The Paladin</h1>
      <div class={'groups'}>
        <div class={'group'}>
          <img
            src={'https://paladin-photo-library.s3.us-east-1.amazonaws.com/sunday-summary_logo_banner_background.svg'}
            alt={'Sunday Summary'} />
          <div class={'desc'}>
            A newsletter discussing the top articles of the week. Subscribe to recieve it in your
            inbox every Sunday.
          </div>
          <Button width={'100%'} on:click={() => goto('/newsletters')}>Subscribe</Button>
        </div>
        <div class={'group'}>
          <img
            src={'https://paladin-photo-library.s3.us-east-1.amazonaws.com/rwbp_logo_banner.svg'}
            alt={'Red, White, Blue, and Purple'} />
          <div class={'desc'}>
            Price St. Clair’s podcast-newsletter that covers politics and policy from a Furman
            Perspective. Subscribe to receive key takeaways and more when a new episode is
            published.
          </div>
          <Button width={'100%'} on:click={() => goto('/newsletters')}>Subscribe</Button>
        </div>
      </div>
    </div>
  </aside>
</Container>
