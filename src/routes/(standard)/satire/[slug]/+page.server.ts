import { HardBreak } from '$lib/pm/render/HardBreak';
import { PhotoWidget } from '$lib/pm/render/PhotoWidget';
import { PullQuote } from '$lib/pm/render/PullQuote';
import { SweepwidgetWidget } from '$lib/pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '$lib/pm/render/YoutubeWidget';
import { GET_SATIRE_BY_SLUG, type GET_SATIRE_BY_SLUG__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import Renderer from '@cristata/prosemirror-to-html-js';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // the `slug` parameter is available because this file
  // is called [slug].ts
  const { slug } = request.params;

  // request the article from the api
  const { data: satire, error: err } = await api.query<GET_SATIRE_BY_SLUG__TYPE>(
    GET_SATIRE_BY_SLUG,
    {
      variables: { slug },
    }
  );

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (satire?.satireBySlugPublic) {
    // convert the json body to html
    if (satire.satireBySlugPublic.body && satire.satireBySlugPublic.legacy_html !== true) {
      try {
        const renderer = new Renderer.Renderer();
        renderer.addNode(HardBreak);
        renderer.addNode(SweepwidgetWidget);
        renderer.addNode(YoutubeWidget);
        renderer.addNode(PhotoWidget);
        renderer.addNode(PullQuote);
        satire.satireBySlugPublic.body = renderer.render({
          type: 'doc',
          content: JSON.parse(satire.satireBySlugPublic.body),
        });
      } catch (err) {
        console.error(err);
      }
    }

    return satire.satireBySlugPublic;
  }

  throw error(err.status);
};
