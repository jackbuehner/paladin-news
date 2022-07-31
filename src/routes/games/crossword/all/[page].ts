import { GET_CROSSWORDS, type GET_CROSSWORDS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<{ page: string }> = async (request) => {
  // define the variables for the query
  const limit = 10;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({ 'timestamps.published_at': { $exists: true } });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // query the crossword puzzles from the api
  const { data, error } = await api.query<GET_CROSSWORDS__TYPE>(GET_CROSSWORDS, {
    variables: { limit, page, filter, sort },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.crosswordsPublic) return { body: { data: JSON.stringify(data.crosswordsPublic) } };
  return { status: error.status };
};
