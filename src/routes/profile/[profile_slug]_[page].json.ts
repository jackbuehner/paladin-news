import type { EndpointOutput } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import {
  GET_ARTICLES,
  GET_ARTICLES__JSON,
  GET_ARTICLES__TYPE,
  GET_USER_BY_SLUG,
  GET_USER_BY_SLUG__JSON,
  GET_USER_BY_SLUG__TYPE,
} from '../../queries';
import { variables } from '../../variables';

interface IOutput {
  profile: GET_USER_BY_SLUG__TYPE;
  articles: GET_ARTICLES__TYPE;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IOutput>> {
  const { profile_slug, page } = request.params;
  if (profile_slug === 'pwabuilder-sw.js') return { status: 404 };

  // get the profile
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_USER_BY_SLUG,
      variables: {
        slug: profile_slug,
      },
    }),
  });
  const resJson: GET_USER_BY_SLUG__JSON = await res.json();
  const profile = resJson.data;

  // get articles from this person
  const res2 = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLES,
      variables: {
        page: parseInt(page),
        filter: JSON.stringify({ 'people.authors': profile?.userBySlugPublic?._id }),
      },
    }),
  });
  const res2Json: GET_ARTICLES__JSON = await res2.json();
  const articles = res2Json.data;

  // return the profile to the page
  if (profile) {
    return {
      body: {
        profile,
        articles,
      },
    };
  }
  return null;
}

export { get };
