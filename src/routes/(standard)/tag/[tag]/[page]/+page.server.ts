import { GET_ARTICLES, type GET_ARTICLES__TYPE } from '$lib/queries';
import { capitalize } from '$lib/utils';
import { api } from '$lib/utils/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // remove special characters (including spaces) and redirect
  if (request.params.tag.indexOf(' ') !== -1 || request.params.tag.indexOf('&') !== -1) {
    throw redirect(
      307, // temporary redirect
      `/tag/${encodeURIComponent(request.params.tag.replace(/\s&/gm, '').replace(/\s/gm, '-'))}`
    );
  }

  // generate the tags for the query
  let tags = [];
  if (request.params.tag === 'influential-paladin') tags = ['influentialpaladin'];
  // handle variants in spaces, hypthens, captilization
  else
    tags = [
      request.params.tag,
      request.params.tag.replaceAll('-', ' '),
      request.params.tag.replaceAll('-', ''),
      request.params.tag.toLocaleLowerCase(),
      request.params.tag.toLocaleLowerCase().replaceAll('-', ' '),
      request.params.tag.toLocaleLowerCase().replaceAll('-', ''),
    ];

  // format the name of the tag
  const pagePathToTitle = (string: string): string => {
    string = string.replaceAll('/', '');
    string = string.replaceAll('-', ' ');
    return capitalize(string, true);
  };

  // define the variables for the query
  const limit = 25;
  const page = parseInt(request.params.page);
  const filter = JSON.stringify({
    tags: { $in: tags },
    'timestamps.published_at': { $exists: true },
  });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // get the articles with the tag
  const { data, error: err } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
    variables: { limit, page, filter, sort },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.articlesPublic) {
    return {
      articles: data.articlesPublic,
      pageTitle: pagePathToTitle(request.params.tag),
    };
  }

  throw error(err.status);
};
