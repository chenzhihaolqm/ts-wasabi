import { useEffect, useState } from "react"

const useDebonce = (value: any, delay = 300) => {
  const [debonceValue, setDebonceValue] = useState(value);
  useEffect(() =>{
    const timerId = setTimeout(() => {
      setDebonceValue(value)
    }, delay);
    return () => {
      clearTimeout(timerId)
    }
  }, [value])
  return debonceValue;
}

export default useDebonce