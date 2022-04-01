import { FC } from 'react'
import { View, StyleSheet, StyleProp, ViewStyle, Text } from 'react-native'
import { Subject } from '@models'
import Session from '@models/Timetable/Session'
import { colors } from '@constants'
import { Colors } from 'react-native-paper'

type CellProps = {
  style?: StyleProp<ViewStyle>
  session: Session<'static'>
  subjects: Subject[]
  highlighted?: boolean
  onClick?: () => void
}

const Cell: FC<CellProps> = ({
  session: { start, end, subjectId },
  subjects,
  style,
  highlighted,
}) => {
  const { name, color } = subjects.find(({ id }) => id === subjectId) ?? {
    name: '',
    color: Colors.grey600,
  }
  return (
    <View style={[styles.container, { height: `${((end - start) / 24) * 100}%` }, style]}>
      <View
        style={[
          styles.inner,
          { backgroundColor: color },
          highlighted ? styles.highlighted : undefined,
        ]}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  )
}
export default Cell
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
  },
  inner: {
    flex: 1,
    padding: 6,
    margin: 2,
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  highlighted: {
    borderWidth: 2,
    borderColor: colors.highlight,
    shadowColor: colors.highlight,
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 16,
  },
})
