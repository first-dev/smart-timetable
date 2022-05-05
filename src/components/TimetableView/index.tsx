import { useDynamicWindowStyles, useSettings } from '@hooks'
import { Subject } from '@models'
import { Session, Timetable } from '@models/Timetable'
import { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Body from './Body'
import Header from './Header'
import Sidebar from './Sidebar'

type Props = {
  timetable?: Timetable<'static'>
  subjects: Subject[]
  onSessionPress?: (sessionId: Session<'static'>['id']) => void
}

const TimetableView: FC<Props> = ({ timetable, subjects, onSessionPress }) => {
  const { settings } = useSettings()
  const start = parseInt(settings.timetable.firstDayIndex)
  const end = parseInt(settings.timetable.lastDayIndex)
  const { dynamicHeight } = useDynamicWindowStyles(window => ({
    dynamicHeight: {
      height: window.height > 300 ? window.height * 2 : 600,
    },
  }))
  const highlightedDay = timetable?.days.find(({ highlighted }) => highlighted)?.index
  return (
    <View style={styles.container}>
      <Header start={start} end={end} style={styles.header} highlightedDay={highlightedDay} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[dynamicHeight, styles.scrollContainer]}>
        <Sidebar start={1} end={23} AmPm style={styles.sidebar} />
        <Body
          days={timetable?.days}
          subjects={subjects}
          onPress={onSessionPress}
          start={start}
          end={end}
        />
      </ScrollView>
    </View>
  )
}
export default TimetableView
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  header: {
    paddingLeft: 40,
  },
  sidebar: {
    width: 40,
  },
})
