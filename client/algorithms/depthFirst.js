// from the startNode, iterate/recurse thru each node it may be connected to
// mark each node we visit (table to memoize or something else???)
// stop if we hit the endNode (base case, return the path to get to endNode)
// go to next available adj node (recursive case) until we run out of adj nodes

//const grid = makeAdjList(4, 4) //? importing makeAdjList for testing purposes, later add back to Grid component
//console.log(grid)

const dfsTraversal = (grid) => {

  return function findPath (startId, endId, visited = []) {
    visited.push(startId)

    //console.log('are we at endNode?', grid[startId] === grid[endId])

    if (startId === endId) {
      //console.log('found end node')
      return [ startId ] // base case, return array with current node id
    } else {
      const neighbors = grid[startId].neighbors
      //console.log('neighbors', neighbors)
      for (let i = 0; i < neighbors.length; i++) {
        const neighborId = neighbors[i]
        if (!visited.includes(neighborId)) {
          //console.log(`next node: grid[${neighborId}]`)
          const response = findPath(neighborId, endId, visited)
          // if response is an array, add current node id to the front of the array
          if (Array.isArray(response) && response[response.length - 1] === endId) {
            response.unshift(startId)
            return response
          }
        }
      }
    }
  }
  //return findPath(grid.start, grid.end);
}

export default dfsTraversal
