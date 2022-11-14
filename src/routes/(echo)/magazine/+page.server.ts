import {
  GET_ECHO_DOCS,
  GET_ECHO_EC,
  type GET_ECHO_DOCS__TYPE,
  type GET_ECHO_EC__DOC_TYPE,
  type GET_ECHO_EC__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
  const choice = await (async () => {
    const { data, error: err } = await api.query<GET_ECHO_EC__TYPE>(GET_ECHO_EC, {
      variables: { filter: JSON.stringify({ type: 'studio-art' }), limit: 5 },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (err.errors) {
      throw error(400, JSON.stringify(err.errors));
    }

    if (data?.settingEditorsChoiceTheEcho) {
      return [
        data.settingEditorsChoiceTheEcho[0].studio_art,
        data.settingEditorsChoiceTheEcho[0].poetry,
        data.settingEditorsChoiceTheEcho[0].prose,
        data.settingEditorsChoiceTheEcho[0].photography,
      ].filter((doc): doc is GET_ECHO_EC__DOC_TYPE => !!doc);
    }

    throw error(err.status);
  })();

  const latest = await (async () => {
    const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
      variables: {
        filter: JSON.stringify({ _id: { $nin: choice.map((doc) => doc._id) } }),
        limit: 1,
      },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (err.errors) {
      throw error(400, JSON.stringify(err.errors));
    }

    if (data?.echoContentsPublic) {
      return data.echoContentsPublic.docs;
    }

    throw error(err.status);
  })();

  const studioArt = (async () => {
    const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
      variables: {
        filter: JSON.stringify({
          type: 'studio-art',
          _id: { $nin: [...choice.map((doc) => doc._id), ...latest.map((doc) => doc._id)] },
        }),
        limit: 5,
      },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (err.errors) {
      throw error(400, JSON.stringify(err.errors));
    }

    if (data?.echoContentsPublic) {
      return data.echoContentsPublic.docs;
    }

    throw error(err.status);
  })();

  const poems = (async () => {
    const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
      variables: {
        filter: JSON.stringify({
          type: 'poetry',
          _id: { $nin: [...choice.map((doc) => doc._id), ...latest.map((doc) => doc._id)] },
        }),
        limit: 6,
      },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (err.errors) {
      throw error(400, JSON.stringify(err.errors));
    }

    if (data?.echoContentsPublic) {
      return data.echoContentsPublic.docs;
    }

    throw error(err.status);
  })();

  const prose = (async () => {
    const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
      variables: {
        filter: JSON.stringify({
          type: 'prose',
          _id: { $nin: [...choice.map((doc) => doc._id), ...latest.map((doc) => doc._id)] },
        }),
        limit: 5,
      },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (err.errors) {
      throw error(400, JSON.stringify(err.errors));
    }

    if (data?.echoContentsPublic) {
      return data.echoContentsPublic.docs;
    }

    throw error(err.status);
  })();

  const photos = (async () => {
    const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
      variables: {
        filter: JSON.stringify({
          type: 'photography',
          _id: { $nin: latest.map((doc) => doc._id) },
        }),
        limit: 8,
      },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    });

    if (err.errors) {
      throw error(400, JSON.stringify(err.errors));
    }

    if (data?.echoContentsPublic) {
      return data.echoContentsPublic.docs;
    }

    throw error(err.status);
  })();

  // cache for one week
  const oneWeek = 3600 * 24 * 7;
  setHeaders({
    'cache-control': `public, max-age=1, stale-while-revalidate=${oneWeek}`,
  });

  return {
    choice,
    latest,
    studioArt: await studioArt,
    poems: await poems,
    prose: await prose,
    photos: await photos,
  };
};
