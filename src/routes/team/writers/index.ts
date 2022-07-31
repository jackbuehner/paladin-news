import { GET_PROFILES, type GET_PROFILES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<never> = async () => {
  // define the variables for the query
  const limit = 100;
  let page = 1;
  const filter = JSON.stringify({ retired: { $ne: true }, group: { $gte: 5 } });
  const sort = JSON.stringify({ name: 1 });

  // request the profiles from the api
  const { data, error } = await api.query<GET_PROFILES__TYPE>(GET_PROFILES, {
    variables: { limit, page, filter, sort },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.usersPublic?.docs) {
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

    return { body: { data: JSON.stringify(docs) } };
  }
  return { status: error.status };
};
