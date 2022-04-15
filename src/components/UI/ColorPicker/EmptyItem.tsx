import { FC } from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'

type Props = {
  style?: StyleProp<ViewStyle>
  size?: number
}

const EmptyItem: FC<Props> = ({ style, size = 60 }) => {
  return <View style={[{ width: size, height: 0 }, style]} />
}
export default EmptyItem
