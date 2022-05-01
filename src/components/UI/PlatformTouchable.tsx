import { ComponentProps, FC } from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'

type Props = ComponentProps<typeof TouchableOpacity & typeof TouchableNativeFeedback>

const PlatformTouchable: FC<Props> = props => {
  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback {...props} />
  ) : (
    <TouchableOpacity activeOpacity={0.8} {...props} />
  )
}
export default PlatformTouchable
