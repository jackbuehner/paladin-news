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

    // replace broken image links (webflow changed the hosting location for some images)
    [
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/608efd91b35e4dc01463ffdf_Asheton%2520_Howard_FFC01A25-0E06-457E-92BC-A2A6BAC5E838.jpeg',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/608efddfcf0722f7cb0335e8_Ella%2520_Alsko_A68688AD-85DC-4CF7-A7EE-38F44BC80F19.jpeg',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60536d5bb87e8b713ee5bf15_Screen%2520Shot%25202021-03-18%2520at%252011.09.23%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60536e5cb1a72481f4b17e9f_Screen%2520Shot%25202021-03-18%2520at%252011.12.26%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/603682914ef3fe249074ced1_Screen%2520Shot%25202021-02-24%2520at%252011.44.25%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/603683011b35e21012e95942_Screen%2520Shot%25202021-02-24%2520at%252011.46.40%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60368337f8d933bac45161fc_Screen%2520Shot%25202021-02-24%2520at%252011.47.40%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60368369a35ef33d8114bd27_Screen%2520Shot%25202021-02-24%2520at%252011.48.23%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60368397d2cfc5481abc6104_Screen%2520Shot%25202021-02-24%2520at%252011.49.14%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/603683c24b2094c0ee44fe25_Screen%2520Shot%25202021-02-24%2520at%252011.50.00%2520AM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/5fc55e42651607fa06cbc89a_Screen%2520Shot%25202020-11-30%2520at%25204.03.50%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/5fc55f85739e5d4eb417761f_Screen%2520Shot%25202020-11-30%2520at%25204.09.14%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/5fc55fbf3e2fe001cb2a65e1_Screen%2520Shot%25202020-11-30%2520at%25204.10.08%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/5fc56048556cd226a05a1a73_Screen%2520Shot%25202020-11-30%2520at%25204.12.28%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60670e44ee8ced7f127f4f06_Screen%2520Shot%25202021-03-31%2520at%25207.33.04%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/60670e75da2f6a735af70914_Screen%2520Shot%25202021-03-31%2520at%25207.51.33%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/6010501a6512f3a0804217b1_Screen%2520Shot%25202021-01-26%2520at%252012.23.22%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/601050966f449a099741b001_Screen%2520Shot%25202021-01-26%2520at%252012.25.29%2520PM.png',
      'https://uploads-ssl.webflow.com/5f37fcdc1b6edd6760ad912f/601050b22caee061eebec7f5_Screen%2520Shot%25202021-01-26%2520at%252012.26.00%2520PM.png',
    ].forEach((substr) => {
      if (article.body) {
        article.body = article.body.replace(
          substr,
          decodeURIComponent(substr).replace(
            'https://uploads-ssl.webflow.com/',
            'https://assets-global.website-files.com/'
          )
        );
      }
    });

    // wordpress requires this one image link to have a resize transform
    if (article.body?.includes('https://furmanmediacom.files.wordpress.com/2018/10/file2.jpeg')) {
      article.body = article.body.replace(
        'https://furmanmediacom.files.wordpress.com/2018/10/file2.jpeg',
        'https://furmanmediacom.files.wordpress.com/2018/10/file2.jpeg?resize=4032x3024'
      );
    }

    // these image locations are wrong and need to be replaced with the correct locations
    const replacements = [
      {
        old: 'https://furmanpaladin.files.wordpress.com/2015/10/spurrier-e1446158748371.jpg?w=300',
        new: 'https://furmanpaladin.files.wordpress.com/2015/10/spurrier-e1446580800403.jpg?w=300',
      },
      {
        old: 'https://furmanpaladin.files.wordpress.com/2015/10/epa-e1446156918462.jpg?w=300',
        new: 'https://furmanpaladin.files.wordpress.com/2015/10/epa-e1446580988675.jpg?w=300',
      },
    ];
    replacements.forEach((replacement) => {
      if (article.body?.includes(replacement.old)) {
        article.body = article.body.replace(replacement.old, replacement.new);
      }
    });

    // fix broken links in the article body
    if (article.body?.includes('thetrevorproject.org/get-help-now')) {
      article.body = article.body.replace(
        'href="thetrevorproject.org/get-help-now/"',
        'href="https://thetrevorproject.org/get-help-now/"'
      );
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

    // make links to the website relative
    if (article.body) {
      article.body = article.body.replaceAll('href="https://thepaladin.news/', 'href="/');
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
