import { useCallback, useState } from 'react'
import { LayoutChangeEvent, LayoutRectangle } from 'react-native'

const useLayoutEvent = () => {
  const [isSet, setIsSet] = useState(false)
  const [event, setEvent] = useState<LayoutRectangle>()
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setEvent(event.nativeEvent.layout)
    setIsSet(true)
  }, [])
  return {
    event,
    onLayout,
    isSet,
  }
}

export default useLayoutEvent
