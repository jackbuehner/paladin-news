<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ url }: LoadEvent) {
    // return the page path to the page
    return { props: { path: url.pathname } };
  }
</script>

<script lang="ts">
  import GamesHeader from '$lib/components/header/GamesHeader.svelte';
  import { title } from '$lib/stores/title';
  import type { LoadEvent } from '@sveltejs/kit';
  import { afterUpdate } from 'svelte';

  // keep track of the page path
  export let path: string;
  afterUpdate(() => {
    // keep the path updated when the component changes
    path = window.location.pathname;
  });

  // create the document title
  $: title_ = $title || path !== '/games' ? `${$title} - The Paladin Games` : 'The Paladin Games';
</script>

<svelte:head>
  <title>{title_}</title>
</svelte:head>

<div class={'wrapper'}>
  <GamesHeader />

  <div class={'content'}>
    <slot />
  </div>
</div>

<style>
  div.wrapper {
    display: flex;
    flex-direction: column;
    height: fit-content;
    min-height: 100%;
  }
  div.content {
    flex-grow: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
