import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ url }) => {
  // return 204 status when sveltekit tries to load scripts as pages
  // (this happens with embedded scripts and pwabuilder scripts)
  if (url.pathname.includes('/pwa-update.js') || url.pathname.includes('/js/')) {
    throw error(204);
  }

  // return the page path to the page
  return { path: url.pathname };
};
