import Algorithm from './index'

// from the startNode, iterate/recurse thru each node it may be connected to
// mark each node we visit (table to memoize or something else???)
// stop if we hit the endNode (base case, return the path to get to endNode)
// go to next available adj node (recursive case) until we run out of adj nodes

//const grid = makeAdjList(4, 4) //? importing makeAdjList for testing purposes, later add back to Grid component
//console.log(grid)

export default class DepthFirstSearch extends Algorithm {
  constructor(grid) {
    super(grid)
  }

  run(startNode = this.startId, visited = []) {
    const grid = this.grid

    visited.push(startNode)

    //console.log('are we at endNode?', grid[startNode] === grid[endNode])

    if (startNode === this.endId) {
      //console.log('found end node')
      return {visited, shortestPath: [startNode]} // base case, return array with current node id
    } else {
      const neighbors = grid[startNode].neighbors
      //console.log('neighbors', neighbors)
      for (let i = 0; i < neighbors.length; i++) {
        const neighborId = neighbors[i]
        if (!visited.includes(neighborId) && grid[neighborId].type !== 'wall') {
          //console.log(`next node: grid[${neighborId}]`)
          const response = this.run(neighborId, visited)
          //console.log('response', response)
          // if response is an array, add current node id to the front of the array
          if (response && response.shortestPath[response.shortestPath.length - 1] === this.endId) {
            response.shortestPath.unshift(startNode)
            return response
          }
        }
      }

      return { visited: visited, shortestPath: [] }
    }
  }


}
