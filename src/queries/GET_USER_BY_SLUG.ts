import type { GraphJsonType } from '.';

const GET_USER_BY_SLUG = `
  query userPublicBySlug($slug: String!) {
    userPublicBySlug(slug: $slug) {
      _id
      name
      current_title
      email
      biography
      twitter
      photo
      slug
      group
    }
  }
`;

interface GET_USER_BY_SLUG__TYPE {
  userPublicBySlug?: GET_USER_BY_SLUG__DOC_TYPE;
}

interface GET_USER_BY_SLUG__DOC_TYPE {
  _id: string;
  name: string;
  current_title: string;
  email: string;
  biography: string;
  twitter: string;
  photo: string;
  slug: string;
  group: number;
}

type GET_USER_BY_SLUG__JSON = GraphJsonType<GET_USER_BY_SLUG__TYPE>;

export { GET_USER_BY_SLUG };
export type { GET_USER_BY_SLUG__JSON, GET_USER_BY_SLUG__TYPE, GET_USER_BY_SLUG__DOC_TYPE };
