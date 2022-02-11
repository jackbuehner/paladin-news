<script lang="ts">
  import {
    ArticleBody,
    ArticleCaption,
    ArticleCategories,
    ArticleHeading,
    ArticleMeta,
    ArticlePhoto,
    ArticlePhotoCredit,
    ArticleSubtitle,
    MoreArticles,
  } from './';
  import type { IArticle } from 'src/interfaces/articles';
  import Container from '/src/components/Container.svelte';
  import Button from '/src/components/Button.svelte';
  import { goto } from '$app/navigation';
  import Comments from './comments/Comments.svelte';
  import { commentsOpen } from '../../../stores/comments';
  import SocialButton from './_SocialButton.svelte';
  import { share } from '../../../components/article/share';
  import Image from '../../../components/Image.svelte';
  import CoverPage from './CoverPage.svelte';

  export let article: IArticle;

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
        name={article.name}
        publishedAt={article.timestamps.published_at}
        authors={article.people.authors.map((p) => p.name)}
        managingEditors={article.people.editors.primary.map((p) => p.name)}
        copyEditors={article.people.editors.copy.map((p) => p.name)}
      />

      <!-- advertisement -->
      <a href={'https://salons.greatclips.com/us/sc/greenville/5052-old-buncombe-rd'}>
        <Image
          src={`https://ik.imagekit.io/paladin/939516b5-05d6-4c7d-ad32-ffad14551d80`}
          className={`article-adv-img`}
          containerClassName={`article-adv`}
          loading={'eager'}
          maxSrcWidth={600}
        />
      </a>

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
        authors={article.people.authors}
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
              frameborder={'0'}
            />
          </div>
        </aside>
      {/if}
      <script src="https://player.vimeo.com/api/player.js"></script>
    </article>

    {#if article.show_comments}
      <div class={'article-footer'}>
        <Button
          on:click={() => ($commentsOpen = true)}
          style={'flex-grow: 1; height: 36px; font-weight: 700; letter-spacing: 0.6px;' +
            (windowWidth <= 500 ? 'width: 100%' : '')}>READ ALL COMMENTS</Button
        >
        <div class={'social-buttons'}>
          <SocialButton
            ariaLabel={'share on Facebook'}
            on:click={() =>
              share(
                'facebook',
                article.name,
                article.description,
                `https://thepaladin.news/${
                  article.date
                    ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
                    : `articles/${article.slug}`
                }`
              )}
          >
            <svg viewBox="0 0 7 15"
              ><path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.775 14.163V7.08h1.923l.255-2.441H4.775l.004-1.222c0-.636.06-.977.958-.977H6.94V0H5.016c-2.31 0-3.123 1.184-3.123 3.175V4.64H.453v2.44h1.44v7.083h2.882z"
                fill="currentColor"
              /></svg
            >
          </SocialButton>
          <SocialButton
            ariaLabel={'share on Twitter'}
            on:click={() =>
              share(
                'twitter',
                article.name,
                article.description,
                `https://thepaladin.news/${
                  article.date
                    ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
                    : `articles/${article.slug}`
                }`
              )}
          >
            <svg viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
              /></svg
            >
          </SocialButton>
          <SocialButton
            ariaLabel={'share via Email'}
            on:click={() =>
              share(
                'email',
                article.name,
                article.description,
                `https://thepaladin.news/${
                  article.date
                    ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
                    : `articles/${article.slug}`
                }`
              )}
          >
            <svg viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M13 17H17V14L22 18.5L17 23V20H13V17M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H11.35A5.8 5.8 0 0 1 11 18A6 6 0 0 1 22 14.69V6A2 2 0 0 0 20 4M20 8L12 13L4 8V6L12 11L20 6Z"
              /></svg
            >
          </SocialButton>
          <SocialButton
            ariaLabel={'share on LinkedIn'}
            on:click={() =>
              share(
                'linkedin',
                article.name,
                article.description,
                `https://thepaladin.news/${
                  article.date
                    ? `articles/${article.date.year}/${article.date.month}/${article.date.day}/${article.slug}`
                    : `articles/${article.slug}`
                }`
              )}
          >
            <svg viewBox="0 0 24 24"
              ><path
                fill="currentColor"
                d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
              /></svg
            >
          </SocialButton>
        </div>
      </div>
      <Comments pageId={article.timestamps.published_at + '_' + article.slug} />
    {/if}

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
  article,
  .article-footer {
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

  /* article footer */
  .article-footer {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 36px;
  }
  .social-buttons {
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
  @media (max-width: 500px) {
    .article-footer {
      flex-direction: column;
      gap: 18px;
    }
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
    .article-footer {
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
