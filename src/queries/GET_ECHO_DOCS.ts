/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_ECHO_DOCS = `
  query GetEchoDocs(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
    $filter: JSON = null,
  ) {
    echoContentsPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
        _id
        name
        type
        slug
        photo {
          photo_url
          width
          height
        }
        authored_by {
          name
        }
        timestamps {
          published_at
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

interface GET_ECHO_DOCS__DOC_TYPE {
  _id: string;
  name: string;
  slug: string;
  type: string;
  photo?: {
    photo_url: string;
    width: number;
    height: number;
  };
  authored_by: { name: string }[];
  timestamps: { published_at: string };
}

interface GET_ECHO_DOCS__TYPE {
  echoContentsPublic?: Paged<GET_ECHO_DOCS__DOC_TYPE>;
}

type GET_ECHO_DOCS__JSON = GraphJsonType<GET_ECHO_DOCS__TYPE>;

export { GET_ECHO_DOCS };
export type { GET_ECHO_DOCS__JSON, GET_ECHO_DOCS__TYPE, GET_ECHO_DOCS__DOC_TYPE };
