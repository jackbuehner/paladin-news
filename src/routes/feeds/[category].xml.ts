import { fetchSectionXml } from '$lib/utils/fetchSectionXml';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ category: string }> = async (request) => {
  const body = await fetchSectionXml(request.params.category, request.url.pathname, 20);

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  return {
    headers,
    body,
  };
};
