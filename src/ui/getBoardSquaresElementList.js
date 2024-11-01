export function getBoardSquaresElementList(boardID) {
  const result = Array.from(document.querySelectorAll(`[id^="${boardID}-"]`));
  return result;
}
