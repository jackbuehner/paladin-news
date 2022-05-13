import type { GraphJsonType } from '.';

const MUTATE_CROSSWORD_LAYOUT = `
  mutation MutateCrosswordLayout($_id: ObjectID!, $layout: [CrosswordModifyInputLayout]) {
    crosswordModify(_id: $_id, input: { layout: $layout }) {
      layout {
        answer
        clue
        direction
        x
        y
      }
    }
  }
`;

interface MUTATE_CROSSWORD_LAYOUT__DOC_TYPE {
  layout?: Array<{
    answer: string;
    clue: string;
    direction: string;
    x: number;
    y: number;
  }>;
}

interface MUTATE_CROSSWORD_LAYOUT__TYPE {
  crosswordModify?: MUTATE_CROSSWORD_LAYOUT__DOC_TYPE;
}

type MUTATE_CROSSWORD_LAYOUT__JSON = GraphJsonType<MUTATE_CROSSWORD_LAYOUT__TYPE>;

export { MUTATE_CROSSWORD_LAYOUT };
export type {
  MUTATE_CROSSWORD_LAYOUT__DOC_TYPE,
  MUTATE_CROSSWORD_LAYOUT__TYPE,
  MUTATE_CROSSWORD_LAYOUT__JSON,
};
