export function clearBoard(player) {
  const gameBoard = player.gameBoard.board;
  let boardItem, coordinate, square;

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      boardItem = gameBoard[i][j];
      coordinate = letterCoordinate(i, j);
      square = document.getElementById(`${player.id}-${coordinate}`);
      square.style = "";
    }
  }
}

function letterCoordinate(i, j) {
  return `${String.fromCharCode(j + 65)}${i + 1}`;
}
