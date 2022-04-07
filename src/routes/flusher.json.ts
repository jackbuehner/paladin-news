/* eslint-disable no-useless-escape */ // graphql needs the quotes to be escaped
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import { GET_FLUSHERS, GET_FLUSHERS__JSON } from '../queries';
import { variables } from '../variables';

async function get(request: ServerRequest): Promise<EndpointOutput> {
  const res = await fetch(`${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_FLUSHERS,
      variables: {
        // get only one flusher
        limit: 1,
        // filter out flushers with uneligible times
        filter: (() => {
          // if the query specifies a specific week, get the flusher with the week
          if (request.query.has('week')) {
            const week: Date = new Date(request.query.get('week'));
            const weekPlusOneDay = new Date(week.getTime() + 1000 * 60 * 60 * 24);
            return `{ 
                      \"$and\": [
                        { \"timestamps.week\": { \"$gte\": \"${week.toISOString()}\" } },
                        { \"timestamps.week\": { \"$lt\": \"${weekPlusOneDay.toISOString()}\" } } 
                      ] 
                    }`;
          }
          // otherwise, get the newest flusher that has a week that is not in the future
          return `{ \"timestamps.week\": { \"$lte\": \"${new Date().toISOString()}\" } }`;
        })(),
        // prefer the newest filtered flusher with the largest volume and issue number
        sort: `{ \"timestamps.week\": -1, \"volume\": -1, \"issue\": -1 }`,
      },
    }),
  });
  const { data }: GET_FLUSHERS__JSON = await res.json();
  const flusher = data.flushesPublic.docs[0];

  // return the flusher
  if (flusher) {
    return { body: JSON.stringify(flusher) };
  }
}

export { get };
