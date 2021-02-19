import { createStore, combineReducers } from 'redux'
import {createLogger} from 'redux-logger'
import grid from './grid'
import algorithms from './algorithms'
//? import stores and combine them here (use the same syntax as lines 3, 6 ,11)

const reducer = combineReducers({grid, algorithms})

const store = createStore(reducer)

export default store
export * from './grid'
