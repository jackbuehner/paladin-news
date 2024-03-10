import { GET_ARTICLES, type GET_ARTICLES__TYPE } from '$lib/queries';
import { capitalize } from '$lib/utils';
import { api } from '$lib/utils/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // remove special characters (including spaces) and leading or trailing hyphens and redirect
  if (
    request.params.tag.indexOf(' ') !== -1 ||
    request.params.tag.indexOf('&') !== -1 ||
    request.params.tag.startsWith('-') ||
    request.params.tag.endsWith('-') ||
    request.params.tag.includes('_') ||
    !!request.params.tag.match(/[A-Z]+/g) // if there are any capital letters
  ) {
    throw redirect(
      307, // temporary redirect
      `/tag/${encodeURIComponent(
        request.params.tag
          .replaceAll('_', ' ')
          .replaceAll('-', ' ')
          .trim()
          .replace(/\s&/gm, '')
          .replace(/\s/gm, '-')
          .toLowerCase()
      )}`
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

  // generate a regex for the query that
  // ignores spaces, hyphens, and case
  const regex = {
    $regex:
      // allow any number and combination of leading spaces and hyphens
      '([ -]*)' +
      request.params.tag
        // nornamlize to lowercase
        .toLocaleLowerCase()
        // normalize to not include hyphens
        .replaceAll('-', '')
        // allow any number and combination of spaces and hyphens between each character
        .split('')
        .map((char) => `${char}([ -]*)`)
        .join(''),
    // ignore case
    $options: 'i',
  };

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
    $or: [{ tags: { $in: tags } }, { tags: regex }],
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
