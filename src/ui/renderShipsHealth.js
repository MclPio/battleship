export default function renderShipsHealth(player){

  let ships = player.gameBoard.ships
  for(let i = 0; i < ships.length; i++) {
    if (ships[i].hits > 0) {
      let infoShip = document.getElementById(`player-${player.id}-ship-${i}`)
      for (let j = 0; j < ships[i].hits; j++) {
        infoShip.children[j].classList = "ship-hp-hit";
      }      
    }
  } 
}

