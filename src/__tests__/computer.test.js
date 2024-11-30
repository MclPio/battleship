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

describe("computer does not get confused when 2 ships are parallel vertically", () => {
  test("when 2 ships are on C and D", () => {
    const computer = new Computer();
    const gameBoard = new GameBoard();
    gameBoard.placeShip(new Ship(4), ["C2", "C5"]);
    gameBoard.placeShip(new Ship(4), ["D2", "D5"]);
    gameBoard.receiveAttack("C3");
    gameBoard.receiveAttack("D3");
    gameBoard.receiveAttack("B3");
    gameBoard.receiveAttack("E3")

    // add hits to computer.previousHits
    computer.addHit(2, 2)
    computer.addHit(2, 3)
    computer.addHit(2, 1)
    computer.addHit(2, 4)

    //expect computer to use upDown to pick value
    gameBoard.receiveAttack(computer.playTurn(gameBoard));
    expect(gameBoard.board[1][2][1] || gameBoard.board[1][3][1] || gameBoard.board[3][2][1] || gameBoard.board[3][3][1]).toBe(1)
  })
})
