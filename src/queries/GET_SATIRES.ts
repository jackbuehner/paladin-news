/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_SATIRES = `
  query GetSatires(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
    $filter: JSON = null,
  ) {
    satiresPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
        _id
        name
        slug
        timestamps {
          published_at
        },
        people {
          display_authors
        }
        description
        photo_path
        photo_caption
        photo_credit
        body
        legacy_html
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

interface GET_SATIRES__DOC_TYPE {
  _id: string;
  name: string;
  slug: string;
  timestamps: {
    published_at: string; // ISO date
  };
  people: {
    display_authors: string[];
  };
  description: string;
  photo_path: string;
  photo_caption: string;
  photo_credit: string;
  body?: string;
  legacy_html: boolean; // true if it is html from the old webflow
}

interface GET_SATIRES__TYPE {
  satiresPublic?: Paged<GET_SATIRES__DOC_TYPE>;
}

type GET_SATIRES__JSON = GraphJsonType<GET_SATIRES__TYPE>;

export { GET_SATIRES };
export type { GET_SATIRES__JSON, GET_SATIRES__TYPE, GET_SATIRES__DOC_TYPE };
