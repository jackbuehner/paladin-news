<style>
  div {
    margin-top: 60px;
    display: flex;
    gap: 2px 10px;
    margin-bottom: 4px;
    flex-wrap: wrap;
  }
  span {
    display: inline-block;
    background-color: transparent;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 12px;
    text-align: justify;
    letter-spacing: 5px;
    text-transform: uppercase;
  }
  span:not(:last-of-type) {
    padding-right: 5px;
    border-right: 1px solid var(--border-dark);
  }
</style>

<script lang="ts">
  export let categories: string[];
</script>

<div>
  {#each categories as category}
    <span>{category}</span>
  {/each}
</div>
