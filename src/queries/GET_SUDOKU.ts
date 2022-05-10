import type { GraphJsonType } from '.';

const GET_SUDOKU = `
  query GetSudoku($date: Date!) {
    sudoku(day: $date) {
      _id
      day
      normalPuzzle
      normalSolution
      challengePuzzle
      challengeSolution
    }
  }
`;

interface GET_SUDOKU__DOC_TYPE {
  _id: string;
  day: string;
  normalPuzzle: string[];
  normalSolution: string[];
  challengePuzzle: string[];
  challengeSolution: string[];
}

interface GET_SUDOKU__TYPE {
  sudoku?: GET_SUDOKU__DOC_TYPE;
}

type GET_SUDOKU__JSON = GraphJsonType<GET_SUDOKU__TYPE>;

export { GET_SUDOKU };
export type { GET_SUDOKU__DOC_TYPE, GET_SUDOKU__TYPE, GET_SUDOKU__JSON };
