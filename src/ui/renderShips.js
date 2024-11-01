
export function renderShips(player, id){
  const gameBoard = player.gameBoard.board
  let boardItem, coordinate, square;

  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      boardItem = gameBoard[i][j]
      coordinate = letterCoordinate(i, j)
      square = document.getElementById(`${id}-${coordinate}`)
      if (boardItem && (boardItem.length)) {
        square.style = "background-color: grey"
      } else if (boardItem === 1) {
        square.style = "background-color: orange"
      } else if (boardItem === 0) {
        square.style = "background-color: blue"
      }
    }
  }
}

function letterCoordinate(i, j) {
  return `${String.fromCharCode(j + 65)}${i + 1}`
}
