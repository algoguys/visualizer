import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import makeAdjList from "../data/adjList";
import dfsTraversal from "../algorithms/depthFirst"
import Row from "./Row"

const App = () => {

  const [width, setWidth] = useState(Math.floor((window.innerWidth-20)/75));
  const [height, setHeight] = useState(Math.floor((window.innerHeight-200)/75));

  // const [width, setWidth] = useState(4)
  // const [height, setHeight] = useState(3)

  console.log(width, height)
  const grid = makeAdjList(width, height);
  console.log(grid)

  const heightArr = Array(height).fill(' ');
  const widthArr = Array(width).fill(' ');

  // dfsTraversal(5, 13)

  return (
    <table>
      <tbody>
        {
          heightArr.map((row, idx) => {
            return <Row key={idx} widthArr={widthArr} />
          })
        }

      </tbody>
    </table>
  )
}

export default App

