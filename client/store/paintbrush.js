/**
 * INITIAL STATE
 */
const paintbrush = 'water'

/**
 * ACTION TYPES
 */
const CHANGE_BRUSH = 'CHANGE_BRUSH'

/**
 * ACTION CREATORS
 */
export const changeBrush = (newBrush) => ({type: CHANGE_BRUSH, newBrush})

/**
 * REDUCER
 */
export default function(state = paintbrush, action) {
  switch (action.type) {
    case CHANGE_BRUSH:
      return action.newBrush
    default:
      return state
  }
}
