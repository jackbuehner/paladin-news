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
    transform: none;
    left: calc(-1 * var(--sidenav-width));
    transform: none;
    transition: transform cubic-bezier(0.165, 0.84, 0.44, 1) 360ms;
  }
  nav.isOpen {
    transform: translateX(var(--sidenav-width));
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
    justify-content: space-between;
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
      { href: '/.', label: 'Home' },
      { href: '/all-articles', label: 'All articles' },
    ],
    [
      { href: '/news', label: 'News' },
      { href: '/opinions', label: 'Opinions' },
      { href: '/sports', label: 'Sports' },
      { href: '/diversity-matters', label: 'Diversity Matters' },
      { href: '/arts-culture', label: 'Arts, Campus, & Culture' },
    ],
    [{ href: '/satire', label: 'The Horse' }],
    [
      {
        href: 'https://www.youtube.com/channel/UC3UaWOCIldF5_qWnCYEt0RQ',
        label: 'Videos',
        external: true,
      },
      { href: '/newsletters', label: 'Newsletters' },
    ],
    [
      { href: '/about', label: 'Who we are' },
      { href: '/contact', label: 'Contact' },
      {
        href: 'https://app.mobilecause.com/vf/DinsDonate/team/PaladinNewspaper',
        label: 'Donate',
        external: true,
      },
      { href: '/privacy-policy', label: 'Privacy policy' },
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
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        on:click={() => (isOpen = false)}>
        <span>{item.label}</span>
        {#if item.external}
          <svg style="width:12px;height:12px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
          </svg>
        {/if}
      </a>
    {/each}
  {/each}
</nav>
<div class={`overlay`} class:isOpen on:click={() => (isOpen = false)} />
