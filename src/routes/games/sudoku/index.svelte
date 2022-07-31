<script context="module" lang="ts">
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit';

  export async function load({ url }: LoadEvent): Promise<LoadOutput> {
    return {
      status: 301, // permanent redirect
      redirect: `/games/sudoku/latest`,
    };
  }
</script>
