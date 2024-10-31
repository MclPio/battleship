
export function renderShips(player, id){
  const gameBoard = player.gameBoard.board
  let boardItem;
  let coordinate;
  let playerBoard = document.getElementById(`game-board-${id}`)
  let square;
  console.log(playerBoard)
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      boardItem = gameBoard[i][j]
      coordinate = letterCoordinate(i, j)
      square = null
      if (boardItem && typeof boardItem.length) {
        console.log(square)
        console.log(boardItem)
        console.log(coordinate)
      }
    }
  }
  // 1) change the board ids, 2)find a nicer way to call renderShips without needing an id...
}

function letterCoordinate(i, j) {
  return `${String.fromCharCode(j + 65)}${i + 1}`
}
