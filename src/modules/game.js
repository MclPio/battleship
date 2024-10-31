import { GameBoard } from "./gameboard";
import { Ship } from "./ship";
import { Player } from "./player";
import { renderShips } from "../ui/renderShips"

// create a module that helps manage actions that should happen in dom
// craft UX
// set up new game. 1) create players. 2) populate gamBoard with ships
// HTML. 1) display both players boards and render using info from GameBoard class.
// Make methods to render each player's gameBoard.
// Event listeners should use methods from other objects.
// for attacks -> clickEvent -> GameBoard.receiveAttack() -> renderDOM

export class Game {
  constructor(player1, player2) {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2);
  }
  
  start() {
    this.player1.gameBoard.placeShip(new Ship(4), ["A1", "A4"]);
    this.player2.gameBoard.placeShip(new Ship(4), ["F3", "F6"]);
    renderShips(this.player1, 1)
    renderShips(this.player2, 2)
  }
}
