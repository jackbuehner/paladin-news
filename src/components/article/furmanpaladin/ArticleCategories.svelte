<script lang="ts">
  export let categories: string[];

  // remove 'uncategorized' from categories unless length === 1
  if (categories && categories.length > 1) {
    categories = categories.filter((cat) => cat !== 'uncategorized');
  }
</script>

<div>
  {#each categories as category}
    <a href={`/section/${category}`}>{category}</a>
  {/each}
</div>

<style>
  div {
    margin-top: 60px;
    display: flex;
    gap: 2px 10px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  a {
    display: inline-block;
    background-color: transparent;
    font-family: var(--font-detail);
    color: rgb(var(--legacy-primary));
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
    font-size: 0.9em;
    font-weight: 900;
    text-align: justify;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  a:not(:last-of-type) {
    padding-right: 5px;
    border-right: 1px solid var(--border-dark);
  }
  a:hover {
    background-color: rgba(var(--legacy-primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--legacy-primary));
  }
  a:active {
    background-color: rgba(var(--legacy-primary), 0.16);
  }
</style>
