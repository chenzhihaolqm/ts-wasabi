import React, { useState } from 'react';
import classNames from 'classnames'

export type AlertType = 'success' | 'warnning' | 'danger' | 'default'

interface BaseAlterProps{
  title?: String,
  message: String,
  showClose?: Boolean,
  type?: String
}

export type AlertProps = BaseAlterProps & React.HTMLAttributes<HTMLElement>

export const Alert: React.FC<AlertProps> = (props) => {
  const { className, title, message, showClose, type } = props;
  const classes = classNames('alert', className, {
    [`alert-${type}`]: type,
  })
  let [show, setShow] = useState(true)
  const closeAlert = () => {
    setShow(false)
  }
  setTimeout(closeAlert, 3000)
  return (show ? <div className={classes}>
      {showClose ? <i className='icon-close' onClick={closeAlert}>x</i> : ''}
      <div className='title'>{title}</div>
      <div className='message'>{message}</div>
    </div>: <></>)
}

Alert.defaultProps = {
  title: '',
  showClose: true,
  type: 'default'
}
export default Alert;