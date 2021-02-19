import React from "react";

export default class Row extends React.Component{
  render(){
    return (
      <tr>
        {
          this.props.widthArr.map(((cell, idx) => {
            return <td key={idx}></td>
          }))
        }
      </tr>
    )
  }
}
