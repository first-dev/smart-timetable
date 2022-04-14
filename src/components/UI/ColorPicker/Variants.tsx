import { range } from 'lodash'
import { FC } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import { gestureHandlerRootHOC, TouchableNativeFeedback } from 'react-native-gesture-handler'

type Props = {
  style?: StyleProp<ViewStyle>
  colors: [string, string, string, string, string]
  activeColor?: string
  onActiveColorChange?: (newActiveColor: string) => void
}

const Variants: FC<Props> = ({ style, colors, activeColor, onActiveColorChange }) => {
  return (
    <View style={[styles.container, style]}>
      {range(5).map(i => {
        const color = colors[i]
        const active = color === activeColor
        const height = active ? 56 : 50
        return (
          <View
            key={i}
            style={{
              flex: 1,
              backgroundColor: color,
              height,
            }}>
            <TouchableNativeFeedback
              onPress={() => onActiveColorChange?.(color)}
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
