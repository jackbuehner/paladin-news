<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  export async function load({ page }: LoadInput): Promise<LoadOutput> {
    return {
      status: 301, // permanent redirect
      redirect: `${page.path}/1`,
    };
  }
</script>
