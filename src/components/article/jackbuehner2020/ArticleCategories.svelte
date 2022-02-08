<script lang="ts">
  export let categories: string[];
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
    margin-bottom: 4px;
    flex-wrap: wrap;
  }
  a {
    display: inline-block;
    background-color: transparent;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
    font-size: 12px;
    text-align: justify;
    letter-spacing: 5px;
    text-transform: uppercase;
  }
  a:not(:last-of-type) {
    padding-right: 5px;
    border-right: 1px solid var(--border-dark);
  }
  a:hover {
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
