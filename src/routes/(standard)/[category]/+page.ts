import { redirect, error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ url }) => {
  // We used to have manually created pages for each of these sections
  // that were located at the following paths. We need to redirect these
  // paths to the generic section pages. We must keep these redirects forever
  // in order to prevent broken links to the website.
  const redirectPages = [
    '/news',
    '/opinions',
    '/sports',
    '/diversity-matters',
    '/arts-culture',
    '/arts',
    '/campus-culture',
  ];

  if (redirectPages.includes(url.pathname)) {
    throw redirect(301, `/section${url.pathname}`);
  }

  throw error(404);
};
