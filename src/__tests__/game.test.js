import { Game } from "../modules/game";

describe("initialize", () => {
  test("when there are 2 real players", () => {
    const new_game = new Game("real", "real");
    expect(new_game.player1).toBeDefined();
    expect(new_game.player2).toBeDefined();
  });
});
