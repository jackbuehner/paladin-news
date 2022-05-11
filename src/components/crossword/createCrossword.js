/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

//https://stackoverflow.com/a/1021800/3533655
//Author: Fernando Zablah
//Adpated for The Paladin by Jack Buehner

const printPuzzle = (m, gridSize) => {
  let str = '  ';
  for (let i = 0; i < gridSize; i++) {
    str += i + ' ';
  }
  str += '\n';
  for (let i = 0; i < gridSize; i++) {
    str += i + ' ';
    for (let j = 0; j < gridSize; j++) {
      str += m[i][j] + ' ';
    }
    str += '\n';
  }
  console.log(str);
};

const placeInPuzzle = ({ x, y, wordToPlace, orientation, puzzle }) => {
  if (orientation === 'horizontal') {
    for (let i = 0; i < wordToPlace.length; i++) {
      puzzle[y][x + i] = wordToPlace.charAt(i);
    }
  } else {
    for (let i = 0; i < wordToPlace.length; i++) {
      puzzle[y + i][x] = wordToPlace.charAt(i);
    }
  }
  return puzzle;
  //printPuzzle(puzzle, gridSize);
};

const generatePuzzle = (inputWords, gridSize) => {
  const wordsInPuzzle = [];
  let intersecctions = 0;

  const getRandomPoint = () => Math.floor(Math.random() * gridSize); // returns a random integer from 0 to gridSize - 1
  const getRandomOrientation = () => (Math.random() < 0.5 ? 'horizontal' : 'vertical');

  //Sort all the words by length, descending
  inputWords = inputWords.sort((a, b) => a.word.length - b.word.length);
  let crosswordInvalid = false;

  //take the next word.
  const placeWord = (wordToPlace) => {
    //Search through all the words that are already on the board and see if there are any possible intersections (any common letters) with this word.
    let placed = false; //flag for exiting loop
    while (!placed) {
      if (wordsInPuzzle.length === 0) {
        //first word
        //Insert in random position
        const x = getRandomPoint();
        const y = getRandomPoint();
        const orientation = getRandomOrientation();
        if (orientation === 'horizontal') {
          if (x + wordToPlace.word.length <= gridSize) {
            //place word
            placed = true;
            //placeInPuzzle({ x, y, wordToPlace, orientation });
            wordsInPuzzle.push({
              word: wordToPlace.word,
              orientation,
              x,
              y,
              clue: wordToPlace.clue,
            });
          } //if not, flag stays the same and repeats
        } else {
          if (y + wordToPlace.word.length <= gridSize) {
            //place word
            placed = true;
            //placeInPuzzle({ x, y, wordToPlace, orientation });
            wordsInPuzzle.push({
              word: wordToPlace.word,
              orientation,
              x,
              y,
              clue: wordToPlace.clue,
            });
          }
        } //if not, flag stays the same and repeats
      } else {
        //Is not first word
        //check for intersections
        const wordToPlaceSet = new Set(Array.from(wordToPlace.word));
        for (let i = 0; i < wordsInPuzzle.length; i++) {
          const word = wordsInPuzzle[i];
          for (let j = 0; j < word.word.length; j++) {
            const currentLetter = word.word.charAt(j);
            if (wordToPlaceSet.has(currentLetter)) {
              //There is an intersection
              let intersectionValid = true;
              //try to place word without colliding with other
              if (word.orientation == 'horizontal') {
                //Try to place word vertically
                const letterIndexWordToPlace = wordToPlace.word.indexOf(currentLetter);
                //Check upper bounds
                const upperWord = wordToPlace.word.substring(0, letterIndexWordToPlace);
                if (word.y - upperWord.length < 0) {
                  //Cant be placed, search next word
                  intersectionValid = false;
                }
                //check lower bounds
                const lowerWord = wordToPlace.word.substring(
                  letterIndexWordToPlace + 1,
                  wordToPlace.word.length
                );
                if (lowerWord.length + word.y >= gridSize) {
                  //Cant be placed, search next word
                  intersectionValid = false;
                }

                //Check for collisions
                const wordToPlaceXi = word.x + j; //placed word x + index of letter with intersection
                const wordToPlaceYi = word.y - upperWord.length; //placed word y - lenght of upper part of new string
                const wordToPlaceCoordinates = new Set();
                for (let l = 0; l < wordToPlace.word.length; l++) {
                  wordToPlaceCoordinates.add(`${wordToPlaceXi}-${wordToPlaceYi + l}`); //x-y coors
                }
                for (let k = 0; k < wordsInPuzzle.length; k++) {
                  const wordToCheckCollision = wordsInPuzzle[k];
                  if (k !== i) {
                    //dont check collisions for same word with intersecction
                    if (wordToCheckCollision.orientation === 'vertical') {
                      for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                        if (
                          wordToPlaceCoordinates.has(
                            `${wordToCheckCollision.x}-${wordToCheckCollision.y + m}`
                          )
                        ) {
                          //There is a collision, cant be placed,  search next word
                          intersectionValid = false;
                        }
                      }
                    } else {
                      for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                        if (
                          wordToPlaceCoordinates.has(
                            `${wordToCheckCollision.x + m}-${wordToCheckCollision.y}`
                          )
                        ) {
                          //There is a collision, cant be placed,  search next word
                          intersectionValid = false;
                        }
                      }
                    }
                  }
                }
                if (intersectionValid) {
                  intersecctions++;
                  //If all all above has been succesfull word can be placed
                  //placeInPuzzle({ x: wordToPlaceXi, y: wordToPlaceYi, wordToPlace, orientation: 'vertical' });
                  wordsInPuzzle.push({
                    word: wordToPlace.word,
                    orientation: 'vertical',
                    x: wordToPlaceXi,
                    y: wordToPlaceYi,
                    clue: wordToPlace.clue,
                  });
                  return;
                }
              } else {
                //Try to place word horizontally
                //Check left bounds
                const letterIndexWordToPlace = wordToPlace.word.indexOf(currentLetter);
                const leftWord = wordToPlace.word.substring(0, letterIndexWordToPlace);
                if (word.x - leftWord.length < 0) {
                  //Cant be placed, search next word
                  intersectionValid = false;
                }
                //check right bounds
                const rightWord = wordToPlace.word.substring(
                  letterIndexWordToPlace + 1,
                  wordToPlace.word.length
                );
                if (rightWord.length + word.x >= gridSize) {
                  //Cant be placed, search next word
                  intersectionValid = false;
                }

                //Check for collisions
                const wordToPlaceXi = word.x - leftWord.length;
                const wordToPlaceYi = word.y + j;

                const wordToPlaceCoordinates = new Set();
                for (let l = 0; l < wordToPlace.word.length; l++) {
                  wordToPlaceCoordinates.add(`${wordToPlaceXi + l}-${wordToPlaceYi}`); //x-y coors
                }
                for (let k = 0; k < wordsInPuzzle.length; k++) {
                  const wordToCheckCollision = wordsInPuzzle[k];
                  if (k !== i) {
                    //dont check collisions for same word with intersecction
                    if (wordToCheckCollision.orientation === 'vertical') {
                      for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                        if (
                          wordToPlaceCoordinates.has(
                            `${wordToCheckCollision.x}-${wordToCheckCollision.y + m}`
                          )
                        ) {
                          //There is a collision, cant be placed,  search next word
                          intersectionValid = false;
                        }
                      }
                    } else {
                      for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                        if (
                          wordToPlaceCoordinates.has(
                            `${wordToCheckCollision.x + m}-${wordToCheckCollision.y}`
                          )
                        ) {
                          //There is a collision, cant be placed,  search next word
                          intersectionValid = false;
                        }
                      }
                    }
                  }
                }
                if (intersectionValid) {
                  intersecctions++;
                  //If all all above has been succesfull word can be placed
                  //placeInPuzzle({ x: wordToPlaceXi, y: wordToPlaceYi, wordToPlace, orientation: 'horizontal' });
                  wordsInPuzzle.push({
                    word: wordToPlace.word,
                    orientation: 'horizontal',
                    x: wordToPlaceXi,
                    y: wordToPlaceYi,
                    clue: wordToPlace.clue,
                  });
                  return;
                }
              }
            }
          }
        }
        //No intersection found, place in any space available
        //check all available vertical options
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            //get x & y
            //check it doesnt exits grid
            if (y + wordToPlace.word.length > gridSize) {
              //placement is invalid, jump to next iteration
              continue;
            }
            if (y + wordToPlace.word.length > gridSize) {
              //placement is invalid, jump to next iteration
              continue;
            }
            //check for collitions
            let collitionFound = false;
            //save in SET word coors
            const wordToPlaceCoordinates = new Set();
            for (let l = 0; l < wordToPlace.word.length; l++) {
              wordToPlaceCoordinates.add(`${x}-${y + l}`); //x-y coors
            }
            for (let i = 0; i < wordsInPuzzle.length; i++) {
              const wordToCheckCollision = wordsInPuzzle[i];
              if (collitionFound) break;
              if (wordToCheckCollision.orientation === 'vertical') {
                for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                  if (
                    wordToPlaceCoordinates.has(
                      `${wordToCheckCollision.x}-${wordToCheckCollision.y + m}`
                    )
                  ) {
                    //There is a collision, cant be placed,  continue next iteration
                    collitionFound = true;
                    break;
                  }
                }
              } else {
                for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                  if (
                    wordToPlaceCoordinates.has(
                      `${wordToCheckCollision.x + m}-${wordToCheckCollision.y}`
                    )
                  ) {
                    //There is a collision, cant be placed,  continue next iteration
                    collitionFound = true;
                    break;
                  }
                }
              }
            }
            if (collitionFound) continue;
            //If all all above has been succesfull word can be placed
            //placeInPuzzle({ x, y, wordToPlace, orientation: 'vertical' });
            wordsInPuzzle.push({
              word: wordToPlace.word,
              orientation: 'vertical',
              x,
              y,
              clue: wordToPlace.clue,
            });
            return;
          }
        }
        //check all available horizontal options
        for (let y = 0; y < gridSize; y++) {
          for (let x = 0; x < gridSize; x++) {
            //get x & y
            //check it doesnt exits grid
            if (x + wordToPlace.word.length > gridSize) {
              //placement is invalid, jump to next iteration
              continue;
            }
            if (x + wordToPlace.word.length > gridSize) {
              //placement is invalid, jump to next iteration
              continue;
            }
            //check for collitions
            let collitionFound = false;
            //save in SET word coors
            const wordToPlaceCoordinates = new Set();
            for (let l = 0; l < wordToPlace.word.length; l++) {
              wordToPlaceCoordinates.add(`${x + l}-${y}`); //x-y coors
            }
            for (let i = 0; i < wordsInPuzzle.length; i++) {
              const wordToCheckCollision = wordsInPuzzle[i];
              if (collitionFound) break;
              if (wordToCheckCollision.orientation === 'vertical') {
                for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                  if (
                    wordToPlaceCoordinates.has(
                      `${wordToCheckCollision.x}-${wordToCheckCollision.y + m}`
                    )
                  ) {
                    //There is a collision, cant be placed,  continue next iteration
                    collitionFound = true;
                    break;
                  }
                }
              } else {
                for (let m = 0; m < wordToCheckCollision.word.length; m++) {
                  if (
                    wordToPlaceCoordinates.has(
                      `${wordToCheckCollision.x + m}-${wordToCheckCollision.y}`
                    )
                  ) {
                    //There is a collision, cant be placed,  continue next iteration
                    collitionFound = true;
                    break;
                  }
                }
              }
            }
            if (collitionFound) continue;
            //If all all above has been succesfull word can be placed
            //placeInPuzzle({ x, y, wordToPlace, orientation: 'horizontal' });
            wordsInPuzzle.push({
              word: wordToPlace.word,
              orientation: 'horizontal',
              x,
              y,
              clue: wordToPlace.clue,
            });
            return;
          }
        }
        //If got here there is no possible placement
        //console.log('no possible placement found');
        crosswordInvalid = true;
        return;
      }
    }
  };
  for (let i = 0; i < inputWords.length; i++) {
    if (crosswordInvalid) return false;
    const w = inputWords[i];
    placeWord(w);
  }
  if (inputWords.length !== wordsInPuzzle.length) return false;
  else return { puzzle: wordsInPuzzle, intersecctions };
};

