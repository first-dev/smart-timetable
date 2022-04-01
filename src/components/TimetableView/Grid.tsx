import { range } from 'lodash'
import { FC } from 'react'
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native'
import { Colors } from 'react-native-paper'

type GridProps = {
  columns: number
  rows: number
  halves?: boolean
  style?: StyleProp<ViewStyle>
}

const Grid: FC<GridProps> = ({ columns, rows, halves = false, style }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.line, styles.columns]}>
        {range(columns - 1).map(i => (
          <View key={i} style={styles.columnBorder} />
        ))}
      </View>
      <View style={[styles.line, styles.rows]}>
        {range((halves ? 2 * rows : rows) - 1).map(i => (
          <View key={i} style={[styles.rowBorder, !(i % 2) && halves ? styles.faint : undefined]} />
        ))}
      </View>
    </View>
  )
}
export default Grid
const thickness = 1
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  line: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  columns: {
    flexDirection: 'row',
    paddingHorizontal: thickness / 2,
  },
  columnBorder: {
    width: thickness,
    height: '100%',
    backgroundColor: Colors.grey200,
  },
  rows: {
    flexDirection: 'column',
    paddingVertical: thickness / 2,
  },
  rowBorder: {
    height: thickness,
    width: '100%',
    backgroundColor: Colors.grey200,
  },
  faint: {
    backgroundColor: Colors.grey50,
  },
})
