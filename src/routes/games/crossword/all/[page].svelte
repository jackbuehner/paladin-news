<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import type { GET_CROSSWORDS__DOC_TYPE, Paged } from '$lib/queries';
  import { headerLabel } from '$lib/stores/header';
  import { title } from '$lib/stores/title';
  import { formatISODate, listOxford } from '$lib/utils';
  import { onDestroy } from 'svelte';

  // set document and header title
  title.set('All crossword puzzles');
  headerLabel.set('Games');

  // unset the header label on destroy
  onDestroy(() => ($headerLabel = ''));

  // get crossword puzzles
  export let data: string | undefined;
  $: crosswords = data ? (JSON.parse(data) as Paged<GET_CROSSWORDS__DOC_TYPE>) : undefined;
</script>

<PageHeading>All crossword puzzles</PageHeading>

{#if crosswords}
  <Container>
    <headblock>
      <subtitle>
        {#if crosswords.hasNextPage || crosswords.hasPrevPage}
          Page {crosswords.page} of {crosswords.totalPages}
        {/if}
      </subtitle>
    </headblock>
  </Container>
{/if}

<Container>
  {#if crosswords && crosswords.docs}
    {#each crosswords.docs as crossword, index}
      <a href={`/games/crossword/${crossword._id}`}>
        <article>
          <h2 class:margin={crossword.people.authors.length > 0}>
            {crossword.name} – {formatISODate(crossword.timestamps.published_at, true)}
          </h2>
          {#if crossword.people.authors.length > 0}
            <div>
              By {listOxford(crossword.people.authors.map(({ name }) => name))}
            </div>
          {/if}
        </article>
      </a>
      <span />
    {/each}
  {/if}

  {#if crosswords}
    <div class={'navrow'}>
      {#if crosswords.hasNextPage || crosswords.hasPrevPage}
        Page {crosswords.page} of {crosswords.totalPages}
      {/if}
      <div class={'buttonrow'}>
        {#if crosswords.hasPrevPage}
          <Button href={`./${crosswords.prevPage}`}>Previous</Button>
        {/if}
        {#if crosswords.hasNextPage}
          <Button href={`./${crosswords.nextPage}`}>Next</Button>
        {/if}
      </div>
    </div>
  {/if}
</Container>

<style>
  h2 {
    font-family: var(--font-detail);
    font-size: 18px;
    font-weight: 700;
    margin: 0;
  }
  h2.margin {
    margin-bottom: 10px;
  }

  a:first-of-type {
    margin-top: -32px;
  }

  a {
    padding: 16px 0;
  }

  div {
    font-family: var(--font-detail);
    font-size: 14px;
    line-height: 20px;
    margin-top: 4px;
    color: var(--color-neutral-light);
  }

  span {
    border-bottom: 1px solid var(--border-dark);
    display: block;
  }

  subtitle {
    font-family: var(--font-detail);
    font-size: 18px;
    position: absolute;
    right: 0;
    bottom: 46px;
  }
  @media (max-width: 540px) {
    subtitle {
      bottom: 30px;
    }
  }

  headblock {
    position: relative;
    display: block;
  }

  /* page navigation*/
  .navrow {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    font-family: var(--font-detail);
    font-size: 14px;
    font-weight: 400;
    padding: 16px 20px 32px 20px;
    grid-area: auto / 1 / auto / 3;
  }
  .buttonrow {
    display: flex;
    flex-direction: row;
    gap: 6px;
  }

  a {
    color: var(--color-neutral-dark);
    display: block;
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
  }
  a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
