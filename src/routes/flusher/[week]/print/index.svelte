<script context="module" lang="ts">
  import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
  export async function load({ params }: LoadEvent<{ week: string }>): Promise<LoadOutput> {
    return {
      status: 307, // temporary redirect
      redirect: `/flusher/print?week=${params.week}`,
    };
  }
</script>
