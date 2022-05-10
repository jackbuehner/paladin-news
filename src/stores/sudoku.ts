import { browser } from '$app/env';
import { writable } from 'svelte/store';

type Sudoku = { [key: string]: { normal?: number[][]; challenge?: number[][] } };

export const sudoku = writable<Sudoku | null>(null);

sudoku.subscribe((value) => {
  if (browser) {
    if (!value) {
      const storedSudoku: Sudoku = JSON.parse(
        localStorage.getItem('games.sudoku') || '{}'
      ) as Sudoku;
      sudoku.set(storedSudoku);
    } else {
      localStorage.setItem('games.sudoku', JSON.stringify(value));
    }
  }
});