/**
 * Generates multiple crosswords and returns the best generated layout.
 *
 * @param {Object} input
 * @param {{ word: string, clue: string }[]} input.words
 * @param {number} input.gridSize
 * @param {boolean | undefined} input.print
 * @param {number | undefined} input.tries
 * @returns {{ word: string, clue: string, x: number, y: number, orientation: 'horizontal' | 'vertical' }[]}
 */
const getBestPuzzle = ({ words, gridSize, tries, print }) => {
  if (words.length < 1) return false;
  if (!words.every((w) => w.word.length <= gridSize && /^[a-zA-Z0-9 ]*$/g.test(w.word))) {
    //must be less or equal than gridSize and must be only spaces, numbers and letters
    return false;
  }
  if (!tries) tries = 75;
  let puzzles = [];
  for (let i = 0; i < tries; i++) {
    //try to generate 'tries' quantity of puzzles
    const puzzle = generatePuzzle(words, gridSize);
    if (puzzle) puzzles.push(puzzle);
  }
  if (puzzles.length < 1) return false;
  puzzles = puzzles.sort((a, b) => b.intersecctions - a.intersecctions); //get best puzzle
  if (print) {
    const finalPuzzle = [];
    //Create empty puzzle
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push('*');
      }
      finalPuzzle.push(row);
    }
    puzzles[0].puzzle.forEach((w) => {
      //place words in puzzle - only for terminal vizualization
      placeInPuzzle({
        x: w.x,
        y: w.y,
        wordToPlace: w.word,
        orientation: w.orientation,
        puzzle: finalPuzzle,
      });
    });
    printPuzzle(finalPuzzle, gridSize);
  }
  return puzzles[0].puzzle.map((w) => {
    return {
      word: w.word,
      x: w.x,
      y: w.y,
      orientation: w.orientation,
      clue: w.clue,
    };
  });
};

export { getBestPuzzle as createCrossword };
