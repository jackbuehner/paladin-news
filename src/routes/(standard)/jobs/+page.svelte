<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Container from '$lib/components/Container.svelte';
  import PageHeading from '$lib/components/PageHeading.svelte';
  import { marked } from 'marked';
  import SvelteMarkdown from 'svelte-markdown';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<svelte:head>
  <title>Jobs – The Paladin</title>
</svelte:head>

<PageHeading type="blockCentered">Jobs</PageHeading>

<Container>
  {#each data.jobs as job}
    {@const descriptionTokens = marked.lexer(job.description)}
    {@const titleTokens = marked.lexer(job.title)}
    <div class="job">
      <h2 class="job-header-md">
        <SvelteMarkdown source={marked.parser(titleTokens)} />
      </h2>
      <div class="note">{@html job.note}</div>
      <div class="job-description">
        <SvelteMarkdown source={marked.parser(descriptionTokens)} />
      </div>
      {#if job.form}
        <div class="applyrow">
          <Button href={job.form}>Apply</Button>
          <span>{job.form_time}</span>
        </div>
      {/if}
    </div>
  {/each}
</Container>

<style>
  h2 {
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 20px;
    margin: 20px 0 0 0;
    line-height: 32px;
  }

  :global(h2.job-header-md *) {
    margin: 0;
  }
  div.job-description {
    font-size: 16px;
    font-family: var(--font-detail);
    line-height: 1.3;
    font-weight: 400;
    color: var(--color-neutral-dark);
    margin: 8px 0 10px 0;
  }

  :global(div.job-description p) {
    margin: 0 0 10px 0;
  }

  :global(div.job-description ul) {
    margin: 0 0 10px 0;
  }

  :global(div.job-description p + ul) {
    margin-top: -10px;
  }

  div.note {
    font-size: 14px;
    font-family: var(--font-detail);
    line-height: 1.3;
    font-weight: 400;
    color: var(--color-neutral-dark);
    margin: 0px 0 8px 0;
  }
  div.applyrow {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;
    font-size: 13px;
    font-family: var(--font-detail);
    color: var(--color-neutral-light);
  }

  div.job {
    margin-bottom: 32px;
  }
</style>
