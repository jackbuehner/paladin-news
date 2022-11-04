import { fetchSectionXml } from '$lib/utils/fetchSectionXml';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (request) => {
  const body = await fetchSectionXml(request.params.category, request.url.pathname, 20);

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };

  return new Response(body, { headers });
};
