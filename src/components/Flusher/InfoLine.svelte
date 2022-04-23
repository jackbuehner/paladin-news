<script lang="ts">
  import type { Flusher } from '.';
  import { romanize } from 'romans';
  import { DateTime } from 'luxon';

  export let flusher: Flusher;
</script>

<div>
  <span
    ><a
      href={`https://thepaladin.news/flusher/${DateTime.fromISO(
        flusher.timestamps.week
      ).toISODate()}`}
      >Week of {DateTime.fromISO(flusher.timestamps.week).toFormat(`MMMM d, yyyy`)}</a
    ></span
  >
  <span><a href="https://thepaladin.news/flusher">THEPALADIN.NEWS/FLUSHER</a></span>
  <span>Volume {romanize(flusher.volume)}, Issue {flusher.issue}</span>
</div>

<style>
  div {
    /* top and bottom border */
    box-shadow: 0 0.02in black, 0 -0.02in black;
    height: calc(100% - 0.04in);

    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    box-sizing: border-box;
    cursor: default;
    grid-area: infoline;
  }

  span {
    font-family: 'Georgia';
    font-size: 10pt;
    font-weight: normal;
    font-style: normal;
    font-variant-numeric: lining-nums;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    box-sizing: border-box;
    white-space: pre;
    cursor: default;
  }

  span:first-of-type {
    justify-content: flex-start;
  }

  span:last-of-type {
    justify-content: flex-end;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
  }

  a:hover {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
</style>
