import React from "react";
import ReactDOM from "react-dom"

const makeGrid = (x, y) => {
  const grid = []
  const gridLength = x * y

  for (let matrixCol = 0; matrixCol < gridLength; matrixCol++) {

    let currentArr = []

    for (let matrixRow = 0; matrixRow < gridLength; matrixRow++) {
      //j%x == 0 on left side of grid

      //console.log('coord', i, j, 'right', Math.floor(j / x), Math.floor((j-1)/x), 'left', Math.floor(j / x), Math.floor((j+1)/x))

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
  console.log(grid)
  return grid
}




makeGrid(2,3);



// // goal
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



export default class App extends React.Component{
  render(){
    return (

      <div>grid</div>

      // determine how many nodes you have (x * y)
      // x * y = size of inner arrays and the outer array
      // create nested for loops to create the arrays
      // i = each inner array
      // j = each element of i
      // as we go thru i, where j = i + 1 and j = i - 1 and i < are connected; nodes left and right of current
      // as we go thru i, where j = i + x and j = i - x are connected; nodes above and below current




      // i = 2
      // j = 3 % 3 = 0

      //      j   i
      //left  3 = 2 - 1 && i > 2
      //right 3 = 2 + 1 && i < 6
      //up    3 = 2 - 3
      //down  3 = 2 + 3

      //      0 - 1 - 2  && j === 0 - 2
      //      l   l   l
      //      3 - 4 - 5  && j === 3 - 5
      //      l   l   l
      //      6 - 7 - 8  && j === 6 - 8



//   0 1 2 3 4 5 6 7 8
// 0 - 1 - 1 - - - - -
// 1 1 - 1 - 1 - - - -
// 2 - 1 - - - 1 - - -
// 3 1 - - - 1 - 1 - -
// 4 - 1 - 1 - 1 - 1 -
// 5 - - 1 - 1 - - - 1
// 6 - - - 1 - - - 1 -
// 7 - - - - 1 - 1 - 1
// 8 - - - - - 1 - 1 -
      // <div>
      // Grid Component
      // </div>
    )
  }
}
