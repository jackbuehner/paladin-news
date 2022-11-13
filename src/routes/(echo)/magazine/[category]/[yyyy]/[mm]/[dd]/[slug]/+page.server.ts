import { HardBreak } from '$lib/pm/render/HardBreak';
import { PhotoWidget } from '$lib/pm/render/PhotoWidget';
import { PullQuote } from '$lib/pm/render/PullQuote';
import { SweepwidgetWidget } from '$lib/pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '$lib/pm/render/YoutubeWidget';
import { GET_ECHO_DOCS_FULL, type GET_ECHO_DOCS_FULL__TYPE } from '$lib/queries';
import { dateAtTimeZero, insertDate } from '$lib/utils';
import { api } from '$lib/utils/api';
import Renderer from '@cristata/prosemirror-to-html-js';
import { error } from '@sveltejs/kit';
import smartquotes from 'smartquotes';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = request.params;
  let { yyyy, mm, dd } = request.params;

  // set param null if '_' was passed
  if (yyyy === '_') yyyy = '';
  if (mm === '_') mm = '';
  if (dd === '_') dd = '';

  // request the article from the api
  const { data, error: err } = await api.query<GET_ECHO_DOCS_FULL__TYPE>(GET_ECHO_DOCS_FULL, {
    variables: {
      filter: JSON.stringify({
        slug,
        type: request.params.category,
        ...(yyyy && mm && dd
          ? {
              'timestamps.published_at': {
                $gte: dateAtTimeZero(`${yyyy}-${mm}-${dd}`),
                $lt: new Date(
                  dateAtTimeZero(`${yyyy}-${mm}-${dd}`).getTime() + 24 * 60 * 60 * 1000
                ),
              },
            }
          : {}),
      }),
      length: 1,
    },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.echoContentsPublic) {
    const doc = data?.echoContentsPublic.docs[0];

    // convert the json body to html
    if (doc?.body) {
      try {
        // if the body is not html, convert json to html (check with closing p tag)
        if (!doc.body.includes('</p>')) {
          const renderer = new Renderer.Renderer();
          renderer.addNode(HardBreak);
          renderer.addNode(SweepwidgetWidget);
          renderer.addNode(YoutubeWidget);
          renderer.addNode(PhotoWidget);
          renderer.addNode(PullQuote);
          doc.body = renderer.render({
            type: 'doc',
            content: JSON.parse(doc.body),
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    // use smart quotes (curly quotes)
    if (doc) {
      try {
        doc.name = smartquotes(doc.name);
      } catch {
        console.error(`failed to add smartquotes`);
      }
    }

    return insertDate([doc])[0];
  }

  throw error(err.status);
};
