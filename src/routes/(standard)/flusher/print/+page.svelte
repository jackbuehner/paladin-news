<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { FlusherDoc, type Flusher } from '$lib/components/Flusher';
  import { romanize } from 'romans';
  import type { PageData } from './$types';

  export let data: PageData;
  $: isTheRoyalFlush = new Date(data.timestamps.week) < new Date('2022-04-20');

  /**
   * Opens the document in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c' && data?._id) {
      window.open(`https://cristata.app/paladin-news/cms/collection/flushes/${data._id}`, '_blank');
    }
  };
</script>

<svelte:head>
  {#if data}
    {#if isTheRoyalFlush}
      <title>The Royal Flush – Vol. ${romanize(data.volume)}, Iss. ${data.issue}</title>
    {:else}
      <title>The Flusher – Vol. ${romanize(data.volume)}, Iss. ${data.issue}</title>
    {/if}
  {:else}
    <title>The Flusher</title>
  {/if}
</svelte:head>

<svelte:window on:keydown={openInCMS} />

{#if data}
  <div class="actions">
    <Button on:click={() => window.print()}>Print</Button>
  </div>
  <FlusherDoc flusher={data} />
{/if}

<style>
  div.actions {
    background-color: #fafafa;
    padding: 20px 0 0 0;
    width: 8.5in;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
  }

  @media print {
    div.actions {
      display: none;
    }
  }
</style>
