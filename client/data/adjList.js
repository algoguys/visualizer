
// take width and height
// num of nodes = width * height
// iterate thru nodes
// add id and x and y properties
// add top, right, bottom, and left neighbors
// return the list once every node is assigned neighbors

export default (width, height) => {
  // initialize empty adjList obj
  const adjList = {}

  let x = 0
  let y = 0

  for (let node = 0; node < width * height; node++) {
    // console.log('adjList on each iteration:', adjList)
    // console.log('node on iteration:', node)

    // initialize empty node object
    adjList[node] = {}

    // assign id
    adjList[node].id = node

    // increment y if we are at a new row
    if (node % width === 0 && node > 0) y++

    // increment x, or set to 0 if on new row
    if (node % width === 0) {
      x = 0
    } else {
      x++
    }

    // assign x, y coords
    adjList[node].x = x
    adjList[node].y = y

    const neighbors = []
    // add top neighbor
    if (node - width >= 0) neighbors.push(node - width)

    // add right neighbor
    // check if next node is within bounds of grid will and be on same row
    if (node + 1 < width * height && Math.floor((node + 1) / width) === Math.floor(node / width)) neighbors.push(node + 1)

    // add bottom neighbor
    if (node + width < width * height) neighbors.push(node + width)

    // add left neighbor
    if (node - 1 >= 0 && Math.floor((node - 1) / width) === Math.floor(node / width)) neighbors.push(node - 1)

    adjList[node].neighbors = neighbors

  }

  return adjList
}

//const adjList = makeAdjList(100, 100)
//console.log(adjList)

//      0 - 1 - 2
//      l   l   l
//      3 - 4 - 5
//      l   l   l
//      6 - 7 - 8

// example of 3x3 grid adj list
// {
//   0: [1, 3],
//   1: [0, 2, 4],
//   2: [1, 5],
//   3: [0, 4, 6],
//   4: [1, 5, 7, 3],
//   5: [2, 8, 4],
//   6: [3, 7],
//   7: [4, 8, 6],
//   8: [7, 5],
// }

// 00 - 01 - 02 - 03
// 04 - 05 - 06 - 07
// 08 - 09 - 10 - 11
// 12 - 13 - 14 - 15
