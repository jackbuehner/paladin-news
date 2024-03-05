import { error } from '@sveltejs/kit';
import MockDate from 'mockdate';
import type { LayoutLoad } from './$types';

// since this version of the website is retired, we should make
// all generated dates be the last day the site was the primary one
MockDate.set('2023-12-31T23:59:00.000Z'); // Dec. 31, 2023 at 11:59 PM UTC

export const load: LayoutLoad = async ({ url }) => {
  // return 204 status when sveltekit tries to load scripts as pages
  // (this happens with embedded scripts and pwabuilder scripts)
  if (url.pathname.includes('/pwa-update.js') || url.pathname.includes('/js/')) {
    throw error(204);
  }

  // return the page path to the page
  return { path: url.pathname };
};
