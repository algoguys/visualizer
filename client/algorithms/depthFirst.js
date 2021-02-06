// let grid = makeGrid(3, 3);

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

// dfsTraversal(0, 8)

