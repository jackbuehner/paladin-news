<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import Container from '$lib/components/Container.svelte';
  import { createCrossword, Crossword } from '$lib/components/crossword';
  import type { GET_CROSSWORD__DOC_TYPE } from '$lib/queries';
  import { headerLabel } from '$lib/stores/header';
  import { title } from '$lib/stores/title';
  import { formatISODate, listOxford } from '$lib/utils';
  import { onDestroy } from 'svelte';

  // set document and header title
  title.set(`Crossword - Games`);
  headerLabel.set('Games');
  $: {
    if (crossword) title.set(`${crossword.name} - Crossword - Games`);
  }

  // unset the header label on destroy
  onDestroy(() => ($headerLabel = ''));

  // get the crossword puzzle
  export let data: string | undefined;
  $: crossword = data ? (JSON.parse(data) as GET_CROSSWORD__DOC_TYPE) : undefined;
  $: puzzle = crossword?.words
    ? createCrossword({ words: crossword.words, tries: 75, print: false, gridSize: 9 }).map(
        ({ clue, direction, word, x, y }) => ({ clue, direction, answer: word, x, y })
      )
    : undefined;

  // whether the puzzle has been updated
  let updated = false;
  $: {
    if (crossword)
      updated =
        new Date(crossword.timestamps.updated_at) > new Date(crossword.timestamps.published_at);
  }

  // keep track of the previous page
  let previousPage: string | undefined;
  afterNavigate((navigaton) => {
    previousPage = navigaton.from?.pathname;
  });
</script>

<Container width={800}>
  {#if crossword && puzzle}
    <article>
      <h1>{crossword.name}</h1>
      <p class={'subtitle'}>
        {formatISODate(crossword.timestamps.published_at, true)}
        {#if updated}
          <br /><span>Updated</span>
        {/if}
      </p>
      <p class={'instructions'}>
        Fill each empty space such that no number is repeated in any square or row.
        <br />
        <span>By {listOxford(crossword.people.authors.map(({ name }) => name))}</span>
      </p>

      <Crossword {puzzle} />

      <p class={'navigation'}>
        {#if previousPage && previousPage.includes(`/games/crossword/all/`)}
          <a href={previousPage}>
            <span style={`font-weight: 700;`}>⇐</span> Return to all crosswords
          </a>
        {:else}
          <a href={`/games/crossword/all`}>
            <span style={`font-weight: 700;`}>⇐</span> View all crosswords
          </a>
        {/if}
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

  p.instructions > span {
    display: block;
    margin-top: 6px;
  }

  p.subtitle {
    font-weight: 500;
    margin: 0 0 32px 0;
    text-align: center;
  }

  p.subtitle > span {
    display: inline-block;
    font-size: 13px;
    color: var(--color-neutral-light);
    padding: 1px 3px;
    margin: 3px 0 0 0;
    border-radius: var(--radius);
    border: 1px solid var(--border-dark);
  }

  p.navigation {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
