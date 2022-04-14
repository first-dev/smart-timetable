import { spacing as constSpacing } from '@constants'
import { range } from 'lodash'
import { FC, useState } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, Dimensions } from 'react-native'
import Item from './Item'

type Props = {
  style?: StyleProp<ViewStyle>
  colors: string[]
  itemSize?: number
  spacing?: number
  activeColor?: string
  onActiveColorChange?: (newActiveColor: string) => void
}

const Grid: FC<Props> = ({
  style,
  colors,
  itemSize = 60,
  spacing = constSpacing.s,
  activeColor,
  onActiveColorChange,
}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width)
  const numColumns = Math.floor(width / (itemSize + 2 * spacing)) || 1
  const rows = Math.ceil(colors.length / numColumns)
  const styles = StyleSheet.create({
    container: {
      alignItems: 'stretch',
    },
    row: {
      flexShrink: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: spacing,
    },
  })

  return (
    <View
      style={[styles.container, style]}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => width && setWidth(width)}>
      {range(rows).map(rowIndex => (
        <View
          key={rowIndex}
          style={[
            styles.row,
            rowIndex === 0 ? { marginTop: 0 } : undefined,
            rowIndex === rows - 1 ? { marginBottom: 0 } : undefined,
          ]}>
          {range(numColumns).map(columnIndex => {
            const color = colors[rowIndex * numColumns + columnIndex]
            if (color)
              return (
                <Item
                  key={columnIndex}
                  color={color}
                  active={color === activeColor}
                  size={itemSize}
                  onPress={() => onActiveColorChange?.(color)}
                />
              )
            else return <Item key={columnIndex} size={itemSize} />
          })}
        </View>
      ))}
    </View>
  )
}
export default Grid
