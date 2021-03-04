import Algorithm from './index'



export default class Dijkstra extends Algorithm {
  constructor (grid) {
    super(grid)
  }

  run() {
    const visited = []
    let unvisited = Object.keys(this.grid)
        .sort((a, b) => a - b)
        .slice(0, -2)

    // initialize lookup object, and populate it with each node
    const lookup = {}
    for (let i = 0; i < unvisited.length; i++) {
      lookup[i] = {
        id: i,
        shortestDistance: Infinity,
        prevNodeId: null,
        visited: false,
        cost: this.grid[i].weight, // do not mutate, cost should be read only
      }
    }

    // visit the starting node
    lookup[this.grid.start].shortestDistance = 0
    lookup[this.grid.start].visited = true

    // initialize starting shortest distance from start to start node
    let currId = this.grid.start

    while (unvisited.length) {
      lookup[currId].visited = true  // mark the current node as visited

      unvisited = unvisited.filter(id => id !== currId) // removes current visited node id from unvisited

      visited.push(currId) // add current id to visited


      if(parseInt(currId) === this.endId) break // break if end node is found

      // check each neighbors
      this.grid[currId].neighbors.forEach((neighborId) => {
        if(this.grid[neighborId].type === 'normal' || this.grid[neighborId].type === 'end' ) {
          const neighborNode = lookup[neighborId]
          const currNode = lookup[currId]

          const newDistance = neighborNode.cost + currNode.shortestDistance

          // if the new distance is shorter than the prev distance, overwrite prev distance and assign the prevNode value on neighbor to currId
          if (newDistance < neighborNode.shortestDistance) {
            neighborNode.shortestDistance = newDistance
            neighborNode.prevNodeId = currId
          }
        }
      })

      // sort unvisted by shortest distance, then visit the node w/ shortest distance
      unvisited.sort((a, b) => {
        return lookup[a].shortestDistance - lookup[b].shortestDistance
      })
      //reassign current
      //console.log(lookup[unvisited[0]].shortestDistance)
      if(lookup[unvisited[0]].shortestDistance < Infinity) {
        currId = unvisited[0]
      } else break
    }
    const shortestPath = []
    if (parseInt(currId) === this.endId){
      while(currId){
        shortestPath.unshift(currId)
        currId = lookup[currId].prevNodeId
      }

    }

    return { visited, shortestPath }

  }



}



