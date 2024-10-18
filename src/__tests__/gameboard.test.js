import { Gameboard } from "../gameboard";

describe("gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new Gameboard();
  });
  test("board length", () => {
    expect(gameboard.board).toHaveLength(10);
  });

  test("board[0] length", () => {
    expect(gameboard.board[0]).toHaveLength(10);
  });
});

describe("place ships", () => {
  let customBoard;
  beforeAll(() => {
    customBoard = new Gameboard();
  });
  test("placesShip places patrol ship on correct coordinate vertically", () => {
    const patrol_boat = { length: 2, hits: 0 };
    customBoard.placeShip(patrol_boat, ["A1", "A2"]);
    expect(customBoard.board[0][0] && customBoard.board[1][0]).toStrictEqual(
      patrol_boat
    );
  });

  test("placeShip places patrol ship on correct coordinate horizontally", () => {
    const patrol_boat = { length: 2, hits: 0 };
    customBoard.placeShip(patrol_boat, ["A8", "B8"]);
    expect(customBoard.board[7][0] && customBoard.board[7][1]).toStrictEqual(
      patrol_boat
    );
  });

  test("placeShip places battle ship on correct coordinate horizontally", () => {
    const battle_ship = { length: 4, hits: 0 };
    customBoard.placeShip(battle_ship, ["G1", "J1"]);
    expect(customBoard.board[0][6]).toStrictEqual(battle_ship);
  });

  // test("placeShip places battle ship on correct coordinate vertically", () => {
  //   const battle_ship = { length: 4, hits: 0 };
  //   customBoard.placeShip(battle_ship, ["A3", "A6"]);
  //   expect(
  //     customBoard.board[2][0] &&
  //       customBoard.board[3][0] &&
  //       customBoard.board[4][0] &&
  //       customBoard.board[5][0]
  //   ).toStrictEqual(battle_ship);
  // });
});

// place ships
// receiveAttack
// track missed attacks
// Report sunk ships

// for (let i= 0; i < 10; i++){ console.log(String.fromCharCode(('A'.charCodeAt()+ i)))}
// { A: [1,9], B: [1,9], .., J[1,9]}
// gameboard.placeship(ship, location)
// gameboard.placeship(ship, [0][8] -> [0][9]) OR gameboard.placeship(ship, A[9] -> A[10])
