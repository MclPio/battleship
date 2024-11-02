import { getBoardSquaresElementList } from "./getBoardSquaresElementList";

export function boardIndicator(playerID, enemyID) {
  const playerBoard = getBoardSquaresElementList(`${playerID}`);
  const enemyBoard = getBoardSquaresElementList(`${enemyID}`);
  console.log(playerBoard);
  playerBoard.forEach((div) => {
    div.classList.add("highlight-square");
  });
  enemyBoard.forEach((div) => {
    div.classList.remove("highlight-square");
  });
}
