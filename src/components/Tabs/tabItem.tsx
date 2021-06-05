import React, { FC, useContext, useState } from 'react'
import { TabsContext } from './tabs'
import classNames from 'classnames'

export interface ITabItem{
  label: string | React.ReactElement,
  index?: string,
  children: any,
  className?: string,
  style?: React.CSSProperties,
  disabled?: boolean
}

export interface IResTabItem extends ITabItem{
  type: string,
  props?: any,
  key?: any
}

export const TabItem = (props: ITabItem) => {
  const { className, style, disabled, label, index } = props;
  const context = useContext(TabsContext);
  const classes = classNames('tab-item', className, {
    'is-disabled': disabled,
    'is-active': context.activeIndex === index
  })
  const handleSelect = () => {
    if(context.onSelect && !disabled){
      context.onSelect(index as string)
    }
  }
  return (<li className={classes} style={style} onClick={handleSelect}>
      {label}
  </li>);
}

export default TabItem;