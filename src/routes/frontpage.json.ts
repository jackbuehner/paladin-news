/* eslint-disable no-useless-escape */ // the triple backslash is required for graphql
import type { EndpointOutput } from '@sveltejs/kit';
import { variables } from '../variables';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(): Promise<EndpointOutput> {
  // query for front page content
  const GET_FRONT_PAGE = `
    query GetFrontPage($sort: JSON = "{ \\\"timestamps.published_at\\\": -1 }") {
      ${section('news', ['news'], 5)}
      ${section('opinion', ['opinion'], 6)}
      ${section('sports', ['sports'], 3)}
      ${section('diversity', ['diversity'], 3)}
      ${section('acc', ['arts', 'campus-culture'], 3)}
      featured: articleFeaturedDocsPublic {
        name
        slug
        timestamps {
          published_at
        }
        people {
          authors {
            name
            slug
            photo
          }
        }
        categories
        description
        photo_path
      }
    }
  `;

  // get the content
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_FRONT_PAGE,
    }),
  });
  const data = (await res.json()).data;

  // return the content
  if (data) {
    return {
      body: data,
    };
  }
  return null;
}

function section(label: string, categories?: string[], limit = 10) {
  return `
  ${label}: articlesPublic(
    limit: ${limit}
    page: 1
    sort: $sort
    filter: "{ \\"categories.0\\\": { \\\"$in\\\": [${categories.map(
      (cat) => `\\\"${cat}\\\"`
    )}] } }"
  ) {
    docs {
      name
      slug
      timestamps {
        published_at
      }
      people {
        authors {
          name
          slug
          photo
        }
      }
      categories
      description
      photo_path
    }
  }
  `;
}

export { get };
