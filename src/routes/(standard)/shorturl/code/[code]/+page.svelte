<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  onMount(() => {
    goto(data.original_url, { replaceState: true });
  });
</script>

<svelte:head>
  <title>Redirecting...</title>
</svelte:head>

The Paladin Network
<br />
<br />
<div>Redirecting to <a href={data.original_url}>{data.original_url}</a>.</div>
<br />
<br />
Link does not work? Send us this code: <code>{data.code}</code>
