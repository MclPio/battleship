export class Computer {
  // #previousHits = {0: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
  #previousHits = {};

  addHit(key, value) {
    if (this.#previousHits[key] && !this.#previousHits[key].includes(value)) {
      this.#previousHits[key].push(value);
    } else if (!this.#previousHits[key]) {
      this.#previousHits[key] = [value];
    }
  }

  checkHit(key, value) {
    return this.#previousHits[key] && this.#previousHits[key].includes(value);
  }

  playTurn(enemyGameBoard) {
    const boardArray = enemyGameBoard.board;
    let boardHitArray = this.searchBoardForHits(boardArray);
    let attackCoordinate;
    if (boardHitArray.length > 0) {
      attackCoordinate = this.pickTarget(boardHitArray);
      this.addHit(attackCoordinate[0], attackCoordinate[1]);
      console.log("there are hit ships to destroy: ", attackCoordinate);
      return arrayToStringCoordinate(attackCoordinate);
    } else {
      attackCoordinate = this.guessCoordinate(boardArray);
      this.addHit(attackCoordinate[0], attackCoordinate[1]);
      console.log("we need to guess a coordinate to hit", attackCoordinate);
      return arrayToStringCoordinate(attackCoordinate);
    }
  }

  searchBoardForHits(board) {
    let coordinate;
    let hitArray = [];
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        coordinate = board[x][y];
        if (
          coordinate != 0 &&
          coordinate != null &&
          !coordinate[0].isSunk() &&
          coordinate[1] === 1
        ) {
          hitArray.push([x, y]);
        }
      }
    }
    return hitArray;
  }

  pickTarget(boardHitArray) {
    if (boardHitArray.length > 1) {
      if (isVerticalMovement(boardHitArray)) {
        // vertical target, up or down?
        return this.upDown(boardHitArray);
      } else {
        // horizontal target left or right?
        return this.leftRight(boardHitArray);
      }
    } else {
      // we have to guess left, right, top, bot
      return this.leftRightTopBottom(boardHitArray[0]);
    }
  }

  leftRightTopBottom(boardHit) {
    let x = boardHit[0];
    let y = boardHit[1];
    let options = [];

    if (x > 0) {
      if (!this.checkHit(x - 1, y)) {
        options.push([x - 1, y]);
      }
    }
    if (x < 9) {
      if (!this.checkHit(x + 1, y)) {
        options.push([x + 1, y]);
      }
    }
    if (y > 0) {
      if (!this.checkHit(x, y - 1)) {
        options.push([x, y - 1]);
      }
    }
    if (y < 9) {
      if (!this.checkHit(x, y + 1)) {
        options.push([x, y + 1]);
      }
    }

    return options[Math.floor(Math.random() * options.length)];
  }

  leftRight(boardHitArray) {
    boardHitArray.sort();
    let leftEnd = boardHitArray[0];
    let rightEnd = boardHitArray[boardHitArray.length - 1];
    let options = [];
  
    if (leftEnd[1] === 0) {
      return [rightEnd[0], rightEnd[1] + 1];
    } else if (rightEnd[1] === 9) {
      return [leftEnd[0], leftEnd[1] - 1];
    } else {
      if (!this.checkHit(leftEnd[0], leftEnd[1] - 1)) {
        options.push([leftEnd[0], leftEnd[1] - 1]);
      }
      if (!this.checkHit(rightEnd[0], rightEnd[1] + 1)) {
        options.push([rightEnd[0], rightEnd[1] + 1]);
      }

      // if options are empty try upDown
      if (options.length === 0) {
        return this.upDown(boardHitArray)
      } else {
        return options[Math.floor(Math.random() * options.length)];
      }
    }
  }

  upDown(boardHitArray) {
    boardHitArray.sort();
    let topEnd = boardHitArray[0];
    let bottomEnd = boardHitArray[boardHitArray.length - 1];
    let options = [];
    if (topEnd[0] === 0) {
      return [bottomEnd[0] + 1, bottomEnd[1]];
    } else if (bottomEnd[0] === 9) {
      return [topEnd[0] - 1, topEnd[1]];
    } else {
      if (!this.checkHit(topEnd[0] - 1, topEnd[1])) {
        options.push([topEnd[0] - 1, topEnd[1]]);
      }
      if (!this.checkHit(bottomEnd[0] + 1, bottomEnd[1])) {
        options.push([bottomEnd[0] + 1, bottomEnd[1]]);
      }
      
      // if options are empty try leftRight
      if (options.length === 0) {
        return this.leftRight(boardHitArray);
      } else {
        return options[Math.floor(Math.random() * options.length)];
      }
    }
  }

  guessCoordinate(boardArray) {
    let altStart = 0;
    let options = [];
    for (let j = 0; j < boardArray.length; j++) {
      for (let k = altStart; k < boardArray[j].length; k += 2) {
        if (!this.checkHit(j, k)) {
          options.push([j, k]);
        }
      }
      if (altStart === 0) {
        altStart = 1;
      } else {
        altStart = 0;
      }
    }
    return options[Math.floor(Math.random() * options.length)];
  }
}

function isVerticalMovement(boardHitArray) {
  let x = boardHitArray[0][0]; // [0, _] [1, 0]
  let y = boardHitArray[0][1]; // [_, 0] [1, 0]
  if (boardHitArray[1][0] != x) {
    return true;
  } else if (boardHitArray[1][1] != y) {
    return false;
  }
}

function arrayToStringCoordinate(array) {
  const letter = String.fromCharCode(65 + array[1]);
  const number = array[0] + 1;
  return `${letter}${number}`;
}
