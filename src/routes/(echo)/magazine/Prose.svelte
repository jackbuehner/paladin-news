<script lang="ts">
  import type { GET_ECHO_DOCS__DOC_TYPE } from '$lib/queries';
  import { insertDate, listOxford } from '$lib/utils';
  import Name from './Name.svelte';

  export let prose: GET_ECHO_DOCS__DOC_TYPE[];
</script>

{#each insertDate(prose).slice(0, 4) as { name, authored_by, date, slug }}
  <article>
    <Name href="/magazine/prose/{date.year}/{date.month}/{date.day}/{slug}">{name}</Name>
    <div class="by">{listOxford(authored_by.map(({ name }) => name))}</div>
  </article>
{/each}

<style>
  article {
    margin: 0 0 10px 0;
    border-top: 1px solid var(--border-dark);
    padding: 10px 0 0 0;
  }

  .by {
    font-family: var(--echo-font-body);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-neutral-dark);
    font-style: italic;
    margin: 0 0 0 10px;
  }
</style>
