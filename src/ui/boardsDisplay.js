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

export function boardsDisplay() {
  const display = document.createElement("div");
  display.id = "display";
  display.append(buildBoard(1), buildBoard(2));
  return display;
}
