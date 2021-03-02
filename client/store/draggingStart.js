/**
 * INITIAL STATE
 */
const draggingStart = {isDraggingStart: false}

/**
 * ACTION TYPES
 */
const SET_DRAGGINGSTART_TRUE = 'SET_DRAGGINGSTART_TRUE'
const SET_DRAGGINGSTART_FALSE = 'SET_DRAGGINGSTART_FALSE'

/**
 * ACTION CREATORS
 */
export const setDraggingStartTrue = () => ({type: SET_DRAGGINGSTART_TRUE})
export const setDraggingStartFalse = () => ({type: SET_DRAGGINGSTART_FALSE})

/**
 * REDUCER
 */
export default function(state = draggingStart, action) {
  switch (action.type) {
    case SET_DRAGGINGSTART_TRUE:
      return {isDraggingStart: true}
    case SET_DRAGGINGSTART_FALSE:
      return {isDraggingStart: false}
    default:
      return state
  }
}
