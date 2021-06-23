import React, { FC, useState } from 'react';

import classNames from 'classnames'

interface DraggerProps{
  onFile?: any
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [ isOver, setDragOver ] = useState(false);
  const classes = classNames('uploader-dragger', {
    'is-dragover': isOver
  })
  const handleDragOver = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over)
  }
  return (
    <div className={classes}
    onDragOver={ (e) => handleDragOver(e, true)}
    onDragLeave={ (e) => handleDragOver(e, false)} >

    </div>
  )
}

export default Dragger;