/* eslint-disable no-useless-escape */ // graphql needs the quotes to be escaped
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';
import { GET_PODCAST_EPISODES, type GET_PODCAST_EPISODES__TYPE } from '$lib/queries';

export const get: RequestHandler<Record<'podcast', string>> = async (request) => {
  // define the variables for the query:
  const limit = 100;
  const page = 1;

  // filter to specific podcast
  const filter = `{ \"podcast\": \"${request.params.podcast.toLowerCase()}\" }`;

  // prefer the newest episodes first
  const sort = `{ \"episode_number\": -1 }`;

  // request the podcast episdoes from the api
  const { data, error } = await api.query<GET_PODCAST_EPISODES__TYPE>(GET_PODCAST_EPISODES, {
    variables: { limit, page, filter, sort },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.podcastsPublic?.docs) {
    if (data.podcastsPublic.docs.length === 0) return { status: 404 };
    return { body: { data: JSON.stringify(data.podcastsPublic.docs || []) } };
  }
  return { status: error.status };
};
