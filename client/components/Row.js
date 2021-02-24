import React, { useState}from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateType } from '../store/grid'
import { setTrue, setFalse} from '../store/drawing'

const Row = (props) => {
  const isDrawing = useSelector(state => state.isDrawing)
  const grid = useSelector(state => state.grid)
  const updateCell = useDispatch()
  const setDrawingTrue = useDispatch()
  const setDrawingFalse = useDispatch()

    return (
      <tr>
        {
          props.widthArr.map(((cell, idx) => {
            // calculate id to be associated with grid obj of the current cell
            const cellId = (props.rowId * props.widthArr.length) + idx
            // assign class based on cell type
            let typeClass = "normal"
            if (grid[cellId].type === 'start') typeClass = "start"
            else if (grid[cellId].type === 'end') typeClass = "end"
            else if (grid[cellId].type === 'normal') typeClass = "normal"
            else if (grid[cellId].type === 'wall') typeClass = "wall"


            let visitedClass = "unvisited"
            if(grid[cellId].status === 'unvisited') visitedClass = "unvisited"
            else if (grid[cellId].status === 'visited') visitedClass = "visited"
            else if (grid[cellId].status === 'shortestPath') visitedClass = "shortestPath"

          return <td key={idx} cellid={cellId} className={`${typeClass} ${visitedClass}`}
          onClick={() => {
            let newType = grid[cellId].type === 'wall' ? 'normal' : 'wall'
            if(grid[cellId].type !== 'start' && grid[cellId].type !== 'end') {
              updateCell(updateType(cellId, newType))
            }

            //?! delete me eventually
            console.log(`cell: ${grid[cellId].id}\nneighbors: ${grid[cellId].neighbors}\ntype: ${grid[cellId].type}`)

          }}
          onMouseDown={() => {
            setDrawingTrue(setTrue());
          }}
          onMouseOver={() => {
            if(isDrawing.isDrawing){
              let newType = grid[cellId].type === 'wall' ? 'normal' : 'wall'
              if(grid[cellId].type !== 'start' && grid[cellId].type !== 'end') {
                updateCell(updateType(cellId, newType))
              }
            }
          }}
          onMouseUp={() => {
            setDrawingFalse(setFalse())
          }}
          ></td>
          }))
        }
      </tr>
    )

}

export default Row
