<script context="module" lang="ts">
  import type { LoadInput, LoadOutput } from '@sveltejs/kit';

  export function load({ error, status }: LoadInput): LoadOutput {
    return {
      props: {
        status,
        error,
      },
    };
  }
</script>

<script lang="ts">
  import Container from '$lib/components/Container.svelte';

  export let status: number;
  export let error: Error | null;
</script>

<Container>
  <div>
    {#if status === 404}
      <img src="/images/blobs/blobwaitwhat.png" alt="blobwaitwhat" />
      <h1>That puzzle does not exist</h1>
      <p>
        <a href={'/games/sudoku/latest'}>Try playing the latest puzzle instead.</a>
      </p>
    {:else if status === 418}
      <img src="/images/blobs/blobwizard.png" alt="blobaww" />
      <h1>We're still working on this one</h1>
      <p>
        You cannot view puzzles from the future. In the meantime,
        <a href={'/games/sudoku/latest'}>try playing our latest puzzle.</a>
      </p>
    {:else}
      <img src="/images/blobs/blobscream.png" alt="blobaww" />
      <h1>Something went wrong ({status})</h1>
      <p>
        We encountered an unexpected error.
        <a href={'/games/sudoku/latest'}>Return to the latest puzzle.</a>
      </p>
      <code>{error?.stack}</code>
    {/if}
  </div>
</Container>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    width: 120px;
    height: auto;
    margin: 60px 0 40px 0;
  }

  h1 {
    font-family: var(--font-detail);
    font-weight: 500;
    font-size: 20px;
    text-align: center;
  }

  p {
    margin: 0;
    font-family: var(--font-detail);
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    margin-bottom: 60px;
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

  code {
    white-space: break-spaces;
    word-break: break-all;
  }
</style>
