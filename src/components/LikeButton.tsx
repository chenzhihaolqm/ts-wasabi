import React, { useState, useRef, useEffect, useContext } from "react"
import { ThemeContext } from '../App';
let flag = true;
const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const [on, toggle] = useState(true);
  let likeRef = useRef(0);
  let domRef = useRef<HTMLInputElement>(null);
  let theme = useContext(ThemeContext);
  function handleClick(){
    setTimeout(()=>{
      alert(likeRef.current);
    }, 3000)
  }
  useEffect(() => {
    if(domRef && domRef.current){
      domRef.current.focus();
    }
  });
  return (<div>
    <input type="text" ref={domRef} />
    <button onClick={() => {setLike(like + 1); likeRef.current++;}}>
     {like}点  赞
    </button>
    <button style={theme} onClick={() => {toggle(!on); handleClick()}}>
     {on ? 'ON' : 'OFF'}
    </button>
  </div>);
}

export default LikeButton;

