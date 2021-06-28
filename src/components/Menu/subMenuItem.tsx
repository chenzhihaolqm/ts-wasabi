import React, { useState, useContext } from 'react'
import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'
import Icon from '../Icon/icon'
import classNames from 'classnames'
import Transition from '../Transition/transition'

export interface SubMenuItemProps{
  title: String,
  index?: String,
  className?: String,
  style?: React.CSSProperties
}

export const SubMenuItem: React.FC<SubMenuItemProps> = (props) => {
  const { children, index, title, className, style } = props;
  const context = useContext(MenuContext);
  const [menuOpen, toggleMenuOpen] = useState(false);
  const classes = classNames('submenu', className,  {
    'is-open': menuOpen
  });
  const renderChildren = () => {
    const template =  React.Children.map(children, (child, cIdx) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if(childElement.type.name === 'MenuItem'){
        return React.cloneElement(childElement, {
          index: `${index}-${cIdx}`
        })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
    let ulClasses = classNames('submenu-ul');

    return (<Transition
      in={menuOpen}
      timeout={3000}
      animation="zoom-in-left"
    >
     <ul className={ulClasses}>{template}</ul>
    </Transition>)
    // return (<ul className={ulClasses}>{template}</ul>);
  }
  
  const handleClickTitle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleMenuOpen(!menuOpen);
  }
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      toggleMenuOpen(toggle)
    }, 300)
  }
  const clickEvens = context.mode === 'vertical' ? {
    onClick: handleClickTitle
  } : {};
  const hoverEvens = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true)},
    onMouseLeave: ( e: React.MouseEvent) => { handleMouse(e, false)}
  } : {};
  return (<li className={classes} style={style} {... hoverEvens}>
    <div className="submenu-title" onClick={handleClickTitle} {... clickEvens}>
      <span>{title}</span>
      <Icon icon="angle-down" className="arrow-icon"></Icon>
    </div>
    {renderChildren()}
  </li>);
}

SubMenuItem.displayName = 'SubMenuItem'
export default SubMenuItem;