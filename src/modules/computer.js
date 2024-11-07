import { getBoardSquaresElementList } from "../ui/getBoardSquaresElementList";

export class Computer {
  #previousHits = [];

  playTurn(enemyGameBoard) {
    // const boardSquareElements = getBoardSquaresElementList(1);
    const boardArray = enemyGameBoard.board;
    let boardHitArray = this.searchBoardForHits(boardArray);
    if (boardHitArray.length > 0) {
      const attackCoordinate = this.pickTarget(boardHitArray);
      this.#previousHits.push(attackCoordinate);
      console.log("there are hit ships to destroy: ", attackCoordinate);
      return arrayToStringCoordinate(attackCoordinate);
    } else {
      console.log("we need to guess a coordinate to hit");
    }
    // this.searchBoardForHits(boardArray);
    // if (there are any ships hit but not destroyed) {
    //    attackCoordinate = pickTargetCoordinate(board) => "A1"
    //    player1BoardSquares.receiveAttack(attackCoordinate)
    //} else {
    //    attackCoordinate = pickRandomCheckerCoordinate(board)
    //    player1BoardSquares.receiveAttack(attackCoordinate)
    //
    //}
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
    // if more than 1 hit easy pick vertical or horizontal next
    //   [[0,0], [1, 0]] how to pick?
    // else if 1 hit guess top left right bottom
    // console.log(
    //   "upDown: ",
    //   upDown(boardHitArray),
    //   "leftRight: ",
    //   leftRight(boardHitArray),
    //   "leftRightTopBottom: ",
    //   leftRightTopBottom(boardHitArray[0])
    // );
    if (boardHitArray.length > 1) {
      if (isVerticalMovement(boardHitArray)) {
        // vertical target, up or down?
        return upDown(boardHitArray);
      } else {
        // horizontal target left or right?
        return leftRight(boardHitArray);
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
      options.push([x - 1, y]);
    }
    if (x < 9) {
      options.push([x + 1, y]);
    }
    if (y > 0) {
      options.push([x, y - 1]);
    }
    if (y < 9) {
      options.push([x, y + 1]);
    }

    let results = [...options];
    for (let i = 0; i < options.length; i++) {
      for (let j = 0; j < this.#previousHits.length; j++) {
        if (
          options[i][0] === this.#previousHits[j][0] &&
          options[i][1] === this.#previousHits[j][1]
        ) {
          results.splice(i, 1);
        }
      }
    }
    return results[Math.floor(Math.random() * results.length)];
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

// NEEDS TO CHECK this.#previousHits
function upDown(boardHitArray) {
  // [1, 0], [2, 0]
  boardHitArray.sort();
  let topEnd = boardHitArray[0];
  let bottomEnd = boardHitArray[boardHitArray.length - 1];
  if (topEnd[0] === 0) {
    return [bottomEnd[0] + 1, bottomEnd[1]];
  } else if (bottomEnd[0] === 9) {
    return [topEnd[0] - 1, topEnd[1]];
  } else {
    const options = [
      [topEnd[0] - 1, topEnd[1]],
      [bottomEnd[0] + 1, bottomEnd[1]],
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
}

// NEEDS TO CHECK this.#previousHits
function leftRight(boardHitArray) {
  boardHitArray.sort();
  let leftEnd = boardHitArray[0];
  let rightEnd = boardHitArray[boardHitArray.length - 1];
  if (leftEnd[1] === 0) {
    return [rightEnd[0], rightEnd[1] + 1];
  } else if (rightEnd[1] === 9) {
    return [leftEnd[0], leftEnd[1] - 1];
  } else {
    const options = [
      [leftEnd[0], leftEnd[1] - 1],
      [rightEnd[0], rightEnd[1] + 1],
    ];
    return options[Math.floor(Math.random() * options.length)];
  }
}

function arrayToStringCoordinate(array) {
  const letter = String.fromCharCode(65 + array[1]);
  const number = array[0] + 1;
  return `${letter}${number}`;
}
