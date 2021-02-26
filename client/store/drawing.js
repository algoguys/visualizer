/**
 * INITIAL STATE
 */
const drawing = {isDrawing: false}

/**
 * ACTION TYPES
 */
const SET_DRAWING_TRUE = 'SET_DRAWING_TRUE'
const SET_DRAWING_FALSE = 'SET_DRAWING_FALSE'

/**
 * ACTION CREATORS
 */
export const setDrawingTrue = () => ({type: SET_DRAWING_TRUE})
export const setDrawingFalse = () => ({type: SET_DRAWING_FALSE})

/**
 * REDUCER
 */
export default function(state = drawing, action) {
  switch (action.type) {
    case SET_DRAWING_TRUE:
      console.log("state before toggle", state.isDrawing)
      return {isDrawing: true}
    case SET_DRAWING_FALSE:
      return {isDrawing: false}
    default:
      return state
  }
}
