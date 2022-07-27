/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_PLAYLISTS = `
  query GetPlaylists(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.modified_at\\\":-1}",
    $filter: JSON = null,
  ) {
    videoPlaylistsPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
        name
        description
        videos {
          _id
          name
          video_url
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

interface GET_PLAYLISTS__DOC_TYPE {
  name: string;
  description: string;
  videos: Array<{
    _id: string;
    name: string;
    video_url: string;
  }>;
}

interface GET_PLAYLISTS__TYPE {
  videoPlaylistsPublic?: Paged<GET_PLAYLISTS__DOC_TYPE>;
}

type GET_PLAYLISTS__JSON = GraphJsonType<GET_PLAYLISTS__TYPE>;

export { GET_PLAYLISTS };
export type { GET_PLAYLISTS__JSON, GET_PLAYLISTS__TYPE, GET_PLAYLISTS__DOC_TYPE };
