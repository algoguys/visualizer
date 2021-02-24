/**
 * INITIAL STATE
 */
const drawing = {isDrawing: false}

/**
 * ACTION TYPES
 */
const SET_TRUE = 'SET_TRUE'
const SET_FALSE = 'SET_FALSE'

/**
 * ACTION CREATORS
 */
export const setTrue = () => ({type: SET_TRUE})
export const setFalse = () => ({type: SET_FALSE})

/**
 * REDUCER
 */
export default function(state = drawing, action) {
  switch (action.type) {
    case SET_TRUE:
      console.log("state before toggle", state.isDrawing)
      return {isDrawing: true}
    case SET_FALSE:
      return {isDrawing: false}
    default:
      return state
  }
}
