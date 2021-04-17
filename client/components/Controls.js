import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateStatus, makeGrid, updateWeight, updateType} from '../store/grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import DepthFirstSearch from '../algorithms/depthFirst'
import BreadthFirstSearch from '../algorithms/breadthFirst'
import Dijkstra from '../algorithms/dijkstra'
import { setRunningTrue, setRunningFalse } from '../store/running'
import { changeBrush } from "../store/paintbrush";



const Controls = (props) => {
  // ********* global state ************** //
  const running = useSelector(state => state.isRunning)
  const grid = useSelector(state => state.grid)
  const paintbrush = useSelector(state => state.paintbrush)



  // ********** local state ************** //
  // is the running algo paused?
  const [isPaused, setPause] = useState(false)
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

  // console.log(paintbrush)

  // update destination finder
  useEffect(() => {
    // console.log('set destination finder effect running')
    if(grid[0] && !running.isRunning) {
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

  //? need to figure out how to randomize the weights on load, maybe modify adjList so it generates the grid w/ random weights
  useEffect(() => {
    setRandomWeights()
    console.log('randomized weights')
  }, [])


  // update results if destinationFinder changes
  // useEffect(() => {
  //   switch (selectedAlgorithm) {
    //     case 'DepthFirstSearch':
  //     case 'BreadthFirstSearch':
  //       resetAllWeights()
  //       break;
  //     case 'Dijkstra':
  //       setRandomWeights()
  //       break;
  //     default:
  //       break;
  //   }
  // }, [selectedAlgorithm])

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
      clearAllTimeouts()

      //Re-initialized visualizeVisited or visualizeShortestPath based on the last processed timeout (local state)
      // if last processedVisted == visted.length -1 that means all visited elements have been processed, so move on to shortestPath
      resume()
    }
  }, [speed])


  const updateCell = useDispatch();
  const dispatchRunningTrue = useDispatch();
  const dispatchRunningFalse = useDispatch();
  const resetBoard = useDispatch();
  const dispatchWeight = useDispatch();
  const dispatchType = useDispatch()
  const updatePaintbrush = useDispatch();

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

  const setRandomWeights = () => {
    for(const nodeId in grid) {
      if(grid[nodeId].id && grid[nodeId].type !== 'start' && grid[nodeId].type !== 'end'){
        //assign newWeight a value between 1 and 6
        const newWeight = Math.floor(Math.random() * Math.floor(6)) + 1
        //console.log(newWeight)
        dispatchWeight(updateWeight(nodeId, newWeight))
        let newType = ''
        switch(newWeight) {
          case 1:
            newType = 'field'
            break
          case 2:
            newType = 'brush'
            break
          case 3:
            newType = 'woods'
            break
          case 4:
            newType = 'forest'
            break
          case 5:
            newType = 'tundra'
            break
          case 6:
            newType = 'taiga'
            break
        }
        dispatchType(updateType(nodeId, newType))
      }
    }
    console.log('grid after random', grid)
  }

  const resetAllWeights = () => {
    for(const nodeId in grid) {
      if(grid[nodeId].id){
        dispatchWeight(updateWeight(nodeId, 1))
        if (grid[nodeId].type !== 'start' && grid[nodeId].type !== 'end')
        dispatchType(updateType(nodeId, 'field'))

      }
    }
  }

  const clearAllTimeouts = () => {
    //destroy all previously created timeouts
    let killTimeouts = setTimeout(function() {
      for (let i = killTimeouts; i > lastTimeoutId; i--) {
        clearTimeout(i)
      }
    }, 0);
    setLastTimeoutId(killTimeouts)

  }

  const resume = () => {
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
        if(idx === arr.length - 1 && results.shortestPath.length === 0) dispatchRunningFalse(setRunningFalse())
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

    } else if (isPaused && running.isRunning) {
      console.log('already running')
      setPause(false)
      resume()
    }
  }


  const handlePause = () => {
    setPause(true)
    clearAllTimeouts()
  }

  const handleChangeAlgorithm = (event) => {
    // update selectedAlgorithm state to current selection
    setSelectedAlgorithm(event.target.value);
  }

  const handleChangeSpeed = (e) => {
    setSpeed(parseInt(e.target.value))
  }

  const handleChangePaintbrush = (e) => {
    updatePaintbrush(changeBrush(e.target.value))
  }

  const handleResetBoard = (e) => {
    //?! Poor practice: make width and heigh global state variables
    const width = Math.floor(document.getElementById('main').offsetWidth/100)
    const height = Math.floor((window.innerHeight-275)/100)
    resetBoard(makeGrid(width, height))
    setRandomWeights()
  }

  let playPause = ''

  if(!running.isRunning){
    /* play button */
    playPause = <FontAwesomeIcon className="playPause" icon={faPlay} size="4x" onClick ={() => {handleRun()}}/>
  } else if (running.isRunning && !isPaused) {
    /* pause button */
    playPause = <FontAwesomeIcon className="playPause" icon={faPause} size="4x" onClick ={() => {handlePause()}}/>
  } else if (running.isRunning && isPaused) {
    /* play button */
    playPause = <FontAwesomeIcon className="playPause" icon={faPlay} size="4x" onClick ={() => {handleRun()}}/>
  }

  return (
    <div className="controls">

      {/* toggle selectedAlgorithm */}
      <label>
        Select Pathfinding Algorithm:<br/>
        <select value={selectedAlgorithm} onChange={(e) => handleChangeAlgorithm(e)}>
          <option value="BreadthFirstSearch">Breadth First Search</option>
          <option value="Dijkstra">Dijkstra's Algorithm</option>
          <option value="DepthFirstSearch">Depth First Search</option>
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

      {/* toggle paintbrush */}
      <label>
        Draw Obstacles:<br/>
        <select value={paintbrush} onChange={(e) => handleChangePaintbrush(e)}>
          <option value="water">Water (impassible)</option>
          <option value="taiga">Taiga (weight 6)</option>
          <option value="tundra">Tundra (weight 5)</option>
          <option value="forest">Forest (weight 4)</option>
          <option value="woods">Woods (weight 3)</option>
          <option value="brush">Brush (weight 2)</option>
          <option value="field">Field (weight 1)</option>
        </select>
      </label>

      {/* render either play or pause button depending on state */}
      {playPause}

      {/* clear visited nodes */}
      <button onClick={() => clearVisitedNodes()}>Clear Visited Nodes</button>


      {/* randomly set weights on all normal nodes */}
      {<button onClick={() => setRandomWeights()}>Generate Random Weights</button>}

      {/* clear weights on all nodes  */}
      {<button onClick={() => resetAllWeights()}> Clear Weights </button>}

      {/* reset board  */}
      <button onClick={() => handleResetBoard()}>Reset Board</button>
    </div>

  )
}

export default Controls
