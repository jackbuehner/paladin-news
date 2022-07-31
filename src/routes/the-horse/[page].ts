import { GET_SATIRES, type GET_SATIRES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<{ page: string }> = async (request) => {
  // define the variables for the query
  const limit = 25;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({ 'timestamps.published_at': { $exists: true } });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // request the satires from the api
  const { data, error } = await api.query<GET_SATIRES__TYPE>(GET_SATIRES, {
    variables: { limit, page, filter, sort },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.satiresPublic) return { body: { data: JSON.stringify(data.satiresPublic) } };
  return { status: error.status };
};
