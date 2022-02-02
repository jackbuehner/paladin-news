<script lang="ts">
  import CompactHeader from './CompactHeader.svelte';
  import HomeHeader from './HomeHeader.svelte';

  export let type: 'compact' | 'full' = 'compact';
</script>

{#if type === 'full'}
  <HomeHeader />
{:else}
  <CompactHeader />
{/if}
