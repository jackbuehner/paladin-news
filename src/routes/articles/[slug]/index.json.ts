import type { IArticle } from 'src/interfaces/articles';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import Renderer from 'prosemirror-to-html-js';
import { variables } from '../../../variables';
import { SweepwidgetWidget } from '../../../pm/render/SweepwidgetWidget';

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
      body: article,
    };
  }
  return null;
}

export { get };
