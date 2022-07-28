<script context="module" lang="ts">
  import { api } from '$lib/utils/api';
  import { variables } from '$lib/variables';
  import type { LoadOutput } from '@sveltejs/kit';

  export async function load(): Promise<LoadOutput> {
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

    const { data, error } = await api.query<QUERY_TYPE>(QUERY, {
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (error.errors) return { status: 400, stuff: { errors: JSON.stringify(error.errors) } };
    else if (data?.setting?.setting) {
      return { stuff: { podcastsConfig: data.setting.setting } };
    }
    return { status: error.status };
  }
</script>

<slot />
