import type { IArticle } from 'src/interfaces/articles';

function insertDate(articles: IArticle[]) {
  return articles.map((article) => {
    // get month, date, and year from article publish timestamp
    if (article.timestamps && article.timestamps.published_at) {
      const pubTimestamp = new Date(article.timestamps.published_at);
      const date = {
        day: pubTimestamp.getUTCDate(),
        month: pubTimestamp.getUTCMonth(),
        year: pubTimestamp.getUTCFullYear(),
      };
      return { ...article, date };
    }
    return article;
  });
}

export { insertDate };
