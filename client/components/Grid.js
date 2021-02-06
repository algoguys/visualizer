import React from "react";
import makeAdjList from "../data/adjList";


export default class App extends React.Component{
  render(){
    let width = 4;
    let height = 4;
    console.log(width, height)
    let adjList = makeAdjList(width, height);
    console.log(adjList)
    return (
      <div>grid</div>
    )
  }
}
