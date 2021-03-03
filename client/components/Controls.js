import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus, makeGrid } from '../store/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import DepthFirstSearch from '../algorithms/depthFirst'
import BreadthFirstSearch from '../algorithms/breadthFirst'
import Dijkstra from '../algorithms/dijkstra'
import { setRunningTrue, setRunningFalse } from '../store/running'


const Controls = (props) => {
  // ********* global state ************** //
  const running = useSelector(state => state.isRunning)
  const grid = useSelector(state => state.grid)

  // ********** local state ************** //
  // currently selected speed
  const [speed, setSpeed] = useState(40)
  // currently select algorithm
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('BreadthFirstSearch')
  // object returned when calling run method of currently selected alogrithm
  // object contains the visited and shortestPath props
  const [results, setResults] = useState({})
  // instance of algorithm class currently selected
  const [destinationFinder, setDestinationFinder] = useState(-1)
  // tracks the last element from visited (local state) and shortestPath (local state) that was processed and rendered to the UI
  const [lastProcessedVisited, setLastProcessedVisited] = useState(-1)
  const [lastProcessedShortestPath, setLastProcessedShortestPath] = useState(-1)
  // tracks last timeout id to be erased
  const [lastTimeoutId, setLastTimeoutId] = useState(0)
  // visited and shortestPath are used to track results rendered to the UI
  const [visited, setVisited] = useState([])
  const [shortestPath, setShortestPath] = useState([])


  // update destination finder
  useEffect(() => {
    // console.log('set destination finder effect running')
    if(grid[0]) {
      switch (selectedAlgorithm) {
        case 'DepthFirstSearch':
          setDestinationFinder(new DepthFirstSearch(grid))
          break;
        case 'BreadthFirstSearch':
          setDestinationFinder(new BreadthFirstSearch(grid))
          break;
        case 'Dijkstra':
          setDestinationFinder(new Dijkstra(grid))
        break;
        default:
          break;
      }
      // console.log('destinationFinder updated', destinationFinder)
    }
  }, [grid, selectedAlgorithm])

  // update results if destinationFinder changes
  useEffect(() => {
    // if desintationFinder has been initialized update results
    if(destinationFinder !== -1) {
      setResults({...destinationFinder.run()})
    }
  }, [destinationFinder])


  // change rate at which each cell's status is changed and displayed to UI when speed changes
  useEffect(() => {
    // console.log('speed updated', speed, arr)

    if(running.isRunning){
      //destroy all previously created timeouts
      let killTimeouts = setTimeout(function() {
        for (let i = killTimeouts; i > lastTimeoutId; i--) {
          clearTimeout(i)
        }
      }, 0);
      setLastTimeoutId(killTimeouts)

      //Re-initialized visualizeVisited or visualizeShortestPath based on the last processed timeout (local state)
      // if last processedVisted == visted.length -1 that means all visited elements have been processed, so move on to shortestPath
      if(lastProcessedVisited < visited.length-1) {
        const remaining = visited.slice(lastProcessedVisited)
        visualizeVisited(remaining)
        setTimeout( () => {
          visualizeShortestPath(results.shortestPath)
        }, remaining.length * speed)
      } else {
        let remaining = []
        if(results.shortestPath !==0 && shortestPath.length === 0){
          remaining = results.shortestPath.slice(lastProcessedShortestPath)
        } else if (shortestPath.length > 0 ) {
          remaining = shortestPath.slice(lastProcessedShortestPath)
        }
        visualizeShortestPath(remaining);
      }
    }
  }, [speed])



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


  // Iterate through visited arr creating timeout function at each idx.
  // Callback function updates cell status to visited
  // Delay is set to idx * speed (local state)
  //    idx 0 = 0 timeout
  //    idx 1 = 500 timeout
  //    idx 2 = 1000 timeout
  //    ...
  //    idx 10 = 5000 timeout
  const visualizeVisited = (arr) => {
    //update local state shortestPath to be arr
    setVisited(arr)
    arr.forEach((nodeId, idx) => {
      setTimeout(() => {
        // update cell status to visited
        updateCell(updateStatus(nodeId, 'visited'))
        // setRunning to false when last item in arr executes AND no valid shortestPath is found
        if(idx === arr.length - 1 && shortestPath.length === 0) dispatchRunningFalse(setRunningFalse())
        setLastProcessedVisited(idx)
      }, idx * speed)
    })
  }

  const visualizeShortestPath = (arr) => {
    //update local state shortestPath to be arr
    setShortestPath(arr)
    arr.forEach((nodeId, idx) => {
      setTimeout(() => {
        // update cell status to shortestPath
        updateCell(updateStatus(nodeId, 'shortestPath'))
        // setRunning to false when last item in arr executes
        if(idx === arr.length - 1) dispatchRunningFalse(setRunningFalse())
        setLastProcessedShortestPath(idx)
      }, idx * speed)
    })
  }



  const handleRun = () => {
    if (running.isRunning === false) {
      dispatchRunningTrue(setRunningTrue())

      clearVisitedNodes();

      // console.log('results', results)

      // updates the status of cells in visited to visited
      visualizeVisited(results.visited)

      // Visualize shortestPath is only called after visited cells have been updated
      // updates the status of cells in shortestPath to shortestPath
      setTimeout( () => visualizeShortestPath(results.shortestPath), results.visited.length * speed )

    } else {
      console.log('already running')
    }
  }

  const handleChangeAlgorithm = (event) => {
    // update selectedAlgorithm state to current selection
    setSelectedAlgorithm(event.target.value);
  }

  const handleChangeSpeed = (e) => {
    setSpeed(parseInt(e.target.value))
  }

  return (
    <div className="controls">
      <FontAwesomeIcon id="playAlgo" icon={faPlay} size="4x" onClick ={() => {handleRun()}} className={running.isRunning ? 'unclickable-control' : 'clickable-control'}/>

      {/* toggle selectedAlgorithm */}
      <label>
        Select Pathfinding Algorithm:<br/>
        <select value={selectedAlgorithm} onChange={(e) => handleChangeAlgorithm(e)}>
          <option value="DepthFirstSearch">Depth First Search</option>
          <option value="BreadthFirstSearch">Breadth First Search</option>
          <option value="Dijkstra">Dijkstra's Algorithm</option>
        </select>
      </label>

      {/* toggle speed */}
      <label>
        Speed:<br/>
        <select value={speed} onChange={(e) => handleChangeSpeed(e)}>
          <option value="20">Really Fast</option>
          <option value="40">Fast</option>
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
