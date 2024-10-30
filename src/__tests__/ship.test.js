import { Ship } from "../modules/ship";

describe("ship initializes with correct values", () => {
  test("new Ship(2) initializes with size 2", () => {
    expect(new Ship(2).length).toBe(2);
  });
  test("new Ship(2) has 0 hits", () => {
    expect(new Ship(2).hits).toBe(0);
  });
});

describe("ship has hit() function", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(3);
  });
  test("increases number of hits by 1", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test("increases number of hits by 2", () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });
});

describe("isSunk() is true when hits === length === 3", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(3);
  });
  test("ship is not sunk after 1 hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("ship is sunk after 3 hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("isSunk() is true when hits === length === 5", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(5);
  });
  test("ship is not sunk after 1 hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("ship is sunk after 5 hits", () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});

describe("isSunk() is true when hits === length === 2", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship(2);
  });
  test("ship is not sunk after 1 hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
  test("ship is sunk after 2 hits", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
