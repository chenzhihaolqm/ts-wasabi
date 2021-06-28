import React, { FC,  useState } from 'react';
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps{
  percent: number;
  storkeHeight?: number;
  showText?: boolean;
  style?: React.CSSProperties;
  theme?: ThemeProps
}


export const Progress: FC<ProgressProps> = (props) => {
  const { percent, storkeHeight, showText, style, theme } = props;
  return (
    <div className="progress-bar" style={style}>
      <div className= "progress-bar-outer" style={{ height: `${storkeHeight}px` }}>
        <div className={`progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
         { showText && <span className="inner-text">{`${percent}%`}</span> }
        </div>
      </div>
    </div>
  )
}

Progress.defaultProps = {
  storkeHeight: 15,
  showText: true,
  theme: 'primary'
}

export default Progress;

