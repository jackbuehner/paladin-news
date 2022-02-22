/* eslint-disable no-useless-escape */
import 'dotenv/config';
import fetch from 'node-fetch';

const hostUrl = 'https://api.thepaladin.cristata.app';

/**
 * Fetch the newest satires.
 */
async function fetchLatestSatire(limit = 10, page = 1) {
  const GET_SATIRES = `
    query GetSatires(
      $page: Int = 1,
      $limit: Int = 10,
      $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
      $filter: JSON = null,
    ) {
      satiresPublic(
        limit: $limit,
        page: $page,
        sort: $sort,
        filter: $filter,
      ) {
        docs {
          _id
          name
          slug
          timestamps {
            published_at
          },
          people {
            display_authors
          }
          description
        }
        totalDocs
        limit
        page
        totalPages
        nextPage
        prevPage
        hasPrevPage
        hasNextPage
      }
    }
  `;

  // request the satires from the api
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_SATIRES,
      variables: {
        limit,
        page,
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
  const resJson = await res.json(); // get the response as JSON
  const satires = resJson?.data?.satiresPublic; // identify the articles response

  // return the satires
  return { data: satires, ok: res.ok };
}

/**
 * Fetch the newest articles.
 */
async function fetchLatest(limit = 10, page = 1) {
  const GET_ARTICLES = `
    query GetArticles(
      $page: Int = 1,
      $limit: Int = 10,
      $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
      $filter: JSON = null,
      $featured: Boolean = false,
    ) {
      articlesPublic(
        limit: $limit,
        page: $page,
        sort: $sort,
        filter: $filter,
        featured: $featured,
      ) {
        docs {
          _id
          name
          slug
          timestamps {
            published_at
          },
          people {
            authors {
              name
            }
          }
          categories
          description
        }
        totalDocs
        limit
        page
        totalPages
        nextPage
        prevPage
        hasPrevPage
        hasNextPage
      }
    }
  `;

  // request the articles from the api
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_ARTICLES,
      variables: {
        limit,
        page,
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
  const resJson = await res.json(); // get the response as JSON
  const articles = resJson?.data?.articlesPublic; // identify the articles response

  // return the articles
  return { data: articles, ok: res.ok };
}

export { fetchLatest };

export { fetchLatestSatire };

const getAlgoliaData = {
  articles: async () => {
    console.log('Fetching articles...');

    // store all articles in this array as they are retrieved
    let articles = [];

    // loop until there are no more pages of articles
    let pageNumber = 1;
    let isMore = true;
    while (isMore) {
      // get a page of articles
      const { data } = await fetchLatest(100, pageNumber);
      const { docs, hasNextPage } = data;

      // set whether there are more articles on another page
      isMore = hasNextPage;

      // push the articles from this page into the articles array
      articles.push(...docs);

      // incriment the page number
      pageNumber++;
    }

    // return all of the articles
    return articles;
  },
  satire: async () => {
    console.log('Fetching satire...');

    // store all satire articles in this array as they are retrieved
    let articles = [];

    // loop until there are no more pages of satire articles
    let pageNumber = 1;
    let isMore = true;
    while (isMore) {
      // get a page of articles
      const { data } = await fetchLatestSatire(50, pageNumber);
      const { docs, hasNextPage } = data;

      // set whether there are more satire articles on another page
      isMore = hasNextPage;

      // push the satire articles from this page into the articles array
      articles.push(...docs);

      // incriment the page number
      pageNumber++;
    }

    // return all of the satire articles
    return articles;
  },
};

const algoliaConfig = {
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indices: [
    {
      name: 'articles',
      getData: getAlgoliaData.articles,
      settings: {
        searchableAttributes: ['name', 'description', 'people.authors.name', 'body'],
      },
    },
    {
      name: 'satire',
      getData: getAlgoliaData.satire,
      settings: {
        searchableAttributes: ['name', 'description', 'people.display_authors', 'body'],
      },
    },
  ],
  verbosity: 2,
  partialUpdates: true,
  matchFields: ['_id'],
};

if (process.env.ALGOLIA_APP_ID && process.env.ALGOLIA_ADMIN_KEY) {
  const { indexAlgolia } = await import(`svelte-algolia/main.js`);
  indexAlgolia(algoliaConfig);
}
