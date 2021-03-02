/**
 * INITIAL STATE
 */
const draggingEnd = {isDraggingEnd: false}

/**
 * ACTION TYPES
 */
const SET_DRAGGINGEND_TRUE = 'SET_DRAGGINGEND_TRUE'
const SET_DRAGGINGEND_FALSE = 'SET_DRAGGINGEND_FALSE'

/**
 * ACTION CREATORS
 */
export const setDraggingEndTrue = () => ({type: SET_DRAGGINGEND_TRUE})
export const setDraggingEndFalse = () => ({type: SET_DRAGGINGEND_FALSE})

/**
 * REDUCER
 */
export default function(state = draggingEnd, action) {
  switch (action.type) {
    case SET_DRAGGINGEND_TRUE:
      return {isDraggingEnd: true}
    case SET_DRAGGINGEND_FALSE:
      return {isDraggingEnd: false}
    default:
      return state
  }
}
