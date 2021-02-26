/**
 * INITIAL STATE
 */
const running = {isRunning: false}

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
export default function(state = running, action) {
  switch (action.type) {
    case SET_TRUE:
      return {isRunning: true}
    case SET_FALSE:
      return {isRunning: false}
    default:
      return state
  }
}
