/**
 * INITIAL STATE
 */
const running = {isRunning: false}

/**
 * ACTION TYPES
 */
const SET_RUNNING_TRUE = 'SET_RUNNING_TRUE'
const SET_RUNNING_FALSE = 'SET_RUNNING_FALSE'

/**
 * ACTION CREATORS
 */
export const setRunningTrue = () => ({type: SET_RUNNING_TRUE})
export const setRunningFalse = () => ({type: SET_RUNNING_FALSE})

/**
 * REDUCER
 */
export default function(state = running, action) {
  switch (action.type) {
    case SET_RUNNING_TRUE:
      return {isRunning: true}
    case SET_RUNNING_FALSE:
      return {isRunning: false}
    default:
      return state
  }
}
