import type { GraphJsonType } from '.';

const CREATE_SUDOKU = `
  mutation CreateSudoku($date: Date!, $normalPuzzle: [String]!, $normalSolution: [String]!, $challengePuzzle: [String]!, $challengeSolution: [String]!) {
    sudokuCreate(day: $date, normalPuzzle: $normalPuzzle, normalSolution: $normalSolution, challengePuzzle: $challengePuzzle, challengeSolution: $challengeSolution) {
      _id
      day
      normalPuzzle
      normalSolution
      challengePuzzle
      challengeSolution
    }
  }
`;

interface CREATE_SUDOKU__DOC_TYPE {
  _id: string;
  day: string;
  normalPuzzle: string[];
  normalSolution: string[];
  challengePuzzle: string[];
  challengeSolution: string[];
}

interface CREATE_SUDOKU__TYPE {
  sudokuCreate?: CREATE_SUDOKU__DOC_TYPE;
}

type CREATE_SUDOKU__JSON = GraphJsonType<CREATE_SUDOKU__TYPE>;

export { CREATE_SUDOKU };
export type { CREATE_SUDOKU__DOC_TYPE, CREATE_SUDOKU__TYPE, CREATE_SUDOKU__JSON };
