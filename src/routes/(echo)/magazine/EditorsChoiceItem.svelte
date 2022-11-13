<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte';
  import { capitalize, listOxford } from '$lib/utils';
  import Name from './Name.svelte';

  export let type: string;
  export let name: string;
  export let authored_by: { name: string }[];
  export let href: string;
</script>

<article>
  <div class="cat-row">
    <div class="category">{capitalize(type?.replaceAll('-', ' ') || '', true)}</div>
    <span style="height: 20px; margin-top: -10px;">
      <IconButton ariaLabel="open" size="30px" padding="6px" {href}>
        <path
          fill="currentColor"
          d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
          style="--darkreader-inline-fill:currentColor;"
        />
      </IconButton>
    </span>
  </div>
  <div class="indent">
    <Name {href}>{name}</Name>
    <div class="by">{listOxford(authored_by.map(({ name }) => name))}</div>
  </div>
</article>

<style>
  article {
    margin: 0 0 10px 0;
  }

  .indent {
    margin: 0 0 0 20px;
  }

  .cat-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .category {
    font-family: var(--echo-font-body);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-neutral-dark);
  }

  .by {
    font-family: var(--echo-font-body);
    font-size: 16px;
    font-weight: 400;
    color: var(--color-neutral-dark);
    font-style: italic;
  }
</style>
