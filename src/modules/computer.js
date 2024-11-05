import { getBoardSquaresElementList } from "../ui/getBoardSquaresElementList";

export class Computer {
  playTurn(enemyGameBoard) {
    const boardSquareElements = getBoardSquaresElementList(1);
    const boardArray = enemyGameBoard.board;
    // console.log(boardArray);
    // console.log(this.searchBoardForHits(boardArray));
    let boardHitArray = this.searchBoardForHits(boardArray);
    let target = this.pickTarget(boardHitArray);
    console.log(target);
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
      leftRightTopBottom(boardHitArray[0]);
    }
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

function upDown(boardHitArray) {
  boardHitArray.sort();
  let topEnd = boardHitArray[0];
  let bottomEnd = boardHitArray[boardHitArray.length - 1];
  if (topEnd[0] === 0) {
    return [bottomEnd[0] + 1, bottomEnd[1]];
  } else if (bottomEnd[0] === 9) {
    return [topEnd[0] - 1, topEnd[1]];
  }
}

function leftRight(boardHitArray) {
  // [0,0], [0, 1]
  boardHitArray.sort();
  let leftEnd = boardHitArray[0];
  let rightEnd = boardHitArray[boardHitArray.length - 1];
  if (leftEnd[1] === 0) {
    return [rightEnd[0], rightEnd[1] + 1];
  } else if (rightEnd[0] === 9) {
    return [leftEnd[0], leftEnd[1] - 1];
  }
}

function leftRightTopBottom(boardHit) {
  console.log(boardHit);
  let x = boardHit[0];
  let y = boardHit[1];
  console.log(x, y);
  // boardHit = [0, 1]
  // 0, 1

  if (x === 0) {
  }

  if (x > 0 && x < 9 && y > 0 && y < 9) {
    // pick from top, bottom, left, right
    let options = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    return options[Math.floor(Math.random() * objects.length)];
  }
}
