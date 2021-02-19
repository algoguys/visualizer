import React from "react";
import { useSelector } from 'react-redux'
import dfsTraversal from '../algorithms/depthFirst'

const Controls = (props) => {

  const grid = useSelector(state => state.grid)

  return (
    <button onClick ={() => {dfsTraversal(grid)}}>Run</button>
  )
}

export default Controls
