/* eslint-disable no-useless-escape */ // graphql needs the quotes to be escaped
import { GET_FLUSHERS, type GET_FLUSHERS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // define the variables for the query:
  // get only one flusher
  const limit = 1;
  const page = 1;
  // filter out flushers with ineligible times
  const filter = (() => {
    // if the query specifies a specific week, get the flusher with the week
    if (request.url.searchParams.has('week')) {
      const week: Date = new Date(request.url.searchParams.get('week') as string);
      const weekPlusOneDay = new Date(week.getTime() + 1000 * 60 * 60 * 24);
      return `{ 
                \"$and\": [
                  { \"timestamps.week\": { \"$gte\": \"${week.toISOString()}\" } },
                  { \"timestamps.week\": { \"$lt\": \"${weekPlusOneDay.toISOString()}\" } } 
                ] 
              }`;
    }
    // otherwise, get the newest flusher that has a week that is not in the future
    return `{ \"timestamps.week\": { \"$lte\": \"${new Date().toISOString()}\" } }`;
  })();
  // prefer the newest filtered flusher with the largest volume and issue number
  const sort = `{ \"timestamps.week\": -1, \"volume\": -1, \"issue\": -1 }`;

  // request the satires from the api
  const { data, error: err } = await api.query<GET_FLUSHERS__TYPE>(GET_FLUSHERS, {
    variables: { limit, page, filter, sort },
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.flushesPublic) {
    return data.flushesPublic.docs?.[0];
  }

  throw error(err.status);
};
