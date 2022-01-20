import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { fetchSectionXml } from '../../utils/fetchSectionXml';

export async function get(
  request: ServerRequest
): Promise<{ headers: Record<string, string>; body: string }> {
  const body = await fetchSectionXml(request.params.category, request.path, 20);

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  return {
    headers,
    body,
  };
}
