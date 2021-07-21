import type { IArticle } from 'src/interfaces/articles';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import { variables } from '../../variables';
import type { IProfile } from 'src/interfaces/profiles';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';

interface IOutput {
  profile: IProfile;
  articles: AggregatePaginateResult<IArticle>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IOutput>> {
  const { profile_slug, page } = request.params;

  // get the profile
  const hostUrl =
    variables.mode === 'development'
      ? 'http://localhost:3001'
      : 'https://api.thepaladin.cristata.app';
  const res = await fetch(`${hostUrl}/api/v2/users/public/${profile_slug}`);
  const profile: IProfile = await res.json();

  // get articles from this person
  const res2 = await fetch(
    `${hostUrl}/api/v2/articles/public?page=${page}&author=${profile.github_id}`
  );
  const articles: AggregatePaginateResult<IArticle> = await res2.json();

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
