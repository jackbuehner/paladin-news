import { GET_CROSSWORD, type GET_CROSSWORD__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ _id: string }> = async (request) => {
  // query the crossword puzzle from the api
  const { data, error } = await api.query<GET_CROSSWORD__TYPE>(GET_CROSSWORD, {
    variables: { _id: request.params._id },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.crosswordPublic) return { body: { data: JSON.stringify(data.crosswordPublic) } };
  return { status: error.status };
};
