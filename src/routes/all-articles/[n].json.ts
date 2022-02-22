import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { variables } from '../../variables';
import { GET_ARTICLES } from '../../queries';
import type { GET_ARTICLES__JSON, GET_ARTICLES__DOC_TYPE, Paged } from '../../queries';

interface IArticleOutput extends Paged<GET_ARTICLES__DOC_TYPE> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IArticleOutput>> {
  const { n } = request.params;
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;

  // request the articles from the api
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLES,
      variables: {
        limit: 10,
        page: parseInt(n),
        filter: JSON.stringify({
          'timestamps.published_at': { $exists: true },
        }),
        sort: JSON.stringify({
          'timestamps.published_at': -1,
        }),
      },
    }),
  });

  // proces the response
  const resJson: GET_ARTICLES__JSON = await res.json(); // get the response as JSON
  const articles = resJson?.data?.articlesPublic; // identify the articles response

  // return the articles to the page
  if (articles) {
    return {
      body: articles,
    };
  }
  return null;
}

export { get };
