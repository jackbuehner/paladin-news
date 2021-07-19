<style>
  a {
    color: var(--color-neutral-dark);
    transition: color 200ms ease 0s;
    text-decoration: none;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    cursor: pointer;
  }
  a:hover {
    color: var(--color-neutral-light);
  }
  .name {
    margin-top: 0px;
    margin-bottom: 8px;
    font-family: var(--font-headline);
    font-size: 20px;
    font-weight: 700;
    line-height: 26px;
    letter-spacing: -0.017em;
  }
  .description {
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 22px;
  }
  .meta {
    font-family: var(--font-detail);
    font-size: 14px;
    line-height: 20px;
    margin-top: 4px;
    color: var(--color-neutral-light);
  }
  .photo-group {
    margin-bottom: 8px;
  }
  .photo-wrapper {
    width: 100%;
    padding-top: calc(66.6667%);
    height: 0px;
    position: relative;
    float: unset;
    margin-left: unset;
    margin-right: unset;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }
  .photo-credit {
    font-family: var(--font-body);
    color: rgb(167, 167, 167);
    font-size: 13px;
    line-height: 20px;
    text-align: right;
  }
</style>

<script lang="ts">
  import { DateTime } from 'luxon';

  export let name: string;
  export let description: string = undefined;
  export let href: string;
  export let photo: string = undefined;
  export let photoCredit: string = undefined;
  export let date: string = undefined; // ISO date format
  export let authors: string[] = undefined;

  const parsed = DateTime.fromISO(date);
  if (parsed.isValid) {
    // only set the date if it was successfully parsed from ISO
    date = parsed.toFormat('LLL. dd, yyyy');
  }
</script>

<a {href}>
  <!-- photo and credit -->
  {#if photo === undefined}
    {''}
  {:else}
    <div class={'photo-group'}>
      <div class={'photo-wrapper'}>
        <img src={photo} alt={''} />
      </div>
      {#if photoCredit === undefined}
        {''}
      {:else}
        <div class={'photo-credit'}>{photoCredit}</div>
      {/if}
    </div>
  {/if}

  <!-- article name -->
  <div class={'name'}>{name}</div>

  <!-- article description -->
  {#if description === undefined}
    {''}
  {:else}
    <div class={'description'}>{description}</div>
  {/if}

  <!-- article meta info (date and authors) -->
  <div class={'meta'}>
    <!-- article date -->
    {#if date === undefined || date === 'Dec. 31, 0000'}
      {''}
    {:else}
      <span>{date}</span>
    {/if}

    <!-- only show divider if date and authors are both defined-->
    {#if date !== undefined && date !== 'Dec. 31, 0000' && authors !== undefined}
      <span> | </span>
    {/if}

    <!-- display the article authors with the appropriate separators -->
    {#if authors === undefined}
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
</a>
