import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenuItem from './subMenuItem'


const defaultMenu = () => (
  <Menu onSelect={ (index) => {action(`clicked ${index} item`)}}>
    <MenuItem >语文</MenuItem>
    <MenuItem  disabled>disabled 数学</MenuItem>
    <MenuItem >英语</MenuItem>
  </Menu>
)

const VerticalMenu = () => (
  <Menu mode="vertical" onSelect={ (index) => {action(`clicked ${index} item`)}}>
    <MenuItem >语文</MenuItem>
    <MenuItem >数学</MenuItem>
    <MenuItem >英语</MenuItem>
  </Menu>
)

const WithSubMenu = () => (
  <Menu onSelect={ (index) => {action(`clicked ${index} item`)}}>
    <MenuItem >语文</MenuItem>
    <MenuItem >数学</MenuItem>
    <SubMenuItem title="外语">
      <MenuItem>英语</MenuItem>
      <MenuItem>法语</MenuItem>
    </SubMenuItem>
  </Menu>
)



storiesOf('Menu Component', module)
  .add('Menu', defaultMenu)
  .add('垂直 Menu', VerticalMenu)
  .add('带有二级 Menu', WithSubMenu)
  