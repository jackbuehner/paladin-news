<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  import { FlusherDoc, type Flusher } from '$lib/components/Flusher';
  import { title } from '$lib/stores/title';
  import { romanize } from 'romans';

  export let data: string | undefined;
  $: flusher = data ? (JSON.parse(data) as Flusher) : undefined;

  $: {
    if (flusher) {
      const isTheRoyalFlush = new Date(flusher.timestamps.week) < new Date('2022-04-20');
      if (isTheRoyalFlush)
        title.set(`The Royal Flush – Vol. ${romanize(flusher.volume)}, Iss. ${flusher.issue}`);
      else title.set(`The Flusher – Vol. ${romanize(flusher.volume)}, Iss. ${flusher.issue}`);
    } else {
      title.set(`The Flusher`);
    }
  }

  /**
   * Opens the document in Cristata when ALT + C is pressed.
   */
  const openInCMS = (event: KeyboardEvent) => {
    if (event.altKey && event.key === 'c' && flusher?._id) {
      window.open(
        `https://thepaladin.cristata.app/cms/collection/flushes/${flusher._id}`,
        '_blank'
      );
    }
  };
</script>

<svelte:window on:keydown={openInCMS} />

{#if flusher}
  <div class="actions">
    <Button on:click={() => window.print()}>Print</Button>
  </div>
  <FlusherDoc {flusher} />
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
