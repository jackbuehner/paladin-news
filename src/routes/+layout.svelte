<script lang="ts">
  import { browser } from '$app/environment';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { page } from '$app/stores';
  import { webVitals } from '$lib/utils/vitals';
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

  // vercel analytics
  let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID; // exposed by vercel during build
  $: if (browser && analyticsId) {
    webVitals({
      path: $page.url.pathname,
      params: $page.params,
      analyticsId,
    });
  }
</script>

<slot />
