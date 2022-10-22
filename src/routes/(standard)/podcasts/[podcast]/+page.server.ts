/* eslint-disable no-useless-escape */ // graphql needs the quotes to be escaped
import { GET_PODCAST_EPISODES, type GET_PODCAST_EPISODES__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // define the variables for the query:
  const limit = 100;
  const page = 1;

  // filter to specific podcast
  const filter = `{ \"podcast\": \"${request.params.podcast.toLowerCase()}\" }`;

  // prefer the newest episodes first
  const sort = `{ \"episode_number\": -1 }`;

  // request the podcast episdoes from the api
  const { data, error: err } = await api.query<GET_PODCAST_EPISODES__TYPE>(GET_PODCAST_EPISODES, {
    variables: { limit, page, filter, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.podcastsPublic) {
    return data.podcastsPublic;
  }

  throw error(err.status);
};
