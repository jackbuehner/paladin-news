import { GET_PROFILES, type GET_PROFILES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // define the variables for the query
  const limit = 100;
  const page = 1;
  const filter = JSON.stringify({ group: { $lt: 5 } });

  // request the profiles from the api
  const { data, error: err } = await api.query<GET_PROFILES__TYPE>(GET_PROFILES, {
    variables: { limit, page, filter },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.usersPublic) {
    return data.usersPublic;
  }

  throw error(err.status);
};
