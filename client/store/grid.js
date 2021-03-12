import makeAdjList from '../data/adjList'

/**
 * INITIAL STATE
 */
const grid = {}

/**
 * ACTION TYPES
 */
const GET_NODE = 'GET_NODE' // return node object at given id
const GET_GRID = 'GET_GRID' // return entire grid object
const MAKE_GRID = 'MAKE_GRID' // create the grid
const UPDATE_STATUS = 'UPDATE_STATUS' //? update the node status, when we implement controls
const UPDATE_TYPE = 'UPDATE_TYPE' //? update the node type, when we implement controls
const UPDATE_START = 'UPDATE_START'
const UPDATE_END = 'UPDATE_END'
const UPDATE_WEIGHT = 'UPDATE_WEIGHT'

/**
 * ACTION CREATORS
 */
export const getNode = nodeId => ({type:GET_NODE, nodeId})
export const getGrid = () => ({type:GET_GRID})
export const makeGrid = (width, height) => ({type: MAKE_GRID, width, height})
export const updateStatus = (id, nodeStatus) => ({type: UPDATE_STATUS, id, nodeStatus})
export const updateType = (id, nodeType) => ({type: UPDATE_TYPE, id, nodeType})
export const updateStart = (id) => ({type: UPDATE_START, id})
export const updateEnd = (id) => ({type: UPDATE_END, id})
export const updateWeight = (id, newWeight) => ({type: UPDATE_WEIGHT, id, newWeight})


/**
 * REDUCER
 */
export default function(state = grid, action) {
  switch (action.type) {
    case GET_GRID:
      return state
    case MAKE_GRID:
      const grid = makeAdjList(action.width, action.height)
      return grid
    case UPDATE_STATUS:
      state[action.id].status = action.nodeStatus;
      return { ...state }
    case UPDATE_TYPE:
      state[action.id].type = action.nodeType;
      return { ...state }
    case UPDATE_WEIGHT:
      state[action.id].weight = action.newWeight;
      return { ...state}
    case UPDATE_START:
      return { ...state, start: action.id }
    case UPDATE_END:
      return { ...state, end: action.id }

      //console.log('update node--->\n', temp);
      //return [...grid, grid[action.id].type = action.nodeType]
    default:
      return state
  }
}
