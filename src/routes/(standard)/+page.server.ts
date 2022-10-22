import { GET_FRONT_PAGE_2022, type GET_FRONT_PAGE_2022__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data, error: err } = await api.query<GET_FRONT_PAGE_2022__TYPE>(GET_FRONT_PAGE_2022, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.articleFrontPagePublic?.[0]) {
    return data.articleFrontPagePublic[0];
  }

  throw error(err.status);
};
