import { getBoardSquaresElementList } from "./getBoardSquaresElementList";

export function boardListener(gameBoard, boardID) {
  let eleList = getBoardSquaresElementList(boardID);

  for (let i = 0; i < eleList.length; i++) {
    eleList[i].addEventListener("click", () => {
      gameBoard.receiveAttack(eleList[i].id.slice(2));
    });
  }
}
