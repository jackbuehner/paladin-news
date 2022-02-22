import type { GraphJsonType } from '.';

const GET_PROFILE = `
  query GetProfile($_id: ObjectID!) {
    userPublic(_id: $_id) {
      _id
      name
      slug
      email
      twitter
      biography
      current_title
      photo
      github_id
      group
    }
  }
`;

interface GET_PROFILE__DOC_TYPE {
  _id: string;
  github_id: number;
  name: string;
  slug: string;
  email: string;
  twitter: string;
  biography: string;
  current_title: string;
  photo: string; // url to photo
  group: number;
}

interface GET_PROFILE__TYPE {
  userPublic?: GET_PROFILE__DOC_TYPE;
}

type GET_PROFILE__JSON = GraphJsonType<GET_PROFILE__TYPE>;

export { GET_PROFILE };
export type { GET_PROFILE__DOC_TYPE, GET_PROFILE__TYPE, GET_PROFILE__JSON };
