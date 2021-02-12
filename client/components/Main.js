import React from "react";
import Grid from './Grid.js'
import GridKey from './GridKey'
import Controls from './Controls'

export default class Main extends React.Component{
  render(){
    return (
      <div>
      <GridKey />
      <Grid />
      <Controls />
      </div>
    )
  }
}
