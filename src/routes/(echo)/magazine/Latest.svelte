<script lang="ts">
  import type { GET_ECHO_DOCS__DOC_TYPE } from '$lib/queries';
  import { insertDate, listOxford, toIK } from '$lib/utils';
  import Name from './Name.svelte';
  import ViewMoreLink from './ViewMoreLink.svelte';

  export let latest: GET_ECHO_DOCS__DOC_TYPE[];
</script>

<div class="container">
  {#each insertDate(latest).slice(0, 1) as { name, photo, authored_by, date, slug, type }}
    {@const href = `/magazine/${type}/${date.year}/${date.month}/${date.day}/${slug}`}
    <article>
      {#if photo}
        <a {href}>
          <img
            src={toIK(photo.photo_url, 'tr:h-240')}
            style="aspect-ratio: {photo.dimensions.x / photo.dimensions.y};"
            alt=""
          />
        </a>
      {/if}
      <div class="meta">
        <Name {href}>{name}</Name>
        <div class="by">{listOxford(authored_by.map(({ name }) => name))}</div>
        <ViewMoreLink {href} style="margin: 0 0 10px 10px; font-size: 14px;">View</ViewMoreLink>
      </div>
    </article>
  {/each}
</div>

<style>
  article {
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
    max-width: 100%;
    max-height: 240px;
    object-fit: scale-down;
    object-position: left;
    width: 100%;
  }
</style>
