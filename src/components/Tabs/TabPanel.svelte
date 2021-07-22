<script>
  import { getContext } from 'svelte';
  import { TABS } from './store';

  const panel = {};
  const { registerPanel, selectedPanel } = getContext(TABS);

  registerPanel(panel);
</script>

{#if $selectedPanel === panel}
  <slot />
{/if}
