import { GET_VIDEO, type GET_VIDEO__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  const { data, error: err } = await api.query<GET_VIDEO__TYPE>(GET_VIDEO, {
    variables: { _id: request.params.id },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.videoPublic) {
    return data.videoPublic;
  }

  throw error(err.status);
};
