import type { IArticle } from 'src/interfaces/articles';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import { variables } from '../../../variables';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';

interface IArticleOutput extends AggregatePaginateResult<IArticle> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IArticleOutput>> {
  const { category, page } = request.params;

  // only allow designated categories (return 404 if not in matching object)
  const matching = {
    news: 'news',
    opinions: 'opinion',
    sports: 'sports',
    'diversity-matters': 'diversity',
    'arts-culture': 'arts,campus-culture',
    arts: 'arts',
    'campus-culture': 'campus-culture',
  };
  if (!matching[category]) return null;

  // get the articles in the category
  const hostUrl =
    variables.mode === 'development'
      ? 'http://localhost:3001'
      : 'https://api.thepaladin.cristata.app';
  const res = await fetch(
    `${hostUrl}/api/v2/articles/public?limit=25&page=${page}${matching[category]
      .split(',')
      .map((category: string) => `&category=${category}`)}`.replace(',', '')
  );
  const articles: AggregatePaginateResult<IArticle> = await res.json();

  // return the articles to the page
  if (articles) {
    return {
      body: articles,
    };
  }
  return null;
}

export { get };
