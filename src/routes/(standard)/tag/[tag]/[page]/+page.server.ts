import { GET_ARTICLES, type GET_ARTICLES__TYPE } from '$lib/queries';
import { capitalize } from '$lib/utils';
import { api } from '$lib/utils/api';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  // remove special characters (including spaces) and leading or trailing hyphens and redirect
  const processedTag = processTag(request.params.tag);
  if (request.params.tag !== processedTag) {
    throw redirect(307, `/tag/${encodeURIComponent(processedTag)}/${request.params.page}`);
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

  // identify tags in the response that might be alternate forms of the tag
  // in the page param, and if there is an alternate form that is longer
  // (usually because it includes a hyphen or space) then redirect to that
  const allProcessedForms = Array.from(
    new Set(
      data?.articlesPublic?.docs
        .flatMap((doc) => doc.tags)
        .filter((tag) => tag.match(new RegExp(regex.$regex, regex.$options)))
        .map((tag) => processTag(tag)) || []
    )
  );
  if (allProcessedForms.length > 0) {
    const longestForm = allProcessedForms.reduce((a, b) => (a.length > b.length ? a : b));
    if (longestForm !== request.params.tag) {
      throw redirect(307, `/tag/${encodeURIComponent(longestForm)}/${request.params.page}`);
    }
  }

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

function processTag(tag: string): string {
  return tag
    .replaceAll('_', ' ') // replace underscores with spaces
    .replaceAll('-', ' ') // replace hyphens with spaces
    .trim() // remove leading and trailing spaces
    .replace(/ +(?= )/g, '') // remove multiple spaces
    .replace(/\s&/gm, '') // remove spaces before ampersands
    .replace(/\s/gm, '-') // replace spaces with hyphens
    .toLowerCase(); // convert to lowercase
}
