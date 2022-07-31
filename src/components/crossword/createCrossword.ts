// @ts-expect-error no type definitions are available
import crosswordLayoutGeneratorPkg from 'crossword-layout-generator';
import type { DateTime } from 'luxon';

const {
  computeDimension,
  initTable,
  generateTable,
  removeIsolatedWords,
  trimTable,
  assignPositions,
} = crosswordLayoutGeneratorPkg;

/**
 * Create a crossword puzzle from a given set of clues and answers.
 */
function createCrossword(input: CreateCrosswordInput): CreateCrosswordOutput {
  const parsedInput = input.words.map(({ word, clue }) => ({ answer: word, clue }));

  let rows = computeDimension(parsedInput, 3);
  // if this is a modern crossword that is stored in cristata, limit the dimension to 24x24
  if (input.date && input.date.year > 2020 && rows > 24) rows = 24;
  const cols = rows;
  const blankTable = initTable(rows, cols);
  const table = generateTable(blankTable, rows, cols, parsedInput, [0.7, 0.15, 0.1, 0.05]);
  const newTable = removeIsolatedWords(table);
  const finalTable = trimTable(newTable);
  assignPositions(finalTable.result);

  const result: CrosswordLayout = finalTable.result;

  const puzzle = result.map(({ clue, orientation, answer, startx, starty }) => ({
    clue,
    direction: orientation,
    answer,
    x: startx,
    y: starty,
  }));

  return puzzle;
}

interface CreateCrosswordInput {
  words: Array<{
    word: string;
    clue: string;
  }>;
  date?: DateTime;
}

type CreateCrosswordOutput = Array<{
  clue: string;
  direction: 'across' | 'down' | 'none';
  answer: string;
  x: number;
  y: number;
}>;

type CrosswordLayout = Array<{
  clue: string;
  orientation: 'across' | 'down' | 'none';
  answer: string;
  startx: number;
  starty: number;
}>;

export { createCrossword };
