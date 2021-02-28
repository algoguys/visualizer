import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus, makeGrid } from '../store/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import DepthFirstSearch from '../algorithms/depthFirst'
import BreadthFirstSearch from '../algorithms/breadthFirst'
import { setRunningTrue, setRunningFalse } from '../store/running'


const Controls = (props) => {

  const running = useSelector(state => state.isRunning)
  const grid = useSelector(state => state.grid)

  const [speed, setSpeed] = useState(20)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('BreadthFirstSearch')
  const [isPaused, setIsPaused] = useState(false)
  const [lastProcessedVisited, setLastProcessedVisited] = useState({})
  const [lastProcessedShortestPath, setLastProcessedShortestPath] = useState({})

  // const findDestination = new DepthFirstSearch(grid)
  let findDestination = new BreadthFirstSearch(grid)

  // update findDestination if selectedAlgorithm changes
  useEffect(() => {
    document.title = `Visualize ${selectedAlgorithm} algorithm`;
    switch (selectedAlgorithm) {
      case 'DepthFirstSearch':
        findDestination = new DepthFirstSearch(grid)
        break;
      case 'BreadthFirstSearch':
        findDestination = new BreadthFirstSearch(grid)
        break;
      default:
        break;
    }

  }, [selectedAlgorithm]); // Only re-run the effect if selectedAlgorithm changes




  const updateCell = useDispatch();
  const dispatchRunningTrue = useDispatch();
  const dispatchRunningFalse = useDispatch();
  const resetBoard = useDispatch();

  const clearVisitedNodes = () => {
    //sorted array of properties in grid that correspond to node ids
    let keys = Object.keys(grid).sort((a, b) => a - b)

    //loops through keys to update status on each node before executing search
    keys.forEach((nodeId, idx) => {
      if(idx < keys.length - 2) {
        updateCell(updateStatus(nodeId, 'unvisited'))
      }
    })
  }

  const handleRun = () => {
    if (running.isRunning === false) {
      dispatchRunningTrue(setRunningTrue())

      console.log('calling DFS Traversal!')

      clearVisitedNodes();

      const results = findDestination.run()
      // console.log('results', results)


      // Use setTimeout to
      results.visited.forEach((nodeId, idx) => {
        setTimeout(() => {
          //console.log('visited', nodeId)
          updateCell(updateStatus(nodeId, 'visited'))
          //console.log(nodeId, 'type updated to', grid[nodeId].type)
          if(idx === results.visited.length - 1 && results.shortestPath.length === 0) dispatchRunningFalse(setRunningFalse())
          setLastProcessedVisited({idx, nodeId})
        }, idx * speed) //?! update time to tie to speed var on state
        //console.log('timeout', timeout)
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
        results.shortestPath.forEach((nodeId, idx) => {
           setTimeout(() => { // controls timeout for shortestPath
            //console.log('shortestPath', nodeId)
            updateCell(updateStatus(nodeId, 'shortestPath'))

            // console.log('results', results)

            //console.log(nodeId, 'type updated to', grid[nodeId].type)
            if(idx === results.shortestPath.length - 1) dispatchRunningFalse(setRunningFalse())
            setLastProcessedShortestPath({idx, nodeId})

          }, idx * speed) //?! update time to tie to speed var on state
        })

      }, results.visited.length * speed )


      //console.log('start and end', grid.start, grid.end)
      //depthFirst(grid.start, grid.end);
    } else {
      console.log('already running')
    }

  }

  const handlePause = () => {
    setIsPaused(true)

    let killId = setTimeout(function() {
      for (let i = killId; i > 0; i--) {
        clearTimeout(i)
      }
    }, 0);

    console.log('visited processed', lastProcessedVisited)
    console.log('shortestPath processed', lastProcessedShortestPath)

    //console.log('the algorithm ', isPaused)
  }

  const handleChangeAlgorithm = (event) => {
    // update selectedAlgorithm state to current selection
    setSelectedAlgorithm(event.target.value);
  }

  let playAndPause = running.isRunning && !isPaused
    //Pause button
    ? <FontAwesomeIcon id="pauseAlgo" icon={faPause} size="4x" onClick ={() => {handlePause()}} className="clickable-control" />
    //Play button
    : <FontAwesomeIcon id="playAlgo" icon={faPlay} size="4x" onClick ={() => {handleRun()}} className="clickable-control" />

  return (
    <div className="controls">
      {playAndPause}

      {/* toggle selectedAlgorithm */}
      <label>
        Select Pathfinding Algorithm:<br/>
        <select value={selectedAlgorithm} onChange={(e) => handleChangeAlgorithm(e)}>
          <option value="DepthFirstSearch">Depth First Search</option>
          <option value="BreadthFirstSearch">Breadth First Search</option>
        </select>
      </label>

      {/* toggle speed */}
      <label>
        Speed:<br/>
        <select value={speed} onChange={(e) => setSpeed(parseInt(e.target.value))}>
          <option value="1">Really Fast</option>
          <option value="20">Fast</option>
          <option value="75">Normal</option>
          <option value="150">Slow</option>
          <option value="250">Really Slow</option>

        </select>
      </label>

      {/* reset board  */}
      <button onClick={() => {
        //?! Poor practice: make width and heigh global state variables
        const width = Math.floor(document.getElementById('main').offsetWidth/25)
        const height = Math.floor((window.innerHeight-275)/25)
        resetBoard(makeGrid(width, height))
        }}>
        Reset Board
      </button>

      {/* clear visited nodes */}
      <button onClick={() => clearVisitedNodes()}>
        Clear Visited Nodes
      </button>

    </div>

  )
}

export default Controls
