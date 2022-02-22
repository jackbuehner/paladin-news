/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_ARTICLES = `
  query GetArticles(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
    $filter: JSON = null,
    $featured: Boolean = false,
  ) {
    articlesPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
      featured: $featured,
    ) {
      docs {
        name
        slug
        timestamps {
          published_at
        },
        people {
          authors {
            _id
            name
            slug
            photo
          }
        }
        categories
        tags
        description
        photo_path
        photo_caption
        photo_credit
        legacy_html
        video_path
        video_replaces_photo
        show_comments
        template
        layout
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

interface GET_ARTICLES__DOC_TYPE {
  name: string;
  slug: string;
  timestamps: {
    published_at: string; // ISO date
  };
  people: {
    authors: Array<{
      _id: string;
      name: string;
      slug: string;
      photo: string;
    }>;
  };
  categories: string[];
  tags: string[];
  description: string;
  photo_path: string;
  photo_caption: string;
  photo_credit: string;
  legacy_html: boolean; // true if it is html from the old webflow
  video_path: string;
  video_replaces_photo: boolean;
  show_comments: boolean; // whether commenting on article should be enabled (for website, not cms)
  template: string;
  layout: string;
}

interface GET_ARTICLES__TYPE {
  articlesPublic?: Paged<GET_ARTICLES__DOC_TYPE>;
}

type GET_ARTICLES__JSON = GraphJsonType<GET_ARTICLES__TYPE>;

export { GET_ARTICLES };
export type { GET_ARTICLES__JSON, GET_ARTICLES__TYPE, GET_ARTICLES__DOC_TYPE };
