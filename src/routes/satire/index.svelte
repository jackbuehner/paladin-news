<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  export async function load({ url }: LoadInput): Promise<LoadOutput> {
    return {
      status: 301, // permanent redirect
      redirect: `/the-horse/1`,
    };
  }
</script>
