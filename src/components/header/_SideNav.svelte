<style>
  /* the entire nav component */
  nav {
    width: var(--sidenav-width);
    height: 100vh;
    background-color: var(--sidenav-bg);
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden auto;
    z-index: 999;
    box-shadow: var(--sidenav-shadow);
    transform: translateX(calc(-1 * var(--sidenav-width)));
    transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 360ms;
  }
  nav.isOpen {
    transform: none;
  }

  /* padding for logo */
  .logo {
    padding: 14px;
  }

  /* divider */
  .divider {
    height: 0;
    margin-right: 4px;
    margin-left: 4px;
    border-bottom: 1px solid var(--border-light);
  }

  /* link styles */
  a {
    font-family: var(--font-detail);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    letter-spacing: 1px;
    color: #222222;
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px;
    background-color: var(--button-bg);
    border: 1px solid transparent;
    transition: 200ms;
    border-radius: var(--radius);
    white-space: nowrap;
    cursor: default;
    display: flex;
    height: 36px;
    width: calc(100% - 10px);
    margin: 5px;
    align-items: center;
    justify-self: start;
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

  /* overlay */
  .overlay.isOpen {
    position: fixed;
    inset: 0;
    z-index: 998;
    background-color: #000000;
    opacity: 0.06;
  }
</style>

<script lang="typescript">
  import ThePaladinLogo from '../svgs/ThePaladinLogo.svelte';

  export let isOpen = false;

  const items = [
    [
      { href: '.', label: 'Home' },
      { href: 'all-articles', label: 'All articles' },
    ],
    [
      { href: 'news', label: 'News' },
      { href: 'opinions', label: 'Opinions' },
      { href: 'sports', label: 'Sports' },
      { href: 'diversity-matters', label: 'Diversity Matters' },
      { href: 'arts-culture', label: 'Arts, Campus, & Culture' },
    ],
    [{ href: 'satire', label: 'The Horse' }],
    [{ href: 'contact', label: 'Contact' }],
    [
      { href: 'about', label: 'Who we are' },
      { href: 'contact', label: 'Contact' },
      { href: 'https://app.mobilecause.com/vf/DinsDonate/team/PaladinNewspaper', label: 'Donate' },
      { href: 'privacy-policy', label: 'Privacy policy' },
    ],
  ];
</script>

<nav class:isOpen>
  <div class={`logo`}>
    <ThePaladinLogo width={252} height={85} />
  </div>
  {#each items as itemGroup}
    <div class={`divider`} />
    {#each itemGroup as item}
      <a href={item.href} on:click={() => (isOpen = false)}>{item.label}</a>
    {/each}
  {/each}
</nav>
<div class={`overlay`} class:isOpen on:click={() => (isOpen = false)} />
