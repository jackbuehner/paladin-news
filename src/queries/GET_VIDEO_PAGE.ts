/* eslint-disable no-useless-escape */
import type { GraphJsonType } from '.';

const GET_VIDEO_PAGE = `
  query GetVideoPage($featuredVideoId: ObjectID!, $playlistIds: [ObjectID]!) {
    videoPublic(_id: $featuredVideoId) {
      _id
      description
      name
      video_url
    }
    videoPlaylistsPublic(_ids: $playlistIds, limit: 100) {
      docs {
        name
        videos {
          _id
          name
          video_url
        }
      }
    }
  }
`;

interface GET_VIDEO_PAGE_PLAYLIST__DOC_TYPE {
  name: string;
  videos: Array<{
    _id: string;
    name: string;
    video_url: string;
  }>;
}

interface GET_VIDEO_PAGE_FEATURED_VIDEO__DOC_TYPE {
  _id: string;
  name: string;
  description: string;
  video_url: string;
}

interface GET_VIDEO_PAGE__TYPE {
  videoPublic?: GET_VIDEO_PAGE_FEATURED_VIDEO__DOC_TYPE;
  videoPlaylistsPublic?: { docs: GET_VIDEO_PAGE_PLAYLIST__DOC_TYPE[] };
}

type GET_VIDEO_PAGE__JSON = GraphJsonType<GET_VIDEO_PAGE__TYPE>;

export { GET_VIDEO_PAGE };
export type {
  GET_VIDEO_PAGE_PLAYLIST__DOC_TYPE,
  GET_VIDEO_PAGE_FEATURED_VIDEO__DOC_TYPE,
  GET_VIDEO_PAGE__TYPE,
  GET_VIDEO_PAGE__JSON,
};
