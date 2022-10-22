<script lang="ts">
  import { goto } from '$app/navigation';
  import { title } from '$lib/stores/title';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';

  export let data: PageData;

  // set the document title
  title.set('Redirecting...');

  onMount(() => {
    goto(data.original_url, { replaceState: true });
  });
</script>

The Paladin Network
<br />
<br />
<div>Redirecting to <a href={data.original_url}>{data.original_url}</a>.</div>
<br />
<br />
Link does not work? Send us this code: <code>{data.code}</code>
