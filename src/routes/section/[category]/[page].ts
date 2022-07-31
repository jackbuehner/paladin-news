import { GET_ARTICLES, type GET_ARTICLES__TYPE } from '$lib/queries';
import { capitalize } from '$lib/utils';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<{ category: string; page: string }> = async (request) => {
  if (request.params.category === 'pwabuilder-sw.js') return { status: 404 };

  // remove special characters and redirect
  if (request.params.category.indexOf(' ') !== -1 || request.params.category.indexOf('&') !== -1) {
    return {
      status: 302,
      redirect: `/section/${request.params.category.replace(/\s&/gm, '').replace(/\s/gm, '-')}`,
    };
  }

  // redirect satire category to satire page
  if (request.url.pathname.toLowerCase() === '/section/satire') {
    return {
      status: 302, // temporary redirect
      redirect: `/satire`,
    };
  }

  // generate the categories for the query
  let categories = [];
  if (request.params.category === 'diversity-matters') categories = ['diversity'];
  else if (request.params.category === 'opinions') categories = ['opinion'];
  else if (request.params.category === 'arts-culture') categories = ['arts', 'campus-culture'];
  else if (request.params.category === 'arts-campus-culture')
    categories = ['arts', 'campus-culture'];
  else categories = [request.params.category];

  // format the name of the category
  const pagePathToTitle = (string: string): string => {
    string.replace('/', ''); // remove and slashes
    if (string === 'diversity-matters') return 'Diversity Matters';
    else if (string === 'arts-culture') return 'Arts, Campus, & Culture';
    else if (string === 'arts-campus-culture') return 'Arts, Campus, & Culture';
    else if (string === 'campus-culture') return 'Campus & Culture';
    else return capitalize(string, true);
  };

  // define the variables for the query
  const limit = 25;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({
    categories: { $in: categories },
    'timestamps.published_at': { $exists: true },
  });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // get the articles in the category
  const { data, error } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
    variables: { limit, page, filter, sort },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.articlesPublic)
    return {
      body: {
        data: JSON.stringify(data.articlesPublic),
        pageTitle: pagePathToTitle(request.params.category),
      },
    };
  return { status: error.status };
};
