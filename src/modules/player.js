import { GameBoard } from "./gameboard";

export class Player {
  constructor(type, name="") {
    this.type = type;
    this.gameBoard = new GameBoard();
    this.name = name
  }
}
