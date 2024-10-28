
const isWinner = (moveList: Array): Array => {
  const redMoves = []
  const blackMoves = []
  let winstart = ""
  let winend = ""
  let winner = false


  // Seperate list into blackMoves and redMoves
  for (let index = 0; index < moveList.length; index++) {
    if (moveList[index][2] == 'red') {
      redMoves.push(moveList[index])
      // console.log(redMoves)
    } else {
      blackMoves.push(moveList[index])
    }
  }
  // Directions to check: right, down, down-right diagonal, up-right diagonal
  function findAdjacentCountForEveryDirectionForEveryMove(listToCheck) {
    for (let index = 0; index < listToCheck.length; index++) {
      const element = listToCheck[index];
      const result = findAdjacentCountForEveryDirection(element, listToCheck)
      // console.log(result)
      if (result[0] === true) {
        return result
      }
    }
    return [false]
  }

  // findAdjacentCount for every direction 
  function findAdjacentCountForEveryDirection(move, listToCheck) {
    const directions = [
      [0, 1],   // Down
      [1, 0],   // Right
      [1, 1],   // Down-right diagonal
      [1, -1]   // Up-right diagonal
    ];
    for (let index = 0; index < directions.length; index++) {
      const result = findAdjacentCount(move, listToCheck, directions[index])
      if (result[0] === true) {
        return result
      }
    }
    return [false]
  }

  // given a move and a list of coords, returns how many connected items there are.
  function findAdjacentCount(move, listToCheck, direction) {
    let adjacent = ""
    let adjacentcount = 0
    function findAdjacent(move, listToCheck, direction) {
      const right = direction[0]
      const down = direction[1]
      for (let index = 0; index < listToCheck.length; index++) {
        if (listToCheck[index][0] == (move[0] + right) && listToCheck[index][1] == (move[1] + down)) {
          adjacentcount += 1
          adjacent = listToCheck[index]
          winend = adjacent
          // console.log("adjacent found: ", listToCheck[index])
          findAdjacent(adjacent, listToCheck, direction)
        }
      }
    }
    findAdjacent(move, listToCheck, direction)
    if (adjacentcount == 4) {
      winner = true
      winstart = move
      // console.log("Winner!!!!!!!!!")
    }
    return ([winner, winstart, winend])
  }
  const result = findAdjacentCountForEveryDirectionForEveryMove(redMoves)
  if (result[0] === true) {
    result.push("red")
    return result

  }
  const resultblack = findAdjacentCountForEveryDirectionForEveryMove(blackMoves)
  if (resultblack[0] === true) {
    resultblack.push("black")
    return resultblack

  }
  return ([false])
}
export default isWinner
