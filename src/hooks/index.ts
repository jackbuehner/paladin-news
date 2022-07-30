import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // resolve the response
  const response = await resolve(event);

  // cache the home page so it loads instantly (vercel's CDN will cache)
  const sixHours = 3600 * 6;
  if (event.url.pathname === '/') {
    response.headers.set('cache-control', `public, max-age=1, stale-while-revalidate=${sixHours}`);
  }

  return response;
};
