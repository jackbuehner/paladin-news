/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_FLUSHERS = `
  query GetFlushers(
    $limit: Int = 10,
    $page: Int = 1,
    $sort: JSON = "{\\\"timestamps.week\\\":-1}",
    $filter: JSON = null,
  ) {
    flushesPublic(limit: $limit, page: $page, sort: $sort, filter: $filter) {
      docs {
        _id
        volume
        issue
        events {
          name
          date
          location
        }
        people {
          modified_by {
            name
          }
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
            categories
            body
          }
          more {
            _id
            slug
            name
            timestamps {
              published_at
            }
          }
        }
        timestamps {
          week
        }
        left_advert_photo_url
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

interface GET_FLUSHERS__DOC_TYPE {
  _id: string;
  volume: number;
  issue: number;
  events: {
    name: string;
    date: string; // ISO string
    location: string;
  }[];
  people: {
    modified_by: Array<{
      name: string;
    } | null>;
  };
  articles: {
    featured: {
      slug: string;
      name: string;
      description: string;
      photo_path: string;
      timestamps: {
        published_at: string; // ISO string
      };
      people: {
        authors: Array<{
          name: string;
        } | null>;
      };
      categories: string[];
      body: string;
    };
    more: Array<{
      _id: string;
      slug: string;
      name: string;
      timestamps: {
        published_at: string; // ISO string
      };
    }>;
  };
  timestamps: {
    week: string; // ISO string
  };
  left_advert_photo_url?: string;
}

interface GET_FLUSHERS__TYPE {
  flushesPublic?: Paged<GET_FLUSHERS__DOC_TYPE>;
}

type GET_FLUSHERS__JSON = GraphJsonType<GET_FLUSHERS__TYPE>;

export { GET_FLUSHERS };
export type { GET_FLUSHERS__JSON, GET_FLUSHERS__TYPE, GET_FLUSHERS__DOC_TYPE };
