import { GET_PROFILES, type GET_PROFILES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // define the variables for the query
  const limit = 100;
  let page = 1;
  const sort = JSON.stringify({ group: 1, name: 1 });

  // request the profiles from the api
  const { data, error: err } = await api.query<GET_PROFILES__TYPE>(GET_PROFILES, {
    variables: { limit, page, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  } else if (data?.usersPublic?.docs) {
    let docs = [...data.usersPublic.docs];
    let hasNextPage = data.usersPublic.hasNextPage;

    // get more profiles until no more are available
    while (hasNextPage) {
      page++;
      hasNextPage = false;

      const { data } = await api.query<GET_PROFILES__TYPE>(GET_PROFILES, {
        variables: { limit, page, sort },
      });

      if (data?.usersPublic?.docs) {
        docs = [...docs, ...data?.usersPublic?.docs];
      }

      if (data?.usersPublic?.hasNextPage) {
        hasNextPage = true;
      }
    }

    return { docs };
  }

  throw error(err.status);
};
