import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faMapMarker, faTimes} from '@fortawesome/free-solid-svg-icons'

const GridKey = (props) => {
  return (
  <div className='gridKey'>
    <div className='keyitem'>
      <div className='keybox' id= 'startKey'>
        <FontAwesomeIcon id="startKeyIcon" icon={faChevronRight} />
      </div>
      <h3>Start</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox endKey' id='endKey'>
        <FontAwesomeIcon id="endKeyIcon" icon={faTimes} />
      </div>
      <h3>End</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox' id='visitedKey'></div>
      <h3>Visited</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox shortestPath'></div>
      <h3>Shortest Path</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox water'></div>
      <h3>Water</h3>
    </div>
  </div>
  )
}

export default GridKey
