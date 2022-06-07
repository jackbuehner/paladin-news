<script lang="ts">
  import { page } from '$app/stores';
  import Container from '$lib/components/Container.svelte';
  import { SudokuBoard } from '$lib/components/sudoku';
  import type { GET_SUDOKU__DOC_TYPE } from '$lib/queries';
  import { title } from '$lib/stores/title';
  import { headerLabel } from '$lib/stores/header';
  import { formatISODate } from '$lib/utils';
  import { DateTime } from 'luxon';

  // set the document and header title
  title.set('Sudoku');
  headerLabel.set('Sudoku');

  // the sudoku puzzle object retrieved from the page endpoint
  export let data: string;
  $: sudoku = data ? (JSON.parse(data) as GET_SUDOKU__DOC_TYPE) : undefined;

  $: puzzle = sudoku
    ? sudoku[difficulty === 'challenge' ? 'challengePuzzle' : 'normalPuzzle'].map((row) =>
        row.split(',').map((num) => parseInt(num))
      )
    : undefined;

  $: date =
    sudoku?.day && DateTime.fromISO(sudoku.day).isValid
      ? DateTime.fromISO(sudoku.day, { zone: 'utc' }).toISODate()
      : '';
  $: previous =
    sudoku?.day &&
    DateTime.fromISO(sudoku.day).isValid &&
    new Date(sudoku.day) > new Date('2022-05-01')
      ? DateTime.fromISO(sudoku.day, { zone: 'utc' }).minus({ days: 1 }).toISODate()
      : '';
  $: next =
    sudoku?.day && DateTime.fromISO(sudoku.day).isValid
      ? DateTime.fromISO(sudoku.day, { zone: 'utc' }).plus({ days: 1 }).toISODate()
      : '';

  $: difficulty = $page.url.searchParams.get('difficulty');
</script>

<Container>
  {#if puzzle}
    <article>
      <h1>Play Sudoku</h1>
      <p class={'subtitle'}>{formatISODate(date, true)}</p>
      <p class={'instructions'}>
        Fill each empty space such that no number is repeated in any square or row. <br />
        {#if difficulty === 'challenge'}
          <span class={'mode-print-only'}>Challenge Edition</span>
          <a href={$page.url.pathname + '?difficulty=normal'}>Switch to normal mode</a>
        {:else}
          <span class={'mode-print-only'}>Normal Edition</span>
          <a href={$page.url.pathname + '?difficulty=challenge'}>Switch to challenge mode</a>
        {/if}
      </p>
      <SudokuBoard
        {puzzle}
        difficulty={difficulty === 'challenge' ? 'challenge' : 'normal'}
        {date}
      />
      <p class={'navigation'}>
        {#if previous}
          <a href={`/games/sudoku/${previous}${$page.url.search}`}>
            <span style={`font-weight: 700;`}>⇐</span> Previous puzzle
          </a>
        {:else}
          <span />
        {/if}
        <a href={`/games/sudoku/${next}${$page.url.search}`}>
          Next puzzle <span style={`font-weight: 700;`}>⇒</span>
        </a>
      </p>
    </article>
  {/if}
</Container>

<style>
  h1 {
    font-family: var(--font-detail);
    font-size: 32px;
    font-weight: 600;
    margin: 32px 0 10px 0;
  }

  p {
    font-family: var(--font-detail);
    font-size: 16px;
    font-weight: 400;
  }

  p.instructions {
    margin: 0 0 32px 0;
    text-align: center;
  }

  p.subtitle {
    font-weight: 500;
    margin: 0 0 32px 0;
  }

  p.navigation {
    width: 462px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 520px) {
    p.navigation {
      width: 372px;
    }
  }

  @media (max-width: 420px) {
    p.navigation {
      width: 300px;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a {
    color: var(--color-neutral-dark);
    box-shadow: 0 0.5px 0 0 var(--color-neutral-lightest);
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

  .mode-print-only {
    display: none;
    font-style: italic;
    margin-top: 3px;
    font-size: 15px;
  }

  @media print {
    a {
      display: none;
    }
    .mode-print-only {
      display: block;
    }
  }
</style>
