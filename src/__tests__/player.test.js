import { Player } from "../player";

const computer = new Player("computer");
const real = new Player("real");

describe("player types", () => {
  test("player type computer", () => {
    expect(computer.type).toBe("computer");
  });
  test("player type real", () => {
    expect(real.type).toBe("real");
  });
});

describe("has its own gameBoard", () => {
  test("player has its own gameBoard", () => {
    expect(real.gameBoard).toBeDefined();
    expect(computer.gameBoard).toBeDefined();
  });
});
