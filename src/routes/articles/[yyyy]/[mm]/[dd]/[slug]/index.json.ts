import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import Renderer from '@cristata/prosemirror-to-html-js';
import { variables } from '../../../../../../variables';
import { SweepwidgetWidget } from '../../../../../../pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '../../../../../../pm/render/YoutubeWidget';
import { PhotoWidget } from '../../../../../../pm/render/PhotoWidget';
import { insertDate } from '../../../../../../utils/insertDate';
import { GET_ARTICLE_BY_SLUG, GET_ARTICLE_BY_SLUG__DOC_TYPE } from '../../../../../../queries';
import type { GET_ARTICLE_BY_SLUG__JSON } from '../../../../../../queries';
import { string as smartquotes } from 'smartquotes';

interface Output extends GET_ARTICLE_BY_SLUG__DOC_TYPE {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<Output>> {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = request.params;
  let { yyyy, mm, dd } = request.params;

  // set param null if '_' was passed
  if (yyyy === '_') yyyy = null;
  if (mm === '_') mm = null;
  if (dd === '_') dd = null;

  // request the article from the api
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLE_BY_SLUG,
      variables: { slug, date: yyyy && mm && dd ? `${yyyy}-${mm}-${dd}` : undefined },
    }),
  });

  // get the article from the response
  const json: GET_ARTICLE_BY_SLUG__JSON = await res.json();
  if (json.errors) return { status: 500 };
  const article = json.data?.articleBySlugPublic;

  // rename categories (sections) to their full names
  try {
    article.categories = article.categories.map((category) => {
      const match = {
        opinions: 'opinion',
        diversity: 'diversity matters',
        'campus-culture': 'campus & culture',
        'arts-culture': 'arts & culture',
      };
      return match[category] || category;
    });
  } catch (err) {
    console.error(err);
  }

  // convert the json body to html
  try {
    // if the body is not html, convert json to html (check with closing p tag)
    if (!article.body.includes('</p>')) {
      const renderer = new Renderer.Renderer();
      renderer.addNode(SweepwidgetWidget);
      renderer.addNode(YoutubeWidget);
      renderer.addNode(PhotoWidget);
      article.body = renderer.render({
        type: 'doc',
        content: JSON.parse(article.body),
      });
    }
  } catch (err) {
    console.error(err);
  }

  // use smart quotes (curly quotes)
  try {
    article.name = smartquotes(article.name);
    article.description = smartquotes(article.description);
    article.photo_caption = smartquotes(article.photo_caption);
  } catch {
    console.error(`failed to add smartquotes`);
  }

  if (article) {
    return {
      body: insertDate([article])[0],
    };
  }
  return null;
}

export { get };
