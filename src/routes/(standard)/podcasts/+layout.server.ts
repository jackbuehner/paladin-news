import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PodcastsConfig } from '.';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
  const QUERY = `
      query GetPodcastsListPageConfig {
        setting(name: "Podcasts list") {
          setting
        }
      }
    `;

  interface QUERY_TYPE {
    setting?: {
      setting?: string;
    };
  }

  const { data, error: err } = await api.query<QUERY_TYPE>(QUERY, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.setting?.setting) {
    return { podcastsConfig: JSON.parse(data.setting.setting) as PodcastsConfig };
  }

  throw error(err.status);
};
