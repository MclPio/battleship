export function nameIndicator(playerID) {
  const playerNamesDiv = document.getElementsByClassName("player-names");
  console.log(playerNamesDiv);
  if (playerID === 1) {
    playerNamesDiv[1].classList.remove("name-indicator");
    playerNamesDiv[0].classList.add("name-indicator");
  } else if (playerID === 2) {
    playerNamesDiv[0].classList.remove("name-indicator");
    playerNamesDiv[1].classList.add("name-indicator");
  }
}
