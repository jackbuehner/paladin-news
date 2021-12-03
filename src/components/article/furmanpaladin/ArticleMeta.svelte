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
  .date,
  .byline {
    white-space: nowrap;
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
</style>

<script lang="ts">
  import { DateTime } from 'luxon';
  import { formatISODate } from '../../../utils/formatISODate';
  import type { IArticleAuthor } from 'src/interfaces/articles';
  import { slugify } from '../../../utils/slugify';

  export let date: string;
  export let authors: IArticleAuthor[] = [];

  const parsed = DateTime.fromISO(date);
  if (parsed.isValid) {
    // only set the date if it was successfully parsed from ISO
    date = formatISODate(date);
  }
</script>

<div class={`article-metadata-furmanpaladin`}>
  <div class={'date'}>
    Date: {date}
  </div>
  <div class={'byline'}>
    <span>By:</span>
    <!-- display the article authors with the appropriate separators -->
    {#if authors === []}
      <!-- hide if undefined -->
      {''}
    {:else if authors.length === 1}
      <!-- show author if only one -->
      <a
        href={`/profile/${
          authors[0].slug ? authors[0].slug : slugify(authors[0].name.replace(' (Provisional)', ''))
        }`}>{authors[0].name.replace(' (Provisional)', '')}</a>
    {:else if authors.length === 2}
      <!-- separate with 'and' if two authors -->
      <a
        href={`/profile/${
          authors[0].slug ? authors[0].slug : slugify(authors[0].name.replace(' (Provisional)', ''))
        }`}>{authors[0].name.replace(' (Provisional)', '')}</a>
      <span> and </span>
      <a
        href={`/profile/${
          authors[1].slug ? authors[1].slug : slugify(authors[1].name.replace(' (Provisional)', ''))
        }`}>{authors[1].name.replace(' (Provisional)', '')}</a>
    {:else if authors.length > 2}
      <!-- separate with either a comma or ', and' if more than two authors -->
      {#each authors as author, index}
        {#if index === 0}
          <a
            href={`/profile/${
              author.slug ? author.slug : slugify(author.name.replace(' (Provisional)', ''))
            }`}>{author.name.replace(' (Provisional)', '')}</a>
        {:else if index === authors.length - 1}
          <span>, and </span>
          <a
            href={`/profile/${
              author.slug ? author.slug : slugify(author.name.replace(' (Provisional)', ''))
            }`}>{author.name.replace(' (Provisional)', '')}</a>
        {:else}
          <span>, </span>
          <a
            href={`/profile/${
              author.slug ? author.slug : slugify(author.name.replace(' (Provisional)', ''))
            }`}>{author.name.replace(' (Provisional)', '')}</a>
        {/if}
      {/each}
    {/if}
  </div>
</div>
