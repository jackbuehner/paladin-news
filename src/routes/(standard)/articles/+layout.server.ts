import type { GET_ARTICLE_BY_SLUG__DOC_TYPE } from '$lib/queries';
import { insertDate } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (a) => {
  const params = a.params as Record<string, string>;

  // build date string from date params
  const date: Record<'year' | 'month' | 'day' | 'path', string | undefined> = {
    year: undefined,
    month: undefined,
    day: undefined,
    path: undefined,
  };
  if (params.yyyy && parseInt(params.yyyy) >= 1000 && parseInt(params.yyyy) < 10000)
    date.year = params.yyyy;
  if (params.mm && parseInt(params.mm) > 0 && parseInt(params.mm) <= 12)
    date.month = params.mm.padStart(2, '0'); // ensure it is always two digits
  if (params.dd && parseInt(params.dd) > 0 && parseInt(params.dd) <= 31)
    date.day = params.dd.padStart(2, '0'); // ensure it is always two digits
  if (date.year && date.month && date.day) {
    date.path = '/' + date.year + '/' + date.month + '/' + date.day;
  }

  // fetch the data
  const endpoint = `${a.url.origin}/articles${date.path || '/_/_/_'}/${params.slug}/data`;
  const res = await fetch(endpoint);
  const article: GET_ARTICLE_BY_SLUG__DOC_TYPE = await res.json();

  if (res.ok && article) {
    return insertDate([article])[0];
  }

  throw error(res.status, `Could not load ${endpoint}`);
};
