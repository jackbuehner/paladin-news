<script lang="ts">
  // @ts-expect-error svelte-crossword is available, but the typechecker cannot see it for some reason
  import Crossword from 'svelte-crossword';
  import Button from '../Button.svelte';

  type Puzzle = Array<{
    /**
     * clue text
     */
    clue: string;
    /**
     * answer text (auto-capitalizes)
     */
    answer: string;
    /**
     * "across" or "down"
     */
    direction: 'across' | 'down' | 'none';
    /**
     * starting x position (column) of clue
     */
    x: number;
    /**
     * starting y position (row) of clue
     */
    y: number;
    /**
     * optional custom class name to apply
     */
    custom?: string;
  }>;

  export let puzzle: Puzzle;
</script>

<div>
  <Crossword
    data={puzzle.filter(({ direction }) => direction !== 'none')}
    showConfetti={false}
    revealDuration={240}
    showCompleteMessage={false}
  >
    <div class="toolbar" slot="toolbar" let:onClear let:onReveal>
      <Button on:click={onClear}>Clear puzzle</Button>
      <Button on:click={onReveal}>Show answers</Button>
    </div>
  </Crossword>
</div>

<style>
  div {
    width: 100%;
  }

  .toolbar {
    display: flex;
    flex-direction: row;
    gap: 6px;
    align-items: center;
    justify-content: flex-end;
    margin: 0 0 10px 0;
  }

  :global(.svelte-crossword) {
    --xd-font: var(--font-detail); /* font-family for whole puzzle */
    --xd-primary-highlight-color: hsl(265deg 53% 84%); /* color for focused cell */
    --xd-secondary-highlight-color: hsl(265deg 53% 96%); /* color for other cells in current clue */
    --xd-main-color: #1a1a1a; /* color for text, gridlines, void cells */
    --xd-bg-color: #fff; /* color for puzzle background */
    --xd-accent-color: #efefef; /* color for buttons */
    --xd-order: row; /* row = clues on left, row-reverse = clues on right  */
  }

  :global(.svelte-crossword .clues--list > p) {
    border: none;
    padding: 0 0 0 calc(1.5em + 6px);
  }

  :global(.svelte-crossword .clues--list .list) {
    max-height: unset;
  }

  :global(.svelte-crossword .clues--list button) {
    display: inline-flex;
    min-height: 30px;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: var(--radius);
    color: var(--button-color);
    cursor: default;
    background: transparent;
    border: 1px solid transparent !important;
    transition: 200ms;
    color: var(--button-color);
    min-width: 80px;
    padding: 4px 10px;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    text-decoration: none;
    width: calc(100% - 8px);
    margin-left: 4px;
    margin-bottom: 2px;
    max-width: 360px;
    overflow: hidden;
    white-space: normal;
  }
  :global(.svelte-crossword .clues--list ul) {
    margin-bottom: 4px;
  }
  :global(.svelte-crossword
      button.is-number-focused.is-direction-focused:not(.is-disable-highlight):not(:hover):not(:active)) {
    background-color: rgba(114, 46, 151, 0.1);
  }
  :global(.svelte-crossword .clues--list button:hover) {
    background: var(--button-light-bg-hover);
    border: 1px solid var(--button-light-bg-hover) !important;
    box-shadow: var(--button-shadow-hover);
  }
  :global(.svelte-crossword .clues--list button:active) {
    background: var(--button-light-bg-active);
    border: 1px solid var(--button-light-bg-active) !important;
    box-shadow: var(--button-shadow-active);
  }

  @media print {
    .toolbar {
      display: none;
    }

    :global(.svelte-crossword .clues--list button) {
      max-width: 100%;
    }

    :global(.svelte-crossword) {
      --xd-primary-highlight-color: white;
      --xd-secondary-highlight-color: white;
    }

    :global(.svelte-crossword .clues--list button) {
      background: none !important;
      border: 1px solid transparent !important;
    }

    :global(.svelte-crossword .is-loaded .clues--list) {
      display: block !important;
      margin-top: 36px;
    }
    :global(.svelte-crossword .is-loaded .clues--stacked) {
      display: none !important;
    }

    :global(.svelte-crossword .play.is-loaded) {
      flex-direction: column-reverse !important;
    }
    :global(.svelte-crossword .play.is-loaded.stacked) {
      flex-direction: column !important;
    }

    :global(.svelte-crossword .play > section) {
      position: initial;
    }
  }
</style>
