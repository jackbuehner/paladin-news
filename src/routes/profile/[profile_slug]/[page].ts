import {
  GET_ARTICLES,
  type GET_ARTICLES__TYPE,
  GET_USER_BY_SLUG,
  type GET_USER_BY_SLUG__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler<{ profile_slug: string; page: string }> = async (request) => {
  const { profile_slug, page } = request.params;
  if (profile_slug === 'pwabuilder-sw.js') return { status: 404 };

  // get the profile
  const { data: profile, error: profileError } = await api.query<GET_USER_BY_SLUG__TYPE>(
    GET_USER_BY_SLUG,
    {
      variables: { slug: profile_slug },
    }
  );

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

  // return the profile to the page
  if (profile?.userBySlugPublic && articles?.articlesPublic) {
    return {
      body: {
        data: JSON.stringify({
          profile: profile.userBySlugPublic,
          articles: articles.articlesPublic,
        }),
      },
    };
  }

  // otherwise, return the errors
  if (profile) return { status: articleError.status };
  return { status: profileError.status };
};
