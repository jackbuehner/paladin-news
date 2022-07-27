import { GET_PLAYLISTS, type GET_PLAYLISTS__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<never> = async () => {
  const { data, error } = await api.query<GET_PLAYLISTS__TYPE>(GET_PLAYLISTS, {
    variables: { limit: 100, sort: JSON.stringify({ 'timestamps.modified_at': -1 }) },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.videoPlaylistsPublic) return { body: { data: JSON.stringify(data) } };
  return { status: error.status };
};
