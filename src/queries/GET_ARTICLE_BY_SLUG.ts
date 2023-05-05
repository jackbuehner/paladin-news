import type { GraphJsonType } from '.';

const GET_ARTICLE_BY_SLUG = `
  query GetArticleBySlug($slug: String!, $date: Date) {
    articleBySlugPublic(slug: $slug, date: $date) {
      _id
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
          biography
          twitter
          current_title
        }
        editors {
          primary {
            name
            slug
          }
          copy {
            name
            slug
          }
        }
      }
      categories
      tags
      description
      photo_path
      photo_caption
      photo_credit
      body
      legacy_html
      video_path
      video_replaces_photo
      show_comments
      template
      layout
      claps
      show_quick_escape
    }
  }
`;

interface GET_ARTICLE_BY_SLUG__DOC_TYPE {
  _id: string;
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
      biography?: string;
      twitter?: string;
      current_title?: string;
    }>;
    editors: {
      primary: Array<{
        name: string;
        slug: string;
      }>;
      copy: Array<{
        name: string;
        slug: string;
      }>;
    };
  };
  categories: string[];
  tags: string[];
  description: string;
  photo_path: string;
  photo_caption: string;
  photo_credit: string;
  body?: string;
  legacy_html: boolean; // true if it is html from the old webflow
  video_path: string;
  video_replaces_photo: boolean;
  show_comments: boolean; // whether commenting on article should be enabled (for website, not cms)
  template: string;
  layout: string;
  claps?: number;
  show_quick_escape?: boolean;
}

interface GET_ARTICLE_BY_SLUG__TYPE {
  articleBySlugPublic?: GET_ARTICLE_BY_SLUG__DOC_TYPE;
}

type GET_ARTICLE_BY_SLUG__JSON = GraphJsonType<GET_ARTICLE_BY_SLUG__TYPE>;

export { GET_ARTICLE_BY_SLUG };
export type { GET_ARTICLE_BY_SLUG__DOC_TYPE, GET_ARTICLE_BY_SLUG__TYPE, GET_ARTICLE_BY_SLUG__JSON };
