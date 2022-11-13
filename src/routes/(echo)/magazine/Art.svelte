<script lang="ts">
  import type { GET_ECHO_DOCS__DOC_TYPE } from '$lib/queries';
  import { insertDate, listOxford, toIK } from '$lib/utils';
  import Name from './Name.svelte';

  export let art: GET_ECHO_DOCS__DOC_TYPE[];
</script>

<div class="container">
  {#each insertDate(art) as { name, photo, authored_by, date, slug }}
    {@const href = `/magazine/studio-art/${date.year}/${date.month}/${date.day}/${slug}`}
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
      </div>
    </article>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    max-height: 700px;
    overflow: hidden;
    flex-wrap: wrap;
  }

  article {
    margin: 0 0 10px 0;
    border-top: 1px solid var(--border-dark);
    padding: 10px 0 0 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  }

  @media (max-width: 520px) {
    .container {
      max-height: unset;
    }

    article:not(:first-of-type):not(:nth-of-type(2)):not(:nth-of-type(3)) {
      display: none;
    }
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
    width: 100%;
    max-width: 100%;
    max-height: 240px;
    object-fit: scale-down;
    object-position: left;
  }
</style>
