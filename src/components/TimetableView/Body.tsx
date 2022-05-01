import { Subject } from '@models'
import { Day, Session } from '@models/Timetable'
import { FC, Fragment } from 'react'
import { StyleSheet, View } from 'react-native'
import Column from './Column'
import Grid from './Grid'

type Props = {
  days?: Day<'static'>[]
  subjects: Subject[]
  onPress?: (sessionId: Session<'static'>['id']) => void
  start?: number
  end?: number
}

const Body: FC<Props> = ({ days, subjects, onPress, start = 0, end = 6 }) => {
  return (
    <View style={styles.container}>
      <Grid style={styles.float} columns={days?.length ?? 6} rows={24} halves />
      <View style={[styles.float, styles.columnsContainer]}>
        {days?.map((day, i) => (
          <Fragment key={i}>
            {start <= i && i <= end && <Column day={day} subjects={subjects} onPress={onPress} />}
          </Fragment>
        ))}
      </View>
    </View>
  )
}
export default Body
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  float: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  columnsContainer: {
    flexDirection: 'row',
  },
})
