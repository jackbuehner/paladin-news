<script lang="ts">
  import IconButton from '../IconButton.svelte';
  import ThePaladinLogo from '../svgs/ThePaladinLogo.svelte';

  const items = [
    [
      { href: '/.', label: 'Home' },
      { href: '/all-articles', label: 'All articles' },
    ],
    [
      { href: '/section/news', label: 'News' },
      { href: '/section/opinions', label: 'Opinions' },
      { href: '/section/sports', label: 'Sports' },
      { href: '/section/diversity-matters', label: 'Diversity Matters' },
      { href: '/section/arts-culture', label: 'Arts, Campus, & Culture' },
    ],
    [
      { href: '/satire', label: 'The Horse', sublabel: 'Satire' },
      { href: '/flusher', label: 'The Flusher', sublabel: 'Restroom newsletter' },
      { href: '/magazine', label: 'The Echo', sublabel: 'Literary & arts magazine' },
    ],
    [
      { href: '/games', label: 'Games' },
      { href: '/section/video', label: 'Videos' },
      { href: '/newsletters', label: 'Newsletters' },
      { href: '/podcasts', label: 'Podcasts' },
    ],
    [
      { href: '/about', label: 'Who we are' },
      { href: '/contact', label: 'Contact' },
      { href: '/jobs', label: 'Jobs' },
      {
        href: 'https://app.mobilecause.com/vf/DinsDonate/team/PaladinNewspaper',
        label: 'Donate',
        external: true,
      },
      { href: '/privacy-policy', label: 'Privacy policy' },
    ],
  ];
</script>

<div>
  <script>
    // we use plain javascript to avoid svelte reactivity
    // so that this works when svelte's javascript is unavailable
    // (e.g., when the page was downloaded with wget or there
    // was an error in the svelte javascript)

    function toggleSideNav() {
      const navElem = document.querySelector('.main-side-nav');
      if (!navElem) return;

      const isOpen = navElem.classList.contains('isOpen');
      if (isOpen) navElem.classList.remove('isOpen');
      else navElem.classList.add('isOpen');

      const navOverlayElem = document.querySelector('.main-nav-overlay');
      if (!navOverlayElem) return;

      if (isOpen) navOverlayElem.classList.remove('isOpen');
      else navOverlayElem.classList.add('isOpen');

      console.log('hi');
    }
  </script>
</div>

<nav class="main-side-nav">
  <div class={`logo`}>
    <ThePaladinLogo width={252} height={85} />
  </div>
  <div class={`divider`} />
  <div class={'socials'}>
    <IconButton
      ariaLabel={'view The Paladin on Facebook'}
      href={'https://www.facebook.com/thepaladin.news'}
      target={'_blank'}
      rel={'external noopener noreferrer'}
    >
      <path
        d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
      />
    </IconButton>
    <IconButton
      ariaLabel={'view The Paladin on Twitter'}
      href={'https://twitter.com/thepaladin_news'}
      target={'_blank'}
      rel={'external noopener noreferrer'}
    >
      <path
        d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"
      />
    </IconButton>
    <IconButton
      ariaLabel={'view The Paladin on Instagram'}
      href={'https://instagram.com/thepaladin.news?igshid=1jfrjveophlx7'}
      target={'_blank'}
      rel={'external noopener noreferrer'}
    >
      <path
        d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
      />
    </IconButton>
    <IconButton
      ariaLabel={'view The Paladin on LinkedIn'}
      href={'https://www.linkedin.com/company/thepaladin/'}
      target={'_blank'}
      rel={'external noopener noreferrer'}
    >
      <path
        d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z"
      />
    </IconButton>
  </div>
  {#each items as itemGroup}
    <div class={`divider`} />
    {#each itemGroup as item}
      <a
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel="noreferrer"
        onclick="toggleSideNav()"
        class:withSubLabel={!!item.sublabel}
      >
        <span class="label">
          <span>{item.label}</span>
          {#if item.sublabel}
            <span>{item.sublabel}</span>
          {/if}
        </span>
        {#if item.external}
          <svg style="width:12px;height:12px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"
            />
          </svg>
        {/if}
      </a>
    {/each}
  {/each}
</nav>
<div class={`overlay main-nav-overlay`} onclick="toggleSideNav()" />

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
  :global(.main-side-nav.isOpen) {
    transform: translateX(var(--sidenav-width)) !important;
  }

  /* label and sublabel */
  span.label {
    display: flex;
    flex-direction: column;
  }

  span.label > span:nth-of-type(2) {
    font-size: 11px;
    color: #424242;
    font-style: italic;
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

  a.withSubLabel {
    height: 48px;
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
  :global(.main-nav-overlay.isOpen) {
    position: fixed;
    inset: 0;
    z-index: 998;
    background-color: #000000;
    opacity: 0.06;
  }

  /* social icons row */
  .socials {
    display: flex;
    flex-direction: row;
    gap: 4px;
    margin: 5px;
  }

  /* hide when printing */
  @media print {
    nav {
      display: none;
    }
  }
</style>
