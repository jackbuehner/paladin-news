import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { variables } from '../variables';
import { GET_SATIRES, GET_SATIRES__DOC_TYPE, Paged } from '../queries';
import type { GET_SATIRES__JSON } from '../queries';

interface ISatireOutput extends Paged<GET_SATIRES__DOC_TYPE> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<ISatireOutput>> {
  const { page } = request.params;

  // request the satires from the api
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_SATIRES,
      variables: {
        page: parseInt(page),
        limit: 25,
        filter: JSON.stringify({
          'timestamps.published_at': { $exists: true },
        }),
      },
    }),
  });

  // proces the response
  const resJson: GET_SATIRES__JSON = await res.json(); // get the response as JSON
  const satires = resJson?.data?.satiresPublic; // identify the articles response

  // return the satire articles to the page
  if (satires) {
    return {
      body: satires,
    };
  }
  return null;
}

export { get };
