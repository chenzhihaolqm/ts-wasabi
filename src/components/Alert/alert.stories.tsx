import React, {useState} from 'react'
import { storiesOf } from '@storybook/react'

import Alert from './alert'
import Button from '../Button/button'

const defaultAlert = () => {
  
  const [show, toggleShow] = useState(false);
  const [type, setType] = useState('default');
  const handleClickBtn = function (t: string){
    console.log(arguments)
    setType(t);
    toggleShow(true)
    setTimeout(() => {
      toggleShow(false)
    }, 3000)
  }  
  return  (<>
       <Button onClick={handleClickBtn.bind(this, 'default')} >显示default Alert</Button>
       <Button btnType="danger" onClick={handleClickBtn.bind(this, 'danger')} >显示danger Alert</Button>
       <Alert style={{display: (show ? 'block' : 'none')}} type={type} showClose={false} title="提示" message="你确定要删除吗"></Alert>
    </>
  )
}

storiesOf('Alert Component', module)
  .add('Alert', defaultAlert)