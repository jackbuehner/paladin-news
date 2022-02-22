/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_PROFILES = `
  query GetProfiles(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
    $filter: JSON = null,
  ) {
    usersPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
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

interface GET_PROFILES__DOC_TYPE {
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

interface GET_PROFILES__TYPE {
  usersPublic?: Paged<GET_PROFILES__DOC_TYPE>;
}

type GET_PROFILES__JSON = GraphJsonType<GET_PROFILES__TYPE>;

export { GET_PROFILES };
export type { GET_PROFILES__JSON, GET_PROFILES__TYPE, GET_PROFILES__DOC_TYPE };
