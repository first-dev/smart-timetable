import { PlatformTouchable } from '@components/UI'
import { colors } from '@constants'
import { Subject } from '@models'
import Session from '@models/Timetable/Session'
import { FC } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Colors, Text } from 'react-native-paper'

type CellProps = {
  style?: StyleProp<ViewStyle>
  session: Session<'static'>
  subjects: Subject[]
  highlighted?: boolean
  onPress?: (sessionId: Session<'static'>['id']) => void
}

const Cell: FC<CellProps> = ({
  session: { start, end, subjectId, id },
  subjects,
  style,
  highlighted,
  onPress,
}) => {
  const { name, color } = subjects.find(({ id }) => id === subjectId) ?? {
    name: '',
    color: Colors.grey600,
  }
  return (
    <View style={[styles.container, { height: `${((end - start) / 24) * 100}%` }, style]}>
      <PlatformTouchable
        style={[
          styles.touchable,
          { backgroundColor: color },
          highlighted ? styles.highlighted : undefined,
        ]}
        onPress={() => onPress?.(id)}>
        <View style={styles.inner}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </PlatformTouchable>
    </View>
  )
}
export default Cell
const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 2,
  },
  inner: {
    flex: 1,
  },
  touchable: {
    height: '100%',
    padding: 6,
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
