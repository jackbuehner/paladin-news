<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import Image from '$lib/components/Image/Image.svelte';
  import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
  import type { PublishedDocWithDate } from '$lib/utils/insertDate';
  import {
    ArticleBody,
    ArticleCaption,
    ArticleCategories,
    ArticleFooter,
    ArticleHeading,
    ArticleMeta,
    ArticlePhoto,
    ArticlePhotoCredit,
    ArticleSubtitle,
    MoreArticles,
  } from './';
  import CoverPage from './CoverPage.svelte';

  export let article: PublishedDocWithDate<GET_ARTICLE_BY_SLUG__DOC_TYPE>;

  // video embed options
  let video_embed_path: string | null = null;
  if (article && article.video_path) {
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

  // keep track of window width
  $: windowWidth = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:head>
  {#if article}
    <meta
      property={'og:url'}
      content={`https://thepaladin.news/${
        article && article.date
          ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
          : `articles/${article.slug}`
      }`}
    />
    <meta property={'og:type'} content={'article'} />
    <meta property={'og:title'} content={article.name} />
    <meta property={'og:description'} content={article.description} />
    <meta property={'og:image'} content={article.photo_path} />
    <meta property={'og:locale'} content={'en_US'} />
  {/if}
</svelte:head>

<Container>
  {#if article}
    <article>
      <!-- cover page -->
      <CoverPage
        _id={article._id}
        name={article.name}
        publishedAt={article.timestamps.published_at}
        authors={article.people.authors
          .filter((p) => !!p)
          .map((p) => p.name.replace(' (Provisional)', ''))}
        managingEditors={article.people.editors.primary
          .filter((p) => !!p)
          .map((p) => p.name.replace(' (Provisional)', ''))}
        copyEditors={article.people.editors.copy
          .filter((p) => !!p)
          .map((p) => p.name.replace(' (Provisional)', ''))}
      />

      <!-- advertisement -->
      <!-- <a
        href="https://levelupforchange.org/youth/?utm_source=Paladin&utm_medium=banner&utm_campaign=Prev22&utm_id=Furman"
        style="box-shadow: none;"
        rel="noopener noreferrer"
      >
        <img
          src="https://ik.imagekit.io/paladin/66583b09-aaa7-440d-ae97-6c9ec848ba01"
          alt=""
          width="600"
          height="150"
          style="max-width: 100%; height: auto;"
        />
      </a> -->

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
            frameborder={'0'}
          />
        </div>
      {:else if article.photo_path && article.photo_path.length > 0}
        <ArticlePhoto src={article.photo_path} />
        {#if article.photo_caption && article.photo_caption.length > 0}
          <ArticleCaption>{article.photo_caption}</ArticleCaption>
        {/if}
        {#if article.photo_credit && article.photo_credit.length > 0}
          <ArticlePhotoCredit>{article.photo_credit}</ArticlePhotoCredit>
        {/if}
      {/if}

      <!-- meta info -->
      <ArticleMeta
        date={article.timestamps.published_at}
        authors={article.people.authors.filter((p) => !!p)}
        articleName={article.name}
        articleLocation={`https://thepaladin.news/articles/${article.slug}`}
        articleDescription={article.description}
      />

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
            This article is part of the <b>Sunday summary</b> newsletter. To receive more content
            like this a week early,
            <a href={'/newsletters'}>subscribe here</a>!
          </div>
        {:else if article.tags.includes('rwbp')}
          <div class={'paladin-plus-article-prompt'}>
            This article is part of the <b>Red, White, Blue, & Purple</b> podcast-newsletter that
            covers politics and policy from a Furman Perspective. To receive more content like this
            a week early,
            <a href={'/newsletters'}>subscribe here</a>!
          </div>
        {:else if article.tags.includes('the works')}
          <div class={'paladin-plus-article-prompt'}>
            This article is part of the <b>The Works</b> newsletter. The Works tracks the latest
            trends sweeping the student body, highlights creative talent, and shines a light on the
            best (and worst) aspects of campus culture at Furman. To receive more content like this
            a week early,
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
            This article is part of the <b>Paladin Sports Roundup</b>, a newsletter with
            comprehensive updates on the Paladins and special features such as video interviews with
            Furman athletes. To receive content like this a week early,
            <a href={'/newsletters'}>subscribe here</a>!
          </div>
        {/if}
      {/if}

      <!-- body -->
      <ArticleBody doc={article.body || ''} />

      <!-- video -->
      {#if video_embed_path && !article.video_replaces_photo}
        <aside>
          <h1>Related video</h1>
          <div style={'padding: 56.25% 0 0 0; position: relative;'}>
            <iframe
              title={'related video'}
              src={video_embed_path}
              style={'position: absolute; top: 0; left: 0; width: 100%; height: 100%;'}
              frameborder={'0'}
            />
          </div>
        </aside>
      {/if}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </article>

    <!-- footer -->
    <ArticleFooter {article} />

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
      <MoreArticles thisObjectId={article._id} />
      <div class="more-from">
        <h1>More from The Paladin</h1>
        <div class={'groups'}>
          <div class={'group'}>
            <img
              src={'https://ik.imagekit.io/paladin/sunday-summary_logo_banner_background.svg'}
              alt={'Sunday Summary'}
              loading={'lazy'}
            />
            <div class={'desc'}>
              A newsletter discussing the top articles of the week. Subscribe to recieve it in your
              inbox every Sunday.
            </div>
            <Button width={'100%'} on:click={() => goto('/newsletters')}>Subscribe</Button>
          </div>
        </div>
      </div>
    </aside>
  {/if}
</Container>

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

  /* article advertisment */
  :global(.article-adv) {
    width: 100%;
    max-width: 600px;
    height: 0;
    padding: 25% 0 0 0; /* 600px * 25% = 150px height */
  }
  :global(.article-adv-img) {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* print styles */
  @media print {
    :global(.article-adv),
    .more-from,
    :global(.article-footer) {
      display: none;
    }
    article {
      width: 100%;
      max-width: 100%;
      margin: 0;
    }
    :global(.article-body a) {
      box-shadow: none;
      text-decoration: underline;
      color: var(--color-neutral-dark);
    }
    :global(.article-body a::after) {
      content: ' (' attr(href) ') ';
      word-break: break-all;
    }
  }
  @page {
    margin: 0.5in;
  }
</style>
