<script context="module" lang="ts">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ url }: LoadEvent) {
    // return 204 status when sveltekit tries to load scripts as pages
    // (this happens with embedded scripts and pwabuilder scripts)
    if (url.pathname.includes('/pwa-update.js') || url.pathname.includes('/js/')) {
      return { status: 204 };
    }

    // return the page path to the page
    return { props: { path: url.pathname } };
  }
</script>

<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import type { LoadEvent } from '@sveltejs/kit';
  import * as Fathom from 'fathom-client';
  import NProgress from 'nprogress';
  import { onMount } from 'svelte';

  // configure the navigation progress bar
  NProgress.configure({
    parent: 'body',
    easing: 'ease',
    speed: 500,
    trickle: true,
    trickleSpeed: 200,
    showSpinner: false,
  });

  // show progress bar on page navigate
  beforeNavigate(() => {
    NProgress.start();
  });

  // hide progress bar on navigation end
  afterNavigate(() => {
    NProgress.done();
  });

  // fathom analytics
  onMount(() => {
    // load on page load
    Fathom.load(import.meta.env.VITE_FATHOM_ID as string, {
      url: import.meta.env.VITE_FATHOM_URL as string,
    });

    // track page view after each new navigation
    window.addEventListener('sveltekit:navigation-end', () => {
      Fathom.trackPageview();
    });
  });
</script>

<slot />
