import type { IProfile } from 'src/interfaces/profiles';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import { variables } from '../variables';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';

interface IOutput extends AggregatePaginateResult<IProfile> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IOutput>> {
  const { page } = request.params;

  // get the profiles
  const hostUrl =
    variables.mode === 'development'
      ? 'http://localhost:3001'
      : 'https://api.thepaladin.cristata.app';
  const res = await fetch(`${hostUrl}/api/v2/users/public?limit=20&page=${page}`);
  const profiles: AggregatePaginateResult<IProfile> = await res.json();

  // return the profiles to the page
  if (profiles) {
    return {
      body: profiles,
    };
  }
  return null;
}

export { get };
