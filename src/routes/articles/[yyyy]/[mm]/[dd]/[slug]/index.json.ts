import { PhotoWidget } from '$lib/pm/render/PhotoWidget';
import { SweepwidgetWidget } from '$lib/pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '$lib/pm/render/YoutubeWidget';
import { GET_ARTICLE_BY_SLUG, type GET_ARTICLE_BY_SLUG__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import Renderer from '@cristata/prosemirror-to-html-js';
import type { RequestHandler } from '@sveltejs/kit';
import smartquotes from 'smartquotes';

export const get: RequestHandler<Record<'slug' | 'yyyy' | 'mm' | 'dd', string>> = async (
  request
) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = request.params;
  let { yyyy, mm, dd } = request.params;

  // set param null if '_' was passed
  if (yyyy === '_') yyyy = '';
  if (mm === '_') mm = '';
  if (dd === '_') dd = '';

  // request the article from the api
  const { data, error } = await api.query<GET_ARTICLE_BY_SLUG__TYPE>(GET_ARTICLE_BY_SLUG, {
    variables: { slug, date: yyyy && mm && dd ? `${yyyy}-${mm}-${dd}` : undefined },
  });
  const article = data?.articleBySlugPublic;

  // rename categories (sections) to their full names
  if (article) {
    try {
      article.categories = article.categories.map((category) => {
        if (category === 'opinions') return 'opinion';
        if (category === 'diversity') return 'diversity matters';
        if (category === 'campus-culture') return 'campus & culture';
        if (category === 'arts-culture') return 'arts & culture';
        return category;
      });
    } catch (err) {
      console.error(err);
    }
  }

  // convert the json body to html
  if (article?.body) {
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
  }

  // use smart quotes (curly quotes)
  if (article) {
    try {
      article.name = smartquotes(article.name);
      article.description = smartquotes(article.description);
      article.photo_caption = smartquotes(article.photo_caption);
    } catch {
      console.error(`failed to add smartquotes`);
    }
  }

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (article) return { body: { data: JSON.stringify(article) } };
  return { status: error.status };
};
