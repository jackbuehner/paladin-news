import { GET_FRONT_PAGE, type GET_FRONT_PAGE__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<never> = async () => {
  const { data, error } = await api.query<GET_FRONT_PAGE__TYPE>(GET_FRONT_PAGE, {});

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.acc && data.diversity && data.featured && data.news && data.opinion && data.sports)
    return { body: { data: JSON.stringify(data) } };
  return { status: error.status };
};
