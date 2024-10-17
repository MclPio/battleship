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
    if (location === ("A1", "A2")) {
      this.board[0][0] = { hits: 0, length: 2 };
      this.board[1][0] = { hits: 0, length: 2 };
    }
  }
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
