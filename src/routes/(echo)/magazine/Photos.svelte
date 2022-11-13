<script lang="ts">
  import type { GET_ECHO_DOCS__DOC_TYPE } from '$lib/queries';
  import { insertDate, toIK } from '$lib/utils';
  import ViewMoreLink from './ViewMoreLink.svelte';

  export let photos: GET_ECHO_DOCS__DOC_TYPE[];
</script>

<div class="grid">
  {#each insertDate(photos) as { photo, date, slug }}
    {#if photo}
      <a href="/magazine/photography/{date.year}/{date.month}/{date.day}/{slug}">
        <img src={toIK(photo.photo_url, 'tr:h-80')} alt="" />
      </a>
    {/if}
  {/each}
</div>

<ViewMoreLink href="/magazine/category/photography" style="margin-bottom: 10px;"
  >View more photos</ViewMoreLink
>

<style>
  img {
    width: 100%;
    aspect-ratio: 1;
    margin-bottom: 10px;
    object-fit: cover;
  }

  div.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
    grid-template-rows: 1fr;
    grid-auto-rows: 0;
    overflow: hidden;
    column-gap: 10px;
    margin: 20px 0 0 0;
  }
</style>
