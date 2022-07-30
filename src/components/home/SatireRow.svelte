<script lang="ts">
  import { GET_SATIRES, type GET_SATIRES__DOC_TYPE, type GET_SATIRES__TYPE } from '$lib/queries';
  import { api } from '$lib/utils/api';
  import { onMount } from 'svelte';
  import ArticleCard from './ArticleCard.svelte';

  let satires: GET_SATIRES__DOC_TYPE[] = [];
  onMount(async () => {
    // define the variables for the query
    const limit = 4;
    const page = 1;
    const filter = JSON.stringify({ 'timestamps.published_at': { $exists: true } });
    const sort = JSON.stringify({ 'timestamps.published_at': -1 });

    // request the satires from the api
    const { data, error } = await api.query<GET_SATIRES__TYPE>(GET_SATIRES, {
      variables: { limit, page, filter, sort },
    });

    if (data?.satiresPublic) satires = data.satiresPublic.docs;
  });

  let windowWidth: number = 1200;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<section class:hide={satires.length === 0}>
  <slot />
  <div>
    {#each satires.slice(0, windowWidth > 600 && windowWidth <= 800 ? 2 : 4) as { name, slug, people, photo_path }}
      <ArticleCard
        {name}
        href={`/satire/${slug}`}
        photo={windowWidth <= 600 ? undefined : photo_path}
        authors={people.display_authors.map((name) => ({ name }))}
        isSmallerHeadline
        metaStyle="color: var(--color-neutral-dark);"
      />
    {/each}
  </div>
</section>

<style>
  section {
    padding: 15px;
    margin: 30px 0;
    border: 1px solid rgba(var(--primary), 0.12);
    background: rgba(var(--primary), 0.08);
  }
  section.hide {
    display: none;
  }

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 15px;
  }

  @media (max-width: 800px) {
    div {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 600px) {
    div {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
    }
  }
</style>
