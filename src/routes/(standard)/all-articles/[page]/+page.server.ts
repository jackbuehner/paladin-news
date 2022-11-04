import { GET_ARTICLES, type GET_ARTICLES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // define the variables for the query
  const limit = 10;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({ 'timestamps.published_at': { $exists: true } });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // query the articles from the api
  const { data, error: err } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
    variables: { limit, page, filter, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.articlesPublic) {
    return data.articlesPublic;
  }

  throw error(err.status);
};
