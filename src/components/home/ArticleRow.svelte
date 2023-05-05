<script lang="ts">
  import { Image } from '$lib/components/Image';
  import { listOxford, notEmpty } from '$lib/utils';
  import { formatISODate } from '$lib/utils/formatISODate';
  import smartquotes from 'smartquotes';

  export let style = '';
  export let name: string;
  export let description: string | undefined = undefined;
  export let href: string;
  export let photo: string | undefined = undefined;
  export let date: string | undefined = undefined; // ISO date format
  export let authors: { name: string }[] = [];
  export let categories: string[] = [];
  export let isSmallerHeadline = false;
  export let photoFirst = false;
  export let isCompact = false;
  export let verticallyCenterText = false;

  // modify the names of the categories to match the website sections
  let categoriesModified: string[] = [];
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

<a {href} {style} class:photoFirst>
  <!-- photo -->
  {#if photo !== undefined && photo.length > 0}
    <div class={'photo-wrapper'} class:isCompact>
      <Image
        src={photo}
        className={`article-row-image`}
        containerClassName={`article-row-image-container`}
      />
    </div>
  {/if}

  <div class="text-wrapper" class:verticallyCenterText>
    <div class={`text`}>
      <!-- article categories -->
      {#if categoriesModified.length > 0}
        <div class={'categories'} class:isCompact>
          {categoriesModified
            .map((cat, index) => {
              if (index < categoriesModified.length - 1) return `${cat}  |  `;
              return cat;
            })
            .join('')}
        </div>
      {/if}

      <!-- article name -->
      <div
        class={'name'}
        class:isSmallerHeadline
        class:noMargin={(isCompact && description === undefined) ||
          (!isCompact && description === undefined)}
      >
        {smartquotes(name)}
      </div>

      <!-- article description -->
      {#if description === undefined || description === ''}
        {''}
      {:else}
        <div class={'description'}>{smartquotes(description)}</div>
      {/if}

      <!-- article meta info (date and authors) -->
      <div class={'meta'} class:noMargin={isCompact && description === undefined}>
        <!-- article date -->
        {#if date === undefined || date === 'Dec. 31, 0000'}
          {''}
        {:else}
          <span>{formatISODate(date)}</span>
        {/if}

        <!-- only show divider if date and authors are both defined-->
        {#if date !== undefined && date !== 'Dec. 31, 0000' && (authors || []).filter(notEmpty).length > 0}
          <span> | </span>
        {/if}

        <!-- display the article authors with the appropriate separators -->
        {#if (authors || []).filter(notEmpty).length > 0}
          <span>
            By {listOxford(
              authors.filter(notEmpty).map((author) => author.name.replace(' (Provisional)', ''))
            )}
          </span>
        {/if}
      </div>
    </div>
  </div>
</a>

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
    flex-direction: row-reverse;
    justify-content: space-between;
    gap: 16px;
  }
  a.photoFirst {
    flex-direction: row;
  }
  a:hover {
    color: var(--color-neutral-light);
  }
  div.text {
    width: 100%;
  }
  div.text-wrapper {
    display: flex;
    width: 100%;
  }
  div.text-wrapper.verticallyCenterText {
    align-items: center;
  }
  .categories {
    font-family: var(--font-detail);
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 3px;
    text-transform: uppercase;
  }
  .categories.isCompact {
    margin-top: 0;
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
  .name.noMargin {
    margin-bottom: 0;
  }
  .name.isSmallerHeadline {
    font-size: 17px;
    line-height: 22px;
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
  .meta.noMargin {
    margin-top: 0;
  }
  .photo-wrapper {
    width: 180px;
    height: 120px;
    position: relative;
    margin: 0;
    flex-grow: 0;
    flex-shrink: 0;
  }
  .photo-wrapper.isCompact {
    width: 139px;
    height: 90px;
  }
  :global(.article-row-image),
  :global(.article-row-image-container) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    object-fit: cover;
  }
  /* on small screens, render article rows like cmpact cards */
  @media (max-width: 560px) {
    a {
      display: block;
    }
    .photo-wrapper {
      width: 88px;
      height: 62.6px;
      float: right;
      margin-left: 10px;
    }
  }
</style>
