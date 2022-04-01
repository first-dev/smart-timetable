import { useState, useEffect } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

const useDynamicDimensions = (type: 'window' | 'screen') => {
  const [dimension, setDimension] = useState(Dimensions.get(type))
  const changeListener = ({ window, screen }: { window: ScaledSize; screen: ScaledSize }) => {
    type === 'window' ? setDimension(window) : setDimension(screen)
  }
  useEffect(() => {
    Dimensions.addEventListener('change', changeListener)
    return () => {
      Dimensions.removeEventListener('change', changeListener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return dimension
}

export default useDynamicDimensions
