import React from "react";

const Row = (props) => {
    return (
      <tr>
        {
          props.widthArr.map(((cell, idx) => {

            const cellId = (props.rowId * props.widthArr.length) + idx

            return <td key={idx} cellid={cellId} onClick={() => alert(`you clicked on cell # ${cellId}`)}></td>
          }))
        }
      </tr>
    )

}

export default Row
