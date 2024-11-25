export function renderShips(player) {
  const gameBoard = player.gameBoard.board;
  let boardItem, coordinate, square;

  if (player.id === 1) {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        boardItem = gameBoard[i][j];
        coordinate = letterCoordinate(i, j);
        square = document.getElementById(`${player.id}-${coordinate}`);
        square.classList.remove("square-miss");
        square.classList.remove("square-ship")
        if (boardItem === 0) {
          square.classList.add("square-miss");
        } else if (boardItem && boardItem[0].length && boardItem[1] === null) {
          square.classList.add("square-ship")
        } else if (boardItem && boardItem[0].length && boardItem[1] === 1) {
          square.classList.remove("square-ship")
          square.classList.remove("highlight-square")
          square.classList.add("square-ship-hit")
        }
      }
    }
  } else {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        boardItem = gameBoard[i][j];
        coordinate = letterCoordinate(i, j);
        square = document.getElementById(`${player.id}-${coordinate}`);
        square.classList.remove("square-miss");
        if (boardItem === 0) {
          square.classList.add("square-miss");
        } 
        else if (boardItem && boardItem[0].length && boardItem[1] === null) {
          square.classList.add("square-ship")
        } 
        else if (boardItem && boardItem[0].length && boardItem[1] === 1) {
          square.classList.remove("square-ship")
          square.classList.remove("highlight-square")
          square.classList.add("square-ship-hit")
        }
      }
    }
  }
  
}

function letterCoordinate(i, j) {
  return `${String.fromCharCode(j + 65)}${i + 1}`;
}
