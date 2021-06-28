import { FC } from 'react'
import Menu, { MenuProps } from './menu'
import SubMenu, { SubMenuItemProps } from './subMenuItem'
import MenuItem, { MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  MenuItem: FC<MenuItemProps>,
  SubMenu: FC<SubMenuItemProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.MenuItem = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu