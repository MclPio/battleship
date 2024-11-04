import { getBoardSquaresElementList } from "./getBoardSquaresElementList";

export function boardIndicator(playerID) {
  const playerBoard = getBoardSquaresElementList(`${playerID}`);
  let enemyID;
  if (playerID === 1) {
    enemyID = 2;
  } else {
    enemyID = 1;
  }
  const enemyBoard = getBoardSquaresElementList(`${enemyID}`);
  playerBoard.forEach((div) => {
    div.classList.remove("highlight-square");
  });
  enemyBoard.forEach((div) => {
    div.classList.add("highlight-square");
  });

  function clear() {
    const board1 = getBoardSquaresElementList(1)
    const board2 = getBoardSquaresElementList(2)
    board1.forEach((div) => {
      div.classList.remove('highlight-square')
    })
    board2.forEach((div) => {
      div.classList.remove('highlight-square')
    })
  }
  return { clear }
}
