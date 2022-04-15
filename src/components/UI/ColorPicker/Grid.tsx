import { spacing as constSpacing } from '@constants'
import { range } from 'lodash'
import { FC, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import EmptyItem from './EmptyItem'
import Item from './Item'

type Props = {
  style?: StyleProp<ViewStyle>
  colors: string[]
  itemSize?: number
  spacing?: number
  activeColorIndex?: number
  onActiveColorChange?: (newActiveColorIndex: number) => void
  width?: number
}

const Grid: FC<Props> = ({
  style,
  colors,
  itemSize = 60,
  spacing = constSpacing.s,
  activeColorIndex,
  onActiveColorChange,
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0)
  const emptySlots =
    containerWidth != 0
      ? colors.length % (containerWidth % (itemSize + 2 * spacing))
      : colors.length
  return (
    <View
      style={[styles.container, style]}
      onLayout={
        containerWidth == 0 ? event => setContainerWidth(event.nativeEvent.layout.width) : undefined
      }>
      {colors.map((color, index) => {
        return (
          <Item
            key={index}
            color={color}
            active={activeColorIndex != undefined && color === colors[activeColorIndex]}
            size={itemSize}
            onPress={() => onActiveColorChange?.(index)}
            style={{ margin: spacing }}
          />
        )
      })}
      {range(emptySlots).map(i => (
        <EmptyItem key={i + colors.length} size={itemSize} style={{ marginHorizontal: spacing }} />
      ))}
    </View>
  )
}
export default Grid

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
})
