import { GET_ARTICLE_BASIC, type GET_ARTICLE_BASIC__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import { insertDate } from '$lib/utils/insertDate';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ collection: string; _id: string }> = async (request) => {
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
    if (!error.errors || !data?.articlePublic) return failureRedirect;
    const { slug, ...article } = insertDate([data.articlePublic])[0];
    const { year, month, day } = article.date;

    return {
      status: 302, // temporary redirect
      headers: { Location: `/articles/${year}/${month}/${day}/${slug}` },
    };
  }

  return failureRedirect;
};
