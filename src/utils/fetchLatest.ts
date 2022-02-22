import { GET_ARTICLES } from '../queries';
import type { GET_ARTICLES__DOC_TYPE, GET_ARTICLES__JSON, Paged } from '../queries';
import { variables } from '../variables';

/**
 * Fetch the newest articles.
 */
async function fetchLatest(
  limit = 10
): Promise<{ data: Paged<GET_ARTICLES__DOC_TYPE>; ok: boolean }> {
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;

  // request the articles from the api
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLES,
      variables: {
        limit,
        filter: JSON.stringify({
          'timestamps.published_at': { $exists: true },
        }),
        sort: JSON.stringify({
          'timestamps.published_at': -1,
        }),
      },
    }),
  });

  // proces the response
  const resJson: GET_ARTICLES__JSON = await res.json(); // get the response as JSON
  const articles = resJson?.data?.articlesPublic; // identify the articles response

  // return the articles
  return { data: articles, ok: res.ok };
}

export { fetchLatest };
