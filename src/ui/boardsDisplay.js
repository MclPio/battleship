function buildBoard(id) {
  const gameBoard = document.createElement("div");
  gameBoard.id = `game-board-${id}`;
  gameBoard.className = "game-board";
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
      square.id = `${char}${j}`;
      column.append(square);
    }
    gameBoard.append(column);
  }
  return gameBoard;
}

export function boardsDisplay() {
  const display = document.createElement("div");
  display.id = "display";
  display.append(buildBoard(1), buildBoard(2));
  return display;
}
