import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps{
  index?: String,
  className?: String,
  style?: React.CSSProperties,
  disabled?: Boolean
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, className, style, disabled, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index
  });
  const handleClick = () => {
    if(context.onSelect && !disabled){
      context.onSelect(index as string)
    }
  }
  return (<li className={classes} style={style} onClick={ handleClick }>
    {children}
  </li>);
}

// MenuItem.defaultProps = {
//   index: '0'
// }

export default MenuItem;