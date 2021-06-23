import { useEffect, useState , RefObject} from "react"

const useClickOutSide = (ref: RefObject<HTMLElement>, callback: Function) => {
  let listener = (event: MouseEvent) => {
    if(ref.current && ref.current.contains(event.target as HTMLElement)){
      return;
    }
    callback();
  }
  document.addEventListener('click', listener);
  return () => {
    document.removeEventListener('click', listener);
  }
}

export default useClickOutSide