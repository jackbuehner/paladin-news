// @ts-expect-error no type definitions are available
import clg from 'crossword-layout-generator';

/**
 * Create a crossword puzzle from a given set of clues and answers.
 */
function createCrossword(input: CreateCrosswordInput): CreateCrosswordOutput {
  const parsedInput = input.words.map(({ word, clue }) => ({ answer: word, clue }));
  const layout = clg.generateLayout(parsedInput);
  const result: CrosswordLayout = layout.result;

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
}

type CreateCrosswordOutput = Array<{
  clue: string;
  direction: 'across' | 'down';
  answer: string;
  x: number;
  y: number;
}>;

type CrosswordLayout = Array<{
  clue: string;
  orientation: 'across' | 'down';
  answer: string;
  startx: number;
  starty: number;
}>;

export { createCrossword };
