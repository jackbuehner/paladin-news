/* eslint-disable no-useless-escape */ // graphql needs the quotes to be escaped
import { GET_FLUSHERS, type GET_FLUSHERS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // define the variables for the query:
  // get only one flusher
  const limit = 100;
  const page = 1;
  const filter = (() => {
    // get the flushesr not in the future
    return `{ \"timestamps.week\": { \"$lte\": \"${new Date().toISOString()}\" } }`;
  })();
  // prefer the newest filtered flusher with the largest volume and issue number
  const sort = `{ \"timestamps.week\": -1, \"volume\": -1, \"issue\": -1 }`;

  // request the flusher docs from the api
  const { data, error: err } = await api.query<GET_FLUSHERS__TYPE>(GET_FLUSHERS, {
    variables: { limit, page, filter, sort },
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.flushesPublic) {
    return { flushers: data.flushesPublic.docs };
  }

  throw error(err.status);
};
