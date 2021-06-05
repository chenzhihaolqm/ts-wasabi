import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Tabs from './tabs'

import TabItem from './tabItem'

const defaultTabs = () => {
  return (
    <Tabs>
      <TabItem label={<div >选项卡一（这是Element参数）</div>}><div><div>card1</div></div></TabItem>
      <TabItem label="选项卡二">card2</TabItem>
      <TabItem label="选项卡三（disabled）" disabled>card3</TabItem>
    </Tabs>
  )
}

const cardTabs = () => {
  return (
    <Tabs type="card">
      <TabItem label={<div >选项卡一（这是Element参数）</div>}><div><div>card1</div></div></TabItem>
      <TabItem label="选项卡二">card2</TabItem>
      <TabItem label="选项卡三">card3</TabItem>
    </Tabs>
  )
}

const borderCardTabs = () => {
  return (
    <Tabs type="border-card">
      <TabItem label={<div >选项卡一</div>}><div><div>card1</div></div></TabItem>
      <TabItem label="选项卡二">card2</TabItem>
      <TabItem label="选项卡三">card3</TabItem>
    </Tabs>
  )
}

storiesOf('Tabs Component', module)
  .add('Tabs', defaultTabs)
  .add('选项卡Tabs', cardTabs)
  .add('卡片化Tabs', borderCardTabs)