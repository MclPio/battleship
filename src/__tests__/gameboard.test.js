import { Gameboard } from "../gameboard";

let gameboard;
beforeEach(() => {
  gameboard = new Gameboard();
});

describe("gameboard", () => {
  test("board length", () => {
    expect(gameboard.board).toHaveLength(10);
  });

  test("board[0] length", () => {
    expect(gameboard.board[0]).toHaveLength(10);
  });
});

describe("place ships", () => {
  test("placesShip places ship on correct coordinate", () => {
    let patrol_boat = jest.fn();
    gameboard.placeShip(patrol_boat, ("A1", "A2"));
    expect(gameboard.board[0][0] && gameboard.board[1][0]).toBe(
      patrol_boat.mockReturnValue(true)
    );
  });
});

// place ships
// receiveAttack
// track missed attacks
// Report sunk ships

// for (let i= 0; i < 10; i++){ console.log(String.fromCharCode(('A'.charCodeAt()+ i)))}
// { A: [1,9], B: [1,9], .., J[1,9]}
// gameboard.placeship(ship, location)
// gameboard.placeship(ship, [0][8] -> [0][9]) OR gameboard.placeship(ship, A[9] -> A[10])
