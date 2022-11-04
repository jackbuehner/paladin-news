<script lang="ts">
  import { browser } from '$app/environment';
  import { sudoku } from '$lib/stores/sudoku';
  import { onMount } from 'svelte';
  import { Space } from '.';

  export let puzzle: number[][];
  export let difficulty: 'normal' | 'challenge' = 'normal';
  export let date: string;

  let values: number[][] | undefined;
  $: values = $sudoku?.[date]?.[difficulty];
  $: addInitialValuesToStore(values, date);

  function addInitialValuesToStore(values: number[][] | undefined, date: string) {
    if (browser && $sudoku && !values) {
      $sudoku = {
        ...($sudoku || {}),
        [date]: { ...($sudoku?.[date] || {}), [difficulty]: puzzle },
      };
    }
  }

  function handleChange(target: EventTarget | null, rowIndex: number, spaceIndex: number) {
    if (target && values) {
      let newValue = (target as HTMLInputElement).valueAsNumber || -1;
      if (newValue < -1 || newValue === 0 || newValue > 9) newValue === -1;

      const newPuzzleValues = values.map((row, i) => {
        return row.map((spaceValue, j) => {
          if (i === rowIndex && j === spaceIndex) return newValue;
          return spaceValue;
        });
      });

      $sudoku = {
        ...($sudoku || {}),
        [date]: { ...($sudoku?.[date] || {}), [difficulty]: newPuzzleValues },
      };
    }
  }

  let loading = true;
  onMount(() => {
    loading = false;
  });
</script>

<div class={'board'} class:loading>
  {#each puzzle as rowSpaces, rowIndex}
    <div>
      {#each rowSpaces as value, spaceIndex}
        <Space
          disabled={loading}
          forcedValue={value === -1 ? undefined : value}
          top={rowIndex === 0}
          right={spaceIndex === 2 || spaceIndex === 5 || spaceIndex === 8}
          bottom={rowIndex === 2 || rowIndex === 5 || rowIndex === 8}
          left={spaceIndex === 0}
          value={values?.[rowIndex][spaceIndex] === -1 || values?.[rowIndex][spaceIndex] === 0
            ? undefined
            : values?.[rowIndex][spaceIndex]}
          on:change={(e) => handleChange(e.target, rowIndex, spaceIndex)}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .board {
    background-color: black;
    opacity: 1;
    transition: opacity 240ms;
  }

  .board.loading {
    opacity: 0.5;
  }

  @media print {
    .board.loading {
      opacity: 1;
    }
  }
</style>
