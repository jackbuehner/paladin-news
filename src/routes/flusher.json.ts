import type { IFlush } from 'src/interfaces/flush';
import type { EndpointOutput } from '@sveltejs/kit';
import type { ServerRequest } from '@sveltejs/kit/types/hooks';
import type { JSONValue } from '@sveltejs/kit/types/endpoint';
import { variables } from '../variables';
import type { AggregatePaginateResult } from 'src/interfaces/aggregatePaginateResult';

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
    flushesPublic(limit: 1, sort: "{ \\\"issue\\\": -1, \\\"volume\\\": 1 }") {
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
