import { Ship } from "./ship";
import { Player } from "./player";
import { renderShips } from "../ui/renderShips";
import { nameIndicator } from "../ui/nameIndicator";
import { boardIndicator } from "../ui/boardIndicator";
import { getBoardSquaresElementList } from "../ui/getBoardSquaresElementList";
import { Computer } from "./computer";

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

    // random place ships for computer
    randomPlaceShips(this.player2.gameBoard, shipCollection());

    // set up test run
    this.player1.gameBoard.placeShip(new Ship(4), ["B1", "E1"]);
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
      if (event.target.classList.contains("highlight-square")) {
        eventTargetID = event.target.id.split("-")[1];
        if (this.enemyPlayer.gameBoard.receiveAttack(eventTargetID)) {
          renderShips(this.enemyPlayer);

          if (this.enemyPlayer.gameBoard.hasBeenHit(eventTargetID)) {
            computerPlaysWhenCurrentPlayer(
              this.currentPlayer,
              computer,
              this.player1
            );
          } else {
            nameIndicator(this.enemyPlayer.id);
            boardIndicator(this.enemyPlayer.id);
            this.switchPlayer();

            computerPlaysWhenCurrentPlayer(
              this.currentPlayer,
              computer,
              this.player1
            );
          }
        }
        if (this.enemyPlayer.gameBoard.allShipsSunk()) {
          console.log(`${this.currentPlayer.name} has won!`);
          boardIndicator(this.enemyPlayerPlayer).clear();
        }
      }
    });
  }
}

function clickBoard(stringCoordinate) {
  const elements = getBoardSquaresElementList(1);
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id.split("-")[1] === stringCoordinate) {
      setTimeout(() => {
        elements[i].click();
      }, 0);
    }
  }
}

function computerPlaysWhenCurrentPlayer(currentPlayer, computer, player1) {
  if (currentPlayer.type === "computer") {
    const attackCoordinate = computer.playTurn(player1.gameBoard);
    clickBoard(attackCoordinate);
  }
}

// need to have a ship placement system. random necessary for computer. player will have random and type coordinates...

function shipCollection() {
  return [new Ship(2), new Ship(3), new Ship(3), new Ship(4), new Ship(5)];
}

function randomPlaceShips(gameBoard, shipCollection) {
  let coordinates;
  let attempt = false;

  for (let i = 0; i < shipCollection.length; i++) {
    coordinates = gameBoard.getRandomShipPlacement(shipCollection[i].length)
    while (true){
      coordinates = gameBoard.getRandomShipPlacement(shipCollection[i].length)
      attempt = gameBoard.placeShip(shipCollection[i], coordinates)
      if (attempt === true) {
        break
      }
    }    
  }
  console.log(gameBoard.board, gameBoard.ships, gameBoard.ships.length)
}
