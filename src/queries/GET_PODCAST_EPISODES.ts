/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_PODCAST_EPISODES = `
  query GetPodcastEpisdoes(
    $limit: Int = 10,
    $page: Int = 1,
    $sort: JSON = "{\\\"timestamps.week\\\":-1}",
    $filter: JSON = null,
  ) {
    podcastsPublic(limit: $limit, page: $page, sort: $sort, filter: $filter) {
      docs {
        name
        description
        episode_number
        episode_url
        timestamps {
          published_at
        }
        people {
          podcasters {
            name
            slug
          }
        }
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

interface GET_PODCAST_EPISODES__DOC_TYPE {
  name: string;
  description: string;
  episode_number: number;
  episode_url: string;
  timestamps: {
    published_at: string;
  };
  people: {
    podcasters: Array<{
      name: string;
      slug: string;
    }>;
  };
}

interface GET_PODCAST_EPISODES__TYPE {
  podcastsPublic?: Paged<GET_PODCAST_EPISODES__DOC_TYPE>;
}

type GET_PODCAST_EPISODES__JSON = GraphJsonType<GET_PODCAST_EPISODES__TYPE>;

export { GET_PODCAST_EPISODES };
export type {
  GET_PODCAST_EPISODES__JSON,
  GET_PODCAST_EPISODES__TYPE,
  GET_PODCAST_EPISODES__DOC_TYPE,
};
