import React, { createContext, useState } from 'react'
import { MenuItemProps } from './menuItem'
import classNames from 'classnames'

type menuMode = 'horizontal' | 'vertical'
type onSelectCallback = (selectedIndex: String) => void
export interface MenuProps{
  mode?: menuMode,
  defaultIndex?: String,
  className?: String,
  style?: React.CSSProperties,
  onSelect?: onSelectCallback
}
interface IMenuContext{
  mode: menuMode,
  index: String,
  onSelect?: onSelectCallback
}
export const MenuContext = createContext<IMenuContext>({index: '0', mode: 'horizontal'});
const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultIndex, className, style, children, onSelect } = props;
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical'
  });
  const [activeIndex, setIndex] = useState(defaultIndex);
  const handleClick = (index: String) => {
    setIndex(index);
    onSelect && onSelect(index);
  }
  const passedMenuContext = {
    mode: mode as menuMode,
    index: activeIndex as String,
    onSelect: handleClick
  };
  const template = React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<MenuItemProps>;
    if(childElement.type.name === 'MenuItem' || childElement.type.name === 'SubMenuItem'){
      return React.cloneElement(childElement, {
        index: index.toString()
      })
    } else {
      console.error('Warning: Menu has a child which is not a MenuItem component')
    }
  })
  return (
  <MenuContext.Provider value={ passedMenuContext }>
      <ul className={classes} style={style} data-testid="test-menu">{template}</ul>
  </MenuContext.Provider>)
}

Menu.defaultProps = {
  mode: 'horizontal',
  defaultIndex: '0'
}

export default Menu;