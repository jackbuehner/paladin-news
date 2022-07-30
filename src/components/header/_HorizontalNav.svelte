<script lang="ts">
  const items = [
    { href: '/section/news', label: 'News' },
    { href: '/section/opinions', label: 'Opinions' },
    { href: '/section/sports', label: 'Sports' },
    { href: '/section/arts-culture', label: 'Arts, Campus, & Culture' },
    { href: '/section/video', label: 'Videos' },
    { href: '/games', label: 'Games' },
    { href: '/podcasts', label: 'Podcasts' },
    { href: '/satire', label: 'The Horse' },
    {
      href: 'https://cdm16821.contentdm.oclc.org/digital/collection/p16821coll21',
      label: 'Archive',
    },
  ];
</script>

<nav>
  {#each items as item}
    <a href={item.href}>{item.label}</a>
  {/each}
</nav>
<span />

<style>
  nav {
    height: 36px;
    width: 100%;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid var(--color-neutral-light);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
    flex-wrap: wrap;
  }
  span {
    border-bottom: 1px solid var(--color-neutral-light);
    display: flex;
    margin-top: 1px;
  }
  a {
    font-family: var(--font-detail);
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--color-neutral-dark);
    text-decoration: none;
    padding: 2.5px 10px 4px 10px;
    background-color: var(--button-bg);
    border: 1px solid transparent;
    transition: 200ms;
    border-radius: var(--radius);
    white-space: nowrap;
    cursor: default;
  }
  a:hover {
    background-color: var(--button-bg-hover);
    border: 1px solid var(--button-bg-hover);
    box-shadow: var(--button-shadow-hover);
  }
  a:active {
    background-color: var(--button-bg-active);
    border: 1px solid var(--button-bg-active);
    box-shadow: var(--button-shadow-active);
  }
</style>
