import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import { variables } from '../../../variables';
import type { IShortURL } from 'src/interfaces/shorturl';

interface IArticleOutput extends IShortURL {
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
  const res = await fetch(`${hostUrl}/api/v2/shorturl/${code}`);
  const shortURL: IShortURL = await res.json();

  if (shortURL && shortURL.hidden !== true && shortURL.code) {
    return {
      body: shortURL,
    };
  }
  return null;
}

export { get };
