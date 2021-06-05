import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Hello from './components/Hi'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import WithLoader from './components/withLoader'
import Transition from './components/Transition/transition'
import useMousePostion from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import Button from './components/Button/button'
import { CSSTransition } from 'react-transition-group';

interface IShowResult{
  message: string,
  status: string
}

interface IThemeProps{
  [key: string]: {color: string, background: string}
}

const themes: IThemeProps = {
  light: {
    color: '#000',
    background: '#eee'
  },
  dark: {
    color: '#fff',
    background: '#222'
  }
}

export const ThemeContext = React.createContext(themes.light);

const DogShow: React.FC<{data: IShowResult}> = ({data}) => {
  return (
    <>
      <h2>Dog show { data && data.status}</h2>
      <p>{data && data.message}</p>
  </>
  )
}

function App() {
  const [refresh, setRefresh] = useState(1);
  const [menuOpen, setOpen] = useState(true)
  const WrapperedDogShow = WithLoader(DogShow);
  const position = useMousePostion();
  const [data, loading] = useURLLoader('', [refresh]);
  // const showResult = data as IShowResult;
  return (
    <div className="App">
      <Button onClick={()=>{alert(1)}}>点击</Button>
      <Button size='lg' btnType='default'>submit</Button>
      <Button btnType='link' href="http://baidu.com" target="_blank">提交</Button>
      
      <ThemeContext.Provider value={themes.dark}>
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>X:{position.x},Y:{position.y}</p>
          <Hello message="hello world!!!" />
          <LikeButton></LikeButton>
          <MouseTracker></MouseTracker>
          <WrapperedDogShow/>
          <button onClick={() => {setRefresh(refresh + 1)}}>影响加载rondom{refresh}</button>
          {/* {loading ? '读取中' : showResult && showResult.message} */}
        </header>
      </ThemeContext.Provider>


      <Button style={{marginLeft: '10px'}} onClick={()=>{setOpen(!menuOpen)}}>点击</Button>
    <Transition
      in={menuOpen}
      timeout={3000}
      animation="zoom-in-left"
    >

      <div>
        <div>one one one</div>
        <div>one one one</div>
        <div>one one one</div>
        <div>one one one</div>
        <div>one one one</div>
        <div>one one one</div>
      </div>
    </Transition>

    <CSSTransition
      in={menuOpen}
      timeout={3000}
      classNames="zoom-in-left"
      appear
      unmountOnExit
    >
      <Button size="lg">A large Button</Button>
    </CSSTransition>
      
    </div>
  );
}

export default App;
