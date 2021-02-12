 // determine how many nodes you have (x * y)
// x * y = size of inner arrays and the outer array
// create nested for loops to create the arrays
// i = each inner array
// j = each element of i
// as we go thru i, where j = i + 1 and j = i - 1 and i < are connected; nodes left and right of current
// as we go thru i, where j = i + x and j = i - x are connected; nodes above and below current


export default (x, y) => {
  const grid = []
  const gridLength = x * y

  for (let matrixCol = 0; matrixCol < gridLength; matrixCol++) {

    let currentArr = []

    for (let matrixRow = 0; matrixRow < gridLength; matrixRow++) {
      if (matrixRow === matrixCol + 1 && Math.floor(matrixRow / x) === Math.floor((matrixRow-1)/x)) {
        currentArr.push(1) // connect with node to right
      } else if (matrixRow === matrixCol - 1 && Math.floor(matrixRow / x) === Math.floor((matrixRow+1)/x)) {
        currentArr.push(1) // connect with node to left
      } else if (matrixRow === matrixCol + x) {
        currentArr.push(1) // connect with node below
      } else if (matrixRow === matrixCol - x) {
        currentArr.push(1) // connect with node above
      } else {
        currentArr.push(0) // not adjacent
      }
    }
    grid.push(currentArr)
  }
  return grid
}

// // example of hardcoded 3x3 grid in adjMatrix form
// [
//  [0, 1, 0, 1, 0, 0, 0, 0, 0],
//  [1, 0, 1, 0, 1, 0, 0, 0, 0],
//  [0, 1, 0, 0, 0, 1, 0, 0, 0],
//  [1, 0, 0, 0, 1, 0, 1, 0, 0],
//  [0, 1, 0, 1, 0, 1, 0, 1, 0],
//  [0, 0, 1, 0, 1, 0, 0, 0, 1],
//  [0, 0, 0, 1, 0, 0, 0, 1, 0],
//  [0, 0, 0, 0, 1, 0, 1, 0, 1],
//  [0, 0, 0, 0, 0, 1, 0, 1, 0],
// ]

//      0 - 1 - 2  && j === 0 - 2
//      l   l   l
//      3 - 4 - 5  && j === 3 - 5
//      l   l   l
//      6 - 7 - 8  && j === 6 - 8
