import { GET_PROFILES, type GET_PROFILES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<never> = async () => {
  // define the variables for the query
  const limit = 100;
  const page = 1;
  const filter = JSON.stringify({ group: { $lt: 5 } });

  // request the profiles from the api
  const { data, error } = await api.query<GET_PROFILES__TYPE>(GET_PROFILES, {
    variables: { limit, page, filter },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.usersPublic?.docs)
    return { body: { data: JSON.stringify(data.usersPublic.docs) } };
  return { status: error.status };
};
