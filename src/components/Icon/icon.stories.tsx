import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Icon from './icon'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

const defaultIcon = () => {
  return <Icon icon='coffee' theme="danger" className="nb" size="1x"></Icon>
}


storiesOf('Icon Component', module)
  .add('Icon', defaultIcon)
  