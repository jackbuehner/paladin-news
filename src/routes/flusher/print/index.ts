/* eslint-disable no-useless-escape */
import type { Flusher, FlusherEvent } from '$lib/components/Flusher';
import { GET_FLUSHERS, type GET_FLUSHERS__TYPE } from '$lib/queries';
import { hasProperty } from '$lib/utils';
import { api } from '$lib/utils/api';
import type { RequestHandler } from '@sveltejs/kit';
import JSONCrush from 'jsoncrush';

export const get: RequestHandler<never> = async (request) => {
  const json: Record<string, unknown> = request.url.searchParams.has('data')
    ? JSON.parse(JSONCrush.uncrush(request.url.searchParams.get('data') as string))
    : null;

  if (json) {
    const flusher: Flusher = {
      volume: typeof json.volume === 'number' ? json.volume : 0,
      issue: typeof json.issue === 'number' ? json.issue : 0,
      timestamps: {
        week:
          // TODO: check validity of timestamp
          hasProperty(json.timestamps, 'week') && typeof json.timestamps.week === 'string'
            ? json.timestamps.week
            : '1970-01-01',
      },
      leftAdvertPhoto:
        typeof json.left_advert_photo === 'string' ? json.left_advert_photo : undefined,
      events:
        Array.isArray(json.events) &&
        json.events.every((event): event is FlusherEvent => {
          const hasName = hasProperty(event, 'name') && typeof event.name === 'string';
          const hasDate = hasProperty(event, 'date') && typeof event.date === 'string';
          const hasLocation = hasProperty(event, 'location') && typeof event.location === 'string';
          return hasName && hasDate && hasLocation;
        })
          ? json.events
          : [],
      articles: {
        featured: hasProperty(json.articles, 'featured')
          ? {
              categories:
                hasProperty(json.articles.featured, 'categories') &&
                Array.isArray(json.articles.featured.categories) &&
                json.articles.featured.categories.every(
                  (cat): cat is string => typeof cat === 'string'
                )
                  ? json.articles.featured.categories
                  : [],
              name:
                hasProperty(json.articles.featured, 'name') &&
                typeof json.articles.featured.name === 'string'
                  ? json.articles.featured.name
                  : '',
              authors:
                hasProperty(json.articles.featured, 'people') &&
                hasProperty(json.articles.featured.people, 'authors') &&
                Array.isArray(json.articles.featured.people.authors) &&
                json.articles.featured.people.authors.every(
                  (author): author is { name: string } =>
                    hasProperty(author, 'name') && typeof author.name === 'string'
                )
                  ? json.articles.featured.people.authors.map((author) => author.name)
                  : [],
              photo:
                hasProperty(json.articles.featured, 'photo_path') &&
                typeof json.articles.featured.photo_path === 'string'
                  ? json.articles.featured.photo_path
                  : undefined,
              body:
                hasProperty(json.articles.featured, 'body') &&
                typeof json.articles.featured.body === 'string'
                  ? json.articles.featured.body
                  : '[]',
            }
          : undefined,
        more:
          hasProperty(json.articles, 'more') &&
          Array.isArray(json.articles.more) &&
          json.articles.more.every(
            (article): article is { name: string; _id: string } =>
              hasProperty(article, 'name') &&
              typeof article.name === 'string' &&
              hasProperty(article, '_id') &&
              typeof article._id === 'string'
          )
            ? json.articles.more
            : [],
      },
    };

    return { body: { data: JSON.stringify(flusher) } };
  }

  // if json was not provided, try to get the data from the week
  if (request.url.searchParams.has('week')) {
    // define the variables for the query:
    // get only one flusher
    const limit = 1;
    const page = 1;
    // filter out flushers with ineligible times
    const filter = (() => {
      // if the query specifies a specific week, get the flusher with the week
      const week: Date = new Date(request.url.searchParams.get('week') as string);
      const weekPlusOneDay = new Date(week.getTime() + 1000 * 60 * 60 * 24);
      return `{ 
                  \"$and\": [
                    { \"timestamps.week\": { \"$gte\": \"${week.toISOString()}\" } },
                    { \"timestamps.week\": { \"$lt\": \"${weekPlusOneDay.toISOString()}\" } } 
                  ] 
                }`;
    })();
    // prefer the newest filtered flusher with the largest volume and issue number
    const sort = `{ \"timestamps.week\": -1, \"volume\": -1, \"issue\": -1 }`;

    // request the satires from the api
    const { data, error } = await api.query<GET_FLUSHERS__TYPE>(GET_FLUSHERS, {
      variables: { limit, page, filter, sort },
    });

    if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
    else if (data?.flushesPublic && data.flushesPublic.docs?.[0]) {
      const doc = data.flushesPublic.docs[0];
      const { more, featured } = doc.articles;
      const flusher: Flusher = {
        articles: {
          featured: {
            body: featured.body,
            authors: featured.people.authors
              .filter((author): author is { name: string } => !!author)
              .map((author) => author.name),
            categories: featured.categories,
            name: featured.name,
            photo: featured.photo_path,
          },
          more: more,
        },
        events: doc.events,
        issue: doc.issue,
        volume: doc.volume,
        timestamps: { week: doc.timestamps.week },
        leftAdvertPhoto: doc.left_advert_photo_url,
      };

      return { body: { data: JSON.stringify(flusher) } };
    }
    return { status: error.status };
  }

  return {
    status: 422, // unprocessable entity
  };
};
