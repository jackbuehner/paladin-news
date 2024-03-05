import {
  GET_ARTICLES,
  GET_USER_BY_SLUG,
  type GET_ARTICLES__TYPE,
  type GET_USER_BY_SLUG__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  const { profile_slug, page } = request.params;
  if (profile_slug === 'pwabuilder-sw.js') throw error(404);

  // get the profile
  const { data: profile, error: profileError } = await api.query<GET_USER_BY_SLUG__TYPE>(
    GET_USER_BY_SLUG,
    {
      variables: { slug: profile_slug },
    }
  );

  if (!profile?.userBySlugPublic) {
    throw error(404);
  }

  // get articles from this person
  const { data: articles, error: articleError } = await api.query<GET_ARTICLES__TYPE>(
    GET_ARTICLES,
    {
      variables: {
        page: parseInt(page),
        filter: JSON.stringify({ 'people.authors': profile?.userBySlugPublic?._id }),
      },
    }
  );

  if (articleError.errors) {
    throw error(400, JSON.stringify(articleError.errors));
  }

  // return the profile to the page
  if (profile?.userBySlugPublic && articles?.articlesPublic) {
    return {
      profile: profile.userBySlugPublic,
      articles: articles.articlesPublic,
    };
  }

  throw error(profileError.status);
};
