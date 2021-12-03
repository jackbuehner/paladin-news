<style>
  div {
    margin-top: 60px;
    display: flex;
    gap: 2px 10px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  span {
    display: inline-block;
    background-color: transparent;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 0.9em;
    font-weight: 900;
    text-align: justify;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  span:not(:last-of-type) {
    padding-right: 5px;
    border-right: 1px solid var(--border-dark);
  }
</style>

<script lang="ts">
  export let categories: string[];

  // remove 'uncategorized' from categories unless length === 1
  if (categories && categories.length > 1) {
    categories = categories.filter((cat) => cat !== 'uncategorized');
  }
</script>

<div>
  {#each categories as category}
    <span>{category}</span>
  {/each}
</div>
