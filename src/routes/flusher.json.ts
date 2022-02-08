/* eslint-disable no-useless-escape */ // the triple backslash is required for graphql
import type { EndpointOutput } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';
import type { IFlush } from 'src/interfaces/flush';
import { variables } from '../variables';

interface IArticleOutput extends IFlush {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: JSONValue | any;
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
async function get(request: ServerRequest): Promise<EndpointOutput<IArticleOutput>> {
  // query for latest flusher
  const GET_LATEST_FLUSHER = `{
    flushesPublic(
      ${
        request.query.has('week')
          ? `
              limit: 1,
              sort: "{ \\\"volume\\\": -1, \\\"issue\\\": -1 }",
              filter: "{ \\\"$and\\\": [ { \\\"timestamps.week\\\": { \\\"$gte\\\": \\\"${new Date(
                request.query.get('week')
              ).toISOString()}\\\" } }, { \\\"timestamps.week\\\": { \\\"$lt\\\": \\\"${new Date(
              new Date(request.query.get('week')).getTime() + 60 * 60 * 24 * 1000
            ).toISOString()}\\\" } } ] }"
            `
          : `
              limit: 1,
              sort: "{ \\\"volume\\\": -1, \\\"issue\\\": -1 }",
              filter: "{ \\\"timestamps.week\\\": { \\\"$lte\\\": \\\"${new Date().toISOString()}\\\" } }"
            `
      } 
    ) {
      docs {
        volume
        issue
        events {
          name
          date
          location
        }
        articles {
          featured {
            slug
            name
            description
            photo_path
            timestamps {
              published_at
            }
            people {
              authors {
                name
              }
            }
          }
          more {
            slug
            name
            timestamps {
              published_at
            }
          }
        }
        timestamps {
          week
        }
      }
    }
  }`;

  // get the latest flusher
  const hostUrl = `${variables.SERVER_PROTOCOL}://${variables.SERVER_URL}`;
  const res = await fetch(`${hostUrl}/v3`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: GET_LATEST_FLUSHER,
    }),
  });
  const flusher: AggregatePaginateResult<IFlush> = (await res.json()).data.flushesPublic;

  // return the flusher
  if (flusher) {
    return {
      body: flusher.docs[0],
    };
  }
  return null;
}

export { get };
