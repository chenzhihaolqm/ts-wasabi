import React, { Component, Fragment, useState } from 'react';
import { CSSTransition } from 'react-transition-group';


const App = () => {
  const [show, setShow] = useState(false)
  return (
    <div>
               <div onClick={() => setShow(!show)}>hehe</div>
               <div onClick={() => setShow(!show)}>hehe</div>
               <CSSTransition
     　　　　　　　　　　in={show}
     　　　　　　　　　　timeout={300}
     　　　　　　　　　　classNames="zoom-in-left"
                       appear
     　　　　　　　　　　unmountOnExit>
    　　　　　　　　<div>
                    <div>one one one</div>
                    <div>one one one</div>
                    <div>one one one</div>
                    <div>one one one</div>
                    <div>one one one</div>
                    <div>one one one</div>
                  </div>
     　　　　　</CSSTransition>
        </div>
               
    　)
}
export default App;