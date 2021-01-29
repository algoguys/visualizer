import React from "react";
import ReactDOM from "react-dom"

  // determine how many nodes you have (x * y)
  // x * y = size of inner arrays and the outer array
  // create nested for loops to create the arrays
  // i = each inner array
  // j = each element of i
  // as we go thru i, where j = i + 1 and j = i - 1 and i < are connected; nodes left and right of current
  // as we go thru i, where j = i + x and j = i - x are connected; nodes above and below current


const makeGrid = (x, y) => {
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

let grid = makeGrid(3, 3);

// start point = node 3 aka grid[3]
// end point = node 6 aka grid[6]

// from the startNode, iterate/recurse thru each node it may be connected to
// mark each node we visit (table to memoize or something else???)
// stop if we hit the endNode (base case, return the path to get to endNode)
// go to next available adj node (recursive case) until we run out of adj nodes

const dfsTraversal = (startNode, endNode, visited = []) => {

  visited.push(startNode)

  console.log('startNode', grid[startNode])
  console.log('are we at endNode?', grid[startNode] === grid[endNode])
  if (grid[startNode] === grid[endNode]) {
    console.log('found end node')
    return 'found end node' // base case
  }
  for (let i = 0; i < grid[startNode].length; i++) {
    if (grid[startNode][i] === 1 && !visited.includes(i)) {
      console.log(`next startNode: grid[${i}]`)
      return dfsTraversal(i, endNode, visited)
    }
  }

}

//! add a way to handle the case where every surrounding node has been visited
// this problem occurs with a 3x3 grid with startNode = 1, and endNode = 8

dfsTraversal(0, 8)

// // example of hardcoded 3x3 grid
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


export default class App extends React.Component{
  render(){
    return (

      <div>grid</div>





      // <div>
      // Grid Component
      // </div>
    )
  }
}
