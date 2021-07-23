import type { ISatire } from 'src/interfaces/satire';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import Renderer from 'prosemirror-to-html-js';
import { variables } from '../../variables';

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

  const hostUrl =
    variables.mode === 'development'
      ? 'http://localhost:3001'
      : 'https://api.thepaladin.cristata.app';
  const res = await fetch(`${hostUrl}/api/v2/satire/public/${slug}`);
  const satire: ISatire = await res.json();

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
