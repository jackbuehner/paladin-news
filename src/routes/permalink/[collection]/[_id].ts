import {
  GET_ARTICLE_BASIC,
  GET_FLUSHERS,
  type GET_ARTICLE_BASIC__TYPE,
  type GET_FLUSHERS__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { insertDate } from '$lib/utils/insertDate';
import type { RequestHandler } from '@sveltejs/kit';
import { DateTime } from 'luxon';

export const GET: RequestHandler<{ collection: string; _id: string }> = async (request) => {
  const { collection, _id } = request.params;
  const failureRedirect = {
    status: 302, // temporary redirect
    headers: { Location: `/permalink?from=/${collection ? collection + '/' : ''}${_id}` },
  };

  if (collection === 'articles') {
    // get the article from the api
    const { data, error } = await api.query<GET_ARTICLE_BASIC__TYPE>(GET_ARTICLE_BASIC, {
      variables: { _id },
    });

    // get the article from the response
    if (error.errors || !data?.articlePublic) return failureRedirect;
    const { slug, ...article } = insertDate([data.articlePublic])[0];
    const { year, month, day } = article.date;

    return {
      status: 302, // temporary redirect
      headers: { Location: `/articles/${year}/${month}/${day}/${slug}` },
    };
  }

  if (collection === 'flusher') {
    // get the article from the api
    const { data, error } = await api.query<GET_FLUSHERS__TYPE>(GET_FLUSHERS, {
      variables: { filter: JSON.stringify({ _id }) },
    });

    // get the article from the response
    if (error.errors || !data?.flushesPublic?.docs?.[0]) return failureRedirect;
    const week = DateTime.fromISO(data.flushesPublic.docs[0].timestamps.week).toISODate();

    return {
      status: 307, // temporary redirect
      headers: { Location: `/flusher/${week}` },
    };
  }

  return failureRedirect;
};
