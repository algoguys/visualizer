import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import dfsTraversal from '../algorithms/depthFirst'
import { updateStatus } from '../store/grid'
import { type } from "jquery";

const Controls = (props) => {

  const grid = useSelector(state => state.grid)
  const depthFirst = dfsTraversal(grid)

  const updateCell = useDispatch()
  //?! tie speed into state
  const speed = 40;

  return (
    <button onClick ={() => {
      console.log('calling DFS Traversal!')

      //sorted array of properties in grid that correspond to node ids
      let keys = Object.keys(grid).sort((a, b) => a - b)

      //loops through keys to update status on each node before executing search
      keys.forEach((nodeId, idx) => {
        if(idx < keys.length - 2) {
          updateCell(updateStatus(nodeId, 'unvisited'))
        }
      })


      const dfsResults = depthFirst(grid.start, grid.end)
      console.log('results', dfsResults)


      // Use setTimeout to
      dfsResults.visited.forEach((nodeId, idx) => {
        setTimeout(() => {
          //console.log('visited', nodeId)
          updateCell(updateStatus(nodeId, 'visited'))
          //console.log(nodeId, 'type updated to', grid[nodeId].type)
        }, idx * speed) //?! update time to tie to speed var on state

        //idx 0 = 0 timeout
        //idx 1 = 500 timeout
        //idx 2 = 1000 timeout
        //...
        //idx 10 = 5000 timeout
      })

      //?! I don't like the solution below, it feels clunky.  I'd rather use async/await or promises

      //?! we need to add a var for isRunning on state to ensure we can only run the algo if it's not already being run.

      //?! we need a way to clear the board of visited nodes before we start an algorithm for the second time

      //outer timeout delays call until after visited nodes have been traversed
      setTimeout( () => {
        dfsResults.shortestPath.forEach((nodeId, idx) => {
          setTimeout(() => { // controls timeout for shortestPath
            //console.log('shortestPath', nodeId)
            updateCell(updateStatus(nodeId, 'shortestPath'))
            //console.log(nodeId, 'type updated to', grid[nodeId].type)
          }, idx * speed) //?! update time to tie to speed var on state
        })

      }, dfsResults.visited.length * speed )

      //console.log('start and end', grid.start, grid.end)
      //depthFirst(grid.start, grid.end);
    }}>Run</button>
  )
}

export default Controls
