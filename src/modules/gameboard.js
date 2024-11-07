import { Ship } from "./ship";

export class GameBoard {
  constructor() {
    this.board = Array(10)
      .fill(null)
      .map(() => Array(10).fill(null));
    this.ships = [];
  }

  // returns the item placed on the board by location. ex A1, A10, F2, F5
  get(location) {
    let x = stringCoordinateTo2dArray(location)[0];
    let y = stringCoordinateTo2dArray(location)[1];
    return this.board[x][y];
  }

  /**
   * Places ship on board
   * @param {Ship} ship
   * @param {string[]}  ["A1", "A2"] for a ship with len 2
   * @throws Will throw an error if coordinates are invalid or unavailable.
   */
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
        this.ships.push(ship);
      }
    } else {
      throw "invalid coordinates entered...";
    }
  }

  /**
   * Attacks ship into board coordinates
   * @param {coordinate} coordinate - "A1"
   * @returns {Boolean} true attack complete, false already hit coordinate
   * @sideEffect Modifies GameBoard with 1 or 0 and ship object by calling hit()
   */
  receiveAttack(coordinate) {
    const [x, y] = stringCoordinateTo2dArray(coordinate);
    if (this.hasBeenHit(coordinate) || this.hasMiss(coordinate)) {
      return false;
    }

    if (this.hasShip(coordinate)) {
      this.board[x][y][0].hit();
      this.board[x][y][1] = 1;
    } else {
      this.board[x][y] = 0;
    }
    return true;
  }

  hasBeenHit(coordinate) {
    const [x, y] = stringCoordinateTo2dArray(coordinate);
    if (this.board[x][y] != null) {
      return this.board[x][y][1] === 1;
    }
  }

  hasShip(coordinate) {
    const [x, y] = stringCoordinateTo2dArray(coordinate);
    if (this.board[x][y] != null) {
      return this.board[x][y][0] instanceof Ship;
    }
  }

  hasMiss(coordinate) {
    const [x, y] = stringCoordinateTo2dArray(coordinate);
    return this.board[x][y] === 0;
  }

  /**
   * Check this.board to see if ship.isSunk() returns True
   * @returns {Boolean} true all ships are sunk, false there are still more ships to hit
   */
  allShipsSunk() {
    for (let i = 0; i < this.ships.length; i++) {
      if (this.ships[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }
  /**
   * Inserts ship into board coordinates
   * @param {number[][]} coordinates - ex. [ [ 7, 0 ], [ 7, 1 ] ]
   * @returns {void}
   * @sideEffect Modifies the GameBoard by inserting ship
   */
  #insertCoordinateArrayIntoGameBoard(coordinateArray, ship) {
    for (let i = 0; i < coordinateArray.length; i++) {
      this.board[coordinateArray[i][0]][coordinateArray[i][1]] = [ship, null];
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
  const x = Number(s.slice(1)) - 1;
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
//   [0, 1, 1, 0, null, null, null, null, null, null],
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
