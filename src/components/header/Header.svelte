<script lang="ts">
  import Container from '../Container.svelte';
  import CompactHeader from './CompactHeader.svelte';
  import HomeHeader from './HomeHeader.svelte';

  export let type: 'compact' | 'full' = 'compact';
</script>

{#if type === 'full'}
  <Container>
    <HomeHeader />
  </Container>
{:else}
  <CompactHeader />
{/if}
