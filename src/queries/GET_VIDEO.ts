import type { GraphJsonType } from '.';

const GET_VIDEO = `
  query GetVideo($_id: ObjectID!) {
    videoPublic(_id: $_id) {
      _id
      name
      description
      tags
      timestamps {
        published_at
      }
      video_url
    }
  }
`;

interface GET_VIDEO__DOC_TYPE {
  _id: string;
  description: string;
  name: string;
  tags: string[];
  timestamps: {
    published_at: string;
  };
  video_url: string;
}

interface GET_VIDEO__TYPE {
  videoPublic?: GET_VIDEO__DOC_TYPE;
}

type GET_VIDEO__JSON = GraphJsonType<GET_VIDEO__TYPE>;

export { GET_VIDEO };
export type { GET_VIDEO__DOC_TYPE, GET_VIDEO__TYPE, GET_VIDEO__JSON };
