import React, { useState }from "react";
import { useSelector, useDispatch } from 'react-redux'
import { updateType, updateStart, updateEnd, updateWeight } from '../store/grid'
import { setDrawingTrue, setDrawingFalse} from '../store/drawing'
// { setDraggingEndTrue, setDraggingEndFalse, setDraggingStartTrue, setDraggingStartFalse, updatePreviousCell } from '../store'
import { setDraggingEndTrue, setDraggingEndFalse } from '../store/draggingEnd'
import { setDraggingStartTrue, setDraggingStartFalse } from '../store/draggingStart'
import { updatePreviousCell } from '../store/previousCellType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faMapMarker, faTimes} from '@fortawesome/free-solid-svg-icons'
import Dijkstra from '../algorithms/dijkstra'


const Row = (props) => {
  const grid = useSelector(state => state.grid)
  const drawing = useSelector(state => state.isDrawing)
  const running = useSelector(state => state.isRunning)
  const draggingStart = useSelector(state => state.isDraggingStart)
  const draggingEnd = useSelector(state => state.isDraggingEnd)
  const previousCell = useSelector(state => state.previousCellType)
  const paintbrush = useSelector(state => state.paintbrush)

  const updateGrid = useDispatch()
  const updateCell = useDispatch()
  const dispatchDrawing = useDispatch()
  const dispatchDraggingStart = useDispatch()
  const dispatchDraggingEnd = useDispatch()
  const dispatchPreviousCell = useDispatch()

  const drawSelected = (node) => {

    //let newType = node.type === 'water' ? 'normal' : 'water'
    switch(paintbrush){
      case 'water':
        updateCell(updateType(node.id, 'water'))
        break;
      case 'taiga':
        updateGrid(updateWeight(node.id, 6))
        updateCell(updateType(node.id, 'taiga'))
        break;
      case 'tundra':
        updateGrid(updateWeight(node.id, 5))
        updateCell(updateType(node.id, 'tundra'))
        break;
      case 'forest':
        updateGrid(updateWeight(node.id, 4))
        updateCell(updateType(node.id, 'forest'))
        break;
      case 'woods':
        updateGrid(updateWeight(node.id, 3))
        updateCell(updateType(node.id, 'woods'))
        break;
      case 'brush':
        updateGrid(updateWeight(node.id, 2))
        updateCell(updateType(node.id, 'brush'))
        break;
      case 'field':
        updateGrid(updateWeight(node.id, 1))
        updateCell(updateType(node.id, 'field'))
        break;
      default:
        break;


    }

    console.log(node)
    // if(node.type !== 'start' && node.type !== 'end') {
    // }
  }

  //! for testing djikstra, delete later
  // if (grid[0]) {
  //   const dijkstra = new Dijkstra(grid)
  //   console.log('compare to length of grid', Object.keys(grid).length)
  //   dijkstra.run()
  // }


  function hanleOnMouseDown(event, cellId) {
    event.preventDefault();
    // drawing logic
    if (!running.isRunning && !drawing.isDrawing && grid[cellId].type !== 'start' && grid[cellId].type !== 'end') {
      dispatchDrawing(setDrawingTrue());
      drawSelected(grid[cellId])
    }
    else if (!running.isRunning && !draggingStart.isDraggingStart && grid[cellId].type === 'start' ){
      dispatchDraggingStart(setDraggingStartTrue())
      console.log('start dragging the start')
    }
    else if (!running.isRunning && !draggingEnd.isDraggingEnd && grid[cellId].type === 'end'){
      dispatchDraggingEnd(setDraggingEndTrue())
      console.log('start dragging the end')
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
            else if (grid[cellId].type === 'field') typeClass = "field"
            else if (grid[cellId].type === 'brush') typeClass = "brush"
            else if (grid[cellId].type === 'woods') typeClass = "woods"
            else if (grid[cellId].type === 'forest') typeClass = "forest"
            else if (grid[cellId].type === 'tundra') typeClass = "tundra"
            else if (grid[cellId].type === 'taiga') typeClass = "taiga"
            else if (grid[cellId].type === 'water') typeClass = "water"


            let visitedClass = "unvisited"
            if(grid[cellId].status === 'unvisited') visitedClass = "unvisited"
            else if (grid[cellId].status === 'visited') visitedClass = "visited"
            else if (grid[cellId].status === 'shortestPath') visitedClass = "shortestPath"

          return <td key={idx} id={cellId} cellid={cellId} className={`${typeClass} ${visitedClass}`}
          onMouseDown={(e => hanleOnMouseDown(e, cellId))}
          onMouseOver={(e) => {
            //console.log('previous cell', previousCell)
            e.preventDefault()
            if(drawing.isDrawing && grid[cellId].type !== 'start' && grid[cellId].type !== 'end'){
              drawSelected(grid[cellId])
            }
            else if(draggingStart.isDraggingStart){
              if(grid[cellId].type !== 'end') {
                //console.log('type on over', grid[cellId].type)
                dispatchPreviousCell(updatePreviousCell(grid[cellId].type))
                updateCell(updateType(cellId, 'start'))
              } else {
                console.log('cannot update the end cell')
                // console.log('event', e.relatedTarget.id)
                // let neighborId = e.relatedTarget.id
                // console.log( 'neigbhor id', neighborId)
                // //dispatchPreviousCell(updatePreviousCell(grid[neighborId].type))
                // updateCell(updateType(cellId[neighborId], 'start'))
              }
            }
            else if(draggingEnd.isDraggingEnd){
              if (grid[cellId].type !== 'start'){
                dispatchPreviousCell(updatePreviousCell(grid[cellId].type))
                updateCell(updateType(cellId, 'end'))
              }
            }
          }}
          onMouseOut={(e) => {
            e.preventDefault()
            if(draggingStart.isDraggingStart) {
              if(grid[cellId].type !== 'end') {
                updateCell(updateType(cellId, previousCell.type))
              } else console.log('do nothing on end cell')
            }
            else if (draggingEnd.isDraggingEnd) {
              if (grid[cellId].type !== 'start') updateCell(updateType(cellId, previousCell.type))
            }
          }}
          onMouseUp={(e) => {
            e.preventDefault()
            if (drawing.isDrawing) dispatchDrawing(setDrawingFalse())
            else if (draggingStart.isDraggingStart) {
              dispatchDraggingStart(setDraggingStartFalse())
              updateGrid(updateStart(cellId))
              dispatchPreviousCell(updatePreviousCell('field'))
            }
            else if (draggingEnd.isDraggingEnd) {
              dispatchDraggingEnd(setDraggingEndFalse())
              updateGrid(updateEnd(cellId))
              dispatchPreviousCell(updatePreviousCell('field'))
            }
          }}

        >
          {grid[cellId].type === "start" && <FontAwesomeIcon id="startNodeIcon" icon={faChevronRight} />}

          {grid[cellId].type === "end" && <FontAwesomeIcon id="endNodeIcon" icon={faTimes} />}
          {grid[cellId].type === "normal" && grid[cellId].weight > 1 && grid[cellId].weight}
          </td>
          }))
        }
      </tr>
    )

}

export default Row
