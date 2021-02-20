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
const UPDATE_NODE = 'UPDATE_NODE' //? update the node type, when we implement controls

/**
 * ACTION CREATORS
 */
export const getNode = nodeId => ({type:GET_NODE, nodeId})
export const getGrid = () => ({type:GET_GRID})
export const makeGrid = (width, height) => ({type: MAKE_GRID, width, height})
export const updateNode = (id, nodeType) => ({type: UPDATE_NODE, id, nodeType})

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
    case UPDATE_NODE:
      console.log('state', state)
      state[action.id].type = action.nodeType;
      console.log('updated type to ', action.nodeType)
      return { ...state }

      //console.log('update node--->\n', temp);
      //return [...grid, grid[action.id].type = action.nodeType]
    default:
      return state
  }
}
