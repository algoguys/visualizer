import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faMapMarker, faTimes} from '@fortawesome/free-solid-svg-icons'

const GridKey = (props) => {
  return (
  <div className='gridKey'>
    <div className='keyitem'>
      <div className='keybox start'>
        <FontAwesomeIcon id="startKeyIcon" icon={faChevronRight} />
      </div>
      <h3>Start</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox end'>
        <FontAwesomeIcon id="endKeyIcon" icon={faTimes} />
      </div>
      <h3>End</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox visited'></div>
      <h3>Visited</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox shortestPath'></div>
      <h3>Shortest Path</h3>
    </div>
    <div className='keyitem'>
      <div className='keybox wall'></div>
      <h3>Wall</h3>
    </div>
  </div>
  )
}

export default GridKey
