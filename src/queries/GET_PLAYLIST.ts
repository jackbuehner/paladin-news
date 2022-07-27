import type { GraphJsonType } from '.';

const GET_PLAYLIST = `
  query GetVideoPlaylist($slug: String!, $date: Date) {
    videoPlaylistPublic(slug: $slug, date: $date) {
      name
      description
      videos {
        _id
        name
        video_url
      }
    }
  }
`;

interface GET_PLAYLIST__DOC_TYPE {
  name: string;
  description: string;
  videos: Array<{
    _id: string;
    name: string;
    video_url: string;
  }>;
}

interface GET_PLAYLIST__TYPE {
  videoPlaylistPublic?: GET_PLAYLIST__DOC_TYPE;
}

type GET_PLAYLIST__JSON = GraphJsonType<GET_PLAYLIST__TYPE>;

export { GET_PLAYLIST };
export type { GET_PLAYLIST__DOC_TYPE, GET_PLAYLIST__TYPE, GET_PLAYLIST__JSON };
