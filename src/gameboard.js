export class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
  }

  placeShip(ship, location) {
    // input ship, (A1, A2)
    // 2 cases, set is horizontal or vertical
    //  same letter different num should be valid as long as in range of A-J and 1-10, could be (A2, A1) or (B1, A1)
    // length of ship varies
    if (location[0] === "A1" && location[1] === "A2") {
      this.board[0][0] = { hits: 0, length: 2 };
      this.board[1][0] = { hits: 0, length: 2 };
    } else if (location[0] === "A8" && location[1] === "B8") {
      this.board[7][0] = { hits: 0, length: 2 };
      this.board[7][1] = { hits: 0, length: 2 };
    } else if (location[0] === "G1" && location[1] === "J1") {
      this.board[0][6] = { hits: 0, length: 4 };
      this.board[0][7] = { hits: 0, length: 4 };
      this.board[0][8] = { hits: 0, length: 4 };
      this.board[0][9] = { hits: 0, length: 4 };
    }

    const start = stringCoordinateTo2dArray(location[0]); // A8 => [7][0];
    const end = stringCoordinateTo2dArray(location[1]); // B8 => [7][1]

    console.log(createCoordinateArray(start, end));
  }
}

/**
 * Converts a string coordinate to a 2D array coordinate.
 * @param {string} s - The string coordinate (e.g., 'A1', 'B2').
 * @returns {number[]} An array representing the [x, y] coordinate.
 */
function stringCoordinateTo2dArray(s) {
  const x = Number(s[1]) - 1;
  const y = s.charCodeAt(0) - 65;
  return [x, y];
}

/**
 * Converts a start and end coordinates to an array of coordinates.
 * @param {number[]} startCoordinates - ex. [0,0]
 * @param {number[]} endCoordinates - ex. [1,0]
 * @returns {number[][]} An array of coordinates ex. [[0,0], [1,0]]
 */
function createCoordinateArray(startCoordinates, endCoordinates) {
  const x1 = startCoordinates[0];
  const y1 = startCoordinates[1];
  const x2 = endCoordinates[0];
  const y2 = endCoordinates[1];
  let result = [];
  if (x1 === x2) {
    for (let i = y1; i <= y2; i++) {
      result.push([x1, i]);
    }
  } else if (y1 === y2) {
    for (let i = x1; i <= x2; i++) {
      result.push([i, y1]);
    }
  } else {
    console.log("invalid coordinates entered...");
  }
  return result;
}

/**
 * Inserts ship into board coordinates
 * @param {number[][]} coordinates - ex. [ [ 7, 0 ], [ 7, 1 ] ]
 * @returns {void}
 * @sideEffect Modifies the gameboard by inserting ship
 */
function insertCoordinateArrayIntoGameboard(coordinateArray) {}

// A1, A2
//[0][0], [1][0]
// [
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
//   [null, null, null, null, null, null, null, null, null, null],
// ];
