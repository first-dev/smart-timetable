import { FC } from 'react'
import { View, StyleSheet, Text, StyleProp, ViewStyle } from 'react-native'
import { range } from 'lodash'
import { format } from 'date-fns'
import { colors } from '@constants'

type Props = {
  style?: StyleProp<ViewStyle>
  start: number
  end: number
  AmPm?: boolean
}

const Sidebar: FC<Props> = ({ start, end, AmPm = false, style }) => {
  return (
    <View style={[styles.container, style]}>
      {range(start, end + 1).map(v => (
        <View key={v} style={styles.cell}>
          <Text style={styles.text}>
            {format(new Date(0, 0, 0, v), AmPm ? 'h a' : 'H').toLowerCase()}
          </Text>
        </View>
      ))}
    </View>
  )
}
export default Sidebar
const cellHeight = 20
const styles = StyleSheet.create({
  container: {
    paddingVertical: cellHeight / 2,
    width: 40,
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  cell: {
    height: cellHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: colors.text,
  },
})
