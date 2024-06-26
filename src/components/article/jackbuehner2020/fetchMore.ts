import type { GET_ARTICLES__DOC_TYPE, GET_ARTICLES__JSON, Paged } from '$lib/queries';
import { GET_ARTICLES } from '$lib/queries';
import { variables } from '$lib/variables';

/**
 * Fetch more articles to show at the bottom of an article page.
 *
 * @param exclude array of object ids to exclude
 */
async function fetchMore(
  exclude: string[],
  limit = 10
): Promise<{ data: Paged<GET_ARTICLES__DOC_TYPE> | null; ok: boolean; status: number }> {
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;

  // request the articles from the api
  const res = await fetch(`${hostUrl}/v3/paladin-news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLES,
      variables: {
        limit,
        filter: JSON.stringify({
          _id: { $nin: exclude },
          'timestamps.published_at': { $exists: true },
        }),
      },
    }),
  });

  // proces the response
  const resJson: GET_ARTICLES__JSON = await res.json(); // get the response as JSON
  const articles = resJson?.data?.articlesPublic; // identify the articles response

  // return the articles
  return { data: articles || null, ok: res.ok, status: res.status };
}

export { fetchMore };
