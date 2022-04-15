import { ComponentProps, FC } from 'react'
import { Platform } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'

TouchableOpacity.defaultProps.activeOpacity = 0.8

type Props = ComponentProps<typeof TouchableOpacity & typeof TouchableNativeFeedback>

const PlatformTouchable: FC<Props> = (
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity
) as any
export default PlatformTouchable
