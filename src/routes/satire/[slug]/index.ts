import { GET_SATIRE_BY_SLUG, type GET_SATIRE_BY_SLUG__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import Renderer from '@cristata/prosemirror-to-html-js';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<{ slug: string }> = async (request) => {
  // the `slug` parameter is available because this file
  // is called [slug].ts
  const { slug } = request.params;

  // request the article from the api
  const { data: satire, error } = await api.query<GET_SATIRE_BY_SLUG__TYPE>(GET_SATIRE_BY_SLUG, {
    variables: { slug },
  });

  // convert the json body to html
  if (satire?.satireBySlugPublic?.body && satire.satireBySlugPublic.legacy_html !== true) {
    try {
      const renderer = new Renderer.Renderer();
      satire.satireBySlugPublic.body = renderer.render({
        type: 'doc',
        content: JSON.parse(satire.satireBySlugPublic.body),
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (satire?.satireBySlugPublic)
    return { body: { data: JSON.stringify(satire.satireBySlugPublic) } };
  return { status: error.status };
};
