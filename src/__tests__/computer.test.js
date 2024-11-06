import { Computer } from "../modules/computer";
import { getBoardSquaresElementList } from "../ui/getBoardSquaresElementList";
import { GameBoard } from "../modules/gameboard";
import { Ship } from "../modules/ship";

describe("computer makes a reasonable guess when 2 hit on board", () => {
  test("when there is a hit on B2 B3", () => {
    const computer = new Computer();
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(4), ["B1", "B4"]);
    gameBoard.receiveAttack("B2");
    gameBoard.receiveAttack("B3");
  });
});
