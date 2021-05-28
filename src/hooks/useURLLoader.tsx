import { useEffect, useState } from "react"
const useURLLoader = (url: string, deps: any[] = []) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] =useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const res = {status: true, message: 'loging is done' + Math.random()}
      setData(res);
      setLoading(false);
    }, 2000)
  }, deps)
  return [data, loading]
}

export default useURLLoader