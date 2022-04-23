<script lang="ts">
  import { SectionHeading, Event, type FlusherEvent } from '.';

  export let events: FlusherEvent[];
</script>

<section>
  <SectionHeading>Upcoming events</SectionHeading>
  {#each events as event}
    <Event {event} />
  {/each}
</section>

<style>
  section {
    grid-area: events;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow: hidden;
  }
</style>
