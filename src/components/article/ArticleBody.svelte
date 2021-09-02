<!-- svelte-ignore css-unused-selector -->
<style>
  div.article-body {
    margin: 30px auto 0;
    font-family: var(--font-body);
    color: var(--color-neutral-dark);
    font-size: 17px;
    line-height: 1.7;
    font-weight: 400;
  }
  :global(.article-body p) {
    margin-top: 0;
    margin-bottom: 10px;
  }
  :global(.article-body a) {
    color: rgb(var(--primary-lighter));
    box-shadow: 0 1px 0 0 rgb(var(--primary));
    transition: background-color 0.2s, box-shadow 0.1s, color 0.2s;
    text-decoration: none;
  }
  :global(.article-body a:hover) {
    box-shadow: 0 2px 0 0 rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    color: var(--color-neutral-dark);
  }
  :global(.article-body a:active) {
    background-color: rgba(var(--primary), 0.16);
  }
</style>

<script>
  export let doc;
</script>

<div class={'article-body'} id={'pico'}>
  {@html doc}
</div>
