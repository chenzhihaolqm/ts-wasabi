import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 ts-wasabi 组件库</h1>
        <p>ts-wasabi组件库是仿照心怡wasabid组件库写的</p>
        <h3>安装试试</h3>
        <code>
          npm install ts-wasabi --save
        </code>
      </>
    )
  }, { info : { disable: true }})