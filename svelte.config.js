import preprocess from 'svelte-preprocess';
import netlify from '@sveltejs/adapter-netlify';
import { indexAlgolia } from 'svelte-algolia/main.js';
import 'dotenv/config';
import fetch from 'node-fetch';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    // optimize the build for netlify
    adapter: netlify(),
    files: {
      lib: 'src',
    },
    prerender: {
      crawl: true,
      enabled: true,
      force: true,
      pages: ['*'],
    },
  },
};

const getAlgoliaData = {
  articles: async () => {
    // store all articles in this array as they are retrieved
    let articles = [];

    // loop until there are no more pages of articles
    let pageNumber = 1;
    let isMore = true;
    while (isMore) {
      // get a page of articles
      const hostUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001'
          : 'https://api.thepaladin.cristata.app';
      const res = await fetch(`${hostUrl}/api/v2/articles/public?limit=100&page=${pageNumber}`);
      const { docs, hasNextPage } = await res.json();

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
    // store all satire articles in this array as they are retrieved
    let articles = [];

    // loop until there are no more pages of satire articles
    let pageNumber = 1;
    let isMore = true;
    while (isMore) {
      // get a page of articles
      const hostUrl =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3001'
          : 'https://api.thepaladin.cristata.app';
      const res = await fetch(`${hostUrl}/api/v2/satire/public?limit=100&page=${pageNumber}`);
      const { docs, hasNextPage } = await res.json();

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
  partialUpdates: false,
};

if (
  process.env.NODE_ENV === 'production' &&
  process.env.ALGOLIA_APP_ID &&
  process.env.ALGOLIA_ADMIN_KEY
)
  indexAlgolia(algoliaConfig);

export default config;
