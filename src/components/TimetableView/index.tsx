import { useDynamicWindowStyles } from '@hooks'
import { Subject } from '@models'
import { Timetable } from '@models/Timetable'
import { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Body from './Body'
import Header from './Header'
import Sidebar from './Sidebar'

type Props = {
  timetable?: Timetable<'static'>
  subjects: Subject[]
}

const TimetableView: FC<Props> = ({ timetable, subjects }) => {
  const { scrollContainerStyle: dynamicHeight } = useDynamicWindowStyles(window => ({
    scrollContainerStyle: {
      height: window.height > 300 ? window.height * 2 : 600,
    },
  }))
  const highlightedDay = timetable?.days.find(({ highlighted }) => highlighted)?.index
  return (
    <View style={styles.container}>
      <Header start={1} end={5} style={styles.header} highlightedDay={highlightedDay} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[dynamicHeight, styles.scrollContainer]}>
        <Sidebar start={1} end={23} AmPm style={styles.sidebar} />
        <Body days={timetable?.days} subjects={subjects} />
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
