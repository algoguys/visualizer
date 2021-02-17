import React from "react";

export default class Row extends React.Component{
  render(){

    console.log('props', this.props)
    // let width = Math.floor(window.innerWidth/25);
    // let height = Math.floor(window.innerHeight/25);
    // console.log(width, height)
    // let adjList = makeAdjList(width, height);
    // console.log(adjList)

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
