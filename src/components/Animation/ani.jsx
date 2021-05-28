import React, { Component, Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';


const App = () => {
  const [show, setShow] = useState(true)
  return (
    　　　　　　<div>
    　　　　　　　　<CSSTransition
    　　　　　　　　　　in={show}
    　　　　　　　　　　timeout={1000}
    　　　　　　　　　　classNames="fade"
    　　　　　　　　　　unmountOnExit
    　　　　　　　　　　appear={true}
    　　　　　　　　>
    　　　　　　　　　　<div>hello</div>
               
    　　　　　　　　</CSSTransition>
    　　　　　　　
    　　　　　　</div>
               
    　　　　)
}
export default App;