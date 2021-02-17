import { createStore, combineReducers } from 'redux'
import {createLogger} from 'redux-logger'
import grid from './grid'
//? import stores and combine them here (use the same syntax as lines 3, 6 ,11)

const reducer = combineReducers({grid})

const store = createStore(reducer)

export default store
export * from './grid'
