import type { GraphJsonType } from '.';

const GET_ARTICLE_BASIC = `
  query GetArticleBasic($_id: ObjectID!) {
    articlePublic(_id: $_id) {
      name
      slug
      timestamps {
        published_at
      },
    }
  }
`;

interface GET_ARTICLE_BASIC__DOC_TYPE {
  name: string;
  slug: string;
  timestamps: {
    published_at: string; // ISO date
  };
}

interface GET_ARTICLE_BASIC__TYPE {
  articlePublic?: GET_ARTICLE_BASIC__DOC_TYPE;
}

type GET_ARTICLE_BASIC__JSON = GraphJsonType<GET_ARTICLE_BASIC__TYPE>;

export { GET_ARTICLE_BASIC };
export type { GET_ARTICLE_BASIC__DOC_TYPE, GET_ARTICLE_BASIC__TYPE, GET_ARTICLE_BASIC__JSON };
