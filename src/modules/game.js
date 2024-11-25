import { Ship } from "./ship";
import { Player } from "./player";
import { renderShips } from "../ui/renderShips";
import { nameIndicator } from "../ui/nameIndicator";
import { boardIndicator } from "../ui/boardIndicator";
import { getBoardSquaresElementList } from "../ui/getBoardSquaresElementList";
import { Computer } from "./computer";
import { clearBoard } from "../ui/clearBoard";
import renderShipsHealth from "../ui/renderShipsHealth";
import { restartGame } from "../ui/boardsDisplay";
import confetti from 'canvas-confetti';

export class Game {
  constructor(player1, player2) {
    this.player1 = new Player(player1, "Player", 1);
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

    randomPlaceShips(this.player1.gameBoard, shipCollection())
    shipPlacementButton(this.player1, shipCollection())

    // Init board
    randomPlaceShips(this.player2.gameBoard, shipCollection())
    renderShips(this.player1, 1);
    renderShips(this.player2, 2);

    this.startGame();
  }

  begin() {
    const display = document.getElementById("display");
    nameIndicator(this.currentPlayer.id);
    boardIndicator(this.currentPlayer.id);
    const computer = new Computer();
    let eventTargetID;

    display.addEventListener("click", (event) => {
      if (event.target.classList.contains("highlight-square")) {
        eventTargetID = event.target.id.split("-")[1];
        if (this.enemyPlayer.gameBoard.receiveAttack(eventTargetID)) {
          renderShips(this.enemyPlayer);
          renderShipsHealth(this.enemyPlayer);
          
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
          boardIndicator(this.enemyPlayerPlayer).clear();
          announceWinner(this.currentPlayer.name)
        }
      }
    });
  }
  
  startGame() {
    const startGame = document.getElementById('start-game');
    const randomShipButton = document.getElementById('random-ship-placement');
    const gameInfoBoard1 = document.getElementById('game-info-board-1');
    startGame.addEventListener('click', () => {
      startGame.remove();
      randomShipButton.remove();
      gameInfoBoard1.prepend(restartGame())
      this.begin();
    })
  }
}

function clickBoard(stringCoordinate) {
  const elements = getBoardSquaresElementList(1);
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].id.split("-")[1] === stringCoordinate) {
      setTimeout(() => {
        elements[i].click();
      }, 500);
    }
  }
}

function computerPlaysWhenCurrentPlayer(currentPlayer, computer, player1) {
  if (currentPlayer.type === "computer") {
    const attackCoordinate = computer.playTurn(player1.gameBoard);
    clickBoard(attackCoordinate);
  }
}

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
}

function shipPlacementButton(player, shipCollection){
  const randomShipPlacementButton = document.getElementById('random-ship-placement')
  randomShipPlacementButton.addEventListener('click', () => {
    player.gameBoard.clear();
    randomPlaceShips(player.gameBoard, shipCollection)
    clearBoard(player)
    renderShips(player);
  })
}

function announceWinner(winnerName) {
  const overlay = document.createElement('div');
  overlay.id = 'winner-overlay';
  overlay.textContent = `${winnerName} Wins! 🎉`;

  document.body.appendChild(overlay);

  // Trigger confetti
  confetti({
    particleCount: 200,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
  });

  setTimeout(() => {
    overlay.remove();
  }, 3000);
}

// 1. improve style
// 2. refactor game.js