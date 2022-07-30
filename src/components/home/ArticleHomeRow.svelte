<script lang="ts">
  import { GET_ARTICLES, type GET_ARTICLES__TYPE, type GET_ARTICLES__DOC_TYPE } from '$lib/queries';
  import { api } from '$lib/utils/api';
  import { onMount } from 'svelte';
  import ArticleCard from './ArticleCard.svelte';

  export let excludeSlugs: string[] = [];

  let articles: GET_ARTICLES__DOC_TYPE[] = [];
  onMount(async () => {
    // define the variables for the query
    const limit = windowWidth > 960 ? 15 : windowWidth <= 600 ? 5 : 12;
    const page = 1;
    const filter = JSON.stringify({
      'timestamps.published_at': { $exists: true },
      slug: { $nin: excludeSlugs },
    });
    const sort = JSON.stringify({ 'timestamps.published_at': -1 });

    // request the satires from the api
    const { data, error } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
      variables: { limit, page, filter, sort },
    });

    if (data?.articlesPublic) articles = data.articlesPublic.docs;
  });

  let windowWidth: number = 1200;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class:hide={articles.length === 0}>
  <slot />
  <div>
    {#each articles.slice(0, windowWidth > 960 ? 15 : windowWidth <= 600 ? 5 : 12) as { name, slug, people, photo_path, categories }}
      <ArticleCard
        {name}
        {categories}
        href={`/satire/${slug}`}
        photo={windowWidth <= 600 ? undefined : photo_path}
        authors={people.authors}
        isSmallerHeadline
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
    div {
      grid-template-columns: 1fr;
    }
  }
</style>
