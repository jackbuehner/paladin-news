import { GET_VIDEOS, type GET_VIDEOS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<never> = async () => {
  const { data, error } = await api.query<GET_VIDEOS__TYPE>(GET_VIDEOS, {
    variables: { limit: 100, sort: JSON.stringify({ 'timestamps.published_at': -1 }) },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.videosPublic) return { body: { data: JSON.stringify(data) } };
  return { status: error.status };
};
