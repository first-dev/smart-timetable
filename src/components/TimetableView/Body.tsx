import { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { Subject } from '@models'
import { Day } from '@models/Timetable'
import Column from './Column'
import Grid from './Grid'

type Props = {
  days?: Day<'static'>[]
  subjects: Subject[]
}

const Body: FC<Props> = ({ days, subjects }) => {
  return (
    <View style={styles.container}>
      <Grid style={styles.float} columns={days?.length ?? 6} rows={24} halves />
      <View style={[styles.float, styles.columnsContainer]}>
        {days?.map((day, i) => (
          <Column day={day} key={i} subjects={subjects} />
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
