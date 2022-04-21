import type { GET_SHORTURL__TYPE } from '$lib/queries';
import { GET_SHORTURL } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ code: string }> = async (request) => {
  // the `code` parameter is available because this file
  // is called [code].ts
  const { code } = request.params;

  if (code === 'pwabuilder-sw.js') return { status: 404 };

  const { data, error } = await api.query<GET_SHORTURL__TYPE>(GET_SHORTURL, {
    variables: { code },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.shorturl) return { body: { data: JSON.stringify(data.shorturl) } };
  return { status: error.status };
};
