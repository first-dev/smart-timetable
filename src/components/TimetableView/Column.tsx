import { Subject } from '@models'
import { Session } from '@models/Timetable'
import Day from '@models/Timetable/Day'
import { FC, Fragment } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Cell from './Cell'
import EmptyCell from './EmptyCell'

type ColumnProps = {
  style?: StyleProp<ViewStyle>
  day: Day<'static'>
  subjects: Subject[]
  onPress?: (sessionId: Session<'static'>['id']) => void
}

const Column: FC<ColumnProps> = ({ style, day, subjects, onPress }) => {
  day.sessions.sort((a, b) => a.start - b.start)
  return (
    <View style={[styles.container, style]}>
      {day.sessions.map((session, i, sessions) => {
        const gap = sessions[i + 1]?.start - session.end
        return (
          <Fragment key={i}>
            {i == 0 && session.start != 0 && <EmptyCell gap={session.start} />}
            <Cell
              session={session}
              subjects={subjects}
              highlighted={session.highlighted}
              onPress={onPress}
            />
            {gap > 0 && <EmptyCell gap={gap} />}
          </Fragment>
        )
      })}
    </View>
  )
}
export default Column
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
})
