import type { ISatire } from 'src/interfaces/satire';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import Renderer from '@cristata/prosemirror-to-html-js';
import { variables } from '../../variables';
import { GET_SATIRE_BY_SLUG, GET_SATIRE_BY_SLUG__JSON } from '../../queries';

interface ISatireOutput extends ISatire {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<ISatireOutput>> {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = request.params;

  // request the article from the api
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_SATIRE_BY_SLUG,
      variables: { slug },
    }),
  });
  const { data }: GET_SATIRE_BY_SLUG__JSON = await res.json();
  const satire = data.satireBySlugPublic;

  // convert the json body to html
  if (satire.legacy_html !== true) {
    try {
      const renderer = new Renderer.Renderer();
      satire.body = renderer.render({
        type: 'doc',
        content: JSON.parse(satire.body),
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (satire) {
    return {
      body: satire,
    };
  }
  return null;
}

export { get };
