<script lang="ts">
  import { DateTime } from 'luxon';
  import sanitizeHtml from 'sanitize-html';
  import type { FlusherEvent } from '.';

  export let event: FlusherEvent;
  const timestamp = DateTime.fromISO(event.date).toFormat(`cccc 'at' h:mm a`);
</script>

<section>
  <div class="timeline" />
  <div class="dot" />
  <h3>
    {@html sanitizeHtml(
      event.name.replace(/\[/g, '<span class="flusher-event-tag">').replace(/\]/g, '</span>'),
      { allowedClasses: { span: ['flusher-event-tag'] } }
    )}
  </h3>
  <span>{timestamp} – {event.location}</span>
</section>

<style>
  section {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-family: Lato;
    font-size: 12pt;
    font-weight: 500;
    color: black;
    height: 100%;
    margin: 0px 0px 0px 0.3in;
    padding: 0.071in 0px 0.01in;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    box-sizing: border-box;
    flex-wrap: wrap;
    column-gap: 6px;
  }

  span {
    font-family: Lato;
    font-size: 11pt;
    font-weight: normal;
    font-style: italic;
    color: rgba(0, 0, 0, 0.65);
    width: calc(100% - 0.3in);
    height: 0.16in;
    margin: 0px 0px 0px 0.3in;
    padding: 0px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
  }

  .timeline {
    display: block;
    height: calc(100% + 3pt);
    width: 3pt;
    border-left: 3pt solid black;
    position: absolute;
    left: calc(5.94667px);
    top: calc(-2px);
    border-radius: 1.5pt;
  }

  section:first-of-type > .timeline {
    height: calc(100% - 0.05in + 3pt);
    top: calc(2.8px);
  }

  .dot {
    display: block;
    height: calc(13.8933px);
    width: calc(13.8933px);
    border-radius: 50%;
    position: absolute;
    left: calc(1.09333px);
    top: calc(10.7733px);
    box-shadow: inset 0 0 0 2pt black, inset 0 0 0 7pt white;
  }

  :global(span.flusher-event-tag) {
    background: transparent;
    height: 14pt;
    align-items: center;
    justify-content: center;
    padding: 0 4pt;
    margin: 0;
    font-family: Lato;
    font-size: 8pt;
    font-weight: 500;
    font-style: regular;
    white-space: nowrap;
    display: inline-flex;
    border-radius: 2px;
    color: rgba(0, 0, 0, 0.65);
    border: none !important;
    box-shadow: rgba(0, 0, 0, 0.25) 0 0 0 0.8pt inset !important;
    transform: translate(0, 0, 0);
  }
</style>
