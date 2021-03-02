/**
 * INITIAL STATE
 */
const previousCell= {type: 'normal'}

/**
 * ACTION TYPES
 */
const UPDATE_PREVIOUS_CELL = 'UPDATE_PREVIOUS_CELL'

/**
 * ACTION CREATORS
 */
export const updatePreviousCell = (newType) => ({type: UPDATE_PREVIOUS_CELL, newType})

/**
 * REDUCER
 */
export default function(state = previousCell, action) {
  switch (action.type) {
    case UPDATE_PREVIOUS_CELL:
      return {type: action.newType}
    default:
      return state
  }
}
