import Algorithm from './index'

export default class BreadthFirstSearch extends Algorithm {
  constructor (grid) {
    super(grid)
  }

  run () {
    const queue = [{id: this.startId, distanceToStart: 0}];
    // stores all visted nodes with a key of id and value of distance to start
    const lookupVisited = { [this.startId]: 0 };
    // stores visited nodes in order they are traversed
    let visited = [];
    // stores nodes in the shortest path with idx 0 being start and last idx being destination
    const shortestPath = [];

    // traverse through queue until destination is found
    while (queue.length > 0) {
      // set currNode to first item in queue
      const currNode = queue.shift();
      // push currNode to visited
      visited.push(currNode);
      // break if we are at destination
      if(currNode.id === this.endId) break;
      // iterate through currNode's neighbors
      this.grid[currNode.id].neighbors.forEach (neighborId => {
        //Do not push neighbor to queue if neighbor has already been visited, if it's a wall, or if itsstart node
        if(!lookupVisited[neighborId] && this.grid[neighborId].type !== 'wall' && this.grid[neighborId].type !== 'start') {
          const newNode = {
            id: neighborId,
            distanceToStart: currNode.distanceToStart + 1
          }
          lookupVisited[neighborId] = currNode.distanceToStart + 1
          queue.push(newNode)
        }
      })
    }

    // if last item in visited is the endId find shortest path
    if(visited[visited.length-1].id === this.endId) {
      // initialize currNode as destination in visited array
      let currNode = visited[visited.length-1];

      // find shortest path by traversing through currNode's  visited neighbors
      while(currNode) {
        // push currNode to shortestPath
        shortestPath.unshift(currNode.id)
        // initialize minDist to curr node's distance
        let minDistance = currNode.distanceToStart;
        let nextNode = null;
        // neighbors is an array of node ids
        const neighbors = this.grid[currNode.id].neighbors

        // iterate through neighbors of currNode looking for neighbor with shortest distance to start
        for(let i = 0; i < neighbors.length; i++) {
          // if neighbor has been visited, continue
          if (lookupVisited[neighbors[i]]){
            // update min distance and nextNode values based on distance to start stored in lookupvisited
            if (lookupVisited[neighbors[i]] < minDistance) {
              minDistance = lookupVisited[neighbors[i]]
              nextNode = {
                id: neighbors[i],
                distanceToStart: lookupVisited[neighbors[i]]
              }
            }
          }
        }
        // reassign currNode to nextNode (nextNode is neighbor with shorest distance to start)
        currNode = nextNode;
      }

      //?!  logical error not pushing startId to shortest path array, my brain is not working so I manually add startId to shortest path here --> visit this logic again to see if it can be cleaned up.
      shortestPath.unshift(this.startId);
    }

    // return visited array with only node ids (prior to running map, each idx in visited is an obj with id and shortest path to start)
    visited = visited.map(node => node.id)


    return {visited, shortestPath}
  }
}
