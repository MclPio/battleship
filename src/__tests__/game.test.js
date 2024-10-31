import { Game } from "../modules/game";
import { Ship } from "../modules/ship";

describe("initialize", () => {
  test("when there are 2 real players", () => {
    const new_game = new Game("real", "real");
    expect(new_game.player1).toBeDefined();
    expect(new_game.player2).toBeDefined();
  });
});

describe("populate boards with ships", () => {
  const new_game = new Game("real", "real");
  test("when 1 battleship per player board does not duplicate", () => {
    new_game.player1.gameBoard.placeShip(new Ship(4), ["A1", "A4"]);
    new_game.player2.gameBoard.placeShip(new Ship(4), ["F3", "F6"]);
    expect(new_game.player1.gameBoard.get("A1")).not.toBe(null);
    expect(new_game.player2.gameBoard.get("F3")).not.toBe(null);
    expect(new_game.player2.gameBoard.get("A1")).toBe(null);
    expect(new_game.player1.gameBoard.get("F3")).toBe(null);
  });
});

// Carrier - Length: 5 (1 per game)
// Battleship - Length: 4 (1 per game)
// Cruiser - Length: 3 (1 per game)
// Submarine - Length: 3 (1 per game)
// Destroyer - Length: 2 (1 per game)
