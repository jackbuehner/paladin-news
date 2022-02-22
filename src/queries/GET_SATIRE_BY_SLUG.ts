import type { GraphJsonType } from '.';

const GET_SATIRE_BY_SLUG = `
  query GetSatireBySlug($slug: String!, $date: Date) {
    satireBySlugPublic(slug: $slug, date: $date) {
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
  }
`;

interface GET_SATIRE_BY_SLUG__DOC_TYPE {
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

interface GET_SATIRE_BY_SLUG__TYPE {
  satireBySlugPublic?: GET_SATIRE_BY_SLUG__DOC_TYPE;
}

type GET_SATIRE_BY_SLUG__JSON = GraphJsonType<GET_SATIRE_BY_SLUG__TYPE>;

export { GET_SATIRE_BY_SLUG };
export type { GET_SATIRE_BY_SLUG__DOC_TYPE, GET_SATIRE_BY_SLUG__TYPE, GET_SATIRE_BY_SLUG__JSON };
