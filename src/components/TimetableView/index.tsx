import { useDynamicWindowStyles, useLayoutEvent, useSettings } from '@hooks'
import { Subject } from '@models'
import { Session, Timetable } from '@models/Timetable'
import { FC } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import Body from './Body'
import Header from './Header'
import Sidebar from './Sidebar'
import TimeIndicator from './TimeIndicator'

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
  const sidebarLayout = useLayoutEvent()
  const bodyLayout = useLayoutEvent()
  const containerLayout = useLayoutEvent()

  return (
    <View style={styles.container} onLayout={containerLayout.onLayout}>
      <Header
        start={start}
        end={end}
        style={{
          paddingLeft: sidebarLayout.event?.width ?? 20,
          // align with the scroll bar
          paddingRight:
            (containerLayout.event?.width ?? 0) -
            ((sidebarLayout.event?.width ?? 0) + (bodyLayout.event?.width ?? 0)),
        }}
        highlightedDay={highlightedDay}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={dynamicHeight}>
        <View style={[styles.bodyContainer, styles.float]}>
          <Sidebar
            start={1}
            end={23}
            AmPm={settings.general.hourFormat === '12-hour'}
            onLayout={sidebarLayout.onLayout}
          />
          <Body
            days={timetable?.days}
            subjects={subjects}
            onPress={onSessionPress}
            start={start}
            end={end}
            onLayout={bodyLayout.onLayout}
          />
        </View>
        <TimeIndicator style={styles.float} />
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
  bodyContainer: {
    flexDirection: 'row',
  },
  float: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})
