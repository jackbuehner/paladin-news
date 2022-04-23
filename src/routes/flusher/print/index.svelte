<script lang="ts">
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
</script>

{#if flusher}
  <FlusherDoc {flusher} />
{/if}
