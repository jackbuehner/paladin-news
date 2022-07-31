import {
  GET_VIDEO_PAGE,
  GET_VIDEO_PAGE_SETTING,
  type GET_VIDEO_PAGE_SETTING__TYPE,
  type GET_VIDEO_PAGE__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<never> = async () => {
  const res = await api.query<GET_VIDEO_PAGE_SETTING__TYPE>(GET_VIDEO_PAGE_SETTING, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (res.error.errors) return { status: 400, body: { errors: JSON.stringify(res.error.errors) } };

  if (res.data?.setting) {
    const json = JSON.parse(res.data.setting.setting);
    const featuredVideoId: string | undefined = json?.featured;
    const featuredPlaylistIds: string[] = json?.playlists || [];

    if (featuredVideoId && featuredPlaylistIds) {
      const { data, error } = await api.query<GET_VIDEO_PAGE__TYPE>(GET_VIDEO_PAGE, {
        variables: { featuredVideoId, playlistIds: featuredPlaylistIds },
      });

      if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
      else if (data) return { body: { data: JSON.stringify(data) } };
      return { status: error.status };
    }
  }

  return { status: res.error.status };
};
