<script lang="ts">
  import GamesHeader from '$lib/components/header/GamesHeader.svelte';
  import type { LoadEvent } from '@sveltejs/kit';
  import { afterUpdate } from 'svelte';

  // keep track of the page path
  export let path: string;
  afterUpdate(() => {
    // keep the path updated when the component changes
    path = window.location.pathname;
  });
</script>

<svelte:head>
  <title>The Paladin Games</title>
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
