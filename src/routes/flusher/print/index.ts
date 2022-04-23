import type { Flusher, FlusherEvent } from '$lib/components/Flusher';
import { hasProperty } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';
import JSONCrush from 'jsoncrush';

export const get: RequestHandler<never> = async (request) => {
  const data: Record<string, unknown> = request.url.searchParams.has('data')
    ? JSON.parse(JSONCrush.uncrush(request.url.searchParams.get('data') as string))
    : null;

  if (data) {
    const flusher: Flusher = {
      volume: typeof data.volume === 'number' ? data.volume : 0,
      issue: typeof data.issue === 'number' ? data.issue : 0,
      timestamps: {
        week:
          // TODO: check validity of timestamp
          hasProperty(data.timestamps, 'week') && typeof data.timestamps.week === 'string'
            ? data.timestamps.week
            : '1970-01-01',
      },
      leftAdvertPhoto:
        typeof data.left_advert_photo === 'string' ? data.left_advert_photo : undefined,
      events:
        Array.isArray(data.events) &&
        data.events.every((event): event is FlusherEvent => {
          const hasName = hasProperty(event, 'name') && typeof event.name === 'string';
          const hasDate = hasProperty(event, 'date') && typeof event.date === 'string';
          const hasLocation = hasProperty(event, 'location') && typeof event.location === 'string';
          return hasName && hasDate && hasLocation;
        })
          ? data.events
          : [],
      articles: {
        featured: hasProperty(data.articles, 'featured')
          ? {
              categories:
                hasProperty(data.articles.featured, 'categories') &&
                Array.isArray(data.articles.featured.categories) &&
                data.articles.featured.categories.every(
                  (cat): cat is string => typeof cat === 'string'
                )
                  ? data.articles.featured.categories
                  : [],
              name:
                hasProperty(data.articles.featured, 'name') &&
                typeof data.articles.featured.name === 'string'
                  ? data.articles.featured.name
                  : '',
              authors:
                hasProperty(data.articles.featured, 'people') &&
                hasProperty(data.articles.featured.people, 'authors') &&
                Array.isArray(data.articles.featured.people.authors) &&
                data.articles.featured.people.authors.every(
                  (author): author is { name: string } =>
                    hasProperty(author, 'name') && typeof author.name === 'string'
                )
                  ? data.articles.featured.people.authors.map((author) => author.name)
                  : [],
              photo:
                hasProperty(data.articles.featured, 'photo_path') &&
                typeof data.articles.featured.photo_path === 'string'
                  ? data.articles.featured.photo_path
                  : undefined,
              body:
                hasProperty(data.articles.featured, 'body') &&
                typeof data.articles.featured.body === 'string'
                  ? data.articles.featured.body
                  : '[]',
            }
          : undefined,
        more:
          hasProperty(data.articles, 'more') &&
          Array.isArray(data.articles.more) &&
          data.articles.more.every(
            (article): article is { name: string; _id: string } =>
              hasProperty(article, 'name') &&
              typeof article.name === 'string' &&
              hasProperty(article, '_id') &&
              typeof article._id === 'string'
          )
            ? data.articles.more
            : [],
      },
    };

    return {
      body: {
        data: JSON.stringify(flusher),
      },
    };
  }

  return {
    status: 422, // unprocessable entity
  };
};
