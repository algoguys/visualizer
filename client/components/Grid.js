import React from "react";
import makeAdjList from "../data/adjList";
import dfsTraversal from "../algorithms/depthFirst"
import Row from "./Row"


export default class App extends React.Component{
  render(){
    let width = Math.floor((window.innerWidth-20)/75);
    let height = Math.floor((window.innerHeight-200)/75);
    console.log(width, height)
    const grid = makeAdjList(width, height);
    console.log(grid)

    const heightArr = Array(height).fill(' ');
    const widthArr = Array(width).fill(' ');

    //dfsTraversal(5, 13)

    return (
      <table>
        <tbody>
          {
            heightArr.map((row, idx) => {
              return <Row key={idx} widthArr={widthArr} />
            })
          }
        </tbody>
      </table>
    )
  }
}
