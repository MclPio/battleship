export function renderShips(player) {
  const gameBoard = player.gameBoard.board;
  let boardItem, coordinate, square;

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      boardItem = gameBoard[i][j];
      coordinate = letterCoordinate(i, j);
      square = document.getElementById(`${player.id}-${coordinate}`);
      if (boardItem === 0) {
        square.style = "background-color: blue";
      } else if (boardItem && boardItem[0].length && boardItem[1] === null) {
        square.style = "background-color: grey";
      } else if (boardItem && boardItem[0].length && boardItem[1] === 1) {
        square.style = "background-color: orange";
      }
    }
  }
}

function letterCoordinate(i, j) {
  return `${String.fromCharCode(j + 65)}${i + 1}`;
}
