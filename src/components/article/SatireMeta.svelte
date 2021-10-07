<style>
  .byline {
    height: 36px;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 14px;
    line-height: 36px;
    font-weight: 400;
    margin: -20px 0 20px 0;
  }
</style>

<script lang="ts">
  import { DateTime } from 'luxon';
  import { formatISODate } from '../../utils/formatISODate';

  export let date: string;
  export let authors: string[] = [];

  const parsed = DateTime.fromISO(date);
  if (parsed.isValid) {
    // only set the date if it was successfully parsed from ISO
    date = formatISODate(date);
  }
</script>

<div class={'byline'}>
  <span>{date}</span>
  <span> | </span>
  <span>By</span>
  <!-- display the article authors with the appropriate separators -->
  {#if authors === []}
    <!-- hide if undefined -->
    {''}
  {:else if authors.length === 1}
    <!-- show author if only one -->
    <span>{authors[0]}</span>
  {:else if authors.length === 2}
    <!-- separate with 'and' if two authors -->
    <span>{authors[0]}</span>
    <span> and </span>
    <span>{authors[1]}</span>
  {:else if authors.length > 2}
    <!-- separate with either a comma or ', and' if more than two authors -->
    {#each authors as author, index}
      {#if index === 0}
        <span>{author}</span>
      {:else if index === authors.length - 1}
        <span>, and </span>
        <span>{author}</span>
      {:else}
        <span>, </span>
        <span>{author}</span>
      {/if}
    {/each}
  {/if}
</div>
