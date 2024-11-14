function buildBoard(id) {
  const gameBoard = document.createElement("div");
  gameBoard.id = `game-board-${id}`;
  gameBoard.className = "game-board";
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.className = "game-board-container";

  let column;
  let square;
  let charStart = 65;
  let char;
  for (let i = 0; i < 10; i++) {
    column = document.createElement("div");
    column.className = "column";
    char = String.fromCharCode(i + charStart);
    column.id = `${char}`;
    for (let j = 1; j < 11; j++) {
      square = document.createElement("div");
      square.className = "square";
      square.id = `${id}-${char}${j}`;
      column.append(square);
    }
    gameBoard.append(column);
  }
  gameBoardContainer.append(playerName(id), gameBoard);
  return gameBoardContainer;
}

function playerName(id) {
  const playerNameDiv = document.createElement("div");
  playerNameDiv.id = `player${id}-name`;
  playerNameDiv.classList = "player-names";
  return playerNameDiv;
}

function playerButton(){
  const button = document.createElement('button');
  button.innerText = "Randomize Placement";
  button.id = 'random-ship-placement';
  return button
}

// function shipCounterDisplay(ships) {
//   const shipCounterDisplay = document.createElement('div');
//   shipCounterDisplay.id = 'ship-counter-display';
//   return shipCounterDisplay
// }

function gameInfoBoard() {
  const gameInfoBoard = document.createElement('div');
  gameInfoBoard.id = 'game-info-board'
  gameInfoBoard.append(playerButton())

  return gameInfoBoard
}

export function boardsDisplay() {
  const display = document.createElement("div");
  display.id = "display";

  const gameBoards = document.createElement('div')
  gameBoards.append(buildBoard(1), buildBoard(2))
  gameBoards.id = 'game-boards'
  display.append(gameBoards, gameInfoBoard());
  return display;
}
