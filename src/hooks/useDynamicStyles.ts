import { DependencyList, useMemo } from 'react'
import { ImageStyle, TextStyle, ViewStyle } from 'react-native'

type StylesProvider<T extends ViewStyle | TextStyle | ImageStyle> = () => T
const useDynamicStyles = <T>(factory: StylesProvider<T>, deps?: DependencyList) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dynamicStyles = useMemo(factory, deps)
  return dynamicStyles
}

export default useDynamicStyles
