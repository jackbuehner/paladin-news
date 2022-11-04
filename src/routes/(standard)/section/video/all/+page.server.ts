import { GET_VIDEOS, type GET_VIDEOS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data, error: err } = await api.query<GET_VIDEOS__TYPE>(GET_VIDEOS, {
    variables: { limit: 100, sort: JSON.stringify({ 'timestamps.published_at': -1 }) },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.videosPublic) {
    return data.videosPublic;
  }

  throw error(err.status);
};
