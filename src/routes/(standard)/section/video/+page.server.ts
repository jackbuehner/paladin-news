import {
  GET_VIDEO_PAGE,
  GET_VIDEO_PAGE_SETTING,
  type GET_VIDEO_PAGE_SETTING__TYPE,
  type GET_VIDEO_PAGE__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const res = await api.query<GET_VIDEO_PAGE_SETTING__TYPE>(GET_VIDEO_PAGE_SETTING, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (res.error.errors) throw error(404, JSON.stringify(res.error.errors));

  if (res.data?.setting) {
    const json = JSON.parse(res.data.setting.setting);
    const featuredVideoId: string | undefined = json?.featured;
    const featuredPlaylistIds: string[] = json?.playlists || [];

    if (featuredVideoId && featuredPlaylistIds) {
      const { data, error: err } = await api.query<GET_VIDEO_PAGE__TYPE>(GET_VIDEO_PAGE, {
        variables: { featuredVideoId, playlistIds: featuredPlaylistIds },
      });

      if (err.errors) {
        throw error(400, JSON.stringify(err.errors));
      }

      if (data) {
        return data;
      }

      throw error(err.status);
    }
  }

  throw error(res.error.status);
};
