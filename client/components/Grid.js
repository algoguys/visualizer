import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { makeGrid } from '../store/grid'
import Row from "./Row"

const App = () => {
  const [width, setWidth] = useState(Math.floor(document.getElementById('main').offsetWidth/25));

  const [height, setHeight] = useState(Math.floor((window.innerHeight-275)/25));

  const grid = useSelector(state => state.grid)

  const createGrid = useDispatch()


  useEffect(() => {
    createGrid(makeGrid(width, height))
  }, []); // [] makes it only fire once, like componentDidMount

  const heightArr = Array(height).fill(' ');
  const widthArr = Array(width).fill(' ');

  let div

  if (Object.keys(grid).length > 0) {
    div =
    <div>
      <table>
        <tbody>
          {
            heightArr.map((row, idx) => {
              return <Row key={idx} rowId={idx} widthArr={widthArr} />
            })
          }
        </tbody>
      </table>
    </div>
  } else {
    div =
    <div>
      <h1>Loading Grid...</h1>
    </div>
  }

  return div
}

export default App
