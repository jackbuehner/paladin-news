import { GET_PLAYLISTS, type GET_PLAYLISTS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data, error: err } = await api.query<GET_PLAYLISTS__TYPE>(GET_PLAYLISTS, {
    variables: { limit: 100, sort: JSON.stringify({ 'timestamps.modified_at': -1 }) },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.videoPlaylistsPublic) {
    return data.videoPlaylistsPublic;
  }

  throw error(err.status);
};
