<script lang="ts">
  import { goto } from '$app/navigation';
  import type { GET_SHORTURL__DOC_TYPE } from '$lib/queries';
  import { title } from '$lib/stores/title';
  import { onMount } from 'svelte';

  export let data: string | undefined;
  $: shortUrl = data ? (JSON.parse(data) as GET_SHORTURL__DOC_TYPE) : undefined;

  // set the document title
  title.set('Redirecting...');

  onMount(() => {
    if (shortUrl) goto(shortUrl.original_url, { replaceState: true });
  });
</script>

The Paladin Network
<br />
<br />
<div>Redirecting to <a href={shortUrl?.original_url}>{shortUrl?.original_url}</a>.</div>
<br />
<br />
Link does not work? Send us this code: <code>{shortUrl?.code}</code>
