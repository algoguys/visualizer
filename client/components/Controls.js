import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus } from '../store/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import DepthFirstSearch from '../algorithms/depthFirst'
import { setTrue, setFalse } from '../store/running'


const Controls = (props) => {

  const running = useSelector(state => state.isRunning)
  const grid = useSelector(state => state.grid)

  const depthFirstSearch = new DepthFirstSearch(grid)

  const updateCell = useDispatch()
  const setRunningTrue = useDispatch()
  const setRunningFalse = useDispatch()

  console.log('isRunning', running.isRunning)


  //?! tie speed into state
  const speed = 10;

  const handleRun = () => {


    if (running.isRunning === false) {
      setRunningTrue(setTrue())

      console.log('calling DFS Traversal!')

          //sorted array of properties in grid that correspond to node ids
          let keys = Object.keys(grid).sort((a, b) => a - b)

          //loops through keys to update status on each node before executing search
          keys.forEach((nodeId, idx) => {
            if(idx < keys.length - 2) {
              updateCell(updateStatus(nodeId, 'unvisited'))
            }
          })


          const dfsResults = depthFirstSearch.run()
          console.log('results', dfsResults)


          // Use setTimeout to
          dfsResults.visited.forEach((nodeId, idx) => {
            setTimeout(() => {
              //console.log('visited', nodeId)
              updateCell(updateStatus(nodeId, 'visited'))
              //console.log(nodeId, 'type updated to', grid[nodeId].type)
              if(idx === dfsResults.shortestPath.length - 1 && dfsResults.shortestPath.length === 0) setRunningFalse(setFalse())
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

                console.log('dfsResults', dfsResults)

                //console.log(nodeId, 'type updated to', grid[nodeId].type)
                if(idx === dfsResults.shortestPath.length - 1) setRunningFalse(setFalse())

              }, idx * speed) //?! update time to tie to speed var on state
            })

          }, dfsResults.visited.length * speed )

          //console.log('start and end', grid.start, grid.end)
          //depthFirst(grid.start, grid.end);
    } else {
      console.log('already running')
    }
  }

  return (
    <div className="controls">
      <FontAwesomeIcon id="playAlgo" icon={faPlay} size="4x" onClick ={() => {handleRun()}}/>

    </div>

  )
}

export default Controls
