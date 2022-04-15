import { FC } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Colors } from 'react-native-paper'
import tinycolor from 'tinycolor2'
import PlatformTouchable from '../PlatformTouchable'

type Props = {
  style?: StyleProp<ViewStyle>
  color?: string
  size?: number
  onPress?: () => void
  active?: boolean
}

const Item: FC<Props> = ({ style, color, size = 60, onPress, active }) => {
  const borderColor = `#${tinycolor(color).darken(20).toHex()}`
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: size,
          borderColor,
          borderWidth: active ? 2 : 0,
        },
        style,
      ]}>
      {color && <PlatformTouchable onPress={onPress} style={{ width: size, aspectRatio: 1 }} />}
    </View>
  )
}
export default gestureHandlerRootHOC(Item, { flex: undefined })
const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
    alignItems: 'stretch',
    borderColor: Colors.grey400,
  },
})
