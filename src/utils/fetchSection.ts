import { GET_ARTICLES, type GET_ARTICLES__DOC_TYPE, type Paged } from '$lib/queries';
import { variables } from '$lib/variables';

async function fetchSection(
  section: string,
  limit = 10
): Promise<{ data: Paged<GET_ARTICLES__DOC_TYPE>; ok: boolean }> {
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
          categories: { $in: section.split(',') },
          'timestamps.published_at': { $exists: true },
        }),
      },
    }),
  });

  // proces the response
  const resJson = await res.json(); // get the response as JSON
  const articles = resJson?.data?.articlesPublic; // identify the articles response

  // return the articles
  return { data: articles, ok: res.ok };
}

export { fetchSection };
