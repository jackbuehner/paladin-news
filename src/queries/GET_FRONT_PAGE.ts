/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_FRONT_PAGE = `
  query GetFrontPage($sort: JSON = "{ \\\"timestamps.published_at\\\": -1 }") {
    ${section('news', ['news'], 5)}
    ${section('opinion', ['opinion'], 6)}
    ${section('sports', ['sports'], 3)}
    ${section('diversity', ['diversity'], 3)}
    ${section('acc', ['arts', 'campus-culture'], 3)}
    featured: articleFeaturedDocsPublic {
      name
      slug
      timestamps {
        published_at
      }
      people {
        authors {
          name
          slug
          photo
        }
      }
      categories
      description
      photo_path
    }
  }
`;

function section(label: string, categories?: string[], limit = 10) {
  return `
  ${label}: articlesPublic(
    limit: ${limit}
    page: 1
    sort: $sort
    filter: "{ \\"categories.0\\\": { \\\"$in\\\": [${(categories || []).map(
      (cat) => `\\\"${cat}\\\"`
    )}] } }"
  ) {
    docs {
      name
      slug
      timestamps {
        published_at
      }
      people {
        authors {
          name
          slug
          photo
        }
      }
      categories
      description
      photo_path
    }
  }
  `;
}

interface GET_FRONT_PAGE__DOC_TYPE {
  name: string;
  slug: string;
  timestamps: {
    published_at: string;
  };
  people: {
    authors: Array<{
      name: string;
      slug: string;
      photo?: string;
    }>;
  };
  categories: string[];
  description?: string;
  photo_path?: string;
}

interface GET_FRONT_PAGE__TYPE {
  news: { docs: GET_FRONT_PAGE__DOC_TYPE[] };
  opinion: { docs: GET_FRONT_PAGE__DOC_TYPE[] };
  sports: { docs: GET_FRONT_PAGE__DOC_TYPE[] };
  diversity: { docs: GET_FRONT_PAGE__DOC_TYPE[] };
  acc: { docs: GET_FRONT_PAGE__DOC_TYPE[] };
  featured: GET_FRONT_PAGE__DOC_TYPE[];
}

type GET_FRONT_PAGE__JSON = GraphJsonType<GET_FRONT_PAGE__TYPE>;

export { GET_FRONT_PAGE };
export type { GET_FRONT_PAGE__DOC_TYPE, GET_FRONT_PAGE__TYPE, GET_FRONT_PAGE__JSON };
