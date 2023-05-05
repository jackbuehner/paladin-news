import {
  GET_ARTICLES,
  GET_SERIES,
  type GET_ARTICLES__TYPE,
  type GET_SERIES__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // define the variables for the query
  const limit = 10;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({
    series: request.params.series_id,
    'timestamps.published_at': { $exists: true },
  });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // get the series info
  const { data: seriesData, error: seriesErr } = await api.query<GET_SERIES__TYPE>(GET_SERIES, {
    variables: { _id: request.params.series_id },
  });

  if (seriesErr.errors) {
    throw error(400, JSON.stringify(seriesErr.errors));
  }

  // get the articles with the series
  const { data, error: err } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
    variables: { limit, page, filter, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.articlesPublic) {
    return {
      articles: data.articlesPublic,
      pageTitle: seriesData?.articleStreamPublic?.name || 'Series',
    };
  }

  throw error(err.status);
};
