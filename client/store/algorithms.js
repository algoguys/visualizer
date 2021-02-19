import dfsTraversal from '../algorithms/depthFirst'

/**
 * INITIAL STATE
 */
const selectedAlgo = 'depthFirst'

/**
 * ACTION TYPES
 */
const RUN_DEPTH_FIRST = 'DEPTH_FIRST'

/**
 * ACTION CREATORS
 */
export const runDepthFirst = (startId, endId) => ({type: RUN_DEPTH_FIRST, startId, endId})

/**
 * REDUCER
 */
export default function(state = selectedAlgo, action) {
  switch (action.type) {
    case RUN_DEPTH_FIRST:
      dfsTraversal(action.startId, action.endId)
      return state
    default:
      return state
  }
}
