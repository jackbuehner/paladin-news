import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { GET_ARTICLE_BASIC, GET_ARTICLE_BASIC__JSON } from '../../../queries';
import { insertDate } from '../../../utils/insertDate';
import { variables } from '../../../variables';

async function get(request: ServerRequest): Promise<EndpointOutput> {
  const { collection, _id } = request.params;
  const failureRedirect = {
    status: 302, // temporary redirect
    headers: { Location: `/permalink?from=/${collection ? collection + '/' : ''}${_id}` },
  };

  if (collection === 'articles') {
    // request the article from the api
    const res = await fetch(`${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}/v3`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_ARTICLE_BASIC,
        variables: { _id },
      }),
    });

    // get the article from the response
    const json: GET_ARTICLE_BASIC__JSON = await res.json();
    if (json.errors) return failureRedirect;
    const { slug, ...article } = insertDate([json.data.articlePublic])[0];
    const { year, month, day } = article.date;

    return {
      status: 302, // temporary redirect
      headers: { Location: `/articles/${year}/${month}/${day}/${slug}` },
    };
  }

  return failureRedirect;
}

export { get };
