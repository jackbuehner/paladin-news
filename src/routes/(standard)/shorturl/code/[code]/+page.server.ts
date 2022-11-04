import type { GET_SHORTURL__TYPE } from '$lib/queries';
import { GET_SHORTURL } from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // the `code` parameter is available because this file
  // is called [code].ts
  const { code } = request.params;

  if (code === 'pwabuilder-sw.js') throw error(404);

  const { data, error: err } = await api.query<GET_SHORTURL__TYPE>(GET_SHORTURL, {
    variables: { code },
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.shortUrl) {
    return data.shortUrl;
  }

  throw error(err.status);
};
