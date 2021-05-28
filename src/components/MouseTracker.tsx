import React, { useState } from "react"
import useMousePostion from '../hooks/useMousePosition'
const MouseTracker: React.FC = () => {
  const position = useMousePostion();
  return (<div>
    <p>X:{position.x},Y:{position.y}</p>
  </div>);
}

export default MouseTracker;

