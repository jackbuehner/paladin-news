import {
  GET_CURRENT_TEAM_PAGE_SETTING,
  type GET_CURRENT_TEAM_PAGE_SETTING__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // request the profiles from the api
  const { data, error: err } = await api.query<GET_CURRENT_TEAM_PAGE_SETTING__TYPE>(
    GET_CURRENT_TEAM_PAGE_SETTING,
    { headers: { Authorization: `app-token ${variables.API_TOKEN}` } }
  );

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.settingCurrentTeamPage?.[0]) {
    return data.settingCurrentTeamPage[0];
  }

  throw error(err.status);
};
