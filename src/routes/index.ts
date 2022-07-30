import { GET_FRONT_PAGE_2022, type GET_FRONT_PAGE_2022__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<never> = async () => {
  const { data, error } = await api.query<GET_FRONT_PAGE_2022__TYPE>(GET_FRONT_PAGE_2022, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.articleFrontPagePublic) {
    return {
      body: { data: JSON.stringify(data) },
    };
  }
  return { status: error.status };
};
