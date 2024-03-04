<script lang="ts">
  import type { IArticleAuthor } from '$lib/interfaces/articles';
  import { formatISODate } from '$lib/utils/formatISODate';
  import { slugify } from '$lib/utils/slugify';
  import { DateTime } from 'luxon';

  export let date: string;
  export let authors: IArticleAuthor[] = [];
  export let categories: string[];

  $: parsed = DateTime.fromISO(date).isValid ? formatISODate(date) : date;
</script>

<div class={`article-metadata-furmanmediacom`}>
  <div class={'date'}>
    Date: {parsed}
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
  <div class={'categories'}>
    <span>Sections:</span>
    {#each categories as category, index}
      {#if index === 0}
        <a href={`/section/${encodeURIComponent(category)}`}>{category}</a>
      {:else}
        <span>, </span>
        <a href={`/section/${encodeURIComponent(category)}`}>{category}</a>
      {/if}
    {/each}
  </div>
</div>

<style>
  .article-metadata-furmanmediacom {
    font-family: var(--legacy2-font);
    color: #686868;
    font-size: 14px;
    margin: 6px 20px 40px 0;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  @media (max-width: 950px) {
    .article-metadata-furmanmediacom {
      flex-direction: row;
      margin: -20px 0 20px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 12px;
      width: 100%;
      gap: 4px 16px;
      flex-wrap: wrap;
    }
  }
  a {
    color: #686868;
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    color: rgb(var(--legacy-primary));
    background-color: rgba(var(--legacy-primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--legacy-primary));
  }
  a:active {
    background-color: rgba(var(--legacy-primary), 0.16);
  }
</style>
