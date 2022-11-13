import { GET_ECHO_DOCS, type GET_ECHO_DOCS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // format the name of the category
  const pagePathToTitle = (string: string): string => {
    string = string.replaceAll('/', '');
    string = string.replaceAll('-', ' ');
    return string;
  };

  // define the variables for the query
  const limit = 10;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({
    type: request.params.category,
    'timestamps.published_at': { $exists: true },
  });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // get the docs in the category
  const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
    variables: { limit, page, filter, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.echoContentsPublic) {
    return {
      ...data.echoContentsPublic,
      pageTitle: pagePathToTitle(request.params.category),
    };
  }

  throw error(err.status);
};
