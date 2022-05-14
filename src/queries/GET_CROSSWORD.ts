import type { GraphJsonType } from '.';

const GET_CROSSWORD = `
  query GetCrossword($_id: ObjectID!) {
    crosswordPublic(_id: $_id) {
      _id
      name
      timestamps {
        published_at
        updated_at
      }
      words {
        clue
        word
      }
      layout {
        answer
        clue
        direction
        x
        y
      }
      people {
        authors {
          name
        }
        editors {
          primary {
            name
          }
        }
      }
    }
  }
`;

interface GET_CROSSWORD__DOC_TYPE {
  _id: string;
  name: string;
  timestamps: {
    published_at: string;
    updated_at: string;
  };
  words: Array<{
    word: string;
    clue: string;
  }>;
  layout?: Array<{
    answer: string;
    clue: string;
    direction: string;
    x?: number;
    y?: number;
  }>;
  people: {
    authors: Array<{ name: string }>;
    editors: {
      primary: Array<{ name: string }>;
    };
  };
}

interface GET_CROSSWORD__TYPE {
  crosswordPublic?: GET_CROSSWORD__DOC_TYPE;
}

type GET_CROSSWORD__JSON = GraphJsonType<GET_CROSSWORD__TYPE>;

export { GET_CROSSWORD };
export type { GET_CROSSWORD__DOC_TYPE, GET_CROSSWORD__TYPE, GET_CROSSWORD__JSON };
