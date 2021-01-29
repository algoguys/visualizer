import React from "react";
import ReactDOM from "react-dom"

const makeGrid = (x, y) => {
  const grid = []
  const gridLength = x * y

  for (let i = 0; i < gridLength; i++) {

    currentArr = []

    for (let j = 0; j < gridLength; j++) {
      if (j === i + 1) {
        currentArr.push(1) // connect with node to right
      } else if (j === i - 1 && j >= 0) {
        currentArr.push(1) // connect with node to left, unless i - 1 is negative
      } else if (j === i + x) {
        currentArr.push(1) // connect with node below
      } else if (j === i - x) {
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

// output
[
  [0, 1, 0, 1, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 1, 0]
]

// goal
[
 [0, 1, 0, 1, 0, 0, 0, 0, 0],
 [1, 0, 1, 0, 1, 0, 0, 0, 0],
 [0, 1, 0, 0, 0, 1, 0, 0, 0],
 [1, 0, 0, 0, 1, 0, 1, 0, 0],
 [0, 1, 0, 1, 0, 1, 0, 1, 0],
 [0, 0, 1, 0, 1, 0, 0, 0, 1],
 [0, 0, 0, 1, 0, 0, 0, 1, 0],
 [0, 0, 0, 0, 1, 0, 1, 0, 1],
 [0, 0, 0, 0, 0, 1, 0, 1, 0],
]


export default class App extends React.Component{
  render(){
    return (



      // determine how many nodes you have (x * y)
      // x * y = size of inner arrays and the outer array
      // create nested for loops to create the arrays
      // i = each inner array
      // j = each element of i
      // as we go thru i, where j = i + 1 and j = i - 1 are connected; nodes left and right of current
      // as we go thru i, where j = i + x and j = i - x are connected; nodes above and below current



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
