/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_VIDEOS = `
  query GetVideos(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.modified_at\\\":-1}",
    $filter: JSON = null,
  ) {
    videosPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
        _id
        name
        timestamps {
          published_at
        }
        video_url
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

interface GET_VIDEOS__DOC_TYPE {
  _id: string;
  name: string;
  timestamps: {
    published_at: string;
  };
  video_url: string;
}

interface GET_VIDEOS__TYPE {
  videosPublic?: Paged<GET_VIDEOS__DOC_TYPE>;
}

type GET_VIDEOS__JSON = GraphJsonType<GET_VIDEOS__TYPE>;

export { GET_VIDEOS };
export type { GET_VIDEOS__JSON, GET_VIDEOS__TYPE, GET_VIDEOS__DOC_TYPE };
