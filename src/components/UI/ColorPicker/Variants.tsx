import { range } from 'lodash'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import PlatformTouchable from '../PlatformTouchable'

type Props = {
  style?: StyleProp<ViewStyle>
  colors?: string[]
  activeColorIndex?: number
  onActiveColorChange?: (newActiveColorIndex: number) => void
}

const Variants: FC<Props> = ({ style, colors = [], activeColorIndex, onActiveColorChange }) => {
  return (
    <View style={[styles.container, style]}>
      {range(colors.length).map(i => {
        const color = colors[i]
        const active = activeColorIndex != undefined && color === colors[activeColorIndex]
        const height = active ? 56 : 50
        return (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: color,
              height,
            }}>
            <PlatformTouchable
              onPress={() => onActiveColorChange?.(i)}
              style={{ height: height }}
            />
          </View>
        )
      })}
    </View>
  )
}
export default gestureHandlerRootHOC(Variants, { flex: undefined })
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    height: 55,
  },
})
