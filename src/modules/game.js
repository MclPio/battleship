import { Ship } from "./ship";
import { Player } from "./player";
import { renderShips } from "../ui/renderShips";
import { nameIndicator } from "../ui/nameIndicator";
import { boardIndicator } from "../ui/boardIndicator";

// create a module that helps manage actions that should happen in dom
// craft UX
// set up new game. 1) create players. 2) populate gamBoard with ships
// HTML. 1) display both players boards and render using info from GameBoard class.
// Make methods to render each player's gameBoard.
// Event listeners should use methods from other objects.
// for attacks -> clickEvent -> GameBoard.receiveAttack() -> renderDOM

export class Game {
  constructor(player1, player2) {
    this.player1 = new Player(player1, "Michael", 1);
    this.player2 = new Player(player2, "Joe", 2);
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
    // const display = document.getElementById("display");
    // display.addEventListener(
    //   "click",
    //   (event) => {
    //     console.log(event.target);
    //   },
    //   { once: false }
    // );

    // announceTurn player1
    // allowClicks2
    // wait for click on board 2
    // if (player1 clicks on board2 and it is valid turn) {
    //   renderBoard2
    //   updateData2 (change board data for player 2)
    //   checkWinner
    //   disallowClicks2
    //   announceTurn
    //   allowClicks1
    //   switch to player 2 turn
    //   wait for click on board 1
    // }

    nameIndicator(this.player1.id);
    boardIndicator(this.player1.id, this.player2.id);

    while (false) {
      nameIndicator(this.player1.id);
      boardIndicator(this.player1.id, this.player2.id);
    }
  }
}
