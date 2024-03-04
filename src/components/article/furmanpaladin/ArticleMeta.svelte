<script lang="ts">
  import type { IArticleAuthor } from '$lib/interfaces/articles';
  import { formatISODate } from '$lib/utils/formatISODate';
  import { slugify } from '$lib/utils/slugify';
  import { DateTime } from 'luxon';

  export let date: string;
  export let authors: IArticleAuthor[] = [];
  export let commentsCount = 0;

  $: parsed = DateTime.fromISO(date).isValid ? formatISODate(date) : date;
</script>

<div class={`article-metadata-furmanpaladin`}>
  <div class={'date'}>
    Date: {parsed}
  </div>
  <div class={'byline'}>
    <span>By:</span>
    <!-- display the article authors with the appropriate separators -->
    {#if !authors || authors.length === 0}
      <!-- hide if undefined -->
      {''}
    {:else if authors.length === 1}
      <!-- show author if only one -->
      <a
        href={`/profile/${
          authors[0].slug ? authors[0].slug : slugify(authors[0].name.replace(' (Provisional)', ''))
        }`}>{authors[0].name.replace(' (Provisional)', '')}</a
      >
    {:else if authors.length === 2}
      <!-- separate with 'and' if two authors -->
      <a
        href={`/profile/${
          authors[0].slug ? authors[0].slug : slugify(authors[0].name.replace(' (Provisional)', ''))
        }`}>{authors[0].name.replace(' (Provisional)', '')}</a
      >
      <span> and </span>
      <a
        href={`/profile/${
          authors[1].slug ? authors[1].slug : slugify(authors[1].name.replace(' (Provisional)', ''))
        }`}>{authors[1].name.replace(' (Provisional)', '')}</a
      >
    {:else if authors.length > 2}
      <!-- separate with either a comma or ', and' if more than two authors -->
      {#each authors as author, index}
        {#if index === 0}
          <a
            href={`/profile/${
              author.slug ? author.slug : slugify(author.name.replace(' (Provisional)', ''))
            }`}>{author.name.replace(' (Provisional)', '')}</a
          >
        {:else if index === authors.length - 1}
          <span>, and </span>
          <a
            href={`/profile/${
              author.slug ? author.slug : slugify(author.name.replace(' (Provisional)', ''))
            }`}>{author.name.replace(' (Provisional)', '')}</a
          >
        {:else}
          <span>, </span>
          <a
            href={`/profile/${
              author.slug ? author.slug : slugify(author.name.replace(' (Provisional)', ''))
            }`}>{author.name.replace(' (Provisional)', '')}</a
          >
        {/if}
      {/each}
    {/if}
  </div>
  {#if commentsCount > 0}
    <div class="comments">
      <a href="#comments">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
          <path
            d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"
          />
        </svg>
        {commentsCount} Comment{commentsCount === 1 ? '' : 's'}
      </a>
    </div>
  {/if}
</div>

<style>
  .article-metadata-furmanpaladin {
    font-family: var(--legacy-font-body);
    color: #999;
    font-size: 14px;
    margin: 6px 20px 40px 0;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  @media (max-width: 950px) {
    .article-metadata-furmanpaladin {
      flex-direction: row;
      margin: -28px 0 40px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 12px;
      width: 100%;
      gap: 16px;
    }
  }
  a {
    color: rgb(var(--legacy-primary));
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    background-color: rgba(var(--legacy-primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--legacy-primary));
  }
  a:active {
    background-color: rgba(var(--legacy-primary), 0.16);
  }

  .comments a {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }
  svg {
    inline-size: 14px;
    fill: currentColor;
  }
</style>
