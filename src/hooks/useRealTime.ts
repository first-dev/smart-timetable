import { useEffect, useState } from 'react'

const useRealTime = (updateDurationMs: number) => {
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTime(new Date())
    }, updateDurationMs)
    return () => clearInterval(timeoutId)
  }, [updateDurationMs])
  return time
}

export default useRealTime
