import { Ship } from "./ship";
import { Player } from "./player";
import { renderShips } from "../ui/renderShips";
import { nameIndicator } from "../ui/nameIndicator";
import { boardIndicator } from "../ui/boardIndicator";
import { getBoardSquaresElementList } from "../ui/getBoardSquaresElementList";
import { Computer } from "./computer";

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
    this.player2 = new Player(player2, "Computer", 2);
    this.currentPlayer = this.player1;
    this.enemyPlayer = this.player2;
  }

  switchPlayer() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      this.enemyPlayer = this.player1;
    } else if (this.currentPlayer === this.player2) {
      this.currentPlayer = this.player1;
      this.enemyPlayer = this.player2;
    }
  }

  start() {
    // input names to gameBoard
    const player1Name = document.getElementById("player1-name");
    const player2Name = document.getElementById("player2-name");
    player1Name.textContent = this.player1.name;
    player2Name.textContent = this.player2.name;

    // set up test run
    this.player1.gameBoard.placeShip(new Ship(4), ["A1", "D1"]);
    this.player2.gameBoard.placeShip(new Ship(4), ["F3", "F6"]);
    this.player1.gameBoard.receiveAttack("B1");
    this.player1.gameBoard.receiveAttack("F1");
    this.player2.gameBoard.receiveAttack("F3");
    this.player2.gameBoard.receiveAttack("A1");
    renderShips(this.player1, 1);
    renderShips(this.player2, 2);

    // Init Computer
    const computer = new Computer();

    // start game
    const display = document.getElementById("display");
    nameIndicator(this.currentPlayer.id);
    boardIndicator(this.currentPlayer.id);
    let eventTargetID;
    display.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("highlight-square") &&
        this.currentPlayer === this.player1
      ) {
        eventTargetID = event.target.id.split("-")[1];
        if (this.enemyPlayer.gameBoard.receiveAttack(eventTargetID)) {
          renderShips(this.enemyPlayer, this.enemyPlayer.id);
          if (this.enemyPlayer.gameBoard.hasBeenHit(eventTargetID)) {
          } else {
            nameIndicator(this.enemyPlayer.id);
            boardIndicator(this.enemyPlayer.id);
            this.switchPlayer();
            if (this.currentPlayer.type === "computer") {
              computer.playTurn(this.player1.gameBoard);
            }
          }
          if (this.enemyPlayer.gameBoard.allShipsSunk()) {
            alert(`${this.currentPlayer.name} has won!`);
            boardIndicator(this.enemyPlayerPlayer).clear();
            console.log(this.enemyPlayer.gameBoard);
          }
        }
      }
    });
  }
}
