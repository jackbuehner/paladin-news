import {
  GET_ARTICLE_BASIC,
  GET_ECHO_DOCS,
  GET_FLUSHERS,
  type GET_ARTICLE_BASIC__TYPE,
  type GET_ECHO_DOCS__TYPE,
  type GET_FLUSHERS__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { insertDate } from '$lib/utils/insertDate';
import { redirect } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  const { collection, _id } = request.params;
  const failureLocation = `/permalink?from=/${collection ? collection + '/' : ''}${_id}`;

  if (collection === 'articles') {
    // get the article from the api
    const { data, error: err } = await api.query<GET_ARTICLE_BASIC__TYPE>(GET_ARTICLE_BASIC, {
      variables: { _id },
    });

    // get the article from the response
    if (err.errors || !data?.articlePublic) throw redirect(302, failureLocation);
    const { slug, ...article } = insertDate([data.articlePublic])[0];
    const { year, month, day } = article.date;

    throw redirect(307, `/articles/${year}/${month}/${day}/${slug}`);
  }

  if (collection === 'flusher') {
    // get the article from the api
    const { data, error: err } = await api.query<GET_FLUSHERS__TYPE>(GET_FLUSHERS, {
      variables: { filter: JSON.stringify({ _id }) },
    });

    // get the article from the response
    if (err.errors || !data?.flushesPublic?.docs?.[0]) return redirect(302, failureLocation);
    const week = DateTime.fromISO(data.flushesPublic.docs[0].timestamps.week).toISODate();

    throw redirect(307, `/flusher/${week}`);
  }

  if (collection === 'magazine') {
    const { data, error: err } = await api.query<GET_ECHO_DOCS__TYPE>(GET_ECHO_DOCS, {
      variables: { filter: JSON.stringify({ _id }) },
    });

    if (err.errors || !data?.echoContentsPublic?.docs?.[0]) return redirect(302, failureLocation);
    const { slug, type, ...article } = insertDate(data.echoContentsPublic.docs)[0];
    const { year, month, day } = article.date;

    throw redirect(307, `/magazine/${type}/${year}/${month}/${day}/${slug}`);
  }

  return redirect(302, failureLocation);
};
