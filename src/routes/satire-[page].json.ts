import type { ISatire } from 'src/interfaces/satire';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import { variables } from '../variables';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';

interface ISatireOutput extends AggregatePaginateResult<ISatire> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<ISatireOutput>> {
  const { page } = request.params;

  // get the satire articles in the category
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/api/v2/satire/public?limit=20&page=${page}`);
  const articles: AggregatePaginateResult<ISatire> = await res.json();

  // return the satire articles to the page
  if (articles) {
    return {
      body: articles,
    };
  }
  return null;
}

export { get };
