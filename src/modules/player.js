import { GameBoard } from "./gameboard";

export class Player {
  constructor(type) {
    this.type = type;
    this.gameBoard = new GameBoard();
  }
}
