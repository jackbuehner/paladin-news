import { GET_JOBS, type GET_JOBS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data, error: err } = await api.query<GET_JOBS__TYPE>(GET_JOBS, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.settingJobListings) {
    return { jobs: data.settingJobListings };
  }

  throw error(err.status);
};
