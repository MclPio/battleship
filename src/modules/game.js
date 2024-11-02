import { Ship } from "./ship";
import { Player } from "./player";
import { renderShips } from "../ui/renderShips";
import { nameIndicator } from "../ui/nameIndicator";

// create a module that helps manage actions that should happen in dom
// craft UX
// set up new game. 1) create players. 2) populate gamBoard with ships
// HTML. 1) display both players boards and render using info from GameBoard class.
// Make methods to render each player's gameBoard.
// Event listeners should use methods from other objects.
// for attacks -> clickEvent -> GameBoard.receiveAttack() -> renderDOM

export class Game {
  constructor(player1, player2) {
    this.player1 = new Player(player1, "Michael");
    this.player2 = new Player(player2, "Joe");
    this.turn = this.player1;
  }

  start() {
    // input names to gameBoard
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");
    player1Name.textContent = this.player1.name;
    player2Name.textContent = this.player2.name;

    // set up test run
    this.player1.gameBoard.placeShip(new Ship(4), ["A1", "A4"]);
    this.player2.gameBoard.placeShip(new Ship(4), ["F3", "F6"]);
    this.player1.gameBoard.receiveAttack("A1");
    this.player1.gameBoard.receiveAttack("F1");
    this.player2.gameBoard.receiveAttack("F3");
    this.player2.gameBoard.receiveAttack("A1");
    renderShips(this.player1, 1);
    renderShips(this.player2, 2);

    // start the game
    const display = document.getElementById("display");
    display.addEventListener(
      "click",
      (event) => {
        console.log(event.target);
      },
      { once: false }
    );
  }
}
