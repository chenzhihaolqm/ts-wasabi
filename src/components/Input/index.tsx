import React, { FC, InputHTMLAttributes, FunctionComponentElement, useState, ChangeEvent } from 'react';
import classNames from 'classnames'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import Icon from '../Icon/icon'

export type InputSize = 'lg' | 'sm';

interface BaseIuputProps{
  disabled?: boolean
  size?: InputSize,
  className?: string,
  suffixIcon?: IconProp,
  prefixIcon?: IconProp,
  prepend?: string,
  append?: string,
  onChangeVal?: (value: string) => void
}

export type IuputProps = BaseIuputProps &  Omit<InputHTMLAttributes<HTMLElement>, 'size'>

export const Input: FC<IuputProps> = (props) => {
  const { disabled, size, className, value, suffixIcon, prefixIcon,  prepend, append, children, onChangeVal, ...restProps } = props;
  const icons:Array<FunctionComponentElement<FontAwesomeIconProps>> = [];
  React.Children.forEach(children, (child, index) => {
    const childElement = child as (FunctionComponentElement<FontAwesomeIconProps>) ;
    if(childElement.type.name === 'Font' ){
      icons.push(childElement)
    }
  })
  const classes = classNames('wasabi-input', className, {
    [`input-${size}`]: size,
    'is-disabled': disabled,
    'with-prefix-icon': prefixIcon,
    'with-suffix-icon': suffixIcon || icons.length,
  })
  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeVal && onChangeVal(event.target.value as string);
  }
  return (<div className={classes}>
      {suffixIcon && <div className='icon-wrapper'>{<Icon icon={suffixIcon} />}</div> }
      {prefixIcon && <div className='icon-wrapper prefix'>{<Icon icon={prefixIcon} />}</div> }
      {icons.length ? <div className='icon-wrapper'>{icons[0]}</div> : ''}
      {prepend && <div className='prepend'>{prepend}</div>}
      <input onInput={changeInput} className="input"  value={value} disabled = {disabled}  {...restProps} />
      {append && <div className='append'>{append}</div>}
    </div>)
}

Input.defaultProps = {

}

export default Input;
