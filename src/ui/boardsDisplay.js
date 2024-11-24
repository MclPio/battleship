function buildBoard(id) {
  const gameBoard = document.createElement("div");
  gameBoard.id = `game-board-${id}`;
  gameBoard.className = "game-board";
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.className = "game-board-container";

  let column;
  let square;
  let charStart = 65;
  let char;
  for (let i = 0; i < 10; i++) {
    column = document.createElement("div");
    column.className = "column";
    char = String.fromCharCode(i + charStart);
    column.id = `${char}`;
    for (let j = 1; j < 11; j++) {
      square = document.createElement("div");
      square.className = "square";
      square.id = `${id}-${char}${j}`;
      column.append(square);
    }
    gameBoard.append(column);
  }
  gameBoardContainer.append(playerName(id), gameBoard);
  return gameBoardContainer;
}

function playerName(id) {
  const playerNameDiv = document.createElement("div");
  playerNameDiv.id = `player${id}-name`;
  playerNameDiv.classList = "player-names";
  return playerNameDiv;
}

function playerButton(){
  const button = document.createElement('button');
  button.innerText = "Randomize Placement";
  button.id = 'random-ship-placement';
  return button
}

function gameInfoBoard(id) {
  const gameInfoBoard = document.createElement('div');
  gameInfoBoard.id = `game-info-board-${id}`
  if (id === 1) {
    gameInfoBoard.append(playerButton())
  }
  
  const healthDisplay = document.createElement('div');
  healthDisplay.id = 'health-display';
  
  const ships = [2, 3, 3, 4, 5]
  for (let i = 0; i < ships.length; i++) {
    healthDisplay.append(createShipDiv(ships[i], id, i))
  }  

  gameInfoBoard.append(healthDisplay);
  return gameInfoBoard
}

function createShipDiv(size, id, shipID) {
  const container = document.createElement('div');
  container.classList = `ship`
  container.id = (`player-${id}-ship-${shipID}`)
  for (let i = 0; i < size; i++){
    const div = document.createElement('div')
    div.classList = `ship-hp`
    container.append(div)
  }
  return container
}

export function boardsDisplay() {
  const display = document.createElement("div");
  display.id = "display";

  // const 
  const gameBoards = document.createElement('div')
  gameBoards.append(buildBoard(1), gameInfoBoard(1), buildBoard(2), gameInfoBoard(2))
  gameBoards.id = 'game-boards'
  display.append(gameBoards);
  return display;
}
