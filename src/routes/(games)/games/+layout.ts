import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  // return the page path to the page
  return { path: url.pathname };
};
