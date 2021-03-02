import React, { useState }from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateType, updateStart, updateEnd } from '../store/grid'
import { setDrawingTrue, setDrawingFalse} from '../store/drawing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faMapMarker, faTimes} from '@fortawesome/free-solid-svg-icons'


const Row = (props) => {
  const drawing = useSelector(state => state.isDrawing)
  const running = useSelector(state => state.isRunning)
  const grid = useSelector(state => state.grid)

  // ?! make global state variables to enable dragging functionality
  const [isDraggingStart, setIsDraggingStart] = useState(false)
  const [isDraggingEnd, setIsDraggingEnd] = useState(false)
  const [prevType, setPrevType] = useState('normal')

  const updateCell = useDispatch()
  const dispatchDrawingTrue = useDispatch()
  const dispatchDrawingFalse = useDispatch()
  const updateGrid = useDispatch()

  const drawWall = (node) => {
    let newType = node.type === 'wall' ? 'normal' : 'wall'
    if(node.type !== 'start' && node.type !== 'end') {
      updateCell(updateType(node.id, newType))
    }
  }

    return (
      <tr>
        {
          props.widthArr.map(((cell, idx) => {
            // calculate id to be associated with grid obj of the current cell
            const cellId = (props.rowId * props.widthArr.length) + idx
            // assign class based on cell type
            let typeClass = "normal"
            if (grid[cellId].type === 'start') {
              typeClass = "start"
            }
            else if (grid[cellId].type === 'end') {
              typeClass = "end"
            }
            else if (grid[cellId].type === 'normal') typeClass = "normal"
            else if (grid[cellId].type === 'wall') typeClass = "wall"


            let visitedClass = "unvisited"
            if(grid[cellId].status === 'unvisited') visitedClass = "unvisited"
            else if (grid[cellId].status === 'visited') visitedClass = "visited"
            else if (grid[cellId].status === 'shortestPath') visitedClass = "shortestPath"

          return <td key={idx} cellid={cellId} className={`${typeClass} ${visitedClass}`}
          onMouseDown={(e) => {
            if (!running.isRunning && !drawing.isDrawing && grid[cellId].type !== 'start' && grid[cellId].type !== 'end') {
              dispatchDrawingTrue(setDrawingTrue());
              drawWall(grid[cellId])
            }
            else if (!running.isRunning && !isDraggingStart && grid[cellId].type === 'start' ){
              setIsDraggingStart(true)
              console.log('start dragging the start')
            }
            else if (!running.isRunning && !isDraggingEnd && grid[cellId].type === 'end'){
              setIsDraggingEnd(true)
              console.log('start dragging the end')
            }
          }}
          onMouseOver={() => {
            if(drawing.isDrawing){
              drawWall(grid[cellId])
            }
            else if(isDraggingStart){
              setPrevType(grid[cellId].type)
              updateCell(updateType(cellId, 'start'))
            }
            else if(isDraggingEnd){
              setPrevType(grid[cellId].type)
              updateCell(updateType(cellId, 'end'))
            }
          }}
          onMouseOut={() => {
            if(isDraggingStart) updateCell(updateType(cellId, prevType))
            else if (isDraggingEnd) updateCell(updateType(cellId, prevType))
          }}
          onMouseUp={() => {
            if (drawing.isDrawing) dispatchDrawingFalse(setDrawingFalse())
            else if (isDraggingStart) {
              setIsDraggingStart(false)
              updateGrid(updateStart(cellId))
              setPrevType('normal')
            }
            else if (isDraggingEnd) {
              setIsDraggingEnd(false)
              updateGrid(updateEnd(cellId))
              setPrevType('normal')
            }
          }}

        >
          {grid[cellId].type === "start" && <FontAwesomeIcon id="startNodeIcon" icon={faChevronRight} />}

          {grid[cellId].type === "end" && <FontAwesomeIcon id="endNodeIcon" icon={faTimes} />}
          </td>
          }))
        }
      </tr>
    )

}

export default Row
