/* eslint-disable no-useless-escape */
import type { GraphJsonType, Paged } from '.';

const GET_CROSSWORDS = `
  query GetProfiles(
    $page: Int = 1,
    $limit: Int = 10,
    $sort: JSON = "{\\\"timestamps.published_at\\\":-1}",
    $filter: JSON = null,
  ) {
    crosswordsPublic(
      limit: $limit,
      page: $page,
      sort: $sort,
      filter: $filter,
    ) {
      docs {
        _id
        name
        timestamps {
          published_at
        }
        words {
          clue
          word
        }
        people {
          authors {
            name
          }
        }
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

interface GET_CROSSWORDS__DOC_TYPE {
  _id: string;
  name: string;
  timestamps: {
    published_at: string;
  };
  words: Array<{
    word: string;
    clue: string;
  }>;
  people: {
    authors: Array<{ name: string }>;
  };
}

interface GET_CROSSWORDS__TYPE {
  crosswordsPublic?: Paged<GET_CROSSWORDS__DOC_TYPE>;
}

type GET_CROSSWORDS__JSON = GraphJsonType<GET_CROSSWORDS__TYPE>;

export { GET_CROSSWORDS };
export type { GET_CROSSWORDS__JSON, GET_CROSSWORDS__TYPE, GET_CROSSWORDS__DOC_TYPE };
