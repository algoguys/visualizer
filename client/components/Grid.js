import React, { useState, useEffect } from "react";
import { connect, useSelector, useDispatch } from 'react-redux'
import makeAdjList from "../data/adjList";
import dfsTraversal from "../algorithms/depthFirst"
import { makeGrid } from '../store/grid'
import Row from "./Row"

const App = () => {

  const [width, setWidth] = useState(Math.floor((window.innerWidth-20)/75));
  const [height, setHeight] = useState(Math.floor((window.innerHeight-200)/75));

  const grid = useSelector(state => state.grid)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(makeGrid(width, height))
  }, []); // [] makes it only fire once, like componentDidMount

  const heightArr = Array(height).fill(' ');
  const widthArr = Array(width).fill(' ');

  console.log('grid in component', grid)

  // dfsTraversal(5, 13)

  let div

  if (Object.keys(grid).length > 0) {
    div = <div>
    <table>
      <tbody>
        {
          heightArr.map((row, idx) => {
            return <Row key={idx} widthArr={widthArr} />
          })
        }
      </tbody>
    </table>
  </div>
  }
  else {
    div = <div>
      <h1>Loading Grid...</h1>
  </div>
  }

  return div
}

export default App
