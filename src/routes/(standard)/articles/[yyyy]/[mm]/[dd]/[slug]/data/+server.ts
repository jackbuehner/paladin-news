import { HardBreak } from '$lib/pm/render/HardBreak';
import { PhotoWidget } from '$lib/pm/render/PhotoWidget';
import { PullQuote } from '$lib/pm/render/PullQuote';
import { SweepwidgetWidget } from '$lib/pm/render/SweepwidgetWidget';
import { YoutubeWidget } from '$lib/pm/render/YoutubeWidget';
import { GET_ARTICLE_BY_SLUG, type GET_ARTICLE_BY_SLUG__TYPE } from '$lib/queries';
import { api } from '$lib/utils/api';
import Renderer from '@cristata/prosemirror-to-html-js';
import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import smartquotes from 'smartquotes';
import { Response } from 'undici';

export const GET: RequestHandler = async (request) => {
  // the `slug` parameter is available because this file
  // is called [slug].json.ts
  const { slug } = request.params;
  let { yyyy, mm, dd } = request.params;

  // set param null if '_' was passed
  if (yyyy === '_') yyyy = '';
  if (mm === '_') mm = '';
  if (dd === '_') dd = '';

  // request the article from the api
  const { data, error: err } = await api.query<GET_ARTICLE_BY_SLUG__TYPE>(GET_ARTICLE_BY_SLUG, {
    variables: { slug, date: yyyy && mm && dd ? `${yyyy}-${mm}-${dd}` : undefined },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.articleBySlugPublic) {
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
          renderer.addNode(HardBreak);
          renderer.addNode(SweepwidgetWidget);
          renderer.addNode(YoutubeWidget);
          renderer.addNode(PhotoWidget);
          renderer.addNode(PullQuote);
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

    return new Response(JSON.stringify(article));
  }

  // redirect forward by one day in case there is a time zone issue
  // (the old website used GMT+4 timestamps, but now we use GMT+0)
  if (err.status === 200) {
    if (request.url.searchParams.get('shouldStopGoingForward') === '1') {
      throw error(404);
    } else {
      const date = new Date(`${yyyy}-${mm}-${dd}`);
      date.setDate(date.getDate() + 1);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = (date.getDate() + 1).toString().padStart(2, '0');

      const url = `${request.url.origin}/articles/${year}/${month}/${day}/${slug}/data?shouldStopGoingForward=1`;

      throw redirect(307, url);
    }
  }

  throw error(err.status);
};
