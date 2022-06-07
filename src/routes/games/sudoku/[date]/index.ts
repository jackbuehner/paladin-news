/* eslint-disable no-useless-escape */ // graphql needs the quotes to be escaped
import type { RequestHandler } from '@sveltejs/kit';
import { SudokuCreator } from '@algorithm.ts/sudoku';
import { api } from '$lib/utils/api';
import {
  CREATE_SUDOKU,
  GET_SUDOKU,
  type CREATE_SUDOKU__TYPE,
  type GET_SUDOKU__TYPE,
} from '$lib/queries';
import { variables } from '$lib/variables';
import { DateTime } from 'luxon';

export const get: RequestHandler<{ date: string }> = async (request) => {
  let date = request.params.date;
  if (date === 'latest' || date === 'today') date = new Date().toISOString().split('T')[0];

  if (new Date(date) > new Date(DateTime.now().toISODate().split('T')[0])) return { status: 418 };
  if (new Date(date) < new Date('2022-05-01')) return { status: 404 };

  // request the puzzle from the api
  const { data, error } = await api.query<GET_SUDOKU__TYPE>(GET_SUDOKU, {
    variables: { date },
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (error.errors) return { status: 400, body: { errors: JSON.stringify(error.errors) } };
  else if (data?.sudoku) return { body: { data: JSON.stringify(data.sudoku) } };

  // the sudoku document was not available from the api, so create a
  // new puzzle and add it to the database
  const creator = new SudokuCreator({ childMatrixSize: 3 });

  const { normalPuzzle, normalSolution, challengePuzzle, challengeSolution } = (() => {
    const normal = creator.createSudoku(0.3);
    const challenge = creator.createSudoku(1);

    return {
      normalPuzzle: normal.puzzle.map((row) => row.join(',')),
      normalSolution: normal.solution.map((row) => row.join(',')),
      challengePuzzle: challenge.puzzle.map((row) => row.join(',')),
      challengeSolution: challenge.solution.map((row) => row.join(',')),
    };
  })();

  const { data: newSudoku, error: newSudokuError } = await api.mutate<CREATE_SUDOKU__TYPE>(
    CREATE_SUDOKU,
    {
      variables: { date, normalPuzzle, normalSolution, challengePuzzle, challengeSolution },
      headers: { Authorization: `app-token ${variables.API_TOKEN}` },
    }
  );

  if (newSudokuError.errors)
    return { status: 400, body: { errors: JSON.stringify(newSudokuError.errors) } };
  else if (newSudoku?.sudokuCreate)
    return { body: { data: JSON.stringify(newSudoku.sudokuCreate) } };
  return { status: newSudokuError.status };
};
