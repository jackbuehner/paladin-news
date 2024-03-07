import {
  GET_ARTICLES,
  GET_FRONT_PAGE_2022,
  GET_SATIRES,
  type GET_ARTICLES__TYPE,
  type GET_FRONT_PAGE_2022__TYPE,
  type GET_SATIRES__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data, error: err } = await api.query<GET_FRONT_PAGE_2022__TYPE>(GET_FRONT_PAGE_2022, {
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.articleFrontPagePublic?.[0]) {
    const frontPageArticles = [
      ...data.articleFrontPagePublic[0].news,
      ...data.articleFrontPagePublic[0].opinion,
      ...data.articleFrontPagePublic[0].sports,
      ...data.articleFrontPagePublic[0].acc,
      ...data.articleFrontPagePublic[0].featured,
      ...data.articleFrontPagePublic[0].diversity,
    ];

    const moreArticles = await getArticles(frontPageArticles.map(({ slug }) => slug));

    const chronologicalArticles = [...frontPageArticles, ...moreArticles].sort((a, b) => {
      return new Date(a.timestamps.published_at) > new Date(b.timestamps.published_at) ? -1 : 1;
    });

    // get the chronological index of the last article inside moreArticles,
    // which should represent how far into the "all articles" list
    // that the home page goes
    const lastMoreArticlesChrologicalIndex = chronologicalArticles.findIndex(
      (chronologicalArticle) => {
        return chronologicalArticle.slug === moreArticles.slice(-1)[0].slug;
      }
    );

    // determine which page of more articles that the home page
    // should link so that there is no need scroll through pages
    // with articles that are already on the front page
    const nextPage = Math.ceil(lastMoreArticlesChrologicalIndex / 10);
    const nextPageSkipIndex = (lastMoreArticlesChrologicalIndex - 1) % 10;
    const nextPageLink = `/all-articles/${nextPage}?skip=${nextPageSkipIndex}`;

    return {
      ...data.articleFrontPagePublic[0],
      satires: getSatires(),
      articles: moreArticles,
      nextPageLink,
    };
  }

  throw error(err.status);
};

async function getSatires() {
  // define the variables for the query
  const limit = 4;
  const page = 1;
  const filter = JSON.stringify({ 'timestamps.published_at': { $exists: true } });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // request the satires from the api
  const { data } = await api.query<GET_SATIRES__TYPE>(GET_SATIRES, {
    variables: { limit, page, filter, sort },
  });

  if (data?.satiresPublic) return data.satiresPublic.docs;
  return [];
}

async function getArticles(excludeSlugs: string[]) {
  // define the variables for the query
  const limit = 15;
  const page = 1;
  const filter = JSON.stringify({
    'timestamps.published_at': { $exists: true },
    slug: { $nin: excludeSlugs },
  });
  const sort = JSON.stringify({ 'timestamps.published_at': -1 });

  // request the satires from the api
  const { data, error } = await api.query<GET_ARTICLES__TYPE>(GET_ARTICLES, {
    variables: { limit, page, filter, sort },
  });

  if (data?.articlesPublic) return data.articlesPublic.docs;
  return [];
}
