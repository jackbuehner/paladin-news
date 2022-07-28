<script lang="ts">
  export let name: string;
  export let description: string;
  export let date: string;
  export let episode: number;
</script>

<div>
  <h2>{name}</h2>
  <div class={'description'}>
    <p>{description}</p>
  </div>
  <div class={'meta'}>
    <div>{date}</div>
    <div>|</div>
    <div>E{episode}</div>
  </div>
</div>

<style>
  h2 {
    margin: 0;
    font-family: var(--font-detail);
    color: var(--color-neutral-dark);
    font-size: 18px;
    line-height: 24px;
  }

  div.description {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 3px;
    font-family: var(--font-detail);
    font-size: 14px;
    line-height: 20px;
  }

  div.description p {
    margin: 4px 0 4px 0;
    color: var(--color-neutral-dark);
  }

  div.meta {
    display: flex;
    flex-direction: row;
    column-gap: 3px;
    font-family: var(--font-detail);
    font-size: 14px;
    line-height: 20px;
    color: var(--color-neutral-light);
  }
</style>
