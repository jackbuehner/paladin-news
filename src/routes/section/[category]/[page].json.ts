import type { IArticle } from 'src/interfaces/articles';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { variables } from '../../../variables';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
import { GET_ARTICLES, GET_ARTICLES__JSON } from '../../../queries';

interface IArticleOutput extends AggregatePaginateResult<IArticle> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IArticleOutput>> {
  const { category, page } = request.params;
  if (category === 'pwabuilder-sw.js') return { status: 404 };

  // generate the categories for the query
  let categories = [];
  if (category === 'diversity-matters') categories = ['diversity'];
  else if (category === 'opinions') categories = ['opinion'];
  else if (category === 'arts-culture') categories = ['arts', 'campus-culture'];
  else if (category === 'arts-campus-culture') categories = ['arts', 'campus-culture'];
  else categories = [category];

  // get the articles in the category
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;

  // request the articles from the api
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLES,
      variables: {
        page: parseInt(page),
        limit: 25,
        filter: JSON.stringify({
          categories: { $in: categories },
          'timestamps.published_at': { $exists: true },
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
