<script lang="ts">
  export let href: string;
</script>

<a {href}>
  <h2>
    <slot />
  </h2>
</a>

<style>
  h2 {
    font-family: var(--echo-font-body);
    font-size: 19px;
    font-weight: 700;
    margin: 0;
    color: var(--color-neutral-dark);
    line-height: 1.1;
  }

  a {
    color: var(--color-neutral-dark);
    text-decoration: none;
    transition: background-color 0.2s, box-shadow 0.1s;
    display: inline-block;
    font-family: var(--font-detail);
    font-size: 16px;
    min-width: 60px;
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
