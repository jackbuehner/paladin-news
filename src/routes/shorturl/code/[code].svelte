<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  import type { IShortURL } from 'src/interfaces/shorturl';
  import { onMount } from 'svelte';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/shorturl/code/${page.params.code}.json`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          shortURL: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not redirect using code ${page.params.code}`),
    };
  }
</script>

<script lang="ts">
  import { goto } from '$app/navigation';

  export let shortURL: IShortURL;

  onMount(() => {
    goto(shortURL.original_url, { replaceState: true });
  });
</script>

The Paladin Network
<br />
<br />
<div>Redirecting to <a href={shortURL.original_url}>{shortURL.original_url}</a>.</div>
<br />
<br />
Link does not work? Send us this code: <code>{shortURL.code}</code>

https://api.thepaladin.dev.cristata.app/api/v2/shorturl/LeciAhD
