<script lang="ts">
  export let href: string | undefined = undefined;
  export let style: string | undefined = undefined;
</script>

<a {href} {style}><slot /> <span style="font-weight: 700;" class="s-5uUbiC5VdewB">⇒</span></a>

<style>
  a {
    color: var(--color-neutral-dark);
    box-shadow: 0 0.5px 0 0 var(--color-neutral-lightest);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
    display: inline-block;
    font-family: var(--font-detail);
    font-size: 16px;
  }
  a:hover {
    color: rgb(var(--primary));
    background-color: rgba(var(--primary), 0.1);
    box-shadow: 0 2px 0 0 rgb(var(--primary));
  }
  a:active {
    background-color: rgba(var(--primary), 0.16);
  }
</style>
