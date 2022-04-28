/* eslint-disable no-useless-escape */
import fs from 'fs';
import { fetch } from '@sveltejs/kit/install-fetch';
import dotenv from 'dotenv';

// make .env available
dotenv.config();

const GET_ARTICLE_SLUGS = `
  query GetArticles(
    $page: Int = 1,
    $limit: Int = 100,
    $filter: JSON = "{\\\"stage\\\":5.2}",
  ) {
    articlesPublic(
      limit: $limit,
      page: $page,
      filter: $filter,
    ) {
      docs {
        slug,
        timestamps {
          published_at,
        },
      }
      page,
      totalPages,
      nextPage,
      hasNextPage,
    }
  }
`;

console.log(`GENERATING LIST OF ARTICLE PATHS`);

async function generate() {
  /**
   * Fetches all published articles from the API.
   */
  const fetchArticles = async () => {
    let articles = [];
    let page = 1;
    let lastPage = 1;
    const limit = 100;
    let checkNextPage = true;

    /**
     * Get a batch of articles from the API.
     */
    const getBatch = async () => {
      // request the articles from the api
      const hostUrl = `${process.env.VITE_SERVER_PROTOCOL}://${process.env.VITE_SERVER_URL}`;
      const res = await fetch(`${hostUrl}/v3/paladin-news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: GET_ARTICLE_SLUGS,
          variables: { page, limit },
        }),
      });

      // check for documents
      const json = await res.json();
      const { docs, hasNextPage, totalPages } = json.data.articlesPublic;

      // push the documents to the array
      articles.push(...docs);

      // set the total pages
      lastPage = totalPages;

      // increment the page
      page += 1;

      // set whether we need to get the next page
      checkNextPage = hasNextPage;
    };

    // keep getting the next page of articles until there no more pages left
    console.log(`💫  Fetching articles...              0%`);
    while (checkNextPage === true) {
      await getBatch();
      // @ts-expect-error "it's fine"
      const progress = (page / lastPage).toFixed(2) * 100;
      console.log(`💫  Fetching articles...             ${progress < 100 ? progress : 99}%`);
    }
    console.log(`☑️  Fetched all articles`);

    // return the articles
    return articles;
  };

  console.log(`💫  Generating article paths...`);
  const articlePaths = (await fetchArticles()).map((article) => {
    const publishedAt = new Date(article.timestamps.published_at);
    const year = publishedAt.getUTCFullYear();
    const month = publishedAt.getUTCMonth();
    const date = publishedAt.getUTCDate();
    const slug = article.slug;
    const path = `/articles/${year}/${month}/${date}/${slug}`;
    return path;
  });
  console.log(`☑️  Generated article paths`);

  // write paths to file
  console.log(`💫  Writing paths to file...`);
  fs.writeFileSync('articles.json', JSON.stringify([...articlePaths]));
  console.log(`✅  Done!`);
  console.log(``);
}

generate();
