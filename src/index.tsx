import React from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Button from './components/Button/button'
import Alert, { AlertType } from './components/Alert/alert'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenuItem from './components/Menu/subMenuItem';
import Icon from './components/Icon/icon'

import Tabs from './components/Tabs/tabs'
import TabItem from './components/Tabs/tabItem'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Animation from './components/Animation/ani.jsx'
library.add(fas);

ReactDOM.render(

  <React.StrictMode>
  <Tabs>
    <TabItem label={<div >hehe</div>}><div><div>card1</div></div></TabItem>
    <TabItem label="card2">card2</TabItem>
    <TabItem label="card3" disabled>card3</TabItem>
  </Tabs>
  <Icon icon='coffee' theme="danger" size="1x" rotation={90}></Icon>
</React.StrictMode>,
document.getElementById('root')  );
    // <React.StrictMode>
    //   <App></App>
    // </React.StrictMode>,
    // document.getElementById('root')  );
// ReactDOM.render(
//     <React.StrictMode>
//       <Animation></Animation>
//     </React.StrictMode>,
//     document.getElementById('root')  );
// ReactDOM.render(
//   <React.StrictMode>
//     <div>
//     <div >
//       <Button style={{marginLeft: '10px'}} onClick={()=>{alert(1)}}>点击</Button>
//       <Button style={{marginLeft: '10px'}} size='lg' btnType='default'>提交</Button>
//       <Button style={{marginLeft: '10px'}} disabled btnType='primary'>Disabled Button</Button>
//       <Button style={{marginLeft: '10px'}} size='sm' btnType='danger'>small Danger</Button>
//       <Button style={{marginLeft: '10px'}} btnType='link' href="http://baidu.com" target="_blank">提交</Button>
//       <Button style={{marginLeft: '10px'}} disabled btnType='link' href="http://baidu.com" size='lg' target="_blank">Disabled Link</Button>
//     </div>
//     <div>
//       {/* <Alert type='danger' showClose={false} title="提示" message="你确定要删除吗"></Alert> */}
//     </div>
//     {/* <Icon icon='coffee' theme="danger" size="5x" rotation={90}></Icon> */}
//     {/*  //pulse spin */}
//     <Menu onSelect={ (index) => {alert(index)}}>
//       <MenuItem >语文</MenuItem>
//       <MenuItem  disabled>数学</MenuItem>
//       <SubMenuItem title="外语">
//         <MenuItem>英语</MenuItem>
//         <MenuItem>法语</MenuItem>
//       </SubMenuItem>
//     </Menu>

//     <Menu onSelect={ (index) => {alert(index)}} mode="vertical">
//       <MenuItem>语文</MenuItem>
//       <MenuItem>数学</MenuItem>
//       <SubMenuItem title="外语">
//         <MenuItem>英语</MenuItem>
//         <MenuItem>法语</MenuItem>
//       </SubMenuItem>
//     </Menu>
//     </div>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
reportWebVitals();
