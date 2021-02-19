import React from "react";
import { useSelector } from 'react-redux'

const Row = (props) => {

  const grid = useSelector(state => state.grid)

    return (
      <tr>
        {
          props.widthArr.map(((cell, idx) => {

            const cellId = (props.rowId * props.widthArr.length) + idx

            return <td key={idx} cellid={cellId} onClick={() => alert(`cell: ${grid[cellId].id} neighbors: ${grid[cellId].neighbors}`)}></td>
          }))
        }
      </tr>
    )

}

export default Row
