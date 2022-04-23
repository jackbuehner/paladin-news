<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';
  export async function load({ params }: LoadInput<{ week: string }>): Promise<LoadOutput> {
    return {
      status: 307, // temporary redirect
      redirect: `/flusher/print?week=${params.week}`,
    };
  }
</script>
