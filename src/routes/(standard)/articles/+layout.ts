import {
  GET_ARTICLES,
  type GET_ARTICLES__DOC_TYPE,
  type GET_ARTICLES__TYPE,
  type GET_ARTICLE_BY_SLUG__DOC_TYPE,
} from '$lib/queries';
import { insertDate } from '$lib/utils';
import { api } from '$lib/utils/api';
import type { PublishedDocWithDate } from '$lib/utils/insertDate';
import { error, redirect } from '@sveltejs/kit';
import { derived, get, writable } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (a) => {
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

  // this slug appeared when crawling the site, but it is wrong
  if (params.slug === 'SUPREME COURT OF SOUTH CAROLINA' && date.path) {
    throw redirect(
      302,
      `/articles${date.path}/supreme-court-of-south-carolina-to-hear-four-cases-at-furman`
    );
  }

  // fetch the data
  const endpoint = `${a.url.origin}/articles${date.path || '/_/_/_'}/${params.slug}/data`;
  const res = await a.fetch(endpoint);
  const _article: RespondedArticle | null = await (() => {
    try {
      if (res.status === 307) return null;
      return res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  })();

  if (res.ok && _article) {
    const article = writable<PublishedDocWithDate<RespondedArticle>>(insertDate([_article])[0]);

    // attempt to get more data on the series
    await new Promise<void>((resolve, reject) => {
      let loadingSeriesState: 'none' | 'loading' | 'loaded' = 'none';
      article.subscribe(async ($article) => {
        if ($article?.series && !$article.series.articles && loadingSeriesState === 'none') {
          loadingSeriesState = 'loading';
          article.set({
            ...$article,
            series: {
              ...$article.series,
              _loading: true,
            },
          });
          const { data } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
            variables: {
              limit: 3,
              page: 1,
              filter: JSON.stringify({
                series: $article.series._id,
                'timestamps.published_at': { $exists: true },
                _id: { $nin: [$article._id] },
              }),
              sort: JSON.stringify({ 'timestamps.published_at': -1 }),
            },
          });
          loadingSeriesState = 'loaded';
          article.set({
            ...$article,
            series: {
              ...$article.series,
              articles: data?.articlesPublic?.docs || [],
              _loading: false,
            },
          });
          resolve();
        }
      });
    });

    return {
      article: derived(article, (_) => _), // return a read-only version of the store
      date: get(article).date,
      slug: get(article).slug ?? params.slug,
    };
  }

  if (res.status === 307) {
    throw error(404, `Could not find article "${params.slug}" due to a missing or invalid date`);
  }
  throw error(500, `Could not load ${endpoint}`);
};

export type RespondedArticle = GET_ARTICLE_BY_SLUG__DOC_TYPE & {
  series?: {
    articles?: GET_ARTICLES__DOC_TYPE[];
    _loading?: boolean;
  };
};
