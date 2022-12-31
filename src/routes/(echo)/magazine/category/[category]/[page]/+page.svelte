<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import { headerLabel } from '$lib/stores/header';
  import { title } from '$lib/stores/title';
  import { capitalize, listOxford, toIK } from '$lib/utils';
  import { insertDate } from '$lib/utils/insertDate';
  import { onDestroy } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  $: {
    if (data.pageTitle) {
      title.set(capitalize(data.pageTitle, true));
      headerLabel.set(data.pageTitle);
    }
  }

  $: windowWidth = 0;

  // unset the header label on destroy
  onDestroy(() => ($headerLabel = ''));
</script>

<svelte:window bind:innerWidth={windowWidth} />

<Container width="800px">
  <h1>All {data.pageTitle}</h1>
  <div class="subtitle">Page {data.page} of {data.totalPages}</div>

  {#each insertDate(data.docs) as { type, name, photo, authored_by, date, slug }}
    {@const href = `/magazine/${type}/${date.year}/${date.month}/${date.day}/${slug}`}
    <a {href}>
      <article>
        {#if photo}
          <img
            src={toIK(photo.photo_url, 'tr:h-240')}
            style="aspect-ratio: {photo.width / photo.height};"
            alt=""
          />
        {/if}
        <div class="meta">
          <h2>{name}</h2>
          <div class="by">{listOxford(authored_by.map(({ name }) => name))}</div>
        </div>
      </article>
    </a>
  {/each}

  <div class={'navrow'}>
    {#if data.hasNextPage || data.hasPrevPage}
      Page {data.page} of {data.totalPages}
    {/if}
    <div class={'buttonrow'}>
      {#if data.hasPrevPage}
        <Button href={`./${data.prevPage}`}>Previous</Button>
      {/if}
      {#if data.hasNextPage}
        <Button href={`./${data.nextPage}`}>Next</Button>
      {/if}
    </div>
  </div>
</Container>

<style>
  h1 {
    font-family: var(--echo-font-heading);
    font-size: 34px;
    font-weight: 700;
    margin: 34px 0 0 0;
    text-align: center;
  }

  div.subtitle {
    font-family: var(--echo-font-body);
    font-size: 16px;
    font-weight: 400;
    margin: 10px 0 34px 0;
    color: var(--color-neutral-dark);
    text-align: center;
  }

  h2 {
    font-family: var(--echo-font-body);
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    color: var(--color-neutral-dark);
    line-height: 1.1;
  }

  article {
    margin: 0;
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  }

  .by {
    font-family: var(--echo-font-body);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-neutral-dark);
    font-style: italic;
    margin: 0 0 0 10px;
  }

  img {
    display: inline-block;
    width: 100%;
    max-width: 140px;
    object-fit: scale-down;
    object-position: left;
  }

  /* page navigation*/
  .navrow {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 400;
    padding: 16px 20px 32px 20px;
    grid-area: auto / 1 / auto / 3;
  }
  .buttonrow {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }

  a {
    color: inherit;
    text-decoration: none;
    display: block;
    transition: background-color 0.2s, box-shadow 0.1s;
    box-shadow: 0 -0.5px 0 0 var(--border-dark);
  }
  a:last-of-type {
    box-shadow: 0 0.5px 0 0 var(--border-dark), 0 -0.5px 0 0 var(--border-dark);
  }
  a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary)), 0 -2px 0 0 rgb(var(--primary));
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
