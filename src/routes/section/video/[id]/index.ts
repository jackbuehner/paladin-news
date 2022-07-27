import { GET_VIDEO, type GET_VIDEO__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ id: string }> = async (request) => {
  const { data, error } = await api.query<GET_VIDEO__TYPE>(GET_VIDEO, {
    variables: { _id: request.params.id },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.videoPublic) return { body: { data: JSON.stringify(data) } };
  return { status: error.status };
};
