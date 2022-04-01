import { useState, useEffect } from 'react'
import { StyleSheet, ScaledSize, Dimensions } from 'react-native'

type StylesProvider<T> = (window: ScaledSize, screen: ScaledSize) => StyleSheet.NamedStyles<T>
/**
 * Updates styles dynamically when screen dimensions change
 */
const useDynamicWindowStyles = <T>(stylesProvider: StylesProvider<T>) => {
  const [dynamicStyles, setDynamicStyles] = useState(
    stylesProvider(Dimensions.get('window'), Dimensions.get('screen')),
  )
  const changeListener = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
    setDynamicStyles(stylesProvider(window, screen))
  }
  useEffect(() => {
    Dimensions.addEventListener('change', changeListener)
    return () => {
      Dimensions.removeEventListener('change', changeListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return dynamicStyles
}

export default useDynamicWindowStyles
