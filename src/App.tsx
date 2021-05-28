import React, { useState } from 'react';
// import logo from './logo.svg';
// import './App.css';
import Hello from './components/Hi'
import LikeButton from './components/LikeButton'
import MouseTracker from './components/MouseTracker'
import WithLoader from './components/withLoader'
import useMousePostion from './hooks/useMousePosition'
import useURLLoader from './hooks/useURLLoader'
import Button, { ButtonType, ButtonSize } from './components/Button/button'

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
  const WrapperedDogShow = WithLoader(DogShow);
  const position = useMousePostion();
  const [data, loading] = useURLLoader('', [refresh]);
  // const showResult = data as IShowResult;
  return (
    <div className="App">
      <Button onClick={()=>{alert(1)}}>点击</Button>
      <Button size={ButtonSize.Large} btnType={ButtonType.Default}>submit</Button>
      <Button btnType={ButtonType.Link} href="http://baidu.com" target="_blank">提交</Button>
      
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
      
    </div>
  );
}

export default App;
