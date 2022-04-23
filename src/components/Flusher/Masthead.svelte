<script lang="ts">
  export let week: string;
  const isTheRoyalFlush = new Date(week) < new Date('2022-04-20');
</script>

{#if isTheRoyalFlush}
  <h1>The Royal Flush</h1>
{:else}
  <h1>The Flusher</h1>
{/if}

<style>
  h1 {
    font-family: 'Adamant BG';
    font-size: 36pt;
    font-weight: bold;
    color: black;
    text-transform: uppercase;
    font-style: italic;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    box-sizing: border-box;
    cursor: default;
    margin-top: -0.02in;
    grid-area: masthead;
  }
</style>
