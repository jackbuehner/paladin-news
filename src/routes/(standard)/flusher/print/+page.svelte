<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { FlusherDoc, type Flusher } from '$lib/components/Flusher';
  import { title } from '$lib/stores/title';
  import type { PageData } from './$types';
  import { romanize } from 'romans';

  export let data: PageData;

  $: {
    if (data) {
      const isTheRoyalFlush = new Date(data.timestamps.week) < new Date('2022-04-20');
      if (isTheRoyalFlush)
        title.set(`The Royal Flush – Vol. ${romanize(data.volume)}, Iss. ${data.issue}`);
      else title.set(`The Flusher – Vol. ${romanize(data.volume)}, Iss. ${data.issue}`);
    } else {
      title.set(`The Flusher`);
    }
  }

  /**
   * Opens the document in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c' && data?._id) {
      window.open(`https://thepaladin.cristata.app/cms/collection/flushes/${data._id}`, '_blank');
    }
  };
</script>

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
