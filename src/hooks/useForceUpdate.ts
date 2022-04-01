import { useCallback, useState } from 'react'

const useForceUpdate = () => {
  const [, setValue] = useState(0)
  return useCallback(() => setValue(value => value + 1), [])
}
export default useForceUpdate
