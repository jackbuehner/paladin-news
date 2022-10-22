import { GET_CROSSWORDS, type GET_CROSSWORDS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  // define the variables for the query
  const limit = 1;
  const page = 1;
  const filter = JSON.stringify({ 'timestamps.published_at': { $exists: true } });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // query the crossword puzzles from the api
  const { data, error: err } = await api.query<GET_CROSSWORDS__TYPE>(GET_CROSSWORDS, {
    variables: { limit, page, filter, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.crosswordsPublic?.docs?.[0]) {
    const _id = data.crosswordsPublic.docs[0]._id;
    throw redirect(307, `${url.pathname}/${_id}`);
  }

  throw redirect(307, `${url.pathname}/all/1`);
};
