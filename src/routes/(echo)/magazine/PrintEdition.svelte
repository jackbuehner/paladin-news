<script lang="ts">
  import ViewMoreLink from './ViewMoreLink.svelte';
</script>

<div>
  <a href="/magazine/print-issues/latest">
    <img
      src="https://ik.imagekit.io/paladin/tr:w-220/f0b4109b-77ef-45e2-b3f2-c6b7fed9bc12"
      alt=""
    />
  </a>
  <a class="label" href="/magazine/print-issues/latest" style="height: 26px;">
    <h3>Volume 2022</h3>
  </a>
</div>

<ViewMoreLink href="/magazine/print-issues" style="margin-bottom: 10px;">
  View all volumes
</ViewMoreLink>

<style>
  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }

  img {
    width: calc(100% - 2px);
    aspect-ratio: 2 / 3; /* print edition is 6x9 inches */
    object-fit: cover;
    margin: 4px 1px 10px 1px;
    box-shadow: 0 0 0 1px var(--border-dark);
  }

  h3,
  a.label {
    display: none;
  }

  @media (max-width: 520px) {
    h3 {
      display: inline-block;
      font-family: var(--echo-font-heading);
      font-size: 22px;
      margin: 0 0 15px 0;
    }

    a.label {
      display: inline-block;
    }

    img {
      width: 100px;
    }

    a {
      color: var(--color-neutral-dark);
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
  }
</style>
