import { createStore, combineReducers } from 'redux'
import grid from './grid'
import algorithms from './algorithms'
import isDrawing from './drawing'
import isRunning from './running'
import isDraggingStart from './draggingStart'
import isDraggingEnd from './draggingEnd'
import previousCellType from './previousCellType'
import paintbrush from './paintbrush'
//? import stores and combine them here (use the same syntax as lines 3, 6 ,11)

const reducer = combineReducers({grid, algorithms, isDrawing, isRunning, isDraggingEnd, isDraggingStart, previousCellType, paintbrush})

const store = createStore(reducer)

export default store
export * from './grid'
export * from './drawing'
export * from './running'
export * from './draggingStart'
export * from './draggingEnd'
export * from './previousCellType'
