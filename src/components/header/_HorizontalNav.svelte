<style>
  nav {
    height: 52px;
    width: 100%;
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
    flex-wrap: wrap;
  }
  a {
    font-family: var(--font-detail);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 1px;
    color: #222222;
    text-transform: uppercase;
    text-decoration: none;
    padding: 6px 10px;
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

<script lang="typescript">
  const items = [
    { href: '.', label: 'Home' },
    { href: 'news', label: 'News' },
    { href: 'opinions', label: 'Opinions' },
    { href: 'sports', label: 'Sports' },
    { href: 'diversity-matters', label: 'Diversity Matters' },
    { href: 'arts-culture', label: 'Arts, Campus, & Culture' },
    { href: 'satire', label: 'The Horse' },
    { href: 'contact', label: 'Contact' },
  ];
</script>

<nav>
  {#each items as item}
    <a href={item.href}>{item.label}</a>
  {/each}
</nav>
