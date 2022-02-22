import type { EndpointOutput } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { GET_PROFILES__DOC_TYPE, GET_PROFILES__JSON, Paged } from '../queries';
import { GET_PROFILES } from '../queries';
import { variables } from '../variables';

interface IOutput extends Paged<GET_PROFILES__DOC_TYPE> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IOutput>> {
  const { page } = request.params;
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;

  // request the profiles from the api
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_PROFILES,
      variables: {
        limit: 20,
        page: parseInt(page),
        sort: JSON.stringify({
          'timestamps.published_at': -1,
        }),
      },
    }),
  });

  // process the response
  const resJson: GET_PROFILES__JSON = await res.json(); // get the response as JSON
  const profiles = resJson?.data?.usersPublic; // identify the profiles response

  // return the profiles to the page
  if (profiles) {
    return {
      body: profiles,
    };
  }
  return null;
}

export { get };
