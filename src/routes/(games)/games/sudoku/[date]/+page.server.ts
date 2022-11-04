import {
  CREATE_SUDOKU,
  GET_SUDOKU,
  type CREATE_SUDOKU__TYPE,
  type GET_SUDOKU__TYPE,
} from '$lib/queries';
import { api } from '$lib/utils/api';
import { variables } from '$lib/variables';
import { SudokuCreator } from '@algorithm.ts/sudoku';
import { error } from '@sveltejs/kit';
import { DateTime } from 'luxon';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request) => {
  let date = request.params.date;
  if (date === 'latest' || date === 'today') date = DateTime.now().setZone('UTC').toISODate();

  if (new Date(date) > new Date(DateTime.now().setZone('UTC').toISODate())) throw error(418);
  if (new Date(date) < new Date('2022-05-01')) throw error(404);

  // request the puzzle from the api
  const { data, error: err } = await api.query<GET_SUDOKU__TYPE>(GET_SUDOKU, {
    variables: { date },
    headers: { Authorization: `app-token ${variables.API_TOKEN}` },
  });

  if (err.errors) {
    throw error(400, JSON.stringify(err.errors));
  }

  if (data?.sudoku) {
    return data.sudoku;
  }

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

  if (newSudokuError.errors) {
    throw error(400, JSON.stringify(newSudokuError.errors));
  }

  if (newSudoku?.sudokuCreate) {
    return newSudoku.sudokuCreate;
  }

  throw error(newSudokuError.status);
};
