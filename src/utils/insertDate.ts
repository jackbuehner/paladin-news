import type { IArticle } from 'src/interfaces/articles';

function insertDate(articles: IArticle[]) {
  return articles.map((article) => {
    // get month, date, and year from article publish timestamp
    if (article.timestamps && article.timestamps.published_at) {
      const pubTimestamp = new Date(article.timestamps.published_at);
      const date = {
        day: pubTimestamp.getUTCDate().toString().padStart(2, '0'),
        month: `${pubTimestamp.getUTCMonth() + 1}`.padStart(2, '0'), // +1 because January === 0
        year: pubTimestamp.getUTCFullYear(),
      };
      return { ...article, date };
    }
    return article;
  });
}

export { insertDate };
