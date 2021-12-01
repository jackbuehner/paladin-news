import type { IArticle } from 'src/interfaces/articles';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import Renderer from '@cristata/prosemirror-to-html-js';
import { variables } from '../../../../../../variables';
import { SweepwidgetWidget } from '../../../../../../pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '../../../../../../pm/render/YoutubeWidget';
import { PhotoWidget } from '../../../../../../pm/render/PhotoWidget';
import { insertDate } from '../../../../../../utils/insertDate';

interface IArticleOutput extends IArticle {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IArticleOutput>> {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = request.params;
  let { yyyy, mm, dd } = request.params;

  // set param null if '_' was passed
  if (yyyy === '_') yyyy = null;
  if (mm === '_') mm = null;
  if (dd === '_') dd = null;

  // TODO: switch to GraphQL API
  // TODO: require article to be from the specified date if the date is not null

  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/api/v2/articles/public/${slug}`);
  const article: IArticle = await res.json();

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

  if (article) {
    return {
      body: insertDate([article])[0],
    };
  }
  return null;
}

export { get };
