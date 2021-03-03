import Algorithm from './index'



export default class Dijkstra extends Algorithm {
  constructor (grid) {
    super(grid)
  }

  run() {
    const visited = []
    let unvisited = Object.keys(this.grid).sort((a, b) => a - b).slice(0, -2)

    const oppositeDir = {
      left: 'right',
      right: 'left',
      up: 'down',
      down: 'up',
    }

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

    console.log('unvisited', unvisited)
    console.log('lookup', lookup)

    // visit the starting node
    lookup[this.grid.start].shortestDistance = 0
    lookup[this.grid.start].visited = true

    let currId = this.grid.start

    // prevDirection = currDirection
    // currDirection = 'up'
    // if (currDirection !== prevDirection) cost = 2

    let currDirection = 'right'
    let prevDirection = 'right'

    while (unvisited.length) {

      console.log('current id', currId)

      lookup[currId].visited = true  // mark the current node as visited

      unvisited = unvisited.filter(id => id !== currId) // removes current visited node id from unvisited

      visited.push(currId) // add current id to visited

      // check each neighbors
      this.grid[currId].neighbors.forEach((neighborId) => {

        const neighborNode = lookup[neighborId]
        const currNode = lookup[currId]

        if (!neighborNode.visited) {
          prevDirection = currDirection
          if (neighborId === currId + 1) {
            // go right
            currDirection = 'right'
          } else if (neighborId === currId - 1) {
            // go left
            currDirection = 'left'
          } else if (neighborId < currId - 1) {
            // go up
            currDirection = 'up'
          } else if (neighborId > currId + 1) {
            // go down
            currDirection = 'down'
          }
        }

        let newDistance = Infinity
        if (currDirection === prevDirection || prevDirection === oppositeDir[currDirection]) {
          // add up to find the distance from start
          newDistance = neighborNode.cost + currNode.shortestDistance
        } else {
          newDistance = neighborNode.cost + currNode.shortestDistance + 1
        }


        // if the new distance is shorter than the prev distance, overwrite prev distance
        if (newDistance < neighborNode.shortestDistance) {
          neighborNode.shortestDistance = newDistance
          neighborNode.prevNodeId = currId
        }
      })

      // sort unvisted by shortest distance, then visit the node w/ shortest distance
      unvisited.sort((a, b) => {
        return lookup[a].shortestDistance - lookup[b].shortestDistance
      })
      currId = unvisited[0]

    }

    return {
      visited: visited,
      shortestPath: [],
    }

  }



}



