<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  import { onMount } from 'svelte';

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ page, fetch }: LoadInput): Promise<LoadOutput> {
    const url = `/shorturl/code/${page.params.code}.json`;
    const res = await fetch(url);

    // set the document title
    title.set('Redirecting...');

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
  import { title } from '../../../stores/title';
  import type { GET_SHORTURL__DOC_TYPE } from '../../../queries';

  export let shortURL: GET_SHORTURL__DOC_TYPE;

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
