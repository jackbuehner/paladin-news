<style>
  textarea {
    display: block;
    width: 100%;
    min-height: 38px;
    padding: 8px 12px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.42857143;
    color: var(--color-neutral-dark);
    border: 0 solid #aaa;
    border-radius: 2px;
    background-color: transparent;
    box-shadow: inset 0 0 0 1px #aaa;
    transition: box-shadow 0.2s;
    font-family: Lato, sans-serif;
  }
  textarea:hover {
    box-shadow: inset 0 0 0 1px var(--color-neutral-dark);
  }
  textarea:focus {
    background-color: #fff;
    box-shadow: inset 0 0 0 2px rgb(var(--primary));
  }
</style>

<script lang="ts">
  export let name: string;
  export let rows: number;
  export let rules: string;
</script>

<textarea {name} {rows} data-kw-rules={rules} />
