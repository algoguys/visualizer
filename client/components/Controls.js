import React from "react";
import { useSelector } from 'react-redux'
import dfsTraversal from '../algorithms/depthFirst'

const Controls = (props) => {

  const grid = useSelector(state => state.grid)
  const depthFirst = dfsTraversal(grid)

  return (
    <button onClick ={() => {
      console.log('calling DFS Traversal!')
      console.log(depthFirst(grid.start, grid.end))
      //console.log('start and end', grid.start, grid.end)
      //depthFirst(grid.start, grid.end);
    }}>Run</button>
  )
}

export default Controls
