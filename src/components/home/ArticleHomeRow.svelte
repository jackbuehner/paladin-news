<script lang="ts">
  import { deserialize } from '$app/forms';
  import type { GET_ARTICLES__DOC_TYPE } from '$lib/queries';
  import { insertDate, notEmpty } from '$lib/utils';
  import ArticleCard from './ArticleCard.svelte';

  export let articles: GET_ARTICLES__DOC_TYPE[] = [];
</script>

<section class:hide={articles.length === 0}>
  <slot />
  <div class="desktop">
    {#each insertDate(articles.filter(notEmpty)) as { name, slug, people, photo_path, categories, date }}
      <ArticleCard
        {name}
        {categories}
        href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
        photo={photo_path}
        authors={people.authors}
        isSmallerHeadline
      />
    {/each}
  </div>
  <div class="mobile">
    {#each insertDate(articles.filter(notEmpty)) as { name, slug, people, photo_path, categories, date, description }, index}
      <ArticleCard
        {name}
        {categories}
        href={`/articles/${date.year}/${date.month}/${date.day}/${slug}`}
        photo={[0, 3, 8, 12, 17].includes(index) ? photo_path : undefined}
        authors={people.authors}
        isSmallerHeadline
        isCompact
        description={[0, 3, 8, 12, 17].includes(index) ? description : undefined}
      />
    {/each}
  </div>
</section>

<style>
  section {
    margin: 30px 0;
  }
  section.hide {
    display: none;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 15px;
  }

  div.mobile {
    display: none;
  }

  @media (max-width: 960px) {
    div {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  @media (max-width: 880px) {
    div {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (max-width: 740px) {
    div {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    div.mobile {
      display: grid;
    }
    div.desktop {
      display: none;
    }
    div {
      grid-template-columns: 1fr;
    }
    div :global(a:first-of-type) {
      padding-top: 12px;
      border-top: 1px solid var(--color-neutral-light);
    }
    div :global(a:not(:first-of-type)) {
      padding-top: 12px;
      border-top: 1px solid var(--border-dark);
    }
    div :global(a:last-of-type) {
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-dark);
    }
  }
</style>
