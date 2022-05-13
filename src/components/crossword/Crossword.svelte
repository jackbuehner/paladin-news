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
    direction: 'across' | 'down';
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
  <Crossword data={puzzle} showConfetti={false} revealDuration={240} showCompleteMessage={false}>
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
</style>
