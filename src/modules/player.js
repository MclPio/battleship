import { GameBoard } from "./gameboard";

export class Player {
  constructor(type, name = "", id) {
    this.type = type;
    this.gameBoard = new GameBoard();
    this.name = name;
    this.id = id;
  }
}
