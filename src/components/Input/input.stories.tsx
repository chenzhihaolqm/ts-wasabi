import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Input from './index'
import Autocomplete from './autocomplete'
import Icon from '../Icon/icon'

const defaultInput = () => (
  <>
    <Input placeholder="请输入" value="输入框" />
  </>
)
const InputWithSizes = () => (
  <>
    <Input size="lg" placeholder="请输入" />
    <Input disabled value="禁止输入"/>
    <Input size="sm" />
  </>
)
const InputWithIcon = () => (
  <>
    <div>
      <Input size="lg" placeholder="icon通过string传进" prefixIcon="search"/>
      <Input size="lg" placeholder="icon通过Element传进">
        <Icon icon="align-justify" onClick={() => {alert('clicked')}}/>
      </Input>
    </div>
    <div>
      <Input placeholder="icon通过string传进" prefixIcon="search"/>
      <Input placeholder="icon通过Element传进">
        <Icon icon="align-justify" onClick={() => {alert('clicked')}}/>
      </Input>
    </div>
    <div>
      <Input size="sm" placeholder="icon通过string传进" prefixIcon="search"/>
      <Input size="sm" placeholder="icon通过Element传进">
        <Icon icon="align-justify" onClick={() => {alert('clicked')}}/>
      </Input>
    </div>
  </>
  
)

const InputWithAppend = () => (
  <>
    <div>
      <Input size="lg" placeholder="" prepend="https://" />
      <Input size="lg" placeholder="" append=".com" />
    </div>
    <div>
      <Input placeholder="" prepend="https://" />
      <Input placeholder="" append=".com" />
    </div>
    <div>
      <Input size="sm" placeholder="" prepend="https://" />
      <Input size="sm" placeholder="" append=".com" />
    </div>
  </>
)

const defaultAutocomplete = () => {
  return <Autocomplete></Autocomplete>
}

storiesOf('Input Component', module)
  .add('Input', defaultInput)
  .add('不同尺寸的 Input', InputWithSizes)
  .add('带有icon的 Input', InputWithIcon)
  .add('带有前后缀 Input', InputWithAppend)
  .add('带有下拉提示 Input', defaultAutocomplete)
