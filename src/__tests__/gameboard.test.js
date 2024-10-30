import { GameBoard } from "../gameboard";

describe("gameboard", () => {
  let gameboard;
  beforeEach(() => {
    gameboard = new GameBoard();
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
    customBoard = new GameBoard();
  });
  test("placesShip places patrol ship on correct coordinate vertically", () => {
    const patrol_boat = { length: 2, hits: 0 };
    customBoard.placeShip(patrol_boat, ["A1", "A2"]);
    expect(customBoard.board[0][0]).toStrictEqual(patrol_boat);
    expect(customBoard.board[1][0]).toStrictEqual(patrol_boat);
  });

  test("placeShip places patrol ship on correct coordinate horizontally", () => {
    const patrol_boat = { length: 2, hits: 0 };
    customBoard.placeShip(patrol_boat, ["A8", "B8"]);
    expect(customBoard.board[7][0]).toStrictEqual(patrol_boat);
    expect(customBoard.board[7][1]).toStrictEqual(patrol_boat);
  });

  test("placeShip places battle ship on correct coordinate horizontally", () => {
    const battle_ship = { length: 4, hits: 0 };
    customBoard.placeShip(battle_ship, ["G1", "J1"]);
    expect(customBoard.board[0][6]).toStrictEqual(battle_ship);
    expect(customBoard.board[0][7]).toStrictEqual(battle_ship);
    expect(customBoard.board[0][8]).toStrictEqual(battle_ship);
    expect(customBoard.board[0][9]).toStrictEqual(battle_ship);
  });

  test("placeShip places battle ship on correct coordinate vertically", () => {
    const battle_ship = { length: 4, hits: 0 };
    customBoard.placeShip(battle_ship, ["A3", "A6"]);
    expect(customBoard.board[2][0]).toStrictEqual(battle_ship);
    expect(customBoard.board[3][0]).toStrictEqual(battle_ship);
    expect(customBoard.board[4][0]).toStrictEqual(battle_ship);
    expect(customBoard.board[5][0]).toStrictEqual(battle_ship);
  });

  test("placeShip on another ship does not change board", () => {
    const aircraft_carrier = { length: 5, hits: 0 };
    customBoard.placeShip(aircraft_carrier, ["F1", "J1"]);
    expect(customBoard.board[0][5]).not.toStrictEqual(aircraft_carrier);
    expect(customBoard.board[0][6]).not.toStrictEqual(aircraft_carrier);
    expect(customBoard.board[0][7]).not.toStrictEqual(aircraft_carrier);
    expect(customBoard.board[0][8]).not.toStrictEqual(aircraft_carrier);
    expect(customBoard.board[0][9]).not.toStrictEqual(aircraft_carrier);
  });

  test("placeShip aircraft_carrier, [K1, N1] out of bounds throws error", () => {
    const aircraft_carrier = { length: 5, hits: 0 };
    expect(() => customBoard.placeShip(aircraft_carrier, ["K1", "N1"])).toThrow(
      "invalid coordinates"
    );
  });
  test("placeShip aircraft_carrier, [A1, C3] diagonal throws error", () => {
    const aircraft_carrier = { length: 5, hits: 0 };
    expect(() =>
      customBoard.placeShip(aircraft_carrier, ["A1", "C3"])
    ).toThrow();
  });

  test("placeShip aircraft_carrier, [] no coordinates throws error", () => {
    const aircraft_carrier = { length: 5, hits: 0 };
    expect(() => customBoard.placeShip(aircraft_carrier, [])).toThrow();
  });

  test("placeShip destroyer, [E9, F9] coordinates throws error as coordinate.length < ship.length", () => {
    const destroyer = { length: 3, hits: 0 };
    customBoard.placeShip(destroyer, ["E9", "F9"]);
    expect(customBoard.board[8][4]).not.toStrictEqual(destroyer);
    expect(customBoard.board[8][5]).not.toStrictEqual(destroyer);
  });
});

describe("receiveAttack(coordinate)", () => {
  test("hits a ship", () => {
    let gameboard = new GameBoard();
    const mockShip = { length: 4, hits: 0, hit: jest.fn() };
    gameboard.placeShip(mockShip, ["A1", "A4"]);
    gameboard.receiveAttack("A1");
    expect(mockShip.hit).toHaveBeenCalled();
  });
  test("missed a ship records coordinate as 1", () => {
    let gameboard = new GameBoard();
    const mockShip = { length: 4, hits: 0, hit: jest.fn() };
    gameboard.placeShip(mockShip, ["A1", "A4"]);
    gameboard.receiveAttack("B1");
    expect(mockShip.hit).not.toHaveBeenCalled();
    expect(gameboard.board[0][1]).toBe(0);
  });
  test("keeps track of missed attacks", () => {
    const gameboard = new GameBoard();
    const mockShip = { length: 4, hits: 0, hit: jest.fn() };
    gameboard.placeShip(mockShip, ["A8", "D8"]);
    gameboard.receiveAttack("A7");
    gameboard.receiveAttack("D9");
    expect(gameboard.board[6][0]).toBe(0);
    expect(gameboard.board[8][3]).toBe(0);
  });
});

describe("gameboard reports when all ships are sunk", () => {
  const gameboard = new GameBoard();
  const mockShipOne = {
    length: 2,
    hits: 0,
    hit: jest.fn(function () {
      this.hits += 1;
    }),
    isSunk: jest.fn(function () {
      return this.hits === this.length;
    }),
  };
  const mockShipTwo = {
    length: 2,
    hits: 0,
    hit: jest.fn(function () {
      this.hits += 1;
    }),
    isSunk: jest.fn(function () {
      return this.hits === this.length;
    }),
  };
  test("when 1 ship is still left", () => {
    gameboard.placeShip(mockShipOne, ["A1", "B1"]);
    gameboard.placeShip(mockShipTwo, ["A2", "A3"]);
    gameboard.receiveAttack("A1");
    gameboard.receiveAttack("B1");
    gameboard.receiveAttack("A2");
    expect(gameboard.allShipsSunk()).toBe(false);
  });
  test("when all ships are sunk", () => {
    gameboard.receiveAttack("A3");
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
