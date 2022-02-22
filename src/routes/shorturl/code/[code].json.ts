import type { EndpointOutput } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { GET_SHORTURL__JSON } from '../../../queries';
import { GET_SHORTURL, GET_SHORTURL__DOC_TYPE } from '../../../queries';
import { variables } from '../../../variables';

interface IArticleOutput extends GET_SHORTURL__DOC_TYPE {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IArticleOutput>> {
  // the `code` parameter is available because this file
  // is called [code].json.ts
  const { code } = request.params;

  if (code === 'pwabuilder-sw.js') return null;

  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_SHORTURL,
      variables: { code },
    }),
  });
  const { data }: GET_SHORTURL__JSON = await res.json();
  const shortURL = data.shorturl;

  if (shortURL && shortURL.hidden !== true && shortURL.code) {
    return {
      body: shortURL,
    };
  }
  return null;
}

export { get };
