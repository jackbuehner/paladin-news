/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_ECHO_DOCS_FULL = `
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
          dimensions {
            x
            y
          }
          people {
            photo_created_by
          }
        }
        authored_by {
          name
          slug
        }
        edited_by {
          name
        }
        timestamps {
          published_at
        }
        body
        print_volume
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

interface GET_ECHO_DOCS_FULL__DOC_TYPE {
  _id: string;
  name: string;
  slug: string;
  type: string;
  photo?: {
    photo_url: string;
    dimensions: { x: number; y: number };
    people: {
      photo_created_by?: string;
    };
  };
  authored_by: { name: string; slug: string }[];
  edited_by: { name: string }[];
  timestamps: { published_at: string };
  body: string;
  print_volumne?: number;
}

interface GET_ECHO_DOCS_FULL__TYPE {
  echoContentsPublic?: Paged<GET_ECHO_DOCS_FULL__DOC_TYPE>;
}

type GET_ECHO_DOCS_FULL__JSON = GraphJsonType<GET_ECHO_DOCS_FULL__TYPE>;

export { GET_ECHO_DOCS_FULL };
export type { GET_ECHO_DOCS_FULL__JSON, GET_ECHO_DOCS_FULL__TYPE, GET_ECHO_DOCS_FULL__DOC_TYPE };
