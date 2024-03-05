<script lang="ts">
  import Container from '$lib/components/Container.svelte';
  import { formatISODate, notEmpty } from '$lib/utils';
  import { romanize } from 'romans';

  export let data;
</script>

<Container>
  <ul>
    {#each data.flushers.filter(notEmpty) as flusher}
      {@const isTheRoyalFlush = new Date(flusher?.timestamps.week) < new Date('2022-04-20')}
      <li>
        <a href={flusher.timestamps.week.split('T')[0]}>
          <b>
            {#if isTheRoyalFlush}
              The Royal Flush
            {:else}
              The Flusher
            {/if}
            – Vol. {romanize(flusher.volume)}, Iss. {flusher.issue}
          </b>
          ({formatISODate(flusher.timestamps.week)})
        </a>
      </li>
    {/each}
  </ul>
</Container>

<style>
  ul {
    font-family: var(--font-detail);
    padding: 0 0 0 26px;
    font-size: 17px;
    line-height: 1.5;
  }

  a {
    color: var(--color-neutral-dark);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
