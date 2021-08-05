<style>
  a {
    color: var(--color-neutral-dark);
    transition: color 200ms ease 0s;
    text-decoration: none;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 16px;
  }
  a:hover {
    color: var(--color-neutral-light);
  }
  .categories {
    font-family: var(--font-detail);
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 3px;
    text-transform: uppercase;
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
  .photo-wrapper {
    width: 180px;
    height: 120px;
    position: relative;
    margin: 0;
    flex-grow: 0;
    flex-shrink: 0;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }
</style>

<script lang="ts">
  import { DateTime } from 'luxon';
  import type { IArticleAuthor } from 'src/interfaces/articles';

  export let style: string = '';
  export let name: string;
  export let description: string = undefined;
  export let href: string;
  export let photo: string = undefined;
  export let date: string = undefined; // ISO date format
  export let authors: IArticleAuthor[] = [];
  export let categories: string[] = undefined;

  // modify the names of the categories to match the website sections
  let categoriesModified = [];
  if (categories) {
    categories.forEach((category) => {
      switch (category) {
        case 'arts-culture':
          categoriesModified.push('arts & culture');
          break;
        case 'campus-culture':
          categoriesModified.push('campus');
          break;
        case 'diversity':
          categoriesModified.push('diversity matters');
          break;
        default:
          // if category is missing from this switch, push it anyway
          categoriesModified.push(category);
          break;
      }
    });
  }
</script>

<a {href} {style}>
  <div>
    <!-- article categories -->
    {#if categoriesModified.length > 0}
      <div class={'categories'}>
        {categoriesModified
          .map((cat, index) => {
            console.log(cat);
            if (index < categoriesModified.length - 1) return `${cat}  |  `;
            return cat;
          })
          .join('')}
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
        <span>{DateTime.fromISO(date).toFormat('LLL. dd, yyyy')}</span>
      {/if}

      <!-- only show divider if date and authors are both defined-->
      {#if date !== undefined && date !== 'Dec. 31, 0000' && authors.length > 0}
        <span> | </span>
      {/if}

      <!-- display the article authors with the appropriate separators -->
      {#if authors === undefined}
        <!-- hide if undefined -->
        {''}
      {:else if authors.length === 1}
        <!-- show author if only one -->
        <span>{authors[0].name}</span>
      {:else if authors.length === 2}
        <!-- separate with 'and' if two authors -->
        <span>{authors[0].name}</span>
        <span> and </span>
        <span>{authors[1].name}</span>
      {:else if authors.length > 2}
        <!-- separate with either a comma or ', and' if more than two authors -->
        {#each authors as author, index}
          {#if index === 0}
            <span>{author.name}</span>
          {:else if index === authors.length - 1}
            <span>, and </span>
            <span>{author.name}</span>
          {:else}
            <span>, </span>
            <span>{author.name}</span>
          {/if}
        {/each}
      {/if}
    </div>
  </div>

  <!-- photo -->
  {#if photo !== undefined}
    <div class={'photo-wrapper'}>
      <img src={photo} alt={''} />
    </div>
  {/if}
</a>
