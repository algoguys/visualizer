import React from "react";
import { useSelector } from 'react-redux'

const Row = (props) => {

  const grid = useSelector(state => state.grid)

    return (
      <tr>
        {
          props.widthArr.map(((cell, idx) => {
            // calculate id to be associated with grid obj of the current cell
            const cellId = (props.rowId * props.widthArr.length) + idx
            // assign class based on cell type
            let typeClass = "unvisited"
            if (grid[cellId].type === 'start') typeClass = "start"
            else if (grid[cellId].type === 'end') typeClass = "end"
            else if (grid[cellId].type === 'visited') typeClass = "visited"
            else if (grid[cellId].type === 'shortestPath') typeClass = "shortestPath"

          return <td key={idx} cellid={cellId} className={typeClass} onClick={() => alert(`cell: ${grid[cellId].id}\nneighbors: ${grid[cellId].neighbors}\ntype: ${grid[cellId].type}`)}>{grid[cellId].id}</td>
          }))
        }
      </tr>
    )

}

export default Row
