import React from 'react'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface FontProps extends FontAwesomeIconProps{
  theme?: ThemeProps
}

const Font:React.FC<FontProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('wasabid-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (<FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>)
}

export default Font