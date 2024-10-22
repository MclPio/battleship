export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
  }

  placeShip(ship, location) {
    const regex = /^[A-J](?:[1-9]|10)$/;
    if (regex.test(location[0]) && regex.test(location[1])) {
      const start = stringCoordinateTo2dArray(location[0]); // A8 => [7][0];
      const end = stringCoordinateTo2dArray(location[1]); // B8 => [7][1]
      const coordinateArray = createCoordinateArray(start, end);
      if (
        this.#coordinatesNotTaken(coordinateArray) &&
        coordinatesFitShip(coordinateArray, ship)
      ) {
        this.#insertCoordinateArrayIntoGameBoard(coordinateArray, ship);
      }
    } else {
      throw "invalid coordinates entered...";
    }
  }

  receiveAttack(coordinates) {
    const x = stringCoordinateTo2dArray(coordinates)[0];
    const y = stringCoordinateTo2dArray(coordinates)[1];

    if (this.board[x][y] != null) {
      this.board[x][y].hit();
    } else {
      this.board[x][y] = 1;
    }
  }
  /**
   * Inserts ship into board coordinates
   * @param {number[][]} coordinates - ex. [ [ 7, 0 ], [ 7, 1 ] ]
   * @returns {void}
   * @sideEffect Modifies the GameBoard by inserting ship
   */
  #insertCoordinateArrayIntoGameBoard(coordinateArray, ship) {
    for (let i = 0; i < coordinateArray.length; i++) {
      this.board[coordinateArray[i][0]][coordinateArray[i][1]] = ship;
    }
  }

  #coordinatesNotTaken(coordinateArray) {
    for (let i = 0; i < coordinateArray.length; i++) {
      if (this.board[coordinateArray[i][0]][coordinateArray[i][1]] != null) {
        return false;
      }
    }
    return true;
  }
}

function coordinatesFitShip(coordinateArray, ship) {
  return coordinateArray.length === ship.length;
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
    throw "invalid coordinates entered...";
  }
  return result;
}

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
